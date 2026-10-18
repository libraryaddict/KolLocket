import { transformAsync } from "@babel/core";
import esbuild from "esbuild";
import { promises as fs } from "fs";

const babelPlugin = {
  name: "babel",
  setup(build) {
    build.onLoad({ filter: /\.[jt]sx?$/ }, async (args) => {
      const contents = await fs.readFile(args.path, "utf8");
      const result = await transformAsync(contents, { filename: args.path });

      return { contents: result.code };
    });
  },
};

await esbuild.build({
  entryPoints: ["src/Locket.ts"],
  bundle: true,
  format: "cjs",
  outfile: "built/scripts/locket.js",
  external: ["kolmafia"],
  plugins: [babelPlugin],
});
