export function queryTubeWatch(videoId: string, host?: string | undefined): Promise<{
    success: boolean;
    status: any;
    reason: any;
    videoId: string;
}>;
