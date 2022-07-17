/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fs = require('fs');
const path = require('path');

function fileNameToModuleName(file, suffixName) {
  const fileName = file.split('.')[0];
  return fileName.charAt(0).toUpperCase() + fileName.slice(1) + suffixName;
}

global.ErrorHandler = (code, msg) => {
  const err = new Error(msg);
  err.status = code;

  return err;
};

global.MyModuleExports = ({ baseDir, suffixName, excludes }) => {
  suffixName = suffixName || '';

  const module = {};
  let dirPaths = fs.readdirSync(baseDir, { withFileTypes: true });

  if (excludes && excludes.length > 0) {
    dirPaths = dirPaths.filter((file) => !excludes.includes(file.name));
  }

  dirPaths.forEach((dirPath) => {
    const fileName = path.normalize(dirPath.name);
    const namespace = path.resolve(baseDir, fileName);

    if (
      dirPath.isFile() &&
      fileName.toLowerCase() !== 'index.js' &&
      path.extname(fileName) === '.js'
    ) {
      const moduleName = fileNameToModuleName(fileName, suffixName);
      module[moduleName] = require(namespace);
    }
  });

  return module;
};
