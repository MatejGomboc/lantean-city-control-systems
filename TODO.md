# TODO: Working Notebook

Outstanding work only: shipped items are deleted, not struck through (git log is the record).
The design behind each item is in [concept.md](concept.md).

## A. Milestone 0: one ZPM, one register

- [ ] **The ZPM in `lccs-city`:** a charge that drains with load at a fixed time step and never
      recharges, with tests.
- [ ] **One load** on it, and the charge readable as a Modbus holding register through the
      gateway, checked with an ordinary Modbus client (mbpoll or QModMaster).
- [ ] **The tablet shows it:** one page with the charge as a light-strip meter, in the teal theme.

## B. Milestone 1: the expedition arrives

See [concept.md](concept.md) § First milestone: the expedition arrives.

## C. Open questions

- [ ] **CNSA 2.0 in practice:** which rustls back-end offers ML-KEM-1024 rather than the hybrid
      X25519MLKEM768, and how far ML-DSA certificates are supported. Until both work, the docs
      say "CNSA 2.0-inspired".
- [ ] **Device authentication for the tablet:** mutual TLS client certificates are painful to
      install for a PWA on iPad and Android; compare passkeys (WebAuthn) for the tablet and keep
      mutual TLS for the detector and the dongle board.
- [ ] **The Modbus gateway's write policy:** Modbus has no authentication, so a client on the
      port bypasses the gene and the two keys. Read-only by default, writes as an explicit
      setting; and a scenario built on exactly that hole.
- [ ] **Lua determinism:** scripts get a seeded random number generator and the simulation's
      clock, never `math.random`, the wall clock or `pairs` order.
