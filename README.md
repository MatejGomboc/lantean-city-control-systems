# Lantean City Control Systems

**Reverse-Engineered**

> **Just for fun.** This is an unofficial, non-commercial fan project: a deeply nerdy way to
> spend a weekend or two, and a way to learn programming (Rust, Svelte, web APIs). It is not
> affiliated with, endorsed by or connected to MGM, Amazon or anyone behind *Stargate*, and it
> makes no claim to anything Stargate-related. *Stargate* and all related names belong to their
> owners. No footage, sound, logos or art from the show are used; everything here is original.
> It is free and will never be sold.

A simulated control system (SCADA) for the city of Atlantis, written as the expedition would
have had to build it: by taking the Ancient systems apart. Real SCADA software can connect to
it over Modbus TCP.

---

| | |
| --- | --- |
| **Expedition** | Atlantis Expedition, Science Division |
| **Document** | LCCS-RE-0001, revision 0.1 (draft) |
| **Title** | Lantean city control systems: integrating Earth equipment with the city's native control layer |
| **Author** | Dr M. Rodney McKay |
| **Reviewer** | Dr Radek Zelenka (assigned; review in progress, under protest) |

## Summary

The city is run by a native control layer: crystal-based controllers on a distributed bus,
gene-locked at the operator interface and documented, as far as we can establish, nowhere. Its
designers did not anticipate visitors.

This report describes how Earth equipment was put on that bus anyway: a USB-to-crystal
interface (the "dongle"), a gateway that translates the native protocol into Modbus TCP so that
standard Earth control software can read and command the city, and an operator console built on
top of both. Every result was obtained empirically: by observation, by careful experiment and,
on two occasions, by accident.

## Method

- Passive capture of bus traffic during normal operation of the city.
- Correlation of crystal addresses with observed effects (lights, doors and, in one case, the
  gate shield).
- Controlled stimulus: writes to single addresses, with a naquadah generator as the only power
  source, so that nothing catastrophic has enough power to happen.

  > **RZ:** "Nothing catastrophic" is doing a great deal of work in this sentence.

- Translation of console labels from Ancient, which is largely Latin. Every translation carries a
  confidence level; disputed ones are marked as disputed.

## Known limitations

- About a third of the addresses observed on the bus have no identified function. They are
  listed in the register map as unknown. Do not write to them.

  > **RZ:** Rodney wrote to them.

- Conversion factors from native units are estimates, calibrated against Earth equipment.
- The gateway depends entirely on the dongle. There is one dongle.

  > **RZ:** There are two. I built the second one. It is not in the configuration because
  > nobody asked me.

---

## For Earth readers

**Status:** the concept stage; nothing runs yet. The design is in [concept.md](concept.md).

To contribute, see [CONTRIBUTING.md](CONTRIBUTING.md). To report a security issue, see
[SECURITY.md](SECURITY.md); please don't open a public issue for it.

## Licence

Copyright (C) 2026 Matej Gomboc

This program is free software: you can redistribute it and/or modify it under the terms of the
GNU General Public License as published by the Free Software Foundation, either version 3 of
the License, or (at your option) any later version. See [LICENCE](LICENCE).
