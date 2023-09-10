import { NextRequest, NextResponse } from "next/server";
import User from "../../../libs/userModel";
import { connect } from "../../../dbConfig/dbConfig";
import { getDataFromToken } from "../../../actions/getToken";

connect();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     description: If user logged in, get the current user and sets the token
 *     responses:
 *       200:
 *         description: Hello World!
 */
export async function GET(request:NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
