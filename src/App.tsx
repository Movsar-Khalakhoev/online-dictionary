import { Container, MantineProvider } from "@mantine/core";
import { Header } from "./components/header";
import { TranslationsDropdown } from "./components/translations-dropdown";
function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Header />
      <Container mt={30}>
        <TranslationsDropdown />
      </Container>
    </MantineProvider>
  );
}

export default App;
