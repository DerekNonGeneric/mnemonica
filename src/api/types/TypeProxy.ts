/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict';

import { ConstructorFunction } from '../../types';


import TypesUtils from '../utils';
const {
	checkProto,
} = TypesUtils;

import { hop } from '../../utils/hop';

import { ErrorsTypes } from '../../descriptors/errors';
const {
	WRONG_TYPE_DEFINITION,
} = ErrorsTypes;

import mnemosynes from './Mnemosyne';
const { createMnemosyne, getDefaultPrototype } = mnemosynes;

import { InstanceCreator } from './InstanceCreator';

import { /* _getProps, Props, */ TypeDef } from './Props';

export const TypeProxy = function (__type__: any, Uranus: unknown) {
	Object.assign(this, {
		__type__,
		Uranus
	});
	const typeProxy = new Proxy(InstanceCreator, this);
	return typeProxy;
} as ConstructorFunction<any>;

TypeProxy.prototype.get = function (target: any, prop: keyof TypeDef) {

	// const props = _getProps(this) as Props;

	const {
		__type__: type
	} = this;

	// prototype of proxy
	// const instance = Reflect.getPrototypeOf(receiver);

	if (prop === 'prototype') {
		return type.proto;
	}

	const propDeclaration = type[ prop ];
	if (propDeclaration) {
		return propDeclaration;
	}

	// used for existent props with value
	// undefined || null || false
	if (hop(type, prop)) {
		return propDeclaration;
	}

	// SomeType.SomeSubType
	if (type.subtypes.has(prop)) {
		return type.subtypes.get(prop);
	}

	return Reflect.get(target, prop);

};

TypeProxy.prototype.set = function (__: any, name: string, value: any) {

	const {
		__type__: type
	} = this;

	// is about setting a prototype to Type
	if (name === 'prototype') {
		checkProto(value);
		Object.assign(type.proto, value);
		return true;
	}

	if (typeof name !== 'string' || !name.length) {
		throw new WRONG_TYPE_DEFINITION('should use non empty string as TypeName');
	}

	if (typeof value !== 'function') {
		throw new WRONG_TYPE_DEFINITION('should use function for type definition');
	}

	const TypeName = name;
	const Constructor = value;

	type.define(TypeName, Constructor);
	return true;

};


TypeProxy.prototype.apply = function (__: unknown, Uranus: unknown, args: unknown[]) {
	const type = this.__type__;
	let instance = null;
	if (Uranus) {
		const InstanceCreatorProxy = new TypeProxy(type, Uranus);
		instance = new InstanceCreatorProxy(...args);
	} else {
		instance = this.construct(null, args);
	}
	return instance;
};


// this always is initial type creation ...
// so no way to invoke this otherwise than direct type call
TypeProxy.prototype.construct = function (__: unknown, args: unknown[]) {

	// new.target id equal with target here

	const {
		__type__: type,
		Uranus
	} = this;

	// so this is a direct Sub-Type invocation
	// having no existentInstance created earlier
	// then we should rely on that somehow
	const uranus = type.isSubType ? getDefaultPrototype() : Uranus;	

	// "this" argument may be passed for tracking why something happened
	// but uncomment it there in createMnemosyne if needed
	// const mnemosyneProxy = createMnemosyne(uranus, this);
	const mnemosyneProxy = createMnemosyne(uranus);
	const instance = new InstanceCreator( type, mnemosyneProxy, args );

	// const instance = new InstanceCreator(type, null, args);
	return instance;

};
