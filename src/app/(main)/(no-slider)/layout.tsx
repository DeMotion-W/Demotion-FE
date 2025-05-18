import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function NoSliderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const refreshToken =
    cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    redirect("/login");
  }

  return (
    <div className="w-full h-screen bg-white">
      {children}
    </div>
  );
}
