export default class ArrayList<T> {
    public length: number;
    private capacity: number;
    private data: T[];

    constructor(capacity: number) {
        this.length = 0;
        this.capacity = capacity;

        this.data = new Array(this.capacity).fill(0);
    }

    prepend(item: T): void {
        this.grow();
        for (let i = this.length; i >= 0; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[0] = item;
        this.length += 1;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error("NO");
        }

        this.grow();
        for (let i = this.length; i >= idx; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[idx] = item;
        this.length += 1;
    }

    append(item: T): void {
        this.grow();
        this.data[this.length] = item;
        this.length += 1;
    }

    remove(item: T): T | undefined {
        let i = 0;
        let res: T | undefined = undefined;
        while (i < this.length) {
            if (this.data[i] === item) {
                res = this.data[i];
                break;
            }
            i += 1;
        }
        if (!res) {
            return undefined;
        }
        this.shrink();
        this.length -= 1;
        for (let j = i; j < this.length - 1; j++) {
            this.data[j] = this.data[j + 1];
        }
        return res;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        return this.data[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }
        this.shrink();
        const res = this.data[idx];
        for (let i = idx; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        this.length -= 1;
        return res;
    }

    private grow(): void {
        if (this.length === this.capacity) {
            this.capacity *= 2;
            const newData = new Array(this.capacity).fill(0);
            for (let i = 0; i < this.length; i++) {
                newData[i] = this.data[i];
            }
            this.data = newData;
        }
    }

    private shrink(): void {
        if (this.length > 0 && this.length === this.capacity / 2) {
            this.capacity /= 2;
            const newData = new Array(this.capacity).fill(0);
            for (let i = 0; i < this.length; i++) {
                newData[i] = this.data[i];
            }
            this.data = newData;
        }
    }
}

