// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ mensagem: "Token não fornecido" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ mensagem: "Token inválido" });

    req.usuario = decoded; // { tipo, ID_Cliente ou ID_Profissional, email }
    next();
  });
};
