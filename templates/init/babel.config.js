module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '@app': './src/App.tsx',
          '@api': './src/api',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@constants': './src/constants',
          '@screens': './src/screens',
          '@images': './src/assets/images/index',
          '@svg': './src/assets/svg',
          '@store': './src/store',
          '@lottie': './src/assets/lottie',
        },
      },
    ],
  ],
};
