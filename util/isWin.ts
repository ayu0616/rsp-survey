import { HandNum, ResultNum } from "types"

export default (playerHand: HandNum): ResultNum=>{
    const computerHand = Math.floor(Math.random() * 3)
    return (computerHand - playerHand) % 3 as ResultNum
}