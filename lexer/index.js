
module.exports = lex

const patterns = [
  [/^[a-z][a-z0-9\-\/\[\]]*/, 'nest', true],
  [/^\(/, 'open-paren'],
  [/^ /, 'open-paren', null, true],
  [/^\)/, 'close-paren'],
  [/^</, 'open-text'],
  [/^>/, 'close-text'],
  [/^\{/, 'open-term'],
  [/^\}/, 'close-term'],
  [/^\[/, 'open-nest'],
  [/^\]/, 'close-nest'],
  [/^[@\/\.][^\s]*/, 'text', true],
  [/^, */, 'slot'],
  [/^-?\d+\.\d+/, 'mark-line', true],
  [/^-?\d+/, 'mark', true],
  [/^#\w+/, 'code', true],
]

const stringPatterns = [
  [/^\{/, 'open-term'],
  [/^(?:\\[<>\{\}])+/, 'text', true, null, t => t.replace(/\\/g, '')],
  [/^[^\{>]+/, 'text', true],
  [/^>/, 'close-text'],
]

function lex(str) {
  const tokens = []
  // tokens.push({ form: 'nest', text: 'start' })
  // tokens.push({ form: 'open-paren' })
  let indents = [0]
  let nesting = 0
  let matched = false
  let isString = false
  while (str.length) {
    if (str[0] == '\n') {
      str = str.substr(1)
      while (true) {
        let match = str.match(/^ *\n/)
        if (match) {
          str = str.substr(match[0].length)
        } else {
          break
        }
      }
      if (str.match(/^ *$/)) {
        while (nesting > 1) {
          tokens.push({
            form: 'close-paren'
          })
          nesting--
        }
        while (indents.length) {
          tokens.push({
            form: 'close-paren'
          })
          indents.pop()
        }
        break
      }
      if (!matched) {
        continue
      }
      let match = str.match(/^ +/)
      let newIndent = match ? match[0].length : 0
      if (match) str = str.substr(match[0].length)
      if (newIndent % 2 != 0) throw new Error('Indentation error')
      let oldIndent = indents[indents.length - 1]
      if (newIndent === oldIndent) {
        while (nesting) {
          tokens.push({
            form: 'close-paren'
          })
          nesting--
        }
        // foo bar
        //   foo bar
        //   foo bar
        tokens.push({
          form: 'slot'
        })
      } else if (newIndent > oldIndent) {
        while (nesting > 1) {
          tokens.push({
            form: 'close-paren'
          })
          nesting--
        }
        if (newIndent - oldIndent != 2) throw new Error('Indentation error')
        // foo bar
        //   foo bar baz
        //     foo bar
        tokens.push({
          form: 'slot'
        })
        indents.push(newIndent)
        nesting = 0
      } else {
        if (Math.abs(newIndent - oldIndent) % 2 != 0) throw new Error('Indentation error')
        while (nesting) {
          tokens.push({
            form: 'close-paren'
          })
          nesting--
        }
        let diff = (oldIndent - newIndent) / 2
        while (diff) {
          tokens.push({
            form: 'close-paren'
          })
          diff--
          indents.pop()
        }
        tokens.push({
          form: 'slot'
        })
        // indents.push(newIndent)
      }
    } else {
      let p = isString ? stringPatterns : patterns
      x:
      for (let pattern of p) {
        let match = str.match(pattern[0])
        if (match) {
          matched = true
          let text = match[0]
          let attrs = {
            form: pattern[1]
          }
          if (pattern[1] === 'open-text') {
            isString = true
          }
          if (pattern[1] === 'close-text' || pattern[1] === 'open-term') {
            isString = false
          } else if (pattern[1] === 'close-term') {
            isString = true
          }
          if (pattern[3]) {
            nesting++
          }
          if (pattern[2]) attrs.text = pattern[4] ? pattern[4](text) : text
          tokens.push(attrs)
          str = str.substr(text.length)
          break x
        }
      }
    }
  }
  while (nesting > 1) {
    tokens.push({
      form: 'close-paren'
    })
    nesting--
  }
  while (indents.length) {
    tokens.push({
      form: 'close-paren'
    })
    indents.pop()
  }
  // tokens.push({ form: 'close-paren' })
  return tokens
}
