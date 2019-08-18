/**
 * https://docs.djangoproject.com/en/2.0/_modules/django/forms/forms/#Form
 */

import {hasClass} from 'class-lib';

const keys = Object.keys;
const doc = () => document;

const parseList = item =>
{
    const list = [];    
    const arrLi = item.querySelectorAll('li');
    arrLi.forEach(li => list.push(li.innerText));
    return list;
}

const parseBasic = (item, remove) =>
{
    const d = {};
    const dLabel = item.querySelector('label');
    if (dLabel) {
        d.label = dLabel.innerText;
        d.id = dLabel.getAttribute('for');
        if (remove) {
            item.removeChild(dLabel);
        }
    }

    const dErrors = item.querySelector('.errorlist');
    if (dErrors) {
        d.errors = parseList(dErrors);
        if (remove) {
            item.removeChild(dErrors);
        }
    }

    const dHelp = item.querySelector('.helptext'); 
    if (dHelp) {
        const dHelpUl = dHelp.querySelector('ul');
        d.helps = (dHelpUl) ? parseList(dHelpUl) : [dHelp.innerText];
        if (remove) {
            item.removeChild(dHelp);
        }
    }

    return d;
}

const mapValueName = {
    maxlength: 'maxLength',
    autofocus: 'autoFocus',
    value: 'defaultValue',
    autocomplete: 'autoComplete'
};

const parseInput = (d, item, input, remove) =>
{
    d.input = {};
    for (let attr of input.attributes) {
        const value = attr.nodeValue; 
        const valueName = attr.nodeName;
        if (mapValueName[valueName]) {
            valueName = mapValueName[valueName];
        }
        d.input[valueName] = value ? value : true;
    }
    if (remove) {
        item.removeChild(input);
    }
    return d;
}

const parseOther = (d, item) =>
{
    const others = item.querySelectorAll("li > *");
    if (others.length) {
        d.others = Array.from(others);
    }
    return d;
}

const parseOne = (formString) =>
{
    const d = doc();
    const dom = d.createElement('div');  
    dom.innerHTML = formString; 
    const items = Array.from(dom.querySelectorAll("div > *"));
    let lastItem;
    let hasError = false;
    const fields = [];
    items.forEach(item => {
        if (item.nodeName.toUpperCase() === 'LI') {
            lastItem = parseBasic(item, true);
            if (lastItem.errors) {
                hasError = true;
            }
            const input = item.querySelector('input');
            if (input) {
                parseInput(lastItem, item, input, true);
            }
            parseOther(lastItem, item);
            fields.push(lastItem);
        }
    });
    return {
        fields,
        hasError
    };
}

const djangoFormParser = forms =>
{
   const results = {};
   keys(forms).forEach( key =>
    results[key] = parseOne(forms[key])
   );
   return results;
}

export default djangoFormParser;
