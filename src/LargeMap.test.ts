import LargeMap from './LargeMap';

describe('LargeMap', () => {
  let map: LargeMap<string, number>;

  beforeEach(() => {
    map = new LargeMap(2);
  });

  describe('set', () => {
    it('should add a new key-value pair to the map', () => {
      map.set('foo', 42);
      expect(map.get('foo')).toBe(42);
      expect(map.size).toBe(1);
    });

    it('should update an existing key-value pair in the map', () => {
      map.set('foo', 42);
      map.set('foo', 24);
      expect(map.get('foo')).toBe(24);
      expect(map.size).toBe(1);
    });

    it('should add new key-value pairs to multiple maps', () => {
      map.set('foo', 1);
      map.set('bar', 2);
      map.set('baz', 3);
      expect(map.get('foo')).toBe(1);
      expect(map.get('bar')).toBe(2);
      expect(map.get('baz')).toBe(3);
      expect(map.size).toBe(3);
      expect(map.count).toBe(2);
    });

    it('should add new key-value pairs to a new map if the current map is full', () => {
      map.set('foo', 1);
      map.set('bar', 2);
      map.set('baz', 3);
      map.set('qux', 4);
      expect(map.get('foo')).toBe(1);
      expect(map.get('bar')).toBe(2);
      expect(map.get('baz')).toBe(3);
      expect(map.get('qux')).toBe(4);
      expect(map.size).toBe(4);
      expect(map.count).toBe(2);
    });
  });

  describe('get', () => {
    it('should return the value for an existing key in the map', () => {
      map.set('foo', 42);
      expect(map.get('foo')).toBe(42);
    });

    it('should return undefined for a non-existing key in the map', () => {
      expect(map.get('foo')).toBeUndefined();
    });
  });

  describe('has', () => {
    it('should return true for an existing key in the map', () => {
      map.set('foo', 42);
      expect(map.has('foo')).toBe(true);
    });

    it('should return false for a non-existing key in the map', () => {
      expect(map.has('foo')).toBe(false);
    });
  });

  describe('delete', () => {
    it('should remove an existing key-value pair from the map', () => {
      map.set('foo', 42);
      expect(map.delete('foo')).toBe(true);
      expect(map.get('foo')).toBeUndefined();
      expect(map.size).toBe(0);
    });

    it('should return false for a non-existing key in the map', () => {
      expect(map.delete('foo')).toBe(false);
    });

    it('should remove the map when all key-value pairs are deleted', () => {
      map.set('foo', 1);
      map.set('bar', 2);
      expect(map.delete('foo')).toBe(true);
      expect(map.delete('bar')).toBe(true);
      expect(map.size).toBe(0);
      expect(map.count).toBe(1);
    });
  });

  describe('size', () => {
    it('should return the number of elements in the map', () => {
      expect(map.size).toEqual(0);

      map.set('a', 1);
      expect(map.size).toEqual(1);

      map.set('b', 2);
      expect(map.size).toEqual(2);
    });
  });

  describe('count', () => {
    it('should return the number of maps in the LargeMap', () => {
      expect(map.count).toEqual(1);

      map.set('a', 1);
      expect(map.count).toEqual(1);

      map.set('b', 2);
      map.set('c', 3);
      expect(map.count).toEqual(2);
    });
  });

  describe('Symbol.toStringTag', () => {
    it('should return "LargeMap"', () => {
      expect(map[Symbol.toStringTag]).toEqual('LargeMap');
    });
  });

  describe('[Symbol.iterator]', () => {
    it('should iterate over all elements in the map', () => {
      map.set('a', 1);
      map.set('b', 2);

      const iterator = map[Symbol.iterator]();

      expect(iterator.next().value).toEqual(['a', 1]);
      expect(iterator.next().value).toEqual(['b', 2]);
      expect(iterator.next().done).toEqual(true);
    });
  });

  describe('values', () => {
    it('should iterate over all values in the map', () => {
      map.set('a', 1);
      map.set('b', 2);

      const iterator = map.values();

      expect(iterator.next().value).toEqual(1);
      expect(iterator.next().value).toEqual(2);
      expect(iterator.next().done).toEqual(true);
    });
  });

  describe('keys', () => {
    it('should iterate over all keys in the map', () => {
      map.set('a', 1);
      map.set('b', 2);

      const iterator = map.keys();

      expect(iterator.next().value).toEqual('a');
      expect(iterator.next().value).toEqual('b');
      expect(iterator.next().done).toEqual(true);
    });
  });

  describe('entries', () => {
    it('should iterate over all entries in the map', () => {
      map.set('a', 1);
      map.set('b', 2);

      const iterator = map.entries();

      expect(iterator.next().value).toEqual(['a', 1]);
      expect(iterator.next().value).toEqual(['b', 2]);
      expect(iterator.next().done).toEqual(true);
    });
  });

  describe('forEach', () => {
    it('should call the callback function for each element in the map', () => {
      map.set('a', 1);
      map.set('b', 2);
      map.set('c', 3);

      const callbackFn = jest.fn();
      map.forEach(callbackFn);

      expect(callbackFn.mock.calls.length).toEqual(3);
      expect(callbackFn.mock.calls[0][0]).toEqual(1);
      expect(callbackFn.mock.calls[0][1]).toEqual('a');
      expect(callbackFn.mock.calls[0][2]).toEqual(map['maps'][0]);
      expect(callbackFn.mock.calls[1][0]).toEqual(2);
      expect(callbackFn.mock.calls[1][1]).toEqual('b');
      expect(callbackFn.mock.calls[1][2]).toEqual(map['maps'][0]);
      expect(callbackFn.mock.calls[2][0]).toEqual(3);
      expect(callbackFn.mock.calls[2][1]).toEqual('c');
      expect(callbackFn.mock.calls[2][2]).toEqual(map['maps'][1]);
    });
  });

  describe('clear', () => {
    it('should remove all elements from the map', () => {
      map.set('a', 1);
      map.set('b', 2);
      expect(map.size).toEqual(2);

      map.clear();

      expect(map.size).toEqual(0);
      expect(map.has('a')).toEqual(false);
      expect(map.has('b')).toEqual(false);
    });
  });
});
