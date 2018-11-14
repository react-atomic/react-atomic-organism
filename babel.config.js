module.exports = function(api) {
  api.cache(true);
  return {
    env: {
      build: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: ['last 2 versions', 'ie >= 8'],
            },
          ],
          '@babel/preset-react',
        ],
        plugins: [
          'add-module-exports',
          'dynamic-import-node',
          'transform-react-pure-class-to-function',
          ['transform-react-remove-prop-types', {mode: 'wrap'}],
          [
            'reshow-transform-runtime',
            {
              regenerator: false,
            },
          ],
          '@babel/plugin-proposal-export-default-from',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-transform-react-constant-elements',
          '@babel/plugin-transform-object-assign',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-class-properties',
        ],
      },
      es: {
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              targets: ['last 2 versions', 'ie >= 8'],
            },
          ],
          '@babel/preset-react',
        ],
        plugins: [
          'transform-react-pure-class-to-function',
          ['transform-react-remove-prop-types', {mode: 'wrap'}],
          [
            'reshow-transform-runtime',
            {
              regenerator: false,
              useESModules: true,
            },
          ],
          '@babel/plugin-proposal-export-default-from',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-transform-object-assign',
          '@babel/plugin-transform-react-constant-elements',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-class-properties',
        ],
      },
    },
  };
};
