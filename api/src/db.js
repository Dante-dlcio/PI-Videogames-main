require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
 
const {
  DB_USER, DB_PASSWORD, DB_HOST,DB_URL
} = process.env;


//Sequelize configuration
const sequelize = new Sequelize(DB_URL||`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  define:{
    underscored:true,//Uses snake_case instead of camelCase in the column names
  }
});


//Error handling in the conection
(async()=>{
  try{
    await sequelize.authenticate();
    console.log('✅ Conection to database succesfully established')
  } catch(error){
    console.error('❌ Error conecting to the database',error)
  }
})()


const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
const entries = Object.entries(sequelize.models);
const capEntries = entries.map(([name, model])=>[name[0].toUpperCase() + name.slice(1), model])
sequelize.models = Object.fromEntries(capEntries)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Videogames,Genres } = sequelize.models;

//Relaciones

Videogames.belongsToMany(Genres,{
  through: 'videogames-genres',
   timestamps: false,
  foreignKey: 'videogame_id',
  });
Genres.belongsToMany(Videogames,{
  through: 'videogames-genres',
   timestamps: false,
  foreignKey:'genre_id',
 });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
