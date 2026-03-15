const graphEl = document.getElementById("graph");
const statusEl = document.getElementById("status");
const fileFiltersEl = document.getElementById("fileFilters");
const fileSearchEl = document.getElementById("fileSearch");
const selectionSummaryEl = document.getElementById("selectionSummary");

let mapData = null;
let renderedSvg = null;
let currentDotSource = "";
let yamlFiles = [];
let selectedFilePaths = new Set();

function getFileName(filePath) {
    const normalized = String(filePath).replace(/\\/g, "/");
    const parts = normalized.split("/");
    return parts[parts.length - 1] || normalized;
}

function formatResourceNames(file) {
    const resources = Array.isArray(file.resources) ? file.resources : [];
    if (!resources.length) {
        return "No resources";
    }

    const names = resources
        .map((resource) => resource.logicalId)
        .filter(Boolean);

    if (!names.length) {
        return "No named resources";
    }

    return names.join(", ");
}

function summarizeResourceNames(file, limit = 8) {
    const resources = Array.isArray(file?.resources) ? file.resources : [];
    const names = resources
        .map((resource) => resource.logicalId)
        .filter(Boolean);

    if (!names.length) {
        return ["No resources"];
    }

    if (names.length <= limit) {
        return names;
    }

    return [...names.slice(0, limit), `... +${names.length - limit} more`];
}

function escapeDot(value) {
    return String(value).replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
}

function isYamlPath(filePath) {
    return /\.ya?ml$/i.test(filePath);
}

function getSortedYamlFiles(files) {
    return [...files].sort((left, right) => left.path.localeCompare(right.path, "ja"));
}

function getVisibleYamlFiles() {
    const query = fileSearchEl.value.trim().toLowerCase();
    if (!query) {
        return yamlFiles;
    }
    return yamlFiles.filter((file) => file.path.toLowerCase().includes(query));
}

function updateSelectionSummary(extra = {}) {
    const visibleFiles = getVisibleYamlFiles();
    const selectedCount = selectedFilePaths.size;
    const searchQuery = fileSearchEl.value.trim();
    const lines = [
        `Total YAML files: ${yamlFiles.length}`,
        `Search results: ${visibleFiles.length}`,
        `Selected YAML files: ${selectedCount}`,
    ];

    if (searchQuery) {
        lines.push(`Search query: ${searchQuery}`);
    }
    if (typeof extra.templates === "number") {
        lines.push(`Visible templates: ${extra.templates}`);
    }
    if (typeof extra.resources === "number") {
        lines.push(`Visible resources: ${extra.resources}`);
    }
    if (typeof extra.edges === "number") {
        lines.push(`Visible edges: ${extra.edges}`);
    }

    selectionSummaryEl.innerHTML = lines.join("<br>");
}

function collectSelectedFiles() {
    return new Set(selectedFilePaths);
}

function buildFilterOptions() {
    const visibleFiles = getVisibleYamlFiles();
    fileFiltersEl.innerHTML = visibleFiles.map((file) => {
        const checked = selectedFilePaths.has(file.path) ? "checked" : "";
        return `
            <label class="file-option">
                <input type="checkbox" name="fileFilter" value="${file.path}" ${checked}>
                <span class="file-label">
                    <span class="file-path">${getFileName(file.path)}</span>
                    <span class="file-meta">Path: ${file.path}</span>
                    <span class="file-meta">Resources: ${file.resourceCount}</span>
                    <span class="file-meta">Resource names: ${formatResourceNames(file)}</span>
                </span>
            </label>
        `;
    }).join("");

    if (!visibleFiles.length) {
        fileFiltersEl.innerHTML = `<div class="panel">No YAML files match the current search.</div>`;
    }

    updateSelectionSummary();
}

