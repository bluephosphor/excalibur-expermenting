export const lerp = (a: number, b: number, amt: number, nosnap?: boolean) => {
    const _v = a + amt * (b - a);
    if (nosnap) {
        return _v;
    } else {
        return Math.abs(_v) > 0.01 ? _v : b;
    }
};
