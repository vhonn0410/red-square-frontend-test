

const n = process.argv.filter((v) => v.startsWith("n="))?.[0]?.slice("n=".length);

const q1Func = (n) => {
    let count = 0;
    const msgDiv3 = "fizz";
    const msgDiv5 = "buzz";
    while (count++ < n) {
        if (count % 3 === 0 && count % 5 === 0) console.log(`${count}: ${msgDiv3}${msgDiv5}`);
        else if (count % 3 === 0) console.log(`${count}: ${msgDiv3}`);
        else if (count % 5 === 0) console.log(`${count}: ${msgDiv5}`);
        else console.log(`${count}`);
    }
}
q1Func(n ?? 15);