import { Loader, SegmentedControl, Select, SelectItem, Text, createStyles } from "@mantine/core";
import { useStore } from "store";
import { Lang } from "types";
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
  const { data, loading } = useStore((state) => state.fetchTranslations);
  const inputValue = useStore((state) => state.inputValue);
  const selectedLang = useStore((state) => state.selectedLang);
  const setInputValue = useStore((state) => state.setInputValue);
  const setSelectedLang = useStore((state) => state.setSelectedLang);
  const mappedData: SelectItem[] = data.map((item) => ({ value: item.id, label: selectedLang === Lang.Russian ? item.firstLangTranslation : item.secondLangTranslation }));

  return (
    <div className={classes.container}>
      <div className={classes.selectContainer}>
        <Text>&nbsp;</Text>
        <Select
          data={mappedData}
          icon={<Loader size={20} visibility={loading ? "visible" : "hidden"} />}
          searchable
          searchValue={inputValue}
          onSearchChange={setInputValue}
          placeholder="Введите слово"
          itemComponent={DropdownItem}
        />
      </div>
      <div className={classes.segmentedControlContainer}>
        <Text className={classes.segmentedControlLabel}>Переводить с:</Text>
        <SegmentedControl
          disabled={loading}
          className={classes.segmentedControl}
          onChange={setSelectedLang}
          data={[
            { label: "англ", value: Lang.English },
            { label: "рус", value: Lang.Russian },
          ]}
        />
      </div>
    </div>
  );
}
