'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.obey = void 0;
const errors_1 = require("../../descriptors/errors");
const { PROTOTYPE_USED_TWICE, } = errors_1.ErrorsTypes;
const used = new WeakSet();
const obey = (existentInstance, ModificatorType) => {
    let protoConstructor = ModificatorType;
    while (protoConstructor instanceof Function) {
        if (used.has(protoConstructor)) {
            const error = new PROTOTYPE_USED_TWICE(`${protoConstructor.name}.prototype > ${ModificatorType.name}`);
            throw error;
        }
        const sample = Reflect.getPrototypeOf(protoConstructor);
        if (sample instanceof Function) {
            protoConstructor = sample;
        }
        else {
            used.add(protoConstructor);
            break;
        }
    }
    if (existentInstance === null || !(existentInstance instanceof Object)) {
        return;
    }
    Reflect.setPrototypeOf(protoConstructor, existentInstance.constructor);
};
exports.obey = obey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JleUNvbnN0cnVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS90eXBlcy9vYmV5Q29uc3RydWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7QUFFYixxREFBdUQ7QUFDdkQsTUFBTSxFQUNMLG9CQUFvQixHQUNwQixHQUFHLG9CQUFXLENBQUM7QUFFaEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUVwQixNQUFNLElBQUksR0FBRyxDQUFDLGdCQUFxQixFQUFFLGVBQW9CLEVBQUUsRUFBRTtJQUNuRSxJQUFJLGdCQUFnQixHQUFRLGVBQWUsQ0FBQztJQUM1QyxPQUFPLGdCQUFnQixZQUFZLFFBQVEsRUFBRSxDQUFDO1FBQzdDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7WUFDaEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLElBQUksZ0JBQWdCLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZHLE1BQU0sS0FBSyxDQUFDO1FBQ2IsQ0FBQztRQUNELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN4RCxJQUFJLE1BQU0sWUFBWSxRQUFRLEVBQUUsQ0FBQztZQUNoQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUM7UUFDM0IsQ0FBQzthQUFNLENBQUM7WUFDUCxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0IsTUFBTTtRQUNQLENBQUM7SUFDRixDQUFDO0lBQ0QsSUFBSSxnQkFBZ0IsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLGdCQUFnQixZQUFZLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDeEUsT0FBTztJQUNSLENBQUM7SUFDRCxPQUFPLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3hFLENBQUMsQ0FBQztBQW5CVyxRQUFBLElBQUksUUFtQmYiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IEVycm9yc1R5cGVzIH0gZnJvbSAnLi4vLi4vZGVzY3JpcHRvcnMvZXJyb3JzJztcbmNvbnN0IHtcblx0UFJPVE9UWVBFX1VTRURfVFdJQ0UsXG59ID0gRXJyb3JzVHlwZXM7XG5cbmNvbnN0IHVzZWQgPSBuZXcgV2Vha1NldCgpO1xuXG5leHBvcnQgY29uc3Qgb2JleSA9IChleGlzdGVudEluc3RhbmNlOiBhbnksIE1vZGlmaWNhdG9yVHlwZTogYW55KSA9PiB7XG5cdGxldCBwcm90b0NvbnN0cnVjdG9yOiBhbnkgPSBNb2RpZmljYXRvclR5cGU7XG5cdHdoaWxlIChwcm90b0NvbnN0cnVjdG9yIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcblx0XHRpZiAodXNlZC5oYXMocHJvdG9Db25zdHJ1Y3RvcikpIHtcblx0XHRcdGNvbnN0IGVycm9yID0gbmV3IFBST1RPVFlQRV9VU0VEX1RXSUNFKGAke3Byb3RvQ29uc3RydWN0b3IubmFtZX0ucHJvdG90eXBlID4gJHtNb2RpZmljYXRvclR5cGUubmFtZX1gKTtcblx0XHRcdHRocm93IGVycm9yO1xuXHRcdH1cblx0XHRjb25zdCBzYW1wbGUgPSBSZWZsZWN0LmdldFByb3RvdHlwZU9mKHByb3RvQ29uc3RydWN0b3IpO1xuXHRcdGlmIChzYW1wbGUgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuXHRcdFx0cHJvdG9Db25zdHJ1Y3RvciA9IHNhbXBsZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dXNlZC5hZGQocHJvdG9Db25zdHJ1Y3Rvcik7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0aWYgKGV4aXN0ZW50SW5zdGFuY2UgPT09IG51bGwgfHwgIShleGlzdGVudEluc3RhbmNlIGluc3RhbmNlb2YgT2JqZWN0KSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRSZWZsZWN0LnNldFByb3RvdHlwZU9mKHByb3RvQ29uc3RydWN0b3IsIGV4aXN0ZW50SW5zdGFuY2UuY29uc3RydWN0b3IpO1xufTtcbiJdfQ==