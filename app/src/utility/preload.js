export default (srcs) => {
    return new Promise((resolve, reject) => {
        let count = srcs.length;
        if (count === 0) {
            resolve();
            return;
        }
        const onload = () => --count === 0 && resolve();
        srcs.forEach((src) => {
            const a = new Image();
            a.src = src;
            a.onload = onload;
            a.onerror = onload;
        });
    });
}