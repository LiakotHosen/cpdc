import { Service } from '@/lib/types';

/**
 * Curated demo images for initial treatment showcase.
 * Real uploaded `service.image_url` always takes precedence over these fallbacks.
 */
export const DEMO_TREATMENT_IMAGES: Record<string, string> = {
  // General & Diagnostic
  s1: '/images/services/general-diagnostic.jpg', // Doctor Consultation
  s2: '/images/services/cat-diagnostic-3d.jpg',  // Dental X-ray (RVG)
  s3: '/images/clinic_operatory_bg.jpg',         // Scaling & Polishing

  // Cosmetic Dentistry
  s4: '/images/services/cat-cosmetic-3d.jpg',    // Tooth Whitening (Bleaching)
  s5: '/images/services/cosmetic-dentistry.jpg',  // Smile Designing
  s6: '/images/services/cat-cosmetic-3d.jpg',    // Front Teeth Gap Closure

  // Restorative Dentistry
  s7: '/images/dental_3d_shield.jpg',            // Tooth-Colored Filling (Composite)
  s8: '/images/services/cat-diagnostic-3d.jpg',  // Cap / Crown - PFM
  s9: '/images/dental_3d_shield.jpg',            // Cap / Crown - Zirconia

  // Root Canal Treatment
  s11: '/images/services/cat-diagnostic-3d.jpg', // Root Canal - Anterior
  s12: '/images/services/cat-diagnostic-3d.jpg', // Root Canal - Posterior

  // Oral Surgery
  s15: '/images/services/cat-surgery-3d.jpg',    // Simple Tooth Extraction
  s16: '/images/services/cat-surgery-3d.jpg',    // Surgical Tooth Extraction
  s17: '/images/services/cat-surgery-3d.jpg',    // Impacted Wisdom Tooth Surgery
};

/**
 * Resolves the visual image for a given service.
 * Returns the service's custom image_url if set, otherwise a demo image if available,
 * or undefined if it should render the elegant cream-toned skeleton placeholder.
 */
export function getTreatmentImage(service?: Service | null): string | undefined {
  if (!service) return undefined;
  if (service.image_url && service.image_url.trim() !== '') {
    return service.image_url;
  }
  return DEMO_TREATMENT_IMAGES[service.id];
}
