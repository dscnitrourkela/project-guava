import { WelcomeType } from '../types/index.js';

export default {
  type: WelcomeType,
  args: {},
  resolve() {
    return {
      status: 200,
      message: 'Apollo-Server is working!',
    };
  },
};
