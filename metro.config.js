const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

const config = getDefaultConfig(__dirname);

// Keep class names + no mangle so Expo web modules don't throw "Module implementation must be a class"
config.transformer = config.transformer || {};
config.transformer.minifierConfig = {
  keep_classnames: true,
  keep_fnames: true,
  mangle: false,
  compress: { keep_classnames: true, keep_fnames: true },
};

// Fix: resolve react-native-web/dist/index on web (Windows/module resolution)
const rnwRoot = path.dirname(require.resolve('react-native-web/package.json'));
config.resolver = config.resolver || {};
const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && moduleName.startsWith('react-native-web/dist/')) {
    const subPath = moduleName.replace('react-native-web/dist/', '');
    const withoutExt = subPath.endsWith('.js') ? subPath.slice(0, -3) : subPath;
    const candidate = path.join(rnwRoot, 'dist', withoutExt + '.js');
    if (fs.existsSync(candidate)) {
      return { type: 'sourceFile', filePath: candidate };
    }
  }
  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
