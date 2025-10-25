// Centralized layout constants for consistent spacing and sizing across screens.
// NOTE: These values can be fine-tuned per your spec. Please confirm final pixel values.

export const HEADER_HEIGHT = 64; // [specify value]px — defaulting to 64px

// Additional spacing between the bottom of the header and the start of the content
export const CONTENT_TOP_OFFSET = HEADER_HEIGHT + 24; // increase to account for floating header

// Common horizontal padding used for header/content alignment - increased for better mobile spacing
export const H_PADDING = 20;

// Max width for centered content containers to ensure uniform section width - reduced to prevent edge cutoff
export const MAX_CONTENT_WIDTH = 600; // Reduced from 700 to prevent content from being cut off at the edges

// Spacing helpers
export const SECTION_SPACING = 40; // vertical spacing between sections
export const CARD_GAP = 16; // gap between cards (horizontal/vertical)

export const BG_GRADIENT = ['#CCFBF1', '#F9FAFB', '#FFFFFF'];
// Slightly darker than previous '#E6FFFA' to add more depth while keeping the mint feel