function buildFilteredGraph() {
    const selectedFiles = collectSelectedFiles();
    const visibleFileIds = new Set();
    const visibleResourceIds = new Set();

    const templates = mapData.nodes.templates.filter((node) => selectedFiles.has(node.file));
    const resources = mapData.nodes.resources.filter((node) => selectedFiles.has(node.file));

    for (const node of templates) {
        visibleFileIds.add(node.id);
    }
    for (const node of resources) {
        visibleResourceIds.add(node.id);
    }

    const edges = mapData.edges.filter((edge) => {
        const fromVisible = visibleFileIds.has(edge.from) || visibleResourceIds.has(edge.from);
        const toVisible = visibleFileIds.has(edge.to) || visibleResourceIds.has(edge.to);
        return fromVisible && toVisible;
    });

    const dotLines = [];
    dotLines.push("digraph CloudFormationDependencies {");
    dotLines.push("  rankdir=LR;");
    dotLines.push("  overlap=false;");
    dotLines.push("  splines=true;");
    dotLines.push('  node [shape=box, style="rounded,filled", fillcolor="#EAF2FF", color="#4A6FA5", fontname="Helvetica"];');

    const fileSummaryByPath = new Map(mapData.files.map((file) => [file.path, file]));

    for (const node of resources) {
        const label = `${node.logicalId}\\n${node.type}\\n${getFileName(node.file)}`;
        dotLines.push(`  "${escapeDot(node.id)}" [shape=box, style="rounded,filled", fillcolor="#EAF2FF", color="#4A6FA5", fontname="Helvetica", fontcolor="#0f172a", label="${escapeDot(label)}"];`);
    }

    for (const node of templates) {
        const file = fileSummaryByPath.get(node.file);
        const resourceNames = summarizeResourceNames(file);
        const labelLines = [getFileName(node.file), "Resources", ...resourceNames];
        const label = labelLines.join("\\n");
        dotLines.push(`  "${escapeDot(node.id)}" [shape=folder, style="filled", fillcolor="#FFF4DE", color="#B28629", fontname="Helvetica", fontcolor="#0f172a", label="${escapeDot(label)}"];
`);
    }

    for (const edge of edges) {
        const label = edge.detail ? `${edge.kind}: ${edge.detail}` : edge.kind;
        const color = edge.kind === "SSMParameterLink" ? "#f472b6" : edge.kind === "RefCrossFileUnique" ? "#fbbf24" : "#cbd5e1";
        dotLines.push(`  "${escapeDot(edge.from)}" -> "${escapeDot(edge.to)}" [label="${escapeDot(label)}", color="${color}", fontcolor="${color}"];`);
    }

    dotLines.push("}");

    updateSelectionSummary({
        templates: templates.length,
        resources: resources.length,
        edges: edges.length,
    });

    return dotLines.join("\n");
}

async function renderGraph() {
    statusEl.textContent = "Rendering graph...";
    graphEl.innerHTML = "";

    try {
        currentDotSource = buildFilteredGraph();

        if (!currentDotSource.includes("[")) {
            renderedSvg = null;
            graphEl.innerHTML = `<div class="panel">No nodes match the currently selected YAML files.</div>`;
            statusEl.textContent = "";
            return;
        }

        const viz = new Viz();
        const svgEl = await viz.renderSVGElement(currentDotSource);
        renderedSvg = svgEl;
        graphEl.appendChild(svgEl);
        statusEl.textContent = "";
    } catch (error) {
        renderedSvg = null;
        const message = error && error.message ? error.message : String(error);
        statusEl.textContent = `Rendering failed (display-yaml): ${message}`;
    }
}

async function initialize() {
    statusEl.textContent = "Loading relation-map dependency data...";
    try {
        if (window.CFN_RESOURCE_MAP) {
            mapData = window.CFN_RESOURCE_MAP;
        } else {
            const response = await fetch("relation-map/cfn-resource-map.json", { cache: "no-store" });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            mapData = await response.json();
        }
        yamlFiles = getSortedYamlFiles(mapData.files.filter((file) => isYamlPath(file.path)));
        selectedFilePaths = new Set(yamlFiles.map((file) => file.path));
        buildFilterOptions();
        await renderGraph();
    } catch (error) {
        const message = error && error.message ? error.message : String(error);
        selectionSummaryEl.textContent = "Failed to load data.";
        graphEl.innerHTML = `<div class="panel">Failed to load relation-map dependency data.</div>`;
        statusEl.textContent = `Load failed (display-yaml): ${message}`;
    }
}

document.getElementById("btnRender").addEventListener("click", () => {
    if (mapData) {
        renderGraph();
    }
});

document.getElementById("btnSelectAll").addEventListener("click", () => {
    selectedFilePaths = new Set(yamlFiles.map((file) => file.path));
    buildFilterOptions();
    if (mapData) {
        renderGraph();
    }
});

document.getElementById("btnSelectNone").addEventListener("click", () => {
    selectedFilePaths = new Set();
    buildFilterOptions();
    if (mapData) {
        renderGraph();
    }
});

fileSearchEl.addEventListener("input", () => {
    buildFilterOptions();
});

fileFiltersEl.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement) || target.name !== "fileFilter") {
        return;
    }
    if (target.checked) {
        selectedFilePaths.add(target.value);
    } else {
        selectedFilePaths.delete(target.value);
    }
    buildFilterOptions();
    if (mapData) {
        renderGraph();
    }
});

initialize();