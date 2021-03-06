const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (webpackEnv, { mode='development' }) => {
  const isEnvDevelopment = mode === 'development';
  const isEnvProduction = mode === 'production';

  // call dotenv and it will return an Object with a parsed key 
  const env = dotenv.config().parsed;
    
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  return {
    mode: mode,
    // devtool: '',
    devtool: isEnvProduction?'':'source-map',
    optimization : {
      usedExports: true,
      splitChunks: {
        chunks: 'all'
      }
    },
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      },
      extensions: ['.jsx', '.js'],
    },
    entry: {
      app: './src/index',
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', {
            "modules": false,
            // "loose": true,
            targets: {
              // https://github.com/browserslist/browserslist
              browsers: ['> 5% in KR']
            },
            // debug: true
          }]
            , '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties', 'react-hot-loader/babel', "babel-plugin-styled-components"],
        },
        exclude: path.join(__dirname, 'node_modules'),
      }, { // 두번째 룰
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              // sourceMap: true
            }
          }]
      }]
    },
    
    plugins: [
      new webpack.LoaderOptionsPlugin({ debug: true }),
      new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico'
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: "[name].bundle.js",
      chunkFilename: '[name].chunk.js'
    }
  }
};
