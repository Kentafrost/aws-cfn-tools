import * as fs from 'node:fs';
import * as path from 'node:path';
import * as dagre from 'dagre';
import * as yaml from 'js-yaml';
import { Graph, alg } from 'graphlib';

type RefKind = 'Ref' | 'GetAtt' | 'Sub' | 'DependsOn' | 'ImportValue';

type ResourceNode = {
  id: string;
  file: string;
  logicalId: string;
  type: string;
};

type FileNode = {
  id: string;
  file: string;
};

type EdgeRecord = {
  from: string;
  to: string;
  kind: RefKind | 'SSMParameterLink' | 'RefCrossFileUnique';
  detail?: string;
};

type ExternalRef = {
  file: string;
  resource: string;
  target: string;
  kind: RefKind;
};

type FileSummary = {
  path: string;
  resourceCount: number;
  resources: Array<{ logicalId: string; type: string }>;
  consumedSsmParameterDefaults: string[];
  producedSsmParameterNames: string[];
  unresolvedExternalRefs: ExternalRef[];
};

type ProducedSsm = {
  name: string;
  producerNodeId: string;
  producerFile: string;
};

type ConsumedSsm = {
  name: string;
  consumerFileNodeId: string;
  consumerFile: string;
  parameterName: string;
};

type GenericObject = Record<string, unknown>;

function isObject(value: unknown): value is GenericObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === 'string' ? value : null;
}

function normalizePathForId(relPath: string): string {
  return relPath.replace(/\\/g, '/');
}

