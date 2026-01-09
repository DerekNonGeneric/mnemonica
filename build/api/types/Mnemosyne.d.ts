import { ConstructorFunction } from '../../types';
declare const _default: {
    Gaia: ConstructorFunction<object>;
    readonly createMnemosyne: (Uranus: unknown) => any;
    readonly prepareSubtypeForConstruction: (subtypeName: any, inheritedInstance: any) => ConstructorFunction<{
        getExistentAsyncStack: (existentInstance: import("../utils").asyncStack) => unknown;
        postProcessing: (this: any, continuationOf: any) => void;
        makeAwaiter: (this: any, type: any, then: any) => any;
        addThen: (this: any, then: any) => void;
        invokePreHooks: (this: any) => void;
        invokePostHooks: (this: any) => {
            type: any;
            collection: any;
        };
        throwModificationError: (this: any, error: any) => void;
    }> | undefined;
};
export default _default;
