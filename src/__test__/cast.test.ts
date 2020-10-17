import { success, fail } from "./../cast";

describe("cast.ts", () => {
  describe("success()", () => {
    it("creates success object", () => {
      const createdObject = success({ foo: "bar" });

      expect(createdObject).toEqual({
        status: "success",
        data: { foo: "bar" },
      });
    });
  });

  describe("fail()", () => {
    it("creates fail object", () => {
      const createdObject = fail({ name: "A name is not included" });

      expect(createdObject).toStrictEqual({
        status: "fail",
        data: { name: "A name is not included" },
      });
    });
  });
});
