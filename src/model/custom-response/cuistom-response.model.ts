import Product from "../product/product.model";
import Author from "./author.interface";

export default class CustomResponse {
  public author: Author;
  public item: Product;
  public items: Product[];
  public error: any;

  constructor({ item, items, error }: any) {
    this.author = {
      name: "Diego José",
      lastname: "Zúñiga García",
    };
    this.item = item;
    this.items = items;
    this.error = error;
  }
}
