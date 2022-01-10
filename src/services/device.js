import { getToken } from "./auth";
import address from "./address";
import axios from "axios";

export default function getDeviceData() {
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";
  return axios.get(address + "/api/device/getAllDevices", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function getDeviceSingleData(id) {
  console.log(id);
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.get(address + "/api/device/getDeviceById/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function updateDevice(formData) {
  console.log(formData);
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.post(address + "/api/device/upsertDevice", formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function addDeviceData(formData) {
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.post(address + "/api/device/upsertDevice", formData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function deleteDevice(id) {
  alert(id);
  const token = getToken();
  if (!token) return "Authentication Fail Sign In agian";

  return axios.delete(address + "/api/device/deleteDevice/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}
