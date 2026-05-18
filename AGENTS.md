# AGENTS.md

Rules for AI coding agents working in this bare React Native TypeScript repository.

Read and follow `BARE_REACT_NATIVE_CODE_RULES.md` before making code changes.

## Core Behavior

- Make minimal, targeted changes.
- Preserve existing architecture unless the task explicitly asks for refactoring.
- Prefer production-ready code over quick demos.
- Do not introduce new libraries unless they clearly improve the solution.
- When a library is needed, install it using the project package manager and update lockfiles.
- Prefer `npx expo install` when the project uses Expo modules, even in a bare React Native setup.
- Run iOS pods after native dependency changes.
- Do not leave TODO comments for required functionality.
- Do not suppress TypeScript or ESLint errors instead of fixing the cause.

## React Native and TypeScript Rules

- Use functional components only.
- Use named exports only, except files where the framework or tool requires a default export.
- Use explicit TypeScript interfaces for component props.
- Destructure props in the function signature.
- Keep screen components thin.
- Move non-trivial logic into containers, hooks, services, or utilities.
- Use `React.memo()` intentionally for pure components that benefit from it, especially list items.
- Do not wrap every component with `React.memo()` by default.
- Do not use `any`; use `unknown` and narrow it, or define a proper type.
- Keep API DTO types separate from app/domain models when useful.

## Screens, Navigation, and Architecture

- Use React Navigation as the default navigation library.
- Keep navigation setup under `src/navigation/`.
- Type every navigator param list.
- Do not pass large objects through navigation params; pass IDs instead.
- Avoid navigation calls from deeply nested components when callback props are clearer.
- Use a container vs presentational split for complex screens.
- Shared reusable UI belongs in `src/components/`.
- Feature-specific UI belongs in `src/features/[feature-name]/`.
- Avoid cross-feature imports when a shared module should exist instead.

## Styling Rules

- Use NativeWind classes for normal UI.
- Avoid `StyleSheet.create` and inline style objects for standard layout and visual styling.
- Use style objects only for runtime-calculated values, animated styles, gesture-driven transforms, safe-area values, or third-party/native-heavy components.
- Keep design tokens in `tailwind.config.js` / `tailwind.config.ts`.
- Use an 8px spacing system.
- Use `rounded-xl` as the default radius unless the component design requires something else.
- Include pressed, disabled, loading, empty, and error states where relevant.
- Respect safe areas on iOS and Android.
- Avoid web-only Tailwind utilities that do not work in React Native.

## Data, Forms, and Mutations

- Keep API calls and external service logic out of presentational components.
- Use service functions for API, storage, notifications, permissions, and native integrations.
- Use TanStack Query, RTK Query, or the existing project standard for server state when caching/refetching is needed.
- Use local state for local UI concerns.
- Use Redux Toolkit or another global store only when the app has real shared state needs.
- Use `react-hook-form` for complex forms.
- Use `zod` for validation schemas.
- Validate user input before sending mutations.
- Normalize API errors at the data layer when possible.

## Native Modules and Platform Rules

- Treat native dependency changes as platform changes.
- After adding or changing native dependencies, run pods and rebuild the app.
- Keep iOS `Info.plist` and Android manifest permission strings accurate.
- Request permissions only when the feature needs them.
- Handle denied and permanently denied permission states gracefully.
- Test platform-specific behavior on the relevant platform.
- Use `Platform.select` or platform-specific files only when behavior truly differs.

## Lists and Performance

- Use `FlatList`, `SectionList`, or an optimized list library for long lists.
- Never render large dynamic lists with plain `.map()` inside a `ScrollView`.
- Use stable keys.
- Keep `renderItem` stable with `useCallback` when the list is large or frequently updated.
- Memoize list item components when useful.
- Avoid expensive calculations in render paths.
- Use `useMemo` and `useCallback` intentionally, not mechanically.
- Profile before adding complex performance optimizations.

## Accessibility

- Add `accessibilityLabel` to icon-only buttons.
- Add `accessibilityRole` where it improves clarity.
- Keep touch targets at least 44x44 points where possible.
- Do not rely only on color to communicate state.
- Support dynamic text sizing unless the product explicitly limits it.
- Ensure sufficient contrast.

## Security and Config

- Never store passwords.
- Never hardcode private API keys or secrets in the app.
- Treat all mobile-bundled environment values as public.
- Use HTTPS for network requests.
- Store auth tokens securely when possible.
- Clear auth/session state on logout.
- Do not log tokens, personal data, or sensitive request bodies.
- Keep `.env.example` updated when environment variables change.
- Protect backend APIs with server-side authorization; never rely on mobile-only checks.

## Testing and Verification

After code changes, run the available checks:

```bash
npm run typecheck
npm run lint
npm run test
npx tsc --noEmit
```

For native dependency or platform changes, also run the relevant commands:

```bash
npx pod-install
npm run ios
npm run android
```

If a script does not exist, use the closest available command and mention what could not be run.

## Build and Release

- Keep iOS and Android build steps documented.
- Do not commit private keys, keystores, provisioning profiles, or certificates.
- Increment build numbers correctly for store submissions.
- Test release builds before submission.
- Test on real devices before production release when possible.
- Keep store metadata, screenshots, privacy answers, and permission descriptions aligned with actual app behavior.

## Forbidden

- Do not use `any`.
- Do not add class components.
- Do not put business logic inside large JSX components.
- Do not duplicate feature components when a shared component should exist.
- Do not use `require()` unless a specific native/config file requires it.
- Do not render large dynamic lists with plain `.map()` inside `ScrollView`.
- Do not pass large objects through navigation params.
- Do not scatter API calls randomly across components.
- Do not store secrets in the app bundle.
- Do not store passwords.
- Do not ignore failing checks.
- Do not skip loading, empty, and error states for important screens.
