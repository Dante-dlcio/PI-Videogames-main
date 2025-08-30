export const mapGenres = (genres, includeNameObject = false) => {
  if (!genres?.length) return [];
  return genres.map((g) => (includeNameObject ? { name: g.name } : g.name));
};
