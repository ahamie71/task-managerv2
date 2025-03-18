const express = require("express");
const Category = require("../models/Category");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Créer une catégorie (utilisateur authentifié)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name, user: req.user.userId });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de la catégorie" });
  }
});

// 🔹 Récupérer les catégories de l'utilisateur
router.get("/", authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.userId });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
