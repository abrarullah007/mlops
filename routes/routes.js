module.exports = function (app) {
  const apiController = require("./apiController");
  //method 1
  app.get("/", apiController.index);
  app.get("/index", apiController.index);
  app.get("/predict/:value", apiController.predict);
  // app.get("/train", apiController.trainModel);
  // app.get("/test", apiController.testModel);

  // app.get("/users", apiController.users);
  // app.get("/user", apiController.userObject);

  // //method 2 get welcome
  // app.get("/welcome", apiController.welcomeUser);
  // //method 3
  // //install body parser for using post method
  // app.post("/save", apiController.save);

  /// add more routes
};
