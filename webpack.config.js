const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackSimpleIncludePlugin = require('html-webpack-simple-include-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const dotenv = require('dotenv');

// get from args
const args = process.argv.slice(2);
const isProd =
  args.includes('--mode=production') || process.env.NODE_ENV === 'production';
const envPath = isProd ? '.env.production' : '.env.development';

// Load environment variables from .env file
const env = dotenv.config({ path: envPath }).parsed || {};
// Convert environment variables to DefinePlugin format
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

// List of HTML Pages files
const htmlFiles = ['index'];

// List of partial files to include
const partialFiles = [];

// Create HtmlWebpackPlugin instances for each HTML file
const htmlPlugins = htmlFiles.map(
  (file) =>
    new HtmlWebpackPlugin({
      template: `./src/${file}.html`,
      filename: `./${file}.html`,
    })
);

// Create HtmlWebpackSimpleIncludePlugin instance with partial files
const partialIncludePlugin = new HtmlWebpackSimpleIncludePlugin(
  partialFiles.map((file) => ({
    tag: `<include-${file} />`,
    content: fs.readFileSync(
      path.resolve(__dirname, `src/partials/${file}.html`)
    ),
  }))
);

module.exports = {
  entry: {
    main: './src/assets/js/script.js',
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    watchFiles: ['src/**/*'],
    hot: true,
    port: 5000,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into files
          'css-loader', // Turns CSS into CommonJS
          {
            loader: 'postcss-loader', // Adds vendor prefixes
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          'sass-loader', // Compiles Sass to CSS
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, // Use MiniCssExtractPlugin instead of style-loader
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src'), // Optional: setup alias for easier imports
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/app.css',
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/assets/images', to: 'assets/images' }],
    }),
    ...htmlPlugins,
    // partialIncludePlugin,
    process.env.NODE_ENV === 'production' &&
      new webpack.DefinePlugin({
        ...envKeys,
        'process.env.NODE_ENV': JSON.stringify('production'),
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    process.env.NODE_ENV === 'development' &&
      new webpack.DefinePlugin({
        ...envKeys,
        'process.env.NODE_ENV': JSON.stringify('development'),
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(true),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true),
      }),
  ],
  output: {
    filename: 'assets/js/app.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
      },
    },
  },
};
