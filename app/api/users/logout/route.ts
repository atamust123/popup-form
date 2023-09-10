import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     description: If user logged in, sets the token empty string, then page is routed the login page
 *     responses:
 *       200:
 *         description: Hello World!
 */
export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
