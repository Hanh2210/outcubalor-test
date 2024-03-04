import usdFlag from "@/assets/icons/currency-flags/USD_Balance.svg";
import eurFlag from "@/assets/icons/currency-flags/EUR_Balance.svg";
import cadFlag from "@/assets/icons/currency-flags/CAD_Balance.svg";
import gbpFlag from "@/assets/icons/currency-flags/GBP_Balance.svg";
import mxnFlag from "@/assets/icons/currency-flags/MX_Balance.svg";
import plnFlag from "@/assets/icons/currency-flags/PL_Balance.svg";

import iconViewList from "@/assets/icons/view-list.svg";
import iconViewGallery from "@/assets/icons/view-gallery.svg";
import iconViewCard from "@/assets/icons/credit-card.svg";
import iconDataBase from "@/assets/icons/database.svg";
import iconConvert from "@/assets/icons/swap-horizontal.svg";
import iconChat from "@/assets/icons/chat.svg";

export const CURRENCY = [
  {
    flag: usdFlag,
    label: "USD",
  },
  {
    flag: eurFlag,
    label: "EUR",
  },
  {
    flag: cadFlag,
    label: "CAD",
  },
  {
    flag: gbpFlag,
    label: "GBP",
  },
  {
    flag: mxnFlag,
    label: "MXN",
  },
  {
    flag: plnFlag,
    label: "PLN",
  },
];

export const MENU = [
  {
    label: "My Accounts",
    icon: iconViewList,
  },
  {
    label: "Transactions",
    icon: iconViewGallery,
  },
  {
    label: "Manage Cards",
    icon: iconViewCard,
  },
  {
    label: "Deposit Money",
    icon: iconDataBase,
  },
  {
    label: "Convert Money",
    icon: iconConvert,
  },
  {
    label: "Live Chat",
    icon: iconChat,
  },
];
