// index.js
const express = require("express");
const axios = require("axios");
const path = require("path"); // Importa la librería path



const app = express();
const port = 30013;

// Middleware para servir archivos estáticos desde la carpeta 'views'
app.use(express.static("views"));

// Configura Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Ruta para obtener todas las razas y subrazas de perros
app.get("/razas", async (req, res) => {
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/list/all");
    const breeds = response.data.message;
    const totalBreeds = Object.keys(breeds).length;
    let totalSubBreeds = 0;
    let allBreeds = {};

    // Contar subrazas si existen y almacenar todas las razas en un objeto
    Object.keys(breeds).forEach((breed) => {
      allBreeds[breed] = breeds[breed].length;
      totalSubBreeds += breeds[breed].length;
    });

    res.json({ totalBreeds, totalSubBreeds, breeds: allBreeds }); // Envía todas las razas y subrazas junto con el total
  } catch (error) {
    res.status(500).send("Error al obtener las razas de perros");
  }
});

// Ruta para obtener la imagen de una raza o subraza
app.get("/breed/:name", async (req, res) => {
  try {
    const breedName = req.params.name;
    // Construye la URL para obtener una imagen aleatoria de la raza especificada
    const imageUrl = `https://dog.ceo/api/breed/${breedName}/images/random`;
    // Realiza una solicitud GET a la API de Dog CEO para obtener la imagen
    const response = await axios.get(imageUrl);
    // Extrae la URL de la imagen de la respuesta
    const imageUrlResponse = response.data.message;
    // Redirige a la URL de la imagen
    res.redirect(imageUrlResponse);
  } catch (error) {
    // Maneja cualquier error que ocurra durante la obtención de la imagen
    console.error("Error al obtener la imagen de la raza:", error);
    res.status(500).send("Error al obtener la imagen de la raza");
  }
});

/// Ruta para la página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
