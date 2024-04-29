const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Surveys API",
      version: "1.0.0",
      description: "A simple API to manage surveys.",
      contact: {
        name: "Noé Alejandro Rodríguez Moto",
        email: "alxg5516@gmail.com",
      },
    },
  },
  apis: ["./src/routes/userRoutes.js"],
};

export default options;
