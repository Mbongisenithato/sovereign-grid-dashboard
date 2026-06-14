import next from '@next/eslint-plugin-next';

export default [
  {
    // Tell ESLint to ignore the build folder and other generated files
    ignores: [
      ".next/*",
      "node_modules/*",
      "dist/*",
      "build/*"
    ],
  },
  {
    plugins: {
      '@next/next': next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
    },
  },
];