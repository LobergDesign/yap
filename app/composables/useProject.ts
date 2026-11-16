export const useProject = (slug: string) =>
  useFetch(`/api/projects/${encodeURIComponent(slug)}`);
