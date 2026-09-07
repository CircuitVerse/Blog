# Interactive Book — UI before and after

Screenshots comparing the Interactive Book on `master` (V1) with the rewrite on
`feature/interactive-book-v2`.

Both sets were captured on the same device — Android emulator, Pixel 10 Pro,
API 37, 1280×2856 — on 2026-09-04.

| | Before (V1) | After (V2) |
| --- | --- | --- |
| Branch | `master` @ `267f654` + `v1-render-fix.patch` | `feature/interactive-book-v2` @ `3bc198e` |
| Content source | Local Jekyll build of the pre-migration book | Live API, `learn.circuitverse.org/api` |

Both galleries show the **real book content**. Nothing is mocked.

---

## Getting V1 to run

V1 does not run today. Three independent bugs stop it from rendering, and a
fourth leaves every pop quiz blank. All four had to be fixed to produce the
"before" screenshots.

### 1. Its backend no longer exists

Every endpoint V1 depends on returns 404:

```text
https://learn.circuitverse.org/_api/pages.json                            404
https://learn.circuitverse.org/_api/pages/docs/binary-representation.json 404
```

Against production, V1 hangs on an infinite spinner and throws
`RangeError (length): Invalid value: Valid value range is empty: 0` — the 404
yields an empty page list, which the view then indexes into.

Worked around by serving the old book locally:

1. `CircuitVerse/Interactive-Book` checked out at `e386a42`, the last merge
   before `e391ac8 feat: replace the markdown page API with the structured JSON API`.
2. Built with Jekyll, whose `jekyll-admin` plugin exposes the original
   `/_api/pages` API.
3. That API mirrored into the static layout production served
   (`pages.json`, `pages/<dir>.json`, `pages/<path>`) — 12 listings, 57 pages.
4. App run with `--dart-define=IB_API_BASE_URL=http://10.0.2.2:4001/_api/pages`.

### 2. Custom block tags were classified as inline

`flutter_markdown` only treats a custom tag as block-level if its builder
overrides `isBlockElement()`:

```dart
builders.forEach((String key, MarkdownElementBuilder value) {
  if (value.isBlockElement()) {
    _kBlockTags.add(key);
  }
});
```

**None of V1's nine builders overrode it.** So `chapter_contents`, `iframe`,
`interaction` and `quiz` were treated as inline. When one appears at the top of
a document, the enclosing block is the root, whose tag is `null`, and
`_addParentInlineIfNeeded` does `styleSheet.styles[tag!]` →

```text
Null check operator used on a null value
#0  MarkdownBuilder._addParentInlineIfNeeded (package:flutter_markdown/src/builder.dart:789:37)
    ... from lib/ui/views/ib/ib_page_view.dart:494
```

Every chapter page died here. The landing page survived only because it is plain
markdown with no custom tags.

### 3. Those tags left an empty inline behind

With the tags correctly block-level, a second failure appeared:

```text
'package:flutter_markdown/src/builder.dart': Failed assertion: line 267 pos 12:
'_inlines.isEmpty': is not true.
```

These elements carry an id as their text content, which routes through
`builders[tag].visitText(...)`. The default returns `null`, so the inline ended
up with zero children — and `_addAnonymousBlockIfNeeded` only clears `_inlines`
*inside* `if (inline.children.isNotEmpty)`, so it was never cleared.

Fixed by overriding `visitText` in the four block builders to return a
zero-size widget.

### 4. Pop quizzes parsed as empty

Not a crash, but every quiz rendered blank. In `ib_md_tag_syntax.dart`:

```dart
quizContent += '\n${parser.current}';
```

`markdown` 7.x changed `BlockParser.current` from `String` to `Line`, so the
quiz body became `Instance of 'Line'` repeated, and the question regex matched
nothing. The same file already used `parser.current.content` on line 10 — a
half-finished migration. Fixed to use `.content`.

### The fix

`v1-render-fix.patch` — 51 insertions, 1 deletion across 5 files. It is **not**
applied to any branch; it exists so the diagnosis is not lost. Note that
`flutter_markdown` is discontinued, so bugs 2 and 3 will recur on any future
Flutter upgrade.

---

## Before (V1)

| Screenshot | What it shows |
| --- | --- |
| `before/01-landing.png` | Interactive Book home |
| `before/02-drawer.png` | Navigation drawer — a flat chapter list |
| `before/03-drawer-expanded.png` | Chapter expanded to its sub-topics |
| `before/04-chapter-page.png` | "Binary numbers" — headings, body text, code |
| `before/05-tables.png` | Tables and lists further down the page |
| `before/06-interaction-widget.png` | The binary simulator, an embedded WebView |
| `before/07-popquiz.png` | Pop quiz with questions and answer choices |
| `before/08-toc-sheet.png` | Table of contents bottom sheet |
| `before/09-search.png` | In-page search, showing match 1/3 |

## After (V2)

| Screenshot | What it shows |
| --- | --- |
| `after/01-home.png` | Home: progress, resume CTA, feature cards |
| `after/02-drawer.png` | Drawer: overall progress, offline card, chapter tree |
| `after/03-drawer-expanded.png` | Chapter expanded, per-topic completion state |
| `after/04-chapter-page.png` | "Binary numbers" — the same page as `before/04` |
| `after/05-simulator-and-quiz.png` | Native binary simulator (16+8+1 → 25) and pop quiz |

---

## What changed

| | V1 | V2 |
| --- | --- | --- |
| Content | Jekyll markdown + 7 custom syntaxes | Structured JSON → typed widgets |
| Rendering | `flutter_markdown` (discontinued) | Native Flutter widgets |
| Home | A markdown page | Purpose-built screen with progress and resume |
| Drawer | Flat chapter list | Chapter tree with per-chapter and overall progress |
| Progress | None | Per-topic, persisted, resumable |
| Offline | None | Whole book downloadable (57 pages, ~484 KB) |
| Simulators | Embedded WebViews from the book site | Native widgets, work offline |
| Search | In-page find | Not yet implemented |

The clearest pair is `before/04-chapter-page.png` against
`after/04-chapter-page.png` — the same chapter in both designs.

Note the asymmetry: V1 has search, which V2 does not yet have; V2 has progress
tracking and offline reading, which V1 does not.
