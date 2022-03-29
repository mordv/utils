import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/index.ts',
    output: [
      { dir: 'dist', format: 'es' },
      { file: 'dist/index.cjs', format: 'cjs' },
    ],
    plugins: [
      typescript({ compilerOptions: { module: 'esnext', declaration: true} }),
      nodeResolve({ resolveOnly: [], modulesOnly: true }),
    ],
  },
];
