# Lantean City Control Systems: AI Assistant Context

## Core Principle

**Realism is everything.** The project is a simulated SCADA system for the city of Atlantis, built
as if the expedition had reverse-engineered the Ancient systems. It works as a real industrial
control system (real protocols, real alarm management, real cryptography), and its in-universe
documents read as a serious reverse-engineering effort. Disbelief stays suspended only if nothing
breaks it.

See [concept.md](../concept.md) for the full design.

## The Voice

- **Dr Rodney McKay is the author of record** of every in-universe document: the README's report,
  the protocol specification, the register map, reverse-engineering notes. Brilliant, impatient,
  sure he is right, and obliged now and then to admit, reluctantly, that Dr Radek Zelenka was a
  tiny bit helpful.
- **Zelenka reviews**, reluctantly, in short margin notes (`> **RZ:** …`), and is quite often right.
- **Written as real engineering:** revisions, confidence levels, open questions, measured values
  with error bars, the register-level precision of a real format specification. The humour comes
  from the characters, never from winking at the reader.
- **Out-of-universe, always plain:** the disclaimer, the licence, `SECURITY.md`, `CONTRIBUTING.md`,
  `CODE_OF_CONDUCT.md`, code comments and commit messages.

`CONTRIBUTING.md` § Writing In-Universe is the canonical description; keep the two consistent.

## Critical Rules

### NEVER Do These

1. **NEVER commit the reference images** (`stargate atlantis images and photos for inspiration of
   vibe/`): they are stills and other people's art, kept for private inspiration only
2. **NEVER use the show's assets:** no footage, stills, logos, sound, fonts, or tracing of official
   art. Every asset is original
3. **NEVER claim rights in Stargate:** the GPL covers only this project's own code and art
4. **NEVER bind a listener beyond localhost by default** (the gateway, the API, the HMI)
5. **NEVER invent cryptography:** audited libraries only
6. **NEVER bring in code from `C:\Users\matej\Documents\commercial`** (the commercial barrier)
7. **NEVER push to main** after the bootstrap: branch and open a pull request

### ALWAYS Do These

1. **Canon numbers in data files**, with the episode they come from
2. **Keep the core city-agnostic:** it models Lantean city design; Atlantis (and any other city)
   is a data package, and cities differ (systems, slots, protocol revisions). Never hard-code
   Atlantis in the core
3. **Keep the simulation deterministic:** a fixed time step, seeded randomness, no wall clock
4. **Test every interlock:** the city must refuse what it should refuse
5. **British spelling** in documentation and user-facing text
6. **One source of truth** per fact (see `STYLE.md` § Single Source of Truth)

## Project Structure

| Path | Contents |
|------|----------|
| `crates/lccs-city` | The simulation core (library) |
| `crates/lccs-server` | The headless server: simulation, gateway, API (binary) |
| `clients/tablet` | McKay's tablet, the main operator client (SvelteKit, static adapter) |
| `concept.md` | The design |
| `TODO.md` | Outstanding work |

## Off Limits

**`CODE_OF_CONDUCT.md`**: do not modify.
