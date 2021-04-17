import Author from "./author.interface";
export default class BaseResponse {
  public author: Author;
  public error: any;
  constructor({ error }: any) {
    this.author = {
      name: "Diego José",
      lastname: "Zúñiga García",
    };
    this.error = error;
  }
}
