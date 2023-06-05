import { useMemo } from "react";
import { useResizeDetector } from "react-resize-detector";
import { MEDIA_BREAKPOINTS } from "../constants";

const useMedia = () => {
  const { width: screenWidth, ref } = useResizeDetector();

  const isSmall = useMemo(() => {
    return MEDIA_BREAKPOINTS.SMALL >= screenWidth;
  }, [screenWidth]);

  const isMedium = useMemo(() => {
    return MEDIA_BREAKPOINTS.SMALL <= screenWidth && MEDIA_BREAKPOINTS.MEDIUM >= screenWidth;
  }, [screenWidth]);

  const isLarge = useMemo(() => {
    return MEDIA_BREAKPOINTS.MEDIUM <= screenWidth && MEDIA_BREAKPOINTS.LARGE >= screenWidth;
  }, [screenWidth]);

  const isXlarge = useMemo(() => {
    return MEDIA_BREAKPOINTS.LARGE <= screenWidth;
  }, [screenWidth]);

  return { isSmall, isMedium, isLarge, isXlarge, ref };
};

export { useMedia };
