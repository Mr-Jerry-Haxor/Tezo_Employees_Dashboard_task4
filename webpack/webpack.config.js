const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    entry: {
        include: [  "./TypeScript/index.ts" , 
                    "./TypeScript/addemployee.ts" , 
                    "./TypeScript/employee.ts", 
                    "./TypeScript/data.ts",

                    "./CSS/index.css",
                    "./CSS/addemployee.css",
                    "./CSS/employee.css",
                    "./CSS/addrole.css",
                    "./CSS/roles.css",
                    "./CSS/roledetails.css",
                    "./CSS/sidebar.css",
                ],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: "ts-loader",
                include: [path.resolve(__dirname, 'TypeScript')],
            },
            {
                test: /\.css$/i,
                use: [ MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js' ,  '.css', '.scss'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bundle'),
    },
    plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    }),
  ]
};