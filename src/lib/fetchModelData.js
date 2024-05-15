/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
function fetchModel(url) {
  // const rootUrl = "http://localhost:8081/api";
  const rootUrl = "https://dxfz3n-8081.csb.app/api";
  const models = fetch(rootUrl + url).then((res) => res.json());
  return models;
}

export default fetchModel;
