interface AppSlugs {
  slugProjects: string;
  slugAbout: string;
  slugContact: string;
}

declare module 'nuxt/schema' {
  interface AppConfigInput extends AppSlugs {}
  interface AppConfig extends AppSlugs {}
}
export {};
