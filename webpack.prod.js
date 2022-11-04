const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
process.env.NODE_ENV = 'production';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
                        name: 'styles.css'
                    }
                },
                    // 2. Sort the parameters alphabetically
                    'postcss-loader', 
                    // 1. Turns sass into css.
                    'sass-loader'
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    optimization: {
/*         splitChunks: {
          minSize: 10000,
          maxSize: 250000,
        } */
        splitChunks: {
          cacheGroups: {
            reactVendor: {
              test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
              name: 'vendor-react',
              chunks: 'all',
            },
          },
        },
        mangleWasmImports: true,
        usedExports: true,
        minimizer: [new TerserPlugin()],
    }, 
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    }
};
