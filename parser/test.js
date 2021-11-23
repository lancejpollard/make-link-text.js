
const form = require('..')

test(`link a/b[c/d][e]/f[g[h[i/j]]], text <foo {bar <hello {random}>, <world>} baz>`)

function test(a, b) {
  console.log(JSON.stringify(form(a), null, 2))
}
