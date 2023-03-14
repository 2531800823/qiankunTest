const path = require("path");
const webpackUtils = require("./util");
const dotenv = require("dotenv");

const { config: loadConfig } = dotenv;
//__dirname 为当前目录文件路径

const NODE_ENV = webpackUtils.getEnv();
const { name } = require("../../package.json");

const DIST_PATH = path.resolve(__dirname, "../../../../dist/child", name); //构建目录
const SRC_PATH = path.resolve(__dirname, "../../", "src"); //源码目录
const PUBLIC_PATH = path.resolve(__dirname, "../../", "public"); //public 目录
const ROOT_PATH = path.resolve(__dirname, "../../"); //根节点目录
const IS_PRO = NODE_ENV === "prod"; //是否是产线环境
const IS_DEV = NODE_ENV === "dev"; //是否是开发环境
const version = webpackUtils.getVersion(); //当前构建的版本

function getCDNPath() {
  return IS_PRO ? `${process.env.CDN_ROOT}/${version}/` : "./";
}

const ENV_CONFIG_PATH = path.resolve(ROOT_PATH, "env", `${NODE_ENV}.env`);

//webpack 读取env 配置
loadConfig({
  path: ENV_CONFIG_PATH,
});

console.log("当前环境：", NODE_ENV);

console.log("version：", version);

module.exports = {
  DIST_PATH,
  SRC_PATH,
  PUBLIC_PATH,
  ROOT_PATH,
  IS_PRO,
  IS_DEV,
  getCDNPath,
  ENV_CONFIG_PATH,
};
