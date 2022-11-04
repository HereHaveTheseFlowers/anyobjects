const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                options: { transpileOnly: true },
                exclude: ['/node_modules/'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                // 4. Optional: place a link tag on js script load. In our case we already have it in the index.html
                // {loader: "style-loader",options: {injectType: "linkTag"}},
                {
                    // 3. Place styles.css into the dist folder.
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
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
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};
