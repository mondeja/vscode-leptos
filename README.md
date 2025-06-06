<!-- markdownlint-disable no-inline-html -->

# vscode-leptos

VS Code extension to help with Leptos app development.

This extension provides commands to configure your workspace for Leptos
development, including recommended extensions and Tailwind CSS IntelliSense
configuration.

## Features

All commands are prefixed with `Leptos:` in the command palette to allow
for easy searching.

1. <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> to open the command palette.
1. Start typing `Leptos:` and you'll see all available commands.

### Workspace configuration

All of the configurations below can be executed at once by running the command
`Leptos: Configure workspace` from the command palette.

### Recommended extensions

This extension provides a command to configure recommended extensions for
Leptos development. It will create or update the `.vscode/extensions.json` file
with the following recommended extensions:

- [Tailwind CSS IntelliSense]
- [rust-analyzer]
- This extension itself
- [Leptos Snippets]
- [Rust Flash Snippets]

Type `Leptos: Configure recommended extensions` in the command palette to run it.

### Tailwind CSS IntelliSense classes support

Using Tailwind CSS with Leptos in VS Code, you'll want to use the official
extension [Tailwind CSS IntelliSense]. This extension provides autocompletion and
syntax highlighting for Tailwind CSS classes.

But it requires a specific configuration in the *.vscode/settings.json* file to
work correctly with Leptos.

To set up or update to ensure that the configuration is correct, use
the command `Leptos: Configure Tailwind CSS IntelliSense classes`.

[Tailwind CSS IntelliSense]: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss
[rust-analyzer]: https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer
[Leptos Snippets]: https://marketplace.visualstudio.com/items?itemName=mondeja.leptos-snippets
[Rust Flash Snippets]: https://marketplace.visualstudio.com/items?itemName=lorenzopirro.rust-flash-snippets
