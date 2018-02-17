export default {
  entry: 'dist/index.js',
  dest: 'dist/bundles/ngx-reflection.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ngx-reflection',
  globals: {
    '@angular/core': 'ng.core'
  }
}
