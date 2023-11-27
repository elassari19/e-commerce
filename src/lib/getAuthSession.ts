import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getAuthSession = async () => await getServerSession(authOptions)
export const getUser = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user
  return user
}
