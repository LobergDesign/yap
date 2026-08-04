import withNuxt from './.nuxt/eslint.config.mjs';
import baselineJs from 'eslint-plugin-baseline-js';
export default withNuxt(
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/html-self-closing': 'off',
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
    },
    plugins: {
      'baseline-js': baselineJs,
    },
  },
  baselineJs.configs.recommended({
    available: 'widely',
    level: 'warn',
  }),
);
