import Item from "../model/item/item.model";

export const mapItems = (items: any): Item[] =>
  items.map((result: any) => new Item(result));
export const mapCategoryIds = (categories: any): string[] =>
  categories.map((result: any) => result.category_id);
export const mapCategoryNames = (categoryIds: string[]): string[] =>
  categoryIds.map((category: any) => category.data.name);
