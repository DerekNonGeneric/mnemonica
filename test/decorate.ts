// npx tsc --sourceMap ./test/decorate.ts
// npx tsc --target es6 --moduleResolution NodeNext --module NodeNext --sourceMap ./test/decorate.ts

import { decorate, apply, ConstructorFunction } from '..';
import { BaseClass } from 'typeomatica';
// import { BaseClass, Strict } from 'typeomatica';

debugger;

// class Base {
// 	base_field = 555;
// }
// class Some extends Base {
// 	field = 333;
// }
// Object.setPrototypeOf(Base.prototype, new BaseClass);
// const some = new Some;
// console.log(some);

// TypeError: parentClass.define is not a function
// @Strict()
@decorate()

// <-- with the following error -->
// TypeError: Cannot read properties of undefined (reading 'value')
// @Strict() 
class MyDecoratedClass {
	field: number;
	constructor () {
		// debugger;
		this.field = 123;
	}
}

Object.setPrototypeOf(MyDecoratedClass.prototype, new BaseClass);

@decorate(MyDecoratedClass, { strictChain : false })
class MyDecoratedSubClass {
	sub_field: number;
	constructor () {
		this.sub_field = 321;
	}
}

debugger;

export const myDecoratedInstance = new MyDecoratedClass;
export const myDecoratedInstance2 = new MyDecoratedClass;
export const myDecoratedSubInstance = apply(myDecoratedInstance, MyDecoratedSubClass);

const MyFn = function () {
	this.sub_sub_field = 123;
} as ConstructorFunction<{ sub_sub_field: number }>;

// Object.setPrototypeOf(MyFn.prototype, new BaseClass);
@decorate(MyDecoratedSubClass)
class MyDecoratedSubSubClass extends MyFn {
	sub_sub_field: number;
	constructor () {
		super();
		this.sub_sub_field = 321;
	}
}

export const myDecoratedSubSubInstance = apply(myDecoratedSubInstance, MyDecoratedSubSubClass);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-unused-vars
const MyOtherFn = MyDecoratedClass.define('MyOtherFn', function (this: { prop: number }) {
	this.prop = 321;
});

// debugger;

export const myOtherInstance = apply(myDecoratedInstance, MyOtherFn);

debugger;
