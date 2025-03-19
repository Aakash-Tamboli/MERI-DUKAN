import redis from "../Libs/Redis.js";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";

// helper function
function generateTokens(userId) {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return {
    accessToken,
    refreshToken,
  };
}

async function storeRefreshToken(userId, refreshToken) {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  ); // 7 days asked by chat-gpt
}

function setCookies(response, accessToken, refreshToken) {
  response.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevent CSRF attack, cross-site request frogery attack
    maxAge: 15 * 60 * 1000, // 15 min. generated by chat gpt
  });

  response.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevent CSRF attack, cross-site request frogery attack
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, generated by chat gpt
  });
}

async function signup(request, response) {
  const { email, password, name } = request.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists)
      return response.status(400).json({ message: "User already exists" });
    const user = await User.create({ name, email, password });

    // authenticate user
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken);

    setCookies(response, accessToken, refreshToken);

    response.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    response.status(500).json({ message: error.message });
  }
}

async function login(request, response) {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(response, accessToken, refreshToken);

      response.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      response.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error in Login controller", error.message);
    response.status(500).json({ message: error.message });
  }
}

async function logout(request, response) {
  try {
    const refreshToken = request.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`);
    }

    response.clearCookie("accessToken");
    response.clearCookie("refreshToken");
    response.json({ message: "Logged out successfuly" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    response
      .status(500)
      .json({ message: "Server error: ", error: error.message });
  }
} // function ends

async function re_generateAccessToken(request, response) {
  try {
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken)
      return response
        .status(401)
        .json({ message: "No refresh token provided" });

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

    if (storedToken !== refreshToken)
      return response.status(401).json({ message: "Invalid refresh token" });

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    response.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    response.json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.log("Error in re_generateAccessToken controller", error.message);
    response
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
}

async function getProfile(request, response) {
  try {
    response.json(request.user);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
}

export { signup, login, logout, re_generateAccessToken, getProfile };
