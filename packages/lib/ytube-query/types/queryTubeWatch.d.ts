/**
 * @param {string} videoId
 * @param {string=} host
 */
export declare const queryTubeWatch: (videoId: string, host?: string | undefined) => Promise<{
    success: boolean;
    status: any;
    reason: any;
    videoId: string;
}>;
