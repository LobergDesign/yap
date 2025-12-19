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
    'app/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        skipTypename: false,
        scalars: {
          DateTime: 'string',
          JSON: 'any',
        },
      },
    },
  },
};

export default config;
