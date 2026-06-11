/** Session debug counters — enable with NEXT_PUBLIC_DEBUG_PERF=1 */
export const debugPerf = {
  images: { local: 0, remote: 0, shortUrl: 0 },
  revealObservers: 0,
  headerScroll: { window: 0, lenis: 0, duplicateBurst: 0 },
  scroll: { ticks: 0, maxFrameDeltaMs: 0, isScrollingToggles: 0 },
  testimonialUnmountWithPendingTimeout: 0,
  lastWindowScrollAt: 0,
  lastLenisScrollAt: 0,
  lastScrollTickAt: 0,
};

const debugEnabled = process.env.NEXT_PUBLIC_DEBUG_PERF === "1";

export function logDebug(
  hypothesisId: string,
  location: string,
  message: string,
  data: Record<string, unknown> = {},
  runId = "pre-fix",
) {
  if (!debugEnabled) return;

  fetch("http://127.0.0.1:7637/ingest/ce82133c-2e34-4c7d-b213-921a8683f692", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "511662",
    },
    body: JSON.stringify({
      sessionId: "511662",
      runId,
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
}
