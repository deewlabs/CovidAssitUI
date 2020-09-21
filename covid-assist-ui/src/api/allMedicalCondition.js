import client from "./client";

const endpoint = "allMedicalCondition";

const getAllMedicalConditions = () => client.get(endpoint);

export default { getAllMedicalConditions };
