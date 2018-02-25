const { join } = require('path')

const paths = {
  root: join(__dirname, '..'),
  src: join(__dirname, '..', 'src'),
  dist: join(__dirname, '..', 'dist'),
  public: join(__dirname, '..', 'public'),
  modules: join(__dirname, '..', 'node_modules')
}

module.exports = {
  paths,

  entry: {
    main: join(paths.src, 'index')
  },

  output: {
    path: paths.dist,
    filename: '[name]-[chunkhash].js'
  },

  htmlPluginConfig: {
    title: 'Empresas com Churrasco Garantido',
    template: join(paths.root, 'public', 'index.html')
  },

  jsLoader: {
    test: /\.js$/,
    exclude: paths.modules,
    include: paths.src,
    use: 'babel-loader'
  },

  stylusLoader: {
    test: /\.styl$/,
    exclude: paths.modules,
    include: paths.src,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        query: {
          modules: true,
          sourceMap: true,
          localIdentName: '[name]--[local]--[hash:base64:8]'
        }
      },
      {
        loader: 'stylus-loader',
        options: {
          preferPathResolver: 'webpack'
        }
      }
    ]
  },

  fileLoader: {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|txt)(\?.*)?$/,
    include: paths.publicsrc,
    use: {
      loader: 'file-loader',
      options: {
        name: 'media/[name].[hash:8].[ext]'
      }
    }
  },

  urlLoader: {
    test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
    include: paths.public,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:8].[ext]'
      }
    }
  },

  resolve: {
    alias: {
      src: paths.src,
      css: join(paths.src, 'css'),
      components: join(paths.src, 'components'),
      styles: join(paths.src, 'styles'),
      utils: join(paths.src, 'utils'),
      'redux-flow': join(paths.src, 'redux-flow')
    }
  }
}
