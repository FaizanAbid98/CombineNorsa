import { getToken } from "./auth";
import address from "./address";
import axios from "axios";

export default function addRegisterr(registerData) {
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.post(address + "/api/auth/signup", registerData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function getUserData() {
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";
  return axios.get(address + "/api/user/getAllUsers", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function getUserSingleData(id) {
  console.log(id);
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.get(address + "/api/user/getAllUsers/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function getUserByEmail(email) {
  console.log(email);
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.get(address + "/api/user/getUserByEmail/" + email, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function updateUser(formData) {
  console.log(formData);
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.post(address + "/api/user/update/:id", formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function setUserRole(id, isAdmin) {
  console.log(id);
  const token = getToken();
  if (!token) return "Authentication Fail Sign In again";

  return axios.post(address + "/api/user/setUserRole/" + id, isAdmin, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}



export function deleteUser(id) {
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.delete(address + "/api/user/delete/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
