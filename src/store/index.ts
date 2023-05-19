import { fetchDropdownTranslations, fetchTranslationsList } from "api";
import { Language, DropdownTranslation, Translation } from "types";
import { createStore } from "utils";

interface Store {
  inputValue: string;
  selectedLanguage: Language;
  setInputValue(value: string): void;
  setSelectedLanguage(lang: Language): void;
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
  selectedLanguage: Language.English,
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
  setSelectedLanguage(lang) {
    set((state) => {
      state.selectedLanguage = lang;
    });
    get().fetchDropdownTranslations.execute();
  },
  fetchDropdownTranslations: {
    execute() {
      set((state) => {
        state.fetchDropdownTranslations.loading = true;
        state.fetchDropdownTranslations.timeout = null;
      });
      fetchDropdownTranslations(get().inputValue, get().selectedLanguage, 100, 0)
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
      fetchTranslationsList(get().inputValue, get().selectedLanguage, 100, 0)
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
