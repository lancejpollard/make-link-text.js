
module.exports = parse

function parse(list) {
  const start = {
    form: 'stem',
    host: [
      {
        form: 'term',
        link: [
          {
            form: 'cord',
            cord: 'file'
          }
        ]
      }
    ],
    stem: []
  }
  const stack = [ start ]
  let i = 0

  while (i < list.length) {
    const token = list[i++]
    // console.log(token.form, stack)
    switch (token.form) {
      case `term-open`: {
        const node = stack[stack.length - 1]
        const term = {
          form: 'term',
          link: []
        }
        node.host.push(term)
        stack.push(term)
        break
      }
      case `term-close`: {
        stack.pop()
        break
      }
      case `open-parenthesis`: {
        const node = stack[stack.length - 1]
        const stem = {
          form: 'stem',
          host: [],
          stem: []
        }
        node.stem.push(stem)
        stack.push(stem)
        break
      }
      case `close-parenthesis`: {
        stack.pop()
        break
      }
      case `slot`: {
        stack.pop()
        const node = stack[stack.length - 1]

        const stem = {
          form: 'stem',
          host: [],
          stem: []
        }
        node.stem.push(stem)
        stack.push(stem)
        break
      }
      case `term-part`: {
        const term = stack[stack.length - 1]
        const last = term.link[term.link.length - 1]
        if (last && last.form === 'cord') {
          last.cord += token.text
        } else {
          term.link.push({
            form: 'cord',
            cord: token.text
          })
        }
        break
      }
      case `nest-separator`: {
        break
      }
      case `open-nest`: {
        const node = stack[stack.length - 1]
        const stem = {
          form: 'stem',
          host: [],
          stem: []
        }
        node.host.push(stem)
        stack.push(stem)
        break
      }
      case `close-nest`: {
        stack.pop()
        break
      }
      case `open-text`: {
        const node = stack[stack.length - 1]
        const text = {
          form: 'text',
          link: []
        }
        node.host.push(text)
        stack.push(text)
        break
      }
      case `close-text`: {
        stack.pop()
        break
      }
      case `open-interpolation`: {
        const text = stack[stack.length - 1]
        const stem = {
          form: 'stem',
          host: [],
          stem: []
        }
        text.link.push(stem)
        stack.push(stem)
        break
      }
      case `close-interpolation`: {
        stack.pop()
        break
      }
      case `text`: {
        const text = stack[stack.length - 1]
        const last = text.link[text.link.length - 1]
        if (last && last.form === 'cord') {
          last.cord += token.text
        } else {
          text.link.push({
            form: `cord`,
            text: token.text
          })
        }
        break
      }
      case `line`: {
        stack.pop()
        break
      }
      case `mark`: {
        const stem = stack[stack.length - 1]
        const mark = {
          form: `mark`,
          mark: parseInt(token.text, 10)
        }
        stem.host.push(mark)
        break
      }
      case `code`: {
        const node = stack[stack.length - 1]
        token.text.match(/#(\w)(\w+)/)
        let form = RegExp.$1
        let val = RegExp.$2
        if (!form.match(/[ubohx]/)) throw new Error(form)
        const code = {
          form: 'code',
          base: form,
          code: val//String.fromCharCode(parseInt(val, 16))
        }
        node.host.push(code)
        break
      }
      case `comb`: {
        const node = stack[stack.length - 1]
        const comb = {
          form: `comb`,
          fill: parseFloat(token.text)
        }
        node.host.push(comb)
        break
      }
    }
  }
  return start
}
