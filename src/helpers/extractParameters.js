import qs from "query-string";

const extractParameters = (location, term) => {
  const parameters = qs.parse(location.search);
  return parameters && parameters[term];
};

export default extractParameters;
