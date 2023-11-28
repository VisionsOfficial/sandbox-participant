# VSCode Fullstack App Setup 2023

## Package manager

Still using [pnpm](https://pnpm.io) but it got slower so considering switching back to npm or discovering yarn

## Testing

Running `mocha` along with `chai` for assertions and `supertest` for API testing.

## Tooling

Running Typescript along with eslint and prettier configurations setup to work together. The .vscode settings help keep everything in place for the latter 2 to work together without errors being thrown all around the IDE. eslint extends from airbnb with just a couple custom rules to suit my needs.

## Git hooks

Avoiding the use of husky to have a better control of what we can do within the pre-commit hook.

# Installation

```bash
git clone git@github.com:FelixBole/fullstack-setup-2023.git
cd fullstack-setup-2023
pnpm i
```

If pnpm is not installed, you can install it using npm

```bash
npm i -g pnpm
```

# Configuration Caveats and Pending issues

## Typescript Paths

For some reason I can't get typescript's paths to work correctly so still using relative path imports for now.

## Ts-node and the tsc incompatibilities

Sometimes when running ts-node for development and having set custom types in a types folder declared in the typeRoots of tsconfig.json, the IDE will show everything fine but the dev start will fail due to ts-node node recognizing these types.

The solution was to --transpile-only when running ts-node, so adding -T flag to the nodemon.json command

## tsconfig.json and typeRoots

Apparently, having a subdirecroty inside of the types directory makes typescript unable to find types that are set in that subdirectory, even if it is specified in the typeRoots attribute
