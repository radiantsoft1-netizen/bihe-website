"use client";

import { useEffect } from "react";
import { debugPerf, logDebug } from "@/lib/debug-perf";

export function DebugPerfProbe() {
  useEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    const report = () => {
      logDebug(
        "H5",
        "DebugPerfProbe.tsx:report",
        "page perf summary",
        {
          domContentLoadedMs: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
          loadEventMs: nav ? Math.round(nav.loadEventEnd) : null,
          images: { ...debugPerf.images },
          revealObservers: debugPerf.revealObservers,
          headerScroll: { ...debugPerf.headerScroll },
          testimonialLeak: debugPerf.testimonialUnmountWithPendingTimeout,
          path: window.location.pathname,
        },
        "post-fix",
      );
    };

    const timer = window.setTimeout(report, 4000);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
