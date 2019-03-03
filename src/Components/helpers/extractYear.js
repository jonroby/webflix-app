const extractYear = dashedDate => {
  if (!dashedDate) return "";
  return dashedDate.split("-")[0];
};

export default extractYear;
