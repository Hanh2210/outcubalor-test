import { getBalance, getCurrencyRate } from "@/models";

export const useAppStore = defineStore("app-store", () => {
  const userBalance = ref<UserBalance>({});
  const currencyRate = ref<CurrencyRate>({});

  const init = () => {
    userBalance.value = getBalance();
    currencyRate.value = getCurrencyRate();
  };

  const updateUserBalance = (
    sendingCurrency: string,
    sendingAmount: number,
    receivingCurrency: string,
    receivingAmount: number
  ) => {
    userBalance.value = {
      ...userBalance.value,
      [sendingCurrency]: userBalance.value[sendingCurrency] - sendingAmount,
      [receivingCurrency]:
        userBalance.value[receivingCurrency] + receivingAmount,
    };
  };

  return { userBalance, currencyRate, init, updateUserBalance };
});
