export const metadata = {
  title: "School Directory",
  description: "A simple Next.js + MySQL CRUD with Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
