const {
	defineConfig,
	globalIgnores,
} = require('eslint/config');

const tsParser = require('@typescript-eslint/parser');
const globals = require('globals');

const mocha = require('eslint-plugin-mocha');

const noArrowThis = require('eslint-plugin-no-arrow-this');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const js = require('@eslint/js');

const {
	FlatCompat,
} = require('@eslint/eslintrc');

const compat = new FlatCompat({
	baseDirectory     : __dirname,
	recommendedConfig : js.configs.recommended,
	allConfig         : js.configs.all
});

module.exports = defineConfig([ {
	languageOptions : {
		parser : tsParser,

		globals : {
			...globals.node,
			...globals.mocha,
		},

		ecmaVersion   : 2018,
		sourceType    : 'module',
		parserOptions : {},
	},

	extends : compat.extends(
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	),

	plugins : {
		mocha,
		'no-arrow-this'      : noArrowThis,
		'@typescript-eslint' : typescriptEslint,
	},

	rules : {
		'indent' : [ 'error', 'tab' ],

		'key-spacing' : [ 'warn', {
			beforeColon : true,
			afterColon  : true,
			align       : 'colon',
		} ],

		'linebreak-style'                   : [ 'error', 'unix' ],
		'quotes'                            : [ 'error', 'single' ],
		'semi'                              : [ 'error', 'always' ],
		'no-unused-vars'                    : 'off',
		'@typescript-eslint/no-unused-vars' : 'error',

		'no-shadow' : [ 'error', {
			builtinGlobals : true,
			hoist          : 'all',
			allow          : [],
		} ],

		'array-bracket-spacing'     : [ 'error', 'always' ],
		'computed-property-spacing' : [ 'error', 'always' ],
		'object-curly-spacing'      : [ 'error', 'always' ],

		'space-before-function-paren' : [ 'error', {
			'anonymous'  : 'always',
			'named'      : 'always',
			'asyncArrow' : 'always',
		} ],

		'prefer-template'          : 'warn',
		'prefer-spread'            : 'warn',
		'no-useless-concat'        : 'warn',
		'prefer-rest-params'       : 'warn',
		'prefer-destructuring'     : 'warn',
		'no-useless-computed-key'  : 'warn',
		'no-useless-constructor'   : 'warn',
		'no-useless-rename'        : 'warn',
		'no-this-before-super'     : 'warn',
		'no-new-symbol'            : 'warn',
		'no-duplicate-imports'     : 'warn',
		'no-confusing-arrow'       : 'warn',
		'no-multi-assign'          : 'warn',
		'no-lonely-if'             : 'warn',
		'newline-per-chained-call' : 'warn',
		'func-name-matching'       : 'error',

		'line-comment-position' : [ 'warn', {
			position : 'above',
		} ],

		
		'@typescript-eslint/no-var-requires'   : 'off',
		'@typescript-eslint/no-empty-function' : 'off',
		'@typescript-eslint/no-explicit-any'   : 'off',
		
		// "no-arrow-this/no-arrow-this": "error",
		'@typescript-eslint/no-require-imports' : 'off',
		'new-cap'                               : 'off',
		
		yoda : 'warn',

	},
}, {
	files : [ 'build/**/*.js' ],

	rules : {
		'no-multi-assign'                  : 0,
		'@typescript-eslint/no-this-alias' : 0,
		'prefer-destructuring'             : 0,
		'new-cap'                          : 0,
	},
}, globalIgnores([
	'test/example.js',
	'test/decorate.js',
	// 'test/decorate.ts',
	'test/*.js',
	'test/*.ts',
	'test-ts/**.*',
	'test-jest/**.*',
	// 'build/**/*.d.ts',
	'build/**/*',
	'**/.eslintrc.js',
	'eslint.config.js',
]) ]);
