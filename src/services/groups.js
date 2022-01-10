import { getToken } from "./auth";
import address from "./address";
import axios from "axios";

export default function getGroupsData() {
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";
  return axios.get(address + "/api/group/getAllGroups", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function getGroupsSingleData(id) {
  console.log(id);
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.get(address + "/api/group/getGroupById/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function updateGroups(formData) {
  console.log(formData);
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.post(address + "/api/group/upsertGroup", formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function addGroupsData(formData) {
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.post(address + "/api/group/createGroup", formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function deleteGroups(id) {
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.delete(address + "/api/group/deleteGroup/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
