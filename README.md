# LargeMap

`LargeMap` is a wrapper for the built-in `Map` data structure that enables storage and handling of a large number of elements without worrying about the maximum limit of 16.777.216 (2^24) entries in a `Map`. However, `LargeMap` is optimized to handle a much larger number of elements than the built-in `Map` while maintaining high performance. It has zero external dependencies and written in TypeScript.

```js
import LargeMap from 'large-map';

// using LargeMap
const largeMap = new LargeMap();
for (let i = 0; i <= 16777216; i++) {
  largeMap.set(i, 1); // No errors will be thrown
}

// using built-in Map
const map = new Map();
for (let i = 0; i <= 16777216; i++) {
  map.set(i, 1); // Throws a 'RangeError: Value undefined out of range for undefined options property undefined'
}
```

## Install

```bash
# using npm
npm install large-map
# using yarn
yarn add large-map
```

## Usage

`LargeMap` has the identical interface as built-in `Map`, which means that it can be used in the same way as `Map`.

```js
import LargeMap from 'large-map';

const map = new LargeMap();

map.set('foo', 'hello');
map.set('bar', 'world');

console.log(map.has('foo')); // true
console.log(map.has('baz')); // false
console.log(map.size); // 2
console.log(map.get('bar')); // 'world'
```

## Limitations

The `LargeMap` class is designed for use cases where the size of the map may exceed the maximum limit of a built-in `Map`. However, it is not a drop-in replacement for `Map`, and may not be suitable for all use cases. Additionally, the partitioning of the map into smaller maps can incur a performance penalty, particularly for operations that involve searching for elements or iterating over the map. It is recommended to use `LargeMap` only when dealing with very large maps, and to test its performance against built-in `Map` for your specific use case.

## Related

- [large-set](https://github.com/aldipermanaetikaputra/large-set) - A wrapper to deal with a large number of elements in Set.

## Testing

This library is well tested. You can test the code as follows:

```bash
# using npm
npm test
# using yarn
yarn test
```

## Contribute

If you have anything to contribute, or functionality that you lack - you are more than welcome to participate in this!

## License

Feel free to use this library under the conditions of the MIT license.
