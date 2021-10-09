const generators = {
    1: simpleLinear,
    2: intermediateLinear,
};

function load() {
    const type = new URL(location.href).searchParams.get('type') || 1;
    const typeSelector = document.getElementById('type-selector');
    for (let i = 0; i < typeSelector.options.length; i++) {
        if (typeSelector.options.item(i).value == type) {
            typeSelector.selectedIndex = i;
            break;
        }
    }
    const contentDiv = document.getElementById('content');
    let html = '<ol>';
    for (let i = 0; i < 20; i++) {
        html += '<li>';
        html += '<div class="problem">';
        html += generators[type]();
        html += '</div>';
        html += '</li>';
    }
    html += '</ol>';
    contentDiv.innerHTML = html;
}

function coefficient() {
    let c;
    do {
        c = Math.ceil(Math.random() * 32) - 16;
    } while (c == 0);
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


// generators:

function simpleLinear() {
    let html = '';
    let c1 = coefficient();
    if (c1 == 1) {
        c1 = '';
    } else if (c1 == -1) {
        c1 = '-';
    }
    html += c1 + varialbe();
    html += Math.random() < 0.5 ? ' + ' : ' - ';

    let c2 = coefficient();
    c2 *= Math.sign(c2);
    html += c2 + ' = ';

    let c3 = coefficient();
    html += c3;
    return html;
}


function intermediateLinear() {
    return 'todo';
}
