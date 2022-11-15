# Link Parser for JavaScript

This:

```
link a/b[c/d][e]/f[g[h[i/j]]]
  text <foo {bar(<hello {random}>, <world>)} baz>
  another bar

x foo/bar, foo/baz, a/b/c
y <foo>, 123, #u123, 3.14
dynamic-{term(<asdf>)} foo
{one}{two}-three{four(x)}-five
```

Becomes this:

```json
{
  "form": "stem",
  "host": [
    {
      "form": "term",
      "link": [
        {
          "form": "cord",
          "cord": "file" } ] } ],
  "stem": [
    {
      "form": "stem",
      "host": [
        {
          "form": "term",
          "link": [
            {
              "form": "cord",
              "cord": "link" } ] } ],
      "stem": [
        {
          "form": "stem",
          "host": [
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "a" } ] },
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "b" } ] },
            {
              "form": "stem",
              "host": [
                {
                  "form": "term",
                  "link": [
                    {
                      "form": "cord",
                      "cord": "c" } ] },
                {
                  "form": "term",
                  "link": [
                    {
                      "form": "cord",
                      "cord": "d" } ] } ],
              "stem": [] },
            {
              "form": "stem",
              "host": [
                {
                  "form": "term",
                  "link": [
                    {
                      "form": "cord",
                      "cord": "e" } ] } ],
              "stem": [] },
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "f" } ] },
            {
              "form": "stem",
              "host": [
                {
                  "form": "term",
                  "link": [
                    {
                      "form": "cord",
                      "cord": "g" } ] },
                {
                  "form": "stem",
                  "host": [
                    {
                      "form": "term",
                      "link": [
                        {
                          "form": "cord",
                          "cord": "h" } ] },
                    {
                      "form": "stem",
                      "host": [
                        {
                          "form": "term",
                          "link": [
                            {
                              "form": "cord",
                              "cord": "i" } ] },
                        {
                          "form": "term",
                          "link": [
                            {
                              "form": "cord",
                              "cord": "j" } ] } ],
                      "stem": [] } ],
                  "stem": [] } ],
              "stem": [] } ],
          "stem": [] } ] } ] }
$ node tmp/js
{
  "form": "stem",
  "host": [
    {
      "form": "term",
      "link": [
        {
          "form": "cord",
          "cord": "file" } ] } ],
  "stem": [
    {
      "form": "stem",
      "host": [
        {
          "form": "term",
          "link": [
            {
              "form": "cord",
              "cord": "link" } ] } ],
      "stem": [
        {
          "form": "stem",
          "host": [
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "a" } ] },
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "b" } ] },
            {
              "form": "stem",
              "host": [
                {
                  "form": "term",
                  "link": [
                    {
                      "form": "cord",
                      "cord": "c" } ] },
                {
                  "form": "term",
                  "link": [
                    {
                      "form": "cord",
                      "cord": "d" } ] } ],
              "stem": [] },
            {
              "form": "stem",
              "host": [
                {
                  "form": "term",
                  "link": [
                    {
                      "form": "cord",
                      "cord": "e" } ] } ],
              "stem": [] },
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "f" } ] },
            {
              "form": "stem",
              "host": [
                {
                  "form": "term",
                  "link": [
                    {
                      "form": "cord",
                      "cord": "g" } ] },
                {
                  "form": "stem",
                  "host": [
                    {
                      "form": "term",
                      "link": [
                        {
                          "form": "cord",
                          "cord": "h" } ] },
                    {
                      "form": "stem",
                      "host": [
                        {
                          "form": "term",
                          "link": [
                            {
                              "form": "cord",
                              "cord": "i" } ] },
                        {
                          "form": "term",
                          "link": [
                            {
                              "form": "cord",
                              "cord": "j" } ] } ],
                      "stem": [] } ],
                  "stem": [] } ],
              "stem": [] } ],
          "stem": [] },
        {
          "form": "stem",
          "host": [
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "text" } ] } ],
          "stem": [
            {
              "form": "stem",
              "host": [
                {
                  "form": "text",
                  "link": [
                    {
                      "form": "cord",
                      "text": "foo " },
                    {
                      "form": "stem",
                      "host": [
                        {
                          "form": "term",
                          "link": [
                            {
                              "form": "cord",
                              "cord": "bar" } ] } ],
                      "stem": [
                        {
                          "form": "stem",
                          "host": [
                            {
                              "form": "text",
                              "link": [
                                {
                                  "form": "cord",
                                  "text": "hello " },
                                {
                                  "form": "stem",
                                  "host": [
                                    {
                                      "form": "term",
                                      "link": [
                                        {
                                          "form": "cord",
                                          "cord": "random" } ] } ],
                                  "stem": [] } ] } ],
                          "stem": [] },
                        {
                          "form": "stem",
                          "host": [
                            {
                              "form": "text",
                              "link": [
                                {
                                  "form": "cord",
                                  "text": "world" } ] } ],
                          "stem": [] } ] },
                    {
                      "form": "cord",
                      "text": " baz" } ] } ],
              "stem": [] } ] },
        {
          "form": "stem",
          "host": [
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "another" } ] } ],
          "stem": [
            {
              "form": "stem",
              "host": [
                {
                  "form": "term",
                  "link": [
                    {
                      "form": "cord",
                      "cord": "bar" } ] } ],
              "stem": [] } ] } ] },
    {
      "form": "stem",
      "host": [
        {
          "form": "term",
          "link": [
            {
              "form": "cord",
              "cord": "x" } ] } ],
      "stem": [
        {
          "form": "stem",
          "host": [
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "foo" } ] },
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "bar" } ] } ],
          "stem": [] },
        {
          "form": "stem",
          "host": [
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "foo" } ] },
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "baz" } ] } ],
          "stem": [] },
        {
          "form": "stem",
          "host": [
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "a" } ] },
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "b" } ] },
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "c" } ] } ],
          "stem": [] } ] },
    {
      "form": "stem",
      "host": [
        {
          "form": "term",
          "link": [
            {
              "form": "cord",
              "cord": "y" } ] } ],
      "stem": [
        {
          "form": "stem",
          "host": [
            {
              "form": "text",
              "link": [
                {
                  "form": "cord",
                  "text": "foo" } ] } ],
          "stem": [] },
        {
          "form": "stem",
          "host": [
            {
              "form": "mark",
              "mark": 123 } ],
          "stem": [] },
        {
          "form": "stem",
          "host": [
            {
              "form": "code",
              "base": "u",
              "code": "123" } ],
          "stem": [] },
        {
          "form": "stem",
          "host": [
            {
              "form": "comb",
              "fill": 3.14 } ],
          "stem": [] } ] },
    {
      "form": "stem",
      "host": [
        {
          "form": "term",
          "link": [
            {
              "form": "cord",
              "cord": "dynamic-" },
            {
              "form": "stem",
              "host": [
                {
                  "form": "term",
                  "link": [
                    {
                      "form": "cord",
                      "cord": "term" } ] } ],
              "stem": [
                {
                  "form": "stem",
                  "host": [
                    {
                      "form": "text",
                      "link": [
                        {
                          "form": "cord",
                          "text": "asdf" } ] } ],
                  "stem": [] } ] } ] } ],
      "stem": [
        {
          "form": "stem",
          "host": [
            {
              "form": "term",
              "link": [
                {
                  "form": "cord",
                  "cord": "foo" } ] } ],
          "stem": [] } ] },
    {
      "form": "stem",
      "host": [
        {
          "form": "term",
          "link": [
            {
              "form": "stem",
              "host": [
                {
                  "form": "term",
                  "link": [
                    {
                      "form": "cord",
                      "cord": "one" } ] } ],
              "stem": [] },
            {
              "form": "stem",
              "host": [
                {
                  "form": "term",
                  "link": [
                    {
                      "form": "cord",
                      "cord": "two" } ] } ],
              "stem": [] },
            {
              "form": "cord",
              "cord": "-three" },
            {
              "form": "stem",
              "host": [
                {
                  "form": "term",
                  "link": [
                    {
                      "form": "cord",
                      "cord": "four" } ] } ],
              "stem": [
                {
                  "form": "stem",
                  "host": [
                    {
                      "form": "term",
                      "link": [
                        {
                          "form": "cord",
                          "cord": "x" } ] } ],
                  "stem": [] } ] },
            {
              "form": "cord",
              "cord": "-five" } ] } ],
      "stem": [] } ] }
```
