import { getAuthToken } from "../common/functions";
import { BaseUrl } from "../utils/socketComment";

/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchFile(url, method, body) {

  const token = getAuthToken();
  const request = {
    headers: {
      Authorization: `Bearer ${token && token}`,
    },
    method,
    body,
  };
  const models = fetch(BaseUrl + url, request).then((res) => res.json());

  return models;
}

export default fetchFile;
