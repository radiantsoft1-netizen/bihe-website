const maroonLabels = new Set(["Academics", "Events", "Careers"]);

export function getMediaBadgeTone(label: string): "navy" | "maroon" {
  return maroonLabels.has(label) ? "maroon" : "navy";
}

export function getMediaBadgeInitial(label: string): string {
  return label.trim().charAt(0).toUpperCase();
}
