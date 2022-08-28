const {Artobjects} = require('../../db')
const fetch = require('node-fetch');
const {API_KEY} = process.env;
const {Op} = require('sequelize');
const {v4: uuidv4} = require('uuid');
async function getAllArtObjects (req, res)  {
      const {name} = req.query
    if(name){ // get /artObjectss?name='algo'
        //busco en mi base de datos
        const DBartObjects = Artobjects.findAll({
            where:{
                title: {
                    [Op.substring]: name
                    //like te encuntre todo lo parecido
                },
            }
        })
        //busco en mi api
        const APIartObjects = fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=${API_KEY}&involvedMaker=${name}`)
            .then(artObjects => artObjects.json())
        Promise.all([DBartObjects, APIartObjects])
            .then((results) => {
                console.log(results)
                const [DBartObjects, APIartObjects] = results;
                //uno ambas busquedas
                const responseTotal = DBartObjects.concat(APIartObjects.artObjects);
                console.log(APIartObjects.artObjects)
                res.json(responseTotal);
            })
            .catch(e => console.log(e))
    }else{
        try {
            const DBartObjects = await Artobjects.findAll()
            const APIartObjects = await fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=${API_KEY}`)
            const APIartObjectsJson = await APIartObjects.json()
            console.log(APIartObjectsJson)
            console.log(DBartObjects)
            const resultado = APIartObjectsJson         
            res.send(resultado)
        } catch (error) {
            console.log(error)
        }
    }             
}

const getMyDBArtObjects = (req, res) => {
    Artobjects.findAll()//para traernos los generos de ese juego
        .then(objects => res.json(objects))
        .catch(e => console.log(e))
}



module.exports = {
    getAllArtObjects,
    getMyDBArtObjects,
}