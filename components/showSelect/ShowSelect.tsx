import { ReactNode } from "react";

const ShowSelect = (props: { children: ReactNode }) => {
    return <div className="show-select">{props.children}</div>;
};
export default ShowSelect;
