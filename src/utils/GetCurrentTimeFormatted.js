function getCurrentTimeFormatted(){
  const now = new Date();
  const options = {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(now);
};

export default getCurrentTimeFormatted;
