import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import NodemonWebpackPlugin from 'nodemon-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const devServer = (isDev) => 
  !isDev
    ? []
    : [
      new NodemonWebpackPlugin({
        script: './dist/server.js',
        watch: resolve('./dist'),
        ext: 'js,ts',
        execMap: {
          'ts': 'ts-node'
        }
      })
    ]

const esLintPlugin = (isDev) =>
  !isDev
    ? []
    : [
      new ESLintWebpackPlugin({
        extensions: ['ts', 'js']
      })
    ]

const config = ({ develop }) => ({
  mode: develop ? 'development' : 'production',
  target: 'node',
  entry: {
    main: './src/index.ts',
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  module: {
    rules: []
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...esLintPlugin(develop),
    ...devServer(develop)
  ],
});

export default config;