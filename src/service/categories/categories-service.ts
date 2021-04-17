import axios from "axios";
import { API_URL } from "../../util/constants";
import { mapCategoryNames } from "../../util/util";

const getCategory = (categoryId: string): Promise<any> => {
  return axios.get(`${API_URL}/categories/${categoryId}`);
};

const getCategoriesFromIds = (categoryIds: string[]): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    Promise.all(
      categoryIds.map((categoryId) => categoriesService.getCategory(categoryId))
    )
      .then((response: any) => {
        const categoryNames = mapCategoryNames(response);
        resolve(categoryNames);
      })
      .catch((error) => reject(error));
  });
};

const categoriesService = {
  getCategory,
  getCategoriesFromIds,
};

export default categoriesService;
