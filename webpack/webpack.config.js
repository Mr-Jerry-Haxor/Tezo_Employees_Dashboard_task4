const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        include: ["./TypeScript/index.ts" , "./TypeScript/addemployee.ts" , "./TypeScript/employee.ts" , "./TypeScript/data.ts"],
    },
    module: {
        rules: [
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: "ts-loader",
            include: [path.resolve(__dirname, 'TypeScript')],
        },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bundle'),
    },
};
