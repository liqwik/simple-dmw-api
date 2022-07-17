const { colorReference } = require('./color-reference');

function DangerConsole(msg) {
  console.log(
    `${colorReference.BgRed}${colorReference.FgWhite}%s${colorReference.Reset}`,
    msg
  );
}

module.exports = DangerConsole;
