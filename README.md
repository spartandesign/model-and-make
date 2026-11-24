# Model & Make

The student textbook for **Digital Manufacturing & Engineering Design**, a one-semester course at Mary R. Stauffer Middle School, Downey USD (Spring 2027, Period 1). Students measure, model in Onshape, 3D-print a working fingerboard, and build one class skate park.

Same layout as [Build & Code](https://spartandesign.github.io/build-and-code/). There is no build step.

```
model-and-make/
├── docs/              ← the published website (GitHub Pages serves this folder)
│   ├── index.html       cover, class info, semester at a glance
│   ├── start-here.html  how the course works (notebook, OneNote, Canvas)
│   ├── lab.html         machines and safety
│   ├── chapter-01.html … chapter-15.html   one chapter per week (Weeks 6–7 and 16–20 share one)
│   ├── glossary.html
│   ├── styles.css       the whole book's styling (shared with Build & Code)
│   └── nav.js           the table of contents (single source of truth)
└── README.md
```

## Canvas link
The cover's "Go to the Canvas course" button points at the placeholder `https://YOUR-CANVAS-COURSE-URL`. Replace it in `docs/index.html` once the Canvas course is published.

## Add or rename a chapter
Edit `docs/nav.js`. The `BOOK` list drives every sidebar and the Previous/Next buttons.

## Publish (GitHub Pages)
Repo **Settings → Pages** → Source: *Deploy from a branch* → Branch `main`, Folder `/docs` → Save.
The site goes live at `https://spartandesign.github.io/model-and-make/`.

## Where the content comes from
Chapters match the Canvas week pages in the Spring 2027 course cartridge. When a lesson changes, update both.
