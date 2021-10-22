# Cerbos Setup Action

A GitHub action to install [Cerbos](https://github.com/cerbos/cerbos) binaries for use in workflows. 

Cerbos helps you super-charge your authorization implementation by writing context-aware access control policies for your application resources. Find out more about Cerbos using the following resources:

* [Cerbos website](https://cerbos.dev)
* [Cerbos documentation](https://docs.cerbos.dev)
* [Cerbos GitHub repository](https://github.com/cerbos/cerbos)
* [Cerbos Slack community](http://go.cerbos.io/slack)

## Usage

If `version` is not specified or set to `latest`, the action will download the latest Cerbos release.

```yaml
steps:
  - name: Setup Cerbos
    uses: cerbos/cerbos-setup-action@v1
    with:
      version: latest
```

