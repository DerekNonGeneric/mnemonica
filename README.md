# mnemonica
abstract technique that aids information retention : instance inheritance system

v0.0.2 -- it works, somehow 
;^)

```js
const SomeType = define('TypeName', TypeModificatorConstructor);
```

or

```js
const SomeType = define('TypeName',
	TypeModificatorFunction, TypeModificatorFunctionPrototype);
```

then :

```js
SomeType.define('SomeSubType`, SubType);  // ... etc
```

so now it looks like this

```js
SomeType
		.SomeSubType
```

And we can continue;

**How it then Works**

```js
const someTypeInstance = new SomeType({
	some   : 'arguments',
	data   : 'necessary',
	inside : 'of SomeType definition'
})
```

then :

```js

const someSubTypeInstance = someTypeInstance
	.SomeSubType({
		other  : 'data needed',
		inside : ' of ... etc ...'
	});

```