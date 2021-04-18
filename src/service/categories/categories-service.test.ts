import axios from "axios";
import { categoryResponseMock } from "../../../test/categories-response.mock";
import categoriesService from "./categories-service";

describe("Categories Service", () => {
  it("Should get a category", () => {
    // Arrange
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve(categoryResponseMock));
    // Act
    const result = categoriesService.getCategory("idTest");

    // Assert
    expect(result).toBeDefined();
  });

  describe("Get Categories from Ids", () => {
    it("Should get a detailed item with deescription", async () => {
      // Arrange
      jest
        .spyOn(categoriesService, "getCategory")
        .mockImplementation(() =>
          Promise.resolve({ data: categoryResponseMock })
        );

      // Act
      const result = await categoriesService.getCategoriesFromIds(["idTest"]);

      expect(result.length).toStrictEqual(1);
    });
    it("Should fail trying to get detailed item", async () => {
      // Arrange
      jest
        .spyOn(categoriesService, "getCategory")
        .mockImplementation(() => Promise.reject({ status: 0 }));

      // Act
      try {
        await categoriesService.getCategoriesFromIds(["idTest"]);
      } catch (error) {
        expect(error.status).toStrictEqual(0);
      }
    });
  });
});
