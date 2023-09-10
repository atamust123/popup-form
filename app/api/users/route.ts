import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connect } from "../../dbConfig/dbConfig";
import User from "../../libs/userModel";

connect();

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Returns the user list
 *     responses:
 *       200:
 *         description: Hello World!
 */
export async function GET(request:NextRequest) {
  try {
    const users = await User.find().select("-password");
    return NextResponse.json({
      message: "Users fetched",
      data: users,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

/**
 * @swagger
 * /api/users:
 *   post:
 *     description: add new user
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          required:
 *            - isAdmin
 *            - name
 *            - password
 *          properties:
 *            isAdmin:
 *              type: bool
 *              example: false
 *            name:
 *              type: string
 *              example: "Ali"
 *            password:
 *              type: string
 *              example: "12345678"
 *     responses:
 *       200:
 *         description: new user!
 */
export async function POST(request:NextRequest) {
  try {
    const body = await request.json();
    const { name, isAdmin, password } = body;
    console.log("Add user request body:", body);

    const user = await User.findOne({ name });

    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      password: hashedPassword,
      isAdmin,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/users:
 *   put:
 *     description: Update single user name
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          required:
 *            - userId
 *            - newName
 *          properties:
 *            userId:
 *              type: string
 *              example: "userId"
 *            newName:
 *              type: string
 *              example: "Ali"
 *     responses:
 *       200:
 *         description: Returns new user name!
 */
export async function PUT(request:NextRequest) {
  try {
    const body = await request.json();
    const { userId, newName } = body;
    console.log("body is fetched", body);
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { name: newName } },
      { returnNewDocument: true }
    );
    return NextResponse.json({
      message: "User updated",
      success: true,
      updatedUser: user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
/**
 * @swagger
 * /api/users:
 *   delete:
 *     description: Delete single user name
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *          type: object
 *          required:
 *            - userId
 *          properties:
 *            userId:
 *              type: string
 *              example: "userId"
 *     responses:
 *       200:
 *         description: Deleted user name!
 */
export async function DELETE(request:NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;
    console.log("body is fetched", body);

    const user = await User.findOneAndDelete({ _id: userId });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log("User deleted", user);
    return NextResponse.json({
      message: "User deleted successfully",
      success: true,
      deletedUser: user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
