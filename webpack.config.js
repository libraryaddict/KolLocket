const path = require("path");

module.exports = {
  entry: {
    locket: "./src/Locket.ts",
  },
  mode: "production",
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        //exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./built/scripts/"),
    libraryTarget: "commonjs",
  },
  externals: {
    kolmafia: "commonjs kolmafia",
  },
  optimization: {
    minimize: false,
  },
};
