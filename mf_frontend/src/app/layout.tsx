import { Providers } from "@/modules/core";
import { Metadata } from "next";
import { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "MazeFaze",
  description:
    "Dive into the cybernetic chaos of MazeFaze, a thrilling multiplayer maze runner that's part Tron, part mind-bender.",
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
