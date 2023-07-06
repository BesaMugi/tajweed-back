import  jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.json({ error: "Вы не авторизованы" });

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") return res.status(401).json({ error: "Неверный тип токена" });

  try {
    req.user = await jwt.verify(token, process.env.SECRET_JWT_KEY);
    next();
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

