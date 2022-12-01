import { ReactNode } from "react";

export default (props: { children: ReactNode }) => {
    return <div className="grid-wrapper">{props.children}</div>;
};
