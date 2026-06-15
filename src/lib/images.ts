"use client";

import { useState, useEffect } from "react";

/**
 * Hook that checks client-side if a local public image exists.
 */
export function useImageExists(url: string | null | undefined): boolean {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (!url) {
      setExists(false);
      return;
    }
    
    const img = new Image();
    img.onload = () => setExists(true);
    img.onerror = () => setExists(false);
    img.src = url;
  }, [url]);

  return exists;
}

/**
 * Hook that checks a list of image paths and returns only those that actually exist on the server.
 */
export function useExistingImages(urls: string[] | undefined): string[] {
  const [existing, setExisting] = useState<string[]>([]);

  useEffect(() => {
    if (!urls || urls.length === 0) {
      setExisting([]);
      return;
    }

    let active = true;
    const promises = urls.map((url) => {
      return new Promise<string | null>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve(null);
        img.src = url;
      });
    });

    Promise.all(promises).then((results) => {
      if (active) {
        setExisting(results.filter((res): res is string => res !== null));
      }
    });

    return () => {
      active = false;
    };
  }, [urls]);

  return existing;
}
