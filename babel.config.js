module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-class-properties', {loose: false}],
    'react-native-reanimated/plugin',
  ],
  assumptions: {
    setPublicClassFields: false,
    useDefineForClassFields: true,
  },
};
