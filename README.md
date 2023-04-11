# CyberSafely

![Logo](.github/logo-black.png)

## Running

Run `yarn install` and then `yanr dev` to run it locally.

## Pages

- `/` - this is the landing page
- `/auth/*` - all pages under this route are for login, register, etc.
- `/dashboard/*` - all pages under this route are for the dashboard (staff, coach, student, parent).

## Libraries

- Next.JS
- Apollo Client
- GraphQL Codegen
- MUI
- zod
- date-fns

## Environment Variables

```bash
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_NAME=
NEXT_PUBLIC_APP_SHORT_NAME=
NEXT_PUBLIC_EMAIL_SUPPORT=
NEXT_PUBLIC_ENABLE_LOGIN=
NEXT_PUBLIC_INTERCOM_APP_ID=
```

Create an `.env` file at the root of the project:

```bash
NEXT_PUBLIC_ENABLE_LOGIN=true
```

## Seeded Logins

- `staff@wonderkiln.com`
- `admin@wonderkiln.com`
- `coach@wonderkiln.com`
- `student@wonderkiln.com`
- `parent@wonderkiln.com`

The password for all is `password`.
