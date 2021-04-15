import Price from "./price.interface";

export default class Item {
  public id: string;
  public title: string;
  public price: Price;
  public picture: string;
  public condition: string;
  public free_shipping: boolean;
  public sold_quantity: number;
  public description: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.price = {
      currency: data.currency_id,
      amount: data.price,
      decimals: 0,
    };
    this.picture = data.thumbnail;
    this.condition = data.condition;
    this.free_shipping = data.shipping.free_shipping;
    this.sold_quantity = data.sold_quantity;
    this.description = data.shipping.free_shipping;
  }
}