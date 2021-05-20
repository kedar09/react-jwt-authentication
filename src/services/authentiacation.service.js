import Cookies from "js-cookie";
import { API_URL } from "../config/config";

export const loginService = async (payloadData) => {
  try {
    const result = await fetch(`${API_URL}/auth/loginUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadData),
    });
    const jsonResponse = await result.json();
    return jsonResponse;
  } catch (error) {
    console.log("eeeeeeeeeee", error);
  }
};

export const registerUserService = async (payloadData) => {
  try {
    const result = await fetch(`${API_URL}/auth/registerUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadData),
    });
    const jsonResponse = await result.json();
    return jsonResponse;
  } catch (error) {
    console.log("eeeeeeeeeee", error);
  }
};

export const forgotPasswordService = async (payloadData) => {
  try {
    const result = await fetch(`${API_URL}/auth/resetPasswordLink`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadData),
    });
    const jsonResponse = await result.json();
    return jsonResponse;
  } catch (error) {
    console.log("eeeeeeeeeee", error);
  }
};

export const setNewPasswordService = async (payloadData) => {
  let token = Cookies.get("token");
  try {
    const result = await fetch(`${API_URL}/auth/updateUserPassword`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadData),
    });
    const jsonResponse = await result.json();
    return jsonResponse;
  } catch (error) {
    console.log("eeeeeeeeeee", error);
  }
};
