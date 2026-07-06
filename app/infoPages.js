export const infoPages = {
  download: {
    title: "Download POS-it",
    kicker: "Product",
    intro:
      "POS-it is a Windows desktop POS. It is built to install quickly, keep the database on the shop PC, and keep billing even when the internet is gone.",
    sideTitle: "Current release",
    sideText:
      "Version 2.0.0 is the public build shown on this website. Keep one backup of your database before updating any live counter.",
    actions: [
      { label: "Get the installer", href: "mailto:support@pos-it.app?subject=POS-it%20installer%20request", variant: "btn-accent" },
      { label: "See pricing", href: "/pricing" },
    ],
    sections: [
      {
        title: "What you get",
        items: [
          "A Windows installer for POS-it, not a browser-only web app.",
          "Offline billing, product management, stock alerts, customer ledger, and reports.",
          "Local SQLite storage, so your sales and inventory stay on your machine.",
          "Thermal receipt and A4 invoice support for normal shop counters.",
        ],
      },
      {
        title: "Before installing",
        items: [
          "Use Windows 7 or newer. Old 32-bit systems are supported.",
          "Make sure your printer is already working in Windows before testing receipts.",
          "If you are moving from Excel, export your inventory sheet as CSV first.",
          "For an existing POS-it setup, take a database backup before replacing the app.",
        ],
      },
    ],
  },
  pricing: {
    title: "Pricing",
    kicker: "Product",
    intro:
      "The pricing is deliberately simple: one free single-device option, then paid licenses when a shop needs more counters, staff controls, or business support.",
    sideTitle: "No subscription",
    sideText:
      "POS-it is sold per device. There are no per-sale fees and no monthly cloud bill.",
    actions: [
      { label: "Download free", href: "/download", variant: "btn-accent" },
      { label: "Ask about Pro", href: "mailto:sales@pos-it.app?subject=POS-it%20Pro%20license" },
    ],
    sections: [
      {
        title: "Free",
        body:
          "Free is for a single shop counter that wants basic POS without a trial clock.",
        items: [
          "One device activation.",
          "Unlimited products and sales.",
          "Thermal and A4 receipts.",
          "CSV inventory import.",
          "Basic reporting.",
        ],
      },
      {
        title: "Pro",
        body:
          "Pro is for shops that need proper staff separation and customer credit tracking.",
        items: [
          "Up to 3 device activations.",
          "Customer ledger and udhar tracking.",
          "Role-based admin and cashier accounts.",
          "WhatsApp receipt sharing.",
          "Priority email support and one year of updates.",
        ],
      },
      {
        title: "Business",
        body:
          "Business is quoted case by case for multi-branch shops, distributors, or teams that need onboarding help.",
      },
    ],
  },
  features: {
    title: "Features",
    kicker: "Product",
    intro:
      "POS-it focuses on the everyday work of a Pakistani retail counter: sell fast, keep stock clean, track udhar, and avoid downtime.",
    sideTitle: "Main point",
    sideText:
      "The product is offline first. Internet helps with optional sharing and support, but the counter does not depend on it.",
    actions: [
      { label: "Product tour", href: "/product-tour", variant: "btn-accent" },
      { label: "Download", href: "/download" },
    ],
    sections: [
      {
        title: "Sales counter",
        items: [
          "Search by product name, SKU, or barcode.",
          "Use cash, card, Easypaisa, or JazzCash as payment methods.",
          "Print 80mm thermal receipts or A4 invoices.",
          "Stock updates as soon as the sale is completed.",
        ],
      },
      {
        title: "Inventory",
        items: [
          "Product fields for cost price, selling price, barcode, variant, and category.",
          "Low-stock and out-of-stock checks.",
          "CSV import with column mapping for existing Excel sheets.",
          "Inventory value and stock reports kept locally.",
        ],
      },
      {
        title: "Customers and staff",
        items: [
          "Customer profiles with purchase history.",
          "Credit sale balances and partial payment logs.",
          "Admin and cashier roles on paid plans.",
          "Activity history tied to staff logins.",
        ],
      },
    ],
  },
  "product-tour": {
    title: "Product tour",
    kicker: "Product",
    intro:
      "The tour uses real POS-it screens: setup, selling, product management, stock, reports, customers, and credit sales.",
    sideTitle: "Best viewed on desktop",
    sideText:
      "The screenshots are wide because the actual software is made for a Windows counter screen.",
    actions: [
      { label: "Open tour section", href: "/#showcase", variant: "btn-accent" },
      { label: "View features", href: "/features" },
    ],
    sections: [
      {
        title: "Setup wizard",
        body:
          "The first run asks for business details, invoice settings, an admin account, and starting inventory. That is enough to begin selling.",
      },
      {
        title: "Daily counter flow",
        body:
          "The main POS screen is built around quick product search, a visible cart, payment type, receipt printing, and automatic stock deduction.",
      },
      {
        title: "Back-office screens",
        body:
          "Products, stock, reports, customers, and credit sales are separate screens so the cashier does not need to dig through settings during rush hours.",
      },
    ],
  },
  "how-it-works": {
    title: "How POS-it works",
    kicker: "Product",
    intro:
      "POS-it runs as a local Windows app. The shop can sell, print, and report from the same PC without waiting for a cloud service.",
    sideTitle: "Simple setup",
    sideText:
      "Most small shops can set it up themselves if their product list is ready.",
    actions: [
      { label: "Getting started", href: "/getting-started", variant: "btn-accent" },
      { label: "CSV import guide", href: "/csv-import-guide" },
    ],
    sections: [
      {
        title: "Install",
        body:
          "Download the installer, run it on the counter PC, and open POS-it like a normal Windows program.",
      },
      {
        title: "Configure",
        body:
          "Add your shop name, invoice prefix, admin account, and opening inventory. You can start empty or import a CSV file.",
      },
      {
        title: "Sell",
        body:
          "Search products, add them to cart, complete payment, print the receipt, and let POS-it update stock in the background.",
      },
    ],
  },
  "getting-started": {
    title: "Getting started",
    kicker: "Resources",
    intro:
      "This is the practical first-day setup path for a shop that wants to move from manual billing or Excel into POS-it.",
    sideTitle: "Do this first",
    sideText:
      "Prepare your product list and decide your invoice prefix before installing. It saves time during setup.",
    actions: [
      { label: "Download POS-it", href: "/download", variant: "btn-accent" },
      { label: "Import CSV", href: "/csv-import-guide" },
    ],
    sections: [
      {
        title: "1. Prepare the counter PC",
        items: [
          "Check Windows is working normally and the printer driver is installed.",
          "Set the correct date, time, and printer paper size.",
          "Create a folder where you will keep POS-it backups.",
        ],
      },
      {
        title: "2. Run the first setup",
        items: [
          "Enter the business name exactly how it should appear on receipts.",
          "Choose an invoice prefix such as LP, MED, or SHOP.",
          "Create an admin account and keep the password with the owner.",
          "Import inventory now, or start with an empty product list.",
        ],
      },
      {
        title: "3. Test before opening",
        items: [
          "Add one product and complete a test cash sale.",
          "Print a thermal receipt and an A4 invoice if you use both.",
          "Void or delete the test sale only if your shop policy allows it.",
          "Take the first backup after the setup is correct.",
        ],
      },
    ],
  },
  "csv-import-guide": {
    title: "CSV import guide",
    kicker: "Resources",
    intro:
      "POS-it can import inventory from a CSV file exported from Excel, Google Sheets, or an older POS. A clean file gives you a cleaner product catalogue.",
    sideTitle: "File type",
    sideText:
      "Use CSV, not XLSX. Open your spreadsheet and choose Save As or Download as CSV.",
    actions: [
      { label: "Start setup", href: "/getting-started", variant: "btn-accent" },
      { label: "Ask support", href: "/email-support" },
    ],
    sections: [
      {
        title: "Recommended columns",
        items: [
          "name - the product name shown at the counter.",
          "sku or barcode - optional, but useful for scanning.",
          "category - medicine, grocery, hardware, accessories, or your own category.",
          "cost_price and selling_price - use numbers only, without Rs.",
          "stock_qty - current quantity available in the shop.",
          "low_stock_threshold - optional reorder warning level.",
        ],
      },
      {
        title: "Before importing",
        items: [
          "Remove empty rows and merged headings.",
          "Keep one product per row.",
          "Use consistent spelling for category names.",
          "Check that prices do not contain commas or currency symbols.",
          "Back up the database before importing into a live shop.",
        ],
      },
      {
        title: "During import",
        body:
          "POS-it tries to detect column names automatically. If a heading is different, map it manually once, review the preview, then import.",
      },
    ],
  },
  "license-activation": {
    title: "License activation",
    kicker: "Resources",
    intro:
      "Free can run on one device. Paid licenses unlock extra activations and Pro features such as staff roles and udhar tracking.",
    sideTitle: "Keep records",
    sideText:
      "Save the purchase email and the device name. It makes transfer support much faster later.",
    actions: [
      { label: "Ask about Pro", href: "mailto:sales@pos-it.app?subject=POS-it%20license%20activation", variant: "btn-accent" },
      { label: "Email support", href: "/email-support" },
    ],
    sections: [
      {
        title: "Activating a device",
        items: [
          "Install POS-it on the target Windows PC.",
          "Open the license screen from settings.",
          "Enter the license details provided after purchase.",
          "Restart POS-it if the app asks for it.",
        ],
      },
      {
        title: "Moving to a new PC",
        body:
          "If a counter PC is replaced, contact support with your purchase email, old device name, and new device name. Support can transfer the activation after checking the license record.",
      },
      {
        title: "Important",
        body:
          "A license activation is separate from your shop data. Always back up and restore the database when moving machines.",
      },
    ],
  },
  faq: {
    title: "FAQ",
    kicker: "Resources",
    intro:
      "Short answers to the questions people usually ask before putting POS-it on a real shop counter.",
    sideTitle: "Need a direct answer?",
    sideText:
      "Send your shop type, Windows version, and printer model when contacting support.",
    actions: [
      { label: "Email support", href: "/email-support", variant: "btn-accent" },
      { label: "WhatsApp helpline", href: "/whatsapp-helpline" },
    ],
    sections: [
      {
        title: "Does it work offline?",
        body:
          "Yes. Billing, products, inventory, customer ledger, and reports run from the local database. Internet is only needed for optional sharing, updates, or support.",
      },
      {
        title: "Is Free a trial?",
        body:
          "No. Free is meant to stay free on one device. Pro is for shops that need more activations, staff roles, and credit tracking.",
      },
      {
        title: "Can I import from Excel?",
        body:
          "Yes. Export the sheet as CSV and import it during setup or from inventory. Clean column names make the import faster.",
      },
      {
        title: "What if Windows is reinstalled?",
        body:
          "Restore your POS-it database from backup, then contact support if your paid activation needs to be moved.",
      },
    ],
  },
  "email-support": {
    title: "Email support",
    kicker: "Support",
    intro:
      "Email is best for setup questions, license transfers, CSV import issues, and anything that needs screenshots or files.",
    sideTitle: "Support email",
    sideText:
      "Use support@pos-it.app and include enough detail that we can reproduce the issue.",
    actions: [
      { label: "Send email", href: "mailto:support@pos-it.app?subject=POS-it%20support", variant: "btn-accent" },
      { label: "Report a bug", href: "/report-a-bug" },
    ],
    sections: [
      {
        title: "What to include",
        items: [
          "Your POS-it version.",
          "Windows version and whether it is 32-bit or 64-bit.",
          "What you clicked before the problem happened.",
          "A screenshot of the error, if there is one.",
          "For printer issues, the printer model and paper size.",
        ],
      },
      {
        title: "Do not send passwords",
        body:
          "Support does not need your Windows password, admin password, or customer data to answer most questions. If a database file is needed, we will ask clearly.",
      },
    ],
  },
  "whatsapp-helpline": {
    title: "WhatsApp helpline",
    kicker: "Support",
    intro:
      "WhatsApp is for quick checks: installation confusion, printer setup, license status, or a screenshot of an error message.",
    sideTitle: "Use for quick help",
    sideText:
      "For longer issues, email is still better because files and steps stay easier to track.",
    actions: [
      { label: "Open WhatsApp", href: "https://wa.me/923001234567", variant: "btn-accent" },
      { label: "Email support", href: "/email-support" },
    ],
    sections: [
      {
        title: "Send this first",
        items: [
          "Your name and shop name.",
          "POS-it version.",
          "Windows version.",
          "A clear screenshot or short screen recording.",
          "Whether this is setup, printer, license, import, or sales counter related.",
        ],
      },
      {
        title: "When email is better",
        body:
          "Use email for CSV files, database backup questions, detailed bug reports, or anything involving a license transfer.",
      },
    ],
  },
  "report-a-bug": {
    title: "Report a bug",
    kicker: "Support",
    intro:
      "A useful bug report explains what happened, what you expected, and the exact steps that trigger it. That is what helps us fix it quickly.",
    sideTitle: "Bug email",
    sideText:
      "Send reports to bugs@pos-it.app. Screenshots and steps matter more than long descriptions.",
    actions: [
      { label: "Email bug report", href: "mailto:bugs@pos-it.app?subject=POS-it%20bug%20report", variant: "btn-accent" },
      { label: "Support page", href: "/email-support" },
    ],
    sections: [
      {
        title: "Good bug report format",
        items: [
          "POS-it version.",
          "Windows version.",
          "Screen name, such as Sales, Products, Stock, Reports, or Credits.",
          "Steps to reproduce the issue.",
          "What happened and what you expected instead.",
          "Screenshot or short video if possible.",
        ],
      },
      {
        title: "Data safety",
        body:
          "Do not send customer records or a full database unless support asks for it. Most bugs can be checked from steps and screenshots first.",
      },
    ],
  },
  privacy: {
    title: "Privacy",
    kicker: "Legal",
    intro:
      "POS-it is designed so your shop data stays on your own computer. This page explains the plain version of what is and is not collected.",
    updated: "Last updated: July 2026",
    sideTitle: "Short version",
    sideText:
      "Your sales, products, customers, and credit records are stored locally. They are not uploaded to POS-it servers by default.",
    actions: [
      { label: "Email privacy question", href: "mailto:support@pos-it.app?subject=POS-it%20privacy%20question", variant: "btn-accent" },
      { label: "Read terms", href: "/terms" },
    ],
    sections: [
      {
        title: "Local shop data",
        body:
          "Product lists, sales, stock changes, customers, credit balances, staff accounts, and reports are stored in the local POS-it database on your machine.",
      },
      {
        title: "Support data",
        body:
          "If you email or message support, we receive what you choose to send: your contact details, screenshots, CSV files, logs, or database files if you attach them.",
      },
      {
        title: "Optional online features",
        body:
          "Features such as WhatsApp sharing, email support, updates, or future cloud backup may use internet services. The counter POS itself does not require cloud storage to work.",
      },
      {
        title: "Your responsibility",
        body:
          "Because the main database is local, the shop owner is responsible for backups, Windows access, and who can use the counter PC.",
      },
    ],
  },
  terms: {
    title: "Terms",
    kicker: "Legal",
    intro:
      "These terms are written for normal product use: install POS-it on licensed devices, keep your own backups, and contact support when something needs transferring.",
    updated: "Last updated: July 2026",
    sideTitle: "Plain note",
    sideText:
      "This is product guidance for the website, not a substitute for a signed enterprise contract.",
    actions: [
      { label: "Ask a terms question", href: "mailto:support@pos-it.app?subject=POS-it%20terms%20question", variant: "btn-accent" },
      { label: "Read privacy", href: "/privacy" },
    ],
    sections: [
      {
        title: "License use",
        body:
          "A POS-it license is for the number of device activations included in your plan. Do not share paid activation details outside your own business.",
      },
      {
        title: "Backups",
        body:
          "The shop owner is responsible for keeping current backups of the local database. POS-it can make backup easier, but it cannot recover a file that was never backed up.",
      },
      {
        title: "Support",
        body:
          "Support covers installation, activation, common printer issues, CSV import guidance, and product bugs. Custom reports, data cleanup, and multi-branch setup may require a Business arrangement.",
      },
      {
        title: "Fair use",
        body:
          "Do not reverse engineer, resell, or repackage POS-it as your own software. If you need a custom deployment or reseller arrangement, contact sales first.",
      },
    ],
  },
};

export function metadataFor(slug) {
  const page = infoPages[slug];

  return {
    title: page.title,
    description: page.intro,
  };
}
