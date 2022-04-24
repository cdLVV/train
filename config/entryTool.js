"use strict";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const fs = require("fs");

const paths = require("./paths");
const { entriesMap } = require("./paths");

const files = paths.entriesPath;
const rewrites = files.map(({ name, path }) => {
  return {
    from: new RegExp(`^\/${name}`),
    to: function (context) {
      // console.log(context.parsedUrl);
      // console.log(context.match);
      // console.log(
      //   'context.parsedUrl.pathname.includes(".html"):',
      //   context.parsedUrl.pathname.includes(".html")
      // );
      return context.parsedUrl.pathname.includes(".html")
        ? context.parsedUrl.href
        : context.parsedUrl.href.replace(name, `${name}.html`);
    },
  };
});

function getEntries(isEnvDevelopment) {
  const entries = {
    shared: ["react", "react-dom"],
  };
  files.forEach(({ name, path: pathUrl }) => {
    entries[name] = {
      import: [
        isEnvDevelopment &&
          require.resolve("react-dev-utils/webpackHotDevClient"),
        pathUrl,
      ].filter(Boolean),
      dependOn: "shared",
    };
  });
  return entries;
}

const getHtmlPlugin = (entries, isEnvProduction) =>
  Object.keys(entries)
    .filter((name) => name !== "shared")
    .map((name) => {
      return new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: fs.existsSync(
              path.resolve(entriesMap[name] + "/index.html")
            )
              ? path.resolve(entriesMap[name] + "/index.html")
              : paths.appHtml,
            chunks: [name, 0, "shared"], // 只会插入名字中带 "0" 或者 带 name 的js 问题
            filename: `${name}.html`,
            title: `${name}`,
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
