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
  // let token = Cookies.get("token");
  try {
    const result = await fetch(`${API_URL}/users/updateUserPassword`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${payloadData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadData.payload),
    });
    const jsonResponse = await result.json();
    return jsonResponse;
  } catch (error) {
    console.log("eeeeeeeeeee", error);
  }
};
