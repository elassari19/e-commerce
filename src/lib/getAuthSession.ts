import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getAuthSession = async () => await getServerSession(authOptions)
// @ts-ignore
export const auth = async (option: string) => await getAuthSession().then(res => res?.token?.[option])
