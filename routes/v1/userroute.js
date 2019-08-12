let express = require('express')
let router = express.Router()
//let service = require("./../../services/user").router;
module.exports = (express) => {
	let router = express.Router();
	//USER CRUD
  //router.get('/:userid', service.read);
  /*router.post('/', service.create);
  router.put('/:userid', service.update);
  router.delete('/:userid', service.delete);
	*/
  return router;
}
