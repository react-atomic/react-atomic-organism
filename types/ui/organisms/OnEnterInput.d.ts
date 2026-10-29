import React, { PureComponent } from "react";
declare class OnEnterInput extends PureComponent {
    static defaultProps: {
        atom: string;
    };
    handleEnter: (e: any) => void;
    render(): React.JSX.Element;
}
export default OnEnterInput;
