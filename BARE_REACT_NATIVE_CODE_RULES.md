# Bare React Native Code Rules

A living document for project conventions, architecture boundaries, and consistency rules for bare React Native applications written in TypeScript.

These rules are adapted from the Next.js code rules and converted for mobile-native React Native projects. They assume a bare React Native setup, TypeScript, React Navigation, NativeWind, native modules when needed, and production-ready iOS/Android workflows.

---

## 1) Components

- Functional components only. Do not use class components.
- Named exports only, except files where the framework or tool requires a default export.
- One component per file for shared or reusable components.
- Props must use explicit TypeScript interfaces named `ComponentNameProps`.
- Destructure props in the function signature.
- Keep components focused and small.
- Move non-trivial view logic into hooks, services, utilities, or container components.
- Use `React.memo()` for pure components that benefit from it, especially list items and frequently re-rendered UI.
- Do not wrap every component in `React.memo()` by default.
- Prefer controlled composition over deeply nested prop drilling.
- Avoid anonymous inline render functions in heavily rendered lists unless justified.
- Shared UI components should be reusable and not depend on screen-specific fetching or navigation details.

Example:

```tsx
import { Text, View } from 'react-native';

interface UserCardProps {
  name: string;
  email: string;
}

export function UserCard({ name, email }: UserCardProps) {
  return (
    <View className="rounded-xl border border-gray-200 p-4">
      <Text className="text-base font-semibold text-gray-900">{name}</Text>
      <Text className="text-sm text-gray-500">{email}</Text>
    </View>
  );
}
```

---

## 2) TypeScript

- TypeScript is required for all source files.
- Use `.tsx` for files that render JSX.
- Use `.ts` for utilities, services, constants, types, schemas, and store logic.
- Never use `any`; use `unknown` and narrow it, or define a proper type.
- Avoid broad object types such as `object`, `{}`, and `Function`.
- Use interfaces for component props.
- Use type aliases for unions, primitives, mapped types, and function signatures.
- Export shared types from feature-local `types/` folders or shared `src/types/`.
- Keep API DTO types separate from app/domain models when the backend shape is noisy or unstable.
- Use strict TypeScript settings when possible.
- Run `npx tsc --noEmit` after code changes.

---

## 3) Screens, Containers, and Presentational Components

- Screens should compose feature containers and handle navigation-level concerns.
- Containers should handle fetching, state, side effects, calculations, and event coordination.
- Presentational components should receive data via props and focus on JSX/layout.
- Do not put large business logic directly inside screen JSX.
- Do not fetch data inside deeply nested presentational components unless there is a strong reason.
- Route/screen params must be typed.
- Keep screen files readable and thin when the feature grows.

Recommended separation:

```txt
src/features/profile/
  screens/
    ProfileScreen.tsx
  containers/
    ProfileContainer.tsx
  components/
    ProfileHeader.tsx
    ProfileStats.tsx
  hooks/
    useProfile.ts
  services/
    getProfile.ts
  types/
    profile.types.ts
```

---

## 4) Navigation

- Use React Navigation as the default navigation library.
- Keep navigation configuration under `src/navigation/`.
- Type every navigator param list.
- Do not pass large objects through navigation params; pass IDs and fetch/derive data in the target screen.
- Keep route names centralized and typed.
- Use nested navigators intentionally.
- Avoid navigation calls from deeply nested components when a callback prop is clearer.
- Use safe navigation helpers only when they improve consistency.
- Handle deep links explicitly if the app supports them.

Example:

```ts
export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
};
```

```tsx
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/navigation/types';

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export function ProfileScreen({ route }: ProfileScreenProps) {
  const { userId } = route.params;

  return <ProfileContainer userId={userId} />;
}
```

---

## 5) Styling

- Use NativeWind as the default styling approach.
- Use `className` for normal app UI.
- Do not use `StyleSheet.create` for standard styling unless there is a clear reason.
- Avoid inline style objects for standard layout and visual styling.
- All design tokens such as colors, spacing, typography, radius, and shadows must live in `tailwind.config.js` / `tailwind.config.ts`.
- Use an 8px spacing system.
- Use `rounded-xl` as the default radius unless the component design requires something else.
- Keep typography consistent and avoid random text sizes.
- Interactive elements should have clear pressed, disabled, loading, and error states.
- Avoid web-only Tailwind utilities that do not work in React Native.

### Allowed exceptions

Use `style` only when NativeWind is not a good fit, such as:

- runtime-calculated dimensions
- animated styles
- gesture-driven transforms
- Reanimated shared values
- safe-area dependent values
- third-party libraries requiring style objects
- maps, charts, camera, video, canvas, or native-heavy components

