const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    mode: 'development',
    devServer: {
        open: false,
        host: "localhost",
        port: 3000,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: false,
        }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    to({ context, absoluteFilename }) {
                        return `objects/${path.relative(context, absoluteFilename)}`;
                    },
                    from: 'public/objects' 
                }
            ]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    // 3. Put everything into main.css and put a style tag into html
                    MiniCssExtractPlugin.loader,
                    {
                      loader: 'css-loader',
                      options: {
                        importLoaders: 1
                      },
                    },
                    // 2. Sort the parameters alphabetically
                    'postcss-loader', 
                {
                    // 1. Turns sass into css.
                    loader: "sass-loader",
                    options: {
                        sassOptions: {
                            outputStyle: "expanded",
                        }
                    }
                }
                ]

            },
            {
                test: /\.(ts|tsx)$/i,
                exclude: ['/node_modules/'],
                loader: 'babel-loader',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(svg|)$/,
                type: 'asset/inline',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};
