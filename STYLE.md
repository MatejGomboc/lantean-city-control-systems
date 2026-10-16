# Style Guide

Code style conventions for Lantean City Control Systems.

---

## General Rules

| Rule | Setting |
|------|--------|
| Indentation | 4 spaces (no tabs) |
| Max line length | 170 characters (Rust and the clients wrap at 100) |
| Charset | UTF-8 |
| Final newline | Always |
| Trailing whitespace | Trim (except Markdown) |

These rules are enforced by `.editorconfig`. Install the EditorConfig plugin for your editor:

- **VS Code:** [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

---

## Single Source of Truth

Avoid duplicating information across files. Each piece of information should have one canonical location.

| Information | Canonical Source |
|-------------|------------------|
| Build commands | `CONTRIBUTING.md` § Development Setup |
| Coding standards | `CONTRIBUTING.md` § Coding Standards |
| The in-universe voice | `CONTRIBUTING.md` § Writing In-Universe |
| Commit conventions | `CONTRIBUTING.md` § Commit Messages |
| British spelling 🇬🇧 | `CONTRIBUTING.md` § British Spelling |
| Security policy | `SECURITY.md` |
| Canon numbers | The data files, never the code |
| Formatting rules | `.editorconfig` |

---

## Rust

### Formatting

Use `rustfmt` with the repository's `rustfmt.toml`. CI enforces this.

```bash
cargo fmt --all         # Format all code
cargo fmt --all --check # Check without modifying
```

### Linting

Use `clippy` with warnings as errors; the pedantic and nursery groups are on (see `Cargo.toml`). CI enforces this.

```bash
cargo clippy --all-targets --all-features -- -D warnings
```

### Naming Conventions

| Item | Convention | Example |
|------|------------|--------|
| Crates | kebab-case, `lccs-` prefix | `lccs-city` |
| Modules | snake_case | `power_grid` |
| Types | PascalCase | `ZeroPointModule` |
| Functions | snake_case | `shed_load` |
| Constants | SCREAMING_SNAKE_CASE | `WORMHOLE_LIMIT` |
| Variables | snake_case | `charge_remaining` |

### Documentation

- All public items must have doc comments (`///`)
- Use British spelling in documentation 🇬🇧
- CI checks documentation builds without warnings

---

## Svelte and TypeScript

### Formatting

Prettier, with the client's `prettier.config.js`: 4 spaces, 100 columns. ESLint for the rest.

```bash
npm run format  # Format all code
npm run lint    # Check formatting and lint
npm run check   # Type-check with svelte-check
```

### Conventions

- Svelte 5 runes (`$state`, `$derived`, `$effect`), not the legacy reactive statements
- Colours, spacing and glow come from the theme's CSS variables
- Strings come from the translation files, never hard-coded in components

---

## YAML (GitHub Actions)

### Indentation

**4 spaces** for structure levels, aligned with the project-wide convention. List items use **2-space
continuation** from the `-` character (standard YAML behaviour):

```yaml
jobs:
    build:
        name: Build
        runs-on: ubuntu-latest

        steps:
            - name: Checkout
              uses: actions/checkout@v4
              with:
                fetch-depth: 1
```

### Multi-line Scripts (`run: |`)

Shell script content inside `run: |` blocks uses **4-space indentation** for shell constructs (if/else, loops).

### Structure

- Blank line between top-level keys (`on`, `env`, `jobs`)
- Blank line between jobs
- Blank line before `steps:` in complex jobs
- Comments on their own line, not inline
- Actions pinned to a full commit SHA, with the version in a comment

### Formatter

**Format-on-save is disabled** for YAML files in VS Code (configured in `.vscode/settings.json`): no formatter
handles the mixed indentation above. Format YAML files manually.

---

## JSON

**4 spaces** indentation. VS Code uses the built-in JSON formatter (`vscode.json-language-features`).

---

## TOML

**4 spaces** indentation. Use [Even Better TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml)
for VS Code. Column width is set to 170 characters (configured in `.vscode/settings.json`).

---

## Markdown

### Headings

Use ATX-style headings with blank lines before and after:

```markdown
## Section Title

Content here.
```

### Lists

Use `-` for unordered lists, `1.` for ordered lists. Nested lists are indented 4 spaces.

### Code Blocks

Always specify the language.

### Trailing Whitespace

Markdown files are exempt from trailing whitespace trimming (needed for line breaks).

---

## Commit Messages

See `CONTRIBUTING.md` § Commit Messages for conventions and allowed types.

---

## British Spelling 🇬🇧

See `CONTRIBUTING.md` § British Spelling for the full reference table.

**Quick rule:** Use British spelling in documentation (colour, behaviour, organisation).
Code identifiers may use American spelling where it matches language or library conventions.

---

*Last updated: 2026-10-16*
