import "./globals.css";
import { HubProvider } from "@/context/HubContext";

export const metadata = {
  title: "Wicker Park Hub — Your Neighborhood, Connected",
  description:
    "A community hub for Wicker Park residents: real-time neighborhood alerts, local news, events, photos, and trusted home-repair recommendations.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#26231f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HubProvider>{children}</HubProvider>
      </body>
    </html>
  );
}
