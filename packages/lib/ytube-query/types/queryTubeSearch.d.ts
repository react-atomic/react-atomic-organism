export type SearchOptions = {
    host?: string | undefined;
    isLive?: boolean | undefined;
    hl?: string | undefined;
    gl?: string | undefined;
};
/**
 * @typedef {object} SearchOptions
 * @property {string=} host
 * @property {boolean=} isLive
 * @property {string=} hl
 * @property {string=} gl
 */
/**
 * @param {string} keyword
 * @param {SearchOptions} payload
 */
export declare const queryTubeSearch: (keyword: string, { host, isLive, hl, gl, }: SearchOptions) => Promise<any[]>;
