export const isObjectEqual = (a: any, b: any) => {
    if (!isTruthyObject(a) || !isTruthyObject(b)) return false
    return Object.values(a).every(el => Object.values(b).some(item => item === el))
}
export const isTruthyObject = (object: any) => {
    return typeof object === "object" && object !== null
}
export const isPrimitive = (val: any) => {
    return val === null || (typeof val !== 'object' && typeof val !== 'function');
}
export const getDisplayText = (value: any, key?: any): string => {
    try {
        if (isPrimitive(value)) return String(value)
        if (isTruthyObject(value) && key) return String(value[key])
        return ""
    } catch (error) {
        throw new Error(String(error))
    }

}