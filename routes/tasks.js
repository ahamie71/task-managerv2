const express = require("express");
const Task = require("../models/Task");
const Category = require("../models/Category");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Créer une tâche avec une catégorie
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, status, category } = req.body;

    // Vérifier que la catégorie appartient bien à l'utilisateur
    const validCategory = await Category.findOne({ _id: category, user: req.user.userId });
    if (!validCategory) {
      return res.status(400).json({ message: "Catégorie non valide" });
    }

    const task = new Task({ title, description, status, category, user: req.user.userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de la tâche" });
  }
});

// 🔹 Obtenir toutes les tâches de l'utilisateur
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId }).populate("category");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🔹 Modifier une tâche
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId }, // Vérifier que la tâche appartient bien au user
      req.body,
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ message: "Tâche non trouvée" });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour" });
  }
});

// 🔹 Supprimer une tâche
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!deletedTask) return res.status(404).json({ message: "Tâche non trouvée" });
    res.json({ message: "Tâche supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
