# Native App Launch Tasks

This checklist captures steps to prepare FlinkDink for release on both iOS and Android using Capacitor.

- [ ] **Audit dependencies** – verify all packages are up to date and compatible with Capacitor 5.
- [ ] **Update icons and splash screens** for each platform under `ios/App/App/Assets.xcassets` and `android/app/src/main/res`.
- [ ] **Configure environment variables** in `.env` and ensure `npx cap sync` propagates them to native projects.
- [ ] **Enable offline caching** for week data and images to improve startup performance.
- [ ] **Set up CI builds** that run `npm run build` followed by `npx cap sync` for both platforms.
- [ ] **Run eslint and jest** as part of the build pipeline to catch issues early.
- [ ] **Test on physical devices** covering a range of screen sizes and OS versions.
- [ ] **Prepare App Store metadata** including screenshots and descriptions.
- [ ] **Document submission steps** for both Google Play and App Store Connect.

Keep this file updated as tasks are completed or new work is identified.
