import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export const isLoadingState = atom({
  key: "isLoadingState",
  default: false,
})
