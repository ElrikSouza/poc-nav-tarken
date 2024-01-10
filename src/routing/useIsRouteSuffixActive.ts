import { useMatch } from "react-router-dom";
import { joinPath } from "./routing.utils";
import { useContext } from "react";
import { RoutingPrefixCtx } from "./prefix-ctx/routing-prefix.ctx";

export function useIsRouteSuffixActive({ routeKey }: { routeKey: string }) {
  const { prefix } = useContext(RoutingPrefixCtx);
  const path = joinPath(prefix, routeKey);
  const match = useMatch({ path });

  return !!match;
}
