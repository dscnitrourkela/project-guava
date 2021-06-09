const { v2: cloudinary } = require('cloudinary');

const logger = require('./winston.js');

try {
  cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret,
    upload_preset: process.env.cloudinary_upload_preset,
  });

  logger.info('Cloudinary SDK Initialized');
} catch (error) {
  logger.error(new Error('Cloudinary SDK Initialization Error: '), error);
}
