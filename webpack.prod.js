const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
process.env.NODE_ENV = 'production';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    mode: 'production',
    devServer: {
        open: true,
        host: "localhost",
        port: 3000,
        historyApiFallback: true,
    },
    plugins: [
        //new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: true,
        }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    to({ context, absoluteFilename }) {
                        return `objects/${path.relative(context, absoluteFilename)}`;
                    },
                    from: 'public/objects' 
                },
                { 
                    to({ context, absoluteFilename }) {
                        return `frankocean/${path.relative(context, absoluteFilename)}`;
                    },
                    from: 'public/frankocean' 
                }
            ]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                exclude: ['/node_modules/'],
                loader: 'babel-loader',
            },
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
                    'sass-loader'
                ]

            },
            {
                test: /\.(svg|woff(2)?|eot|ttf|otf|ico|gif|png|jpg|jpeg|webmanifest)$/i,
                type: 'asset/resource',
            }
        ],
    },
    optimization: {
        splitChunks: {
          cacheGroups: {
            reactVendor: {
              test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
              name: 'vendor-react',
              chunks: 'all',
            },
            corejsVendor: {
                test: /[\\/]node_modules[\\/](core-js)[\\/]/,
                name: 'vendor-corejs',
                chunks: 'all',
            },
          },
        },
        mangleWasmImports: true,
        usedExports: true,
        minimizer: [new TerserPlugin()],
    }, 
    performance: {
        maxEntrypointSize: 5000000,
        maxAssetSize: 5000000
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    }
};
