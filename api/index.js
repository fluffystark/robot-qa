const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('api/robots.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server route
server.post('/robots/:version/extinguish', function (req, res) {
// See https://github.com/typicode/lowdb
    req.method = "GET"
    res.jsonp(req.query)
})

server.post('/robots/recycle', function (req, res) {
  // See https://github.com/typicode/lowdb
      req.method = "GET"
      res.jsonp(req.query)
  })

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})