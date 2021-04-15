import axios from "axios";

const getItems = (query: string): Promise<any> => {
  return axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
};

const getItem = (id: string): Promise<any> => {
  return axios.get(`https://api.mercadolibre.com/items/${id}`);
};

const itemsService = {
  getItems,
  getItem,
};

export default itemsService;
