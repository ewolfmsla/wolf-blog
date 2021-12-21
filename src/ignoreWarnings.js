const backup = console.warn;
console.warn = function filterWarnings(msg) {
  const suppressedWarnings = ['componentWillUpdate has been renamed', 'componentWillReceiveProps has been renamed'];

  if (!suppressedWarnings.some(entry => msg.includes(entry))) {
    backup.apply(console, arguments);
  }
}