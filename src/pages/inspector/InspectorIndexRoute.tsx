import { useEffect } from "react";
import { useAppNavigation } from "../../routing/useAppNavigation";
import { InspectorKeys } from "../../routing/envs/inspector.keys";

export const InspectorIndexRoute = () => {
  const { handleSameEnvNav } = useAppNavigation();

  useEffect(() => {
    handleSameEnvNav({ key: InspectorKeys.Summary });
  }, [handleSameEnvNav]);

  return null;
};
