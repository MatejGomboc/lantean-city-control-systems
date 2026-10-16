# Security Policy

> **Scope of this document:** vulnerability reporting, supported versions, and what counts as a security issue.

## Our Commitment

**Lantean City Control Systems** is a simulated industrial control system, and it speaks the protocols real ones
do. Modbus TCP has no authentication at all, and a simulated plant reachable from the internet gets found by
scanners and taken for a real one. So the project takes its own security seriously, even though it is a game.

**Key security property:** every network listener (the Modbus gateway, the API, the HMI) binds to localhost only,
unless the operator explicitly configures otherwise.

## Supported Versions

| Version | Supported                      |
| ------- | ------------------------------ |
| `main`  | ✅ Yes                         |
| 0.x.x   | ❌ No (pre-release, no fixes)  |

Until the first release, only the `main` branch receives fixes.

## Reporting a Vulnerability

**Please do NOT report security vulnerabilities through public GitHub issues.**

### How to Report

1. **Preferred:** Use [GitHub Security Advisories](https://github.com/MatejGomboc/lantean-city-control-systems/security/advisories/new) to report vulnerabilities privately.

2. **Alternative:** Email the repository owner directly at <matejg03@gmail.com>.

### What to Include

When reporting a vulnerability, please include:

- A clear description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested fixes (optional but appreciated)

### What Qualifies as a Security Issue

| Severity | Examples |
|----------|----------|
| **Critical** | A listener reachable beyond localhost without the operator configuring it |
| **Critical** | Authentication bypass in the API, or a token accepted after expiry, revocation or replay |
| **High** | A script or mod escaping its sandbox: file system, network or process access |
| **High** | Path traversal when loading data files, scenarios or mods |
| **High** | TLS weaker than configured, or a client certificate accepted that the city did not issue |
| **Medium** | Denial of service of the server from a client or the gateway |
| **Low** | Issues requiring local access or unlikely scenarios |

In-game security is not a vulnerability. The Genii replaying an intercepted IDC, or a scenario's sabotaged console,
are features. A real bypass of the mechanisms behind them is a vulnerability.

### Response Timeline

| Action | Timeframe |
|--------|----------|
| Initial acknowledgement | Within 1 week |
| Preliminary assessment | Within 2 weeks |
| Fix development | Depends on severity and complexity |
| Security advisory publication | After fix is available |

This is a hobby project maintained in spare time, so the timeline is a best effort.

### What to Expect

1. **Acknowledgement:** We will acknowledge receipt of your report.

2. **Communication:** We will keep you informed of our progress and may ask for additional information.

3. **Credit:** Unless you prefer to remain anonymous, we will credit you in our security advisory and release notes.

4. **Disclosure:** We follow responsible disclosure practices. We ask that you give us reasonable time to address the
   issue before any public disclosure.

## Security Best Practices for Users

- **Keep it on localhost.** Serve the network only on a network you trust, and never expose the Modbus port to
  the internet.
- **Keep keys private.** The city's certificate authority key and device certificates belong on your machines,
  never in a repository or an issue.
- **Mods are code.** Install scenarios and mods from people you trust, as with any program.

## Security Design Principles

1. **Safe by default:** localhost-only listeners; serving the network is an explicit setting
2. **No home-made cryptography:** TLS and signatures come from audited libraries (rustls and its back-ends)
3. **Defence in depth:** authenticated API, mutual TLS for devices, sandboxed scripts
4. **Transparency:** open source code for community review

## Acknowledgements

We thank the security researchers and community members who help keep this project secure.

---

*This security policy was last updated on 2026-10-16.*
