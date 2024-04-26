import { db } from "@/lib/db";

export const getUserByEmail = async (email: any) => {
  try {
    const user = await db.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error){
    console.log(error)
    return null;
  }
};

export const getUserById = async (id: any) => {
  try {
    const user = await db.users.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch {
    return null;
  }
};
