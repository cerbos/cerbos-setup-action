# cerbos/cerbos-setup-action

Install `cerbos` and `cerbosctl` binaries to GitHub Actions tool cache.

## Prerequisites

None

## Inputs

Please see action.yaml for inputs.

## How To Use

Please see the following workflow example;

```
---
name: PR Check
on:
  pull_request:
    branches:
      - master
jobs:
  cerbos:
    name: Cerbos
    runs-on: ubuntu-latest
    steps:
      - name: Setup Cerbos
        uses: cerbos/cerbos-setup-action@v1
        with:
          version: 0.8.0
```

# cerbos/cerbos-setup-action development

After changing the code, execute the following commands;

```
npm run build && npm run format && npm run lint && npm run package && npm test
```

`npm run package` will create or overwrite the `dist/index.js` and `dist/index.js` which is the running part of the GitHub Action.
