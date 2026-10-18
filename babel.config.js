/* eslint-env node */

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: { rhino: "1.9.1" },
          modules: false,
        },
      ],
      "@babel/preset-typescript",
    ],
    retainLines: true,
    compact: false,
  };
};
