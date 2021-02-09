import { v4 } from "uuid";
import LRUCache from "../";

describe("Integration tests", () => {
  it("should instantiate and cache many values", () => {
    const cacheSize = 1000;
    const cache = new LRUCache<number, string>(cacheSize);
    const vals: Array<{ key: number; value: string }> = [];
    for (let i = 0; i < 1000000; i++) {
      const entry = {
        key: i,
        value: v4(),
      };
      vals.push(entry);
      cache.put(entry.key, entry.value);
    }

    for (let i = 0; i < 100; i++) {
      const valsIndex = vals.length - i - 1;
      expect(cache.get(vals[valsIndex].key)).toBe(vals[valsIndex].value);
    }
  });
});
