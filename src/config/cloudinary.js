const { v2: cloudinary } = require('cloudinary');

const logger = require('./winston.js');

try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  logger.info('Cloudinary SDK Initialized');

  cloudinary.uploader.upload('my_image.jpg', (error, result) => {
    // eslint-disable-next-line no-console
    console.log(result, error);
  });
} catch (error) {
  logger.error(new Error('Cloudinary SDK Initialization Error: '), error);
}
