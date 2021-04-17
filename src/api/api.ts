import express from "express";
import BaseResponse from "../model/responses/base-response.model";
import itemsRoutes from "./items/items";

const api = express();

api.get("/", (_request, response) => {
  response.send(new BaseResponse({}));
});

api.use("/api/items", itemsRoutes);

export default api;
