import Item from "./item.model";

export default class DetailedItem extends Item {
  public sold_quantity: number;
  public description: string;
  public category: string;

  constructor(data: any) {
    super(data);
    this.sold_quantity = data.sold_quantity;
    this.description = data.description;
    this.category = data.category;
  }
}
