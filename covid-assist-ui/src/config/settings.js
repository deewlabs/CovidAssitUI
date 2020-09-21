const settings = {
  dev: {
    apiUrl: "http://localhost:8080/api/ca/",
  },
};

const getCurrentSettings = () => {
  if (process.env.NODE_ENV === "development") return settings.dev;
};

export default getCurrentSettings();
