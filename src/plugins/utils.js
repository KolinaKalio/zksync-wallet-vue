import { walletData } from "@/plugins/walletData.js";
import handleExpNumber from "@/plugins/handleExpNumber.js";

const parseToken = (symbol, amount) => {
  return walletData.get().syncProvider.tokenSet.parseToken(symbol, amount.toString());
};
const handleExpNum = (symbol, amount) => {
  if (!amount) {
    return "0";
  }
  if (typeof amount === "number") {
    amount = handleExpNumber(amount);
  }
  return handleFormatToken(symbol, parseToken(symbol, amount.toString()).toString());
};
const handleFormatToken = (symbol, amount) => {
  if (!amount) return "0";
  if (typeof amount === "number") {
    amount = handleExpNumber(amount).toString();
    amount = parseToken(symbol, amount);
  }
  if (amount === "undefined") {
    amount = "0";
  }
  return walletData.get().syncProvider.tokenSet.formatToken(symbol, amount);
};
const getFormatedTotalPrice = (price, amount) => {
  const total = price * amount;
  if (!amount || total === 0) {
    return "$0.00";
  }
  return total < 0.01 ? `<$0.01` : `~$${parseFloat(total).toFixed(2)}`;
};
const validateNumber = (amount) => {
  amount = amount.toString();
  const lastCharacter = amount.substring(amount.length - 1, amount.length);
  if (lastCharacter !== "0") {
    amount = handleExpNumber(+amount)
      .toString()
      .replace(/-/g, "");
  }
  if (amount.length <= 1) {
    return amount;
  }
  const firstCharacter = amount.substring(0, 1);
  if (amount.length === 2 && firstCharacter === "0" && lastCharacter === "0") {
    return "0";
  }
  return amount;
};
export default {
  validateNumber,
  parseToken,
  handleExpNum,
  handleFormatToken,
  getFormatedTotalPrice,
};
