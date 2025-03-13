# Contributing to Watching-You
We welcome contributions to improve this DOM animation library that enables element tracking across multiple frameworks. This document provides essential guidelines for setting up your development environment, implementing new features.

## Development Environment Setup
### Prerequisites
- Node.js v20.18.3: We recommend using a version manager like [asdf](https://github.com/asdf-vm/asdf) for easy version switching
- Yarn v4.6.0:
  - [how to install yarn/berry](https://yarnpkg.com/getting-started/install)
  - [(optional) corepack](https://yarnpkg.com/corepack)

### Initial Setup
1. Fork repository
2. Clone repository: `git clone https://github.com/[your-username]/watching-you.git` // e.g. `git clone https://github.com/[your-username]/watching-you.git`
3. Install dependencies: `yarn install` from root directory

## Building and Running
### Core Development
```bash
cd packages/core
yarn start # Starts core package in dev mode
```

### Framework
For framework-specific development (React, Vue, etc.):

```bash
cd packages/[framework-name]
yarn start # Starts framework implementation in dev mode
```

## Tips

### Implementing New Targets
Targets define coordinate calculation logic for different element types. To create a new target type:

1. Create new file in `packages/core/src/targetPlugin` folder
2. Implement class extending BaseTarget interface ([packages/core/src/type/Target.ts](https://github.com/jj811208/watching-you/blob/main/packages/core/src/type/Target.ts)):
3. Register target in plugin index:

```diff
// packages/core/src/targetPlugin/index.ts
+ import NewTarget from './NewTarget';

const targetPlugins = {
  // Existing targets
  mouse: MouseTarget,
  // Add new entry
+ newTarget: NewTarget
};
```

You can refer to other files in `packages/core/src/targetPlugin/*` for details on how to develop `watching-you` target

### Support a New Framework 
1. Create new package in `packages` folder
2. implementing (ref: [package/react](https://github.com/jj811208/watching-you/tree/main/packages/react))

### Testing
Our testing strategy focuses on real-world usage scenarios (after build):

1. Build all dependencies: Always run `yarn build` in both core and all relevant framework packages before testing
```bash
cd packages/core
yarn build
cd ../react
yarn build
cd ../vue
yarn build
```

2. Start test environment:
```bash
cd packages/tests
yarn start
```

### PULL REQUEST

Feel free to open PRs, but please note that more comprehensive descriptions will help reviewers better understand your contributions and increase the likelihood of merging.

Here are some tips to improve merge probability:

1. **PR Description**: Provide complete and clear documentation of your contribution in the pull request description
2. **Commit Hygiene**: Maintain clean, atomic commits
3. **Test Coverage**: When contributing new features or bug fixes, please add corresponding test cases in `packages/tests` to validate functionality

