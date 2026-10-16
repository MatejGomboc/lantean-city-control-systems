# Contributing to Lantean City Control Systems

Thank you for your interest in contributing! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ground Rules](#ground-rules)
- [How to Contribute](#how-to-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Features](#suggesting-features)
    - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Writing In-Universe](#writing-in-universe)
- [Commit Messages](#commit-messages)
- [Testing](#testing)
- [Documentation](#documentation)

---

## Code of Conduct

This project adheres to the Contributor Covenant Code of Conduct.
By participating, you are expected to uphold this code. Please see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details.

---

## Ground Rules

- **An unofficial fan project.** No footage, stills, logos, sound effects, fonts or art from the show, and no
  tracing of stills or official art. Every asset in the repository is original.
- **Canon first, tunable always.** Every number the show gives is the default, and every number lives in a data
  file. Note the episode it comes from, and both values where the show contradicts itself.
- **Safe by default.** Network listeners bind to localhost unless the operator configures otherwise.
- **No home-made cryptography.** Use audited libraries.

### Reporting Security Vulnerabilities

**Do NOT report security vulnerabilities through public GitHub issues.**

Please see [SECURITY.md](SECURITY.md) for instructions on how to report security vulnerabilities privately.

---

## How to Contribute

### Reporting Bugs

Before submitting a bug report:

1. Check the [existing issues](https://github.com/MatejGomboc/lantean-city-control-systems/issues) to avoid duplicates
2. Ensure you're on the latest `main`
3. Collect relevant information:
    - Operating system and version
    - The client (browser and device, or Modbus tool)
    - The scenario, if one was running
    - Steps to reproduce
    - Expected vs actual behaviour

When submitting:

- Use the bug report template
- Provide a clear, descriptive title
- Include minimal reproduction steps

### Suggesting Features

We welcome feature suggestions, and scenario ideas most of all! Before submitting:

1. Check [existing issues](https://github.com/MatejGomboc/lantean-city-control-systems/issues) and
   [discussions](https://github.com/MatejGomboc/lantean-city-control-systems/discussions) for similar ideas
2. Read [concept.md](concept.md): the idea may already be planned

When submitting:

- Use the feature request template
- Explain the problem you're trying to solve
- Name the canon it draws on

### Pull Requests

#### Before You Start

1. Open an issue first to discuss significant changes
2. Fork the repository
3. Create a feature branch from `main`
4. Make your changes following our [coding standards](#coding-standards)

#### PR Requirements

- [ ] All tests pass (`cargo test`, and `npm test` in `clients/tablet`)
- [ ] Code is formatted (`cargo fmt --all --check`, and `npm run lint` in `clients/tablet`)
- [ ] Clippy passes (`cargo clippy --all-targets --all-features -- -D warnings`)
- [ ] The tablet client type-checks (`npm run check` in `clients/tablet`)
- [ ] Markdown is lint-clean (`npm run lint:md` at the root, also runs in CI)
- [ ] Toolchain pin is consistent (`bash .github/scripts/check-toolchain-pin.sh`)
- [ ] Documentation is updated if needed
- [ ] CHANGELOG.md is updated for user-facing changes
- [ ] Commit messages follow [conventional commits](#commit-messages)

#### PR Process

1. Submit your PR against the `main` branch
2. Fill out the PR template completely
3. Wait for CI to pass
4. Address any review feedback
5. Once approved, a maintainer will merge

---

## Development Setup

### Prerequisites

- Rust: the toolchain is pinned in `rust-toolchain.toml` and installed by rustup on the first `cargo`
  command in the repository (`Cargo.toml`'s `rust-version` records the minimum the code compiles against)
- Node.js LTS, for the clients and the Markdown tooling
- Git 2.x

### Setup

```bash
# Clone the repository
git clone https://github.com/MatejGomboc/lantean-city-control-systems.git
cd lantean-city-control-systems

# The server and the simulation core
cargo build
cargo test

# The tablet client
cd clients/tablet
npm ci
npm run dev
```

### Layout

| Path | Contents |
|------|----------|
| `crates/lccs-city` | The simulation core: the city's systems at a fixed time step |
| `crates/lccs-server` | The headless server: simulation, gateway and API |
| `clients/tablet` | McKay's tablet: the main operator client (SvelteKit) |

---

## Coding Standards

### Rust Style

- Follow `rustfmt` formatting (run `cargo fmt` before committing)
- Follow `clippy` recommendations, pedantic and nursery included (see `Cargo.toml` lints)
- Prefer safe Rust: `unsafe` code is forbidden (see `Cargo.toml` lints)
- Keep the simulation deterministic: no wall-clock time, no unseeded randomness, no iteration over unordered maps
  where the order changes the result

### Svelte and TypeScript Style

- Svelte 5 with runes, TypeScript throughout
- Follow Prettier and ESLint (`npm run format`, `npm run lint`)
- Colours come from the CSS variables of the theme, never hard-coded, so mods can re-theme

### Documentation

- Add rustdoc comments (`///`) to all public items
- Keep comments up to date with code changes

### British Spelling 🇬🇧

Use British spelling in all documentation and user-facing text:

| ❌ American | ✅ British |
|-------------|------------|
| color | colour |
| behavior | behaviour |
| organization | organisation |
| center | centre |
| license (noun) | licence |
| analyze | analyse |
| initialize | initialise |
| authorize | authorise |
| defense | defence |
| meter (instrument) | meter (the same; *metre* is the unit) |

**Note:** Code identifiers may use American spelling where it matches language or library conventions
(e.g. `color` in CSS, `serde::Serialize`).

---

## Writing In-Universe

Realism is everything: the in-universe documents read as a serious reverse-engineering effort by the expedition's
science team, never as a parody of one.

- **Who writes:** Dr Rodney McKay is the author of record: brilliant, impatient, certain he is right, and obliged
  now and then to admit that Dr Radek Zelenka helped a little. Zelenka reviews, reluctantly, and is quite often
  right.
- **Where:** the README's report, the protocol specification, the register map and other reverse-engineering
  notes under `docs/`.
- **Where not:** this file, [SECURITY.md](SECURITY.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), the licence,
  the disclaimer and code comments stay plainly out-of-universe, because they have to be relied on.
- **How:** write it as a real engineering report would be written: revisions, confidence levels, open questions,
  measured values with their error bars. The humour comes from the characters, never from winking at the reader.

---

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/). Format:

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |
| `ci` | CI/CD changes |
| `security` | Security improvements |

### Scopes

`city`, `server`, `gateway`, `tablet`, `docs`, `ci`, or a city system (`zpm`, `gate`, `shield`).

### Examples

```text
feat(gate): add the 38-minute wormhole limit
fix(zpm): stop charge going negative under load
docs: add the register map for the gate room
```

### Rules

- Use imperative mood ("add feature", not "added feature")
- Don't capitalise the first letter of the description
- No period at the end of the subject line
- Keep the subject line under 72 characters
- Reference issues in the footer: `Fixes #123`

---

## Testing

### Running Tests

```bash
# Rust: all tests
cargo test

# The tablet client
cd clients/tablet
npm test
```

### Writing Tests

- Every interlock gets a test: the city must refuse what it should refuse
- Place unit tests in the same file as the code, in a `#[cfg(test)]` module
- Place Rust integration tests in each crate's `tests/` directory
- Use descriptive test names that explain what's being tested
- Test both success and failure cases

---

## Documentation

| Location | Purpose |
|----------|--------|
| `README.md` | Overview, disclaimer and the science division's report |
| `concept.md` | The design: systems, look, scenarios, stack |
| `CONTRIBUTING.md` | This file: contributor guidelines |
| `CODE_OF_CONDUCT.md` | Contributor Covenant code of conduct |
| `STYLE.md` | Style conventions for Rust, Svelte, YAML, JSON, TOML, Markdown |
| `SECURITY.md` | Security policy and vulnerability reporting |
| `CHANGELOG.md` | User-facing change history |
| `TODO.md` | Outstanding work |

---

## Questions?

- Open a [Discussion](https://github.com/MatejGomboc/lantean-city-control-systems/discussions) for questions
- Check existing issues and discussions first
- Be patient: maintainers are volunteers

Thank you for contributing! 🎉
