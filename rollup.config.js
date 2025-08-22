// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import babel from '@rollup/plugin-babel';

// export default {
//   input: 'src/lib/index.js',
//   output: [
//     {
//       file: 'dist/index.js',
//       format: 'cjs',
//       exports: 'named'
//     },
//     {
//       file: 'dist/index.esm.js',
//       format: 'esm',
//       exports: 'named'
//     }
//   ],
//   plugins: [
//     resolve({
//       browser: true,
//       extensions: ['.js', '.jsx', '.ts', '.tsx']
//     }),
//     commonjs(),
//     babel({
//       babelHelpers: 'bundled',
//       exclude: 'node_modules/**',
//       extensions: ['.js', '.jsx', '.ts', '.tsx'],
//       presets: ['@babel/preset-react', '@babel/preset-env']
//     })
//   ],
//   external: ['react', 'react-dom', 'prop-types']
// };
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/lib/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      exports: 'named'
    }
  ],
  plugins: [
    resolve({
      browser: true,
      extensions: ['.js', '.jsx']
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx'],
      presets: ['@babel/preset-react', '@babel/preset-env']
    }),
    postcss({
      extract: true,
      modules: true,
      use: ['sass'],
    })
  ],
  external: ['react', 'react-dom', 'prop-types']
};