const numProblems = 18;
const configs = {
    1: {
        title: 'Simple linear equations',
        problemGenerator: simpleLinear,
        instructions: `Solve for ${varialbe()}.`,
    },
    2: {
        title: 'Intermediate linear equations',
        problemGenerator: intermediateLinear,
        instructions: `Solve for ${varialbe()}.`,
    },
    3: {
        title: 'Quadratic factoring 1',
        problemGenerator: quadraticFactoring1,
        instructions: `Factor these expressions`,
    },
};

function load() {
    const type = new URL(location.href).searchParams.get('type') || 1;
    const typeSelector = document.getElementById('type-selector');
    let typeSelectorHtml = '';
    for (const key in configs) {
        typeSelectorHtml += `<option value="${key}">${configs[key].title}</option>`;
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
    html += configs[type].instructions;
    html += '</div>';

    html += '<ol>';
    for (let i = 0; i < numProblems; i++) {
        html += '<li>';
        html += '<div class="problem">';
        html += configs[type].problemGenerator();
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
