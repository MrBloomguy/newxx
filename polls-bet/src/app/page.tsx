import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/layout/RightSidebar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-12 gap-6">
          <Sidebar />
          <main className="col-span-6 space-y-4">
            {/* Poll feed will go here */}
          </main>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}