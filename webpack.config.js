const autoprefixer = require('autoprefixer');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackSimpleIncludePlugin = require('html-webpack-simple-include-plugin');

// List of HTML Pages files
const htmlFiles = [
  'index',
  'home-two',
  'home-three',
  'home-four',
  'community',
  'profile',
  'chat',
  'user-game-stats',
  'user-about',
  'user-team',
  'user-groups',
  'user-forums',
  'user-videos',
  'user-achievements',
  'user-settings',
  'trending',
  'live-stream',
  'saved',
  'game-details-two',
  'library',
  'library-details',
  'groups-one',
  'groups-two',
  'group-home',
  'group-related-groups',
  'group-forum',
  'group-members',
  'group-media',
  'teams',
  'team-home',
  'team-games',
  'team-tournament',
  'team-ranks',
  'games',
  'game-details',
  'game-details-two',
  'tournaments',
  'tournament-overview',
  'tournament-prizes',
  'tournament-participants',
  'tournament-matches',
  'tournament-brackets',
  'tournament-details',
  'leaderboard',
  'marketplace-one',
  'marketplace-two',
  'marketplace-details',
  'pricing-plan',
  'shop',
  'shop-details',
  'shipping',
  'blogs',
  'blog-details',
  'faqs',
  'terms-conditions',
  'shopping-cart',
  'checkout',
  'contact-us',
  'not-found',
  'sign-up',
  'login',
];

// List of partial files to include
const partialFiles = [
  'navbar',
  'preloader',
  'left-sidebar-one',
  'right-sidebar-one',
  'left-right-sidebar',
  'left-right-sidebar-two',
  'footer',
  'footer-two',
  'footer-three',
  'user-profile',
  'popup-video-modal',
  'scrollToTop',
  'right-aside-one',
  'team-header',
  'tournament-header',
  'billing-sidebar',
  'group-header',
  'our-store-section',
  'popular-games-one',
  'top-trending-games',
];

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
    main: './src/assets/js/app.js',
  },
  mode: 'development',
  devServer: {
    watchFiles: ['src/**/*'],
    hot: true,
    port: 5000,
  },

  module: {
    rules: [
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
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/styles/app.css',
    }),
    new CopyPlugin({
      patterns: [{ from: 'src/assets/images', to: 'assets/images' }],
    }),
    ...htmlPlugins,
    partialIncludePlugin,
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
