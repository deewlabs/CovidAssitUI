import client from "./client";

const endpoint = "dashboard";

const getDashboardData = () => client.get(endpoint);

export default { getDashboardData };
