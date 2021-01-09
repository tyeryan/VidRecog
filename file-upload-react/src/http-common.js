import axios from "axios";

export default axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:3000",
=======
  baseURL: "http://localhost:8080",
>>>>>>> main
  headers: {
    "Content-type": "application/json",
  },
});