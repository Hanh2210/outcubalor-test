<script lang="ts" setup>
import arrowDown from "@/assets/icons/arrow-down.svg";
import { CURRENCY } from "@/utils/constants";

const arrowDownIcon = arrowDown;

const selectedCurrency = defineModel();
const { receivingAmount } = defineProps<{ receivingAmount: number }>();

const selected = computed(() =>
  CURRENCY.find((x) => x.label === selectedCurrency.value)
);
</script>
<template>
  <div class="exchange-to">
    <div class="card -left">
      <v-menu activator="parent" transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <div class="currency">
            <img class="icon" :src="selected?.flag" :alt="selected?.label" />
            <p class="label">{{ selected?.label }}</p>
          </div>
          <div class="dropdown">
            <img :src="arrowDownIcon" alt="arrow down" v-bind="props" />
          </div>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in CURRENCY"
            :key="index"
            :value="index"
            @click="selectedCurrency = item.label"
          >
            <div class="currency-option">
              <img :src="item.flag" class="icon" />
              <div class="item">
                <span class="label">{{ item.label }}</span>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="card -right">
      <v-text-field
        label="Recipients gets"
        variant="outlined"
        density="compact"
        readonly
        :model-value="receivingAmount"
        type="number"
      ></v-text-field>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.exchange-to {
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
      position: relative;
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

  > .card > .dropdown {
    margin-left: 10px;
    position: absolute;
    right: 12px;
    &:hover {
      cursor: pointer;
    }
  }
}

.currency-option {
  display: flex;
  align-items: center;
  gap: 12px;
}

@media only screen and (max-width: 800px) {
  .exchange-to .card .currency {
    .icon {
      width: 20px;
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
      font-size: 12px;
    }
  }
}
</style>
