const chai = require("chai")
const chaiHttp = require("chai-http")
const server = require("../index")
chai.use(chaiHttp)

describe("Haciendo una prueba con Mocha y Chai-http", function () {
  it("Realizando una consulta GET - Probando endpoint '/deportes', donde el JSON que este ahí tenga una propiedad 'deportes' y que todo sea entregado en un Array", function () {
    chai
      .request(server)
      .get("/deportes")
      .end(function (err, res) {
        let data = JSON.parse(res.text);

        chai.expect(data).to.have.property("deportes");

        chai.expect(data.deportes).to.be.an("array");
      });
  });
});