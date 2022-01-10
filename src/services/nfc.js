import { getToken } from "./auth";
import address from "./address";
import axios from "axios";

export function getNfcList() {
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";
  return axios.get(address + "/api/nfcCard/getAllNfcCards", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export default function getNfcData() {
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";
  return axios.get(address + "/api/nfcCard/getAllNfcCards", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function getNfcSingleData(id) {
  console.log(id);
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.get(address + "/api/nfcCard/getNfcCardById/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function updateNfc(formData) {
  console.log(formData);
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.post(address + "/api/nfcCard/upsertNfcCard", formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function addNfc(formData) {
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.post(address + "/api/nfcCard/upsertNfcCard", formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function deleteNfc(id) {
  alert(id);
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.delete(address + "/api/nfcCard/deleteNfcCard/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
