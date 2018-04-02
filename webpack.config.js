var path = require('path');

module.exports = {

    //define entry point
    entry: './client/src/index.tsx',
    //define output point
    output: {
        path: __dirname + '/client/dist/js',
        filename: 'app.js'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.tsx$/, use: 'ts-loader' },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            }
        ]
    },

    watch: true,
    mode: 'development'
};