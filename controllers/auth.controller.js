const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Password reset error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { resetPassword };
