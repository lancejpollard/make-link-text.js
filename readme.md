
# Link Parser for JavaScript

This:

```
link a/b[c/d][e]/f[g[h[i/j]]]
  text <foo {bar <hello {random}>, <world>} baz>
  another bar

link foo/bar, foo/baz, a/b/c
```

Becomes this:

```json
{
  "form": "host",
  "name": "text",
  "link": [
    {
      "form": "host",
      "name": "link",
      "link": [
        {
          "form": "nest",
          "link": [
            {
              "form": "site",
              "name": "a"
            },
            {
              "form": "site",
              "name": "b"
            },
            {
              "form": "nest",
              "link": [
                {
                  "form": "site",
                  "name": "c"
                },
                {
                  "form": "site",
                  "name": "d"
                }
              ]
            },
            {
              "form": "nest",
              "link": [
                {
                  "form": "site",
                  "name": "e"
                }
              ]
            },
            {
              "form": "site",
              "name": "f"
            },
            {
              "form": "nest",
              "link": [
                {
                  "form": "site",
                  "name": "g"
                },
                {
                  "form": "nest",
                  "link": [
                    {
                      "form": "site",
                      "name": "h"
                    },
                    {
                      "form": "nest",
                      "link": [
                        {
                          "form": "site",
                          "name": "i"
                        },
                        {
                          "form": "site",
                          "name": "j"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "form": "host",
          "name": "text",
          "link": [
            {
              "form": "text",
              "link": [
                {
                  "form": "cord",
                  "text": "foo "
                },
                {
                  "form": "read",
                  "link": [
                    {
                      "form": "host",
                      "name": "bar",
                      "link": [
                        {
                          "form": "text",
                          "link": [
                            {
                              "form": "cord",
                              "text": "hello "
                            },
                            {
                              "form": "read",
                              "link": [
                                {
                                  "form": "host",
                                  "name": "random",
                                  "link": []
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "form": "text",
                          "link": [
                            {
                              "form": "cord",
                              "text": "world"
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "form": "cord",
                      "text": " baz"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "form": "host",
          "name": "another",
          "link": [
            {
              "form": "host",
              "name": "bar",
              "link": []
            }
          ]
        }
      ]
    },
    {
      "form": "host",
      "name": "link",
      "link": [
        {
          "form": "nest",
          "link": [
            {
              "form": "site",
              "name": "foo"
            },
            {
              "form": "site",
              "name": "bar"
            }
          ]
        },
        {
          "form": "nest",
          "link": [
            {
              "form": "site",
              "name": "foo"
            },
            {
              "form": "site",
              "name": "baz"
            }
          ]
        },
        {
          "form": "nest",
          "link": [
            {
              "form": "site",
              "name": "a"
            },
            {
              "form": "site",
              "name": "b"
            },
            {
              "form": "site",
              "name": "c"
            }
          ]
        }
      ]
    }
  ]
}
```
