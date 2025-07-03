// src/middleware/auth.js
export function requireAuth(role) {
  return (req, res, next) => {
    if (req.session.user?.role === role) return next();
    res.status(403).json({ message: "Forbidden" });
  };
}
