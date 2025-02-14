export default function linear_search(
    haystack: number[],
    needle: number,
): boolean {
    for (let curr of haystack) {
        if (curr === needle) {
            return true;
        }
    }
    return false;
}

