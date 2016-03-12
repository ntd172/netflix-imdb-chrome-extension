#!/usr/bin/env bash
./node_modules/watchify/bin/cmd.js -o build/js/background-bundle.js src/js/background/background.js -v &
./node_modules/watchify/bin/cmd.js -o build/js/content-bundle.js src/js/content/content.js -v &
./node_modules/watchify/bin/cmd.js -o build/js/main-bundle.js src/js/content/main.js -v &

for job in `jobs -p`
do
  wait ${job}
done
