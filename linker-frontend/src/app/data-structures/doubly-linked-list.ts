export class DoublyLinkedListNode<T> {
  private _prev: DoublyLinkedListNode<T> = null;
  private _next: DoublyLinkedListNode<T> = null;
  private _value: T;
  constructor(value: T) {
    this._value = value;
  }
  get value() {
    return this._value;
  }
  set prev(prev: DoublyLinkedListNode<T>) {
    this._prev = prev;
  }
  get prev() {
    return this._prev;
  }
  set next(next: DoublyLinkedListNode<T>) {
    this._next = next;
  }
  get next() {
    return this._next;
  }

  hasPrev() {
    return !!this._prev;
  }
  hasNext() {
    return !!this._next;
  }
}

export class DoublyLinkedList<T> implements Iterable<T> {

  public head: DoublyLinkedListNode<T>;
  public tail: DoublyLinkedListNode<T>;
  private allValues: Set<T>;

  constructor(values: T[]) {
    this.allValues = new Set();
    this.pushValues(values);
  }

  public [Symbol.iterator](): Iterator<T> {
    let node = this.head;
    const touched: Set<DoublyLinkedListNode<T>> = new Set();
    return {
      next: () => {
        if (node) {
          const cur = (node.value as any).title
          const before = !!node.prev && (node.prev.value as any).title
          const after = !!node.next && (node.next.value as any).title
          console.log(node)
          console.log(before, cur, after)
          const result = { value: node.value, done: false };
          if (touched.has(node)) {
            throw new Error("The linked list has a loop!"); //, node};
          } else {
            touched.add(node);
          }
          node = node.next;
          return result;
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }

  get length() {
    return this.allValues.size
  }

  isEmpty() {
    return this.length === 0;
  }

  public toArray(): T[] {
    return [...this];
  }

  public map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): DoublyLinkedList<U> {
    console.log("MAPPING")
    return new DoublyLinkedList(this.toArray().map(callbackfn, thisArg));
  }

  public filter(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): DoublyLinkedList<T> {
    return new DoublyLinkedList(this.toArray().filter(callbackfn, thisArg));
  }

  public reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U {
    console.log("REDUCING")
   return this.toArray().reduce(callbackfn, initialValue);
  }


  pushValues(values: T[]): void {
    values.forEach(this.push.bind(this));
  }

  push(value: T): void {
    if (this.allValues.has(value)) {
      throw new Error(value + " is in this list");
    }
    const node = new DoublyLinkedListNode(value);
    if (this.isEmpty()) {
      this.head = this.tail = node;
    }
    else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.allValues.add(value);
  }

  pushAfter(oldValue: T, newValue: T): void {
    const oldNode = this.getNodeByValue(oldValue);
    const newNode = new DoublyLinkedListNode(newValue);
    this.pushNodeAfter(oldNode, newNode);
  }

  pushNodeAfter(oldNode: DoublyLinkedListNode<T>, newNode: DoublyLinkedListNode<T>): void {
    if (oldNode === null || !this.allValues.has(oldNode.value)) {
      throw new Error("Node to push before is not in this list");
    }
    if (!!newNode && this.allValues.has(newNode.value)) {
      throw new Error(newNode.value + " is in this list");
    }
    if (oldNode) {
      if (oldNode.hasNext()) {
        oldNode.next.prev = newNode;
        newNode.next = oldNode.next;
      }
      oldNode.next = newNode;
      newNode.prev = oldNode;
      this.allValues.add(newNode.value);
    }
  }

  pushNodeToIdx(node: DoublyLinkedListNode<T>, toIdx: number): void {
    if (toIdx < 0 || toIdx > this.length) return;
    if (toIdx === 0) {
      this.allValues.add(node.value);
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
      return;
    }
    const beforeNode = this.getNodeByIndex(toIdx-1);
    this.pushNodeAfter(beforeNode, node);
  }

  findIndex(value: T): number {
    let node = this.head;
    let idx = 0;
    if (node.value === value) return idx;
    while (node.hasNext()) {
      node = node.next;
      idx += 1;
      if (node.value === value) return idx;
    }
    return -1;
  }

  private getNodeByValue(value: T): DoublyLinkedListNode<T> {
    if (!this.allValues.has(value)) {
      return null
    }
    let node = this.head;
    if (node.value === value) return node;
    while (node.hasNext()) {
      node = node.next;
      if (node.value === value) return node;
    }
  }

  private getNodeByIndex(idx: number): DoublyLinkedListNode<T> {
    if (idx < 0 || idx >= this.length) {
      return null;
    }
    let node, cur;
    if (idx > (this.length / 2)) {
      cur = this.length-1;
      node = this.tail;
      while (cur > idx) {
        cur -= 1;
        node = node.prev
      }
    }
    else {
      cur = 0;
      node = this.head;
      while (cur < idx) {
        cur += 1
        node = node.next;
      }
    }
    return node;
  }

  getValueByIndex(idx: number): T {
    const node = this.getNodeByIndex(idx);
    if (node) {
      return node.value;
    }
    return null;
  }

  private remove(node: DoublyLinkedListNode<T>): void {
    if (!this.allValues.has(node.value)) return;
    this.allValues.delete(node.value);
    if(node.hasNext() && node.hasPrev()) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    } else if (node.hasNext()) {
      node.next.prev = null;
      this.head = node.next;
    } else if (node.hasPrev()) {
      node.prev.next = null;
      this.tail = node.prev;
    } else {
      this.head = null;
      this.tail = null;
    }
    node.next = null;
    node.prev = null;
  }

  public removeByValue(value: T): void {
    if (!this.allValues.has(value)) {
      return;
    }
    const node = this.getNodeByValue(value);
    this.remove(node);
  }

  public reorder(fromIdx: number, toIdx: number): DoublyLinkedList<T> {
    if (fromIdx < 0 || toIdx < 0 || fromIdx >= this.length || toIdx >= this.length) {
      return this;
    }
    const node = this.getNodeByIndex(fromIdx);
    this.remove(node);
    this.pushNodeToIdx(node, toIdx);
    return this;
  }
}