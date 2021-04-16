import DetailedItem from "../item/detailed-item.model";
import BaseResponse from "./base-response.model";

export default class DetailedItemResponse extends BaseResponse {
  public categories: string[];
  public item: DetailedItem;

  constructor({ categories, item, error }: any) {
    super({ error });
    this.categories = categories;
    this.item = item;
  }
}