function escapeDot(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function resolvePartFromFile(filePath: string): string {
  if (filePath.startsWith('common/')) {
    return 'Common';
  }

  const match = filePath.match(/^(Plan\d+)\//);
  if (match) {
    return match[1];
  }

  return 'Other';
}

function renderVisualizationHtml(
  mapJson: unknown,
  relDotPath: string,
  relJsonPath: string,
  relLayoutPath: string,
  relSvgPath: string,
  hasSvg: boolean
): string {
  const escapedMapJson = JSON.stringify(mapJson);
  const svgStatus = hasSvg
    ? `<li>Static SVG: <a href="${relSvgPath}">${relSvgPath}</a></li>`
    : '<li>Static SVG: not generated</li>';

  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <title>CloudFormation Dependency Graph</title>',
    '  <style>',
    '    :root { color-scheme: light dark; }',
    '    body { font-family: Segoe UI, Arial, sans-serif; margin: 0; padding: 16px; background: #0f172a; color: #e2e8f0; }',
    '    h1 { margin: 0 0 8px; font-size: 22px; }',
    '    p { margin: 0 0 12px; color: #cbd5e1; }',
    '    .panel { background: #111827; border: 1px solid #334155; border-radius: 10px; padding: 12px; margin-bottom: 12px; }',
    '    .actions { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }',
    '    button { border: 1px solid #64748b; background: #1e293b; color: #e2e8f0; padding: 8px 10px; border-radius: 6px; cursor: pointer; }',
    '    button:hover { background: #334155; }',
    '    .layout { display: grid; grid-template-columns: 320px minmax(0, 1fr); gap: 12px; align-items: start; }',
    '    .sidebar { position: sticky; top: 16px; }',
    '    .part-grid { display: grid; gap: 8px; }',
    '    .part-option { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border: 1px solid #334155; border-radius: 8px; background: #0b1220; }',
    '    .part-option input { margin: 0; }',
    '    .part-swatch { width: 12px; height: 12px; border-radius: 999px; flex: 0 0 auto; }',
    '    .summary { font-size: 13px; color: #cbd5e1; line-height: 1.6; }',
    '    a { color: #7dd3fc; }',
    '    #graph { overflow: auto; background: #0b1220; border-radius: 10px; border: 1px solid #334155; min-height: 420px; padding: 8px; }',
    '    #status { color: #fda4af; white-space: pre-wrap; }',
    '    ul { margin: 0; padding-left: 18px; }',
    '    @media (max-width: 960px) { .layout { grid-template-columns: 1fr; } .sidebar { position: static; } }',
    '  </style>',
    '  <script src="https://unpkg.com/viz.js@2.1.2/viz.js"></script>',
    '  <script src="https://unpkg.com/viz.js@2.1.2/full.render.js"></script>',
    '</head>',
    '<body>',
    '  <h1>CloudFormation Dependency Graph</h1>',
    '  <p>Generated from YAML templates. This view renders DOT directly in the browser.</p>',
    '  <div class="layout">',
    '    <div class="sidebar">',
    '      <div class="panel">',
    '        <div class="actions">',
    '          <button id="btnSelectAll">Select All</button>',
    '          <button id="btnSelectNone">Clear</button>',
    '          <button id="btnRender">Apply Filter</button>',
    '        </div>',
    '        <div id="partFilters" class="part-grid"></div>',
    '      </div>',
    '      <div class="panel">',
    '        <div class="actions">',
    '          <button id="btnDownload">Download Rendered SVG</button>',
    '          <button id="btnDownloadDot">Download DOT</button>',
    '        </div>',
    '        <div id="selectionSummary" class="summary"></div>',
    '      </div>',
    '      <div class="panel">',
    '        <ul>',
    `          <li>DOT: <a href="${relDotPath}">${relDotPath}</a></li>`,
    `          <li>Map JSON: <a href="${relJsonPath}">${relJsonPath}</a></li>`,
    `          <li>Layout JSON: <a href="${relLayoutPath}">${relLayoutPath}</a></li>`,
    `          ${svgStatus}`,
    '        </ul>',
    '        <div id="status"></div>',
    '      </div>',
    '    </div>',
    '    <div id="graph"></div>',
    '  </div>',
    '  <script>',
    `    const mapData = ${escapedMapJson};`,
    '    const graphEl = document.getElementById("graph");',
    '    const statusEl = document.getElementById("status");',
    '    const partFiltersEl = document.getElementById("partFilters");',
    '    const selectionSummaryEl = document.getElementById("selectionSummary");',
    '    let renderedSvg = null;',
    '    let currentDotSource = "";',
    '    const planPalette = ["#34d399", "#f59e0b", "#f87171", "#a78bfa", "#22d3ee", "#fb7185", "#4ade80", "#facc15"];',
    '    const partColors = {',
    '      Common: "#60a5fa",',
    '      Other: "#94a3b8",',
    '    };',
    '',
    '    function escapeDot(value) {',
    '      return String(value).replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");',
    '    }',
    '',
    '    function resolvePart(filePath) {',
    '      if (filePath.startsWith("common/")) return "Common";',
    '      const match = filePath.match(/^(Plan\\d+)\//);',
    '      if (match) return match[1];',
    '      return "Other";',
    '    }',
    '',
    '    function collectSelectedParts() {',
    '      return Array.from(document.querySelectorAll("input[name=partFilter]:checked")).map((input) => input.value);',
    '    }',
    '',
    '    function getPartColor(part) {',
    '      if (partColors[part]) return partColors[part];',
    '      const match = part.match(/^Plan(\\d+)$/);',
    '      if (match) {',
    '        const index = Number(match[1]) - 1;',
    '        return planPalette[((index % planPalette.length) + planPalette.length) % planPalette.length];',
    '      }',
    '      return partColors.Other;',
    '    }',
    '',
    '    function getSortedParts(partCounts) {',
    '      return Array.from(partCounts.keys()).sort((left, right) => {',
    '        if (left === right) return 0;',
    '        if (left === "Common") return -1;',
    '        if (right === "Common") return 1;',
    '        if (left === "Other") return 1;',
    '        if (right === "Other") return -1;',
    '        const leftMatch = left.match(/^Plan(\\d+)$/);',
    '        const rightMatch = right.match(/^Plan(\\d+)$/);',
    '        if (leftMatch && rightMatch) return Number(leftMatch[1]) - Number(rightMatch[1]);',
    '        if (leftMatch) return -1;',
    '        if (rightMatch) return 1;',
    '        return left.localeCompare(right, "ja");',
    '      });',
    '    }',
    '',
    '    function buildFilterOptions() {',
    '      const partCounts = new Map();',
    '      for (const file of mapData.files) {',
    '        const part = resolvePart(file.path);',
    '        partCounts.set(part, (partCounts.get(part) || 0) + 1);',
    '      }',
    '      const availableParts = getSortedParts(partCounts);',
    '      partFiltersEl.innerHTML = availableParts.map((part) => {',
    '        const count = partCounts.get(part) || 0;',
    '        const checked = part !== "Other" ? "checked" : "";',
    '        const color = getPartColor(part);',
    '        return `',
    '          <label class="part-option">',
    '            <input type="checkbox" name="partFilter" value="${part}" ${checked}>',
    '            <span class="part-swatch" style="background:${color}"></span>',
    '            <span>${part} (${count} files)</span>',
    '          </label>',
    '        `;',
    '      }).join("");',
    '    }',
    '',
    '    function buildFilteredGraph() {',
    '      const selectedParts = new Set(collectSelectedParts());',
    '      const includedNodeIds = new Set();',
    '      const resources = mapData.nodes.resources.filter((node) => selectedParts.has(resolvePart(node.file)));',
    '      const templates = mapData.nodes.templates.filter((node) => selectedParts.has(resolvePart(node.file)));',
    '      for (const node of resources) includedNodeIds.add(node.id);',
    '      for (const node of templates) includedNodeIds.add(node.id);',
    '      const edges = mapData.edges.filter((edge) => includedNodeIds.has(edge.from) && includedNodeIds.has(edge.to));',
    '',
    '      const dotLines = [];',
    '      dotLines.push("digraph CloudFormationDependencies {");',
    '      dotLines.push("  rankdir=LR;");',
    '      dotLines.push("  overlap=false;");',
    '      dotLines.push("  splines=true;");',
    '',
    '      for (const node of resources) {',
    '        const part = resolvePart(node.file);',
    '        const fill = getPartColor(part);',
    '        const border = part === "Other" ? "#64748b" : "#e2e8f0";',
    '        const label = `${node.logicalId}\\n${node.type}\\n${node.file}`;',
    '        dotLines.push(`  "${escapeDot(node.id)}" [shape=box, style="rounded,filled", fillcolor="${fill}", color="${border}", fontname="Helvetica", fontcolor="#0f172a", label="${escapeDot(label)}"];`);',
    '      }',
    '',
    '      for (const node of templates) {',
    '        const part = resolvePart(node.file);',
    '        const fill = getPartColor(part);',
    '        const label = `Template\\n${node.file}`;',
    '        dotLines.push(`  "${escapeDot(node.id)}" [shape=folder, style="filled", fillcolor="${fill}", color="#e2e8f0", fontname="Helvetica", fontcolor="#0f172a", label="${escapeDot(label)}"];`);',
    '      }',
    '',
    '      for (const edge of edges) {',
    '        const label = edge.detail ? `${edge.kind}: ${edge.detail}` : edge.kind;',
    '        const color = edge.kind === "SSMParameterLink" ? "#f472b6" : edge.kind === "RefCrossFileUnique" ? "#fbbf24" : "#cbd5e1";',
    '        dotLines.push(`  "${escapeDot(edge.from)}" -> "${escapeDot(edge.to)}" [label="${escapeDot(label)}", color="${color}", fontcolor="${color}"];`);',
    '      }',
    '',
    '      dotLines.push("}");',
    '',
    '      selectionSummaryEl.innerHTML = [',
    '        `Selected parts: ${selectedParts.size ? Array.from(selectedParts).join(", ") : "none"}` ,',
    '        `Visible resources: ${resources.length}` ,',
    '        `Visible templates: ${templates.length}` ,',
    '        `Visible edges: ${edges.length}`',
    '      ].join("<br>");',
    '',
    '      return dotLines.join("\\n");',
    '    }',
    '',
    '    async function renderGraph() {',
    '      statusEl.textContent = "Rendering graph...";',
    '      graphEl.innerHTML = "";',
    '      try {',
    '        currentDotSource = buildFilteredGraph();',
    '        if (!currentDotSource.includes("[")) {',
    '          renderedSvg = null;',
    '          graphEl.innerHTML = `<div class="panel">No nodes match the selected parts.</div>`;',
    '          statusEl.textContent = "";',
    '          return;',
    '        }',
    '        const viz = new Viz();',
    '        const svgEl = await viz.renderSVGElement(currentDotSource);',
    '        renderedSvg = svgEl;',
    '        graphEl.appendChild(svgEl);',
    '        statusEl.textContent = "";',
    '      } catch (error) {',
    '        const message = error instanceof Error ? error.message : String(error);',
    '        statusEl.textContent = `Render failed: ${message}`;',
    '      }',
    '    }',
    '',
    '    function download(name, content, type) {',
    '      const blob = new Blob([content], { type });',
    '      const url = URL.createObjectURL(blob);',
    '      const a = document.createElement("a");',
    '      a.href = url;',
    '      a.download = name;',
    '      document.body.appendChild(a);',
    '      a.click();',
    '      a.remove();',
    '      URL.revokeObjectURL(url);',
    '    }',
    '',
    '    document.getElementById("btnRender")?.addEventListener("click", renderGraph);',
    '    document.getElementById("btnSelectAll")?.addEventListener("click", () => {',
    '      document.querySelectorAll("input[name=partFilter]").forEach((input) => { input.checked = true; });',
    '      renderGraph();',
    '    });',
    '    document.getElementById("btnSelectNone")?.addEventListener("click", () => {',
    '      document.querySelectorAll("input[name=partFilter]").forEach((input) => { input.checked = false; });',
    '      renderGraph();',
    '    });',
    '    document.getElementById("btnDownloadDot")?.addEventListener("click", () => {',
    '      download("cfn-resource-graph.filtered.dot", currentDotSource, "text/vnd.graphviz");',
    '    });',
    '    document.getElementById("btnDownload")?.addEventListener("click", () => {',
    '      if (!renderedSvg) {',
    '        statusEl.textContent = "No rendered SVG yet. Click Re-render first.";',
    '        return;',
    '      }',
    '      download("cfn-resource-graph.rendered.svg", renderedSvg.outerHTML, "image/svg+xml");',
    '    });',
    '',
    '    buildFilterOptions();',
    '    renderGraph();',
    '  </script>',
    '</body>',
    '</html>',
  ].join('\n');
}

async function tryGenerateSvg(dotSource: string, svgPath: string): Promise<{ ok: boolean; reason?: string }> {
  try {
    const vizModule = await import('@viz-js/viz');
    const viz = await vizModule.instance();
    const svg = viz.renderString(dotSource, {
      engine: 'dot',
      format: 'svg',
    });
    fs.writeFileSync(svgPath, svg, 'utf8');
    return { ok: true };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    return { ok: false, reason };
  }
}

function makeTagTypes(tagName: string, keyName: string): yaml.Type[] {
  return [
    new yaml.Type(tagName, {
      kind: 'scalar',
      construct: (data: unknown) => ({ [keyName]: data ?? '' }),
    }),
    new yaml.Type(tagName, {
      kind: 'sequence',
      construct: (data: unknown) => ({ [keyName]: data ?? [] }),
    }),
    new yaml.Type(tagName, {
      kind: 'mapping',
      construct: (data: unknown) => ({ [keyName]: data ?? {} }),
    }),
  ];
}

const CFN_TAG_TYPES: yaml.Type[] = [
  ...makeTagTypes('!Ref', 'Ref'),
  ...makeTagTypes('!GetAtt', 'Fn::GetAtt'),
  ...makeTagTypes('!Sub', 'Fn::Sub'),
  ...makeTagTypes('!Join', 'Fn::Join'),
  ...makeTagTypes('!FindInMap', 'Fn::FindInMap'),
  ...makeTagTypes('!ImportValue', 'Fn::ImportValue'),
  ...makeTagTypes('!If', 'Fn::If'),
  ...makeTagTypes('!Select', 'Fn::Select'),
  ...makeTagTypes('!Split', 'Fn::Split'),
  ...makeTagTypes('!Equals', 'Fn::Equals'),
  ...makeTagTypes('!And', 'Fn::And'),
  ...makeTagTypes('!Or', 'Fn::Or'),
  ...makeTagTypes('!Not', 'Fn::Not'),
  ...makeTagTypes('!Base64', 'Fn::Base64'),
  ...makeTagTypes('!Cidr', 'Fn::Cidr'),
  ...makeTagTypes('!GetAZs', 'Fn::GetAZs'),
  ...makeTagTypes('!Transform', 'Fn::Transform'),
  ...makeTagTypes('!Condition', 'Condition'),
];

const CFN_SCHEMA = yaml.DEFAULT_SCHEMA.extend(CFN_TAG_TYPES);

function findYamlFiles(rootDir: string): string[] {
  const results: string[] = [];
  const skipDirs = new Set(['.git', 'node_modules', 'relation-map']);

  function walk(current: string): void {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (skipDirs.has(entry.name)) {
          continue;
        }
        walk(abs);
        continue;
      }
      if (/\.(ya?ml)$/i.test(entry.name)) {
        results.push(abs);
      }
    }
  }

  walk(rootDir);
  return results.sort((a, b) => a.localeCompare(b));
}

