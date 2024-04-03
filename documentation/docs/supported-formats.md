# Supported file formats
CS Logs viewer supports [Compact Log Event Format (CLEF)](https://clef-json.org/)

## CLEF format file example
```json
{"@t":"2016-06-07T03:44:57.8532799Z","@mt":"Hello, {User}","User":"nblumhardt"}
{"@t":"2016-06-07T03:44:56.8532434Z","@mt":"Bye, {User} {@t}","User":"nblumhardt"}
```

Fields `@t` `@mt` are **necessary**