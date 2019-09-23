import pkg from './package.json';
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import livereload from 'live-server'

const pro = process.env.NODE_ENV == 'production'
const dev = process.env.NODE_ENV == 'dev'


const external = [ 'react' ]
const globals = { react: 'React' }
const plugins = [
  babel(),
  resolve(),
  commonjs(),
  terser()
]

const config = [
  {
    input: 'src/index.js',
    external,
    plugins,
    output: [
      {
        file: pkg.browser,
        format: 'umd',
        name: 'Flow',
        exports: 'named',
        globals
      },
      {
        file: pkg.main,
        format: 'cjs',
        name: 'Flow',
        exports: 'named',
        globals
      },
      // {
      //   file: pkg.module,
      //   format: 'es',
      // }
    ]
  },
  {
    input: 'src/playground.js',
    external,
    plugins,
    output: [
      {
        file: 'dist/playground.umd.js',
        format: 'umd',
        name: 'Playground',
        exports: 'named',
        globals
      },
      // {
      //   file: 'dist/playground.esm.js',
      //   format: 'es',
      // }
    ]
  }
]


dev && livereload.start({ file: 'index.html', watch: ['dist/playground.js'] });


export default config


