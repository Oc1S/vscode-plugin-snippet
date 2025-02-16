# vscode extension boilerplate

## Features

- github actions support publish extension to both vs marketplace and open vsx
- auto generate changelog and publish github release, make sure you enabled the write permission of github actions
- pnpm/eslint/prettier/ling-staged/simple-git-hooks/stale-dep
- use esbuild to bundle extension

## Development

Install dependencies by:

```shell
pnpm install
```

Then run and debug extension like in [official documentation](https://code.visualstudio.com/api/get-started/your-first-extension)

## Publish

You need set two github actions secrets:

- VS_MARKETPLACE_TOKEN: [Visual Studio Marketplace token](https://learn.microsoft.com/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate)
- OPEN_VSX_TOKEN: [Open VSX Registry token](https://github.com/eclipse/openvsx/wiki/Publishing-Extensions#3-create-an-access-token)

```shell
pnpm release
```
