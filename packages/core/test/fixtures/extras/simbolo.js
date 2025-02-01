const foo = Symbol("foo")

foo.valueOf() === "foo"
foo.toString() === "foo"

class Validador {
  get [Symbol.toStringTag]() {
    return 'Validador';
  }
}

Symbol.iterator.description;

Symbol.asyncIterator;
Symbol.hasInstance;
Symbol.isConcatSpreadable;
Symbol.iterator;
Symbol.match;
Symbol.matchAll;
Symbol.replace;
Symbol.search;
Symbol.species;
Symbol.split;
Symbol.toPrimitive;
Symbol.toStringTag;
Symbol.unscopables;

let sym = Symbol.for("foo");
Symbol.keyFor(sym) === "foo";
