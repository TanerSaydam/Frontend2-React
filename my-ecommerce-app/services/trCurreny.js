export default function trCurrency(value = 0, symbol = "") {
    if (value == 0) {
        return "0,00 " + symbol;
    }

    let isValueNegative = false;
    if (value < 0) {
        isValueNegative = true;
        value *= -1;
    }

    let money = value.toString().split(".")
    let newMoney = "";
    let lira = money[0];
    let penny = "00";
    if (money.length > 1) {
        penny = money[1]
        if (penny.length == 1) {
            penny = penny + "0"
        }

        if (penny.length > 1) {
            penny = penny.substring(0, 2);
        }
    }

    let count = 0;
    for (let i = lira.length; i > 0; i--) {
        if (count == 3 && count < (lira.length)) {
            newMoney = lira[i - 1] + "." + newMoney
            count = 1;
        } else {
            newMoney = lira[i - 1] + newMoney
            count++;
        }
    }
    newMoney = `${newMoney},${penny} ${symbol}`;

    if (isValueNegative) {
        newMoney = "-" + newMoney;
    }
    return newMoney;
}