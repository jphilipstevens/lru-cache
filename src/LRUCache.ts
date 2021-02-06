import Exception from "./Exception";


class LRUCache<K extends string | Symbol | number, V> {
  public readonly maxSize: number;
  private readonly cache: Map<K, V>;

  constructor(size: number) {
    this.maxSize = size;
    this.cache = new Map<K, V>();
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key) as V;
    if (this.cache.has(key)) {
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  put(key: K, value: V): void {

    if (this.cache.has(key)) {
      this.cache.delete(key);
      this.cache.set(key, value);
      return;
    }
    if (this.cache.size >= this.maxSize) {
      const keyToDelete = this.cache.keys().next();
      this.cache.delete(keyToDelete.value);
    }
    this.cache.set(key, value);

  }

  del(key: K): void {
    this.cache.delete(key);
  }

  reset(): void {
    this.cache.clear();
  }
}

export default <K extends string | Symbol | number, V>(size: number): LRUCache<K, V> => {
  if (size <= 0) {
    const error = new Exception(
      "INVALID_CACHE_SIZE",
      "Invalid size. The cache needs to be greater than 0 in size"
    );
    throw error;
  }

  return new LRUCache<K, V>(size);
};
