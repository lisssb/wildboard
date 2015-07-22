module.exports = {
  default: {
    manifests: ["https://localhost:3000/manifest.json"],

    port: 3000,

    secure: true,
    
    // Https
    express: {
      key: "./ssl/server-key.pem",
      cert: "./ssl/server-cert.pem"
    },
    
    server: {
      index: "app/views/index.html"
    }
  },

  development: {},

  test: {
    secure: false
  },

  production: {
    port: 80,
  }
};