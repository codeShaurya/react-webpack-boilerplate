const webpackMerge = require('webpack-merge');

const modeConfig = (env) => {
  let mode = env;
  if (env === 'development') {
    mode = 'dev';
  }
  return require(`./webpack.config.${mode}`)(env);
};

module.exports = (
  { mode, presets } = { mode: 'production', presets: [] },
) => webpackMerge({ mode }, modeConfig(mode));
