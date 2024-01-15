import { ReactNode, useMemo } from "react";
import { ChangeEnvParams } from "../routing.envs";
import { applyRoutingParams } from "../routing.utils";
import { RoutingPrefixCtx } from "./routing-prefix.ctx";

export const RoutingMountPoint = ({
  env,
  children,
}: {
  env: ChangeEnvParams;
  children: ReactNode;
}) => {
  const prefix = useMemo(() => applyRoutingParams(env.env, env.params), [env]);
  console.log({ prefix });

  return (
    <RoutingPrefixCtx.Provider value={{ prefix }}>
      {children}
    </RoutingPrefixCtx.Provider>
  );
};
