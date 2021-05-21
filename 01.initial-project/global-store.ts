import produce from "immer";
import { atom, DefaultValue, selector } from "recoil";

export const toBeDeletedMapState = atom<{ [key: string]: boolean }>({
  key: "toBeDeletedMapState",
  default: {},
});

export const addToDeleteMapSelector = selector<string>({
  key: "addToDeleteMap",
  get: () => "",
  set: ({ get, set }, todoKey) => {
    if (!(todoKey instanceof DefaultValue)) {
      const map = get(toBeDeletedMapState);

      const newMap = produce(map, (nextMap) => {
        nextMap[todoKey] = true;
      });
      set(toBeDeletedMapState, newMap);
    }
  },
});
