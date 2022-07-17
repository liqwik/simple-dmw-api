const { colorReference } = require('./color-reference');

function SuccessConsole(msg) {
  console.log(
    `${colorReference.BgGreen}${colorReference.FgWhite}%s${colorReference.Reset}`,
    msg
  );
}

module.exports = SuccessConsole;
