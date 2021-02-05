import Exception from "./Exception";

export interface LRUCache<K, V> {
  get(key: K): V | undefined;
  put(key: K, value: V): void;
  del(key: K): void;
  reset(): void;
}

class LRUCache implements LRUCache<K, V> {
  public readonly maxSize: number;
  private readonly cache: Map<K, V>;

  constructor(size: number) {
    this.maxSize = size;
    this.cache = new Map<K, V>();
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (this.cache.has(key)) {
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  put(key: K, value: V): void {
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

export default <K, V>(size: number): LRUCache<K, V> => {
  if (size <= 0) {
    const error = new Exception(
      "INVALID_CACHE_SIZE",
      "Invalid size. The cache needs to be greater than 0 in size"
    );
    throw error;
  }

  return new LRUCache<K, V>(size);
};
