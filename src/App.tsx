import { AppRouter } from './AppRouter';
import { ThemeProvider } from './context/theme';

export function App() {
  return (
    <>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </>
  );
}
