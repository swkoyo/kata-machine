type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length += 1;
        if (!this.head) {
            this.head = this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error("NO");
        }

        if (idx === 0) {
            return this.prepend(item);
        }

        if (idx === this.length) {
            return this.append(item);
        }

        const curr = this.getAt(idx - 1);

        if (!curr) {
            return;
        }

        this.length += 1;
        const node = { value: item } as Node<T>;
        if (curr.next) {
            node.next = curr.next.next;
        }
        curr.next = node;
    }

    append(item: T): void {
        const node = { value: item } as Node<T>;
        this.length += 1;
        if (!this.tail) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    remove(item: T): T | undefined {
        if (this.head?.value === item) {
            return this.removeAt(0);
        }

        if (this.tail?.value === item) {
            return this.removeAt(this.length - 1);
        }

        let i = 0;
        let curr = this.head;
        while (i < this.length && curr) {
            if (curr.next?.value === item) {
                break;
            }
            curr = curr.next;
        }

        if (!curr) {
            return undefined;
        }

        this.length -= 1;
        const node = curr.next;
        curr.next = curr.next?.next;
        return node?.value;
    }

    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        if (idx === 0) {
            this.length -= 1;
            const node = this.head;
            this.head = this.head?.next;
            if (!this.head) {
                this.tail = this.head;
            }
            return node?.value;
        }

        const curr = this.getAt(idx - 1);
        if (!curr || !curr.next) {
            return undefined;
        }

        this.length -= 1;
        const node = curr.next;
        curr.next = curr.next.next;
        if (node === this.tail) {
            this.tail = curr;
        }
        return node.value;
    }

    private getAt(idx: number): Node<T> | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        let curr = this.head;
        for (let i = 0; i < idx && curr; i++) {
            curr = curr.next;
        }

        return curr;
    }
}

