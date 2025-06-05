// controllers/authController.js
import jwt from 'jsonwebtoken';
import db from "../db.js";
import { jwtSecret } from '../server.js';  // importar a variável do secret

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se é cliente
    const [cliente] = await db.query("SELECT * FROM cliente WHERE Email = ? AND Senha = ?", [email, senha]);

    if (cliente.length > 0) {
      const usuario = {
        tipo: "cliente",
        ID_Cliente: cliente[0].ID_Cliente,
        Nome: cliente[0].Nome,
        Email: cliente[0].Email,
      };

      const token = jwt.sign(
        { tipo: usuario.tipo, ID_Cliente: usuario.ID_Cliente, email: usuario.Email },
        jwtSecret,
        { expiresIn: "1d" }
      );

      return res.json({ token, usuario });
    }

    // Verifica se é profissional
    const [profissional] = await db.query("SELECT * FROM profissionais WHERE Email = ? AND Senha = ?", [email, senha]);

    if (profissional.length > 0) {
      const usuario = {
        tipo: "profissional",
        ID_Profissional: profissional[0].ID_Profissional,
        Nome: profissional[0].Nome,
        Email: profissional[0].Email,
      };

      const token = jwt.sign(
        { tipo: usuario.tipo, ID_Profissional: usuario.ID_Profissional, email: usuario.Email },
        jwtSecret,
        { expiresIn: "1d" }
      );

      return res.json({ token, usuario });
    }

    res.status(401).json({ mensagem: "Email ou senha inválidos" });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};
