## gitbook-plugin-search-pro

Gitbook search engine pro. (支持中文搜索)

### Demo preview

![](https://raw.githubusercontent.com/gitbook-plugins/gitbook-plugin-search-pro/master/demo/show-1.gif)

### Usage

Put this in your book.json:

```js
{
    "plugins": [
      "-search",
      "search-pro"
    ],
    "pluginsConfig": {
      "search-pro": {
        "cutWordLib": "nodejieba",
        "defineWord" : ["小需求","基础建设"]
      }
    }
}
```

And

```
npm install
npm build/serve
```

Thanks: nodejieba(中文分词功能)
