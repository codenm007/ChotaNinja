module.exports = {
    dev: {
    "default-src": ["'self'"],
    "style-src": [
      "'self'",
      "https://*.google.com",
    ]
    },
    prod: {
    "default-src": "'self'",  // can be either a string or an array.
    "style-src": [
      "'self'",
      "https://*.google.com",
    ],
    "connect-src": [
      "'self'",
      "https://chota.ninja",
      "https://*.google.com",
    ]
    }
  }