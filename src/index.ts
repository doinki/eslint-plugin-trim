import packageJson from '../package.json';
import argument from './lib/rules/argument';
import className from './lib/rules/class-name';

const meta = {
  name: packageJson.name,
  version: packageJson.version,
};
const rules = {
  argument,
  'class-name': className,
};

const recommendedRules = {
  'trim/argument': 'warn',
  'trim/class-name': 'warn',
};

const configs = {
  recommended: {
    plugins: ['trim'],
    rules: recommendedRules,
  },

  flat: {
    recommended: {
      name: 'trim/flat/recommended',
      plugins: {
        trim: {
          meta,
          rules,
        },
      },
      rules: recommendedRules,
    },
  },
};

const plugin = {
  meta,
  configs,
  rules,
};

export default plugin;