In those cases:

- keep the exception local
- document why it is needed if not obvious
- do not mix large style objects into otherwise simple components

---

## 6) UI and Design Quality

### Package Installation Policy

- Do not ask before installing UI/styling packages when the task clearly requires them.
- When a screen needs animations, install or use `react-native-reanimated`.
- When a screen needs gestures, install or use `react-native-gesture-handler`.
- When a screen needs icons, use one primary icon set consistently, preferably `@expo/vector-icons` / Ionicons if the project already uses Expo-compatible packages.
- When a component needs charts, maps, camera, image picker, calendar, notifications, or storage, install a suitable React Native library if needed.
- Prefer `npx expo install` for compatibility resolution when the project uses Expo modules, even in a bare React Native project.
- Always run `npx tsc --noEmit` after installing new packages.
- Run iOS pods after native dependency changes.

### Design Principles

- Maximum 2 font families: one heading, one body.
- Use a consistent spacing scale.
- Use shadows sparingly, only for elevated elements such as cards, modals, sheets, and floating actions.
- Provide loading states for every async operation.
- Provide empty states with helpful copy and action for every list screen.
- Use a single primary icon set consistently.
- Animations should usually be under 300ms for UI transitions.
- Every interactive element must have visual feedback.
- Support small screens and large phones.
- Respect safe areas on iOS and Android.
- Respect dark mode only if the project officially supports it.

### Component Quality

- Components must be production-ready.
- Include pressed, disabled, loading, and error states where relevant.
- Add accessibility labels to all icon-only interactive elements.
- Provide skeleton/loading variants for data-dependent components.
- Handle error and empty states in list components.
- Avoid layout shift during loading.

---

## 7) State Management

- Local ephemeral UI state such as modal visibility, input drafts, temporary toggles, and selected tabs should stay in component state.
- Use URL/deep-link state only for shareable navigation state when applicable.
- Use Redux Toolkit only when the app has complex global client-side state.
- Do not use vanilla Redux.
- Do not use Context API for global business state.
- Context is allowed for narrow cross-cutting concerns such as theme provider, auth shell, feature providers, or dependency injection where Redux would be excessive.
- Server state should be handled with TanStack Query, RTK Query, or feature service hooks when caching, refetching, pagination, polling, or optimistic updates are needed.
- Do not put obviously local state into Redux unless multiple distant parts of the app truly need it.
- Persist only the minimum state required.
- Avoid storing derived state when it can be calculated safely.

Typed Redux hooks, when Redux is used:

```ts
import { useAppDispatch, useAppSelector } from '@/store/hooks';
```

---

## 8) API and Data Layer

- Keep API calls out of UI components when logic is non-trivial.
- Use service modules by domain.
- Do not create one giant API utility file.
- Normalize API errors at the API boundary when possible.
- Use typed request and response models.
- Transform API responses at the boundary when needed.
- Do not leak raw backend response shapes deep into UI components.
- Keep auth token attachment and refresh handling inside the API client layer.
- Do not expose secrets in the mobile app bundle.
- Treat all app-bundled values as public.

Recommended structure:

```txt
src/services/
  api/
    apiClient.ts
    apiErrors.ts
  users/
    getUser.ts
    updateUser.ts
    user.types.ts
```

Example:

```ts
import { apiClient } from '@/services/api/apiClient';

export interface User {
  id: string;
  name: string;
  email: string;
}

export async function getUser(userId: string): Promise<User> {
  const response = await apiClient.get<User>(`/users/${userId}`);
  return response.data;
}
```

---

## 9) Forms

- Use `react-hook-form` for complex forms.
- Use `zod` for validation schemas.
- No additional UI/UX form libraries are allowed unless the project explicitly chooses one.
- Validation schemas should live close to the feature.
- Avoid hand-written validation logic spread across components.
- Show field errors inline and consistently.
- Use accessible labels and error descriptions.
- Disable submit buttons or show pending state during submission.
- Keep keyboard behavior polished.
- Use `KeyboardAvoidingView`, scroll containers, or keyboard-aware handling where needed.
- Set correct `keyboardType`, `textContentType`, `autoCapitalize`, and `secureTextEntry` values.

---

## 10) Storage and Persistence

- Use secure storage for sensitive tokens when possible.
- Use AsyncStorage only for non-sensitive or low-risk persisted data.
- Do not store passwords.
- Do not store unnecessary personal data.
- Keep persisted schemas versioned when data shape may change.
- Validate persisted data before using it.
- Clear auth-related persisted data on logout.
- Keep persistence access behind service modules.

Recommended structure:

