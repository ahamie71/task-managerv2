const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["todo", "in progress", "done"], default: "todo" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // 🔹 Associer une catégorie
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔹 Associer un utilisateur
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Task", TaskSchema);
