const addCreatedAndUpdatedBy = (user) => {
  const userID = user; //TODO: Parse JWT/equivalent here
  return { updatedBy: userID, createdBy: userID };
};

const addUpdatedBy = (user) => {
  const userID = user; //TODO: Parse JWT/equivalent here
  return { updatedBy: userID };
};

module.exports = { addCreatedAndUpdatedBy, addUpdatedBy };
