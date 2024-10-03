const fs = require('fs');
const path = require('path');

const root = __dirname
const modules = fs.readdirSync(root).filter(f => f !== 'index.js');

console.log('Modules found :', modules.join(', '));
var moduleMap = {};

modules.forEach(m => {
  const moduleIndex = path.join(root, m, 'index.js');
  console.log(`Loading module: ${m}`);
  const module = require(moduleIndex);
  moduleMap[module.verb + '@' + module.path] = {
    action: module.action,
    validatorSchema: module.validatorSchema
  }
});
module.exports = { modules: moduleMap };
