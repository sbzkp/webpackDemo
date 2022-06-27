const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const webpack = require('webpack');
const options = { };
// webpack中的 各个chunk 是通过webpack的图谱中的父子关系进行关联，
// CommonsChunkPlugin 是用来避免模块重复依赖， webpack4 以后，废弃了commonsChunkPlugin，取而代之的是optimization 的 splitChunks

// webpack5的 SplitChunksPlugin 是开箱即用，默认情况下，splitChunks只会影响到按需记载的chunks，修改initial chunks的话，会影响到
//项目html中 脚本标签的加载

// webpack 打包源代码时，我们需要知道原来的错误在哪里，sourceMap就是用来做这个事的

// 在package.json 中的webpack 命令加 watch ，这样如果我们修改了代码，webpack会自动编译，我们只需要刷新一下浏览器就可以
// 因此需要使用 webpack-dev-server
//1, npm install --save-dev webpack-dev-server

module.exports = {
	entry: {
		// 如果入口写了两个，那就会打包出来两个， 也就是默认只会根据入口，形成依赖图，只输出一个index.js
		// 这也是代码分离的其中一个方式，如果在index和print 里面都引入了math，那么math 就会打包到这两个文件中，这属于重复
		//打包，应该是打包一次，然后引入。 这个时候commonsChunkPlugin 派上用场了，
		// 
		index: './src/index.js',
   		print: './src/print.js',
		// app: './src/index.js'
	},
	output: {
		filename: '[name].[contenthash].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		clean: true,
		// assetModuleFilename: "asset",
		// publicPath: "./asset"
	},
	mode: "development",
	plugins: [
		new HtmlWebpackPlugin({
			title: "王剑锋",
			template: "./src/index.html"
		}),
		new webpack.optimize.CommonsChunkPlugin({
	       name: 'common' // 指定公共 bundle 的名称。
	    }),
		// 生成manifest
		new WebpackManifestPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.DefinePlugin({
		//     'process.env.NODE_ENV': JSON.stringify('production')
		// })
			
		// https://www.webpackjs.com/guides/hot-module-replacement/#%E5%90%AF%E7%94%A8-hmr 以便更容易查看要修补(patch)的依赖。
		// new webpack.NamedModulesPlugin(),

	],
	devtool: "inline-source-map",
	// 启用watch模式，在初始构建以后，webpack将需监听任何已解析文件的更改
	// webpack-dev-server，webpack-dev-middleware 默认开启该模式

	// 将 dist 目录下的文件 serve 到 localhost:8080 下
	// 也就是将资源作为 server 的可访问文件， 
	// output.path 下的文件是用来让webpack-dev-server访问的
	//访问路径：  http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 
	// start  在package.json 里面开启webpack-server

	//webpack-dev-server  提供了一个服务器，能够实时重新加载
	//在编译之后不会写入到任何输出文件。
	//而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中，就好像它们是挂载在 server 根路径上的真实文件一样。
	//如果你的页面希望在其他不同路径中找到 bundle 文件，则可以通过 dev server 配置中的 devMiddleware.publicPath 选项进行修改。


	// 外部扩展 Externals
	// 防止将某些import的包打包到bundle里面，而是在运行时(runtime），再去获取
	// 将一下代码放在index.html里面
	// 利用webpack HtmlWebpackPlugin 插件的template
	// <script src="https://code.jquery.com/jquery-3.1.0.js" integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk=" crossorigin="anonymous"></script>
	externals:{
		jquery: "jQuery"
	},
	devServer: {
		static: './dist',
		hot: true
	},
	optimization: {
		// 将 runtime代码拆分为一个单独的 chunk，也就是可以将runtime单独打包出来
		runtimeChunk: "single",
		// 这个是由于moduleId，打包出来的bundle会随着自身的module.id的变化而变化，但是我们不希望三方bundle的id变化，那就进行这个配置
		moduleIds: 'deterministic',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
};
