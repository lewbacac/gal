const ordering = new Map();

ordering.set('}', 1);
ordering.set(']', 2);
ordering.set(')', 3);

function balancedBrackets(brackets) {
    const deque = [];
    let previousOrder = 0;
    const cleanBrackets = removeRedundantSymbols(brackets);

    for(let i = 0; i < cleanBrackets.length; i++) {
        const currentChar = cleanBrackets[i];
        if (currentChar === '{' || currentChar === '[' || currentChar === '(') {
            deque.unshift(currentChar);
        } else {
            if (deque.length != 0
              && ((deque[0] === '{' && currentChar === '}')
              || (deque[0] === '[' && currentChar === ']')
              || (deque[0] === '(' && currentChar === ')'))){
                  deque.shift();
                  if (previousOrder != 0 && ordering.get(currentChar) > previousOrder) {
                      return false;
                  }
                  previousOrder = deque.length === 0 ? 0 : ordering.get(currentChar);
                  } else {
                    return false;
                  }
        }
    }
  return deque.length === 0;
}

const removeRedundantSymbols = (line) => {
    const chars = line.split("");
    const result = [];
    for(let i = 0; i < chars.length; i++) {
        if(isBracket(chars[i])) {
            result.push(chars[i]);
        }
    }
    return result;
}

const isBracket = (bracket) => {
    return bracket === '[' || bracket === ']' || bracket === '{' || bracket === '}' || bracket === '(' || bracket === ')';
}

console.log(balancedBrackets("{asd}"));
console.log(balancedBrackets("{[(asd)]}"));
console.log(balancedBrackets("[{asd}]"));
console.log(balancedBrackets("[(asd])"));
console.log(balancedBrackets("{aaa[bbb(ccc)ddd]eee}"));
