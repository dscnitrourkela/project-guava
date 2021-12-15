const UserModel = require('../../models/user');

const validateRequest = async (args) => {
  const DAYINMILLISECONDS = 24 * 60 * 60 * 1000;
  const errors = [];
  const { template, pixelMap, availabilityDate, approvers } = args;
  const { xDimension: templateWidth, yDimension: templateHeight } = template;

  // check if the pixelMap is within the bounds of the template image
  pixelMap.forEach(({ columnName, xDimension, yDimension }) => {
    if (xDimension < 0 || xDimension >= templateWidth || yDimension < 0 || yDimension >= templateHeight) {
      errors.push(
        `PixelMap for ${columnName} at xDimension: ${xDimension}, yDimension: ${yDimension} is out of bounds of template image with xDimension: ${templateWidth}, yDimension: ${templateHeight}.`
      );
    }
  });

  // check if the approvers is within the bounds of the template image and have scale within limits
  approvers.forEach(({ userID, xDimension, yDimension, scale }) => {
    if (xDimension < 0 || xDimension >= templateWidth || yDimension < 0 || yDimension >= templateHeight) {
      errors.push(
        `Approver with ID: ${userID} at xDimension: ${xDimension}, yDimension: ${yDimension} is out of bounds of template image with xDimension: ${templateWidth}, yDimension: ${templateHeight}.`
      );
    }
    if (scale <= 0.01) {
      errors.push(`Approver with ID: ${userID} has scale: ${scale} which is less than 0.01`);
    }
  });

  const now = new Date();
  const availabilityDateTime = new Date(availabilityDate);

  // check if the availabilityDate valid Date
  if (availabilityDateTime.toString() === 'Invalid Date') {
    errors.push(`Invalid availabilityDate: ${availabilityDate}`);
  }

  // check if the availabilityDate is in the future by 24 hours
  if (availabilityDateTime - now < DAYINMILLISECONDS) {
    errors.push(`Availability date: ${availabilityDateTime.toString()} should be at least 24 hours in future from now`);
  }

  // check if columns in pixelMap and template data are consistent
  const columnNames = pixelMap.map(({ columnName }) => columnName).sort();
  template.data.forEach((row, index) => {
    const rowColumnNames = Object.keys(row).sort();
    const isSame =
      rowColumnNames.length === columnNames.length &&
      rowColumnNames.every((columnName, index) => columnName === columnNames[index]);
    if (!isSame) {
      errors.push(`Row ${index} in template data is not consistent with pixelMap`);
    }
  });

  // check if approvers are valid users
  const approversUserIDs = approvers.map(({ userID }) => userID);
  const approversUsers = await UserModel.find({ _id: { $in: approversUserIDs } }, { _id: 1 });
  if (approversUsers.length !== approversUserIDs.length) {
    const invalidUserIDs = approversUserIDs.filter(
      (userID) => !approversUsers.find((user) => user._id.toString() === userID)
    );
    errors.push(`Invalid approvers: ${invalidUserIDs}`);
  }

  const hasErrors = errors.length > 0;
  return { hasErrors, errors };
};

module.exports = {
  validateRequest,
};
