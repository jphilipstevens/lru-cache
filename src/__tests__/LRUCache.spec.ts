import { v4 } from "uuid";
import Exception from "../Exception";
import createLRUCache from "../LRUCache";

describe("createLRUCache", () => {
  it("should not allow 0 as a cache size", () => {
    const expectedErrorShape = new Exception(
      "INVALID_CACHE_SIZE",
      "Invalid size. The cache needs to be greater than 0 in size"
    );
    expect(() => createLRUCache(0)).toThrowError(expectedErrorShape);
  });

  it("should not allow negative numbers as a cache size", () => {
    const cacheSize = Math.floor(Math.random() * -100 - 1);
    const expectedErrorShape = new Exception(
      "INVALID_CACHE_SIZE",
      "Invalid size. The cache needs to be greater than 0 in size"
    );
    expect(() => createLRUCache(cacheSize)).toThrowError(expectedErrorShape);
  });

  it("should allow a positive cache size", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = createLRUCache(cacheSize);
    expect(cache.maxSize).toBe(cacheSize);
  });
});

describe("get", () => {
  it("should return undefined for an empty cache", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = createLRUCache<string, string>(cacheSize);
    const result = cache.get(v4());
    expect(result).toBe(undefined);
  });

  it("should return undefined if the cache key is empty", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 2);
    const cache = createLRUCache<string, string>(cacheSize);
    const initialValue = {
      key: v4(),
      value: v4(),
    };
    cache.put(initialValue.key, initialValue.value);
    const desiredValueToTest = {
      key: v4(),
      value: v4(),
    };
    cache.put(
      desiredValueToTest.key,
      desiredValueToTest.value
    );
    const result = cache.get(desiredValueToTest.key);
    expect(isInitialValueSaved).toBe(true);
    expect(isDesiredValueSaved).toBe(true);
    expect(result).toBe(desiredValueToTest.value);
  });
});

describe("put", () => {
  it("it should allow adding a value to an empty cache", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = createLRUCache<string, string>(cacheSize);
    const desiredValueToTest = {
      key: v4(),
      value: v4(),
    };
    const isDesiredValueSaved = cache.put(
      desiredValueToTest.key,
      desiredValueToTest.value
    );
    const result = cache.get(desiredValueToTest.key);
    expect(isDesiredValueSaved).toBe(true);
    expect(result).toBe(desiredValueToTest.value);
  });
});

describe("Least Recently Used caching strategy", () => {
  it("should remove the oldest value", () => {
    const cacheSize = 2;
    const cache = createLRUCache<string, string>(cacheSize);
    const entriesToAdd = [
      {
        key: v4(),
        value: v4(),
      },
      {
        key: v4(),
        value: v4(),
      },
      {
        key: v4(),
        value: v4(),
      },
    ];

    entriesToAdd.forEach((entry) => {
      cache.put(entry.key, entry.value);
    });

    expect(cache.get(entriesToAdd[0].key)).toBeUndefined;
    expect(cache.get(entriesToAdd[1].key)).toBe(entriesToAdd[1].value);
    expect(cache.get(entriesToAdd[2].key)).toBe(entriesToAdd[2].value);
  });

  it("should remove the oldest value accessed", () => {
    const cacheSize = 2;
    const cache = createLRUCache<string, string>(cacheSize);
    const entriesToAdd = [
      {
        key: v4(),
        value: v4(),
      },
      {
        key: v4(),
        value: v4(),
      },
      {
        key: v4(),
        value: v4(),
      },
    ];

    cache.put(entriesToAdd[0].key, entriesToAdd[0].value);
    cache.put(entriesToAdd[1].key, entriesToAdd[1].value);
    cache.get(entriesToAdd[0].key);
    cache.put(entriesToAdd[2].key, entriesToAdd[2].value);

    expect(cache.get(entriesToAdd[0].key)).toBe(entriesToAdd[0].value);
    expect(cache.get(entriesToAdd[1].key)).toBeUndefined;
    expect(cache.get(entriesToAdd[2].key)).toBe(entriesToAdd[2].value);
  });
});
