function coefficient(range) {
    range = range || 16;
    let c;
    do {
        c = Math.ceil(Math.random() * 2 * range) - range;
    } while (c == 0);
    return c;
}

function variable(name) {
    name = name || 'x';
    return `<span class="variable">${name}</span>`;
}

function exponent(n) {
    return `<span class="exponent">${n}</span>`;
}

function sign(n) {
    return `<div class="sign">${n < 0 ? '-' : '+'}</div>`;
}

function simplifyFraction(num, denom) {
    const value = num / denom;
    if (denom == 0) {
        return {
            value,
            html: '&infin;'
        };
    }
    const _sign = num / denom < 0 ? sign(num / denom) : '';
    num = Math.abs(num);
    denom = Math.abs(denom);
    let gcf;
    for (let i = 2; i <= Math.max(num, denom); i++) {
        if (num % i == 0 && denom % i == 0) {
            gcf = i;
        }
    }
    if (gcf) {
        num /= gcf;
        denom /= gcf;
    }
    let html;
    if (num == 0) {
        html = '0';
    } else if (denom == 1) {
        html = (_sign ? '-' : '') + num;
    } else {
        html = `<div class="fraction-container">${_sign}<div class="fraction"><div class="numerator">${num}</div><div class="denominator">${denom}</div></div></div>`;
    }
    return {
        value,
        html,
    };
}

function term(coef, isLeading, exp, variableName) {
    if (coef == 0) {
        return '';
    }

    if (exp == null) {
        exp = 1;
    }
    let variableHtml;
    if (exp == 0) {
        variableHtml = '';
    } else if (exp == 1) {
        variableHtml = variable(variableName);
    } else {
        variableHtml = variable(variableName) + exponent(exp);
    }
    if (Math.abs(coef) == 1) {
        if (exp == 0) {
            return isLeading ? coef : sign(coef) + Math.abs(coef);
        }
        return (isLeading ? (coef < 0 ? '-' : '') : sign(coef)) + variableHtml;
    }
    return (isLeading ? coef : sign(coef) + Math.abs(coef)) + variableHtml;
}
