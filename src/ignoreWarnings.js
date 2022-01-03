const backup = console.warn;

console.warn = function filterWarnings(msg) {
  const suppressedWarnings = ['componentWillUpdate has been renamed',
    'componentWillReceiveProps has been renamed'];

  if (!suppressedWarnings.some(entry => msg.includes(entry))) {
    backup.apply(console, arguments);
  }
}

console.error = function filterError(msg) {
  const suppressedErrors = ['A component is changing a controlled input to be uncontrolled'];

  if (!suppressedErrors.some(entry => msg.includes(entry))) {
    backup.apply(console, arguments);
  }
}