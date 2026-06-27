module.exports = {
  apps: [
    {
      name: 'blog',
      script: './dist/server/entry.mjs',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        HOST: '127.0.0.1',
        POCKETBASE_URL: 'http://127.0.0.1:8090',
      },
    },
  ],
}
