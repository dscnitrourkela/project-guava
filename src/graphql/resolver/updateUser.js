import User from '../../models/user.js';

import logger from './winston.js';

export const addUser = async (parent, args) => {
  const { id, name, displayPicture, blurHash } = args;
  const existingUser = await User.findById(id);

  if (!existingUser) {
    throw new Error(`User not found`);
  }

  User.findByIdAndUpdate(id, {
    $set: {
      name,
      displayPicture,
      blurHash,
    },
  });

  try {
    return await user.save();
  } catch (error) {
    logger.error('Something went wrong while creating a user', error);
  }
};
