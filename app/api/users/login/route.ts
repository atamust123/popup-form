import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
import User from "../../../libs/userModel";

connect();

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     description: Login action
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - password
 *          properties:
 *            name:
 *              type: string
 *              example: "Ali"
 *            password:
 *              type: string
 *              example: "12345678"
 *     responses:
 *       200:
 *         description: Hello World!
 */
export async function POST(request:NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, password } = reqBody;
    console.log("reqBody successfully fetched", reqBody);

    const user = await User.findOne({ name });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log("user exists");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    console.log(user);

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
