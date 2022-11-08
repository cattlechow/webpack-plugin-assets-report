const fs = require("fs-extra");
const path = require("path");
const { validate } = require("schema-utils");
const schema = require("./schema.json");

const pluginName = "AssetsReportPlugin";
const defaultOptions = {
  filename: "assets.md",
};

// 文本头部
const tableHeader = `
# assets table 

|  file  |  size  |
|--------|--------|

`;

class AssetsReportPlugin {
  constructor(options) {
    // 使用schema-utils校验参数
    validate(schema, options, { name: pluginName });
    this.options = { ...defaultOptions, ...options };
  }

  apply(compiler) {
    compiler.hooks.done.tap(pluginName, (stats) => {
      // 拿到生成的产物和输出参数
      const { assets, outputOptions } = stats.compilation;
      // 文本内容拼接
      const content = Object.keys(assets).reduce((ac, key) => {
        ac += `| ${key} | ${assets[key]._size} |\n`;
        return ac;
      }, tableHeader);
      // 输出路径：如果插件配置项没有设置就使用webpack的输出路径
      const outputPath = this.options.path || outputOptions.psth;
      // 输出路径
      fs.outputFile(path.resolve(outputPath, this.options.filename), content);
    });
  }
}

module.exports = { AssetsReportPlugin };
