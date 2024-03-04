<script lang="ts" setup>
import arrowDown from "@/assets/icons/arrow-down.svg";
import { CURRENCY } from "@/utils/constants";

const arrowDownIcon = arrowDown;

const props = defineProps<{ userBalance: UserBalance }>();

const currencyItems = computed(() => {
  return CURRENCY.map((x) => ({ ...x, amount: props.userBalance[x.label] }));
});

const selectedCurrency = defineModel("sendingCurrency");
const sendingAmount = defineModel<number>("sendingAmount");

const selected = computed(() =>
  currencyItems.value.find((x: any) => x.label === selectedCurrency.value)
);
</script>
<template>
  <div class="exchange-from">
    <div class="card -left">
      <v-menu activator="parent" transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <div class="currency">
            <img class="icon" :src="selected?.flag" :alt="selected?.label" />
            <p class="label">{{ selected?.label }}</p>
          </div>
          <div class="amount">
            <p class="value">{{ selected?.amount.toFixed(2) }}</p>
            <p class="label">Available</p>
          </div>
          <div class="dropdown">
            <img :src="arrowDownIcon" alt="arrow down" v-bind="props" />
          </div>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in currencyItems"
            :key="index"
            :value="index"
            @click="selectedCurrency = item.label"
          >
            <div class="currency-option">
              <img :src="item.flag" class="icon" />
              <div class="item">
                <span class="label">{{ item.label }}</span>
                <span class="amount">{{ item.amount }}</span>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="card -right">
      <v-text-field
        label="You send"
        variant="outlined"
        density="compact"
        :rules="[
          () => !!sendingAmount || 'This field is required',
          () => (sendingAmount || 0) >= 0 || 'Value must be greater than 0',
          () =>
            (sendingAmount || 0) < (selected?.amount || 0) ||
            'Greater than total balance',
        ]"
        type="number"
        v-model="sendingAmount"
      ></v-text-field>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.exchange-from {
  display: flex;
  gap: 10px;
  width: 100%;
  .card {
    background-color: white;
    height: 100px;
    padding: 6px 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    // box-shadow: 0px -5px 5px -5px rgba(0, 0, 0, 0.5),
    //   -5px 0px 5px -5px rgba(0, 0, 0, 0.5), 0px 5px 5px -5px rgba(0, 0, 0, 0.5);
    &.-left {
      width: 35%;
      border-radius: 10px 0 0 10px;
    }
    &.-right {
      flex: 1;
      border-radius: 0 10px 10px 0;
      padding-left: 27px;
      padding-right: 27px;
    }
  }

  > .card > .currency {
    > .icon {
      width: 38px;
      margin-bottom: 1px;
      display: block;
    }
    > .label {
      font-size: 15px;
      text-align: center;
      line-height: 27px;
    }
  }

  > .card > .amount {
    margin-left: 20px;
    line-height: 27px;
    > .value {
      font-size: 22px;
      font-weight: 600;
    }
    > .label {
      font-size: 15px;
      text-align: center;
    }
  }
  > .card > .dropdown {
    margin-left: 10px;
    &:hover {
      cursor: pointer;
    }
  }
}

.currency-option {
  display: flex;
  align-items: center;
  gap: 8px;

  > .icon {
    width: 38px;
  }
  > .item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  > .item > .label {
    font-size: 10px;
    line-height: 1;
  }

  > .item > .amount {
    font-size: 14px;
    line-height: 1;
    font-weight: 600;
  }
}
@media only screen and (max-width: 800px) {
  .exchange-from .card .currency {
    .icon {
      width: 20px;
    }
    > .label {
      font-size: 10px;
    }
  }
  .exchange-from .card .amount {
    margin-left: 10px;
    > .value {
      font-size: 12px;
      line-height: 12px;
    }
    > .label {
      font-size: 10px;
    }
  }
  .currency-option {
    .icon {
      width: 20px;
    }
    > .item > .label {
      font-size: 8px;
    }

    > .item > .amount {
      font-size: 12px;
      font-weight: 600;
    }
  }
}
</style>
