const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = "style-loader";

const config = {
  context: path.resolve(__dirname, "src"),
  entry: {
    index: {
      import: "./index.js",
      dependOn: ["polyfill"], // "app", "auth", "firestore", "performance"],
    },
    polyfill: "babel-polyfill",
    // app: "firebase/app",
    // auth: "firebase/auth",
    // firestore: "firebase/firestore",
    // performance: "firebase/performance",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  optimization: {
    runtimeChunk: "single",
  },
  devServer: {
    open: true,
    hot: false,
    liveReload: false,
    host: "localhost",
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      inject: "head",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "./", filter: (res) => !res.includes("html") }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.txt$/i,
        use: "raw-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
