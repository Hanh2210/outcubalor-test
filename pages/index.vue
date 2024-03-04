<script lang="ts" setup>
const appStore = useAppStore();
appStore.init();

const userBalance = computed(() => appStore.userBalance);
const currencyRates = computed(() => appStore.currencyRate);

const sendingCurrency = ref("USD");
const sendingAmount = ref<number>(0);

const receivingCurrency = ref("EUR");

const convertCurrency = (amount: number, from: string, to: string = "USD") => {
  const usdAmount = amount / currencyRates.value[from];
  return usdAmount * currencyRates.value[to];
};

const calculateFee = (amount: number, currency: string) => {
  const usdAmount = convertCurrency(amount, currency);
  if (usdAmount < 10) return amount * 0.05;
  if (usdAmount < 100) return amount * 0.08;
  return amount * 0.05 + convertCurrency(1.5, "USD", currency);
};

const fee = computed(() =>
  calculateFee(sendingAmount.value, sendingCurrency.value)
);

const exchangeRate = computed(() => {
  return (
    currencyRates.value[receivingCurrency.value] /
    currencyRates.value[sendingCurrency.value]
  );
});

const receivingAmount = computed(() => {
  return convertCurrency(
    sendingAmount.value - fee.value,
    sendingCurrency.value,
    receivingCurrency.value
  );
});

const updateBalance = () => {
  appStore.updateUserBalance(
    sendingCurrency.value,
    sendingAmount.value,
    receivingCurrency.value,
    receivingAmount.value
  );

  sendingAmount.value = 0;
};
</script>
<template>
  <div class="page-container">
    <div class="exchange-container">
      <div class="currency">
        <exchange-from
          class="from"
          :user-balance="userBalance"
          v-model:sendingCurrency="sendingCurrency"
          v-model:sendingAmount="sendingAmount"
        />
        <exchange-fee-and-rate
          class="info"
          :fee="fee"
          :currency="sendingCurrency"
          :exchange-rate="exchangeRate"
          :receivingCurrency="receivingCurrency"
        />
        <exchange-to
          class="to"
          v-model="receivingCurrency"
          :receiving-amount="receivingAmount"
        />
      </div>
      <div class="description">
        <v-text-field
          label="Title"
          variant="outlined"
          density="compact"
          :model-value="'Please buy new clothes and have fun!'"
          hint="Optional"
          persistent-hint
        ></v-text-field>
      </div>
      <div class="action">
        <div class="button -back">Back</div>
        <div class="button -continue" @click="updateBalance">Continue</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.exchange-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 19px;
}

.exchange-container > .currency {
  background-color: white;
  width: 521px;
  height: 372px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  > .from {
    position: absolute;
    z-index: 10;
    top: 0;
  }
  > .to {
    position: absolute;
    z-index: 10;
    bottom: 0;
  }
  > .info {
    position: absolute;
    bottom: 0;
  }
}

.exchange-container > .description {
  width: 100%;
}
.exchange-container > .action {
  width: 100%;
  display: flex;
  gap: 19px;
  justify-content: center;
  padding: 0 35px;
  > .button {
    font-weight: 600;
    font-size: 13px;
    padding: 12px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    &:hover:not(.-disabled) {
      cursor: pointer;
    }
  }
  > .button.-back {
    flex: 1;
    height: 40px;
    color: #000 !important;
    border: 2px solid #2af5d6;
  }
  > .button.-continue {
    flex: 1.5;
    height: 40px;
    color: #111a27 !important;
    background-color: #2af5d6;
  }
}

@media only screen and (max-width: 800px) {
  .exchange-container {
    width: 100%;
  }
  .exchange-container > .currency {
    width: 100%;
  }
}
</style>
