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
      // `typescript-operations` v6 is self-sufficient: it emits the enums and
      // input types the operations actually use. Adding the `typescript`
      // plugin here would re-declare those same names in this file (oxc parse
      // error on duplicate identifiers) and dump the entire Hygraph schema.
      plugins: ['typescript-operations', 'typed-document-node'],
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