function parseYamlFile(filePath: string): unknown {
  const raw = fs.readFileSync(filePath, 'utf8');
  return yaml.load(raw, { schema: CFN_SCHEMA });
}

function parseDependsOn(value: unknown): string[] {
  if (typeof value === 'string' && value.trim()) {
    return [value.trim()];
  }
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === 'string').map((v) => v.trim()).filter(Boolean);
  }
  return [];
}

function extractSubTargets(subValue: unknown): string[] {
  let template = '';
  const ignoredVars = new Set<string>();

  if (typeof subValue === 'string') {
    template = subValue;
  } else if (Array.isArray(subValue) && subValue.length > 0) {
    template = typeof subValue[0] === 'string' ? subValue[0] : '';
    if (isObject(subValue[1])) {
      for (const key of Object.keys(subValue[1])) {
        ignoredVars.add(key);
      }
    }
  }

  if (!template) {
    return [];
  }

  const refs = new Set<string>();
  const regex = /\$\{([^}]+)\}/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(template)) !== null) {
    const token = match[1]?.trim();
    if (!token) {
      continue;
    }
    const logicalId = token.split('.')[0];
    if (!logicalId || logicalId.startsWith('AWS::') || ignoredVars.has(logicalId)) {
      continue;
    }
    refs.add(logicalId);
  }

  return [...refs];
}

