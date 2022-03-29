import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.js', format: 'es' },
      { file: 'dist/index.cjs', format: 'cjs' },
    ],
    plugins: [
      typescript({ compilerOptions: { module: 'esnext' } }),
      nodeResolve({ resolveOnly: [], modulesOnly: true }),
    ],
  },
];
