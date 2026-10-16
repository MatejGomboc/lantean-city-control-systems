# Lantean City Control Systems: concept

*Reverse-Engineered.*

A simulated control system (SCADA) for the city of Atlantis, from Stargate Atlantis. You run the
city's systems from an operator's console: the ZPMs, the naquadah generators, the gate, the shield,
the control chair and its drones, submerging, flight, hyperspace and the inertial dampers. It is
built as a real industrial control system would be, so real SCADA software can connect to it.
Open source, for Stargate fans to extend, and a way to learn Rust, Svelte, HTML, CSS,
JavaScript and web APIs on a project that is fun to build.

*Written 2026-10-05, from an evening of watching 1x04 "Thirty Eight Minutes"; the look, the
screens, the server and its clients, the security, the scenarios as Lua scripts, the wiki and
going public added 2026-10-09; the name, the licence and the reverse-engineered feel decided
2026-10-16.*

## Ground rules

- **An unofficial fan project.** Stargate belongs to MGM (now Amazon). The README says plainly
  that the project is unofficial, unaffiliated and free. It uses no logos, footage, sound
  effects or art from the show; all its art is original. The repository's name does not lead
  with "Stargate". Never sold, never monetised by us. (Not legal advice; the usual safe route
  for fan works.) The GPL cannot forbid others to sell copies, but the fan-work status and the
  rights holders' names keep anyone sensible from trying.
- **The commercial barrier.** This project lives in `projekti` and is open source. No code from
  `Documents\commercial` comes in: not Quillon's, not NeonGlass's, not their CI. It is written
  fresh. Design ideas and experience may cross.
