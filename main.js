const numProblems = 16;
const configs = [
    {
        separator: 'Linear things',
    },
    {
        title: 'Simple linear equations',
        problemGenerator: simpleLinear,
        instructions: `Solve for ${varialbe()}.`,
    },
    {
        title: 'Intermediate linear equations',
        problemGenerator: intermediateLinear,
        instructions: `Solve for ${varialbe()}.`,
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
        instructions: `Solve these expressions for ${varialbe()}. If no solution exists, write "no solution".`,
    },
];

function load() {
    const type = new URL(location.href).searchParams.get('type') || 0;
    const typeSelector = document.getElementById('type-selector');
    let typeSelectorHtml = '';
    let config;
    {
        let i = 0;
        for (const _config of configs) {
            if (i == type) {
                config = _config;
            }
            if (_config.separator) {
                typeSelectorHtml += `<option disabled>${_config.separator}</option>`;
            } else {
                typeSelectorHtml += `<option value="${i++}">&nbsp;&nbsp;${_config.title}</option>`;
            }
        }
    }
    typeSelector.innerHTML = typeSelectorHtml;
    for (let i = 0; i < typeSelector.options.length; i++) {
        if (typeSelector.options.item(i).value == type) {
            typeSelector.selectedIndex = i;
            break;
        }
    }

    const contentDiv = document.getElementById('content');
    let html = '<div id="instructions">';
    html += config.instructions;
    html += '</div>';

    html += '<ol>';
    for (let i = 0; i < numProblems; i++) {
        html += '<li>';
        html += '<div class="problem">';
        html += config.problemGenerator();
        html += '</div>';
        html += '</li>';
    }
    html += '</ol>';
    contentDiv.innerHTML = html;
}

function coefficient(isOneAllowed, range) {
    range = range || 16;
    let c;
    do {
        c = Math.ceil(Math.random() * 2 * range) - range;
    } while (c == 0);
    if (!isOneAllowed) {
        if (c == 1) {
            c = '';
        } else if (c == -1) {
            c = '-';
        }
    }
    return c;
}

function setType() {
    const type = document.getElementById('type-selector').selectedOptions[0].value;
    const url = new URL(location.href);
    url.searchParams.set('type', type);
    location.href = url.toString();
}

function varialbe(name) {
    name = name || 'x';
    return `<span class="variable">${name}</span>`;
}

function exponent(n) {
    return `<span class="exponent">${n}</span>`;
}

function sign(n) {
    return `<span class="sign">${n < 0 ? '-' : '+'}</span>`;
}


// generators:

function simpleLinear() {
    let html = '';
    html += coefficient() + varialbe();
    html += Math.random() < 0.5 ? ' + ' : ' - ';

    let c2 = coefficient(true);
    c2 *= Math.sign(c2);
    html += c2 + ' = ';

    let c3 = coefficient(true);
    html += c3;
    return html;
}


function intermediateLinear() {
    let html = '';
    html += coefficient() + ' (';
    html += coefficient() + varialbe();
    html += Math.random() < 0.5 ? ' + ' : ' - ';
    let c2 = coefficient(true);
    c2 *= Math.sign(c2);
    html += c2 + ') = ';
    html += coefficient(false, 8) + varialbe();
    html += Math.random() < 0.5 ? ' + ' : ' - ';
    let c3 = coefficient(true, 8);
    c3 *= Math.sign(c3);
    html += c3;
    return html;
}

function quadraticFactoring1() {
    const a = coefficient(true, 6);
    const b = coefficient(true, 6);
    const c1 = Math.abs(a + b);
    const c2 = Math.abs(a * b);
    return varialbe() + exponent(2) + sign(a + b) + (c1 == 1 ? '' : c1) + varialbe() + sign(a * b) + c2;
}

function quadraticFactoring2() {
    const a1 = coefficient(true, 6);
    const b1 = coefficient(true, 6);
    const a2 = coefficient(true, 6);
    const b2 = coefficient(true, 6);
    const c1 = a1 * a2;
    const c2 = a1 * b2 + a2 * b1;
    const c3 = b1 * b2;
    let result = '';
    if (Math.abs(c1) == 1) {
        if (c1 < 0) {
            result += '-';
        }
    } else {
        result += c1;
    }
    result += varialbe() + exponent(2);
    result += sign(c2);
    if (Math.abs(c2) == 1) {
        if (c2 < 0) {
            result += '-';
        }
    } else {
        result += Math.abs(c2);
    }
    result += varialbe();
    result += sign(c3) + Math.abs(c3);
    return result;
}

function quadraticEquations() {
    const a = coefficient(true, 6);
    const b = coefficient(true, 6);
    const c = coefficient(true, 6);
    let result = '';
    if (Math.abs(a) == 1) {
        if (a < 0) {
            result += '-';
        }
    } else {
        result += a;
    }
    result += varialbe() + exponent(2);
    result += sign(b);
    if (Math.abs(b) != 1) {
        result += Math.abs(b);
    }
    result += varialbe();
    result += sign(c) + Math.abs(c);
    result += ' = 0';
    return result;
}
