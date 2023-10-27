export default checkClient;
declare function checkClient({ js, domain, }?: {
    js?: string;
    domain?: string;
}): Promise<boolean>;
