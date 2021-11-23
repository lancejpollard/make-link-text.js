
const form = require('..')

test(`link a/b[c/d][e]`)

function test(a, b) {
  console.log(JSON.stringify(form(a), null, 2))
}
