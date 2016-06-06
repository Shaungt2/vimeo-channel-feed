export default function defineConstant(destObj, name, value) {

    return Reflect.defineProperty(destObj, name, {
        value,

        enumerable: false,
        writable  : false
    });
}
