
const prettify = require("@lancejpollard/pretty-compact-json.js");
const form = require('..')

const nest = form(`link a/b[c/d][e]/f[g[h[i/j]]]
  text <foo {bar(<hello {random}>, <world>)} baz>
  another bar

x foo/bar, foo/baz, a/b/c
y <foo>, 123, #u123, 3.14
dynamic-{term(<asdf>)} foo
{one}{two}-three{four(x)}-five`)

console.log(prettify(nest))

function transform(node) {
  if (node.form == 'site') {
    return {
      type: 'Identifier',
      name: node.name,
    };
  } else {
    const [base, ...props] = node.link;
    return props.reduce((lhs, rhs) => ({
      type: 'MemberExpression',
      object: lhs,
      property: transform(rhs),
      computed: rhs.form == 'nest',
    }), transform(base));
  }
}
