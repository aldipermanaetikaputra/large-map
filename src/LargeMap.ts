class LargeMap<K, V> implements Map<K, V> {
  private maps: Map<K, V>[];

  public [Symbol.toStringTag] = 'LargeMap';

  public get size() {
    return this.maps.reduce((p, c) => p + c.size, 0);
  }

  public get count() {
    return this.maps.length;
  }

  /**
   * Creates a new LargeMap instance.
   *
   * @param limit Optional parameter to map the maximum number of elements that can be added to a single map in the LargeMap.
   *              If no limit is provided, a default limit of 16777216 is used, which is the maximum number of elements that can be added to a built-in Map.
   */
  constructor(private readonly limit: number = 16777216) {
    this.maps = [new Map()];
  }

  public has(key: K): boolean {
    return this.maps.some(map => map.has(key));
  }

  public set(key: K, value: V): this {
    if (this.maps[this.maps.length - 1].size >= this.limit) {
      this.maps.push(new Map());
    }

    let map = this.maps[this.maps.length - 1];

    for (let i = 0; i < this.maps.length - 1; i++) {
      if (this.maps[i].has(key)) {
        map = this.maps[i];
        break;
      }
    }

    map.set(key, value);
    return this;
  }

  public get(key: K): V | undefined {
    return this.maps.find(map => map.has(key))?.get(key);
  }

  public delete(key: K): boolean {
    for (let i = this.maps.length - 1; i >= 0; i--) {
      const map = this.maps[i];
      if (map.delete(key)) {
        if (map.size === 0 && i !== this.maps.length - 1) {
          this.maps.splice(i, 1);
        }
        return true;
      }
    }
    return false;
  }

  public *[Symbol.iterator](): IterableIterator<[K, V]> {
    for (const map of this.maps) {
      yield* map;
    }
  }

  public *values(): IterableIterator<V> {
    for (const map of this.maps) {
      yield* map.values();
    }
  }

  public *keys(): IterableIterator<K> {
    for (const map of this.maps) {
      yield* map.keys();
    }
  }

  public *entries(): IterableIterator<[K, V]> {
    for (const map of this.maps) {
      yield* map.entries();
    }
  }

  public forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    for (const map of this.maps) {
      map.forEach(callbackfn);
    }
  }

  public clear(): void {
    const map = this.maps[this.maps.length - 1];
    this.maps = [map];
    map.clear();
  }
}

export default LargeMap;
