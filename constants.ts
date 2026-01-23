
import { Vulnerability } from './types';

export const VULNERABILITIES: Vulnerability[] = [
  { id: 1, title: "SQL Injection (SQLi)", description: "إدخال استعلامات SQL خبيثة للوصول إلى قاعدة البيانات أو تعديلها.", severity: "Critical", category: "Injection" },
  { id: 2, title: "Cross-Site Scripting (XSS)", description: "حقن نصوص برمجية خبيثة في صفحات الويب التي يشاهدها المستخدمون.", severity: "High", category: "Scripting" },
  { id: 3, title: "Cross-Site Request Forgery (CSRF)", description: "إجبار المستخدم على تنفيذ إجراءات غير مرغوب فيها دون علمه.", severity: "High", category: "Session" },
  { id: 100, title: "SiteSec Final Guardian Breach", description: "محاكاة هجوم معقد يستهدف طبقات الحماية الأخيرة.", severity: "Critical", category: "SiteSec" },
];

export const TECH_STACK = [
  { name: "Gemini AI", desc: "محرك الذكاء الاصطناعي لتحليل الكود واكتشاف الأنماط المشبوهة.", icon: "fa-brain" },
  { name: "React 19", desc: "بناء واجهة مستخدم سريعة وتفاعلية.", icon: "fa-react" },
  { name: "Tailwind CSS", desc: "تصميم عصري ومتجاوب مع كافة الأجهزة.", icon: "fa-css3-alt" },
  { name: "TypeScript", desc: "ضمان استقرار الكود وتقليل الأخطاء البرمجية.", icon: "fa-code" },
  { name: "3D Interactivity", desc: "تجربة مستخدم غامرة باستخدام تقنيات العرض الحديثة.", icon: "fa-cube" },
];

export const OFFLINE_OSINT_DATA: Record<string, any> = {
  "google.com": {
    summary: "تحليل نطاق Google: بنية تحتية ضخمة، حماية متقدمة، سجلات DNS نظيفة ومعقدة.",
    sources: [{ web: { uri: "https://google.com", title: "Google Main" } }]
  },
  "tesla.com": {
    summary: "تحليل نطاق Tesla: أنظمة أمان متطورة، استخدام مكثف لشهادات SSL، حماية ضد DDoS.",
    sources: [{ web: { uri: "https://tesla.com", title: "Tesla Official" } }]
  }
};

export const OFFLINE_ADVISOR_QA = [
  { question: "كيف أحمي موقعي من SQLi؟", answer: "استخدم الـ Prepared Statements دائماً ولا تدمج المدخلات مباشرة في الاستعلام." },
  { question: "ما هو الـ OSINT؟", answer: "هو جمع المعلومات من المصادر المفتوحة والمتاحة للجميع للتحليل الأمني." }
];

export const CODE_SNIPPETS = [
  { name: "ثغرة SQLi بسيطة", code: "SELECT * FROM users WHERE id = '" + "id" + "';" },
  { name: "كود PHP معرض للـ XSS", code: "echo '<h1>Welcome ' . $_GET['user'] . '</h1>';" }
];

// Added HTTP_REQUEST_EXAMPLES to resolve the export error in HTTPScanner.tsx
export const HTTP_REQUEST_EXAMPLES = [
  {
    name: "حقن SQL في URL",
    request: "GET /api/products?category=electronics' OR 1=1-- HTTP/1.1\nHost: shop.com\nAccept: */*"
  },
  {
    name: "ثغرة XSS في Header",
    request: "POST /feedback HTTP/1.1\nHost: example.com\nUser-Agent: <script>alert('pwned')</script>\nContent-Type: application/json\n\n{\"msg\": \"hello\"}"
  },
  {
    name: "غياب حماية CSRF",
    request: "POST /user/update-email HTTP/1.1\nHost: bank.com\nCookie: session=secret123\nContent-Type: application/x-www-form-urlencoded\n\nemail=attacker@evil.com"
  }
];
