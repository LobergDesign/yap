import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config: CodegenConfig = {
  schema: {
    [process.env.GQL_HOST!]: {
      headers: {
        Authorization: `Bearer ${process.env.GQL_TOKEN}`,
      },
    },
  },
  documents: 'app/queries/**/*.graphql',
  generates: {
    'app/types/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        skipTypename: false,
        useTypeImports: true,
        scalars: {
          DateTime: 'string',
          JSON: 'any',
        },
      },
    },
  },
};

export default config;
