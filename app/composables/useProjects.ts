// Fixed key so the list can be read elsewhere with useNuxtData('projects')
export const useProjects = () => useFetch('/api/projects', { key: 'projects' });
