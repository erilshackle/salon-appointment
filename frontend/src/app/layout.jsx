import "../styles/globals.css";
import Menu from "@/components/Menu"

export const metadata = {
  title: "Sistema de Agendamento",
  description: "Sistema de agendamento para salão de beleza",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
          <Menu />
          {children}
        </body>
    </html>
  );
}
