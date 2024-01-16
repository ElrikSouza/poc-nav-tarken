import { createContext } from "react";
import { InspectorViewMode } from "../inspector/inspector.types";

type InspRouteCtxVals = {
  onRedirectToFallback: () => void;
  viewMode: InspectorViewMode | null;
};

export const InspCtx = createContext<InspRouteCtxVals>({
  onRedirectToFallback: () => {},
  viewMode: null,
});
