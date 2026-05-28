# .github/copilot-instructions.md

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- pnpm

## Review Style

When reviewing pull requests:

- keep reviews beginner-friendly
- prioritize readability and basic correctness
- avoid overly strict reviews
- avoid suggesting complex architecture
- explain problems simply and clearly
- suggest fixes with examples when possible

## Check for

- unnecessary use client
- usage of any
- missing loading or error handling
- duplicated code
- very large components
- hardcoded URLs or secrets
- broken TypeScript types
- unused imports or variables

## Next.js

- prefer Server Components by default
- use Client Components only when needed
- avoid unnecessary useEffect

## Approval

If there are no major problems:

- respond with LGTM
- minor style issues do not need blocking comments
- prefer educational suggestions over strict rejection
- prefer encouragement over criticism
- do not block PRs for small style issues
