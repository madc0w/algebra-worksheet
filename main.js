let numProblems;

function load() {
    const url = new URL(location.href);
    const type = url.searchParams.get('type') || 0;
    numProblems = url.searchParams.get('num') || 20;
    document.getElementById('num-questions').value = numProblems;

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
        const question = config.problemGenerator();
        html += '<li>';
        html += '<div class="problem">';
        html += question.problem;
        html += '</div>';
        html += '<div class="answer">';
        html += question.answer;
        html += '</div>';
        html += '</li>';
    }
    html += '</ol>';
    contentDiv.innerHTML = html;
}

function toggleShowAnswers() {
    const isShowAnswers = document.getElementById('show-answers').checked;
    const answers = document.getElementsByClassName('answer');
    for (let i = 0; i < answers.length; i++) {
        answers.item(i).style = `display: ${isShowAnswers ? 'block' : 'none'};`;
    }
}

function setType() {
    const type = document.getElementById('type-selector').selectedOptions[0].value;
    const url = new URL(location.href);
    url.searchParams.set('type', type);
    location.href = url.toString();
}

function numQuestionsKeyUp() {
    const url = new URL(location.href);
    let num = parseInt(document.getElementById('num-questions').value);
    if (isNaN(num) || num <= 0) {
        num = null;
    }
    document.getElementById('num-questions').value = num;
    if (num) {
        url.searchParams.set('num', num);
        window.history.pushState({
            // html: response.html,
            // pageTitle: response.pageTitle
        }, '', url.toString());
    }
}
