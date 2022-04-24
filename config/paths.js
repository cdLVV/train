"use strict";

const path = require("path");
const fs = require("fs");
// const globby = require("globby");
const getPublicUrlOrPath = require("react-dev-utils/getPublicUrlOrPath");

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === "development",
  require(resolveApp("package.json")).homepage,
  process.env.PUBLIC_URL
);

const buildPath = process.env.BUILD_PATH || "docs";

const moduleFileExtensions = [
  "web.mjs",
  "mjs",
  "web.js",
  "js",
  "web.ts",
  "ts",
  "web.tsx",
  "tsx",
  "json",
  "web.jsx",
  "jsx",
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

function walkSync(
  currentDirPath = resolveApp("src/entries"),
  entries = [],
  entriesMap = {},
  prefix = ""
) {
  fs.readdirSync(currentDirPath).forEach(function (name) {
    var filePath = path.join(currentDirPath, name);
    var stat = fs.statSync(filePath);
    if (stat.isFile()) {
      return;
    } else if (stat.isDirectory() && !/components|images/.test(name)) {
      if (name === "enterprise") {
        // entries.push({ path: filePath, name: `${name}/index` });
        walkSync(filePath, entries, entriesMap, `${name}/`);
        return;
      }
      // console.log({ path: filePath, name: `${prefix}${name}` });
      const realName = `${prefix}${name}`;
      entriesMap[realName] = filePath;
      entries.push({ path: filePath, entriesMap, name: realName });
    }
  });

  return { entriesPath: entries, entriesMap };
}

const { entriesPath, entriesMap } = walkSync();
// console.log(entriesPath);
// const entriesPath = ["a", "b"].map((name) => {
//   const filePath = resolveModule(resolveApp, `src/entries/${name}/index`);
//   return { path: filePath, name };
// });

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp(".env"),
  appPath: resolveApp("."),
  appBuild: resolveApp(buildPath),
  appPublic: resolveApp("public"),
  appHtml: resolveApp("public/index.html"),
  // appIndexJs: resolveModule(resolveApp, "src/index"),
  entriesPath,
  entriesMap,
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  appTsConfig: resolveApp("tsconfig.json"),
  appJsConfig: resolveApp("jsconfig.json"),
  yarnLockFile: resolveApp("yarn.lock"),
  testsSetup: resolveModule(resolveApp, "src/setupTests"),
  proxySetup: resolveApp("src/setupProxy.js"),
  appNodeModules: resolveApp("node_modules"),
  appWebpackCache: resolveApp("node_modules/.cache"),
  appTsBuildInfoFile: resolveApp("node_modules/.cache/tsconfig.tsbuildinfo"),
  swSrc: resolveModule(resolveApp, "src/service-worker"),
  publicUrlOrPath,
};

module.exports.moduleFileExtensions = moduleFileExtensions;
