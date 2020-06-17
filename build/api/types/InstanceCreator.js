'use strict';
Object.defineProperty(exports, '__esModule', { value : true });
exports.InstanceCreator = exports.makeInstanceModificator = void 0;
const constants_1 = require('../../constants');
const { odp, SymbolReplaceGaia, SymbolConstructorName, } = constants_1.constants;
const errors_1 = require('../../descriptors/errors');
const { WRONG_MODIFICATION_PATTERN, BASE_MNEMONICA_ERROR } = errors_1.ErrorsTypes;
const utils_1 = require('./utils');
const { getModificationConstructor, getExistentAsyncStack, makeFakeModificatorType } = utils_1.default;
const errors_2 = require('../errors');
exports.makeInstanceModificator = (self) => {
	const { ModificationConstructor, existentInstance, ModificatorType, proto, } = self;
	return ModificationConstructor.call(existentInstance, ModificatorType, Object.assign({}, proto), (__proto_proto__) => {
		self.__proto_proto__ = __proto_proto__;
		proceedProto.call(self);
	});
};
const throwModificationError = function (error) {
	const self = this;
	const { TypeName, type: { stack: typeStack } } = self;
	self.ModificatorType = makeFakeModificatorType(TypeName);
	self.InstanceModificator = exports.makeInstanceModificator(self);
	const erroredInstance = new self.InstanceModificator();
	erroredInstance[SymbolReplaceGaia](error);
	const stack = [];
	if (error instanceof BASE_MNEMONICA_ERROR) {
		stack.push(error.stack);
	}
	else {
		const title = `\n<-- creation of [ ${TypeName} ] traced -->`;
		errors_2.getStack.call(erroredInstance, title, [], throwModificationError);
		stack.push(...erroredInstance.stack);
		const errorStack = error.stack.split('\n');
		stack.push('<-- with the following error -->');
		errorStack.forEach((line) => {
			if (!stack.includes(line)) {
				stack.push(line);
			}
		});
		stack.push('\n<-- of constructor definitions stack -->');
		stack.push(...typeStack);
	}
	erroredInstance.stack = errors_2.cleanupStack(stack).join('\n');
	self.inheritedInstance = erroredInstance;
	const results = self.invokePostHooks();
	const { type, collection, namespace } = results;
	if (type.has(true) || collection.has(true) || namespace.has(true)) {
		return;
	}
	throw erroredInstance;
};
const addProps = function () {
	const self = this;
	const { type, existentInstance, args, config: { submitStack }, __proto_proto__: proto } = self;
	const { namespace, collection, subtypes, } = type;
	odp(proto, '__proto_proto__', {
		get () {
			return proto;
		}
	});
	odp(proto, '__args__', {
		get () {
			return args;
		}
	});
	odp(proto, '__collection__', {
		get () {
			return collection;
		}
	});
	odp(proto, '__namespace__', {
		get () {
			return namespace;
		}
	});
	odp(proto, '__subtypes__', {
		get () {
			return subtypes;
		}
	});
	odp(proto, '__type__', {
		get () {
			return type;
		}
	});
	odp(proto, '__parent__', {
		get () {
			return existentInstance;
		}
	});
	if (submitStack) {
		const { stack } = this;
		odp(proto, '__stack__', {
			get () {
				return stack.join('\n');
			}
		});
	}
	odp(proto, '__creator__', {
		get () {
			return self;
		}
	});
	const timestamp = Date.now();
	odp(proto, '__timestamp__', {
		get () {
			return timestamp;
		}
	});
};
const undefineParentSubTypes = function () {
	const self = this;
	const { __proto_proto__: proto, existentInstance: { __subtypes__: subtypes } } = self;
	if (!subtypes) {
		return;
	}
	const unscopables = {};
	[...subtypes.keys()].forEach((name) => {
		odp(proto, name, {
			get () {
				return undefined;
			}
		});
		unscopables[name] = true;
	});
	proto[Symbol.unscopables] = unscopables;
};
const proceedProto = function () {
	const self = this;
	self.addProps();
	if (self.config.strictChain) {
		self.undefineParentSubTypes();
	}
};
const invokePreHooks = function () {
	const { type, existentInstance, args, InstanceModificator } = this;
	const { namespace, collection, } = type;
	const hookData = {
		type,
		existentInstance,
		args,
		InstanceModificator
	};
	namespace.invokeHook('preCreation', hookData);
	collection.invokeHook('preCreation', hookData);
	type.invokeHook('preCreation', hookData);
};
const invokePostHooks = function () {
	const creator = this;
	const { inheritedInstance, } = creator;
	const { __type__: type, __parent__: existentInstance, __args__: args, } = inheritedInstance;
	const { namespace, collection, } = type;
	const hookType = inheritedInstance instanceof Error ?
		'creationError' : 'postCreation';
	const hookData = {
		type,
		existentInstance,
		inheritedInstance,
		args,
		creator
	};
	return {
		type       : type.invokeHook(hookType, hookData),
		collection : collection.invokeHook(hookType, hookData),
		namespace  : namespace.invokeHook(hookType, hookData)
	};
};
const bindMethod = (instance, name, MethodItself) => {
	odp(instance, name, {
		get () {
			const addTo = this;
			return function (...args) {
				const applicateTo = this || addTo;
				if (new.target) {
					return new MethodItself(...args);
				}
				return MethodItself.call(applicateTo, ...args);
			};
		}
	});
};
const makeMethodBind = function () {
	const self = this;
	const { inheritedInstance, proto, } = self;
	Object.entries(Reflect.getPrototypeOf(inheritedInstance)).forEach((entry) => {
		const [name, MayBeMethodFunction] = entry;
		if (name === 'constructor') {
			return;
		}
		if (MayBeMethodFunction instanceof Function && proto[name] instanceof Function) {
			bindMethod(inheritedInstance, name, MayBeMethodFunction);
		}
	});
};
const postProcessing = function (continuationOf) {
	const self = this;
	const { stack, config: { bindedProto }, } = self;
	if (!self.inheritedInstance.constructor) {
		const msg = 'should inherit from mnemonica instance';
		self.throwModificationError(new WRONG_MODIFICATION_PATTERN(msg, stack));
	}
	if (!self.inheritedInstance.constructor[SymbolConstructorName]) {
		const msg = 'should inherit from mnemonica instance';
		self.throwModificationError(new WRONG_MODIFICATION_PATTERN(msg, stack));
	}
	if (continuationOf && !(self.inheritedInstance instanceof continuationOf)) {
		const icn = self.inheritedInstance.constructor.name;
		const msg = `should inherit from ${continuationOf.TypeName} but got ${icn}`;
		self.throwModificationError(new WRONG_MODIFICATION_PATTERN(msg, stack));
	}
	odp(self.inheritedInstance, '__self__', {
		get () {
			return self.inheritedInstance;
		}
	});
	self.invokePostHooks();
	if (bindedProto) {
		self.makeMethodBind();
	}
};
const addThen = function (then) {
	const self = this;
	self.inheritedInstance = self.inheritedInstance
		.then(() => {
			self.inheritedInstance =
            new exports.InstanceCreator(then.subtype, self.inheritedInstance, then.args, true);
			return self.inheritedInstance;
		});
};
const makeWaiter = function (type, then) {
	const self = this;
	self.inheritedInstance = self.inheritedInstance
		.then((instance) => {
			if (typeof instance !== 'object') {
				if (self.config.awaitReturn) {
					const msg = `should inherit from ${type.TypeName}: seems async ${type.TypeName} has no return statement`;
					throw new WRONG_MODIFICATION_PATTERN(msg, self.stack);
				}
				else {
					return instance;
				}
			}
			if (!(instance instanceof self.type)) {
				const icn = instance.constructor.name;
				const msg = `should inherit from ${type.TypeName} but got ${icn}`;
				throw new WRONG_MODIFICATION_PATTERN(msg, self.stack);
			}
			self.inheritedInstance = instance;
			if (self.inheritedInstance.__self__ !== self.inheritedInstance) {
				self.postProcessing(type);
			}
			return self.inheritedInstance;
		})
		.catch((error) => {
			if (self.config.blockErrors) {
				self.throwModificationError(error);
			}
			else {
				throw error;
			}
		});
	if (then) {
		self.addThen(then);
	}
	type.subtypes.forEach((subtype, name) => {
		self.inheritedInstance[name] = (...args) => {
			self.inheritedInstance = self.makeWaiter(subtype, {
				name,
				subtype,
				args,
			});
			return self.inheritedInstance;
		};
	});
	return self.inheritedInstance;
};
const InstanceCreatorPrototype = {
	getExistentAsyncStack,
	postProcessing,
	bindMethod,
	makeMethodBind,
	makeWaiter,
	proceedProto,
	addProps,
	addThen,
	undefineParentSubTypes,
	invokePreHooks,
	invokePostHooks,
	throwModificationError
};
exports.InstanceCreator = function (type, existentInstance, args, chained) {
	const { constructHandler, proto, config, TypeName } = type;
	const { useOldStyle, blockErrors, submitStack } = config;
	const self = this;
	const ModificationConstructor = getModificationConstructor(useOldStyle);
	const ModificatorType = constructHandler();
	Object.assign(self, {
		type,
		TypeName,
		existentInstance,
		get args () {
			return args;
		},
		ModificationConstructor,
		ModificatorType,
		config,
		proto
	});
	if (submitStack || chained) {
		const stackAddition = chained ? self.getExistentAsyncStack(existentInstance) : [];
		const title = `\n<-- creation of [ ${TypeName} ] traced -->`;
		if (submitStack) {
			errors_2.getStack.call(self, title, stackAddition);
		}
		else {
			self.stack = title;
		}
	}
	if (blockErrors && existentInstance instanceof Error) {
		self.ModificatorType = makeFakeModificatorType(TypeName);
		self.InstanceModificator = exports.makeInstanceModificator(self);
		throw new self.InstanceModificator(...args);
	}
	self.invokePreHooks();
	self.InstanceModificator = exports.makeInstanceModificator(self);
	if (blockErrors) {
		try {
			self.inheritedInstance = new self.InstanceModificator(...args);
		}
		catch (error) {
			self.throwModificationError(error);
		}
	}
	else {
		self.inheritedInstance = new self.InstanceModificator(...args);
	}
	if (self.inheritedInstance instanceof Promise) {
		const waiter = self.makeWaiter(type);
		odp(waiter, SymbolConstructorName, {
			get () {
				return TypeName;
			}
		});
		return waiter;
	}
	self.postProcessing(type);
	return self.inheritedInstance;
};
Object.assign(exports.InstanceCreator.prototype, InstanceCreatorPrototype);