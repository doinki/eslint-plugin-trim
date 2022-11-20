import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

/**
 * @type {import('rollup').RollupOptions}
 */
const rollupConfig = {
  external: [/node_modules/],
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    preserveModules: true,
  },
  plugins: [
    nodeResolve({ extensions }),
    babel({
      extensions,
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
    }),
  ],
};

export default rollupConfig;
