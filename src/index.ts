import packageJson from '../package.json';
import argument from './lib/rules/argument';
import className from './lib/rules/class-name';

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
      plugins: {
        trim: {
          rules,
        },
      },
      rules: recommendedRules,
    },
  },
};

const plugin = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
  },
  configs,
  rules,
};

export default plugin;
