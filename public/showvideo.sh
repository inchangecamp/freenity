#!/bin/bash
ffmpeg -i "/home/wizard1988/freenity.news/http/public/files/$1" -f image2 -vframes 1 -ss 00:00:02 "/home/wizard1988/freenity.news/http/public/files/$1.jpg"