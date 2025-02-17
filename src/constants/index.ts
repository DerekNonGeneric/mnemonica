'use strict';

// names
const MNEMONICA = 'Mnemonica';

// O Great Mnemosyne! Please!
// Save us from Oblivion...
// https://en.wikipedia.org/wiki/Mnemosyne
const MNEMOSYNE = 'Mnemosyne';

// Gaia - Wikipedia
// https://en.wikipedia.org/wiki/Gaia
const GAIA = 'Gaia';
const URANUS = 'Uranus';

// symbols
const SymbolDefaultTypesCollection = Symbol( `default ${MNEMONICA} types collection` );
const SymbolParentType = Symbol( 'Parent of this SubType Collection' );
const SymbolConstructorName = Symbol( 'Defined Constructor Name' );

// SymbolGaia means we are reached prototype chain root
const SymbolGaia = Symbol( 'Defined Gaia Constructor' );
const SymbolReplaceUranus = Symbol( 'Defined Method Name to Replace Gaia' );

const SymbolConfig = Symbol( 'Mnemonica Config Data' );
const SymbolUsed = Symbol( '.prototype used twice' );

// etc...
const TYPE_TITLE_PREFIX = 'modificator of : ';

// errors
const ErrorMessages = {

	BASE_ERROR_MESSAGE         : 'UNPREDICTABLE BEHAVIOUR',
	TYPENAME_MUST_BE_A_STRING  : 'typename must be a string',
	HANDLER_MUST_BE_A_FUNCTION : 'handler must be a function',
	WRONG_TYPE_DEFINITION      : 'wrong type definition',
	WRONG_INSTANCE_INVOCATION  : 'wrong instance invocation',
	WRONG_MODIFICATION_PATTERN : 'wrong modification pattern',
	ALREADY_DECLARED           : 'this type has already been declared',
	// EXISTENT_PROPERTY_REDEFINITION : 'attempt to re-define type constructor',
	WRONG_ARGUMENTS_USED       : 'wrong arguments : should use proper invocation',
	WRONG_HOOK_TYPE            : 'this hook type does not exist',
	MISSING_HOOK_CALLBACK      : 'hook definition requires callback',
	MISSING_CALLBACK_ARGUMENT  : 'callback is required argument',
	FLOW_CHECKER_REDEFINITION  : 'attempt to re-define flow checker callback',
	OPTIONS_ERROR              : 'options must be an object or a string',
	WRONG_STACK_CLEANER        : 'wrong stack cleaner instanceof',
	PROTOTYPE_USED_TWICE       : '.prototype used twice',

};

import ModificationConstructor from '../api/types/createInstanceModificator';

const defaultOptions = {

	get ModificationConstructor () {
		return ModificationConstructor;
	},

	// shall or not we use strict checking
	// for creation sub-instances Only from current type
	// or we might use up-nested sub-instances from chain
	get strictChain () {
		return true;
	},

	// should we use forced errors checking
	// to make all inherited types errored
	// if there is an error somewhere in chain
	// disallow instance construction
	// if there is an error in prototype chain
	get blockErrors () {
		return true;
	},

	// if it is necessary to collect stack
	// as a __stack__ prototype property
	// during the process of instance creation
	get submitStack () {
		return false;
	},

	// await new Constructor()
	// must return value
	// optional ./issues/106
	get awaitReturn () {
		return true;
	},

} as Record<string, unknown>;

export const constants = {

	get 'SymbolParentType' () {
		return SymbolParentType;
	},

	get 'SymbolConstructorName' () {
		return SymbolConstructorName;
	},

	get 'SymbolGaia' () {
		return SymbolGaia;
	},

	get 'SymbolReplaceUranus' () {
		return SymbolReplaceUranus;
	},

	get 'SymbolDefaultTypesCollection' () {
		return SymbolDefaultTypesCollection;
	},

	get 'SymbolConfig' () {
		return SymbolConfig;
	},

	get 'SymbolUsed' () {
		return SymbolUsed;
	},

	// constants
	get 'MNEMONICA' () {
		return MNEMONICA;
	},
	get 'MNEMOSYNE' () {
		return MNEMOSYNE;
	},
	get 'GAIA' () {
		return GAIA;
	},
	get 'URANUS' () {
		return URANUS;
	},
	get 'odp' () {
		return ( o: any, p: PropertyKey, attributes: PropertyDescriptor & ThisType<any> ): any => {
			return Object.defineProperty( o, p, attributes );
		};
	},

	get 'defaultOptions' () {
		return defaultOptions;
	},

	get 'defaultOptionsKeys' () {
		return Object.keys( defaultOptions );
	},

	TYPE_TITLE_PREFIX,

	ErrorMessages,

};
