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
        POCKETBASE_PUBLIC_URL: 'https://pb.evesan.rocks',
      },
    },
    {
      name: 'pocketbase',
      script: '/home/ubuntu/apps/pocketBase/pocketbase',
      args: 'serve --http=127.0.0.1:8090',
      cwd: '/home/ubuntu/apps/pocketBase',   // aquí se guarda pb_data/
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
    },
  ],
}
