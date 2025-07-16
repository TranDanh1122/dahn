import { ErrorHandler, SuccessHandle } from "./NotifyHandler"

export function isObjectEqual(obj1: unknown, obj2: unknown): boolean {
    if (obj1 === obj2) return true;

    // Xử lý NaN
    if (Number.isNaN(obj1) && Number.isNaN(obj2)) return true;

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }

    // Xử lý Date
    if (obj1 instanceof Date && obj2 instanceof Date) {
        return obj1.getTime() === obj2.getTime();
    }

    const keys1 = Object.keys(obj1 as object);
    const keys2 = Object.keys(obj2 as object);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!Object.prototype.hasOwnProperty.call(obj2, key) || !isObjectEqual((obj1 as Record<string, unknown>)[key], (obj2 as Record<string, unknown>)[key])) {
            return false;
        }
    }

    return true;
}
// export const isObjectEqual = (a: any, b: any) => {
//     if (!isTruthyObject(a) || !isTruthyObject(b)) return false
//     return Object.values(a).every(el => Object.values(b).some(item => item === el))
// }
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
export function base64ToFile(base64: string, filename = 'file') {
    const [metadata, data] = base64.split(',');

    const mimeMatch = metadata.match(/data:(.*);base64/);
    const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';

    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    return new File([byteArray], filename, { type: mime });
}

export function isBase64Image(input: string): boolean {
    return /^data:image\/[a-zA-Z]+;base64,/.test(input);
}
export async function copy(text: string) {
    try {
        await navigator.clipboard.writeText(text)
        SuccessHandle("Copied to clipboard")
    } catch (e) {
        console.error(e)
        ErrorHandler("Error when copy to clipboard")
    }
}