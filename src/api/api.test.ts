import api from "./api";
import request from "supertest";

describe("API root", () => {
  it("Init Api", async () => {
    // Arrange & Act
    const { body } = await request(api).get("/");

    // Assert
    expect(body.author.name).toStrictEqual("Diego José");
  });
});
