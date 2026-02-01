# Handling Hydration Mismatches

This document explains how to handle hydration mismatches in React applications, particularly when using SSR (Server-Side Rendering).

## What are Hydration Mismatches?

Hydration mismatches occur when the HTML generated on the server doesn't match what React expects to render on the client. This can happen due to:

- **Server/Client differences**: Code that behaves differently on server vs client
- **Dynamic content**: Content that changes between server render and client render
- **Browser-only APIs**: Code that only works in the browser
- **External data**: Data that changes between server and client renders

## Common Causes

### 1. Browser-only APIs

```tsx
// ❌ This will cause hydration mismatch
function Component() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  // ...
}
```

### 2. Dynamic values

```tsx
// ❌ This will cause hydration mismatch
function Component() {
  return <div>Current time: {new Date().toLocaleString()}</div>;
}
```

### 3. Conditional rendering based on client state

```tsx
// ❌ This will cause hydration mismatch
function Component() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <ClientComponent /> : <ServerComponent />;
}
```

## Solutions

### 1. Use the ClientOnly Component

For components that should only render on the client:

```tsx
import { ClientOnly } from '~/components/ui/client-only';

function MyComponent() {
  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      <WebGLComponent />
    </ClientOnly>
  );
}
```

### 2. Use the useIsMounted Hook

For more granular control:

```tsx
import { useIsMounted } from '~/lib/utils';

function MyComponent() {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return <ClientOnlyComponent />;
}
```

### 3. Suppress Hydration Warnings (Use Sparingly)

For cases where the mismatch is expected and harmless:

```tsx
import { useEffect, useState } from 'react';

function MyComponent() {
  const [suppressHydrationWarning, setSuppressHydrationWarning] =
    useState(false);

  useEffect(() => {
    setSuppressHydrationWarning(true);
  }, []);

  return (
    <div suppressHydrationWarning={suppressHydrationWarning}>
      {new Date().toLocaleString()}
    </div>
  );
}
```

## Best Practices

### 1. Always provide fallback content

```tsx
// ✅ Good
<ClientOnly fallback={<div>Loading...</div>}>
  <DynamicComponent />
</ClientOnly>

// ❌ Bad - no fallback
<ClientOnly>
  <DynamicComponent />
</ClientOnly>
```

### 2. Use consistent initial states

```tsx
// ✅ Good
const [data, setData] = useState(null);

// ❌ Bad - different initial states
const [data, setData] = useState(window ? window.someData : null);
```

### 3. Handle async data properly

```tsx
// ✅ Good
function Component() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData()
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return <div>{data}</div>;
}
```

## Examples in This Codebase

### Aurora Component

The Aurora component uses WebGL which is browser-only. It's wrapped with `ClientOnly`:

```tsx
export function Aurora(props: AuroraProps) {
  return (
    <ClientOnly fallback={<div className="h-full w-full bg-background" />}>
      <AuroraComponent {...props} />
    </ClientOnly>
  );
}
```

### ProfileCard Component

The ProfileCard component uses browser APIs like `getBoundingClientRect()` and `requestAnimationFrame()`. It's wrapped with `ClientOnly`:

```tsx
export default function ProfileCardWrapper(props: ProfileCardProps) {
  return (
    <ClientOnly
      fallback={
        <div className="pc-card-wrapper">
          <section className="pc-card">{/* Static fallback content */}</section>
        </div>
      }
    >
      <ProfileCardComponent {...props} />
    </ClientOnly>
  );
}
```

### StackOverflow Flair

The StackOverflow component fetches external data and handles loading states gracefully:

```tsx
export function StackOverflowFlair() {
  const { data } = useQuery({
    queryKey: ['stackOverflowProfile', SO_USER_ID],
    queryFn: fetchStackOverflowData,
    // ... options
  });

  // Soft fail - don't show anything if data isn't available
  if (!data) {
    return null;
  }

  return <Component data={data} />;
}
```

## Debugging Hydration Mismatches

### 1. Enable Strict Mode

```tsx
// In development, React StrictMode will help identify issues
<React.StrictMode>
  <App />
</React.StrictMode>
```

### 2. Check the Console

Look for warnings like:

- "Text content did not match"
- "Expected server HTML to contain"
- "Hydration failed"

### 3. Use React DevTools

The React DevTools can help identify which components are causing issues.

### 4. Add Debug Logging

```tsx
function Component() {
  const isMounted = useIsMounted();

  console.log('Component rendered:', { isMounted });

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return <ClientComponent />;
}
```

## When to Use Each Solution

- **ClientOnly**: For components that should never render on the server (WebGL, browser APIs)
- **useIsMounted**: For components that need different behavior on server vs client
- **suppressHydrationWarning**: Only for expected, harmless mismatches
- **Proper state management**: For data that changes between server and client

## Testing

Always test your components in both development and production modes:

```bash
# Development
npm run dev

# Production build
npm run build
npm run start
```

Check that:

1. No hydration warnings in the console
2. Components render correctly on both server and client
3. No layout shifts during hydration
4. Performance is acceptable
