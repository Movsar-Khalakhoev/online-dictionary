import { fetchDropdownTranslations, fetchTranslationsList } from "api/index";
import { Lang, DropdownTranslation, Translation } from "types";
import { createStore } from "utils";

interface Store {
  inputValue: string;
  selectedLang: Lang;
  setInputValue(value: string): void;
  setSelectedLang(lang: Lang): void;
  fetchDropdownTranslations: {
    execute(): void;
    data: DropdownTranslation[];
    timeout: null | number;
    loading: boolean;
  };
  fetchTranslationsList: {
    execute(): void;
    data: Translation[];
    loading: boolean;
  };
}

export const useStore = createStore<Store>((set, get) => ({
  inputValue: "",
  selectedLang: Lang.English,
  setInputValue(value: string) {
    const prevTimeout = get().fetchDropdownTranslations.timeout;
    if (prevTimeout !== null) clearTimeout(prevTimeout);

    set((state) => {
      state.inputValue = value;
      state.fetchDropdownTranslations.timeout = null;
    });

    const timeout = setTimeout(get().fetchDropdownTranslations.execute, 300);

    set((state) => {
      state.fetchDropdownTranslations.timeout = timeout;
    });
  },
  setSelectedLang(lang) {
    set((state) => {
      state.selectedLang = lang;
    });
    get().fetchDropdownTranslations.execute();
  },
  fetchDropdownTranslations: {
    execute() {
      set((state) => {
        state.fetchDropdownTranslations.loading = true;
        state.fetchDropdownTranslations.timeout = null;
      });
      fetchDropdownTranslations(get().inputValue, get().selectedLang, 100, 0)
        .then((data) => {
          set((state) => {
            state.fetchDropdownTranslations.data = data;
            state.fetchDropdownTranslations.loading = false;
          });
        })
        .catch(() => {
          set((state) => {
            state.fetchDropdownTranslations.loading = false;
          });
        });
    },
    data: [],
    timeout: null,
    loading: false,
  },
  fetchTranslationsList: {
    execute() {
      set((state) => {
        state.fetchTranslationsList.loading = true;
      });
      fetchTranslationsList(get().inputValue, get().selectedLang, 100, 0)
        .then((data) => {
          set((state) => {
            state.fetchTranslationsList.data = data;
            state.fetchTranslationsList.loading = false;
          });
        })
        .catch(() => {
          set((state) => {
            state.fetchTranslationsList.loading = false;
          });
        });
    },
    data: [],
    loading: false,
  },
}));
