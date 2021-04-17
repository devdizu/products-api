import axios from "axios";
import DetailedItem from "../../model/item/detailed-item.model";
import { API_URL } from "../../util/constants";

const getItems = (query: string): Promise<any> => {
  return axios.get(`${API_URL}/sites/MLA/search?q=${query}`);
};

const getDescription = (id: string): Promise<any> => {
  return axios.get(`${API_URL}/items/${id}/description`);
};

const getItem = (id: string): Promise<any> => {
  return axios.get(`${API_URL}/items/${id}`);
};

const getItemWithDescription = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    Promise.all([itemsService.getItem(id), itemsService.getDescription(id)])
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

const itemsService: any = {
  getItem, // For mock purposes
  getDescription, // For mock purposes
  getItems,
  getItemWithDescription,
};

export default itemsService;
