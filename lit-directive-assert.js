import { directive, nothing } from "lit-html";

const parseValue = (value, arg) => typeof value === 'function' && value(arg) || value;

export function assertDirective (trueOptionResult, falseOptionResult = nothing) {
  return directive((value) => (part) => {
    const content = parseValue(Boolean(value) && trueOptionResult || falseOptionResult, value);
    part.setValue(content);
  });
}

export function assertAsyncDirective (pendingOptionResult, successOptionResult, errorOptionResult = nothing) {
  return directive((promiseValue) => (part) => {
    part.setValue(parseValue(pendingOptionResult, promiseValue));

    Promise.resolve(promiseValue)
      .then(
        successValue => parseValue(successOptionResult, successValue), 
        errorValue => parseValue(errorOptionResult, errorValue))
      .then(content => (part.setValue(content), part.commit()));
  });
}