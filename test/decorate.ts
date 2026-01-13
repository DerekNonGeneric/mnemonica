// npx tsc --sourceMap ./test/decorate.ts
// npx tsc --target es6 --moduleResolution NodeNext --module NodeNext --sourceMap ./test/decorate.ts

import { decorate, apply, ConstructorFunction } from '..';
// import { Strict } from 'typeomatica';
import { BaseClass } from 'typeomatica';

// debugger;

class Some {
	field = 333;
}

Object.setPrototypeOf(Some.prototype, new BaseClass);


const some = new Some;
console.log(some);

@decorate()
// @Strict()
// class MyDecoratedClass {
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
