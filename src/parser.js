import { forEach, flatten } from './utils';

const paramRegex = /__(\d)+/;

const templateParser = (string) => {
  const template = document.createElement('template');
  template.innerHTML = string.trim();
  // console.log('parser', string.trim(), template.content.childNodes[0].cloneNode())
  return template.content;
};

const replaceAnchors = (parent, params) => {
  // console.log('replaceAnchors', parent, params)
  forEach(parent.childNodes, (childNode) => {
    if (childNode.attributes) {
      forEach(childNode.attributes, (attr) => {
        const match = attr.value.trim().match(paramRegex);
        if (match) {
          const param = params[parseInt(match[1], 10)];
          if (!childNode.__) {
            childNode.__ = {};
          }
          childNode.__[attr.name] = param;
          childNode.setAttribute(attr.name, param);
          if (attr.name.startsWith('on')) {
            childNode[attr.name] = param;
          }
        }
      });
    }
    if (childNode.nodeValue) {
      // console.log('coucou', childNode.nodeValue, childNode.nodeValue.trim().match(paramRegex));
      const match = childNode.nodeValue.trim().match(paramRegex);
      if (match) {
        const param = params[parseInt(match[1], 10)];
        // console.log('coucou', param, param instanceof DocumentFragment || Array.isArray(param));
        if (param instanceof DocumentFragment || Array.isArray(param)) {
          const children = Array.isArray(param) ? flatten(param) : [param];
          parent.removeChild(childNode);
          children.forEach(child => parent.appendChild(child));
        } else {
          childNode.nodeValue = param;
          // match.forEach(singleMatch => {
          //   childNode.nodeValue.replace(singleMatch, param);
          // })
        }
      }
    } else {
      replaceAnchors(childNode, params);
    }
  });
};

// ❤️ http://2ality.com/2014/07/jsx-template-strings.html
// ❤️ https://gist.github.com/lygaret/a68220defa69174bdec5
export function html(parts, ...params) {
  const stringWithAnchors = parts.reduce(
    (acc, part, i) =>
      (i !== parts.length - 1 ? `${acc}${part}__${i}` : `${acc}${part}`),
    '',
  );
  const domWithAnchors = templateParser(stringWithAnchors);
  // console.log('parse', stringWithAnchors, domWithAnchors);
  replaceAnchors(domWithAnchors, params);
  return domWithAnchors.childNodes[0];
}

export function css(parts, ...params) {
  return parts.reduce(
    (acc, part, i) =>
      (i !== parts.length - 1 ? `${acc}${part}${params[i]}` : `${acc}${part}`),
    '',
  );
}
