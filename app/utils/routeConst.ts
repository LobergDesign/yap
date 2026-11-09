export const routePath = {
  FRONTPAGE: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  CONTACT: '/contact',
};

export const setFullProjectPath = (path: string) =>
  `${routePath.PROJECTS}/${path}`;
