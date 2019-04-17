# Minimal Vanilla JS UI-Router

First approach to building a vanilla JS UI-Router for client-side routing in modular JS applications.

To create an exportable 3rd party library:

1. Clone from `https://github.com/ui-router/core`.

2. In the root directory run `npm run compile`.

3. Add the line `export * from './router';` to `lib-esm/vanilla.js`.

4. Run `npm run bundle` to create bundled vanilla js files in the `_bundles` directory.
