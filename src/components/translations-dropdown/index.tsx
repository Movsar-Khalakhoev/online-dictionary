import { Loader, SegmentedControl, Select, SelectItem, Text, createStyles } from "@mantine/core";
import { useStore } from "store";
import { Language } from "types";
import { DropdownItem } from "./dropdown-item";

const useStyles = createStyles(() => ({
  container: {
    display: "flex",
    gap: 10,
    width: "100%",
  },
  selectContainer: {
    flexGrow: 7,
  },
  segmentedControlContainer: {
    flexGrow: 1,
  },
  segmentedControlLabel: {
    whiteSpace: "nowrap",
  },
  segmentedControl: {
    width: "100%",
  },
}));

export function TranslationsDropdown() {
  const { classes } = useStyles();
  const { data, loading } = useStore((state) => state.fetchDropdownTranslations);
  const inputValue = useStore((state) => state.inputValue);
  const selectedLang = useStore((state) => state.selectedLanguage);
  const setInputValue = useStore((state) => state.setInputValue);
  const setSelectedLang = useStore((state) => state.setSelectedLanguage);
  const fetchTranslationsList = useStore((state) => state.fetchTranslationsList.execute);
  const mappedData: SelectItem[] = data.map((item) => ({ value: item.id, label: selectedLang === Language.Russian ? item.firstLangTranslation : item.secondLangTranslation }));

  return (
    <div className={classes.container}>
      <div className={classes.selectContainer}>
        <Text>&nbsp;</Text>
        <Select
          data={mappedData}
          icon={<Loader size={20} visibility={loading ? "visible" : "hidden"} />}
          searchable
          searchValue={inputValue}
          onChange={fetchTranslationsList}
          onSearchChange={(str) => {
            console.log("str", str);
            return setInputValue(str);
          }}
          hoverOnSearchChange={false}
          filterDataOnExactSearchMatch={false}
          placeholder="Введите слово"
          itemComponent={DropdownItem}
          nothingFound="Ничего не найдено"
        />
      </div>
      <div className={classes.segmentedControlContainer}>
        <Text className={classes.segmentedControlLabel}>Переводить с:</Text>
        <SegmentedControl
          disabled={loading}
          className={classes.segmentedControl}
          onChange={setSelectedLang}
          data={[
            { label: "англ", value: Language.English },
            { label: "рус", value: Language.Russian },
          ]}
        />
      </div>
    </div>
  );
}
