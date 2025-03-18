const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // 🔹 Lier la catégorie à un utilisateur
});

module.exports = mongoose.model("Category", CategorySchema);
