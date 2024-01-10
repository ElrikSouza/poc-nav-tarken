export const applyRoutingParams = (
  path: string,
  params?: Record<string, unknown>,
) => {
  const segments = path?.split("/");

  const parsedSegments = segments?.map((segment) => {
    if (segment.startsWith(":")) {
      return params?.[segment?.slice(1)];
    }

    return segment;
  });

  return parsedSegments?.join("/");
};

// ensure ends and starts with /
const adjustPrefix = (prefix: string) => {
  return `${!prefix.startsWith("/") ? "/" : ""}${
    prefix.endsWith("/") ? prefix : `${prefix}/`
  }`;
};

const adjustSuffix = (suffix: string) => {
  return suffix.startsWith("/") ? suffix.slice(1) : suffix;
};

export const joinPath = (prefix: string, suffix: string) => {
  return `${adjustPrefix(prefix)}${adjustSuffix(suffix)}`;
};
