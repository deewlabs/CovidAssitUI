import { useState } from "react";

export default function useApi(apiFunc) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    setError(response.status !== 200);
    setData(response.data);
    return response;
  };

  return { data, error, loading, request };
}