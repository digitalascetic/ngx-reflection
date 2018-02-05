export default {
  entry: 'dist/lib/index.js',
  dest: 'dist/bundles/ngx-reflection.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ngx-reflection',
  globals: {
    '@angular/core': 'ng.core'
  }
}