```txt
src/services/storage/
  authStorage.ts
  appStorage.ts
```

---

## 11) Native Modules and Platform Code

- Prefer well-maintained libraries before writing custom native modules.
- Write custom native modules only when required for product functionality or performance.
- Keep native module APIs small, typed, and documented.
- Isolate platform-specific code behind TypeScript service wrappers.
- Use `.ios.ts`, `.android.ts`, `.native.ts`, or platform checks only when necessary.
- Do not scatter `Platform.OS` checks across many components.
- After native dependency changes:
  - run `npx pod-install` or `cd ios && pod install`
  - rebuild the native app
  - update setup documentation if needed

---

## 12) Permissions

- Request permissions only when the feature needs them.
- Explain permission value to the user before or during the request when appropriate.
- Handle denied and permanently denied states gracefully.
- Do not repeatedly request the same permission after denial.
- Keep permission checks inside feature hooks or services.
- Keep iOS `Info.plist` and Android manifest permission strings accurate and user-friendly.

---

## 13) Notifications

- Keep notification scheduling and handling inside a notification service.
- Separate notification permission logic from notification scheduling logic.
- Use typed notification payloads.
- Handle foreground, background, and tapped-notification behavior intentionally.
- Cancel obsolete scheduled notifications when related data changes.
- Do not schedule duplicate notifications.
- Test notifications on real devices when possible.

---

## 14) Lists and Performance

- Use `FlatList`, `SectionList`, or optimized list libraries for long lists.
- Never render large dynamic lists with plain `.map()` inside a `ScrollView`.
- Use stable keys.
- Memoize list item components when useful.
- Keep `renderItem` stable with `useCallback` when the list is large or frequently updated.
- Use `getItemLayout` when item heights are fixed.
- Avoid expensive calculations in render paths.
- Avoid unnecessary derived state.
- Use `useMemo` and `useCallback` intentionally, not mechanically.
- Use image resizing/caching strategies for media-heavy screens.
- Profile performance before adding complex optimizations.

---

## 15) Images, Assets, and Fonts

- Keep static assets under `src/assets/` or a clearly documented assets folder.
- Use consistent naming for images and icons.
- Avoid very large uncompressed image files.
- Prefer appropriately sized image assets per use case.
- Register custom fonts in one centralized place.
- Use maximum 2 font families.
- Keep splash screen, app icon, adaptive icon, and store assets documented.
- Do not hardcode remote asset URLs across components; centralize when reused.

---

## 16) Imports

- Use path alias `@/` for `src/`.
- Import order should be:
  1. React and React Native
  2. third-party libraries
  3. internal `@/` imports
  4. relative imports
- Use barrel exports carefully.
- Barrel exports are good for feature public APIs.
- Do not create barrels that accidentally expose private internals or cause circular imports.
- Avoid deep imports across unrelated features.

---

## 17) Error Handling

- User-facing errors should be shown via toast, inline error UI, modal, or screen-level error states.
- Avoid blocking alerts for normal errors.
- Never leave empty `catch {}` blocks.
- Either handle, transform, report, or rethrow errors intentionally.
- Normalize API errors at the data layer when possible.
- Log unexpected errors in development and send them to monitoring in production.
- Do not expose raw backend errors or stack traces to users.
- Provide retry actions for recoverable async failures.

---

## 18) Loading and Empty States

- Every async screen should have a loading strategy.
- Use skeletons for content-heavy screens.
- Every list screen should have an empty state with helpful copy and a clear action when possible.
- Avoid layout shift during loading.
- Disable or show loading state for buttons during async actions.
- Handle offline or poor-network states where relevant.

---

## 19) Accessibility

- Use semantic React Native components before adding complex accessibility props.
- All interactive elements must be reachable and understandable by screen readers.
- Add `accessibilityLabel` to icon-only buttons.
- Add `accessibilityRole` where it improves clarity.
- Keep touch targets at least 44x44 points where possible.
- Do not rely only on color to communicate state.
- Support dynamic text sizing unless the product explicitly limits it.
- Ensure sufficient contrast.

---

## 20) Security

- Never store passwords.
- Never hardcode private API keys or secrets in the app.
- Treat all mobile-bundled values as public.
- Validate all server responses before trusting critical data.
- Use HTTPS for network requests.
- Store auth tokens securely when possible.
- Clear auth/session state on logout.
- Avoid logging tokens, personal data, or sensitive request bodies.
- Keep dependency updates reviewed.
- Protect backend APIs with server-side authorization; never rely on mobile-only checks.

---

## 21) Testing

