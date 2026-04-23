# Landing Page Refactor — Maintainability

**Date:** 2026-04-24
**Goal:** Clean up component boundaries, remove i18n, simplify animations. No file reorganization, no content extraction, no performance-first changes.

## 1. Remove i18n System

### Files to delete
- `components/context/LanguageContext.tsx`
- `components/context/LanguageContext.example.tsx`
- `components/context/LanguageToggle.tsx`
- `components/context/translations/home.ts`
- `components/context/translations/navigation.ts`
- `components/context/translations/about.ts`
- `components/context/ThemeToggle.tsx` (duplicate; `layout/ThemeToggle.tsx` is the one used)
- `app/test/` directory

### Code changes
- `providers.tsx` — remove `LanguageProvider`, keep only `ThemeProvider`
- `context/index.tsx` — remove all language-related exports
- All section components — replace every `t('key')` call with plain Chinese text
- `Navbar.tsx` — remove Globe icon and language switcher UI

## 2. Animation Simplification

### New: `lib/useScrollReveal.ts`
A hook using `IntersectionObserver` to add a `.revealed` class when elements enter the viewport. Components opt in by attaching a ref.

### New CSS in `globals.css`
- `.reveal` base class: starts invisible with slight downward offset
- `.revealed` class: triggers fade-in + slide-up keyframe
- `.reveal-delay-1` through `.reveal-delay-4`: stagger utilities using `animation-delay`

### Replace Framer Motion with CSS
These patterns move to CSS transitions or the scroll-reveal system:
- `whileInView` fade/slide on sections (AboutSection, ServicesSection, PortfolioSection, Footer)
- `whileHover` scale/translate on cards — becomes Tailwind `hover:scale-105` transitions
- Staggered children delays — becomes CSS `animation-delay`

### Keep Framer Motion for
- HeroSection parallax (scroll-driven y transforms)
- AnimatePresence on Navbar mobile menu (mount/unmount)
- AnimatePresence on ScrollToTop (mount/unmount)
- ThemeToggle icon swap (key-based rotation animation)

## 3. Component Boundary Cleanup

### `providers.tsx`
Simplifies to ThemeProvider only.

### `context/index.tsx`
Exports only `ThemeProvider` and `useTheme`.

### `Navbar.tsx`
Remove language switcher. Keep: scroll-based glass effect, mobile menu with AnimatePresence, ThemeToggle, nav links.

### Section components
- Remove `useLanguage` imports and `t()` calls
- Replace `motion.div` wrappers with plain `div` + `useScrollReveal` ref (except HeroSection)
- Hover effects move to Tailwind classes

### UI components (Button, Card)
- Remove Framer Motion `motion.button` / `motion.div`
- Remove manual props filtering logic for motion conflicts
- Use CSS `transition` + Tailwind hover/active classes instead

### No structural changes
- No file moves or renames
- No new directories
- No content extraction to data files

## 4. Out of Scope
- Performance optimization / Server Components migration
- Content extraction to data files
- File tree reorganization
- Adding new features
