module.exports = function (api) {
  api.cache(true);
  const presets = ["@babel/preset-env", "@babel/preset-react"];
  const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    "dynamic-import-webpack",
    // "@babel-plugin-transform-runtime",
    // "@babel/plugin-transform-runtime",
  ];
  return {
    presets,
    plugins,
  };
};
