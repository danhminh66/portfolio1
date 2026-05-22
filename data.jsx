// All real data from user, exposed globally for use in other scripts.

const FICAR = {
  name: "FICAR",
  industry: "Linh kiện xe ô tô",
  period: "T7/2025 – T4/2026",
  rows: [
    { m: "T7/25", spend: 14.5, rev: 130.4, roi: 9,  cr: 1.58 },
    { m: "T8/25", spend: 12.5, rev: 269.3, roi: 22, cr: 4.04 },
    { m: "T9/25", spend: 19.5, rev: 186.6, roi: 10, cr: 1.80 },
    { m: "T1/26", spend: 44.4, rev: 663.6, roi: 15, cr: 2.63 },
    { m: "T3/26", spend: 25.4, rev: 352.0, roi: 14, cr: 2.92 },
    { m: "T4/26", spend: 32.4, rev: 358.8, roi: 11, cr: 1.97 },
  ],
  highlights: [
    ["ROI cao nhất",     "22x",      "T8/2025"],
    ["Doanh thu đỉnh",   "663.6M",   "T1/2026"],
    ["CP/Mess",          "9.7–20k₫", "Ổn định 10 tháng"],
    ["Tổng doanh thu",   "~2.7 tỷ",  "T7/25 → T4/26"],
  ],
};

const ALOHA = {
  name: "Kỷ yếu Aloha Sài Gòn",
  industry: "Dịch vụ chụp ảnh kỷ yếu",
  period: "T3 – T5/2026",
  rows: [
    { m: "T3/26", spend: 20.2, rev: 314.3, orders: 28, cpo: 808,  rate: 6.43 },
    { m: "T4/26", spend: 38.9, rev: 578.6, orders: 52, cpo: 897,  rate: 7.13 },
    { m: "T5/26", spend: 25.6, rev: 201.4, orders: 19, cpo: 1600, rate: 12.72, ongoing: true },
  ],
  highlights: [
    ["KPI đơn",    "87%",   "52/60 đơn — T4"],
    ["KPI doanh số","74%",  "578.6M — T4"],
    ["CPO online", "897k₫", "Dưới KPI 1M"],
    ["Data leads", "1.092", "100% tiềm năng"],
  ],
};

const FFL = {
  name: "FitForLife Gym & Pilates",
  industry: "Premium fitness",
  period: "T4 – T5/2026",
  rows: [
    { m: "T4 (9 ngày)",  spend: 2.1,  mess: 18,  cpa: 119,    ctr: 27.4, kind: "Lead"   },
    { m: "T5 (20 ngày)", spend: 8.9,  mess: 189, cpa: 62.9,   ctr: 4.5,  kind: "Lead"   },
    { m: "Tuyển dụng",   spend: 0.58, mess: 15,  cpa: 38.9,   ctr: 44.15,kind: "Recruit"},
  ],
  highlights: [
    ["CPA/Mess",    "62.915₫", "Thấp cho premium"],
    ["CTR Recruit", "44.15%",  "Outlier ngành"],
    ["Scale spend", "x4.2",    "2.1M → 8.9M / 1 tháng"],
    ["Mess growth", "x10",     "18 → 189 trong 1 tháng"],
  ],
};

const STATS = {
  totalSpend: "186M₫+",
  totalRevenue: "3.5 tỷ₫",
  bestROI: "22x",
  brands: 3,
  industries: 5,
  monthsLive: 10,
  bestRev: "663.6M",
  avgCPM: "12.6k₫",
};

const SERVICES = [
  {
    code: "01",
    title: "Meta Ads — Performance",
    desc: "Setup, scale và tối ưu chiến dịch Facebook/Instagram Ads cho mục tiêu Mess, Lead và Conversion. Audit hằng ngày, tối ưu theo CPA/ROAS.",
    items: ["Campaign architecture (CBO/ABO)", "Audience & creative testing", "Pixel + Conversion API", "Scale từ 2M → 40M+/tháng"],
  },
  {
    code: "02",
    title: "Content & Copywriting",
    desc: "Viết content quảng cáo bám insight ngành. Headline, body, CTA cho ads chuyển đổi tin nhắn — kịch bản video ngắn.",
    items: ["Ads copy chuyển đổi", "Kịch bản TikTok / Reels", "Landing copy", "A/B test thông điệp"],
  },
  {
    code: "03",
    title: "Design & Video (bonus)",
    desc: "Thiết kế ảnh creative ads và edit video ngắn phục vụ chiến dịch. Không phải core, nhưng đủ để chủ động bàn giao.",
    items: ["Static creative (Figma/PS)", "Reels / TikTok edit", "Thumbnail & cover", "Performance creative iteration"],
  },
];

const WORKFLOW = [
  { n: "01", title: "Discover",  desc: "Audit hiện trạng, hiểu sản phẩm, đối tượng và KPI thực tế của brand." },
  { n: "02", title: "Plan",      desc: "Lên media plan, ngân sách, kịch bản creative, dự phóng CPA/ROAS." },
  { n: "03", title: "Launch",    desc: "Setup campaign, pixel/CAPI, audience, creative. Khởi chạy theo phase test." },
  { n: "04", title: "Optimize",  desc: "Đọc data hằng ngày, cắt set lỗ, scale set winning, refresh creative." },
  { n: "05", title: "Report",    desc: "Báo cáo theo tuần / tháng, gợi ý chiến lược kỳ tiếp theo." },
];

const TICKERS = [
  { brand: "FICAR",      kpi: "ROI",       val: "22x",     d: "+144%" },
  { brand: "FICAR",      kpi: "Revenue",   val: "663.6M",  d: "T1/26 peak" },
  { brand: "Aloha",      kpi: "Orders",    val: "52",      d: "87% KPI" },
  { brand: "Aloha",      kpi: "CPO",       val: "897k",    d: "−10% KPI" },
  { brand: "FitForLife", kpi: "CPA/Mess",  val: "62.9k",   d: "−47%" },
  { brand: "FitForLife", kpi: "CTR",       val: "44.15%",  d: "Recruit" },
  { brand: "Aloha",      kpi: "Leads",     val: "1.092",   d: "100% qualified" },
  { brand: "FICAR",      kpi: "Spend",     val: "188.7M",  d: "10 tháng" },
];

Object.assign(window, { FICAR, ALOHA, FFL, STATS, SERVICES, WORKFLOW, TICKERS });
