export default {
  input: 'tmp/esm5/ngx-reflection.js',
  output: {
    file: 'dist/bundles/ngx-reflection.umd.js',
    format: 'umd'
  },
  name: 'ng.ngx-reflection',
  external: ['@angular/core'],
  globals: {
    '@angular/core': 'ng.core'
  }
}
