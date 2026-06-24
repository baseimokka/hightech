# Image drop-in guide

Drop real photos at the paths below and they appear automatically — the UI checks
each file at build time and falls back to the brushed-steel placeholder until the
file exists (no broken images). After adding files, rebuild (`npm run build`) or, in
`npm run dev`, just refresh.

Paths come straight from the data files (`src/data/*`). To change a path, edit the
`image` / `gallery` / `logo` / `coverImage` field there.

## Hero
- `hero.jpg` — homepage hero banner (already supplied)

## Services — `images/services/`  (from `services.ts`)
- `laser-cutting.jpg`
- `cnc-machining.jpg`
- `spare-parts.jpg`
- `maintenance.jpg`
- `technical-support.jpg`
- `forming-welding.jpg`

## Projects — `images/projects/`  (from `projects.ts`)
- `steel-facade.jpg`
- `machined-housing.jpg`
- `welded-frame.jpg`
- `laser-reel.jpg`
- `turned-shafts.jpg`
- `steel-canopy.jpg`
- `perforated-panels.jpg`
- `gearbox-parts.jpg`

## Machines — `images/machines/`  (from `machines.ts`)
- `vmc-850.jpg` (+ gallery: `vmc-850-1.jpg`, `vmc-850-2.jpg`)
- `fiber-laser-3015.jpg`
- `co2-laser-1530.jpg`
- `cnc-lathe-ck6150.jpg`
- `spindle-cartridge.jpg`
- `press-brake-160t.jpg`

## Machine categories — `images/machines/categories/`  (from `machineCategories.ts`)
- `cnc-machines.jpg`, `laser-cutting.jpg`, `fiber-laser.jpg`, `spare-parts.jpg`, `industrial-equipment.jpg`

## Client logos — `images/clients/`  (from `clients.ts`)
- `aramco.svg`, `sabic.svg`, `alfanar.svg`, `maaden.svg`, `zamil.svg`, `nesma.svg`
