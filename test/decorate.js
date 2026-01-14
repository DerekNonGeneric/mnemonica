"use strict";
// npx tsc --sourceMap ./test/decorate.ts
// npx tsc --target es6 --moduleResolution NodeNext --module NodeNext --sourceMap ./test/decorate.ts
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myOtherInstance = exports.myDecoratedSubSubInstance = exports.myDecoratedSubInstance = exports.myDecoratedInstance2 = exports.myDecoratedInstance = void 0;
const __1 = require("..");
const typeomatica_1 = require("typeomatica");
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
let MyDecoratedClass = (() => {
    let _classDecorators = [(0, __1.decorate)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyDecoratedClass = _classThis = class {
        constructor() {
            // debugger;
            this.field = 123;
        }
    };
    __setFunctionName(_classThis, "MyDecoratedClass");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyDecoratedClass = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyDecoratedClass = _classThis;
})();
Object.setPrototypeOf(MyDecoratedClass.prototype, new typeomatica_1.BaseClass);
let MyDecoratedSubClass = (() => {
    let _classDecorators = [(0, __1.decorate)(MyDecoratedClass, { strictChain: false })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var MyDecoratedSubClass = _classThis = class {
        constructor() {
            this.sub_field = 321;
        }
    };
    __setFunctionName(_classThis, "MyDecoratedSubClass");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyDecoratedSubClass = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyDecoratedSubClass = _classThis;
})();
debugger;
exports.myDecoratedInstance = new MyDecoratedClass;
exports.myDecoratedInstance2 = new MyDecoratedClass;
exports.myDecoratedSubInstance = (0, __1.apply)(exports.myDecoratedInstance, MyDecoratedSubClass);
const MyFn = function () {
    this.sub_sub_field = 123;
};
// Object.setPrototypeOf(MyFn.prototype, new BaseClass);
let MyDecoratedSubSubClass = (() => {
    let _classDecorators = [(0, __1.decorate)(MyDecoratedSubClass)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = MyFn;
    var MyDecoratedSubSubClass = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.sub_sub_field = 321;
        }
    };
    __setFunctionName(_classThis, "MyDecoratedSubSubClass");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MyDecoratedSubSubClass = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MyDecoratedSubSubClass = _classThis;
})();
exports.myDecoratedSubSubInstance = (0, __1.apply)(exports.myDecoratedSubInstance, MyDecoratedSubSubClass);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-unused-vars
const MyOtherFn = MyDecoratedClass.define('MyOtherFn', function () {
    this.prop = 321;
});
// debugger;
exports.myOtherInstance = (0, __1.apply)(exports.myDecoratedInstance, MyOtherFn);
debugger;
//# sourceMappingURL=decorate.js.map