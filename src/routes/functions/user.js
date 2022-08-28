const fetch = require('node-fetch');
const {API_KEY} = process.env;
const {Op} = require('sequelize');
const {v4: uuidv4} = require('uuid');
const jwt = require("jsonwebtoken");
const {User} = require('../../db')
async function getUserById(req, res)  {
    const idUser = req.params.id;
    User.findByPk(idUser)
        //debe el tener una asociacion a generos
        .then(user => res.json(user))
        .catch(e => console.log(e))
}
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and Password are both required." });
    } else {
      const user = await User.findAll({where:{ email: email }});
      console.log('estes es el usuario  ' + user)

      const passwordCorrect =
        user === null ? false : password = user.password;

      if (!(user && passwordCorrect)) {
        res.status(401).json({
          error: "invalid user or password",
        });
      } else {
        const userForToken = {
          id: user._id,
        };

        const token = jwt.sign(userForToken, process.env.SECRETWORD, {
          expiresIn: 60 * 60 * 24 * 7,
        });

        res.send({
          name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null,
          // name: `${user?.firstName} ${user?.lastName}`,
          email: user.email ? user.email : null,
          // email: user?.email,
          token,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};
const createUser = async (req, res) => {
  const {
    name,
    email,
    password,
  } = req.body;

  try {
    const userExist = await User.findAll({where:{ email: email }});
    console.log(userExist)
    if (userExist) {
      return res.json({ error: "User already exists" });
    } else {
      const userClient = await User.create({
        name: name,
        email: email,
        birthDate: birthdate,
        password: password,
      });
      res.status(201).send("Welcome to our community, now you can sign in");
    }
  } catch (error) {
    res.status(405).send(error);
  }
};

module.exports = {
    getUserById,
    login,
    createUser
}