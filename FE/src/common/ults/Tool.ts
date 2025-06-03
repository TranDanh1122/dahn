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