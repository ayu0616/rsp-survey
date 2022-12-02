export type HandNum = 0 | 1 | 2;
export type GenderNum = 0 | 1 | 2;

export type rspStatItem = {
    timestamp: Date;
    hand: HandNum;
    gender: GenderNum;
};
