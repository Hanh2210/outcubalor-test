export const getBalance = (): UserBalance => {
  return {
    USD: 564.43,
    EUR: 1000,
    CAD: 1000,
    GBP: 1000,
    MXN: 1000,
    PLN: 1000,
  };
};

export const getCurrencyRate = (): CurrencyRate => {
  return {
    USD: 1,
    EUR: 0.815894,
    CAD: 1.204355,
    GBP: 0.70602,
    MXN: 19.88162,
    PLN: 3.66121,
  };
};
