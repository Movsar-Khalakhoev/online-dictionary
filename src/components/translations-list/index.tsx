import { Box, Card, LoadingOverlay, ScrollArea, Text, createStyles } from "@mantine/core";
import { useStore } from "store";

const useStyles = createStyles(() => ({
  container: {
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  list: {
    height: "100%",
    overflowY: "auto",
    marginBottom: 10,
  },
}));

export function TranslationsList() {
  const { data, loading } = useStore((state) => state.fetchTranslationsList);
  const selectedLang = useStore((state) => state.selectedLang);
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <LoadingOverlay visible={loading} />
      <ScrollArea className={classes.list}>
        {data.map((transition) => (
          <Card key={transition.id} shadow="sm" mb={10} withBorder>
            <Text>
              {transition.firstLangTranslation} - {transition.secondLangTranslation}
            </Text>
            <Text>{transition.firstLangDescription}</Text>
            <Text>{transition.secondLangDescription}</Text>
          </Card>
        ))}
      </ScrollArea>
    </Box>
  );
}
