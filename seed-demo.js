/**
 * POS-it Demo Data Seeder
 * ──────────────────────
 * Run from the POS-it Web folder:
 *   node seed-demo.js
 *
 * Seeds: categories → products → customers → sales → sale_items → customer_credits
 * Safe: INSERT OR IGNORE — never modifies existing rows.
 */

"use strict";

const path = require("path");
const os   = require("os");
const fs   = require("fs");

// ── 1. Locate better-sqlite3 ─────────────────────────────────────────────────
// Try local (POS-it Web/node_modules) first — compiled for current Node version.
// Falls back to zse-pos copy if local not installed.
const LOCAL_SQLITE  = path.resolve(__dirname, "node_modules", "better-sqlite3");
const SOURCE_SQLITE = path.resolve(__dirname, "..", "zse-pos", "node_modules", "better-sqlite3");
const SQLITE_MODULE = fs.existsSync(LOCAL_SQLITE) ? LOCAL_SQLITE : SOURCE_SQLITE;

if (!fs.existsSync(SQLITE_MODULE)) {
  console.error("❌  better-sqlite3 not found.");
  console.error("   Run: npm install better-sqlite3 --prefix \"" + __dirname + "\"");
  process.exit(1);
}
const Database = require(SQLITE_MODULE);

// ── 2. Locate the database file ────────────────────────────────────────────────
const APPDATA = process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming");
const DB_CANDIDATES = [
  path.join(APPDATA, "POS-it System", "pos-it.db"),
  path.join(APPDATA, "POS-it System", "database.db"),
  path.join(APPDATA, "POS-it",        "pos-it.db"),
  path.join(APPDATA, "POS-it",        "database.db"),
  path.join(APPDATA, "pos-it-system", "pos-it.db"),
  path.join(APPDATA, "zse-pos",       "pos-it.db"),
  path.join(APPDATA, "zse-pos",       "database.db"),
];

let DB_PATH = DB_CANDIDATES.find(fs.existsSync);

