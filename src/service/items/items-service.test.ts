import axios from "axios";
import { descriptionResponseMock } from "../../../test/description-response.mock";
import { detailedItemResponseMock } from "../../../test/detailed-item-response.mock";
import { itemsResponseMock } from "../../../test/items-response.mock";
import { categoryResponseMock } from "../../../test/categories-response.mock";
import categoriesService from "../categories/categories-service";
import itemsService from "./items-service";

describe("Items Service", () => {
  it("Should get items", () => {
    // Arrange
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve(itemsResponseMock));
    // Act
    const result = itemsService.getItems("idTest");

    // Assert
    expect(result).toBeDefined();
  });

  it("Should get a description from an item", () => {
    // Arrange
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve(descriptionResponseMock));
    // Act
    const result = itemsService.getDescription("idTest");

    // Assert
    expect(result).toBeDefined();
  });

  it("Should get an item", () => {
    // Arrange
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve(detailedItemResponseMock));
    // Act
    const result = itemsService.getItem("idTest");

    // Assert
    expect(result).toBeDefined();
  });

  describe("Get Item With description", () => {
    it("Should get a detailed item with deescription", async () => {
      // Arrange
      jest
        .spyOn(itemsService, "getItem")
        .mockImplementation(() =>
          Promise.resolve({ data: detailedItemResponseMock })
        );
      jest
        .spyOn(itemsService, "getDescription")
        .mockImplementation(() =>
          Promise.resolve({ data: descriptionResponseMock })
        );

      jest
        .spyOn(categoriesService, "getCategory")
        .mockImplementation(() =>
          Promise.resolve({ data: categoryResponseMock })
        );

      // Act
      const result = await itemsService.getItemWithDescription("idTest");

      expect(result.id).toStrictEqual(detailedItemResponseMock.id);
    });
    it("Should fail trying to get detailed item", async () => {
      // Arrange
      jest
        .spyOn(itemsService, "getItem")
        .mockImplementation(() => Promise.reject({ status: 0 }));
      jest
        .spyOn(itemsService, "getDescription")
        .mockImplementation(() => Promise.reject({ status: 0 }));

      jest
        .spyOn(categoriesService, "getCategory")
        .mockImplementation(() => Promise.reject({ status: 0 }));

      // Act
      try {
        await itemsService.getItemWithDescription("idTest");
      } catch (error) {
        expect(error.status).toStrictEqual(0);
      }
    });
    it("Should fail trying to get the category of item", async () => {
      // Arrange
      jest
        .spyOn(itemsService, "getItem")
        .mockImplementation(() =>
          Promise.resolve({ data: detailedItemResponseMock })
        );
      jest
        .spyOn(itemsService, "getDescription")
        .mockImplementation(() =>
          Promise.resolve({ data: descriptionResponseMock })
        );

      jest
        .spyOn(categoriesService, "getCategory")
        .mockImplementation(() => Promise.reject({ status: 404 }));

      // Act
      try {
        await itemsService.getItemWithDescription("idTest");
      } catch (error) {
        expect(error.status).toStrictEqual(404);
      }
    });
  });
});
