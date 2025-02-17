'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
const MNEMONICA = 'Mnemonica';
const MNEMOSYNE = 'Mnemosyne';
const GAIA = 'Gaia';
const URANUS = 'Uranus';
const SymbolDefaultTypesCollection = Symbol(`default ${MNEMONICA} types collection`);
const SymbolParentType = Symbol('Parent of this SubType Collection');
const SymbolConstructorName = Symbol('Defined Constructor Name');
const SymbolGaia = Symbol('Defined Gaia Constructor');
const SymbolReplaceUranus = Symbol('Defined Method Name to Replace Gaia');
const SymbolConfig = Symbol('Mnemonica Config Data');
const SymbolUsed = Symbol('.prototype used twice');
const TYPE_TITLE_PREFIX = 'modificator of : ';
const ErrorMessages = {
    BASE_ERROR_MESSAGE: 'UNPREDICTABLE BEHAVIOUR',
    TYPENAME_MUST_BE_A_STRING: 'typename must be a string',
    HANDLER_MUST_BE_A_FUNCTION: 'handler must be a function',
    WRONG_TYPE_DEFINITION: 'wrong type definition',
    WRONG_INSTANCE_INVOCATION: 'wrong instance invocation',
    WRONG_MODIFICATION_PATTERN: 'wrong modification pattern',
    ALREADY_DECLARED: 'this type has already been declared',
    WRONG_ARGUMENTS_USED: 'wrong arguments : should use proper invocation',
    WRONG_HOOK_TYPE: 'this hook type does not exist',
    MISSING_HOOK_CALLBACK: 'hook definition requires callback',
    MISSING_CALLBACK_ARGUMENT: 'callback is required argument',
    FLOW_CHECKER_REDEFINITION: 'attempt to re-define flow checker callback',
    OPTIONS_ERROR: 'options must be an object or a string',
    WRONG_STACK_CLEANER: 'wrong stack cleaner instanceof',
    PROTOTYPE_USED_TWICE: '.prototype used twice',
};
const createInstanceModificator_1 = require("../api/types/createInstanceModificator");
const defaultOptions = {
    get ModificationConstructor() {
        return createInstanceModificator_1.default;
    },
    get strictChain() {
        return true;
    },
    get blockErrors() {
        return true;
    },
    get submitStack() {
        return false;
    },
    get awaitReturn() {
        return true;
    },
};
exports.constants = {
    get 'SymbolParentType'() {
        return SymbolParentType;
    },
    get 'SymbolConstructorName'() {
        return SymbolConstructorName;
    },
    get 'SymbolGaia'() {
        return SymbolGaia;
    },
    get 'SymbolReplaceUranus'() {
        return SymbolReplaceUranus;
    },
    get 'SymbolDefaultTypesCollection'() {
        return SymbolDefaultTypesCollection;
    },
    get 'SymbolConfig'() {
        return SymbolConfig;
    },
    get 'SymbolUsed'() {
        return SymbolUsed;
    },
    get 'MNEMONICA'() {
        return MNEMONICA;
    },
    get 'MNEMOSYNE'() {
        return MNEMOSYNE;
    },
    get 'GAIA'() {
        return GAIA;
    },
    get 'URANUS'() {
        return URANUS;
    },
    get 'odp'() {
        return (o, p, attributes) => {
            return Object.defineProperty(o, p, attributes);
        };
    },
    get 'defaultOptions'() {
        return defaultOptions;
    },
    get 'defaultOptionsKeys'() {
        return Object.keys(defaultOptions);
    },
    TYPE_TITLE_PREFIX,
    ErrorMessages,
};
//# sourceMappingURL=index.js.map