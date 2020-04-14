#!/bin/bash
ffmpeg -i "/var/www/html/developer2/http/public/files/$1" -f image2 -vframes 1 -ss 00:00:10 "/var/www/html/developer2/http/public/files/$1.jpg"