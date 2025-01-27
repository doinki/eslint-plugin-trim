import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  env: { NODE_ENV: 'production' },
  esbuildOptions: (config) => {
    config.sourcemap = true;
  },
  format: ['cjs', 'esm'],
  target: ['node10'],
  treeshake: true,
});
