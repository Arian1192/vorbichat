import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      {...pageProps}
      frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}
    >
      <ThemeProvider
        value={{ light: "cmyk", dark: "business", system: "business" }}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
