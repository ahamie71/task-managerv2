const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// 🔹 Inscription
rrouter.post("/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });
  
      // 🔥 Hachage du mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      console.log("🔍 Mot de passe haché :", hashedPassword); // Ajout du log
  
      // Création de l'utilisateur
      const newUser = new User({
        username,
        email,
        password: hashedPassword, // Assurez-vous de stocker le mot de passe haché !
      });
  
      await newUser.save();
      res.status(201).json({ message: "Utilisateur créé avec succès !" });
    } catch (error) {
      console.error("❌ Erreur lors de l'inscription :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  

// 🔹 Connexion
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      console.log("🔍 Email reçu :", email);
      console.log("🔍 Mot de passe reçu :", password);
  
      // Vérifier si l'utilisateur existe
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });
  
      console.log("✅ Utilisateur trouvé :", user);
  
      // Vérifier le mot de passe
      console.log("🔍 Mot de passe en base :", user.password);
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("🔍 Résultat de bcrypt.compare :", isMatch);
  
      if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });
  
      // Générer un token JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ token, userId: user._id, username: user.username });
    } catch (error) {
      console.error("❌ Erreur lors de la connexion:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });

module.exports = router;
