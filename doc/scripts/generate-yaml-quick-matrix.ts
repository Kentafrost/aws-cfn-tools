import * as fs from 'node:fs';
import * as path from 'node:path';
import * as yaml from 'js-yaml';

type GenericObject = Record<string, unknown>;

type MatrixRow = {
  part: string;
  file: string;
  services: string[];
  resourceNames: string[];
  serviceResourceCounts: Record<string, number>;
};

type ServiceCount = {
  service: string;
  count: number;
};

type MatrixJson = {
  generatedAt: string;
  totalFiles: number;
  rows: MatrixRow[];
  totalResources: number;
  serviceResourceCounts: ServiceCount[];
  serviceResourceCountsByPart: Record<string, ServiceCount[]>;
};

function isObject(value: unknown): value is GenericObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === 'string' ? value : null;
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

function shouldSkipFile(absPath: string): boolean {
  const normalized = absPath.replace(/\\/g, '/');
  return (
    normalized.includes('/node_modules/') ||
    normalized.includes('/vendor/') ||
    normalized.includes('/.github/') ||
    normalized.includes('/Plan2/old/')
  );
}

function findYamlFiles(rootDir: string): string[] {
  const results: string[] = [];

  function walk(current: string): void {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const abs = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === '.git' || entry.name === 'node_modules') {
          continue;
        }
        walk(abs);
        continue;
      }

      if (!/\.(ya?ml)$/i.test(entry.name)) {
        continue;
      }

      if (!shouldSkipFile(abs)) {
        results.push(abs);
      }
    }
  }

  walk(rootDir);
  return results.sort((a, b) => a.localeCompare(b));
}

function resolvePart(filePath: string): string {
  if (filePath.startsWith('common/')) {
    return 'Common';
  }

  const planMatch = filePath.match(/^Plan(\d+)\//);
  if (planMatch) {
    return `Part${planMatch[1]}`;
  }

  if (filePath === 'test.yaml') {
    return 'Test';
  }

  return 'Other';
}

function toServiceName(resourceType: string): string | null {
  const match = resourceType.match(/^AWS::([A-Za-z0-9]+)::/);
  return match ? match[1] : null;
}

function parseYamlFile(filePath: string): unknown {
  const raw = fs.readFileSync(filePath, 'utf8');
  return yaml.load(raw, { schema: CFN_SCHEMA });
}

function buildRow(rootDir: string, filePath: string): MatrixRow {
  const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const doc = parseYamlFile(filePath);
  const resources = isObject(doc) && isObject(doc.Resources) ? doc.Resources : {};

  const resourceNames = Object.keys(resources).sort((a, b) => a.localeCompare(b));
  const services = new Set<string>();
  const serviceResourceCounts = new Map<string, number>();

  for (const logicalId of resourceNames) {
    const resource = resources[logicalId];
    if (!isObject(resource)) {
      continue;
    }
    const serviceName = toServiceName(asString(resource.Type) ?? '');
    if (serviceName) {
      services.add(serviceName);
      serviceResourceCounts.set(serviceName, (serviceResourceCounts.get(serviceName) ?? 0) + 1);
    }
  }

  return {
    part: resolvePart(relPath),
    file: relPath,
    services: [...services].sort((a, b) => a.localeCompare(b)),
    resourceNames,
    serviceResourceCounts: Object.fromEntries([...serviceResourceCounts.entries()].sort((a, b) => a[0].localeCompare(b[0]))),
  };
}

function toSortedServiceCounts(source: Map<string, number>): ServiceCount[] {
  return [...source.entries()]
    .map(([service, count]) => ({ service, count }))
    .sort((a, b) => {
      const byCount = b.count - a.count;
      return byCount !== 0 ? byCount : a.service.localeCompare(b.service);
    });
}

function compareRows(a: MatrixRow, b: MatrixRow): number {
  const partOrder = (part: string): number => {
    if (part === 'Common') return 0;
    const m = part.match(/^Part(\d+)$/);
    if (m) return Number(m[1]);
    if (part === 'Test') return 9998;
    return 9999;
  };

  const byPart = partOrder(a.part) - partOrder(b.part);
  if (byPart !== 0) {
    return byPart;
  }
  return a.file.localeCompare(b.file);
}

function main(): void {
  const rootDir = process.cwd();
  const outPath = path.join(rootDir, 'doc', 'yaml-quick-matrix.json');

  const rows: MatrixRow[] = [];
  const yamlFiles = findYamlFiles(rootDir);

  for (const filePath of yamlFiles) {
    try {
      rows.push(buildRow(rootDir, filePath));
    } catch (error) {
      const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
      const reason = error instanceof Error ? error.message : String(error);
      console.warn(`[quick-matrix] skip parse error: ${relPath} (${reason})`);
    }
  }

  rows.sort(compareRows);

  const totalServiceCountMap = new Map<string, number>();
  const partServiceCountMap = new Map<string, Map<string, number>>();

  for (const row of rows) {
    const partMap = partServiceCountMap.get(row.part) ?? new Map<string, number>();
    for (const [service, count] of Object.entries(row.serviceResourceCounts)) {
      totalServiceCountMap.set(service, (totalServiceCountMap.get(service) ?? 0) + count);
      partMap.set(service, (partMap.get(service) ?? 0) + count);
    }
    partServiceCountMap.set(row.part, partMap);
  }

  const totalResources = [...totalServiceCountMap.values()].reduce((sum, count) => sum + count, 0);
  const serviceResourceCounts = toSortedServiceCounts(totalServiceCountMap);
  const serviceResourceCountsByPart: Record<string, ServiceCount[]> = {};
  for (const [part, counts] of partServiceCountMap.entries()) {
    serviceResourceCountsByPart[part] = toSortedServiceCounts(counts);
  }

  const payload: MatrixJson = {
    generatedAt: new Date().toISOString(),
    totalFiles: rows.length,
    rows,
    totalResources,
    serviceResourceCounts,
    serviceResourceCountsByPart,
  };

  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`[quick-matrix] wrote: ${path.relative(rootDir, outPath)}`);
  console.log(`[quick-matrix] files: ${payload.totalFiles}`);
}

main();
