
const fs = require('fs')
const form = require('..')

test(`
link a/b[c/d][e]/f[g[h[i/j]]]
  text <foo {bar <hello {random}>, <world>} baz>
  another bar

link foo/bar, foo/baz, a/b/c
link <foo>
`)

function test(a, b) {
  fs.writeFileSync('tmp/out.json', JSON.stringify(form(a), null, 2))
}
