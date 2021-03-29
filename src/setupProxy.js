const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/api",
    createProxyMiddleware(
      (pathname, req) => pathname.match('^/api') && (
        req.method === 'GET' 
        || req.method === 'POST' 
        || req.method === 'PUT' 
        || req.method === 'DELETE'
        || req.method === 'OPTIONS'), 
      {
        target: "http://localhost:2018",
        pathRewrite: {
          '^/api': '/WebApi',
        },
      }
    )
  );
};