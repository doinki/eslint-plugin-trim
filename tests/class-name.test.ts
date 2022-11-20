import { RuleTester } from 'eslint';

import className from '../src/lib/rules/class-name';

(RuleTester as any).setDefaultConfig({
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
});

const ruleTester = new RuleTester();

ruleTester.run('class-name', className, {
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
    `<div className={\`flex \${isTrue() ? "items-center" : "justify-center"}\`}></div>`,
    `<div className={\`flex \${isTrue() ? 'items-center' : 'justify-center'}\`}></div>`,
  ],
  invalid: [
    {
      code: `<div className=" "></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className=""></div>`,
    },
    {
      code: `<div className=' '></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className=''></div>`,
    },
    {
      code: `<div className="flex "></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className="flex"></div>`,
    },
    {
      code: `<div className='flex '></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className='flex'></div>`,
    },
    {
      code: `<div className=" flex"></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className="flex"></div>`,
    },
    {
      code: `<div className=' flex'></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className='flex'></div>`,
    },
    {
      code: `<div className="flex  items-center"></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className="flex items-center"></div>`,
    },
    {
      code: `<div className='flex  items-center'></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className='flex items-center'></div>`,
    },
    {
      code: `<div className={" "}></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className={""}></div>`,
    },
    {
      code: `<div className={' '}></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className={''}></div>`,
    },
    {
      code: `<div className={isTrue() ? "flex " : " items-center"}></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className={isTrue() ? "flex" : "items-center"}></div>`,
    },
    {
      code: `<div className={isTrue() ? 'flex ' : ' items-center'}></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className={isTrue() ? 'flex' : 'items-center'}></div>`,
    },
    {
      code: `<div className={true && "flex "}></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className={true && "flex"}></div>`,
    },
    {
      code: `<div className={true && 'flex '}></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className={true && 'flex'}></div>`,
    },
    {
      code: `<div className={clsx("flex ", " items-center")}></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className={clsx("flex", "items-center")}></div>`,
    },
    {
      code: `<div className={clsx('flex ', ' items-center')}></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className={clsx('flex', 'items-center')}></div>`,
    },
    {
      code: `<div className={clsx([["flex "], " items-center"])}></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className={clsx([["flex"], "items-center"])}></div>`,
    },
    {
      code: `<div className={clsx([['flex '], ' items-center'])}></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className={clsx([['flex'], 'items-center'])}></div>`,
    },
    {
      code: `<div className={clsx({ "flex ": isTrue() })}></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className={clsx({ "flex": isTrue() })}></div>`,
    },
    {
      code: `<div className={clsx({ 'flex ': isTrue() })}></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className={clsx({ 'flex': isTrue() })}></div>`,
    },
    {
      code: `<div className={\`flex \${isTrue() ? "items-center " : " justify-center "}\`}></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className={\`flex \${isTrue() ? "items-center" : "justify-center"}\`}></div>`,
    },
    {
      code: `<div className={\`flex \${isTrue() ? 'items-center ' : ' justify-center '}\`}></div>`,
      errors: [
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
        {
          message: 'className must be trimmed',
          type: 'Literal',
        },
      ],
      output: `<div className={\`flex \${isTrue() ? 'items-center' : 'justify-center'}\`}></div>`,
    },
  ],
});
