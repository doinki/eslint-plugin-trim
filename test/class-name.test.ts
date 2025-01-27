import { RuleTester } from 'eslint';

import className from '../src/lib/rules/class-name';

const ERROR = { message: 'className must be trimmed', type: 'Literal' };

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

ruleTester.run('class-name', className, {
  invalid: [
    {
      code: `<div className=" "></div>`,
      errors: [ERROR],
      output: `<div className=""></div>`,
    },
    {
      code: `<div className=' '></div>`,
      errors: [ERROR],
      output: `<div className=''></div>`,
    },
    {
      code: `<div className="flex "></div>`,
      errors: [ERROR],
      output: `<div className="flex"></div>`,
    },
    {
      code: `<div className='flex '></div>`,
      errors: [ERROR],
      output: `<div className='flex'></div>`,
    },
    {
      code: `<div className=" flex"></div>`,
      errors: [ERROR],
      output: `<div className="flex"></div>`,
    },
    {
      code: `<div className=' flex'></div>`,
      errors: [ERROR],
      output: `<div className='flex'></div>`,
    },
    {
      code: `<div className="flex  items-center"></div>`,
      errors: [ERROR],
      output: `<div className="flex items-center"></div>`,
    },
    {
      code: `<div className='flex  items-center'></div>`,
      errors: [ERROR],
      output: `<div className='flex items-center'></div>`,
    },
    {
      code: `<div className={" "}></div>`,
      errors: [ERROR],
      output: `<div className={""}></div>`,
    },
    {
      code: `<div className={' '}></div>`,
      errors: [ERROR],
      output: `<div className={''}></div>`,
    },
    {
      code: `<div className={isTrue() ? "flex " : " items-center"}></div>`,
      errors: [ERROR, ERROR],
      output: `<div className={isTrue() ? "flex" : "items-center"}></div>`,
    },
    {
      code: `<div className={isTrue() ? 'flex ' : ' items-center'}></div>`,
      errors: [ERROR, ERROR],
      output: `<div className={isTrue() ? 'flex' : 'items-center'}></div>`,
    },
    {
      code: `<div className={true && "flex "}></div>`,
      errors: [ERROR],
      output: `<div className={true && "flex"}></div>`,
    },
    {
      code: `<div className={true && 'flex '}></div>`,
      errors: [ERROR],
      output: `<div className={true && 'flex'}></div>`,
    },
    {
      code: `<div className={clsx("flex ", " items-center")}></div>`,
      errors: [ERROR, ERROR],
      output: `<div className={clsx("flex", "items-center")}></div>`,
    },
    {
      code: `<div className={clsx('flex ', ' items-center')}></div>`,
      errors: [ERROR, ERROR],
      output: `<div className={clsx('flex', 'items-center')}></div>`,
    },
    {
      code: `<div className={clsx([["flex "], " items-center"])}></div>`,
      errors: [ERROR, ERROR],
      output: `<div className={clsx([["flex"], "items-center"])}></div>`,
    },
    {
      code: `<div className={clsx([['flex '], ' items-center'])}></div>`,
      errors: [ERROR, ERROR],
      output: `<div className={clsx([['flex'], 'items-center'])}></div>`,
    },
    {
      code: `<div className={clsx({ "flex ": isTrue() })}></div>`,
      errors: [ERROR],
      output: `<div className={clsx({ "flex": isTrue() })}></div>`,
    },
    {
      code: `<div className={clsx({ 'flex ': isTrue() })}></div>`,
      errors: [ERROR],
      output: `<div className={clsx({ 'flex': isTrue() })}></div>`,
    },
    {
      code: `<div className={clsx({ flex: ' flex' })}></div>`,
      errors: [ERROR],
      output: `<div className={clsx({ flex: 'flex' })}></div>`,
    },
    {
      code: `<div className={clsx({ ...classes, flex: ' flex' })}></div>`,
      errors: [ERROR],
      output: `<div className={clsx({ ...classes, flex: 'flex' })}></div>`,
    },
    {
      code: `<div className={clsx({ flex: ' flex', ...classes })}></div>`,
      errors: [ERROR],
      output: `<div className={clsx({ flex: 'flex', ...classes })}></div>`,
    },
    {
      code: `<div className={\`flex \${isTrue() ? "items-center " : " justify-center "}\`}></div>`,
      errors: [ERROR, ERROR],
      output: `<div className={\`flex \${isTrue() ? "items-center" : "justify-center"}\`}></div>`,
    },
    {
      code: `<div className={\`flex \${isTrue() ? 'items-center ' : ' justify-center '}\`}></div>`,
      errors: [ERROR, ERROR],
      output: `<div className={\`flex \${isTrue() ? 'items-center' : 'justify-center'}\`}></div>`,
    },
    {
      code: `<div class=" "></div>`,
      errors: [ERROR],
      output: `<div class=""></div>`,
    },
    {
      code: `<div class=' '></div>`,
      errors: [ERROR],
      output: `<div class=''></div>`,
    },
  ],
  valid: [
    `<div className=""></div>`,
    `<div className=''></div>`,
    `<div className="flex"></div>`,
    `<div className='flex'></div>`,
    `<div className="flex items-center"></div>`,
    `<div className='flex items-center'></div>`,
    `<div className={""}></div>`,
    `<div className={''}></div>`,
    `<div className={isTrue() ? "flex" : "items-center"}></div>`,
    `<div className={isTrue() ? 'flex' : 'items-center'}></div>`,
    `<div className={true && "flex"}></div>`,
    `<div className={true && 'flex'}></div>`,
    `<div className={clsx("flex", "items-center")}></div>`,
    `<div className={clsx('flex', 'items-center')}></div>`,
    `<div className={clsx([["flex"], "items-center"])}></div>`,
    `<div className={clsx([['flex'], 'items-center'])}></div>`,
    `<div className={clsx({ "flex": isTrue() })}></div>`,
    `<div className={clsx({ 'flex': isTrue() })}></div>`,
    `<div className={clsx({ flex: isTrue() })}></div>`,
    `<div className={clsx({ flex: 'flex' })}></div>`,
    `<div className={clsx({ ...classes, flex: 'flex' })}></div>`,
    `<div className={clsx({ flex: 'flex', ...classes })}></div>`,
    `<div className={\`flex \${isTrue() ? "items-center" : "justify-center"}\`}></div>`,
    `<div className={\`flex \${isTrue() ? 'items-center' : 'justify-center'}\`}></div>`,

    `<div class=""></div>`,
    `<div class=''></div>`,
    `<div class="flex"></div>`,
    `<div class='flex'></div>`,
    `<div class="flex items-center"></div>`,
    `<div class='flex items-center'></div>`,
  ],
});
