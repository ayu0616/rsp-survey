import { ReactNode } from "react";

export default (props:{children: ReactNode}) => {
    return <div className="show-select-wrapper">{ props.children}</div>;
};