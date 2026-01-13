module.exports = function (api) {
  // Cache based on environment to avoid stale config during development
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // react-native-reanimated plugin'i EN SON olmalı
      "react-native-reanimated/plugin",
    ],
  };
};
