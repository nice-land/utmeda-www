import { useEffect, useState } from "react";

type Orientation = "portrait" | "landscape";

export const useOrientation = (): Orientation => {
  if (typeof window == "undefined") {
    return "landscape";
  }

  const [landscape, set] = useState(true);

  const handleOrientationChange = (ev: MediaQueryListEvent) => set(ev.matches);

  useEffect(() => {
    const media = window.matchMedia("screen and (orientation: landscape)");

    set(media.matches);

    if (media.addEventListener) {
      media.addEventListener("change", handleOrientationChange);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", handleOrientationChange);
      }
    };
  }, []);

  return landscape ? "landscape" : "portrait";
};
