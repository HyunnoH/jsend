import { JSendObject } from "./../jsend";

describe("jsend.ts", () => {
  it("have 'success' value on status property", () => {
    const createdObject: JSendObject<{ key: string }> = {
      status: "success",
      data: {
        key: "value",
      },
    };

    expect(createdObject.status).toBe("success");
  });
});
