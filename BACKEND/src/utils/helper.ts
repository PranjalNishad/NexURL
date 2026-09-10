import { nanoid } from "nanoid";
import jsonwebtoken from "jsonwebtoken";

export const generateNanoid = (length: number) => {
  return nanoid(length);
}

export const signToken = async (payload: any) => {
  return jsonwebtoken.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
};

export const verifyToken = (payload: any) => {
  return jsonwebtoken.verify(
    payload,
    process.env.JWT_SECRET as string
  );
};  
   