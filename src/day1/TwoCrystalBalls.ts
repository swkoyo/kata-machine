export default function two_crystal_balls(breaks: boolean[]): number {
    const n = breaks.length;
    let delta = Math.floor(Math.sqrt(n));
    let lo = 0;
    let hi = lo + delta;

    do {
        const curr = breaks[hi];
        if (curr) {
            for (let i = lo; i < hi; i++) {
                if (breaks[i]) {
                    return i;
                }
            }
        } else {
            lo = hi;
            hi = lo + delta;
        }
    } while (hi < breaks.length);

    return -1;
}

