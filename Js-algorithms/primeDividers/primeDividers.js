function primeDividers(n) {
    const result = [];
    for(let i = 2; i <= n; i++) {
        if(n%i === 0) {
            while(n%i === 0) {
                if(!result.includes(i)) {
                    result.push(i);
                }
                n = n / i;
            }
        }
    }
    return result.join(', ');
}

console.log(primeDividers(15));
console.log(primeDividers(11));
console.log(primeDividers(12));
