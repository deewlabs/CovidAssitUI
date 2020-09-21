import client from "./client";

const endpoint = "saveHospital";

const saveHospital = (payload) => client.post(`${endpoint}${payload}`);

export default { saveHospital };
