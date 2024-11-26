import Header from "@/components/layout/Header";
import PostFeed from "@/components/shared/PostFeed";
import RightSidebar from "@/components/layout/RightSidebar";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";

export default function Home() {
  return (

    
    <div className="min-h-screen bg-background pb-16 lg:pb-0"> {/* Added padding bottom for mobile nav */}
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-4">
          {/* Left Sidebar - Leaderboard */}
          <aside className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </aside>

          {/* Main Feed */}
          <main className="lg:col-span-6 space-y-4">
            <PostFeed />
          </main>
          
          {/* Right Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <RightSidebar />
          </aside>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}