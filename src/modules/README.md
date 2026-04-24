# Module Architecture

Each business module owns its vertical slice:

- `domain`: entities, value objects, and repository contracts.
- `application`: use cases and ports that express app behavior.
- `infrastructure`: API, storage, and device implementations.
- `presentation`: screens, hooks, and feature-specific components.

Next.js route files in `src/app` should stay thin and import screens from modules.
