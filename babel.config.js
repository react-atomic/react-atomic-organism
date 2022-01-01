module.exports = function(api) {
  api.cache(true);
  return {
    env: {
      cjs: {
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
          'reshow-object-to-json-parse',
          'transform-react-pure-class-to-function',
          ['transform-react-remove-prop-types', {mode: 'wrap'}],
          [
            'reshow-transform-runtime',
            {
              regenerator: false,
              version: "7.16.7",
            },
          ],
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-transform-react-constant-elements',
          '@babel/plugin-transform-object-assign',
          '@babel/plugin-proposal-export-default-from',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-proposal-nullish-coalescing-operator',
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
          'reshow-object-to-json-parse',
          'transform-react-pure-class-to-function',
          ['transform-react-remove-prop-types', {mode: 'wrap'}],
          [
            'reshow-transform-runtime',
            {
              regenerator: false,
              useESModules: true,
              version: "7.16.7",
            },
          ],
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-transform-object-assign',
          '@babel/plugin-transform-react-constant-elements',
          '@babel/plugin-proposal-export-default-from',
          '@babel/plugin-proposal-nullish-coalescing-operator',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-proposal-class-properties',
        ],
      },
    },
  };
};
