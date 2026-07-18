import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import CustomCursor from "../components/CustomCursor";
import LoadingScreen from "../components/LoadingScreen";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
});

export const metadata = {
  title: "NepJewls | Timeless Craftsmanship. Born in Nepal.",
  description: "Handcrafted fine jewelry from Kathmandu. The mastery of light, designed for generations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable}`}>
        <CustomCursor />
        <LoadingScreen />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
