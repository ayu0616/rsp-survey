import { ReactNode } from "react";

export default (props: {children: ReactNode}) => {
    return <div className="show-select">{props.children}</div>;
};
