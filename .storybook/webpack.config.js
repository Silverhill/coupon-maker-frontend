// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  plugins: [
    // your custom plugins
  ],
  resolve: {
    extensions: [".jsx", ".js"],
    alias: {
      Actions: path.resolve(__dirname, '../src/actions'),
      Atoms: path.resolve(__dirname, '../src/commons/components/atoms'),
      Molecules: path.resolve(__dirname, '../src/commons/components/molecules'),
      Organisms: path.resolve(__dirname, '../src/commons/components/organisms'),
    }
  },
  module: {
    rules: [
      // add your custom rules.
      {
        test: /\.json$/,
        loaders: ['json-loader'],
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:4]",
            },
          },
          {
            loader: require.resolve('sass-loader'),
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
    ],
  },
};
