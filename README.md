# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## GitHub Pages deployment (auto)

This repository includes a GitHub Actions workflow that builds the site and deploys the generated `dist/` directory to the `gh-pages` branch using `peaceiris/actions-gh-pages`.

How it works:
- The workflow triggers on pushes to `main` (and can be run manually via the Actions tab).
- It installs dependencies (`npm ci`), runs `npm run build`, and publishes `./dist` to `gh-pages`.

Notes and customization:
- The Vite `base` is set to `/JanSeva/` for production builds by default; change it in `vite.config.ts` or set `VITE_BASE` if your repo name differs.
- After you push this repo to GitHub (or create it there), GitHub Actions will run and publish to GitHub Pages automatically. The expected URL for this repository is:

  https://shravan01-01.github.io/JanSeva

If you'd like me to update anything (different repo name or custom domain), tell me and I will adjust `vite.config.ts` and the workflow accordingly.
