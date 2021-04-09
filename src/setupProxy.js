const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/smm',
    createProxyMiddleware({
      target: 'http://3.237.78.201:3000',
      changeOrigin: true,
    })
  );

 app.use(
      '/quote',
      createProxyMiddleware({
        target: 'http://3.237.78.201:3000',
        changeOrigin: true,
      })
    );

    app.use(
        '/user',
        createProxyMiddleware({
            target: 'http://3.237.78.201:3000',
            changeOrigin: true,
        })
    );
};
