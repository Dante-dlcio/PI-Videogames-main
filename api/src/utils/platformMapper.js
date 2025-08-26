export const mapPlatforms = (platforms, parentPlatforms) => {
  if (parentPlatforms?.length > 0) {
    return parentPlatforms.map((p) => p.platform.name);
  }
  if (platforms?.length > 0) {
    return platforms.map((p) => p.platform.name);
  }
  return ["Unknown"];
};
