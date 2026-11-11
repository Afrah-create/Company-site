TASK: Create polished, brand-consistent UI mockup visuals for each SlimCyberTech project, built as React components and exported to PNG for use in project galleries.

NOTE ON NAMING: the poultry app is "CucoCare" in lib/projects.ts. Use that spelling everywhere (slug: cucocare). Flag any "CocoCare" you find.

PART 1: Mockup system
1. Create components/mockups/ with:
   - DeviceFrame.tsx: variants "browser" (minimal window chrome with three dots and a URL pill), "phone" (rounded 9:19.5 bezel, notch/dynamic island, status bar), "laptop" (browser inside a slim laptop body). Dark by default, supports a light variant.
   - Primitives: StatCard, MiniLineChart, MiniBarChart, DonutChart, DataTable, Badge, Avatar (initials only, no photos), Sidebar, TopBar, MapPanel (abstract grid map built in SVG, no real map tiles), ProgressBar, Timeline, NotificationToast.
   Build charts with pure SVG (no new dependencies). Use brand tokens: bg #0a0a0a, surface #111/#1a1a1a, border white/10, accent gradient #00c6ff to #0072ff, Orbitron for big numbers/titles, Inter for body. Soft cyan glow, 1px borders, rounded-2xl, generous spacing, nothing cramped.
2. Create app/dev/mockups/page.tsx (return notFound() when process.env.NODE_ENV === "production"). It renders every mockup in a fixed 1600x900 stage with id="mockup-<slug>-<n>", each on the dark brand background with a subtle cyan radial glow behind the device. Include a toggle for dark/light.
3. Create scripts/export-mockups.mjs using Playwright (add as a devDependency if missing) to: start/assume the dev server on localhost:3000, open /dev/mockups, screenshot each #mockup-* element at 2x device scale factor, and save PNGs to public/images/projects/<slug>/ui-<n>.png. Add an npm script "mockups:export". Create folders as needed. Do not overwrite hero.png or gallery-*.png files.
4. Then register the new images: append /images/projects/<slug>/ui-<n>.png to each project's gallery in lib/projects.ts, with a captions field if the type supports it (add optional `galleryCaptions?: string[]` and fill it).

PART 2: Mockups to build (2-3 per project)
All data is SAMPLE data. Put a small "Sample data" badge in the corner of each mockup. Use obviously generic names (initials, "Student A", "Patient 0142", "Route 12"), no real people, schools, clients, brands or phone numbers, and no logos other than Slim.

NileGo (phone + browser):
 1. Phone: rider booking screen. Abstract SVG map with a glowing cyan route, pickup and destination pins, bottom sheet with fare estimate in UGX, ETA, "Boda Boda" / "Car" toggle, and a primary "Confirm ride" button.
 2. Phone: active trip. Rider card (initials avatar, rating, vehicle type), progress along the route, "Share trip" and "Call" buttons.
 3. Browser: dispatch admin dashboard. Live map with rider dots, stat cards (active rides, online riders, completed today), recent trips table.

SlimSchool (browser + phone):
 1. Browser: admin dashboard. Stat cards (enrolment, attendance today, fees collected, pending reports), attendance line chart, fees donut (paid/partial/outstanding), recent activity list.
 2. Browser: gradebook. Class selector, student table with subject columns, colour-coded grade badges, a "Generate report cards" button.
 3. Phone: parent view. Child's attendance streak, latest results, fee balance in UGX, school notices.

Hospital Management System (browser + phone):
 1. Browser: reception/overview. Beds occupancy donut, appointments today timeline, patient queue table, department load bars.
 2. Browser: patient record. Header with patient ID and demographics (sample), tabs (Overview, Visits, Labs, Prescriptions, Billing), vitals sparkline cards, visit history timeline.
 3. Browser: pharmacy stock. Table with low-stock badges and a reorder button, plus an expiry-soon panel.

CucoCare (phone + browser):
 1. Phone: farm dashboard. Flock size, mortality rate, feed stock days remaining, egg production bar chart for 7 days, alert toast "Vaccination due in 2 days".
 2. Phone: vaccination and health schedule. Calendar strip, checklist, house/flock selector.
 3. Browser: farm analytics. Feed conversion trend, egg production vs target, cost per tray, house comparison table.

Security Audit Dashboard (browser):
 1. Overview: risk score gauge, findings by severity (critical/high/medium/low) donut, vulnerability trend line, top affected assets table.
 2. Findings detail: list with severity badges, CVSS-style score (generic), status chips (Open, In progress, Resolved), remediation panel.
 3. Abstract asset/network graph with one flagged node.

E-Commerce Platform (browser + phone):
 1. Browser: storefront product grid with filters, cart drawer open.
 2. Phone: checkout screen with mobile money and card options (generic labels, no real brand logos), order summary in UGX.
 3. Browser: seller dashboard with sales chart, orders table, low-stock alert.

Banking Mobile App (phone x2 side by side + one browser):
 1. Two phones: home (balance, quick actions, recent transactions) and send-money flow.
 2. Phone: security settings (biometric toggle, device list, transaction limits).
 3. Browser: admin transaction monitoring with flagged-transaction panel.

DevOps Pipeline Tool (browser):
 1. Pipeline view: stages Build > Test > Security scan > Deploy as connected cards with status, durations and a running state.
 2. Deployments list with environment badges (dev/staging/prod), success rate chart, rollback button.
 3. Logs/observability panel: monospace log stream, error-rate sparkline, uptime stat.

Corporate Website Redesign (browser):
 1. Before/after split: left a cluttered, desaturated wireframe-like site, right the clean modern dark-cyan version (build both with real DOM, not images).
 2. Design system board: type scale, colour tokens, button/card/input components.
 3. Responsive trio: the same page on laptop, tablet and phone.

Gift Foundation Arua and Aringa SS: do NOT mock these. They are real live sites. Leave a TODO in lib/projects.ts saying to replace gallery images with real screenshots of giftfoundationarua.org and aringass.com.

PART 3: Quality bar
- Every mockup must look like a real, designed product: consistent spacing scale (4/8px), aligned grids, realistic but sample data, believable UGX amounts, no lorem ipsum, no overlapping or clipped elements.
- Max 2 accent colours plus semantic status colours (green/amber/red) used sparingly.
- Text readable at the final display size (min 13px equivalent at 1600x900).
- Each mockup stays focused: one clear hero panel, supporting panels secondary.
- Light and dark variants render without contrast failures.
- No external images, fonts beyond the existing ones, or network calls.

ACCEPTANCE:
- /dev/mockups shows every mockup with no console errors and 404s in production.
- npm run mockups:export writes all PNGs (list the file paths).
- Each project in lib/projects.ts now has the new ui-*.png images in its gallery, with captions.
- Lint and build pass. Summarize anything you were unsure about.