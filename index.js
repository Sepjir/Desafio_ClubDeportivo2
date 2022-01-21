const url = require('url')
const http = require('http')
const fs = require('fs')
// Almacenando en el servidor en una constante para las pruebas de /test (correr con 'npm run test')
const server = http
  .createServer(function (req, res) {
    if (req.url == '/') {
      res.setHeader('content-type', 'text/html')
      fs.readFile('index.html', 'utf8', (err, data) => {
        res.end(data)
      })
    }

// Agregado el metodo GET a la disposición de la URL    
    if (req.url == '/deportes' && req.method == "GET") {
      fs.readFile('data.json', 'utf8', (err, data) => {
        res.end(data)
      })
    }

// Agregado el metodo POST a la disposición de la URL    
    if (req.url.startsWith('/agregar') && req.method == "POST") {
      const { nombre, precio } = url.parse(req.url, true).query
      fs.readFile('data.json', 'utf8', (err, data) => {
        let deportes = JSON.parse(data).deportes
        deportes.push({
          nombre,
          precio,
        }
        )

        fs.writeFile('data.json', JSON.stringify({deportes}), (err, data) => {
          err ? console.log(' oh oh...') : console.log(' OK ')
          res.end('Deporte agregado con exito')
        })
      })
    }

// Agregado el metodo PUT a la disposición de la URL    
    if (req.url.startsWith('/editar') && req.method == "PUT") {
      const { nombre, precio } = url.parse(req.url, true).query
      fs.readFile('data.json', 'utf8', (err, data) => {
        let deportes = JSON.parse(data).deportes
        deportes = deportes.map((d) => {
          if (d.nombre == nombre) {
            d.precio = precio
            return d
          }
          return d
        })
        fs.writeFile('data.json', JSON.stringify({ deportes }), (err, data) => {
          err ? console.log(' oh oh...') : console.log(' OK ')
          res.end('Deporte editado con exito')
        })
      })
    }

// Agregado el metodo DELETE a la disposición de la URL    
    if (req.url.startsWith('/eliminar') && req.method == "DELETE") {
      const { nombre } = url.parse(req.url, true).query
      fs.readFile('data.json', 'utf8', (err, data) => {
        let deportes = JSON.parse(data).deportes
        deportes = deportes.filter((d) => d.nombre !== nombre)
        fs.writeFile('data.json', JSON.stringify({ deportes }), (err, data) => {
          err ? console.log(' oh oh...') : console.log(' OK ')
          res.end('Deporte elimado con exito')
        })
      })
    }
  })
  .listen(3000, () => console.log("Servidor levantado en el puerto 3000"))
// exportando constante del servidor en un modulo para pruebas
  module.exports = server
