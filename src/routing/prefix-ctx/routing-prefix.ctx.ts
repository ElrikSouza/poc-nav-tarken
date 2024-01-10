import { createContext } from "react";

type RoutingPrefixCtxVal = {
  prefix: string;
};

export const RoutingPrefixCtx = createContext<RoutingPrefixCtxVal>({
  prefix: "",
});
