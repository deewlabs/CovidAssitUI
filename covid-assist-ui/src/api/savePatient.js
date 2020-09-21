import client from "./client";

const endpoint = "savePatient";

const savePatient = (payload) => client.post(`${endpoint}${payload}`);

export default { savePatient };
