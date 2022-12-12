import HandOption from "components/handOption/HandOption";
import HandOptionWrapper from "components/handOption/HandOptionWrapper";
import Modal from "components/modal/Modal";
import ShowSelectWrapper from "components/showSelect/ShowSelectWrapper";
import { STAT_LOCALSTORAGE_KEY } from "constants/stat";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GenderNum, HandNum, ResultNum, rspStatItem } from "types";

const handsJp = ["グー", "チョキ", "パー"] as const;
const handEmojis = ["✊", "✌️", "🖐"] as const;

const genders = ["male", "female", "others"] as const;
const gendersJp = ["男", "女", "その他／無回答"] as const;

const results = ["draw", "win", "lose"] as const;
const resultJp = ["あいこ", "勝ち", "負け"] as const;

const resultColor = {
    0: "green",
    1: "red",
    2: "blue",
};

export default function Home() {
    const [isSelected, setIsSelected] = useState([false, false, false]);
    const [order, setOrder] = useState(
        [0, 1, 2].sort(() => Math.random() - Math.random())
    );

    const shuffleOrder = () => {
        setOrder((prev) => {
            const newOrder = [0, 1, 2];
            newOrder.sort(() => Math.random() - Math.random());
            while (
                prev[0] == newOrder[0] &&
                prev[1] == newOrder[1] &&
                prev[2] == newOrder[2]
            ) {
                newOrder.sort(() => Math.random() - Math.random());
            }
            return newOrder;
        });
    };
    const reset = () => {
        setIsSelected([false, false, false]);
        shuffleOrder();
        setGenderValue(undefined);
        setGameCount(1);
        setResult(undefined);
        setToSend({
            timestamp: new Date(),
            hand1: 0,
            result1: 0,
            hand2: 0,
            result2: 0,
            gender: 0,
        });
    };
    const [stat, setStat] = useState<rspStatItem[]>();

    const [genderValue, setGenderValue] = useState<GenderNum>();

    const [gameCount, setGameCount] = useState(1);

    const [toSend, setToSend] = useState<rspStatItem>({
        timestamp: new Date(),
        hand1: 0,
        result1: 0,
        hand2: 0,
        result2: 0,
        gender: 0,
    });

    const [result, setResult] = useState<ResultNum>();

    const [isModalShow, setIsModalShow] = useState(false);

    useEffect(() => {
        const localRawData = localStorage.getItem(STAT_LOCALSTORAGE_KEY);
        if (localRawData) {
            const localData = JSON.parse(localRawData);
            setStat(localData);
        } else {
            setStat([]);
        }
    }, []);

    const addStat = (item: rspStatItem) => {
        setStat((prev) => {
            const newStat = prev ? [...prev, item] : [item];
            localStorage.setItem(
                STAT_LOCALSTORAGE_KEY,
                JSON.stringify(newStat)
            );
            return newStat;
        });
    };

    const handOnClick = (value: number) => {
        const newIsSelected = new Array(3);
        for (let i = 0; i < 3; i++) {
            newIsSelected[i] = i == value;
        }
        setIsSelected(newIsSelected);
    };

    const onFirstClick = (
        hand: HandNum,
        gender: GenderNum,
        result: ResultNum
    ) => {
        setToSend((prev) => {
            prev.hand1 = hand;
            prev.gender = gender;
            prev.result1 = result;
            prev.timestamp = new Date();
            return prev;
        });
    };

    const onSecondClick = (hand: HandNum, result: ResultNum) => {
        setToSend((prev) => {
            prev.hand2 = hand;
            prev.result2 = result;
            addStat(prev);
            return prev;
        });
    };

    const handGridItems = (order as HandNum[]).map((i) => {
        return (
            <HandOption
                hand={i}
                onClick={(e) => handOnClick(Number(e.currentTarget.value))}
                selected={isSelected[i]}
                key={i}
                disabled={genderValue == undefined}
            />
        );
    });

    return (
        <div>
            <Head>
                <title>じゃんけんアンケート</title>
            </Head>

            <Link href="./" onClick={reset} className="title-link">
                <h1 className="title">じゃんけんアンケート</h1>
            </Link>

            <hr style={{ color: "lightgray" }} />

            <ShowSelectWrapper>
                {isSelected.includes(true) && genderValue != undefined ? (
                    <>
                        <h2>あなたが選択したのは</h2>
                        <HandOption
                            hand={isSelected.indexOf(true) as HandNum}
                        />
                        <div className="button-container">
                            <button
                                className="button button-cancel"
                                onClick={() => {
                                    setIsSelected([false, false, false]);
                                }}
                            >
                                キャンセル
                            </button>
                            <button
                                className="button button-submit"
                                disabled={!isSelected.includes(true)}
                                onClick={() => {
                                    const hand = isSelected.indexOf(
                                        true
                                    ) as HandNum;
                                    setResult(() => {
                                        const result = Math.floor(
                                            Math.random() * 3
                                        ) as ResultNum;
                                        switch (gameCount) {
                                            case 1:
                                                onFirstClick(
                                                    hand,
                                                    genderValue,
                                                    result
                                                );
                                                shuffleOrder();
                                                break;
                                            case 2:
                                                onSecondClick(hand, result);
                                                break;
                                        }
                                        return result;
                                    });
                                    setIsSelected([false, false, false]);
                                    setGameCount((p) => p + 1);
                                    setIsModalShow(true);
                                }}
                            >
                                決定
                            </button>
                        </div>
                    </>
                ) : gameCount == 1 ? (
                    <div className="first-description-wrapper">
                        <div className="desc">
                            <h2>アンケートについて</h2>
                            <ul>
                                <li>
                                    このアンケートの目的は「人間がじゃんけんで出す手に傾向があるのか」を調査することです。
                                </li>
                                <li>
                                    コンピューターと2回じゃんけんしていただきます。
                                </li>
                                <li>
                                    コンピューターは同じ確率でランダムに手を出します。すなわち、どの手を選んでも勝率は同じです。
                                </li>
                                <li>
                                    「性別の回答」→「じゃんけん1回目」→「対戦結果表示」→「じゃんけん2回目」→「対戦結果表示」の流れです。
                                </li>
                                <li>回答は30秒程度で完了します。</li>
                                <li>
                                    収集する情報は「性別」と「じゃんけんの手」だけなので個人を特定することはできません。
                                </li>
                                <li>
                                    ↓の選択肢は毎回シャッフルするので注意してください。
                                </li>
                                <li></li>
                            </ul>
                        </div>
                        <div>
                            <h2>性別を選択してください</h2>
                            <div className="gender-form-wrapper">
                                {([0, 1, 2] as GenderNum[]).map((i) => {
                                    return (
                                        <div
                                            className="gender-radio-wrapper"
                                            key={i}
                                        >
                                            <input
                                                id={genders[i]}
                                                value={genders[i]}
                                                type="radio"
                                                name="gender"
                                                checked={i == genderValue}
                                                onChange={() => {
                                                    setGenderValue(i);
                                                }}
                                            />
                                            <label
                                                htmlFor={genders[i]}
                                                className="radio-label"
                                            >
                                                {gendersJp[i]}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="second-description-wrapper">
                        <h2>2回目の手を選択してください</h2>
                        <p>
                            <span style={{ marginRight: "0.25rem" }}>※</span>
                            1回目：{handsJp[toSend.hand1]}
                            {handEmojis[toSend.hand1]}
                            <span style={{ margin: "0 0.5rem" }}>→</span>
                            <span
                                style={{
                                    color:
                                        result != undefined
                                            ? resultColor[result]
                                            : "",
                                    fontWeight: "bold",
                                }}
                            >
                                {resultJp[toSend.result1]}
                            </span>
                        </p>
                    </div>
                )}
            </ShowSelectWrapper>

            <HandOptionWrapper>{handGridItems}</HandOptionWrapper>

            <Modal
                title="結果"
                isShow={isModalShow}
                setIsShow={setIsModalShow}
                onButtonClick={() => {
                    if (gameCount > 2) {
                        reset();
                    }
                }}
            >
                <div className="result-wrapper">
                    <div
                        className="result-jp"
                        style={{
                            color:
                                result != undefined ? resultColor[result] : "",
                        }}
                    >
                        {result != undefined ? resultJp[result] : ""}
                    </div>
                    <div className="result-en">
                        {result != undefined ? results[result] : ""}
                    </div>
                    <div>
                        <h2>
                            {gameCount > 2
                                ? "ご協力ありがとうございました！！！"
                                : ""}
                        </h2>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
