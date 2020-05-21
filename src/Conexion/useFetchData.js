
import { useState, useCallback } from "react";

const baseURL = "http://3.95.30.72:5000";

export async function POST(props) {
  try {
    let response = await fetch(props.endpoint, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.request),
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log("dead:", error.message);
    return null;
  }
}

const useFetchData = ({ url, payload }) => {
  const [res, setRes] = useState({ data: null, error: null, isLoading: false });
  // You POST method here
  const callAPI = useCallback(() => {
    setRes((prevState) => ({ ...prevState, isLoading: true }));
    url = baseURL + url;
    POST({ request: payload, endpoint: url });
  }, [url, payload]);
  return [res, callAPI];
};

export default useFetchData;
