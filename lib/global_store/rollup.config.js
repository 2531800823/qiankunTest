import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const extensions = [".ts"];
const noDeclarationFiles = { compilerOptions: { declaration: false } };

const external = ["react", "react-dom", "react-redux", "@reduxjs/toolkit"];

export default defineConfig([
  // CommonJS
  {
    input: "./src/index.ts",
    output: { file: "dist/cjs/index.cjs", format: "cjs", indent: false },
    external,

    plugins: [
      nodeResolve({
        extensions,
      }),
      commonjs(),
      typescript(),
      babel({
        extensions,
        // plugins: [["./scripts/mangleErrors.cjs", { minify: false }]],
        babelHelpers: "bundled",
      }),
    ],
  },

  // ES
  {
    input: "./src/index.ts",
    output: { file: "dist/es/index.js", format: "es", indent: false },
    external,
    plugins: [
      nodeResolve({
        extensions,
      }),
      commonjs(),
      typescript(),
      babel({
        extensions,
        babelHelpers: "bundled",
      }),
    ],
  },

  // ES for Browsers
  {
    input: "./src/index.ts",
    output: { file: "dist/es/index.mjs", format: "es", indent: false },
    plugins: [
      nodeResolve({
        extensions,
      }),
      commonjs(),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      typescript(),
      babel({
        extensions,
        exclude: "node_modules/**",
        skipPreflightCheck: true,
        babelHelpers: "bundled",
      }),
      //   terser({
      //     compress: {
      //       pure_getters: true,
      //       unsafe: true,
      //       unsafe_comps: true,
      //     },
      //   }),
    ],
  },
]);
