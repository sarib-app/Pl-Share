/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  dependencies: {
    "react-native-pusher-push-notifications": { 
        platforms: {
            android: null // this skips autolink for android
        }
    }
}
};
