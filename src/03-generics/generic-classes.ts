// ============================================
// 1. 기본 제네릭 클래스
// ============================================

class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

// 숫자 박스
const numberBox = new Box<number>(123);
console.log(numberBox.getValue());  // 123
numberBox.setValue(456);
console.log(numberBox.getValue());  // 456

// 문자열 박스
const stringBox = new Box<string>("hello");
console.log(stringBox.getValue());  // "hello"

// ============================================
// 2. 실전 예제: Stack (스택)
// ============================================

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// 숫자 스택
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

console.log(numberStack.pop());    // 3
console.log(numberStack.peek());   // 2
console.log(numberStack.size());   // 2

// 문자열 스택
const stringStack = new Stack<string>();
stringStack.push("first");
stringStack.push("second");

console.log(stringStack.pop());    // "second"

// ============================================
// 3. Queue (큐)
// ============================================

class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  front(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

const queue = new Queue<string>();
queue.enqueue("첫번째");
queue.enqueue("두번째");
queue.enqueue("세번째");

console.log(queue.dequeue());  // "첫번째"
console.log(queue.front());    // "두번째"
console.log(queue.size());     // 2