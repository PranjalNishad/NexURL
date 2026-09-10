import {createUser, findUserByEmail} from "@/dao/user.dao";
import { ConflictError } from "@/utils/errorHandler";

import { signToken } from "@/utils/helper";

export const registerUser = async (name: string, email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (user) {
    throw new ConflictError("User already exists");
  }

  const newUser = await createUser( name, email, password );
  const token =await signToken({ id: newUser._id, email: newUser.email });
  
  await newUser.save();

  return { user: newUser, token };
}