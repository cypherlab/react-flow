const pro = process.env.NODE_ENV == 'production'
const dev = process.env.NODE_ENV == 'dev'

import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import livereload from 'live-server'

dev && livereload.start({ file: 'index.html', watch: ['dist/playground.js'] })

const Bundle = (filename, format, exportName) => { 

  const bundle = {
    input: `src/${filename}.js`,
    output: {
      file: `dist/${filename}.${format}.js`,
      format: ({ esm: 'es', umd: 'umd' })[format],     
      globals: { react: "React" }
    },
    external: [ 'react' ],
    plugins: [
      babel(),
      resolve(),
      commonjs(),
      terser()
    ]
  }

  if(format == 'umd'){
    bundle.output.exports = 'named'
    bundle.output.name = exportName
  }


  return bundle
}



export default [

    Bundle('index', 'esm')
  , Bundle('index', 'umd', 'Flow')
  , Bundle('playground', 'umd', 'Playground')

]