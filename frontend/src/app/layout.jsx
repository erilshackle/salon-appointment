import "../styles/globals.css";

export const metadata = {
  title: "Sistema de Agendamento",
  description: "Sistema de agendamento para salão de beleza",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
