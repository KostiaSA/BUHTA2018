const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
//const TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
//    entry: "./buhta_modules/components/index.js",
    entry: "./app/platform-core/Start.js",
    output: {
        filename: "./app/platform-core/static/app_bundle.js"
    },
    node: {
        __dirname: true,
        __filename: true,
    },
    // Enable sourcemaps for debugging webpack's output.
    //devtool: "inline-source-map",

    // resolve: {
    //     // Add '.ts' and '.tsx' as resolvable extensions.
    //     extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    // },
    //
    resolve: {
        extensions: ["*.js", ".webpack.js", ".web.js", ".js"]
    },
    plugins: [
        // Define production build to allow React to strip out unnecessary checks
        // new webpack.DefinePlugin({
        //     'process.env':{
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // }),
        // Minify the bundle
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         // suppresses warnings, usually from module minification
        //         warnings: false,
        //     },
        // }),
        // Allows error warnings but does not stop compiling.
        //new webpack.NoErrorsPlugin(),
        // Transfer Files
        // new TransferWebpackPlugin([
        //     {from: 'www'},
        // ], path.resolve(__dirname, 'src')),
    ],
    // loaders: [
    //     {
    //         test: /\.js$/, // All .js files
    //         loaders: ['babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
    //         exclude: [nodeModulesPath],
    //     },
    // ],
    // When importing a module whose path matches one of the following,  just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "antd": "antd",
        "codemirror": "CodeMirror",
        "jquery": "$",
        //"socket.io-client": "io",
        //"moment": "moment",
    }
};