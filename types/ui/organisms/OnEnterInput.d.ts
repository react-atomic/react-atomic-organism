export default OnEnterInput;
declare class OnEnterInput {
    static defaultProps: {
        atom: string;
    };
    handleEnter: (e: any) => void;
    render(): any;
}
