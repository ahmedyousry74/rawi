module.exports = {
  apps: [
    {
      name: 'rawy',
      exec_mode: 'cluster',
      instances: '1',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      watch: true,
      env: {
        HOST: '0.0.0.0',
        PORT: 3035,
        NODE_ENV: 'production',
      },
    },
  ],
}
