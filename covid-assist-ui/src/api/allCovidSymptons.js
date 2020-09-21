import client from "./client";

const endpoint = "allCovidSymptons";

const getAllCovidSymptoms = () => client.get(endpoint);

export default { getAllCovidSymptoms };
