# LRU Cache

A basic LRU cache in TypeScript with no external dependencies

![Node.js CI](https://github.com/jphilipstevens/lru-cache/workflows/Node.js%20CI/badge.svg?branch=main)

## Building

Requires node 14 or above

```bash
npm i
npm run build
```

## Usage

```TypeScript
    import createLRUCache from "./lib";
    const cacheMaxSize = Math.floor(Math.random() * 100 + 2);
    const cache = createLRUCache<string, string>(cacheMaxSize);
    cache.put("foo", "bar");

    console.log(cache.get("foo")); // equals 'bar'
```

The Cache can support key types of string, Symbol, number. Values are unrestricted

## Technology Utilized

Language: TypeScript
Test framework: Jest
Static code analysis: ESLint

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)