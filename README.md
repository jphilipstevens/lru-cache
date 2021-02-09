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
    import LRUCache from "./lib";
    const cacheMaxSize = Math.floor(Math.random() * 100 + 2);
    const cache = new LRUCache<string, string>(cacheMaxSize);
    cache.put("foo", "bar");

    console.log(cache.get("foo")); // equals 'bar'
```

The Cache can support key types of string, Symbol, number. Values are unrestricted

## Technical Interface Assumption

```TypeScript
class LRUCache<K extends string | Symbol | number, V>
```

keys: Keys are constrained to string, Symbol, number. This follows the standards of keys for regular objects which keeps the interface simple and flexible.

values: Values can be any possible type needed by the client

```TypeScript
new LRUCache<K extends string | Symbol | number, V>(maxSize: number)
```

The max size must be a positive number and only integers will be accepted. Any decimals will be treated flooring the value

## npm scripts

### npm run compile

This will execute the Typescript compiler and compile the TS files,

### npm run lint

Execute eslint on all src and test files. This script also fixes some issues

### npm run test:spec

Execute unit tests and create report. Note reports are saved to ./coverage

### npm run test

Execute both `npm run lint` and `npm run test:spec`

### npm run build

This executes `npm run lint`, `npm run test:spec` `npm run compile` in this order. All scrips must pass

### npm run test:integration

Any longer running or complex test cases are executed outside a normal dev build. These tests are good as a final test and are executed on the CI/CD

### npm run commit

When commit any changes this allows developers to build out proper conventional commit format

## Development Standards

### Commits

This repo follows conventional commits in order to achieve automated semantic versioning and releases. There is a script `npm run commit`. Note your notes will be part of the changelogs on a release. Please be descriptive

### Linting

Linting follows the recommended TS, prettier standards. This set is a good standard set to follow with little extra configuration.

### Testing

This project requires 100% code coverage for Statements, Branches, Functions, Lines. No build is allowed to complete without a test being covered

## Build and Release

### CI/CD

GitHub Actions is used for pull requests and releases

## Releases

All release at the moment are done in GitHub. The semantic release library will determine versions, generate notes and publish the release to GitHub

## Technology Utilized

Language: TypeScript
Test framework: Jest
Static code analysis: ESLint
CI/CD: GitHub Actions
Releases: GitHub and Semantic Releases

## Future Considerations

1. Use ReadThedocs to build an online code documentation
2. Improve dev setup with watching both src and tests to run the while build and test suite
3. Implement full release to npm, or private repo

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)