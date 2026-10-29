/**
 * @param {string|Blob} textOrBlob
 * @param {string} [fileName]
 * @param {any} [option]
 * @param {boolean} [isKeep]
 */
declare const execDownload: (textOrBlob: string | Blob, fileName?: string, option?: any, isKeep?: boolean) => void;
export default execDownload;