if (!DB_PATH) {
  // Scan one level deep in %APPDATA%
  for (const entry of fs.readdirSync(APPDATA, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const sub = path.join(APPDATA, entry.name);
    try {
      for (const f of fs.readdirSync(sub)) {
        if (f.endsWith(".db")) {
          DB_PATH = path.join(sub, f);
          break;
        }
      }
    } catch (_) {}
    if (DB_PATH) break;
  }
}

if (!DB_PATH) {
  console.error("❌  Could not find the POS-it database in %APPDATA%.");
  console.error("   Launch POS-it at least once so the database is created, then re-run.");
  process.exit(1);
}

console.log(`✔  Database: ${DB_PATH}\n`);

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// ── 3. Categories ──────────────────────────────────────────────────────────────
const insertCategory = db.prepare(
  "INSERT OR IGNORE INTO categories (name) VALUES (?)"
);
[
  "Medicines",
  "Antiseptics",
  "Nutrition",
  "Supplements",
  "Personal Care",
].forEach((n) => insertCategory.run(n));

const getCatId = (name) =>
  db.prepare("SELECT id FROM categories WHERE name = ?").get(name)?.id ?? null;

console.log("✔  Categories");

// ── 4. Products ────────────────────────────────────────────────────────────────
// Schema (post-migrations 001+002):
//   id, name, price, stock, barcode, created_at,
//   variant, sku, cost_price, image_path, tax_rate, category_id
const insertProduct = db.prepare(`
  INSERT OR IGNORE INTO products
    (name, price, cost_price, stock, sku, barcode, category_id)
  VALUES
    (@name, @price, @cost_price, @stock, @sku, @barcode, @category_id)
`);

const PRODUCTS = [
  { name: "Panadol 500mg",     price: 120,  cost_price: 80,   stock: 150, sku: "MED-001", barcode: "5000157024816", cat: "Medicines"    },
  { name: "Brufen 400mg",      price: 95,   cost_price: 60,   stock: 80,  sku: "MED-002", barcode: "5000157024817", cat: "Medicines"    },
  { name: "Strepsils Honey",   price: 160,  cost_price: 110,  stock: 60,  sku: "MED-003", barcode: "5000157024818", cat: "Medicines"    },
  { name: "Disprin 300mg",     price: 65,   cost_price: 40,   stock: 200, sku: "MED-004", barcode: "5000157024819", cat: "Medicines"    },
  { name: "Augmentin 625mg",   price: 380,  cost_price: 280,  stock: 40,  sku: "MED-005", barcode: "5000157024820", cat: "Medicines"    },
  { name: "Calpol Suspension", price: 145,  cost_price: 95,   stock: 75,  sku: "MED-006", barcode: "5000157024821", cat: "Medicines"    },
  { name: "Dettol 250ml",      price: 250,  cost_price: 180,  stock: 45,  sku: "ANT-001", barcode: "6281006455063", cat: "Antiseptics"  },
  { name: "Savlon 100ml",      price: 180,  cost_price: 120,  stock: 30,  sku: "ANT-002", barcode: "6281006455064", cat: "Antiseptics"  },
  { name: "Betadine 15ml",     price: 220,  cost_price: 155,  stock: 50,  sku: "ANT-003", barcode: "6281006455065", cat: "Antiseptics"  },
  { name: "Ensure 400g",       price: 2200, cost_price: 1800, stock: 15,  sku: "NUT-001", barcode: "0070074640498", cat: "Nutrition"    },
  { name: "Glucon-D 500g",     price: 380,  cost_price: 280,  stock: 25,  sku: "NUT-002", barcode: "8901030874001", cat: "Nutrition"    },
  { name: "ORS Sachets x10",   price: 95,   cost_price: 60,   stock: 100, sku: "NUT-003", barcode: "8901030874002", cat: "Nutrition"    },
  { name: "Vitamin C 1000mg",  price: 500,  cost_price: 350,  stock: 70,  sku: "SUP-001", barcode: "4005808196593", cat: "Supplements"  },
  { name: "Omega-3 Softgels",  price: 650,  cost_price: 450,  stock: 55,  sku: "SUP-002", barcode: "4005808196594", cat: "Supplements"  },
  { name: "Zinc Tablets 30s",  price: 280,  cost_price: 190,  stock: 90,  sku: "SUP-003", barcode: "4005808196595", cat: "Supplements"  },
  { name: "Pantene Shampoo",   price: 520,  cost_price: 380,  stock: 35,  sku: "PC-001",  barcode: "5410076400072", cat: "Personal Care" },
  { name: "Colgate 150g",      price: 210,  cost_price: 155,  stock: 60,  sku: "PC-002",  barcode: "5410076400073", cat: "Personal Care" },
];

PRODUCTS.forEach((p) =>
  insertProduct.run({ ...p, category_id: getCatId(p.cat) })
);

const getProductId = (sku) =>
  db.prepare("SELECT id FROM products WHERE sku = ?").get(sku)?.id ?? null;

console.log("✔  Products (17)");

// ── 5. Customers ───────────────────────────────────────────────────────────────
const insertCustomer = db.prepare(`
  INSERT OR IGNORE INTO customers (name, phone, email) VALUES (@name, @phone, @email)
`);

const CUSTOMERS = [
  { name: "Ahmed Raza",    phone: "03001234567", email: "ahmed@example.com"  },
  { name: "Sara Khan",     phone: "03119876543", email: "sara@example.com"   },
  { name: "Bilal Hussain", phone: "03451112233", email: "bilal@example.com"  },
  { name: "Fatima Noor",   phone: "03331234567", email: "fatima@example.com" },
  { name: "Usman Ali",     phone: "03211223344", email: "usman@example.com"  },
];
CUSTOMERS.forEach((c) => insertCustomer.run(c));

const getCustId = (phone) =>
  db.prepare("SELECT id FROM customers WHERE phone = ?").get(phone)?.id ?? null;

console.log("✔  Customers (5)");

// ── 6. Admin user id ───────────────────────────────────────────────────────────
const adminId = db.prepare("SELECT id FROM users LIMIT 1").get()?.id ?? null;

// ── 7. Sales + Sale Items ──────────────────────────────────────────────────────
// Schema:
//   sales:      id, customer_id, subtotal, total, payment_method, date, tax_amount,
//               discount_amount, discount_code, user_id, payment_details, is_returned
//   sale_items: id, sale_id, product_id, quantity, unit_price, cost_price, discount, total
const insertSale = db.prepare(`
  INSERT INTO sales
    (customer_id, subtotal, total, payment_method, date, tax_amount, discount_amount, user_id)
  VALUES
    (@customer_id, @subtotal, @total, @payment_method, @date, 0, 0, @user_id)
`);

const insertItem = db.prepare(`
  INSERT INTO sale_items
    (sale_id, product_id, quantity, unit_price, cost_price, discount, total)
  VALUES
    (@sale_id, @product_id, @quantity, @unit_price, @cost_price, 0, @total)
`);

const getProduct = (sku) =>
  db.prepare("SELECT id, price, cost_price FROM products WHERE sku = ?").get(sku);

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().replace("T", " ").slice(0, 19);
};

