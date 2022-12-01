import HandOption from "components/handOption/HandOption";
import HandOptionWrapper from "components/handOption/HandOptionWrapper";
import ShowSelectWrapper from "components/showSelect/ShowSelectWrapper";
import { HandNum } from "constants/rsp";
import { STAT_LOCALSTORAGE_KEY } from "constants/stat";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { rspStatItem } from "types";

export default function Home() {
    const [isSelected, setIsSelected] = useState([false, false, false]);
    const [order, setOrder] = useState(
        [0, 1, 2].sort(() => Math.random() - Math.random())
    );
    const reset = () => {
        setIsSelected([false, false, false]);
        setOrder((prev) => {
            const newOrder = [0, 1, 2];
            newOrder.sort(() => Math.random() - Math.random());
            while (
                prev[0] == newOrder[0] ||
                prev[1] == newOrder[1] ||
                prev[2] == newOrder[2]
            ) {
                newOrder.sort(() => Math.random() - Math.random());
            }
            return newOrder;
        });
    };
    const [stat, setStat] = useState<rspStatItem[]>();

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

    const handGridItems = (order as HandNum[]).map((i) => {
        return (
            <HandOption
                hand={i}
                onClick={(e) => handOnClick(Number(e.currentTarget.value))}
                selected={isSelected[i]}
                key={i}
            />
        );
    });

    return (
        <>
            <Head>
                <title>じゃんけんアンケート</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="crossorigin"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <Link href="./" onClick={reset} className="title-link">
                <h1 className="title">じゃんけんアンケート</h1>
            </Link>

            <hr style={{ color: "lightgray" }} />

            <ShowSelectWrapper>
                {isSelected.includes(true) ? (
                    <>
                        <h2>あなたが選択したのは</h2>
                        <HandOption
                            hand={isSelected.indexOf(true) as HandNum}
                        />
                        <div className="button-container">
                            <button
                                className="button button-cancel"
                                onClick={reset}
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
                                    addStat({
                                        hand: hand,
                                        timestamp: new Date(),
                                    });
                                    reset();
                                }}
                            >
                                決定
                            </button>
                        </div>
                    </>
                ) : (
                    ""
                )}
            </ShowSelectWrapper>

            <HandOptionWrapper>{handGridItems}</HandOptionWrapper>
        </>
    );
}
