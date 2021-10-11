const configs = [
    {
        separator: 'Linear things',
    },
    {
        title: 'Simple linear equations',
        problemGenerator: simpleLinear,
        instructions: `Solve for ${variable()}.`,
    },
    {
        title: 'Intermediate linear equations',
        problemGenerator: intermediateLinear,
        instructions: `Solve for ${variable()}.`,
    },
    {
        separator: 'Quadratic things',
    },
    {
        title: 'Quadratic factoring 1',
        problemGenerator: quadraticFactoring1,
        instructions: `Factor these expressions`,
    },
    {
        title: 'Quadratic factoring 2',
        problemGenerator: quadraticFactoring2,
        instructions: `Factor these expressions`,
    },
    {
        title: 'Quadratic equations',
        problemGenerator: quadraticEquations,
        instructions: `Solve these expressions for ${variable()}. If no solution exists, write "no solution".`,
    },
];


// generators:

function simpleLinear() {
    const a = coefficient();
    const b = coefficient();
    const c = coefficient();

    let problem = '';
    problem += term(a, true, 1);
    problem += term(b, false, 0);
    problem += ' = ' + term(c, true, 0);

    const frac = simplifyFraction(c - b, a);
    let answer;
    if (frac.value == Math.floor(frac.value)) {
        answer = variable() + ' = ' + frac.html;
    } else {
        answer = '<div style="top: -32px; position: relative;"><div style="display: inline; top: -8px; position: relative;">' + variable() + ' =  </div>' + frac.html + '</div>';
    }

    return {
        problem,
        answer
    };
}


function intermediateLinear() {
    let a, b, c, d, e;
    do {
        a = coefficient(8);
        b = coefficient(8);
        c = coefficient(8);
        d = coefficient(8);
        e = coefficient(8);
    } while (a * b == d);
    let lParen = '(';
    let rParen = ')';
    let c1;
    if (Math.abs(a) == 1) {
        if (a == -1) {
            c1 = '-';
        } else {
            c1 = '';
            lParen = rParen = '';
        }
    } else {
        c1 = term(a, true, 0);
    }
    const problem = c1 + ' ' + lParen + term(b, true) + term(c, false, 0) + rParen + ' = ' + term(d, true) + term(e, false, 0);
    const frac = simplifyFraction(e - a * c, a * b - d);
    let answer;
    if (frac.value == Math.floor(frac.value)) {
        answer = variable() + ' = ' + frac.html;
    } else {
        answer = '<div style="top: -32px; position: relative;"><div style="display: inline; top: -8px; position: relative;">' + variable() + ' =  </div>' + frac.html + '</div>';
    }
    return {
        problem,
        answer
    };
}

function quadraticFactoring1() {
    const a = coefficient(6);
    const b = coefficient(6);
    const c1 = a + b;
    const c2 = a * b;
    return {
        problem: variable() + exponent(2) + term(c1) + term(c2, false, 0),
        answer: `(${variable()} ${term(a, false, 0)})(${variable()} ${term(b, false, 0)})`
    };
}

function quadraticFactoring2() {
    const a1 = coefficient(6);
    const b1 = coefficient(6);
    const a2 = coefficient(6);
    const b2 = coefficient(6);
    const c1 = a1 * a2;
    const c2 = a1 * b2 + a2 * b1;
    const c3 = b1 * b2;
    const problem = term(c1, true, 2) + term(c2) + term(c3, false, 0);
    return {
        problem,
        answer: `(${term(a1, true)} ${term(b1, false, 0)})(${term(a2, true)} ${term(b2, false, 0)})`
    };
}

function quadraticEquations() {
    const a = coefficient(6);
    const b = coefficient(6);
    const c = coefficient(6);
    const problem = term(a, true, 2) + term(b) + term(c, false, 0) + ' = 0';
    let answer;
    if (b * b < 4 * a * c) {
        answer = 'no (real) solution';
    } else if (b * b == 4 * a * c) {
        const frac = simplifyFraction(-b, 2 * a);
        answer = variable() + ' = ' + frac.html;
    } else {
        const radical = Math.sqrt(b * b - 4 * a * c);
        const num1 = -b + radical;
        const num2 = -b - radical;
        const denom = 2 * a;
        if (radical == Math.floor(radical)) {
            const frac1 = simplifyFraction(num1, denom);
            const frac2 = simplifyFraction(num2, denom);

            if (frac1.value == Math.floor(frac1.value) && frac2.value == Math.floor(frac2.value)) {
                answer = variable() + ' = ' + frac1.html + ', ' + variable() + ' = ' + frac2.html;
            } else {
                let frac1Wrapped = frac1.html;
                if (frac1.value == Math.floor(frac1.value)) {
                    frac1Wrapped = `<div style="display: inline; top: -8px; position: relative;"'>${frac1Wrapped}</div>`;
                }
                let frac2Wrapped = frac2.html;
                if (frac2.value == Math.floor(frac2.value)) {
                    frac2Wrapped = `<div style="display: inline; top: -8px; position: relative;"'>${frac2Wrapped}</div>`;
                }
                answer = '<div style="top: -32px; position: relative;">';
                answer += '<div style="display: inline; top: -8px; position: relative;">' + variable() + ' = </div>' + frac1Wrapped + ', ';
                answer += '<div style="display: inline; top: -8px; position: relative;">' + variable() + ' = </div>' + frac2Wrapped;
                answer += '</div>';
            }

        } else {
            const ans1 = num1 / denom;
            const ans2 = num2 / denom;
            answer = variable() + ' = ' + ans1.toFixed(3) + ', ' + variable() + ' = ' + ans2.toFixed(3);
        }
    }
    return {
        problem,
        answer
    };
}
