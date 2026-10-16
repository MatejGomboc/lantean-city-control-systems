/*
    Copyright (C) 2026 Matej Gomboc https://github.com/MatejGomboc/lantean-city-control-systems

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

//! The simulation core: a Lantean city's systems (power, the gate, the shield and the rest) at
//! a fixed time step, deterministic, so a scenario replays exactly and tests can check every
//! interlock.
//!
//! The core models Lantean city design in general. A particular city, Atlantis included, is
//! described by data, never by code.

/// The version of the simulation core.
pub const VERSION: &str = env!("CARGO_PKG_VERSION");
