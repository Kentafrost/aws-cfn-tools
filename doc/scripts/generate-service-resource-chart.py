import json
from pathlib import Path

import matplotlib.pyplot as plt


def main() -> None:
    root = Path(__file__).resolve().parents[2]
    input_path = root / "doc" / "yaml-quick-matrix.json"
    output_path = root / "doc" / "service-resource-distribution.png"

    if not input_path.exists():
        raise FileNotFoundError(f"Input JSON not found: {input_path}")

    with input_path.open("r", encoding="utf-8") as f:
        payload = json.load(f)

    counts = payload.get("serviceResourceCounts", [])
    counts = [item for item in counts if isinstance(item, dict) and isinstance(item.get("service"), str)]

    if not counts:
        raise ValueError("No serviceResourceCounts found in yaml-quick-matrix.json")

    top = counts[:20]
    services = [item["service"] for item in top]
    values = [int(item.get("count", 0)) for item in top]

    fig_height = max(5, 0.45 * len(services) + 1.2)
    fig, ax = plt.subplots(figsize=(12, fig_height), constrained_layout=True)

    bars = ax.barh(services, values, color="#38bdf8", edgecolor="#0ea5e9")
    ax.invert_yaxis()
    ax.set_title("AWS Resource Distribution by Service (Top 20)", fontsize=13, pad=10)
    ax.set_xlabel("Resource Count")
    ax.grid(axis="x", linestyle="--", linewidth=0.6, alpha=0.45)

    for bar, value in zip(bars, values):
        ax.text(value + 0.2, bar.get_y() + bar.get_height() / 2, str(value), va="center", fontsize=9)

    total_resources = int(payload.get("totalResources", sum(values)))
    fig.text(0.01, 0.01, f"Generated from doc/yaml-quick-matrix.json | Total resources: {total_resources}", fontsize=8)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(output_path, dpi=180)
    plt.close(fig)

    print(f"[service-chart] wrote: {output_path.relative_to(root)}")


if __name__ == "__main__":
    main()
