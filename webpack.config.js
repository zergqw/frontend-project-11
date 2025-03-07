import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  // eslint-disable-next-line no-undef
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {   test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.scss$/, 
        use: [
          'style-loader', 
          'css-loader', 
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                quietDeps: true, // Не выводить предупреждения о депрекации
              },
            },
          }, 
          'postcss-loader'
        ],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        use: 'url-loader?limit=10000',
      },
      {   
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  output: {
    clean: true,
  },
};