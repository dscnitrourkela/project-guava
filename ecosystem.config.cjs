/** @format */

module.exports = {
  apps: [
    {
      name: 'dev',
      script: './src/index.js',
      watch: '.',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      exec_mode: 'cluster',
      instances: 1,
      exp_backoff_restart_delay: 100,
    },
  ],
};
