const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CSSExtract = new ExtractTextPlugin('styles.css');//pass the name of the output css file
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'test'){
  require('dotenv').config({ path: '.env.test' });
}
else if(process.env.NODE_ENV === 'development'){
  require('dotenv').config({ path: '.env.development' });
}

module.exports = {
 entry: ['babel-polyfill', './src/app.js'],
 output: {
   path: path.join(__dirname, 'public', 'dist'),
   filename: 'bundle.js'
 },
 module:{
   rules: [{
     loader: 'babel-loader',
     test: /\.js$/, //Regex for only JS files to be passed through babel and node_modules dont need to be passed through babel
     exclude: /node_modules/
   },{
     test: /\.s?css/,
     use: CSSExtract.extract({
       use: [
         {
           loader: 'css-loader',
           options: {
             sourceMap: true
           }
         },
         {
           loader: 'sass-loader',
           options: {
             sourceMap: true
           }
         }
       ]
     }) //use is the array for multiple loaders instead of the loader for babel-loader like above
   }]
 },
 plugins: [
   CSSExtract,
   new webpack.DefinePlugin({
   'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
   'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
   'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
   'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
   'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
   'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
 })
]
};