- Test files should be colocated with the unit under test.
- Use `Component.test.tsx` naming.
- Test behavior, not implementation details.
- Prefer React Native Testing Library patterns.
- Use Jest for unit and component tests.
- Use Detox or Maestro for end-to-end tests when the project needs mobile E2E coverage.
- Mock network boundaries, not every internal function.
- Test important hooks, services, validation schemas, and reducers.
- Minimum baseline:
  - one test per critical screen
  - one test per shared component
  - one test per critical custom hook
  - one test for each important service or mutation
  - one E2E flow for each critical user journey when E2E is configured

---

## 22) Folder Structure

Suggested baseline:

```txt
src/
  app/
  assets/
    fonts/
    images/
  components/
    ui/
    layout/
  features/[feature-name]/
    components/
    containers/
    hooks/
    screens/
    services/
    types/
    utils/
  hooks/
  navigation/
  services/
    api/
    storage/
  store/
  theme/
  types/
  utils/
```

### Feature module preference

For medium or large apps, prefer grouping by feature:

```txt
src/features/billing/
  components/
  containers/
  hooks/
  screens/
  services/
  types/
  utils/
```

Rules:

- shared reusable UI goes into `components/`
- feature-specific UI stays inside the feature
- screen files stay inside feature `screens/` when feature-owned
- global navigation setup stays under `navigation/`
- avoid dumping everything into `utils/`
- avoid cross-feature imports when a shared layer should exist instead

---

## 23) Hooks

- Custom hooks must start with `use`.
- Hooks should encapsulate reusable stateful logic, not hide unrelated side effects.
- Do not create hooks that merely rename one or two values unless they improve clarity materially.
- Keep hooks focused on a single concern.
- Separate UI hooks from data hooks when possible.
- Keep permission, notification, storage, and API hooks feature-focused where practical.
- Do not hide large business workflows inside vague hooks.

---

## 24) Environment Variables and Config

- Use environment-specific config through the project’s chosen env setup.
- Prefer `@env` or Expo config-based environment handling if already adopted by the project.
- Never store real secrets in mobile env files.
- Treat app env values as public.
- Keep `.env.example` updated.
- Validate required env values during app startup or build scripts when possible.
- Keep dev, staging, and production API base URLs clearly separated.

---

## 25) Linting and Formatting

- Enforce rules with ESLint and Prettier.
- Prefer automated enforcement over team memory.
- Add import sorting and unused import cleanup rules where safe.
- CI should fail on lint and type errors.
- Run the project lint script before merging.
- Run `npx tsc --noEmit` before merging.
- Do not ignore TypeScript, lint, or formatting errors without a documented reason.

---

## 26) Commands

Use the project package manager. Default npm commands:

```bash
npm start
npm run ios
npm run android
npm run lint
npm run test
npm run typecheck
npx tsc --noEmit
npx pod-install
```

If `typecheck` does not exist, add it:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

Recommended clean commands:

```bash
npm start -- --reset-cache
cd ios && pod install && cd ..
cd android && ./gradlew clean && cd ..
```

---

## 27) Build and Release

- Keep iOS and Android build steps documented.
- Use separate bundle identifiers/application IDs for development, staging, and production when needed.
- Keep signing configuration out of source control unless it is intentionally safe.
- Do not commit private keys, keystores, provisioning profiles, or certificates.
- Increment build numbers correctly for store submissions.
- Test release builds before submission.
- Test on real devices before production release when possible.
- Keep store metadata, screenshots, privacy answers, and permission descriptions aligned with actual app behavior.

---

## 28) Workflow

- Always run `npx tsc --noEmit` or `npm run typecheck` after completing code changes.
- Always run lint after completing code changes.
- Run tests for changed features when available.
- Create feature branches before changes. Never commit directly to main.
- Prefer running single test files while developing.
- When adding a new feature, scaffold the full `features/[name]/` structure first.
- When a component is used in 2+ features, extract it to `components/`.
- Keep commits small and focused.
- Update this rules document when a convention changes.

---

## 29) Don’ts

- NEVER use `any`; use `unknown` and narrow or define proper types.
- NEVER use class components.
- NEVER put business logic inside large JSX components; extract to services, hooks, utilities, or containers.
- NEVER duplicate a component across features; extract to shared.
- NEVER use `require()`; always use ES module imports unless a specific native/config file requires otherwise.
- NEVER render large dynamic lists with plain `.map()` inside `ScrollView`.
- NEVER pass large objects through navigation params.
- NEVER scatter API calls randomly across components.
- NEVER store secrets in the app bundle.
- NEVER store passwords.
- NEVER ignore TypeScript, lint, test, or build errors.
- NEVER skip loading, empty, and error states for important screens.
