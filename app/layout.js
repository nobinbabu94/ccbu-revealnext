import { AuthProvider } from "./components/AuthProvider";
import AuthWrapper from "./components/AuthWrapper";
import { ThemeProvider } from "./components/ThemeProvider";

import "./globals.css";
import "./styles/analytic.css";

export const metadata = {
  title: "Reveal",
  description: "Reveal Space Analysis System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <AuthWrapper>
              {children}
            </AuthWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}