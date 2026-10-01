import {
  getSiteSettings,
  getDoctor,
  getFeatures,
  getCategories,
  getServices,
  getVideoReels,
  getReviews,
} from '@/lib/data/api';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { CostCalculatorWidget } from '@/components/calculator/CostCalculatorWidget';
import { DoctorSpotlight } from '@/components/home/DoctorSpotlight';
import { VideoReelsSection } from '@/components/home/VideoReelsSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { EmergencyBanner } from '@/components/home/EmergencyBanner';
import { LocationWayfindingSection } from '@/components/common/LocationWayfindingSection';

export const revalidate = 60;

export default async function HomePage() {
  const [settings, doctor, features, categories, services, reels, reviews] = await Promise.all([
    getSiteSettings(),
    getDoctor(),
    getFeatures(),
    getCategories(),
    getServices(),
    getVideoReels(),
    getReviews(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection settings={settings} doctor={doctor} />
      <DoctorSpotlight doctor={doctor} />
      <FeaturesSection features={features} />
      <ServicesGrid categories={categories} services={services} />

      {/* Cost Calculator Section */}
      <CostCalculatorWidget services={services} categories={categories} fullPageMode={false} />

      {/* Location & Wayfinding Chamber Section */}
      <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LocationWayfindingSection settings={settings} doctor={doctor} showTitle={true} />
        </div>
      </section>

      <VideoReelsSection reels={reels} />
      <ReviewsSection reviews={reviews} />
      <EmergencyBanner />
    </div>
  );
}