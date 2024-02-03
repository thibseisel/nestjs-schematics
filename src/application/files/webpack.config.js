const TerserPlugin = require("terser-webpack-plugin")

const isDevelopment = process.env.NODE_ENV === "development"

/**
 * Produces a Webpack configuration to be used when building the whole project.
 * This function is called by the NestJS CLI.
 *
 * @typedef {import("webpack").Configuration} WebpackConfig
 *
 * @param {WebpackConfig} defaults Default configuration specified by NestJS CLI.
 * @see https://github.com/nestjs/nest-cli/blob/master/lib/compiler/defaults/webpack-defaults.ts
 * @param {import('webpack')} webpack Global webpack namespace.
 * May be used to programmatically configure plugins.
 * @returns {WebpackConfig} Configuration used by webpack at build time.
 */
module.exports = (defaults) => ({
  ...defaults,
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "inline-source-map" : "source-map",
  optimization: {
    ...defaults.optimization,
    minimize: !isDevelopment,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          // Mangling class names breaks generated Swagger docs.
          keep_classnames: true,
        },
      }),
    ],
  },
})
