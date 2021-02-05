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
    expect(cache.get(initialValue.key)).toBe(initialValue.value);
    expect(cache.get(desiredValueToTest.key)).toBe(desiredValueToTest.value);
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
    cache.put(
      desiredValueToTest.key,
      desiredValueToTest.value
    );
    const result = cache.get(desiredValueToTest.key);
    expect(cache.get(desiredValueToTest.key)).toBe(desiredValueToTest.value);
    expect(result).toBe(desiredValueToTest.value);
  });
});

describe("delete", () => {
  it("should be a no-op for deleting from an empty cache", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = createLRUCache<string, string>(cacheSize);

    expect(() => cache.del(v4())).not.toThrowError;
  });

  it("should be a no-op for deleting a key that is not in the cache", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = createLRUCache<string, string>(cacheSize);
    cache.put(v4(), v4());
    expect(() => cache.del(v4())).not.toThrowError;
  });

  it("should delete a saved value", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = createLRUCache<string, string>(cacheSize);
    const entry = {
      key: v4(),
      value: v4()
    }
    cache.put(entry.key, entry.value);
    cache.del(entry.key);
    expect(cache.get(entry.key)).toBeUndefined;
  });
});


describe("reset", () => {
  it("should be a no-op for resetting from an empty cache", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = createLRUCache<string, string>(cacheSize);

    expect(() => cache.reset()).not.toThrowError;
  });

  it("should reset and remove from an empty array", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = createLRUCache<string, string>(cacheSize);
    const entry = {
      key: v4(),
      value: v4()
    }
    cache.put(entry.key, entry.value);
    cache.reset();
    expect(cache.get(entry.key)).toBeUndefined;
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

describe("data type tests", () => {
  const keyTests = [{
    create: () => v4(),
    dataType: "string"
  },
  {
    create: () => Math.floor(Math.random() * 100 + 1),
    dataType: "number"
  },
  {
    create: () => Symbol(),
    dataType: "Symbol"
  }];

  const valueTests = [{
    create: () => v4(),
    dataType: "string"
  },
  {
    create: () => Math.floor(Math.random() * 100 + 101),
    dataType: "number"
  },
  {
    create: () => Symbol(),
    dataType: "Symbol"
  }];


  keyTests.forEach(keyTest => {
    valueTests.forEach(valueTest => {
      it(`should accept a cache key of ${keyTest.dataType} data type and value of ${valueTest.dataType} data type `, () => {
        const cacheSize = 2;
        const cache = createLRUCache(cacheSize);
        const entry = {
          key: keyTest.create(),
          value: valueTest.create()
        };
        cache.put(entry.key, entry.value);
        cache.put(keyTest.create(), valueTest.create());
        expect(cache.get(entry.key)).toBe(entry.value);
      });
    });
  });
});
