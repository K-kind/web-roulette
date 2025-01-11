import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { RoulettePage } from "./components/RoulettePage";
import { AppShell, Container } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <AppShell header={{ height: 56 }} padding="md">
        <AppShell.Header>
          <Container className="h-full flex items-center" size="sm">
            <a href="/">Webルーレット</a>
          </Container>
        </AppShell.Header>

        <AppShell.Main px={0}>
          <Container size="sm">
            <RoulettePage />
          </Container>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