function collectRefs(node: unknown, acc: Array<{ target: string; kind: RefKind }>): void {
  if (Array.isArray(node)) {
    for (const item of node) {
      collectRefs(item, acc);
    }
    return;
  }
  if (!isObject(node)) {
    return;
  }

  if (typeof node.Ref === 'string') {
    acc.push({ target: node.Ref, kind: 'Ref' });
  }

  if ('Fn::GetAtt' in node) {
    const getAtt = node['Fn::GetAtt'];
    if (typeof getAtt === 'string') {
      const logicalId = getAtt.split('.')[0];
      if (logicalId) {
        acc.push({ target: logicalId, kind: 'GetAtt' });
      }
    } else if (Array.isArray(getAtt) && typeof getAtt[0] === 'string') {
      acc.push({ target: getAtt[0], kind: 'GetAtt' });
    }
  }

  if ('Fn::Sub' in node) {
    for (const logicalId of extractSubTargets(node['Fn::Sub'])) {
      acc.push({ target: logicalId, kind: 'Sub' });
    }
  }

  if ('Fn::ImportValue' in node) {
    const importValue = node['Fn::ImportValue'];
    if (typeof importValue === 'string') {
      acc.push({ target: importValue, kind: 'ImportValue' });
    }
  }

  for (const value of Object.values(node)) {
    collectRefs(value, acc);
  }
}

