import LRUCache from "../index";

describe("the exported modules for public consumption", () => {
  it("should export the create function for default", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const LRUCacheModule = require("../LRUCache").default;

    expect(LRUCache).toEqual(LRUCacheModule);
  });
});
