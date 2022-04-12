"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");

const files = paths.entriesPath;

console.log(paths.entriesPath);

const rewrites = files.map(({ name, path }) => {
  return {
    from: new RegExp(`^\/${name}`),
    to: `/${name}.html`,
  };
});

function getEntries(isEnvDevelopment) {
  const entries = {};
  // console.log(117, files)
  files.forEach(({ name, path }) => {
    entries[name] = [
      isEnvDevelopment &&
        require.resolve("react-dev-utils/webpackHotDevClient"),
      path,
    ].filter(Boolean);
  });
  return entries;
}

const getHtmlPlugin = (entries, isEnvProduction) =>
  Object.keys(entries).map((name) => {
    return new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: paths.appHtml,
          chunks: [name, 0], // 只会插入名字中带 "0" 或者 带 name 的js 问题
          filename: `${name}.html`,
          title: `${name} html`,
        },
        isEnvProduction
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined
      )
    );
  });

module.exports = {
  rewrites,
  getHtmlPlugin,
  getEntries,
};
