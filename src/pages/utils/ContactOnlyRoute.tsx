import { ReactNode, useContext, useEffect } from "react";
import { InspectorViewMode } from "../inspector/inspector.types";
import { InspCtx } from "./InspRoutesCtx";

export const ContactOnlyRoute = ({ children }: { children: ReactNode }) => {
  const { onRedirectToFallback, viewMode } = useContext(InspCtx);

  useEffect(() => {
    if (viewMode === InspectorViewMode.CustomerMultiContact) {
      onRedirectToFallback();
    }
  }, [viewMode, onRedirectToFallback]);

  return <>{children}</>;
};
