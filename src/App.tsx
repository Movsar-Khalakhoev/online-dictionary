import { Container, MantineProvider, createStyles } from "@mantine/core";
import { Header } from "./components/header";
import { TranslationsDropdown } from "./components/translations-dropdown";
import { TranslationsList } from "components/translations-list";

const useStyles = createStyles((theme) => ({
  container: {
    display: "grid",
    height: `calc(100vh - 5rem)`,
    gridTemplateRows: "auto 1fr",
    rowGap: 20,
  },
}));

function App() {
  const { classes } = useStyles();

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Header />
      <Container mt={30} className={classes.container}>
        <TranslationsDropdown />
        <TranslationsList />
      </Container>
    </MantineProvider>
  );
}

export default App;
