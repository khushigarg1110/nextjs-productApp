import Providers from "./providers";
import Navbar from "@/features/auth/components/navbar";
import "./globals.css"; 
import "react-toastify/dist/ReactToastify.css";


export const metadata = {
  title: "ShopEasy",
  description: "Best place to buy products online",
};


export default function RootLayout({ children }: { children: React.ReactNode })  {
  return (
    <html>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
