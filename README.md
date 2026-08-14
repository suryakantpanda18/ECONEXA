<div align="center">

# 🌱 EcoNexa
### Smart Community Waste Management & Urban Cleanliness Platform

**"Connecting Communities. Managing Waste. Building Cleaner Cities."**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Status: Production-Ready](https://img.shields.io/badge/Status-Production--Ready-emerald.svg)]()
[![Platform: Web](https://img.shields.io/badge/Platform-Web-blue.svg)]()
[![Theme: Light%20%26%20Dark](https://img.shields.io/badge/Theme-Light%20%26%20Dark-purple.svg)]()

</div>

---

## 📖 Overview

**EcoNexa** is a modern, smart-city and GovTech web platform connecting **Citizens**, **Municipal Workers**, **Municipal Administrators**, and **State Environmental Authorities** across the entire lifecycle:

$$\text{Generation} \longrightarrow \text{Segregation} \longrightarrow \text{Collection} \longrightarrow \text{Processing / Recycling} \longrightarrow \text{Final Disposal} \longrightarrow \text{Monitoring \& Analytics}$$

---

## 🌟 Key Features

### 👤 1. Citizen Portal
- **"My Waste Today"**: Daily segregation logger & calculator across 6 streams (🟢 Wet, 🔵 Dry, 🟠 Plastic, 🟣 E-Waste, 🔴 Hazardous, 🔋 Battery).
- **"Where Should I Put This?"**: Instant item search classifier (e.g., *banana peel*, *old phone*, *paint container*, *battery*) with DO/DON'T handling advice.
- **Waste Education Centre**: 9 expandable stream guides compliant with Indian waste management rules (e.g., E-Waste Management Rules 2022).
- **Interactive EcoMap**: Real-time Leaflet map of public bins, recycling centers, e-waste points, processing units, and authorized landfills.
- **Complaint Management**: 4-step issue reporting and resolution tracking (🟡 Submitted $\rightarrow$ 🔵 Assigned $\rightarrow$ 🟠 In Progress $\rightarrow$ 🟢 Resolved).

### 🚛 2. Municipal Worker Portal
- **Target Progress Engine**: Daily collection target tracker (e.g., 850 kg target vs. 610 kg collected, 72% visual progress bar).
- **Household Collection Ledger**: Real-time collection toggles (🟢 Collected, 🟡 Pending, 🔴 Missed, ⚠️ Issue Reported).
- **Route & Ward Map**: Visual collection zones, waypoint route, and fill-level alerts for ward bins.

### 🏛️ 3. Municipality Admin Portal
- **Executive Summary**: Real-time city-wide metrics (14.13 T waste today, 84.8% collection efficiency, 97.4K households, 26 mapped facilities).
- **Ward Monitoring**: Interactive ward ranking with live search filter and detailed ward drill-down.
- **Analytics & Visualizations**: Chart.js donut breakdowns, weekly trend curves, and monthly compliance metrics.
- **Facility Oversight & Worker Assignment**: Operational status controls and complaint dispatching workflows.

### 🌐 4. State Authority Portal (Pollution Control Boards)
- **Multi-State Governance**: Real-time state selector supporting:
  - 🏛️ **West Bengal** (WBPCB — Kolkata, Howrah, Bidhannagar/Salt Lake, New Town, Siliguri, Durgapur, Asansol)
  - 🏛️ **Telangana** (TSPCB — Greenfield City, Hyderabad, Secunderabad, Warangal)
  - 🏛️ **Maharashtra** (MPCB — BMC Mumbai, Pune PMC, Thane)
  - 🏛️ **Karnataka** (KSPCB — BBMP Bengaluru, Mysuru)
  - 🏛️ **Delhi NCR** (DPCC — Delhi MCD, NDMC)
- **Macro Environmental Map & Compliance Ledger**: Color-coded compliance indicators and report export.

---

## 🎨 Visual Design & Theme
- **Color Theme**: Soft Green (`#f0fdf4`), Emerald (`#16a34a`), Forest Green (`#14532d`), Crisp White, Slate (`#64748b`), Teal (`#14b8a6`).
- **🌙 Dark Mode**: Full Dark Theme support with one-click toggle in the navigation bar.
- **Typography**: Inter (Body & Data) + Syne (Headings & Branding).

---

## 🚀 Quick Start & Local Execution

### Prerequisites
- Python 3.x (or any standard static file server)

### Running Locally
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/econexa.git

# Navigate to the project directory
cd econexa

# Start the local server
python serve.py
```
Open **[http://localhost:8080](http://localhost:8080)** in your web browser.

---

## ⚡ Deployment Instructions

### 1. Deploying to GitHub & GitHub Pages

1. Initialize and push the repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: EcoNexa Smart Waste Management Platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/econexa.git
   git push -u origin main
   ```
2. Enable **GitHub Pages**:
   - Go to your GitHub repository $\rightarrow$ **Settings** $\rightarrow$ **Pages**.
   - Under **Build and deployment** $\rightarrow$ **Source**, select `Deploy from a branch`.
   - Set the branch to `main` and folder to `/(root)`. Click **Save**.
   - Your site will be live at `https://YOUR_USERNAME.github.io/econexa/`!

### 2. Deploying to Vercel (1-Click)

1. Go to [**vercel.com**](https://vercel.com) and sign in with GitHub.
2. Click **"Add New..."** $\rightarrow$ **"Project"**.
3. Select your `econexa` repository.
4. Keep the default settings (Framework Preset: *Other*, Root Directory: `./`).
5. Click **"Deploy"**.
6. Your platform will be instantly deployed with a custom `https://econexa-xxx.vercel.app` URL and automatic HTTPS!

---

## 🔑 Demo Accounts

| Role | Email | Password |
| :--- | :--- | :--- |
| **Citizen** | `citizen@econexa.in` | `demo123` |
| **Municipal Worker** | `worker@econexa.in` | `demo123` |
| **Municipality Admin** | `admin@econexa.in` | `demo123` |
| **State Authority** | `authority@econexa.in` | `demo123` |

*(1-click demo login buttons are also available directly on the login page)*

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
