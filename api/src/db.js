import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { fileURLToPath } from "url";
import { dirname, join, basename } from "path";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const config = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: "videogames_dev",
    host: DB_HOST,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: false,
      native: true,
    },
    define: {
      timestamps: false,
      underscored: true,
    },
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    define: {
      timestamps: false,
      underscored: true,
    },
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
    dialectOptions: config[env].dialectOptions,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const currentFile = basename(__filename);
const modelDefiners = [];

const modelFiles = fs
  .readdirSync(join(__dirname, "models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== currentFile &&
      file.slice(-3) === ".js"
  );

for (const file of modelFiles) {
  const fullPath = join(__dirname, "models", file);
  const modelModule = await import(fullPath);
  const definer =
    modelModule.default || modelModule[Object.keys(modelModule)[0]];
  if (typeof definer === "function") {
    modelDefiners.push(definer);
  } else {
    console.warn(
      `Modelo no válido en ${file}. Exporta una función por default.`
    );
  }
}

modelDefiners.forEach((model) => model(sequelize));

const entries = Object.entries(sequelize.models);
const capsEntries = entries.map(([key, value]) => [
  key[0].toUpperCase() + key.slice(1),
  value,
]);
sequelize.models = Object.fromEntries(capsEntries);

if (!sequelize.models.Videogame || !sequelize.models.Genre) {
  console.error(
    "Model loading error. Available models:",
    Object.keys(sequelize.models)
  );
  throw new Error(
    "Videogame or Genre model not found. Check models directory path and exports."
  );
}

const { Videogame, Genre } = sequelize.models;
Videogame.belongsToMany(Genre, { through: "videogame_genre" });
Genre.belongsToMany(Videogame, { through: "videogame_genre" });

export { Videogame, Genre };
export const Genres = Genre;
export const Videogames = Videogame;
export const conn = sequelize;
