#!/usr/bin/env bash
browserify -o build/js/background-bundle.js src/js/background/background.js
browserify -o build/js/content-bundle.js src/js/content/content.js
