import { ReactNode } from "react";
import { InspCtx } from "./InspRoutesCtx";
import { InspectorViewMode } from "../inspector/inspector.types";

export const InspRoutesCtxProvider = ({
  onRedirectToFallback,
  viewMode,
  children,
}: {
  onRedirectToFallback: () => void;
  viewMode: InspectorViewMode;
  children: ReactNode;
}) => {
  return (
    <InspCtx.Provider value={{ onRedirectToFallback, viewMode }}>
      {children}
    </InspCtx.Provider>
  );
};
