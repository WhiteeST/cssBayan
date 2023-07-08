const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = {
  mode: 'development',
  stats: {
    children: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  entry: {
    index: path.resolve(__dirname, './src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    clean: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src/assets/images'),
    //       to: path.resolve(__dirname, 'dist/src/assets/images'),
    //     },
        {
          from: path.resolve(__dirname, 'src/assets/svg'),
          to: path.resolve(__dirname, 'dist/src/assets/svg'),
        },
    //     {
    //       from: path.resolve(__dirname, 'src/assets/sounds'),
    //       to: path.resolve(__dirname, 'dist/src/assets/sounds'),
    //     },
      ],
    }),
    new ESLintPlugin({ extensions: 'ts' }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'), // шаблон
      filename: 'index.html', // название выходного файла
      chunks: ['index'],
    }),
    new miniCss({
      filename: 'style.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(s*)css$/,
        type: 'asset/resource',
        use: [miniCss.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico|avif|mp3)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/img/[name][hash][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/font/[name].[ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
