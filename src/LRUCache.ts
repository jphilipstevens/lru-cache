interface LRUCache<K, V> {

    get(key: K): V | undefined;
    put(key: K, value: V): boolean;
    del(key: K): void;
    reset(): void;
}

class LRUCache<K, V> implements LRUCache<K, V> {
    private readonly size: number;

    constructor(size: number) {
        this.size = size;
    }

    get(key: K): V | undefined {
        // this updates the last touch of an entry
        throw new Error("not implemented");
    }

    put(key: K, value: V): boolean {
        // this updates the last touch of an entry
        throw new Error("not implemented");
    }

    del(key: K): void {
        throw new Error("not implemented");
    }

    reset(): void {
        throw new Error("not implemented");
    }
}