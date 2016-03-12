#!/usr/bin/env bash
destination=${1:-"."}
ma_chrome_extension_dir=${BR_TOP}'/work/src/merchandising/ma_chrome_extension_v2'
ma_chrome_extension_name='ma_chrome_extension_v2.zip'

cd ${ma_chrome_extension_dir};
echo "Bulding all js files first.."
scripts/build.sh
echo "Complete!"
echo "Compressing file to ${destination}/${ma_chrome_extension_name}..";
zip -r ${destination}/${ma_chrome_extension_name} . -x "node_modules/*" "scripts/*" "src/*" "test/*" ".*";
echo "Complete!";