const SALES = [
  // Today
  {
    date: daysAgo(0), customer: "03001234567", payment: "cash",
    items: [
      { sku: "MED-001", qty: 2 },
      { sku: "MED-004", qty: 1 },
      { sku: "ANT-001", qty: 1 },
    ],
  },
  {
    date: daysAgo(0), customer: null, payment: "cash",
    items: [
      { sku: "MED-005", qty: 2 },
      { sku: "SUP-001", qty: 1 },
      { sku: "MED-003", qty: 1 },
    ],
  },
  // Yesterday
  {
    date: daysAgo(1), customer: "03119876543", payment: "card",
    items: [
      { sku: "NUT-001", qty: 1 },
      { sku: "ANT-002", qty: 1 },
      { sku: "MED-001", qty: 1 },
    ],
  },
  {
    date: daysAgo(1), customer: null, payment: "cash",
    items: [
      { sku: "SUP-002", qty: 2 },
      { sku: "PC-001",  qty: 1 },
      { sku: "MED-002", qty: 1 },
    ],
  },
  // 2 days ago
  {
    date: daysAgo(2), customer: "03451112233", payment: "easypaisa",
    items: [
      { sku: "NUT-002", qty: 1 },
      { sku: "SUP-001", qty: 1 },
      { sku: "MED-006", qty: 1 },
    ],
  },
  {
    date: daysAgo(2), customer: null, payment: "cash",
    items: [
      { sku: "MED-001", qty: 3 },
      { sku: "MED-003", qty: 1 },
      { sku: "ANT-003", qty: 1 },
    ],
  },
  // 3 days ago
  {
    date: daysAgo(3), customer: "03331234567", payment: "jazzcash",
    items: [
      { sku: "MED-002", qty: 2 },
      { sku: "MED-004", qty: 4 },
      { sku: "SUP-003", qty: 1 },
    ],
  },
  {
    date: daysAgo(3), customer: null, payment: "cash",
    items: [
      { sku: "NUT-003", qty: 3 },
      { sku: "PC-002",  qty: 2 },
      { sku: "MED-005", qty: 1 },
    ],
  },
  // 4 days ago
  {
    date: daysAgo(4), customer: "03211223344", payment: "card",
    items: [
      { sku: "NUT-001", qty: 1 },
      { sku: "SUP-002", qty: 1 },
      { sku: "MED-005", qty: 1 },
    ],
  },
  {
    date: daysAgo(4), customer: null, payment: "cash",
    items: [
      { sku: "MED-001", qty: 4 },
      { sku: "ANT-001", qty: 1 },
      { sku: "MED-003", qty: 2 },
    ],
  },
  // 5 days ago
  {
    date: daysAgo(5), customer: "03001234567", payment: "cash",
    items: [
      { sku: "MED-002", qty: 1 },
      { sku: "SUP-001", qty: 2 },
      { sku: "MED-006", qty: 2 },
    ],
  },
  {
    date: daysAgo(5), customer: null, payment: "cash",
    items: [
      { sku: "PC-001",  qty: 1 },
      { sku: "PC-002",  qty: 2 },
      { sku: "NUT-002", qty: 1 },
    ],
  },
];

const seedSales = db.transaction(() => {
  for (const s of SALES) {
    let subtotal = 0;
    const resolvedItems = s.items.map((item) => {
      const p = getProduct(item.sku);
      if (!p) return null;
      const lineTotal = item.qty * p.price;
      subtotal += lineTotal;
      return { product_id: p.id, qty: item.qty, price: p.price, cost: p.cost_price, total: lineTotal };
    }).filter(Boolean);

    const saleRow = {
      customer_id:    s.customer ? getCustId(s.customer) : null,
      subtotal,
      total: subtotal,
      payment_method: s.payment,
      date:           s.date,
      user_id:        adminId,
    };
    const { lastInsertRowid: saleId } = insertSale.run(saleRow);

    for (const item of resolvedItems) {
      insertItem.run({
        sale_id:    saleId,
        product_id: item.product_id,
        quantity:   item.qty,
        unit_price: item.price,
        cost_price: item.cost,
        total:      item.total,
      });
    }
  }
});

seedSales();
console.log(`✔  Sales (${SALES.length} transactions with items)`);

// ── 8. Customer Credits (Udhar) ────────────────────────────────────────────────
// Schema: customer_id, credit_limit, current_balance, total_purchased, total_paid, status
const insertCredit = db.prepare(`
  INSERT OR IGNORE INTO customer_credits
    (customer_id, credit_limit, current_balance, total_purchased, total_paid, status)
  VALUES
    (@customer_id, @credit_limit, @current_balance, @total_purchased, @total_paid, 'ACTIVE')
`);

const CREDITS = [
  { phone: "03001234567", credit_limit: 5000,  current_balance: 1500,  total_purchased: 4500,  total_paid: 3000  },
  { phone: "03119876543", credit_limit: 10000, current_balance: 3700,  total_purchased: 12200, total_paid: 8500  },
  { phone: "03451112233", credit_limit: 3000,  current_balance: 880,   total_purchased: 3200,  total_paid: 2320  },
];
CREDITS.forEach((c) => {
  const cid = getCustId(c.phone);
  if (cid) insertCredit.run({ customer_id: cid, ...c });
});

console.log("✔  Customer credits (3 udhar accounts)");

// ── Done ───────────────────────────────────────────────────────────────────────
db.close();
console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Seed complete.

Now open POS-it and take screenshots of:
  • Sell         — add items to cart (search "Panadol")
  • Products     — 17 items across 5 categories
  • Stock        — go to Stock tab
  • Reports      — real revenue + daily chart
  • Invoices     — create one from a sale ID
  • Customers    — 5 customers listed
  • Credit Sales — 3 udhar balances
  • Sales History — 12 transactions

Save them to:
  POS-it Web/public/screenshots/app/
    sell.png, products.png, stock.png,
    reports.png, invoices.png, customers.png
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
