# apricot-web

Storefront for the Apricot shop. Next.js App Router, talks to [`apricot-api`](https://github.com/orange-blushing-apricot/apricot-api).

## Run

```bash
npm install
npm run dev
```

Without `APRICOT_API_URL` the app serves built-in mock data, so preview deployments work with no backend. To use a real backend copy `.env.example` to `.env.local`.
