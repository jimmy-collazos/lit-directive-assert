import {nodeResolve} from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';

export default [
  // UMD minify(node and browser)
  {
    input: './lit-directive-assert.js',
    plugins: [
      nodeResolve(),
      terser()
    ],
    output: {
      exports: 'named',
      file: './min.js',
      format: 'umd',
      name: 'litDirectiveAssert'
    }
  },
];
