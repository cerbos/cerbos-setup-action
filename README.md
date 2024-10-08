# Cerbos Setup Action

A GitHub action to install [Cerbos](https://github.com/cerbos/cerbos) binaries for use in workflows.

Cerbos helps you super-charge your authorization implementation by writing context-aware access control policies for your application resources. Find out more about Cerbos using the following resources:

- [Cerbos website](https://cerbos.dev)
- [Cerbos documentation](https://docs.cerbos.dev)
- [Cerbos GitHub repository](https://github.com/cerbos/cerbos)
- [Cerbos Slack community](http://go.cerbos.io/slack)

## Usage

If `version` is not specified or set to `latest`, the action will download the latest Cerbos release.

```yaml
steps:
  - name: Setup Cerbos
    uses: cerbos/cerbos-setup-action@v1
    with:
      github_token: <github_token>
      version: latest
```

## Development

### Prerequisites

You'll need to install

- Node.js, matching the version specified in our [.node-version](../.node-version) file

  - A version manager that supports this file is recommended, for example [n](https://github.com/tj/n#readme).
    Note that [nvm](https://github.com/nvm-sh/nvm) [does not](https://github.com/nvm-sh/nvm/issues/794).

- pnpm, matching the version specified in our [package.json](./package.json) file

  - After installing Node.js, you can enable [Corepack](https://nodejs.org/api/corepack.html) to transparently install the correct `pnpm` version:
    ```console
    $ corepack enable
    ```

### Build

```
pnpm run all
```
