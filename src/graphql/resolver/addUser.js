import User from '../../models/user.js';

import logger from '../../config/winston.js';

export default async (parent, args) => {
  const { mail, name, displayPicture, blurHash, firebaseID, accessLevel } = args;
  const existingUser = await User.findOne({ mail });

  if (existingUser) {
    throw new Error(`User with mail ${mail} already exists`);
  }

  // TODO: add firebaseID and accessLevel to the check below
  if (!mail || !name || !displayPicture || !blurHash) {
    throw new Error(`Please add all fields`);
  }

  const user = new User({
    mail,
    name,
    displayPicture,
    blurHash,
    firebaseID,
    accessLevel,
  });

  try {
    return await user.save();
  } catch (error) {
    logger.error('Something went wrong while creating a user', error);
  }
};
