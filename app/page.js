import EmergencyBanner from "@/components/EmergencyBanner";
import Header from "@/components/Header";
import CommunityFeed from "@/components/CommunityFeed";
import AdminPanel from "@/components/AdminPanel";

export default function Home() {
  return (
    <>
      <EmergencyBanner />
      <Header />
      <main className="mx-auto max-w-content px-4 pb-24 pt-8">
        <CommunityFeed />
      </main>
      <footer className="border-t border-charcoal-line/30 bg-offwhite">
        <div className="mx-auto max-w-content px-4 py-8 text-base text-charcoal/60">
          <p className="font-semibold text-charcoal">Marion Ct. Hub</p>
          <p className="mt-1">
            Built by and for neighbors. Alerts are posted by verified block
            captains.
          </p>
        </div>
      </footer>
      <AdminPanel />
    </>
  );
}