function parseDocumentParts(doc: unknown): { resources: GenericObject; parameters: GenericObject } {
  if (!isObject(doc)) {
    return { resources: {}, parameters: {} };
  }
  const resources = isObject(doc.Resources) ? doc.Resources : {};
  const parameters = isObject(doc.Parameters) ? doc.Parameters : {};
  return { resources, parameters };
}

function getSsmProduced(resources: GenericObject, relPath: string): ProducedSsm[] {
  const produced: ProducedSsm[] = [];
  for (const [logicalId, raw] of Object.entries(resources)) {
    if (!isObject(raw)) {
      continue;
    }
    const type = asString(raw.Type);
    if (type !== 'AWS::SSM::Parameter') {
      continue;
    }
    const props = isObject(raw.Properties) ? raw.Properties : {};
    const name = asString(props.Name);
    if (!name) {
      continue;
    }
    produced.push({
      name,
      producerNodeId: `res:${normalizePathForId(relPath)}::${logicalId}`,
      producerFile: normalizePathForId(relPath),
    });
  }
  return produced;
}

function getSsmConsumed(parameters: GenericObject, relPath: string): ConsumedSsm[] {
  const consumed: ConsumedSsm[] = [];
  for (const [paramName, raw] of Object.entries(parameters)) {
    if (!isObject(raw)) {
      continue;
    }
    const type = asString(raw.Type) ?? '';
    if (!type.startsWith('AWS::SSM::Parameter::Value')) {
      continue;
    }
    const def = asString(raw.Default);
    if (!def) {
      continue;
    }
    consumed.push({
      name: def,
      consumerFileNodeId: `file:${normalizePathForId(relPath)}`,
      consumerFile: normalizePathForId(relPath),
      parameterName: paramName,
    });
  }
  return consumed;
}

