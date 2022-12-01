import { HandNum } from "constants/rsp";
import { rspStatItem } from "types";

export default (hand: HandNum, stat: rspStatItem[]) => {
    return stat.filter((item) => item.hand == hand).length;
};
