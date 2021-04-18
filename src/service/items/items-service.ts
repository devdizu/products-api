import axios from "axios";
import DetailedItem from "../../model/item/detailed-item.model";
import { API_URL } from "../../util/constants";
import categoriesService from "../categories/categories-service";

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
        categoriesService
          .getCategory(responseItem.data.category_id)
          .then((responseCategory) => {
            const category = responseCategory.data.name;
            resolve(
              new DetailedItem({
                ...responseItem.data,
                description,
                category,
              })
            );
          })
          .catch((error) => reject(error));
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
