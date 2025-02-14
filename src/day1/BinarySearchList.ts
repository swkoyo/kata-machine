export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0;
    let hi = haystack.length;

    do {
        const mid = Math.floor(lo + (hi - lo) / 2);

        if (needle < haystack[mid]) {
            hi = mid;
        } else if (needle > haystack[mid]) {
            lo = mid + 1;
        } else {
            return true;
        }
    } while (lo < hi);

    return false;
}

