import { useEffect, useState } from "react";

type Orientation = "portrait" | "landscape";

export const useOrientation = (): Orientation => {
  if (typeof window == "undefined") {
    return "landscape";
  }

  const [landscape, set] = useState(true);

  const handleOrientationChange = () => {
    const media = window.matchMedia("screen and (orientation: landscape)");

    set(media.matches);
  };

  useEffect(() => {
    handleOrientationChange();

    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return landscape ? "landscape" : "portrait";
};
