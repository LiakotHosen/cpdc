import React from 'react';
import { Metadata } from 'next';
import { getCategories, getServices } from '@/lib/data/api';
import { CostCalculatorWidget } from '@/components/calculator/CostCalculatorWidget';

export const metadata: Metadata = {
  title: 'Dental Cost Calculator | Care Point Dental Clinic Ashulia',
  description: 'Calculate dental treatment costs in Ashulia, Savar. Real-time BDT price estimates for scaling, root canal, fillings, crowns, and implants with instant appointment booking.',
};

export default async function CalculatorPage() {
  const [categories, services] = await Promise.all([
    getCategories(),
    getServices(),
  ]);

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CostCalculatorWidget
          categories={categories}
          services={services}
          fullPageMode={true}
        />
      </div>
    </div>
  );
}