async function main(): Promise<void> {
  const rootDir = process.cwd();
  const outDir = path.join(rootDir, 'relation-map');
  fs.mkdirSync(outDir, { recursive: true });

  const yamlFiles = findYamlFiles(rootDir);
  const resourceNodes: ResourceNode[] = [];
  const fileNodes = new Map<string, FileNode>();
  const edges: EdgeRecord[] = [];
  const edgeDedup = new Set<string>();
  const fileSummaries: FileSummary[] = [];
  const parseErrors: Array<{ file: string; error: string }> = [];
  const producedSsm: ProducedSsm[] = [];
  const consumedSsm: ConsumedSsm[] = [];
  const unresolvedExternalRefs: ExternalRef[] = [];

  function addEdge(edge: EdgeRecord): void {
    const key = `${edge.from}|${edge.to}|${edge.kind}|${edge.detail ?? ''}`;
    if (edgeDedup.has(key)) {
      return;
    }
    edgeDedup.add(key);
    edges.push(edge);
  }

  const resourceGlobalIndex = new Map<string, string[]>();

  for (const fileAbs of yamlFiles) {
    const relPath = normalizePathForId(path.relative(rootDir, fileAbs));
    const fileNodeId = `file:${relPath}`;
    fileNodes.set(fileNodeId, { id: fileNodeId, file: relPath });

    try {
      const doc = parseYamlFile(fileAbs);
      const { resources, parameters } = parseDocumentParts(doc);
      const resourceIds = Object.keys(resources);
      const localResources = new Set(resourceIds);
      const summary: FileSummary = {
        path: relPath,
        resourceCount: resourceIds.length,
        resources: [],
        consumedSsmParameterDefaults: [],
        producedSsmParameterNames: [],
        unresolvedExternalRefs: [],
      };

      for (const item of getSsmProduced(resources, relPath)) {
        producedSsm.push(item);
        summary.producedSsmParameterNames.push(item.name);
      }
      for (const item of getSsmConsumed(parameters, relPath)) {
        consumedSsm.push(item);
        summary.consumedSsmParameterDefaults.push(item.name);
      }

      for (const logicalId of resourceIds) {
        const raw = resources[logicalId];
        const res = isObject(raw) ? raw : {};
        const type = asString(res.Type) ?? 'Unknown';
        const nodeId = `res:${relPath}::${logicalId}`;

        resourceNodes.push({ id: nodeId, file: relPath, logicalId, type });
        summary.resources.push({ logicalId, type });

        const list = resourceGlobalIndex.get(logicalId) ?? [];
        list.push(nodeId);
        resourceGlobalIndex.set(logicalId, list);

        const depends = parseDependsOn(res.DependsOn);
        for (const dep of depends) {
          if (localResources.has(dep)) {
            addEdge({
              from: nodeId,
              to: `res:${relPath}::${dep}`,
              kind: 'DependsOn',
            });
          } else {
            const ref: ExternalRef = { file: relPath, resource: logicalId, target: dep, kind: 'DependsOn' };
            unresolvedExternalRefs.push(ref);
            summary.unresolvedExternalRefs.push(ref);
          }
        }

        const refs: Array<{ target: string; kind: RefKind }> = [];
        collectRefs(res, refs);
        for (const ref of refs) {
          if (!ref.target || ref.target === logicalId) {
            continue;
          }
          if (localResources.has(ref.target)) {
            addEdge({
              from: nodeId,
              to: `res:${relPath}::${ref.target}`,
              kind: ref.kind,
            });
          } else {
            const ext: ExternalRef = { file: relPath, resource: logicalId, target: ref.target, kind: ref.kind };
            unresolvedExternalRefs.push(ext);
            summary.unresolvedExternalRefs.push(ext);
          }
        }
      }

      fileSummaries.push(summary);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      parseErrors.push({ file: relPath, error: message });
      fileSummaries.push({
        path: relPath,
        resourceCount: 0,
        resources: [],
        consumedSsmParameterDefaults: [],
        producedSsmParameterNames: [],
        unresolvedExternalRefs: [],
      });
    }
  }

  // Cross-file unique logical-id matching for unresolved refs.
  for (const ext of unresolvedExternalRefs) {
    const matches = resourceGlobalIndex.get(ext.target) ?? [];
    if (matches.length === 1) {
      addEdge({
        from: `res:${ext.file}::${ext.resource}`,
        to: matches[0],
        kind: 'RefCrossFileUnique',
        detail: ext.target,
      });
    }
  }

  // Cross-file SSM producer-consumer links.
  const producedByName = new Map<string, ProducedSsm[]>();
  for (const produced of producedSsm) {
    const list = producedByName.get(produced.name) ?? [];
    list.push(produced);
    producedByName.set(produced.name, list);
  }
  for (const consumed of consumedSsm) {
    const producers = producedByName.get(consumed.name) ?? [];
    for (const producer of producers) {
      addEdge({
        from: producer.producerNodeId,
        to: consumed.consumerFileNodeId,
        kind: 'SSMParameterLink',
        detail: consumed.name,
      });
    }
  }

  const cycleGraph = new Graph({ directed: true });
  for (const node of resourceNodes) {
    cycleGraph.setNode(node.id);
  }
  for (const edge of edges) {
    if (edge.from.startsWith('res:') && edge.to.startsWith('res:')) {
      cycleGraph.setEdge(edge.from, edge.to);
    }
  }
  const cycles = alg.findCycles(cycleGraph);

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setGraph({ rankdir: 'LR', ranksep: 80, nodesep: 40 });
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  for (const node of resourceNodes) {
    const label = `${node.logicalId}\\n${node.type}\\n(${node.file})`;
    const width = Math.max(220, Math.min(420, label.length * 5));
    dagreGraph.setNode(node.id, { label, width, height: 74 });
  }
  for (const fileNode of fileNodes.values()) {
    const label = `Template\\n${fileNode.file}`;
    const width = Math.max(220, Math.min(420, label.length * 5));
    dagreGraph.setNode(fileNode.id, { label, width, height: 58 });
  }
  for (const edge of edges) {
    dagreGraph.setEdge(edge.from, edge.to);
  }
  dagre.layout(dagreGraph);

  const layoutNodes = dagreGraph.nodes().map((id) => {
    const n = dagreGraph.node(id) as { x: number; y: number; width: number; height: number };
    return { id, x: n.x, y: n.y, width: n.width, height: n.height };
  });

  const mapJson = {
    generatedAt: new Date().toISOString(),
    rootDir,
    stats: {
      yamlFiles: yamlFiles.length,
      resources: resourceNodes.length,
      edges: edges.length,
      parseErrors: parseErrors.length,
      cycles: cycles.length,
      ssmProduced: producedSsm.length,
      ssmConsumed: consumedSsm.length,
    },
    files: fileSummaries.map((file) => ({
      ...file,
      part: resolvePartFromFile(file.path),
    })),
    nodes: {
      resources: resourceNodes.map((node) => ({
        ...node,
        part: resolvePartFromFile(node.file),
      })),
      templates: [...fileNodes.values()].map((node) => ({
        ...node,
        part: resolvePartFromFile(node.file),
      })),
    },
    edges,
    cycles,
    parseErrors,
  };

  const dotLines: string[] = [];
  dotLines.push('digraph CloudFormationDependencies {');
  dotLines.push('  rankdir=LR;');
  dotLines.push('  overlap=false;');
  dotLines.push('  splines=true;');
  dotLines.push('  node [shape=box, style="rounded,filled", fillcolor="#EAF2FF", color="#4A6FA5", fontname="Helvetica"];');

  for (const node of resourceNodes) {
    const id = escapeDot(node.id);
    const label = escapeDot(`${node.logicalId}\\n${node.type}\\n${node.file}`);
    dotLines.push(`  "${id}" [label="${label}"];`);
  }
  for (const fileNode of fileNodes.values()) {
    const id = escapeDot(fileNode.id);
    const label = escapeDot(`Template\\n${fileNode.file}`);
    dotLines.push(`  "${id}" [shape=folder, fillcolor="#FFF4DE", color="#B28629", label="${label}"];`);
  }

  for (const edge of edges) {
    const from = escapeDot(edge.from);
    const to = escapeDot(edge.to);
    const label = escapeDot(edge.detail ? `${edge.kind}: ${edge.detail}` : edge.kind);
    dotLines.push(`  "${from}" -> "${to}" [label="${label}"];`);
  }

  dotLines.push('}');

  const mapPath = path.join(outDir, 'cfn-resource-map.json');
  const mapJsPath = path.join(outDir, 'cfn-resource-map.js');
  const dotPath = path.join(outDir, 'cfn-resource-graph.dot');
  const layoutPath = path.join(outDir, 'cfn-resource-layout.json');
  const svgPath = path.join(outDir, 'cfn-resource-graph.svg');
  const htmlPath = path.join(outDir, 'cfn-resource-graph.html');

  const dotSource = dotLines.join('\n');
  const mapJsonText = JSON.stringify(mapJson, null, 2);

  fs.writeFileSync(mapPath, mapJsonText, 'utf8');
  fs.writeFileSync(mapJsPath, `window.CFN_RESOURCE_MAP = ${mapJsonText};\n`, 'utf8');
  fs.writeFileSync(dotPath, dotSource, 'utf8');
  fs.writeFileSync(layoutPath, JSON.stringify({ nodes: layoutNodes }, null, 2), 'utf8');

  const svgResult = await tryGenerateSvg(dotSource, svgPath);
  const html = renderVisualizationHtml(
    mapJson,
    path.basename(dotPath),
    path.basename(mapPath),
    path.basename(layoutPath),
    path.basename(svgPath),
    svgResult.ok
  );
  fs.writeFileSync(htmlPath, html, 'utf8');

  console.log(`[cfn:map] YAML files: ${yamlFiles.length}`);
  console.log(`[cfn:map] Resources: ${resourceNodes.length}`);
  console.log(`[cfn:map] Edges: ${edges.length}`);
  console.log(`[cfn:map] Parse errors: ${parseErrors.length}`);
  console.log(`[cfn:map] Cycles: ${cycles.length}`);
  console.log(`[cfn:map] Output JSON: ${path.relative(rootDir, mapPath)}`);
  console.log(`[cfn:map] Output JS: ${path.relative(rootDir, mapJsPath)}`);
  console.log(`[cfn:map] Output DOT: ${path.relative(rootDir, dotPath)}`);
  console.log(`[cfn:map] Output Layout: ${path.relative(rootDir, layoutPath)}`);
  if (svgResult.ok) {
    console.log(`[cfn:map] Output SVG: ${path.relative(rootDir, svgPath)}`);
  } else {
    console.log(`[cfn:map] Output SVG: skipped (${svgResult.reason ?? 'svg render failed'})`);
  }
  console.log(`[cfn:map] Output HTML: ${path.relative(rootDir, htmlPath)}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.stack || error.message : String(error);
  console.error(`[cfn:map] Fatal error: ${message}`);
  process.exitCode = 1;
});
