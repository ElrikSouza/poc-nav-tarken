import { useCallback, useContext, useMemo } from "react";
import { RoutingPrefixCtx } from "./prefix-ctx/routing-prefix.ctx";
import { ChangeEnvParams } from "./routing.envs";
import { InspectorKeys } from "./envs/inspector.keys";
import { applyRoutingParams, joinPath } from "./routing.utils";
import { useLocation, useNavigate } from "react-router-dom";

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

const replacePrefix = ({
  currentPathname,
  previousPrefix,
  newPrefix,
}: {
  currentPathname: string;
  previousPrefix: string;
  newPrefix: string;
}) => {
  console.log({ currentPathname, previousPrefix, newPrefix });
  return `${newPrefix}${currentPathname.slice(previousPrefix.length)}`;
};

export function useAppNavigation(overrideEnv?: ChangeEnvParams) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { prefix: ctxPrefix } = useContext(RoutingPrefixCtx);
  const prefix = !overrideEnv
    ? ctxPrefix
    : applyRoutingParams(overrideEnv?.env, overrideEnv?.params);

  const handleGetSameEnvUrl = useMemo(
    () => buildGetSameEnvUrlFn(prefix),
    [prefix],
  );

  const handleCrossEnvNav = useCallback(
    (params: CrossEnvNavParams, replace = false) => {
      if (replace) {
        const url = replacePrefix({
          previousPrefix: prefix,
          currentPathname: pathname,
          newPrefix: applyRoutingParams(
            params.envParams.env,
            params.envParams.params,
          ),
        });
        navigate(url);
        return;
      }
      const url = getCrossEnvUrl(params);
      navigate(url);
    },
    [navigate, pathname, prefix],
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
