type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class LRU<K, V> {
    private length: number;
    private capacity: number;
    private head?: Node<V>;
    private tail?: Node<V>;
    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;

    constructor(capacity: number) {
        this.length = 0;
        this.capacity = capacity;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        let node = this.lookup.get(key);
        if (node) {
            node.value = value;
            this.detatch(node);
            this.prepend(node);
            return;
        }
        node = { value } as Node<V>;
        this.lookup.set(key, node);
        this.reverseLookup.set(node, key);
        this.prepend(node);
        this.length += 1;
        this.trimCache();
    }

    get(key: K): V | undefined {
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }
        this.detatch(node);
        this.prepend(node);
        return node.value;
    }

    private detatch(node: Node<V>): void {
        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node === this.head) {
            this.head = node.next;
        }

        if (node === this.tail) {
            this.tail = node.prev;
        }

        node.prev = node.next = undefined;
    }

    private prepend(node: Node<V>): void {
        if (!this.head) {
            this.head = this.tail = node;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    private trimCache(): void {
        if (this.length <= this.capacity) {
            return;
        }

        const node = this.tail as Node<V>;
        const key = this.reverseLookup.get(node) as K;
        this.detatch(node);
        this.lookup.delete(key);
        this.reverseLookup.delete(node);
        this.length--;
    }
}
