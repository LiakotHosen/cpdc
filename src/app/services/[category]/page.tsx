import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategories, getServices } from '@/lib/data/api';
import { CategoryDetailClient } from './CategoryDetailClient';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categories = await getCategories();
  const currentCat = categories.find((c) => c.slug === category);

  if (!currentCat) {
    return {
      title: 'Category Not Found | Care Point Dental Clinic',
    };
  }

  return {
    title: `${currentCat.name_en} | Care Point Dental Clinic Ashulia`,
    description: `${currentCat.description_en} Professional dental care by Dr. Aktar Zahan Ony in Pollibidyut, Ashulia, Savar.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const [categories, services] = await Promise.all([
    getCategories(),
    getServices(),
  ]);

  const currentCat = categories.find((c) => c.slug === category);

  if (!currentCat) {
    notFound();
  }

  const categoryServices = services.filter((s) => s.category_id === currentCat.id);

  return (
    <CategoryDetailClient
      category={currentCat}
      allCategories={categories}
      services={categoryServices}
    />
  );
}
