#!/bin/bash
for HEIGHT in 16 24 32 48 64 96 128 256 512 1024
do
    rsvg-convert -h $HEIGHT icon.svg > icons/$HEIGHT\x$HEIGHT.png
done
