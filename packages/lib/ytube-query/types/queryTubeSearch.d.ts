export function queryTubeSearch(keyword: string, { host, isLive, hl, gl, }: SearchOptions): Promise<{
    videoId: any;
    watching: any;
    title: any;
    description: any;
    channelName: any;
    channelUrl: any;
    channelId: any;
}[]>;
export type SearchOptions = {
    host?: string | undefined;
    isLive?: boolean | undefined;
    hl?: string | undefined;
    gl?: string | undefined;
};
