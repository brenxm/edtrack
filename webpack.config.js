const path = require("path");

module.exports = {
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(jpg|jpeg|png|svg|gif)$/i,
                type: "asset/resource"
            },
            {
                test: /\.tff$/i,
                type: "asset/resource"
            }

        ]
    },
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    devtool: "inline-source-map",
    devServer: {
        static: "./dist"
    }
}