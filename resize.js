var sharp = require('sharp')

sharp('test.jpg')
  .resize(300, 200)
  .toFile('test2.jpg', function(err) {
    // output.jpg is a 300 pixels wide and 200 pixels high image
    // containing a scaled and cropped version of input.jpg
  });
