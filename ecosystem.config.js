module.exports = {
  apps: [
    {
      name: "brillebeauty",
      script: "server.js",
      env: {
        PORT: 3000,
        NODE_ENV: "developer",
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: "production",
      },
    },
  ],
};
