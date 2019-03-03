const formFilmDuration = minutes => {
  if (!minutes) {
    return "";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0 && minutes === 0) {
    return "1m";
  } else if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  return `${hours}h ${remainingMinutes}m`;
};

export default formFilmDuration;
