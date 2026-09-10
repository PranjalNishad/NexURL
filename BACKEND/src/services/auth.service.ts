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

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user || user.password !== password) {
    throw new ConflictError("Invalid credentials");
  }

  // Here you should add password verification logic (e.g., using bcrypt)
  // const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) {
  //   throw new ConflictError("Invalid credentials");
  // }

  // For simplicity, we are skipping that step in this example.

  const token = await signToken({ id: user._id, email: user.email });
  return { token, user };
}