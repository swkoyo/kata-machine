export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const queue = [head];

    do {
        const curr = queue.shift();
        if (curr?.value === needle) {
            return true;
        }
        if (curr?.left) {
            queue.push(curr.left);
        }
        if (curr?.right) {
            queue.push(curr.right);
        }
    } while (queue.length > 0);

    return false;
}

