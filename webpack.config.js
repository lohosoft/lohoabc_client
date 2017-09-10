var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
// check if make production
var isProd = process.env.NODE_ENV === "production";

module.exports = {
    entry: "./src/index.js",
    target: "web",
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.bundle.js"
        // publicPath: ' '
    },
    // webpack-dev-server config
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        // hot module reload not working by this , just use following hot update plugin
        // hot: true,
        // compress: true,
        port: 8080,
        // cors for local file to serve with dev server
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true"
        },
        // less verbose output after compile
        stats: "errors-only",
        // open browsers
        open: true,
        // for remote client
        disableHostCheck: true,
        // open browser bug fix for webpack 3
        openPage: ""
    },
    module: {
        rules: [
            {
                test: [/\.js$/, /\.jsx$/],
                include: [path.resolve(__dirname, "src")],
                exclude: /(node_modules|bower_components)/,
                // import modules from three.js with es6 modules rule
                // but not working ===========. TODO
                // query: {
                //     compact: true,
                //     presets: [
                //         ['es2015', { modules: false }]
                //     ]
                // },
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "react", "stage-0"]
                    }
                }
            },

            // for css
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            }
            // pre eslint code not working ============. TODO
            // {
            //     test: /\.js$/,l
            //     enforce: 'post',
            //     loader: 'eslint-loader',
            //     options: {
            //         emitWarning: true
            //     }
            // },
            //======== threejs shader hmr ====== MY
            // allow third-party glslify/browserify modules to work
            // {
            //     test: /node_modules/,
            //     loader: 'ify-loader',
            //     // enforce: 'post'

            // },
            // allow local glslify/browserify config to work
            // {
            //     test: /\.js$/,
            //     loader: 'ify-loader',
            //     enforce: 'post'

            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "",

            //mini html
            // minitfy: {
            //     collapseWhitespace: true
            // },
            // hash every changes of js file
            hash: true,
            template: "./src/index.html"
        }),
        // copy all static files not working yet ============. TODO
        // new CopyWebpackPlugin([
        //     { from: 'src/assets' ,to:'assets'}
        // ]),
        // hmr
        new webpack.HotModuleReplacementPlugin(),
        // js minimize not working ==================  TODO
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize:true,
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.NamedModulesPlugin()
    ]
};
