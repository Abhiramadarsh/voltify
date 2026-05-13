# Security Specification - Voltify

## Data Invariants
1. A user document must have a `uid` that matches the document ID.
2. A user's `email` in the document must match their authentication token email.
3. Users can only read, create, or update their own profile.

## The "Dirty Dozen" Payloads (Attacks)
1. **Identity Spoofing**: User A attempts to overwrite User B's profile.
2. **Field Injection**: User attempts to add a `role: 'admin'` field to their profile.
3. **Data Poisoning**: User set's their `name` to a 2MB string.
4. **Email Hijacking**: User A tries to set their document email to User B's email.
5. **Orphaned Writes**: User tries to create a profile without being logged in.
6. **Immutable Violation**: User tries to change their `createdAt` timestamp.
7. **Temporal Attack**: User tries to set `lastLogin` to a future date instead of `request.time`.
8. **ID Poisoning**: User tries to use a 2KB string as a `userId` document ID.
9. **Query Scraping**: User tries to list all users in the `users` collection.
10. **PII Leak**: User tries to read User B's email by guessing their UID.
11. **Type Confusion**: User tries to set `uid` to a number instead of a string.
12. **Status Bypass**: (N/A for users, but imagine trying to set a `verified` status manually).

## Test Runner (Logic)
All the above payloads must return `PERMISSION_DENIED`.
Rules will enforce:
- `request.auth.uid == userId`
- `isValidUser(incoming())`
- Strict key check for user profile updates.
