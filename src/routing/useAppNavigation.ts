import { useCallback, useContext, useMemo } from "react";
import { RoutingPrefixCtx } from "./prefix-ctx/routing-prefix.ctx";
import { ChangeEnvParams } from "./routing.envs";
import { InspectorKeys } from "./envs/inspector.keys";
import { applyRoutingParams, joinPath } from "./routing.utils";
import { useNavigate } from "react-router-dom";

type SuffixNav = {
  key: InspectorKeys;
  params?: Record<string, unknown>;
};

type CrossEnvNavParams = {
  envParams: ChangeEnvParams;
  suffixParams?: SuffixNav;
};

const getCrossEnvUrl = ({ envParams, suffixParams }: CrossEnvNavParams) => {
  const builtPrefix = applyRoutingParams(envParams.env, envParams.params);

  if (!suffixParams) {
    return builtPrefix;
  }

  const builtSuffix = applyRoutingParams(suffixParams.key, suffixParams.params);

  return joinPath(builtPrefix, builtSuffix);
};

const buildGetSameEnvUrlFn = (prefix: string) => (suffix: SuffixNav) => {
  const builtSuffix = applyRoutingParams(suffix.key, suffix.params);
  return joinPath(prefix, builtSuffix);
};

export function useAppNavigation() {
  const navigate = useNavigate();
  const { prefix } = useContext(RoutingPrefixCtx);

  const handleGetSameEnvUrl = useMemo(
    () => buildGetSameEnvUrlFn(prefix),
    [prefix],
  );

  const handleCrossEnvNav = useCallback(
    (params: CrossEnvNavParams) => {
      const url = getCrossEnvUrl(params);
      navigate(url);
    },
    [navigate],
  );

  const handleSameEnvNav = useCallback(
    (suffix: SuffixNav) => {
      const url = handleGetSameEnvUrl(suffix);
      navigate(url);
    },
    [navigate, handleGetSameEnvUrl],
  );

  return {
    handleCrossEnvNav,
    handleSameEnvNav,
  };
}
