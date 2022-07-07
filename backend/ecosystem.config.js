module.exports = {
  apps: [
    {
      name: 'Backend-banks',
      exec_mode: 'cluster',
      instances: 'max',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
