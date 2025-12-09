# Orbitx Cross-Chain Wallet Activity Dashboard

A minimal yet scalable dashboard for viewing wallet activity across multiple blockchain networks.  
Built with **Next.js App Router**, **TypeScript**, **TailwindCSS**, **Redux Toolkit**, and **ethers.js**.  
Real multi-chain transaction data is fetched from **Alchemy RPC**.

---

## Table of Contents
- [Architecture & Component Structure](#architecture--component-structure)
- [Technology Choices & Justifications](#technology-choices--justifications)
- [Configuration](#configuration)
- [Assumptions & Tradeoffs](#assumptions--tradeoffs)
- [Known Limitations & Future Improvements](#known-limitations--future-improvements)
- [Getting Started](#getting-started)

---

## Architecture & Component Structure

The project uses a **feature-based architecture** to keep UI, state, and service logic modular and scalable.

### **/app (Next.js App Router)**
- `layout.tsx` — Global layout, providers, fonts, styles.
- `page.tsx` — Main dashboard UI (wallet connection, chain switching, transaction list).
- `favicon.ico`

### **/components**
- `ReduxProvider.tsx` — Wraps the application with the Redux store.
- `TransactionItem.tsx` — Displays a single transaction with timestamp, amount, addresses, chain, and status.

### **/config**
- `chainHelper.ts` — Chain metadata (IDs, RPC URLs, symbols, icons).
- `index.ts` — Central export for config constants.

### **/context**
- Lightweight React Context used only for simple UI/control-level state that does not require Redux.

### **/services**
- `apiConfig.ts` — Base URLs, headers, environment values.
- `apiService.ts` — Contains:
  - Alchemy request logic  
  - Fetching last 10 transactions  
  - Normalizing multi-chain activity  

Business logic is abstracted out of components for cleaner code.

### **/store (Redux Toolkit)**
- `store.ts` — Configures the Redux store.
- `userSlice.ts` — Manages wallet address, connected chain, activity state, and persists chain preference.

### **/styles**
- `globals.css` — Tailwind and global CSS setup.

### **/public**
- `/chain` — Contains chain icons (ETH, Polygon, Arbitrum).

---

## Technology Choices & Justifications

### **Next.js (App Router)**
Chosen for:
- Improved routing and server components  
- Hybrid SSR/CSR needs  
- Integrated optimizations  

Wallet operations remain in `"use client"` components due to reliance on `window.ethereum`.

### **TypeScript**
Prevents bugs in:
- RPC response shapes  
- BigInt/number handling  
- Transaction formatting  

Ensures maintainability.

### **ethers.js**
Required by assignment, used for:
- Wallet connection  
- Network switching  
- Provider/signer interactions  
- Unit conversions  

### **Redux Toolkit**
Used over Context API because:
- Multi-chain wallet state benefits from a predictable store  
- Better for scaling application complexity  
- DevTools integration simplifies debugging async flows  

### **TailwindCSS**
Chosen for:
- Rapid UI development  
- Built-in responsive utilities  
- No need to manage custom CSS files  

### **Multi-chain Data Fetching Strategy**
Activity is fetched:
- Per selected chain  
- Limited to 10 transactions  
- Sorted latest → oldest  

Sequential fetching is avoided to reduce RPC latency.  
We fetch only the *active chain* to stay within Alchemy free-tier limits.

---

## Configuration

Create a `.env.local` file:

```bash
NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID=
NEXT_PUBLIC_ALCHEMY_API_KEY=
