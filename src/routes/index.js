const { Router } = require('express');
const { getAllArtObjects,getMyDBArtObjects} = require('./functions/artObjects.js');
const {getUserById, login,createUser } = require('./functions/user.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/artobjects', getAllArtObjects);//bien
router.get('/myartobjects', getMyDBArtObjects);//bien
router.get('/user/:id', getUserById)
router.post('/login', login)
router.post('/register', createUser)

module.exports = router;
