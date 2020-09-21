import axios from "axios";
import settings from "../config/settings";

export default axios.create({
  baseURL: settings.apiUrl,
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //   },
});