- **Canon first, tunable always.** Every number the show gives (38 minutes, three ZPM slots,
  the gene therapy's success rate) is the default. The show contradicts itself often, so every
  number lives in a data file that modders can change.
- **Built for nerds, by design.** Nothing is dumbed down: real protocols, real alarm management,
  real cryptography, in-jokes unexplained. The depth is the point, as with Dwarf Fortress or
  Kerbal Space Program. Only the README's first five minutes, getting the city running, are
  kept easy.
- **Safe by default.** Modbus has no authentication, and a simulated plant on the open internet
  gets found by scanners and taken for a real one. The gateway and the HMI listen on localhost
  only; serving the network is an explicit setting, and the README says why.

## Disclaimer

At the very top of the README, and again on the HMI's About screen, so people who only ever see
the running app see it too. Light in tone; it says what matters:

> **Just for fun.** This is an unofficial, non-commercial fan project: a deeply nerdy way to
> spend a weekend or two, and a way to learn programming (Rust, Svelte, web APIs). It is not
> affiliated with, endorsed by or connected to MGM, Amazon or anyone behind *Stargate*, and it
> makes no claim to anything Stargate-related. *Stargate* and all related names belong to their
> owners. No footage, sound, logos or art from the show are used; everything here is original.
> It is free and will never be sold.

## How canon maps onto real SCADA

The expedition never understood the city's systems from the inside. They plugged Earth laptops
into Ancient consoles and translated. The architecture does the same:

| Layer | In the show | In the software |
| --- | --- | --- |
| The plant | The city's systems themselves | A simulation at a fixed time step: power flows, charge, load, pressure, timers |
| The Ancient control layer | Control crystals, gene-locked consoles | Controller logic: interlocks, automatic sequences, the city's own safety responses, spoken over an invented native protocol (crystal addresses, Ancient names) |
| The crystal dongle | The adapter between McKay's USB port and the console's crystals | A virtual USB-to-crystal converter: a device with its own driver, link state and faults, between the Ancient bus and the gateway |
| The expedition's gateway | McKay's laptop in a console | A translator that serves the Ancient protocol to Earth as Modbus TCP and OPC UA |
| The operator's console | The control room, McKay's tablet | The HMI, in the clients: mimic diagrams, an alarm list, trend charts, the gate room's dialling screen |

What this gives:

- A real SCADA tool or PLC can connect through the gateway and read or command the city.
- The Ancient protocol is the lore layer, and mods extend it with their own systems.
- McKay's conversion overhead is a real number in the gateway's statistics.

## Reverse-engineered, by design

Everything should feel like Ancient systems the expedition took apart and only half
understands.

- **Two visual languages.** Ancient systems are elegant teal line art; everything Earth-built
  (naquadah generators, the gateway, the dongle) looks like plain Earth SCADA, grey and boxy
  ISA-101. What was bolted on shows at a glance. Two sets of CSS variables.
- **Earth annotations over Ancient screens:** labels added afterwards, with a translation
  confidence ("*Scutum*, shield, confirmed"; "*Aquae ductus?*, possibly water reclamation.
  Zelenka: 60%. McKay: obviously not").
- **Unidentified controls.** Some panels and crystal addresses start as "function unknown".
  Operating one teaches what it does, sometimes the hard way, as in the show.
- **A bus sniffer:** raw crystal-bus frames in hex, decoded where the team understands them and
  `??` where it does not. Later, a Wireshark dissector for the Ancient protocol (in Lua, as
  Wireshark's are), so fans can capture the city's traffic and pick it apart.
- **Ancient units.** The bus reports native units; the gateway converts them with factors the
  team estimated, in commented data files ("calibrated against a naquadah generator, ±8%").
- **The protocol spec as a living reverse-engineering report:** revisions, open questions,
  contradictions with episodes, Zelenka's dissenting notes. The register map fills in as the
  community finds things; pull requests are the science team's findings.

## Server and clients

The city is a headless server and the expedition's devices are its clients, as on a real plant,
where the SCADA servers run unattended and the operator stations connect to them.

- **The server** (Rust) runs from the command line: the simulation, the controller logic, the
  gateway and the API. Its console is for administration (start, load a scenario, read the
  logs); a terminal UI may come later. It can run on a Raspberry Pi or the home server.
- **McKay's tablet** is the main client: a web app designed for a tablet's screen first (touch
  targets, portrait and landscape), installable on a real tablet as a progressive web app, so a
  fan holds the prop in their hands. Our own design, not a copy of the show's screens.
- **More clients, one per role:** a life-signs detector (phone-sized, internal sensors only),
  control-room consoles on big screens. All go through the same API and see what their
  operator's role allows, which makes co-op play come for free.
- **Off localhost, the login is real.** Once clients connect over the network, the IDC login
  becomes proper authentication, a token per session. It exists before anything leaves
  localhost.

## Security, gloriously overkill

Real, standard cryptography, chosen for maximum nerdiness, never invented here: everything comes
from audited libraries (rustls and its crypto back-ends).

- **CNSA 2.0**, the NSA's suite for classified systems, for the link between server and
  clients: TLS 1.3 with AES-256 and SHA-384, and post-quantum key exchange (ML-KEM), which
  rustls supports. The city is safe from the Wraith's quantum computers.
- **Mutual TLS:** each tablet and detector holds its own certificate, issued by the city. The
  server talks only to devices it knows.
- **The IDC made real:** signed, expiring tokens with a nonce. A scenario follows from it: the
  Genii replay an IDC they intercepted, and the city rejects it. A lesson in replay attacks, in
  costume.
- **The IDC at the gate,** the staple of every gate journey: an incoming wormhole sends its IDC,
  and the operator decides whether to drop the gate shield (known: open; unknown: shield up and
  an alarm). A captured team's IDC is **revoked**, which is certificate revocation; a team in
  trouble sends a **duress** variant that looks normal to its captors but tells the control room
  the team is compromised, as duress PINs do for banks and alarm systems.

## The crystal dongle

McKay's laptop reaches the city through a USB dongle that converts between USB and the
crystal-based electronics (Matej, 2026-10-05). It works like a USB-to-serial adapter on a real
plant: a small device that everything Earth-side depends on, and a single point of failure.

- **In the software,** the dongle is a device of its own between the Ancient bus and the
  gateway. It has a link state (no crystal contact, handshaking, linked), a baud-like crystal
  resonance rate, an error counter and a firmware version.
- **It can fail,** as hardware does: it can overheat, lose contact, or meet a console that wants
  a newer crystal revision. Those are alarms on the HMI, and scenarios can break it at the worst
  moment ("Rodney, the dongle!").
- **One dongle, one console**, by default: commanding two consoles at once needs a second
  dongle in the configuration, which Zelenka built.
- **A real one, later.** A microcontroller board that presents itself as a USB device, in a
  3D-printed case with a crystal and a status light, which the HMI drives through the
  same driver. Fans can print their own. Its case and firmware go in the repository.

## Who may do what: the ATA gene

Operator roles in the canon's terms:

| Role | May |
| --- | --- |
| Without the gene | Read every status, acknowledge alarms, dial Earth-built systems (naquadah generators, the gateway) |
| Gene therapy | As a carrier, if it took: by default it takes for 48% of operators, decided once per operator profile |
| Natural carrier | Sit in the chair, fire drones, fly the city, unlock gene-locked consoles |
| Expedition leader | Authorise the self-destruct, lockdown and leaving the planet (two keys, as a real plant's critical actions) |

## The systems, first list

Each has its state, its controls and the interlocks that tie it to the others.

- **Power**
    - **ZPMs:** three slots. Each has a charge that drains with load and never recharges.
      A depleted ZPM still sits in its slot and reports as empty.
    - **Naquadah generators:** Earth-built. Small output, refuelled by hand, they can overheat.
      Enough for life support and the gate, never for the shield under fire.
    - **The city's power grid:** sections, breakers, load shedding. When power runs short, the
      city sheds the least important sections first. The order of importance is in a data file.
- **The Stargate**
    - Dialling, both ways: seven chevrons for this galaxy, eight to reach Earth (with the
      power that costs).
    - **The wormhole's 38-minute limit** under normal power, with a countdown on the HMI.
    - **The gate shield:** up or down. Anything arriving with the shield up does not reach the
      gate room.
    - Incoming wormholes, IDC codes, an unknown traveller alarm.
- **The shield**
    - Its power draw grows with each hit it takes.
    - It holds back the ocean while the city is submerged.
- **The control chair and the drones**
    - A finite stock of drones. Every drone fired is gone (the Siege ran low).
    - Firing needs a carrier in the chair and power to the chair.
- **Submerging and surfacing**
    - Sinking needs the shield up and every outer section sealed.
    - **"Rising":** if ZPM charge falls below a threshold while submerged, the city surfaces
      on its own and sheds sections it cannot hold.
- **Flight**
    - The stardrive and the hyperdrive.
    - Leaving the atmosphere needs the shield up.
    - The inertial dampers must be on before the engines go above their low setting.
    - Intergalactic flight needs far more power than one ZPM. How much is a canon question,
      so it is tunable.
- **Sensors**
    - **Internal sensors:** life signs, counted per section and shown on the city's map. Load
      shedding reads them: a section with people in it is shed last, and the HMI asks before
      cutting one. An unknown life sign, or one where nobody should be, raises an intruder
      alarm and can be tracked from section to section.
    - **Blind spots:** shielded or damaged sections report nothing, and the map shows them as
      unknown, never as empty.
    - **Long-range sensors:** contacts beyond the city, classified as they come closer (a
      contact, then a ship, then a Wraith hive ship or a cruiser, with darts launching). Each
      threat has a bearing, a speed and an estimated time of arrival, which feeds the alarm
      list and the trend charts.
    - Range costs power: the long-range sensors can be turned down to save the ZPM, at the price
      of a later warning.
- **Later:** transporters, the jumper bay, environmental systems and quarantine lockdown, the
  self-destruct.

## Alarms

The alarm list works as a real plant's does (ISA-18.2 in spirit):

- each alarm has a priority, a state (active, acknowledged, cleared) and a time;
- floods are suppressed: one cause raises one alarm, not forty;
- a log keeps everything for the after-action review.

## The look

A grey grid of boxes would feel like a car factory. The console should feel like Atlantis, and
the mood comes from light and colour rather than detail. Inspiration: VioDance's violin cover of
the main title on YouTube, played in a dark, teal-lit gate room and before the city's skyline.
Its atmosphere is ours to borrow; its use of the show's logo is not.

- **Palette:** near-black navy as the ground, teal-cyan as the main colour, a soft blue second,
  white with a touch of lavender for text. Defined once as CSS variables, so mods can re-theme.
- **Colour means something** (ISA-101, the real control-room guideline): the calm teal is the
  normal state, dim and low in saturation; warm colours, amber and red, are for alarms only. A
  Wraith alarm glows orange against a cool city and is seen at once.
- **Glowing line art:** the city is drawn in thin teal SVG strokes with a soft glow (an SVG blur
  filter). Powered sections fill like lit stained glass; shed ones fade to dark glass.
- **Light strips as meters:** segmented strips of light, like those on the gate room's pillars,
  are real HMI bar meters: ZPM charge, generator load, shield strength.
- **Dots:** rows of glowing dots as status indicators throughout: chevrons locking, life signs
  per section.
- **All of it original:** our own city outline, gate ring and glyphs. No logo, no show font, no
  tracing of stills or official art.

### The console speaks Ancient

- **Ancient by default: Latin in an Ancient script.** Canon makes Ancient the forerunner of
  Latin, and its on-screen dialogue and text are largely Latin or Latin-like, with no full
  grammar or dictionary behind them. So the labels are plain Latin (*Porta*, the gate;
  *Scutum*, the shield; *Vita*, life signs), with canon's own words where the show gives them
  (*Alteran*, *Lantean*), each listed with its episode on the wiki's canon page.
- **The script is a font of our own.** On screen, the show's script is a cipher, one glyph per
  letter, and its glyph shapes are the production's art, so we design our own glyphs, one per
  Latin letter, as a web font. The text underneath stays real Latin (searchable, copyable,
  readable by screen readers), and switching to plain lettering is one CSS rule.
- **English is earned,** behind a deliberately mocking toggle in canon's terms: **"English, for
  the unlucky ones who lack the gene"**. Spare lines for its tooltip or a later rotation: "Ask
  McKay to translate" (*he will sigh*), "Earth mode, for the scientifically challenged".
  (Mocking the gene, not the person: a big part of the fandom should feel welcome on the first
  screen.)
- **A learning mode:** Ancient with the English on hover, so operators slowly learn to read the
  console.
- **Ancient is just a locale.** Every string comes from translation files (Fluent, which has a
  Rust library), Ancient first and English second, so modders can add any language, Goa'uld
  included. The colours and priorities of alarms read the same in every language.

## Screens

Atmosphere at the door, clarity at work.

- **The login screen:** Atlantis floating on the ocean, nearly still: gentle layered waves,
  tower windows twinkling on and off, a dusk sky. Mostly one picture with three small
  animations, which makes it the first Svelte, SVG and CSS exercise. The login can be the
  control room asking who is approaching: the operator enters their IDC, and their profile
  decides their role (gene carrier, therapy, none).
- **The Lanteans' farewell:** on an operator's first login, their last log entry rises slowly
  over the ocean, line by line in the Ancient script, and fades: a nod to the Star Wars crawl,
  in our own calmer motion. Skippable, with a "read the log again" link afterwards. Our own
  words, not the show's; its rule about power is the game's first lesson, as the ZPMs never
  recharge:

  > *Iis qui post nos venient.*\
  > *Hanc urbem inter stellas aedificavimus et per inane ad hoc mare tulimus.*\
  > *Tenere eam non potuimus: hostes multi erant, nos pauci.*\
  > *Mari eam custodiendam dedimus, et domum rediimus.*\
  > *Si haec legis, urbs tibi experrecta est.*\
  > *Lux eius nunc tua est. Custodi eam melius quam nos potuimus.*\
  > *Vi eius parce: non enim redit.*\
  > *Et cum trans aquas prospicies, memento nostri.*\
  > — *Lanteani*

  For the unlucky ones who lack the gene:

  > To those who will come after us.\
  > We built this city among the stars and carried it through the void to this sea.\
  > We could not hold it: our enemies were many, and we were few.\
  > We gave it to the sea to guard, and we went home.\
  > If you are reading this, the city has woken for you.\
  > Its light is yours now. Guard it better than we could.\
  > Spare its power, for it does not return.\
  > And when you look out over the water, remember us.\
  > — The Lanteans

- **Then the working views:** a short transition (a fade, or sinking gently towards the city)
  into clean, stylised depictions of the city's parts and subsystems, in the teal-on-navy style.
  Moving between them is zooming: tap a part of the city to zoom into it, zoom out to return.

The views follow a real control room's display hierarchy:

| Level | Real plant | Atlantis |
| --- | --- | --- |
| 1, overview | The whole plant at a glance | The skyline: a side view of the towers over the ocean |
| 2, area | One unit's mimic | The top-down city map and the power grid |
| 3, detail | One piece of equipment | The gate room, the ZPM room, the chair |
| 4, diagnostics | Device health | The crystal dongle: link, resonance rate, error counters |

- **The skyline carries information:** each tower is a section, its windows lit when powered and
  dark when shed; the shield is a dome arc that brightens and flickers under hits; the waterline
  rises over the towers when the city submerges ("Rising" plays out visibly, the way a plant
  shows a tank level); long-range contacts appear as silhouettes on the horizon with their time
  of arrival. The skyline is drawn from a data file, each tower with its section, height and
  shape, so a mod that adds a section adds a tower.
- **The gate room:** the ring with its glowing dots, chevrons lighting as they lock, the
  38-minute countdown, the gate shield as a shimmer over the event horizon.
- **Motion is optional:** a viewer who has turned animations off in their system settings gets
  fades instead (the browser reports it; one CSS media query).

## Scenarios

Each sets the city's state, the threats and what counts as winning. Scripted, so mods can add more.

- **Thirty Eight Minutes:** a jumper stuck in the gate. A countdown, a power budget, and
  every choice costs something.
- **The Siege:** the long-range sensors pick up hive ships days away, and the countdown starts.
  Then they close in, the ZPM falls and the drones run out. Hold until help arrives.
- **Rising:** the city on the ocean floor with almost no ZPM charge. Surface without losing
  the sections people are in.
- **Lift-off:** take the city off the planet and into hyperspace without breaking it.

More, as Lua scripts, which also show the range the scripting API needs:

- **Genii infiltration:** unknown life signs moving between sections, tampered consoles, a
  sabotage timer. A detection-and-lockdown puzzle for the internal sensors.
- **Hive ships in orbit:** long-range sensors, the shield's power budget, the chair and the
  drones. The big set-piece.
- **The Daedalus needs parking:** logistics, not combat. Clear a pier, open the shield over it
  and juggle power while a guest ship sits on the city.
- **Woolsey's inspection:** everyone looking professional and busy. It is a real alarm-management
  audit (ISA-18.2, EEMUA 191): alarms per operator per hour within limits (about one every ten
  minutes), no standing or stale alarms, nothing unacknowledged, every two-key action logged,
  the after-action reports in order. Meanwhile McKay's lab experiment goes slightly wrong, and
  it has to be handled quietly, without an alarm flood in the report. A good report wins; a
  memo loses.

For the persistent city, a **storyteller** script, as in RimWorld, watches the city and picks
the next emergency: a quiet week, then Genii trouble, then a hive ship just as the ZPM runs low.
Difficulty becomes a choice of storyteller, and modders write their own.

## Modding

- **Data files (TOML)** define systems, power budgets, interlocks, alarm priorities and canon
  numbers. Add an outpost, a ship or a second city without touching the core.
- **Scripts** define scenarios, storytellers and new behaviour: Lua (leaning) or WebAssembly
  plugins, see the open questions.
- **The Ancient protocol is documented**, so a mod's systems appear on the HMI and through the
  gateway like the city's own.

## The wiki

Where the deep nerdery lives: docs in the repository, built with mdBook and published on GitHub
Pages, so pages change through pull requests beside the code they describe. (GitHub's own wiki
is quicker to start but sits outside review and drifts from the code.)

- **Canon sources:** every default number with the episode it comes from, and both values where
  the show contradicts itself.
- **The Ancient protocol:** written as a real protocol standard, crystal addresses and message
  formats included.
- **Atlantis as SCADA:** how the city maps onto real control systems, and the alarm management
  behind Woolsey's audit.
- **Modding:** the Lua API, scenarios and storytellers, new systems in TOML.
- **Security:** CNSA 2.0, the certificates, the IDC with revocation and duress codes.

## A first idea of the stack

To decide, not decided:

- **The simulation core and the controller logic:** Rust. One process, a fixed time step,
  deterministic, so a scenario replays exactly and tests can check the interlocks.
- **The gateway:** Rust. Modbus TCP first; OPC UA much later, as it is a large undertaking.
  Both from existing crates. Check each crate's licence against the project's own.
- **The clients:** Svelte web apps, the tablet first, served by the server or hosted on their
  own (on localhost unless configured otherwise). SVG for the city, the skyline and the mimic
  diagrams.
- **Between them:** a REST API for commands and configuration (`POST /gate/dial`,
  `GET /grid/sections`; axum on the Rust side), and a push channel for live values, since a
  request-response API cannot tell the browser that the shield just took a hit: Server-Sent
  Events to start, WebSockets if the browser needs to talk back on the same channel.

What each part teaches: the core is everyday Rust (data structures, a fixed-step loop, tests for
every interlock); the gateway is async networking; the API is resource design, status codes and
errors; the HMI is Svelte's reactivity on SVG, plus HTML and CSS layout for the alarm list and
the trends; the live stream is JavaScript.

## First milestone: the expedition arrives

The smallest city that already feels real:

1. One ZPM and one naquadah generator, feeding a grid of a few sections, with load shedding.
2. The shield, its draw rising with each hit.
3. The gate: dialling out and in, the 38-minute countdown, the gate shield.
4. The alarm list.
5. The login screen, and a mimic diagram of the power grid in the HMI, both in the look above.
6. Modbus TCP through the gateway, read and write, tested with an ordinary Modbus client.

A good order to build it in: the core with its tests, a small REST API, one Svelte page with
the power grid, then the live stream. By then every part of the stack has been touched once.

Then: the chair and drones with "The Siege". Then submerging with "Rising". Then flight.

## Ideas for later

- **A persistent city, like a Minecraft server.** The server runs the city continuously at its
  time step and saves its state (ZPM charge, damage, drones left), so it lives on between
  sessions: operators drop in with their clients, server-side Lua mods add systems and
  outposts, and scenarios become events on a living city. Single-player on localhost first;
  multiplayer over the internet (security, hosting, cheating) is a chapter of its own.
- **Co-op play.** Several browsers are several operators with different roles. The two-key
  self-destruct then needs two real people, and "The Siege" works with one on power and one in
  the chair.
- **The dongle's firmware in Renode.** CI runs the real firmware against the simulated city
  before anyone prints a case.
- **A flight in.** A jumper's approach over the ocean that ends on the skyline: 2.5D parallax
  first, a low-poly model of our own (Blender, then three.js or Threlte) if ever. Skippable, and
  shown at most once per session.

## Going public

To attract other Stargate nerds, once there is something to see:

- **Show, don't describe.** A concept gets "cool idea" and then silence; a short clip brings
  people in: Atlantis floating on the ocean on the login screen, then the power grid lighting
  up and a section shedding as the ZPM drops. The first milestone is enough. The first screen
  people see sells the post, so it has to be the stylised city in its teal glow.
- **Or early, to collect ideas:** post the concept as a question ("What emergencies would you
  script for Atlantis?") and come out with a backlog of fan scenarios.
- **Where:** for the fans, r/Stargate, the GateWorld forums and fan Discords; for the
  control-system crowd, r/PLC and r/SCADA, as a fun training simulator; later the Rust
  community's show-and-tell threads, once the code is worth showing.
- **Before posting:** the disclaimer, a licence, a short README with the five-minute start, and
  the repository on GitHub. Read each community's self-promotion rules first, and post only our
  own art, never stills from the show.

## Open questions

1. ~~**The licence.**~~ Decided 2026-10-16: GPL-3.0-or-later, as TronGrid Lite. Every
   dependency's licence must be compatible (MIT, Apache-2.0 and BSD are). Whether Lua mods
   loaded at run time must be GPL too is a grey area; say in the modding docs what we intend.
2. ~~**A name.**~~ Decided 2026-10-16: **Lantean City Control Systems**, with
   "Reverse-Engineered" as the README's subtitle.
3. **Lua or WebAssembly** for scripting. Leaning Lua: a fan can write a scenario in an evening,
   and Rust's Lua bindings are mature. WebAssembly sandboxes better but puts a compiler between
   a fan and their first scenario.
4. **Where it is hosted first.** GitHub for the fans, or the home server's Forgejo until there is
   something to show (leaning Forgejo first). Making it public is your call, as always.
