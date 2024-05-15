import { BaseUrl } from "../utils/socketComment";
import { getAuthToken } from "../common/functions";

/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */

function fetchModel(url, method, body) {
  const token = getAuthToken();
  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token && token}`,
    },
    method,
    body,
  };
  const models = fetch(BaseUrl + url, request).then((res) => res.json());

  return models;
}

export default fetchModel;
