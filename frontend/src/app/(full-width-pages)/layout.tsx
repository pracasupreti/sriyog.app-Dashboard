import AuthGuard from "@/components/auth/AuthGuard";

export default function FullWidthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>
    <AuthGuard>{children}</AuthGuard>
    </div>;
}
