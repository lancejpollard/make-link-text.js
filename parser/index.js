
module.exports = parse

function parse(list) {
  let node = { form: 'host', name: 'text', link: [] }
  let start = node
  let child
  let stack = [node]
  for (let token of list) {
    node = stack[stack.length - 1]
    switch (token.form) {
      case `open-paren`:
        child = node.link[node.link.length - 1]
        stack.push(child)
        break
      case `close-paren`:
        stack.pop()
        break
      case `open-text`:
        child = {
          form: `text`,
          link: []
        }
        node.link.push(child)
        stack.push(child)
        break
      case `close-text`:
        stack.pop()
        break
      case `open-term`:
        child = {
          form: `read`,
          link: []
        }
        node.link.push(child)
        stack.push(child)
        break
      case `close-term`:
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
  return start
}

const patterns = [
  [/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*/, 'name'],
  [/^\[/, 'open'],
  [/^\]/, 'close'],
  [/^\//, 'stem']
]

function parsePath(str) {
  if (str.match(/[\[\/]/)) {
    return parseNest(str)
  } else {
    return parseHost(str)
  }
}

function parseHost(str) {
  return { form: 'host', name: str, link: [] }
}

function parseNest(str) {
  let node
  let nest = { form: 'nest', link: [] }
  let host = nest
  let stack = [nest]
  while (str.length) {
    nest = stack[stack.length - 1]
    p:
    for (let pattern of patterns) {
      let match = str.match(pattern[0])
      if (match) {
        if (pattern[1] === 'name') {
          node = {
            form: `site`,
            name: match[0],
          }
          nest.link.push(node)
        } else if (pattern[1] === 'stem') {

        } else if (pattern[1] === 'open') {
          node = {
            form: 'nest',
            link: []
          }
          nest.link.push(node)
          stack.push(node)
        } else if (pattern[1] === 'close') {
          stack.pop()
        }

        str = str.substr(match[0].length)
        break p
      }
    }
  }

  return host
}
