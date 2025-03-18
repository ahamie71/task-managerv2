const express = require("express");
const User = require("../models/User");

const router = express.Router();

// 🔹 Ajouter un utilisateur
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "Utilisateur ajouté avec succès", user });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'ajout de l'utilisateur" });
  }
});

// 🔹 Obtenir tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
