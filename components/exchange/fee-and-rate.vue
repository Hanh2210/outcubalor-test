<script lang="ts" setup>
import fee from "@/assets/icons/fee-icon.svg";
import exchange from "@/assets/icons/exchange.svg";

const props = defineProps<{
  fee: number;
  currency: string;
  exchangeRate: number;
  receivingCurrency: string;
}>();
const feeIcon = fee;
const exchangeIcon = exchange;
</script>
<template>
  <div class="exchange-info">
    <div class="wrap">
      <div class="info">
        <div class="fee">
          <img :src="feeIcon" alt="Fee icon" />
          <span>{{ props.fee }} {{ props.currency }} fees</span>
        </div>
        <div class="rate">
          <img :src="exchangeIcon" alt="Exchange icon" />
          <span
            >{{ props.exchangeRate }} {{ props.receivingCurrency }} exchange
            rate</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.exchange-info {
  width: 446px;
  height: 362px;
  background-color: #edf6ff;
  > .wrap {
    height: 100%;
    border-left: 1px dashed #234afb;
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
  > .wrap > .info {
    margin-left: -11px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    font-size: 12px;
  }
  > .wrap > .info > .fee,
  > .wrap > .info > .rate {
    display: flex;
    align-items: center;
    gap: 18px;
  }
}
@media only screen and (max-width: 800px) {
  .exchange-info {
    width: 90%;
    > .wrap > .info {
      gap: 16px;
    }
  }
}
</style>
