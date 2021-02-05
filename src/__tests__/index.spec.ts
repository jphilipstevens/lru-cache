import createLRUCache from "../index";


describe("the exported modules for public consumption", () => {
    it("should export the create function for default", () => {
        const createLRUCacheModule = require("../LRUCache").default;

        expect(createLRUCache).toEqual(createLRUCacheModule);
    });
});