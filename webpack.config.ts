// libraries;
import path from 'path';

// plugins;
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DotEnv from 'dotenv-webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// types;
import { type Configuration } from 'webpack';
import { type Configuration as DevServerConfiguration } from 'webpack-dev-server';

// helpers;
const Path = {
  PUBLIC_PATH: `/`,
  ENTRY: `${path.resolve(__dirname, `src`, `index.tsx`)}`,
  DIST: `${path.resolve(__dirname, `dist`)}`,
  HTML: `${path.resolve(__dirname, `public`, `index.html`)}`,
};

const createDevServer = (port: number): DevServerConfiguration => {
  return {
    port,
    historyApiFallback: true,
    open: true,
  };
};

interface EnvType {
  mode: `development` | `production`;
  port: number;
}

// config;
export default (env: EnvType): Configuration => {
  const { mode = `development`, port = 3000 } = env;

  return {
    mode,
    entry: Path.ENTRY,
    output: {
      filename: `bundle.js`,
      path: Path.DIST,
      publicPath: Path.PUBLIC_PATH,
    },
    devtool: `inline-source-map`,
    plugins: [
      new HtmlWebpackPlugin({
        template: Path.HTML,
      }),
      new DotEnv(),
      new MiniCssExtractPlugin({
        filename: `css/style.css`,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: `ts-loader`,
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            mode === `development`
              ? `style-loader`
              : MiniCssExtractPlugin.loader,
            `css-loader`,
            `sass-loader`,
          ],
        },
      ],
    },
    resolve: {
      extensions: [`.tsx`, `.ts`, `.js`],
    },
    devServer: createDevServer(port),
  };
};
