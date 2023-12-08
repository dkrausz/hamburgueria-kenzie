import axios from "axios";

const productsAPI = axios.create({
  baseURL: "https://hamburgueria-kenzie-json-serve.herokuapp.com",
  timeout: 5 * 1000,
});

export { productsAPI };
