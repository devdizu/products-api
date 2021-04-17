import api from "../api";
import request from "supertest";
import itemsService from "../../service/items/items-service";
import categoriesService from "../../service/categories/categories-service";
import {
  emptyItemsResponseMock,
  itemsResponseMock,
} from "../../../test/items-response.mock";
import { categoriesResponseMock } from "../../../test/categories-response.mock";
import { detailedItemResponseMock } from "../../../test/detailed-item-response.mock";

describe("GET Items", () => {
  it("Should get an empty reponse items", async () => {
    // Arrange
    jest
      .spyOn(itemsService, "getItems")
      .mockImplementation(() =>
        Promise.resolve({ data: emptyItemsResponseMock })
      );
    jest
      .spyOn(categoriesService, "getCategoriesFromIds")
      .mockImplementation(() => Promise.resolve([]));

    // Act
    const { body } = await request(api)
      .get("/api/items")
      .set("Accept", "application/json");

    // Assert
    expect(body.categories.length).toStrictEqual(0);
    expect(body.items.length).toStrictEqual(0);
  });

  it("Should get items", async () => {
    // Arrange
    jest
      .spyOn(itemsService, "getItems")
      .mockImplementation(() => Promise.resolve({ data: itemsResponseMock }));
    jest
      .spyOn(categoriesService, "getCategoriesFromIds")
      .mockImplementation(() => Promise.resolve(categoriesResponseMock));

    // Act
    const { body } = await request(api)
      .get("/api/items")
      .query({ q: "Unit test" })
      .set("Accept", "application/json");

    // Assert
    expect(body.categories.length).toStrictEqual(3);
    expect(body.items.length).toStrictEqual(3);
  });
  it("Should fail getting items", async () => {
    // Arrange
    jest
      .spyOn(itemsService, "getItems")
      .mockImplementation(() => Promise.reject({ status: 0 }));
    jest
      .spyOn(categoriesService, "getCategoriesFromIds")
      .mockImplementation(() => Promise.reject({ status: 0 }));

    // Act
    const { body } = await request(api)
      .get("/api/items")
      .query({ q: "Unit test" })
      .set("Accept", "application/json");

    // Assert
    expect(body.error.status).toStrictEqual(0);
  });
});

describe("GET Single Item", () => {
  it("Should get a single item", async () => {
    // Arrange
    jest
      .spyOn(itemsService, "getItemWithDescription")
      .mockImplementation(() => Promise.resolve(detailedItemResponseMock));

    // Act
    const { body } = await request(api)
      .get("/api/items/123456")
      .query({ q: "Unit test" })
      .set("Accept", "application/json");

    // Assert
    expect(body.item).toBeDefined();
  });
  it("Should fail getting an item", async () => {
    // Arrange
    jest
      .spyOn(itemsService, "getItemWithDescription")
      .mockImplementation(() => Promise.reject({ status: 0 }));

    // Act
    const { body } = await request(api)
      .get("/api/items/123456")
      .query({ q: "Unit test" })
      .set("Accept", "application/json");

    // Assert
    expect(body.error.status).toStrictEqual(0);
  });
});
