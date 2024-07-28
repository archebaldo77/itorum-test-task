// libraries;
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// types;
import { type Configuration } from 'webpack';
import { type Configuration as DevServerConfiguration } from 'webpack-dev-server';

// helpers;
const Path = {
  ENTRY: `${path.resolve(__dirname, `src`, `index.tsx`)}`,
  DIST: `${path.resolve(__dirname, `dist`)}`,
  HTML: `${path.resolve(__dirname, `public`, `index.html`)}`,
};

const PORT = 3000;

const createDevServer = (port: number): DevServerConfiguration => {
  return {
    port,
    historyApiFallback: true,
    open: true,
  };
};

// config;
const config: Configuration = {
  mode: `development`,
  entry: Path.ENTRY,
  output: {
    filename: `bundle.js`,
    path: Path.DIST,
  },
  devtool: `inline-source-map`,
  plugins: [
    new HtmlWebpackPlugin({
      template: Path.HTML,
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
        use: [`style-loader`, `css-loader`, `sass-loader`],
      },
    ],
  },
  resolve: {
    extensions: [`.tsx`, `.ts`, `.js`],
  },
  devServer: createDevServer(PORT),
};

export default config;
