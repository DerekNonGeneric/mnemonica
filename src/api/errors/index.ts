'use strict';

import { constants } from '../../constants';

const {
	odp,
	SymbolConstructorName,
	MNEMONICA,
	ErrorMessages,
} = constants;

const {
	BASE_ERROR_MESSAGE
} = ErrorMessages;

export const stackCleaners: RegExp[] = [];

export const cleanupStack = ( stack: string[] ) => {
	const cleaned: string[] = stack.reduce( ( arr: string[], line: string ) => {
		stackCleaners.forEach( cleanerRegExp => {
			if ( !cleanerRegExp.test( line ) ) {
				arr.push( line );
			}
		} );
		return arr;
	}, [] );
	return cleaned.length ? cleaned : stack;
};

export const getStack = function ( this: any, title: string, stackAddition: string[], tillFunction?: CallableFunction ) {

	if ( Error.captureStackTrace ) {
		Error.captureStackTrace( this, tillFunction || getStack );
	} else {
		this.stack = ( new Error() ).stack;
	}

	this.stack = this.stack.split( '\n' ).slice( 1 );
	this.stack = cleanupStack( this.stack );

	this.stack.unshift( title );
	if ( Array.isArray( stackAddition ) && stackAddition.length ) {
		this.stack.push( ...stackAddition );
	}
	this.stack.push( '\n' );

	return this.stack;

};

export class BASE_MNEMONICA_ERROR extends Error {

	constructor ( message = BASE_ERROR_MESSAGE, additionalStack: string[] ) {

		super( message );
		const BaseStack: any = this.stack;
		odp( this, 'BaseStack', {
			get () {
				return BaseStack;
			}
		} );

		const stack = cleanupStack( BaseStack.split( '\n' ) );

		if ( additionalStack ) {
			stack.unshift( ...additionalStack );
		}

		this.stack = stack.join( '\n' );

	}

	static get [ SymbolConstructorName ] () {
		return new String( `base of : ${MNEMONICA} : errors` );
	}

}

Object.defineProperty( BASE_MNEMONICA_ERROR.prototype.constructor, 'name', {
	get () {
		return new String( 'BASE_MNEMONICA_ERROR' );
	}
} );


export const constructError = ( name: string, message: string ) => {
	const NamedErrorConstructor = class extends BASE_MNEMONICA_ERROR {
		constructor ( addition: string, stack: string[] ) {
			const saying = addition ? `${message} : ${addition}` : `${message}`;
			super( saying, stack );
		}
	};

	const reNamer = {} as {
		[ key: string ]: {
			prototype: {
				constructor: CallableFunction
			}
		},
	};
	reNamer[ name ] = NamedErrorConstructor;
	Object.defineProperty( reNamer[ name ].prototype.constructor, 'name', {
		get () {
			return new String( name );
		}
	} );
	return reNamer[ name ];
};
