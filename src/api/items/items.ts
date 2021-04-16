import express from "express";
import itemsService from "../../service/items/items-service";
import categoriesService from "../../service/categories/categories-service";
import ItemsResponse from "../../model/responses/items-response.model";
import DetailedItemResponse from "../../model/responses/detailed-item-response.model";
import { mapItems, mapCategoryIds } from "../../util/util";

const router = express.Router();

router.get("/", async (request, response) => {
  const query = (request.query.q as string) ?? "";
  try {
    const itemsResponse = await itemsService.getItems(query);
    const items = mapItems(itemsResponse.data.results);
    const categoryIds = mapCategoryIds(itemsResponse.data.results);
    const categories = await categoriesService.getCategoriesFromIds(categoryIds);
    response.send(new ItemsResponse({ categories, items }));
  } catch (error) {
    response.send(new ItemsResponse({ error }));
  }
});

router.get("/:id", async (request, response) => {
  const id = (request.params.id as string) ?? "";
  try {
    const item = await itemsService.getItemWithDescription(id);
    response.send(new DetailedItemResponse({ item }));
  } catch (error) {
    response.send(new DetailedItemResponse({ error }));
  }
});

export default router;
