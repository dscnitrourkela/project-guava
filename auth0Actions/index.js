// NOTE: The following is not kept in automatic sync with Auth0's Actions.
// There is manual sync as at the moment there to CI/CD for Auth0 Actions from Version Control that is known to us.
// Language: javascript
// Context Required: Auth0 Actions Runtime
// Purpose: Add a thematic avatar for all users of the application via the beautiful avatars provided by boringavatars.com

/**
 * Handler that will be called during the execution of a PostLogin flow.
 *
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
exports.onExecutePostLogin = async (event, api) => {
  if (!event.user.user_metadata.avatar) {
    const axios = require('axios');
    const res = await axios.get('https://source.boringavatars.com/beam/512');
    const svgToDataURL = require('svg-to-dataurl');
    const dataURL = svgToDataURL(res.data);
    api.user.setUserMetadata('avatar', dataURL);
  }
};
