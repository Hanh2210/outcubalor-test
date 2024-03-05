<script lang="ts" setup>
import { MENU } from "@/utils/constants";
import iconBag from "@/assets/icons/bag.svg";

const drawer = ref(true);

const rail = ref(false);

const isLargeScreen = useMediaQuery("(min-width:800px)");

const navigationLocation = computed(() => {
  return isLargeScreen.value ? "left" : "top";
});

watchEffect(() => {
  if (isLargeScreen.value) rail.value = false;
  else rail.value = true;
});
</script>

<template>
  <div class="app-container">
    <v-layout>
      <v-navigation-drawer
        permanent
        class="navigation-drawer"
        :class="{ '-expanded': !rail }"
        :model-value="drawer"
        :rail="rail"
        :location="navigationLocation"
      >
        <div class="info">
          <div class="circle"></div>
          <div class="wrap">
            <span class="title">STEP 02</span>
            <span class="subtitle">Specify Amount</span>
          </div>
          <v-btn
            v-if="!isLargeScreen"
            icon="mdi-chevron-down"
            variant="text"
            class="arrow"
            @click.stop="rail = !rail"
          ></v-btn>
        </div>

        <v-divider></v-divider>

        <div class="wrapper">
          <ul class="menu-list">
            <li class="item" v-for="(item, index) in MENU" :key="index">
              <img :src="item.icon" class="icon" />
              <span class="title">{{ item.label }}</span>
            </li>
          </ul>

          <div class="footer">
            <div class="title">
              <img :src="iconBag" />
              <span>Mini Apps</span>
            </div>

            <span class="pro">PRO</span>
          </div>
        </div>
      </v-navigation-drawer>

      <v-main>
        <div class="main-page">
          <slot /></div
      ></v-main>
    </v-layout>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  background-color: #ccc;
}
.navigation-drawer {
  background-color: #0e0d52;
  border-radius: 8px 8px 0 0;
  margin-right: 20px;

  .info {
    background-color: #2a2e94;
    border-radius: 8px 8px 0 0;
    padding: 0 14px;
    height: 59px;
    display: flex;
    align-items: center;
    margin-bottom: 23px;

    > .circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 4px solid #0e0d52;
      border-top-color: #2af5d6;
      border-right-color: #2af5d6;
      transform: rotate(45deg);
    }

    > .wrap {
      display: flex;
      flex-direction: column;
      margin-left: 14px;
    }

    > .wrap > .title {
      font-size: 10px;
      color: #e0f5ff;
    }

    > .wrap > .subtitle {
      font-size: 12px;
      color: #fff;
      font-weight: 600;
    }

    > .arrow {
      color: #2af5d6;
      position: absolute;
      right: 0px;
    }
  }

  .wrapper {
    padding: 0 16px;
    display: flex;
    height: 86%;
    flex-direction: column;
    justify-content: space-between;
  }

  .footer {
    height: 40px;
    border: 1px solid #fff;
    padding: 11px 16px;
    color: #fff;
    align-items: center;
    justify-content: space-between;
    display: flex;
    border-radius: 4px;
  }

  .footer > .title {
    font-size: 14px;
    font-weight: 600;
    display: flex;
    gap: 8px;
  }

  .footer > .pro {
    font-size: 10.5px;
    color: #e0f5ff;
    border: 0.5px solid #e0f5ff;
    border-radius: 4px;
    padding: 2px;
  }
}

.menu-list {
  padding: 0;
  margin: 0;
  list-style: none;

  > .item {
    display: flex;
    align-items: center;
    justify-items: center;
    gap: 16px;
    padding: 13px 0;
    cursor: pointer;
  }

  > .item > .icon {
    width: 24px;
    height: 24px;
    color: #cad5f9;
  }

  > .item > .title {
    font-size: 14px;
    font-weight: 500;
    color: #cad5f9;
  }
}

.main-page {
  background-color: #fff;
  border-radius: 10px;
  margin-left: 20px;
}

:deep(.navigation-drawer .info) {
  //position: fixed;
  width: 100%;
}

@media only screen and (max-width: 800px) {
  .main-page {
    padding: 10px;
    margin-left: 0;
    border-radius: 0;
  }

  .navigation-drawer {
    &.-expanded {
      height: fit-content !important;
    }
    border-radius: 0;
    .info {
      border-radius: 0;
    }
  }
}
</style>
