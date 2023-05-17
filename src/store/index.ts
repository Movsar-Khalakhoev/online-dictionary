import { fetchTranslations } from "api/index";
import { Lang, Translation } from "types";
import { createStore } from "utils";

interface Store {
  inputValue: string;
  selectedLang: Lang;
  setInputValue(value: string): void;
  setSelectedLang(lang: Lang): void;
  fetchTranslations: {
    execute(): void;
    data: Translation[];
    timeout: null | number;
    loading: boolean;
  };
}

export const useStore = createStore<Store>((set, get) => ({
  inputValue: "",
  selectedLang: Lang.English,
  setInputValue(value: string) {
    const prevTimeout = get().fetchTranslations.timeout;
    if (prevTimeout !== null) clearTimeout(prevTimeout);

    set((state) => {
      state.inputValue = value;
      state.fetchTranslations.timeout = null;
    });

    const timeout = setTimeout(get().fetchTranslations.execute, 300);

    set((state) => {
      state.fetchTranslations.timeout = timeout;
    });
  },
  setSelectedLang(lang) {
    set((state) => {
      state.selectedLang = lang;
    });
    get().fetchTranslations.execute();
  },
  fetchTranslations: {
    execute() {
      set((state) => {
        state.fetchTranslations.loading = true;
        state.fetchTranslations.timeout = null;
      });
      fetchTranslations(get().inputValue, get().selectedLang, 100, 0)
        .then((data) => {
          set((state) => {
            state.fetchTranslations.data = data;
            state.fetchTranslations.loading = false;
          });
        })
        .catch(() => {
          set((state) => {
            state.fetchTranslations.loading = false;
          });
        });
    },
    data: [],
    timeout: null,
    loading: false,
  },
}));
