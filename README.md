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

# Docker

```bash
cd /sandbox/consumer && docker compose up -d
```

```bash
cd /sandbox/provider && docker compose up -d
```

## Boilerplate generation

### Folder Templates

Making use of the vs code folder templates extension to easily create folder structures with boilerplate code. Templates are available for both React and Backend stuff, especially creating a new mongoose model with all files associated to it.

### Custom Scripts

| command                              | what it does                                                                                                                                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm setup:model --model=modelName` | To run after creating a model with folder templates to configure the models/Stripe.service.ts and move the types to the types folder automatically                                                           |
| `pnpm create:router`                 | Will start a CLI tool that will guide in the creation of files and boilerplate for a new resource. Can create routes and controllers automatically and set them up to be directly served by the application. |

# Git Hooks

Using custom git hooks to try not to use husky and have more control over what's happening in there. Set up git-hooks for:

-   pre-commit: Runs lint / prettier / tests
-   pre-push: Runs version checking to compare remote branch version with local branch version

# Configuration Caveats and Pending issues

## Typescript Paths

For some reason I can't get typescript's paths to work correctly so still using relative path imports for now.

## Ts-node and the tsc incompatibilities

Sometimes when running ts-node for development and having set custom types in a types folder declared in the typeRoots of tsconfig.json, the IDE will show everything fine but the dev start will fail due to ts-node node recognizing these types.

The solution was to --transpile-only when running ts-node, so adding -T flag to the nodemon.json command

## tsconfig.json and typeRoots

Apparently, having a subdirecroty inside of the types directory makes typescript unable to find types that are set in that subdirectory, even if it is specified in the typeRoots attribute

# Planned features left

-   StyleProvider for client to share base styles instead of reimporting a scss module for each component. Good use case is for pages that can share the same default style.
-   Image upload services management with Multer / File System storage / S3 / Google Cloud Storage to have the choice when using the template.
-   Snackbars / Toasts Provider
-   Optional auto-generated tests for new resources
-   Optional auto-generated client crud page example for new resources including pagination etc
-   Sign In with google / github / facebook
