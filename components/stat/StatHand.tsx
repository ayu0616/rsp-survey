import { handsJp } from "constants/rsp";
import { HandNum, rspStatItem } from "types";
import countStat from "util/countStat";
import Stat from "./Stat";

export default (props: { hand: HandNum; stat: rspStatItem[] }) => {
    return (
        <Stat
            title={handsJp[props.hand]}
            count={countStat(props.hand, props.stat)}
            totalCount={props.stat.length}
        ></Stat>
    );
};
