import { API_URL } from "../config/config";

export const loginService = async (payloadData) => {
  //   await fetch(`${API_URL}/auth/loginUser`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payloadData),
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then(async (responseJson) => {
  //       //   console.log(responseJson);
  //       return responseJson;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
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
