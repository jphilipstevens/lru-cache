import { v4 } from "uuid";
import Exception from "../Exception";
import LRUCache from "../LRUCache";

describe("new LRUCache", () => {
  it("should not allow 0 as a cache size", () => {
    const expectedErrorShape = new Exception(
      "INVALID_CACHE_SIZE",
      "Invalid size. The cache needs to be greater than 0 in size"
    );
    expect(() => new LRUCache(0)).toThrowError(expectedErrorShape);
  });

  it("should not allow negative numbers as a cache size", () => {
    const cacheSize = Math.floor(Math.random() * -100 - 1);
    const expectedErrorShape = new Exception(
      "INVALID_CACHE_SIZE",
      "Invalid size. The cache needs to be greater than 0 in size"
    );
    expect(() => new LRUCache(cacheSize)).toThrowError(expectedErrorShape);
  });

  it("should allow a positive cache size", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = new LRUCache(cacheSize);
    expect(cache.maxSize).toBe(cacheSize);
  });
});

describe("get", () => {
  it("should return undefined for an empty cache", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = new LRUCache<string, string>(cacheSize);
    const result = cache.get(v4());
    expect(result).toBe(undefined);
  });

  it("should return undefined if there is a cache miss", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 2);
    const cache = new LRUCache<string, string>(cacheSize);

    const entry = {
      key: v4(),
      value: v4(),
    };
    cache.put(entry.key, entry.value);

    expect(cache.get(entry.key)).toBe(entry.value);
    expect(cache.get(v4())).toBe(undefined);
  });
});

describe("put", () => {
  it("it should allow adding a value", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = new LRUCache<string, string>(cacheSize);
    const entry = {
      key: v4(),
      value: v4(),
    };
    cache.put(entry.key, entry.value);
    const result = cache.get(entry.key);
    expect(result).toBe(entry.value);
  });

  it("it should replace the value of a current key", () => {
    const cacheSize = Math.floor(2);
    const cache = new LRUCache<string, string>(cacheSize);

    const entry1 = {
      key: v4(),
      value: v4(),
    };

    const entry2 = {
      key: entry1.key,
      value: v4(),
    };

    cache.put(entry1.key, entry1.value);

    cache.put(entry2.key, entry2.value);

    expect(cache.get(entry1.key)).toBe(entry2.value);
  });

  it("it should replace the value of a current key when full", () => {
    const cacheSize = Math.floor(2);
    const cache = new LRUCache<string, string>(cacheSize);

    const entry1 = {
      key: v4(),
      value: v4(),
    };

    const entry2 = {
      key: v4(),
      value: v4(),
    };

    const updatedEntry2 = {
      key: entry2.key,
      value: v4(),
    };

    cache.put(entry1.key, entry1.value);

    cache.put(entry2.key, entry2.value);

    cache.put(updatedEntry2.key, updatedEntry2.value);

    expect(cache.get(entry1.key)).toBe(entry1.value);
    expect(cache.get(entry2.key)).toBe(updatedEntry2.value);
  });
});

describe("delete", () => {
  it("should be a no-op for deleting from an empty cache", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = new LRUCache<string, string>(cacheSize);

    expect(() => cache.del(v4())).not.toThrowError;
  });

  it("should be a no-op for deleting a key that is not in the cache", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = new LRUCache<string, string>(cacheSize);
    cache.put(v4(), v4());
    expect(() => cache.del(v4())).not.toThrowError;
  });

  it("should delete a saved value", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = new LRUCache<string, string>(cacheSize);
    const entry = {
      key: v4(),
      value: v4(),
    };
    cache.put(entry.key, entry.value);
    cache.del(entry.key);
    expect(cache.get(entry.key)).toBeUndefined;
  });
});

describe("reset", () => {
  it("should be a no-op for resetting from an empty cache", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = new LRUCache<string, string>(cacheSize);

    expect(() => cache.reset()).not.toThrowError;
  });

  it("should reset and remove from an empty array", () => {
    const cacheSize = Math.floor(Math.random() * 100 + 1);
    const cache = new LRUCache<string, string>(cacheSize);
    const entry = {
      key: v4(),
      value: v4(),
    };
    cache.put(entry.key, entry.value);
    cache.reset();
    expect(cache.get(entry.key)).toBeUndefined;
  });
});

describe("Least Recently Used caching strategy", () => {
  it("should remove the oldest value", () => {
    const cacheSize = 2;
    const cache = new LRUCache<string, string>(cacheSize);
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

  it("getting a value resets a cached entry to be used recently", () => {
    const cacheSize = 2;
    const cache = new LRUCache<string, string>(cacheSize);
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

describe("Data Type tests for keys to assure the cache key comparisons are correct", () => {
  const keyTests = [
    {
      create: () => v4(),
      dataType: "string",
    },
    {
      create: () => Math.floor(Math.random() * 100000000 + 1),
      dataType: "number",
    },
    {
      create: () => Symbol(),
      dataType: "Symbol",
    },
  ];

  const valueTests = [
    {
      create: () => v4(),
      dataType: "string",
    },
    {
      create: () => Math.floor(Math.random() * 100 + 101),
      dataType: "number",
    },
    {
      create: () => Symbol(),
      dataType: "Symbol",
    },
    {
      create: () => null,
      dataType: "null",
    },
    {
      create: () => undefined,
      dataType: "undefined",
    },
    {
      create: () => ({ [v4()]: v4() }),
      dataType: "object",
    },
  ];

  keyTests.forEach((keyTest) => {
    valueTests.forEach((valueTest) => {
      it(`should accept a cache key of ${keyTest.dataType} data type and value of ${valueTest.dataType} data type `, () => {
        const cacheSize = 2;
        const cache = new LRUCache(cacheSize);
        const entry1 = {
          key: keyTest.create(),
          value: valueTest.create(),
        };

        const entry2 = {
          key: keyTest.create(),
          value: valueTest.create(),
        };

        cache.put(entry1.key, entry1.value);
        cache.put(entry2.key, entry2.value);
        expect(cache.get(entry1.key)).toEqual(entry1.value);
        expect(cache.get(entry2.key)).toEqual(entry2.value);
      });
    });
  });
});
