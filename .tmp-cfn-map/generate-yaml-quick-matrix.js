"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("node:fs");
const path = require("node:path");
const yaml = require("js-yaml");
function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function asString(value) {
    return typeof value === 'string' ? value : null;
}
function makeTagTypes(tagName, keyName) {
    return [
        new yaml.Type(tagName, {
            kind: 'scalar',
            construct: (data) => ({ [keyName]: data !== null && data !== void 0 ? data : '' }),
        }),
        new yaml.Type(tagName, {
            kind: 'sequence',
            construct: (data) => ({ [keyName]: data !== null && data !== void 0 ? data : [] }),
        }),
        new yaml.Type(tagName, {
            kind: 'mapping',
            construct: (data) => ({ [keyName]: data !== null && data !== void 0 ? data : {} }),
        }),
    ];
}
const CFN_TAG_TYPES = [
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
function shouldSkipFile(absPath) {
    const normalized = absPath.replace(/\\/g, '/');
    return (normalized.includes('/node_modules/') ||
        normalized.includes('/vendor/') ||
        normalized.includes('/.github/') ||
        normalized.includes('/Plan2/old/'));
}
function findYamlFiles(rootDir) {
    const results = [];
    function walk(current) {
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
function resolvePart(filePath) {
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
function toServiceName(resourceType) {
    const match = resourceType.match(/^AWS::([A-Za-z0-9]+)::/);
    return match ? match[1] : null;
}
function parseYamlFile(filePath) {
    const raw = fs.readFileSync(filePath, 'utf8');
    return yaml.load(raw, { schema: CFN_SCHEMA });
}
function buildRow(rootDir, filePath) {
    var _a, _b;
    const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
    const doc = parseYamlFile(filePath);
    const resources = isObject(doc) && isObject(doc.Resources) ? doc.Resources : {};
    const resourceNames = Object.keys(resources).sort((a, b) => a.localeCompare(b));
    const services = new Set();
    const serviceResourceCounts = new Map();
    for (const logicalId of resourceNames) {
        const resource = resources[logicalId];
        if (!isObject(resource)) {
            continue;
        }
        const serviceName = toServiceName((_a = asString(resource.Type)) !== null && _a !== void 0 ? _a : '');
        if (serviceName) {
            services.add(serviceName);
            serviceResourceCounts.set(serviceName, ((_b = serviceResourceCounts.get(serviceName)) !== null && _b !== void 0 ? _b : 0) + 1);
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
function toSortedServiceCounts(source) {
    return [...source.entries()]
        .map(([service, count]) => ({ service, count }))
        .sort((a, b) => {
        const byCount = b.count - a.count;
        return byCount !== 0 ? byCount : a.service.localeCompare(b.service);
    });
}
function compareRows(a, b) {
    const partOrder = (part) => {
        if (part === 'Common')
            return 0;
        const m = part.match(/^Part(\d+)$/);
        if (m)
            return Number(m[1]);
        if (part === 'Test')
            return 9998;
        return 9999;
    };
    const byPart = partOrder(a.part) - partOrder(b.part);
    if (byPart !== 0) {
        return byPart;
    }
    return a.file.localeCompare(b.file);
}
function main() {
    var _a, _b, _c;
    const rootDir = process.cwd();
    const outPath = path.join(rootDir, 'doc', 'yaml-quick-matrix.json');
    const rows = [];
    const yamlFiles = findYamlFiles(rootDir);
    for (const filePath of yamlFiles) {
        try {
            rows.push(buildRow(rootDir, filePath));
        }
        catch (error) {
            const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
            const reason = error instanceof Error ? error.message : String(error);
            console.warn(`[quick-matrix] skip parse error: ${relPath} (${reason})`);
        }
    }
    rows.sort(compareRows);
    const totalServiceCountMap = new Map();
    const partServiceCountMap = new Map();
    for (const row of rows) {
        const partMap = (_a = partServiceCountMap.get(row.part)) !== null && _a !== void 0 ? _a : new Map();
        for (const [service, count] of Object.entries(row.serviceResourceCounts)) {
            totalServiceCountMap.set(service, ((_b = totalServiceCountMap.get(service)) !== null && _b !== void 0 ? _b : 0) + count);
            partMap.set(service, ((_c = partMap.get(service)) !== null && _c !== void 0 ? _c : 0) + count);
        }
        partServiceCountMap.set(row.part, partMap);
    }
    const totalResources = [...totalServiceCountMap.values()].reduce((sum, count) => sum + count, 0);
    const serviceResourceCounts = toSortedServiceCounts(totalServiceCountMap);
    const serviceResourceCountsByPart = {};
    for (const [part, counts] of partServiceCountMap.entries()) {
        serviceResourceCountsByPart[part] = toSortedServiceCounts(counts);
    }
    const payload = {
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
