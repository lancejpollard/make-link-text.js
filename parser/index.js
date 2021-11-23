
module.exports = parse

function parse(list) {
  let node = { name: 'base', link: [] }
  let child
  let stack = [node]
  for (let token of list) {
    node = stack[stack.length - 1]
    switch (token.form) {
      case `base-arch`:
        child = node.link[node.link.length - 1]
        stack.push(child)
        break
      case `head-arch`:
        stack.pop()
        break
      case `base-text`:
        child = {
          form: `text`,
          link: []
        }
        node.link.push(child)
        stack.push(child)
        break
      case `head-text`:
        stack.pop()
        break
      case `base-term`:
        child = {
          form: `term`,
          link: []
        }
        node.link.push(child)
        stack.push(child)
        break
      case `head-term`:
        stack.pop()
        break
      case `base-read`:
        child = {
          form: `read`,
          link: []
        }
        let childNode = node.link[node.link.length - 1]
        childNode.link.push(child)
        stack.push(child)
        break
      case `head-read`:
        stack.pop()
        break
      case `text`:
        node.link.push({
          form: `cord`,
          text: token.text
        })
        break
      case `slot`:
        break
      case `mark`:
        child = {
          form: `mark`,
          mark: parseInt(token.text, 10)
        }
        node.link.push(child)
        break
      case `code`:
        token.text.match(/#(\w)(\w+)/)
        let form = RegExp.$1
        let val = RegExp.$2
        if (form !== 'u') throw new Error(form)
        child = {
          form: 'code',
          code: String.fromCharCode(parseInt(val, 16))
        }
        node.link.push(child)
        break
      case `mark-line`:
        child = {
          form: `mark-line`,
          fill: parseFloat(token.text)
        }
        node.link.push(child)
        break
      case `nest`:
        child = parsePath(token.text)
        node.link.push(child)
        break
    }
  }
  return stack.shift().link[0]
}

const patterns = [
  [/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*/, 'name'],
  [/^\[/, 'base-read'],
  [/^\]/, 'head-read'],
  [/^\//, 'stem']
]

function parsePath(str) {
  let text = str
  let node
  let nest = []
  let result = nest
  let stack = [nest]
  while (str.length) {
    nest = stack[stack.length - 1]
    p:
    for (let pattern of patterns) {
      let match = str.match(pattern[0])
      if (match) {
        if (pattern[1] === 'name') {
          node = {
            form: `term`,
            name: match[0],
            link: []
          }
          nest.push(node)
        } else if (pattern[1] === 'stem') {
          stack.push(node.link)
        } else if (pattern[1] === 'base-read') {
          node = {
            form: 'read',
            link: []
          }
          nest.push(node)
          stack.push(node.link)
        } else if (pattern[1] === 'head-read') {
          stack.pop()
        }

        str = str.substr(match[0].length)
        break p
      }
    }
  }
  return result[0]
}
