/** @type {import('next').NextConfig} */
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'books.google.com',
          port: ''
        }
      ],
    },
  }
