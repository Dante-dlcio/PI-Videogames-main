const { getGames } = require("./getGames");

const getFeaturedGames = async (req, res) => {
  try {
    const allGames = await getGames();

    console.log("Juegos antes de filtar", allGames.length);

    //Filtering games by latest release and metacritic
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      
      const featuredGames = allGames.filter((game) => {
        console.log(
            `Evaluando ${game.name} -> Metacritic: ${game.metacritic}, fecha de lanzamiento: ${game.releaseDate}`
        )

      return (
        game.metacritic !== "Undetermined" &&
        game.metacritic > 80 &&
        new Date(game.releaseDate) >= oneYearAgo
      );
    });

    console.log("juegos que cumplen el criterio:", featuredGames.length);

    //selecting 7 random games
    const shuffled = featuredGames.sort(() => 0.5 - Math.random());
    const selectedGames = shuffled.slice(0, 7);

console.log("juegos seleccionados", selectedGames.length);

    console.log(selectedGames);
    res.status(200).json(selectedGames);
  } catch (error) {
    console.error("Error fetching featured games", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getFeaturedGames };
