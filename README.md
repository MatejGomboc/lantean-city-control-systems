# Lantean City Control Systems

**Reverse-Engineered**

> **Just for fun.** This is an unofficial, non-commercial fan project: a deeply nerdy way to
> spend a weekend or two, and a way to learn programming (Rust, Svelte, web APIs). It is not
> affiliated with, endorsed by or connected to MGM, Amazon or anyone behind *Stargate*.
>
> **We claim no rights in Stargate.** *Stargate*, *Stargate Atlantis* and all related names,
> characters, places, technologies and story elements are the property of their respective
> owners, and we claim no copyright, trademark or any other right in them. They are referred to
> here only as a non-commercial fan tribute. No footage, sound, logos, fonts or art from the show
> are used; everything here is original. The GPL licence below covers only this project's own
> code and art, never anything Stargate-related. It is free and will never be sold.

A simulated control system (SCADA) for Lantean city-ships, Atlantis first, written as the
expedition would have had to build it: by taking the Ancient systems apart. Any city built to the
Lantean pattern is a data package, so modders can add their own. Real SCADA software can connect
to it over Modbus TCP.

---

| | |
| --- | --- |
| **Expedition** | Atlantis Expedition, Science Division |
| **Document** | LCCS-RE-0001, revision 0.1 (draft) |
| **Title** | Lantean city control systems: integrating Earth equipment with the city's native control layer |
| **Author** | Dr M. Rodney McKay, Chief of Science |
| **Reviewer** | Dr Radek Zelenka |

## Summary

The city is run by a native control layer: crystal-based controllers on a distributed bus,
gene-locked at the operator interface and documented, as far as I can establish, nowhere. Its
designers built a ten-thousand-year-old city ship and did not leave a manual. I have written one.

This report describes how I put Earth equipment on that bus: a USB-to-crystal interface (the
"dongle"), a gateway that translates the native protocol into Modbus TCP, so that ordinary Earth
control software can read and command the city, and an operator console on top of both. Every
result was obtained empirically: by observation, by careful experiment and, on two occasions, by
accident. Neither accident was mine.

Nothing in the method is specific to Atlantis. The control layer follows a common Lantean design,
and the Ancients rarely built only one of anything, so the city's particulars (its sections, its
power plant, its numbers) are kept apart from the general method, in a description of the city
that can be swapped for another's. I would not expect another city to be the same, however.
Cities of different ages will run different revisions of the crystal protocol, carry different
systems and have decayed in different ways. The method transfers; the register map will not.

## Method

- Passive capture of bus traffic during normal operation of the city.
- Correlation of crystal addresses with observed effects: lights, doors and, in one case, the
  gate shield, which was briefly unfortunate for whoever was dialling in.
- Controlled stimulus: writes to single addresses, with a naquadah generator as the only power
  source, so that nothing catastrophic has enough power to happen.
- Translation of console labels from Ancient, which is mostly Latin. Every translation carries a
  confidence level. Where Dr Zelenka disputes a translation it is marked as disputed, and he is
  usually wrong.

## Known limitations

- About a third of the addresses on the bus have no identified function yet. They are listed in
  the register map as unknown. Do not write to them. I have written to them, so you do not have
  to.
- Conversion factors from native units are estimates, calibrated against Earth equipment, which
  is the best anyone could do with Earth equipment.
- The gateway depends on the dongle. There is one dongle.

## Acknowledgements

Dr Radek Zelenka built the second dongle, after I had explicitly said one was enough. Since the
first one overheated during the gate-shield incident, the second one is the reason this report
exists at all. He also corrected the bus timing in an early draft. The correction was minor. It
was also correct.

He has asked to review this section.

> **RZ:** "Minor."

---

## For Earth readers

**Status:** the concept stage; nothing runs yet. The design is in [concept.md](concept.md).

To contribute, see [CONTRIBUTING.md](CONTRIBUTING.md). To report a security issue, see
[SECURITY.md](SECURITY.md); please don't open a public issue for it.

## Licence

Copyright (C) 2026 Matej Gomboc, for this project's original code and art only; see the
disclaimer at the top.

This program is free software: you can redistribute it and/or modify it under the terms of the
GNU General Public License as published by the Free Software Foundation, either version 3 of
the License, or (at your option) any later version. See [LICENCE](LICENCE).
