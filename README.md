# utmeda-www

This project was bootstrapped with [`create-ueno-app`](https://github.com/ueno-llc/create-ueno-app)

## Font subsetting

Use glyphhanger, [follow install instructions](https://github.com/filamentgroup/glyphhanger#installation). Make sure to use `python3` and `pip3` if `python` is using version 2.x

Create the subset for the variable font for Basic Latin, Latin-1 Supplement and Latin Extended-A character ranges:

```bash
glyphhanger --whitelist=U+0020–007F,U+00A0–00FF,+0100–017F --subset="Jost Variable Font.ttf" --flavor=woff2
```

and all fallbacks:

```bash
glyphhanger --whitelist=U+0020–007F,U+00A0–00FF,+0100–017F --subset="Jost Variable Font.ttf" --flavor=woff2
```

copy to `src/` and get variable with something like `font-variation-settings: "wght" 666, "ital" 0.69;`.
