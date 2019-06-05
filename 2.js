const ffmpeg = require('fluent-ffmpeg')


ffmpeg('/home/wizard1988/freenity.news/http/public/files/Big_Buck_Bunny_Trailer.avi')
  .screenshots({
    timestamps: ['00:00:02.000'],
    filename: '123.png',
    folder: '/home/wizard1988/freenity.news/http'
  });