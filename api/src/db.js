import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { fileURLToPath } from "url";
import { dirname, join, basename } from "path";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

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
      timestamps: false,
      underscored: true,
    },
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

// Aseguramos que tengamos un ambiente por defecto
const env = process.env.NODE_ENV || "development";

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host || "127.0.0.1",
    dialect: config[env].dialect,
    logging: config[env].logging,
  }
);

const currentFile = basename(__filename);
const modelDefiners = [];

// Lectura dinámica de modelos
const modelFiles = fs
  .readdirSync(join(__dirname, "models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== currentFile &&
      file.slice(-3) === ".js"
  );

// Importación dinámica de modelos
for (const file of modelFiles) {
  const fullPath = join(__dirname, "models", file);
  const modelModule = await import(fullPath);
  // En CJS `module.exports = fn` llega como default; en ESM export default fn también.
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

// Injectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map(([key, value]) => [
  key[0].toUpperCase() + key.slice(1),
  value,
]);
sequelize.models = Object.fromEntries(capsEntries);

// Guard clause para modelos requeridos
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

// ESM named exports (identifiers only)
export { Videogame, Genre };
export const Genres = Genre; // alias retro‑compatible
export const Videogames = Videogame; // alias retro‑compatible
export const conn = sequelize;
