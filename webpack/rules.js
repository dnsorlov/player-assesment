module.exports = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader"
    }
  },
  {
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'stylus-loader',
        options: {},
      },
    ],
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  },
  {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  }

];
