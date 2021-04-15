import express from "express";
import CustomResponse from "../../model/custom-response/cuistom-response.model";
import DetailedItem from "../../model/item/detailed-item.model";
import Item from "../../model/item/item.model";
import itemsService from "../../service/items/items-service";

const router = express.Router();

router.get("/", async (request, response) => {
  const query = (request.query.q as string) ?? "";

  try {
    const itemsResponse = await itemsService.getItems(query);
    const items = itemsResponse.data.results.map(
      (result: object) => new Item(result)
    );
    response.send(new CustomResponse({ items }));
  } catch (error) {
    response.send(new CustomResponse({ error }));
  }
});
router.get("/:id", async (request, response) => {
  const id = (request.params.id as string) ?? "";
  try {
    const itemsResponse = await itemsService.getItem(id);
    const item = new DetailedItem(itemsResponse.data);
    response.send(new CustomResponse({ item }));
  } catch (error) {
    response.send(new CustomResponse({ error }));
  }
});

export default router;
