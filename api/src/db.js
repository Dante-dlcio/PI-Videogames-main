require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Configuración según ambiente
const config = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: "videogames_dev",
    host: DB_HOST,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      // Opciones específicas para PostgreSQL 17
      ssl: false,
      native: true,
    },
    define: {
      timestamps: true,
    },
  },
  staging: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: "videogames_staging",
    host: DB_HOST,
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: "videogames_prod",
    host: DB_HOST,
    dialect: "postgres",
    logging: false,
  },
};

const env = process.env.NODE_ENV || "development";
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect,
    logging: config[env].logging,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models
fs.readdirSync(path.join(__dirname, "models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Guard: ensure required models are present
if (!sequelize.models.Videogame || !sequelize.models.Genre) {
  console.error(
    "Model loading error. Available models:",
    Object.keys(sequelize.models)
  );
  throw new Error(
    "Videogame or Genre model not found. Check models directory path and exports."
  );
}

// Relaciones entre modelos
const { Videogame, Genre } = sequelize.models;
Videogame.belongsToMany(Genre, { through: "videogame_genre" });
Genre.belongsToMany(Videogame, { through: "videogame_genre" });

module.exports = {
  ...sequelize.models,
  // Backward-compatible aliases (some controllers may import plural names)
  Genres: sequelize.models.Genre,
  Videogames: sequelize.models.Videogame,
  conn: sequelize,
};
