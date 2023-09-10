import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request:NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    return (decodedToken as {id:string}).id;
  } catch (error) {
    throw new Error(error.message);
  }
};
