/* eslint-disable */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    devServer:{overlay:true},
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            { test: /\.ts$/i, use: 'ts-loader' },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico|mp3)$/i, // для загрузки файлов в папку разработки
                type: 'asset/resource',
                generator: {
                  filename: 'assets/images/[hash][ext]',
                },
            },
        
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
        assetModuleFilename: pathData => {
            const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
            return `${filepath}/[name][ext]`;
          },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new EslingPlugin({ extensions: 'ts' }),
        new CopyPlugin({
            patterns: [
              { from: path.resolve(__dirname, './src/assets/img'), to: path.resolve(__dirname, '../dist/assets/img') },
             { from: path.resolve(__dirname, './src/assets/icons'), to: path.resolve(__dirname, '../dist/assets/icons') },            
            ],
          }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
