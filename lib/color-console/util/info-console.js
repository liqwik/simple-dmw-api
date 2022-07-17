const { colorReference } = require('./color-reference');

function InfoConsole(msg) {
  console.log(
    `${colorReference.BgWhite}${colorReference.FgBlack}%s${colorReference.Reset}`,
    msg
  );
}

module.exports = InfoConsole;
