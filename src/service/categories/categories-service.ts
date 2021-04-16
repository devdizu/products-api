import axios from "axios";
import { mapCategoryNames } from "../../util/util";

const getCategory = (categoryId: string): Promise<any> => {
  return axios.get(`https://api.mercadolibre.com/categories/${categoryId}`);
};

const getCategoriesFromIds = (categoryIds: string[]): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    Promise.all(categoryIds.map((categoryId) => getCategory(categoryId)))
      .then((response: any) => {
        const categoryNames = mapCategoryNames(response);
        resolve(Array.from(new Set<string>(categoryNames)));
      })
      .catch((error) => reject(error));
  });
};

const categoriesService = {
  getCategory,
  getCategoriesFromIds,
};

export default categoriesService;
