/* eslint-env node */

module.exports = function (api) {
  api.cache(true);
  return {
    exclude: [],
    presets: [
      "@babel/preset-typescript",
      [
        "@babel/preset-env",
        {
          targets: { rhino: "1.7.13" },
          corejs: "3.8.0",
        },
      ],
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread",
    ],
    retainLines: true,
    compact: false,
  };
};
