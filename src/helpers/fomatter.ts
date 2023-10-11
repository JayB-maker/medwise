export const formatMoney = (amount: any) => {
  if (typeof amount === "string") {
    amount = parseFloat(amount);
  }
  if (amount === null || amount === undefined) {
    return "N/A";
  }
  if (amount % 1 === 0) {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};
