require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import des routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const categoryRoutes = require("./routes/categories");

const app = express();

// 🔹 Middleware
app.use(cors()); // Sécurise les requêtes cross-origin
app.use(express.json()); // Permet de parser les requêtes JSON

// 🔹 Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((error) => console.error("❌ Erreur MongoDB :", error));

// 🔹 Routes
app.use("/api/auth", authRoutes); // Routes pour l'inscription et la connexion
app.use("/api/tasks", taskRoutes); // Routes des tâches
app.use("/api/categories", categoryRoutes); // Routes des catégories

// 🔹 Route de test
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Task Manager 🚀");
});

// 🔹 Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
