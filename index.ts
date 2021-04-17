import api from "./src/api/api";

api.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});
