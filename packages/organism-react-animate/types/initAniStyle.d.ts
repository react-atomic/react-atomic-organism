export function InjectStyles({ statusKey }: {
    statusKey: any;
}): {
    hide: (string | {
        visibility: string;
    })[];
    exit: (string | {
        display: string;
    })[];
};
