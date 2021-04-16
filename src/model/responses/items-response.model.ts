import Item from "../item/item.model";
import BaseResponse from "./base-response.model";

export default class ItemsResponse extends BaseResponse {
  public categories: string[];
  public items: Item[];

  constructor({ categories, items, error }: any) {
    super({ error });
    this.categories = categories;
    this.items = items;
  }
}
