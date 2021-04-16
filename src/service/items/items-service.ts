import axios from "axios";
import DetailedItem from "../../model/item/detailed-item.model";

const getItems = (query: string): Promise<any> => {
  return axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
};

const getDescription = (id: string): Promise<any> => {
  return axios.get(`https://api.mercadolibre.com/items/${id}/description`);
};

const getItem = (id: string): Promise<any> => {
  return axios.get(`https://api.mercadolibre.com/items/${id}`);
};

const getItemWithDescription = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    Promise.all([getItem(id), getDescription(id)])
      .then(([responseItem, responseDescription]) => {
        const description = responseDescription.data.plain_text;
        resolve(
          new DetailedItem({
            ...responseItem.data,
            description,
          })
        );
      })
      .catch((error) => reject(error));
  });
};

const itemsService = {
  getItems,
  getItemWithDescription,
};

export default itemsService;
