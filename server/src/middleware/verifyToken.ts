import type { RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const verifyToken: RequestHandler = (req, res, next) => {
  console.log("Authorization:", req.headers.authorization);
  const auth = req.headers.authorization;

  if (!auth?.startsWith("Bearer ")) {
    console.log("Pas de Bearer");
    return res.sendStatus(401);
  }

  const token = auth.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload & {
      id: number;
      role: string;
    };

    req.user = {
      id: payload.id,
      role: payload.role,
    };

    next();
  } catch {
    return res.sendStatus(403);
  }
};
