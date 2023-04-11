#!/bin/bash
mkdir -p icon.iconset
for HEIGHT in 16 24 32 48 64 96 128 256 512 1024
do
    rsvg-convert -h $HEIGHT icon.svg > icon.iconset/icon_$HEIGHT\x$HEIGHT.png
done
iconutil -c icns icon.iconset
rm -rf icon.iconset
