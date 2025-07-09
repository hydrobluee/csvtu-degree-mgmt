// GET /api/session

router.get("/session", (req, res) => {
  if (req.session.user) {
    return res.json({
      email: req.session.user.email,
      role: req.session.user.role,
    });
  }
  res.status(401).json({ message: "Not authenticated" });
});
