// connecting node.js to the website and get the website html
const request = require('request');
const cheerio = require('cheerio');
const imageDownloader = require('node-image-downloader');
request('https://memegen.link/examples', function (error, response, html) {
  // declaring new variable $
  const $ = cheerio.load(html);
  //
  $('img').each((index, image) => {
    const img = $(image).attr('src');
    const baseUrl = 'https://memegen.link';
    const Links = baseUrl + img;
    // Give me only the first 10 links
    if (index < 10) {
      console.log(Links, index);

      // image downloader

      imageDownloader({
        imgs: [
          {
            uri: Links,
            filename: '0' + index,
          },
        ],
        dest: './downloads', //destination folder
      })
        .then((info) => {
          console.log('all done', info);
        })
        .catch((error, response, body) => {
          console.log('something goes bad!');
          console.log(error);
        });
    }
  });
});
