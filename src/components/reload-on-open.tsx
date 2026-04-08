"use client";

import { useEffect } from "react";

/**
 * Full page reload once when this route is shown, without an infinite loop.
 * Uses sessionStorage so the reload after the first paint does not trigger again.
 */
export function ReloadOnOpen({ storageKey }: { storageKey: string }) {
  useEffect(() => {
    if (sessionStorage.getItem(storageKey)) {
      sessionStorage.removeItem(storageKey);
      return;
    }
    sessionStorage.setItem(storageKey, "1");
    window.location.reload();
  }, [storageKey]);

  return null;
}
