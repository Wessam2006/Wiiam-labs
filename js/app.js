/* ═══════════════════════════════════════════
   WIA’AM LABS — Main JavaScript (Enhanced)
   Specialist Portal · Admin Portal · Calendar Booking
═══════════════════════════════════════════ */

/* ── FAKE DATABASE ──────────────────────────────── */
const DB = {
  patients: [
    { id:'P001', name:'Ahmed Mohamed',   email:'ahmed@example.com',   dob:'1985-03-14', phone:'010-1234-5678', password:'ahmed123',   gender:'Male',   bloodType:'A+' },
    { id:'P002', name:'Sara Hassan',     email:'sara@example.com',    dob:'1992-07-22', phone:'011-9876-5432', password:'sara123',    gender:'Female', bloodType:'O-' },
    { id:'P003', name:'Karim Youssef',   email:'karim@example.com',   dob:'1978-11-05', phone:'012-5555-1234', password:'karim123',   gender:'Male',   bloodType:'B+' },
    { id:'P004', name:'Nadia Ibrahim',   email:'nadia@example.com',   dob:'1990-01-30', phone:'015-7777-8888', password:'nadia123',   gender:'Female', bloodType:'AB+' },
  ],
  doctors: [
    { id:'D001', name:'Dr. Layla Mansour', email:'layla@novalab.com', specialty:'Hematology',        license:'EG-MED-12345', password:'doc123',   phone:'010-0001-1111', role:'specialist' },
    { id:'D002', name:'Dr. Omar Samir',    email:'omar@novalab.com',  specialty:'Clinical Chemistry', license:'EG-MED-67890', password:'doc456',   phone:'010-0002-2222', role:'specialist' },
  ],
  results: [
    { id:'R001', patientId:'P001', date:'2024-04-10', tests:[
      { name:'Glucose',     loinc:'2345-7', value:95,  unit:'mg/dL',  refRange:'70-110',  flag:'N' },
      { name:'Cholesterol', loinc:'2093-3', value:218, unit:'mg/dL',  refRange:'< 200',   flag:'H' },
      { name:'Creatinine',  loinc:'2160-0', value:0.9, unit:'mg/dL',  refRange:'0.6-1.2', flag:'N' },
    ], status:'Ready', orderedBy:'Dr. Layla Mansour', reportNo:'NL-2024-0410-001' },
    { id:'R002', patientId:'P001', date:'2024-04-18', tests:[
      { name:'Hemoglobin',  loinc:'718-7',  value:11.2, unit:'g/dL',  refRange:'12-16',   flag:'L' },
      { name:'WBC',         loinc:'6690-2', value:9.8,  unit:'10k/uL',refRange:'4.5-11',  flag:'N' },
      { name:'Hematocrit',  loinc:'4544-3', value:34,   unit:'%',     refRange:'36-46',   flag:'L' },
      { name:'Platelets',   loinc:'777-3',  value:245,  unit:'10k/uL',refRange:'150-400', flag:'N' },
    ], status:'Ready', orderedBy:'Dr. Omar Samir', reportNo:'NL-2024-0418-002' },
    { id:'R003', patientId:'P002', date:'2024-04-15', tests:[
      { name:'TSH',         loinc:'3016-3', value:2.4, unit:'mIU/L',  refRange:'0.5-4.5', flag:'N' },
      { name:'T4 Free',     loinc:'3024-7', value:1.1, unit:'ng/dL',  refRange:'0.8-1.8', flag:'N' },
    ], status:'Ready', orderedBy:'Dr. Layla Mansour', reportNo:'NL-2024-0415-003' },
    { id:'R004', patientId:'P003', date:'2024-04-20', tests:[
      { name:'Sodium',      loinc:'2951-2', value:140, unit:'mmol/L', refRange:'136-145', flag:'N' },
      { name:'Potassium',   loinc:'2823-3', value:3.1, unit:'mmol/L', refRange:'3.5-5.1', flag:'L' },
      { name:'Chloride',    loinc:'2075-0', value:102, unit:'mmol/L', refRange:'98-106',  flag:'N' },
    ], status:'Ready', orderedBy:'Dr. Omar Samir', reportNo:'NL-2024-0420-004' },
  ],
  inquiries: [],
  bookings: [
    { id:'B001', patientId:'P001', date:'2026-04-28', time:'09:00', tests:['CBC Panel','Lipid Panel'],  status:'Confirmed', location:'Branch A', doctorId:'D001', machineId:'M001' },
    { id:'B002', patientId:'P002', date:'2026-04-29', time:'10:30', tests:['Thyroid Panel'],            status:'Confirmed', location:'Branch B', doctorId:'D001', machineId:'M002' },
    { id:'B003', patientId:'P003', date:'2026-04-30', time:'08:00', tests:['Lipid Panel'],              status:'Confirmed', location:'Branch A', doctorId:'D002', machineId:'M001' },
    { id:'B004', patientId:'P004', date:'2026-05-01', time:'11:00', tests:['Blood Glucose (Fasting)'],  status:'Confirmed', location:'Branch A', doctorId:'D002', machineId:'M003' },
    { id:'B005', patientId:'P001', date:'2026-05-05', time:'09:30', tests:['HbA1c'],                   status:'Confirmed', location:'Branch C', doctorId:'D001', machineId:'M002' },
    { id:'B006', patientId:'P002', date:'2026-04-22', time:'09:00', tests:['CBC Panel'],               status:'Completed', location:'Branch A', doctorId:'D001', machineId:'M001' },
  ],
  machines: [
    { id:'M001', name:'Sysmex XN-9100',  type:'Hematology Analyzer',          branch:'Branch A', status:'operational', lastMaintenance:'2026-03-15', nextMaintenance:'2026-06-15', technician:'Eng. Tamer Hosni',  techPhone:'010-5551-1001', notes:'Running at 100% capacity' },
    { id:'M002', name:'Cobas 8000',      type:'Clinical Chemistry Analyzer',  branch:'Branch B', status:'operational', lastMaintenance:'2026-04-01', nextMaintenance:'2026-07-01', technician:'Eng. Mona Farid',   techPhone:'010-5551-1002', notes:'Calibrated last week' },
    { id:'M003', name:'Architect i2000', type:'Immunoassay Analyzer',         branch:'Branch A', status:'maintenance', lastMaintenance:'2026-04-20', nextMaintenance:'2026-04-27', technician:'Eng. Sherif Nabil',  techPhone:'010-5551-1003', notes:'Scheduled maintenance in progress — ETA 2 days' },
    { id:'M004', name:'BDMax System',    type:'Molecular Diagnostics',        branch:'Branch C', status:'operational', lastMaintenance:'2026-02-10', nextMaintenance:'2026-05-10', technician:'Eng. Tamer Hosni',  techPhone:'010-5551-1001', notes:'Due for maintenance soon' },
    { id:'M005', name:'BACTEC FX',       type:'Blood Culture System',         branch:'Branch B', status:'fault',      lastMaintenance:'2026-01-22', nextMaintenance:'2026-04-22', technician:'Eng. Sara Mostafa',  techPhone:'010-5551-1004', notes:'Sensor fault detected — technician contacted' },
    { id:'M006', name:'Clover A8',       type:'Immunofluorescence Reader',    branch:'Branch D', status:'operational', lastMaintenance:'2026-03-30', nextMaintenance:'2026-06-30', technician:'Eng. Mona Farid',   techPhone:'010-5551-1002', notes:'Optimal condition' },
  ],
};

/* ── AUTH STATE ─────────────────────────────────── */
let currentUser = null;
let currentRole = null; // 'patient' | 'specialist'

function login(email, password, role) {
  if (role === 'patient') {
    return DB.patients.find(u => u.email === email && u.password === password) || null;
  } else {
    return DB.doctors.find(u => u.email === email && u.password === password) || null;
  }
}
function logout() {
  currentUser = null; currentRole = null;
  sessionStorage.removeItem('nl_user');
  sessionStorage.removeItem('nl_role');
  showPage('home');
  updateNavAuth();
}
function saveSession() {
  sessionStorage.setItem('nl_user', JSON.stringify(currentUser));
  sessionStorage.setItem('nl_role', currentRole);
}
function loadSession() {
  const u = sessionStorage.getItem('nl_user');
  const r = sessionStorage.getItem('nl_role');
  if (u && r) { currentUser = JSON.parse(u); currentRole = r; }
}

/* ── ROUTER ─────────────────────────────────────── */
const pages = {};
function registerPage(id, renderFn) { pages[id] = renderFn; }

function showPage(id) {
  const main = document.getElementById('main-content');
  if (!main) return;
  const render = pages[id];
  if (!render) return;
  main.innerHTML = '';
  main.appendChild(render());
  initReveal();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateNavActive(id);
}

function updateNavActive(id) {
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id);
  });
}
function updateNavAuth() {
  const authArea = document.getElementById('nav-auth');
  if (!authArea) return;
  if (currentUser) {
    const portalPage = currentRole === 'specialist' ? 'specialist-portal' : 'portal';
    authArea.innerHTML = `
      <span style="font-size:.85rem;color:var(--text-muted)">Hi, <strong>${currentUser.name.split(' ')[0]}</strong></span>
      <button class="btn btn-sm btn-outline" onclick="showPage('${portalPage}')">My Portal</button>
      <button class="btn btn-sm" style="background:var(--off-white);color:var(--text-muted);border:1.5px solid var(--border)" onclick="logout()">Sign Out</button>`;
  } else {
    authArea.innerHTML = `
      <button class="btn btn-sm btn-outline" onclick="showModal('login-modal')">Sign In</button>
      <button class="btn btn-sm btn-primary" onclick="showPage('register')">Register</button>`;
  }
}

/* ── MODALS ─────────────────────────────────────── */
function showModal(id) { document.getElementById(id)?.classList.add('open'); }
function hideModal(id) { document.getElementById(id)?.classList.remove('open'); }
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) hideModal(e.target.id);
});

/* ── SCROLL REVEAL ──────────────────────────────── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

window.addEventListener('scroll', () => {
  document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 30);
});
function toggleNav() {
  document.querySelector('.nav-links')?.classList.toggle('open');
}

/* ═══════════════ DATA ═══════════════════════════ */
const TESTS = [
  { id:'T01', name:'Complete Blood Count (CBC)', category:'Hematology', icon:'🩸', desc:'Measures RBC, WBC, platelets, hemoglobin and hematocrit.', price:120, turnaround:'4-6 hrs',
    precautions:[
      { icon:'🍽️', label:'Fasting', detail:'No fasting required. You may eat and drink normally.' },
      { icon:'💊', label:'Medications', detail:'Inform your doctor of any blood thinners or supplements. Do not stop medications unless advised.' },
      { icon:'🏃', label:'Activity', detail:'Avoid strenuous exercise 24 hours before the test as it may temporarily elevate WBC counts.' },
      { icon:'💧', label:'Hydration', detail:'Stay well hydrated — dehydration can concentrate blood cells and skew results.' },
      { icon:'🩸', label:'Sample Type', detail:'Venous blood draw from the arm. Takes about 5 minutes.' },
    ]
  },
  { id:'T02', name:'Lipid Panel', category:'Chemistry', icon:'💉', desc:'Total cholesterol, HDL, LDL, triglycerides.', price:150, turnaround:'4-6 hrs',
    precautions:[
      { icon:'⏱️', label:'Fasting', detail:'Fast for 9–12 hours before the test. Water is allowed.' },
      { icon:'🍔', label:'Diet', detail:'Avoid high-fat meals the evening before. A light, low-fat dinner is recommended.' },
      { icon:'🚫', label:'Alcohol', detail:'Avoid alcohol for at least 24 hours before the test as it raises triglyceride levels.' },
      { icon:'💊', label:'Medications', detail:'Statins and cholesterol medications may affect results. Inform your doctor but do not stop them without guidance.' },
      { icon:'🏃', label:'Activity', detail:'Avoid intense exercise 24 hours before the test.' },
    ]
  },
  { id:'T03', name:'Thyroid Panel (TSH, T3, T4)', category:'Hormones', icon:'🦋', desc:'Evaluates thyroid gland function comprehensively.', price:220, turnaround:'6-8 hrs',
    precautions:[
      { icon:'🍽️', label:'Fasting', detail:'No fasting required, though some labs recommend a morning draw before eating for consistency.' },
      { icon:'⏰', label:'Timing', detail:'Ideally collect the sample in the morning (7–9 AM) as TSH levels fluctuate throughout the day.' },
      { icon:'💊', label:'Medications', detail:'Thyroid medications (levothyroxine) should be taken AFTER the blood draw, not before. Biotin supplements should be stopped 72 hours prior.' },
      { icon:'🩻', label:'Imaging', detail:'Inform your doctor if you recently had iodine contrast imaging — wait at least 4 weeks before this test.' },
    ]
  },
  { id:'T04', name:'Blood Glucose (Fasting)', category:'Chemistry', icon:'🍬', desc:'Measures fasting blood sugar to screen for diabetes.', price:60, turnaround:'2-4 hrs',
    precautions:[
      { icon:'⏱️', label:'Fasting', detail:'Fast for exactly 8–10 hours before the test. No food, juice, or sweetened drinks. Plain water is allowed.' },
      { icon:'☕', label:'Beverages', detail:'No coffee, tea, or any drink other than water during the fasting period — even black coffee can affect glucose levels.' },
      { icon:'💊', label:'Medications', detail:'Do not take diabetes medications (insulin, metformin) before the draw unless specifically instructed by your doctor.' },
      { icon:'😴', label:'Sleep', detail:'The overnight fast works best — try to schedule the test first thing in the morning after a full night\u2019s sleep.' },
      { icon:'🚫', label:'Smoking', detail:'Avoid smoking during the fasting window as nicotine can raise blood glucose levels.' },
    ]
  },
  { id:'T05', name:'Liver Function Tests (LFTs)', category:'Chemistry', icon:'🫀', desc:'ALT, AST, ALP, bilirubin, albumin and total protein.', price:180, turnaround:'4-6 hrs',
    precautions:[
      { icon:'⏱️', label:'Fasting', detail:'Fast for 8–10 hours before the test. Water is allowed.' },
      { icon:'🚫', label:'Alcohol', detail:'Strictly avoid alcohol for at least 48–72 hours before the test. Alcohol directly elevates liver enzymes.' },
      { icon:'💊', label:'Medications', detail:'Many medications (paracetamol, statins, antibiotics) affect liver enzymes. Provide a full medication list to your doctor.' },
      { icon:'🏃', label:'Activity', detail:'Avoid strenuous exercise 24 hours before — physical exertion raises AST and ALT temporarily.' },
      { icon:'🌿', label:'Supplements', detail:'Stop herbal supplements (especially kava, valerian, green tea extract) at least 5 days prior — many are hepatotoxic.' },
    ]
  },
  { id:'T06', name:'Kidney Function Tests', category:'Chemistry', icon:'🫘', desc:'Creatinine, BUN, uric acid, eGFR.', price:140, turnaround:'4-6 hrs',
    precautions:[
      { icon:'⏱️', label:'Fasting', detail:'Fast for 8 hours before the test. Water is permitted and encouraged.' },
      { icon:'🥩', label:'Diet', detail:'Avoid high-protein meals (red meat, protein shakes) for 24 hours before — they can temporarily raise creatinine and BUN.' },
      { icon:'💧', label:'Hydration', detail:'Drink plenty of water before the test. Dehydration can falsely elevate creatinine levels.' },
      { icon:'💊', label:'Medications', detail:'NSAIDs (ibuprofen, diclofenac), ACE inhibitors, and contrast dyes can affect kidney markers. Inform your doctor.' },
      { icon:'🏃', label:'Activity', detail:'Avoid intense exercise 24–48 hours before as it can raise creatinine levels.' },
    ]
  },
  { id:'T07', name:'HbA1c (Glycated Hemoglobin)', category:'Hormones', icon:'📊', desc:'3-month average blood sugar control indicator.', price:130, turnaround:'4-6 hrs',
    precautions:[
      { icon:'🍽️', label:'Fasting', detail:'No fasting required. HbA1c reflects a 3-month average and is not affected by recent meals.' },
      { icon:'🩸', label:'Blood Conditions', detail:'Conditions affecting red blood cells (anemia, sickle cell, thalassemia) can give falsely low or high results. Inform your doctor.' },
      { icon:'💊', label:'Medications', detail:'Iron supplements, vitamin C, and erythropoietin can interfere. List all current medications.' },
      { icon:'🔁', label:'Frequency', detail:'This test is typically repeated every 3 months for diabetics — no more frequently as the red cell lifespan limits accuracy.' },
    ]
  },
  { id:'T08', name:'Electrolytes Panel', category:'Chemistry', icon:'⚡', desc:'Sodium, potassium, chloride, bicarbonate.', price:110, turnaround:'2-4 hrs',
    precautions:[
      { icon:'⏱️', label:'Fasting', detail:'Fasting for 4–6 hours is preferred for most accurate results.' },
      { icon:'💊', label:'Medications', detail:'Diuretics, ACE inhibitors, and laxatives significantly affect electrolyte levels. Do not stop medications — just inform your doctor.' },
      { icon:'💧', label:'Hydration', detail:'Do not overhydrate (excessive water intake) before the test as it can dilute sodium levels (hyponatremia).' },
      { icon:'🍌', label:'Diet', detail:'Avoid high-potassium foods (bananas, dates, potatoes) the morning of the test if you are monitoring potassium levels.' },
    ]
  },
  { id:'T09', name:'Urine Analysis', category:'Microbiology', icon:'🧪', desc:'Complete urine examination including microscopy.', price:70, turnaround:'2-3 hrs',
    precautions:[
      { icon:'🫙', label:'Sample', detail:'Collect a midstream clean-catch urine sample. Clean the genital area before collecting. Discard the first stream, then collect mid-flow.' },
      { icon:'⏰', label:'Timing', detail:'First morning urine is ideal — it is most concentrated and gives the most accurate results.' },
      { icon:'💊', label:'Medications', detail:'Vitamin C supplements, rifampicin, and some antibiotics discolor urine and affect results. Stop vitamin C 24 hours prior if possible.' },
      { icon:'🚺', label:'For Women', detail:'Do not collect a sample during menstruation — blood can contaminate the sample. Wait 2–3 days after your period ends.' },
      { icon:'🥤', label:'Hydration', detail:'Do not drink excessive water right before — overly dilute urine can mask important findings.' },
    ]
  },
  { id:'T10', name:'Ferritin & Iron Studies', category:'Hematology', icon:'🔋', desc:'Serum iron, TIBC, ferritin, transferrin saturation.', price:160, turnaround:'4-6 hrs',
    precautions:[
      { icon:'⏱️', label:'Fasting', detail:'Fast for 8–12 hours. Iron levels are highest in the morning and drop throughout the day — always test in the morning.' },
      { icon:'💊', label:'Iron Supplements', detail:'Stop iron supplements and multivitamins containing iron at least 24 hours before the test — they cause falsely elevated serum iron.' },
      { icon:'🩸', label:'Recent Transfusion', detail:'If you recently received a blood transfusion, wait at least 2 weeks before this test.' },
      { icon:'🤒', label:'Illness', detail:'Ferritin is an acute-phase reactant — it rises during infections or inflammation. Avoid testing during active illness.' },
    ]
  },
  { id:'T11', name:'Vitamin D (25-OH)', category:'Hormones', icon:'☀️', desc:'25-hydroxyvitamin D serum level measurement.', price:200, turnaround:'6-8 hrs',
    precautions:[
      { icon:'🍽️', label:'Fasting', detail:'No fasting required. You may eat and drink normally before this test.' },
      { icon:'💊', label:'Supplements', detail:'Do not take vitamin D supplements on the morning of the test. For an accurate baseline, ideally stop supplements 3 days prior.' },
      { icon:'🌞', label:'Sun Exposure', detail:'Note recent sun exposure when discussing results with your doctor — significant sun exposure in recent weeks can raise levels.' },
      { icon:'💉', label:'Medications', detail:'Steroids, anticonvulsants, and some weight-loss medications affect vitamin D metabolism. Provide a full medication list.' },
    ]
  },
  { id:'T12', name:'Blood Culture', category:'Microbiology', icon:'🦠', desc:'Detects bacteria or fungi in the bloodstream.', price:280, turnaround:'24-72 hrs',
    precautions:[
      { icon:'💊', label:'Antibiotics', detail:'CRITICAL: Ideally collect blood BEFORE starting antibiotic therapy. Antibiotics drastically reduce the chance of detecting bacteria.' },
      { icon:'🌡️', label:'Timing', detail:'Blood cultures are most useful when drawn at the peak of fever (when you feel chills coming on). Alert the nurse immediately when you feel feverish.' },
      { icon:'🧴', label:'Skin Prep', detail:'The phlebotomist will clean your skin with antiseptic — do not touch the site after cleaning. Contamination is the most common source of false positives.' },
      { icon:'🔁', label:'Multiple Draws', detail:'Usually 2–3 draws from different sites are collected at different times to increase detection accuracy.' },
      { icon:'⏳', label:'Results', detail:'Results take 24–72 hours (or up to 5 days for fungi). A negative result after 5 days generally rules out bloodstream infection.' },
    ]
  },
];

const SPECIALISTS = [
  { name:'Prof. Layla Mansour', title:'Head of Hematology', initials:'LM', tags:['Hematology','Blood Disorders'], bio:'30+ years experience. Former head of Cairo University Medical Labs. Specialist in rare blood disorders and hemostasis.' },
  { name:'Dr. Omar Samir', title:'Clinical Chemistry Specialist', initials:'OS', tags:['Biochemistry','Endocrinology'], bio:'Expert in metabolic disorders and endocrine biochemistry. Published researcher with 45+ peer-reviewed papers.' },
  { name:'Dr. Rana Khalil', title:'Microbiology & Virology', initials:'RK', tags:['Microbiology','Infectious Disease'], bio:'Specialized in rapid pathogen identification and antimicrobial resistance patterns. Trained at Institut Pasteur, Paris.' },
  { name:'Dr. Ahmed Farouk', title:'Immunology Specialist', initials:'AF', tags:['Immunology','Allergy Testing'], bio:'Focuses on autoimmune disease markers, allergy panels, and flow cytometry. Member of the Egyptian Society of Immunology.' },
  { name:'Dr. Nadia Sherif', title:'Molecular Diagnostics', initials:'NS', tags:['Molecular Biology','PCR','Genetics'], bio:'Pioneer of PCR-based diagnostics in Egypt. Leads genomics and inherited disease testing at WIA’AM LABS.' },
  { name:'Dr. Khaled Atef', title:'Anatomic Pathology', initials:'KA', tags:['Histopathology','Cytology'], bio:'Specialist in tissue diagnosis, cytopathology and oncology panels. Trained at the University of London.' },
];

/* ═══════════════ PAGE RENDERS ══════════════════ */

registerPage('home', () => {
  const el = document.createElement('div');
  el.innerHTML = `
  <section class="hero">
    <div class="hero-blob"></div><div class="hero-blob2"></div>
    <div class="hero-content">
      <div>
        <div class="hero-tag">🔬 Accredited since 1998 · ISO 15189 Certified</div>
        <h1>Precision Lab Results.<br>Delivered with <em>Care</em>.</h1>
        <p>WIA’AM LABS provides world-class diagnostic services with same-day results, expert specialists, and a seamless digital patient experience.</p>
        <div class="hero-btns">
          <button class="btn btn-primary" onclick="showPage('booking')">Book a Test</button>
          <button class="btn btn-outline" onclick="showPage('about')">About Us</button>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><div class="num">180+</div><div class="lbl">Tests Available</div></div>
          <div class="hero-stat"><div class="num">25k+</div><div class="lbl">Patients Served</div></div>
          <div class="hero-stat"><div class="num">6</div><div class="lbl">Branches</div></div>
        </div>
      </div>
      <div class="hero-card-wrap">
        <div class="hero-visual-card">
          <div class="hvc-title">📋 Latest Results (sample)</div>
          <div class="hvc-test-list">
            <div class="hvc-test"><span class="hvc-test-name">Hemoglobin</span><span class="hvc-test-val" style="color:#68d391">13.5 g/dL ✓</span></div>
            <div class="hvc-test"><span class="hvc-test-name">Glucose</span><span class="hvc-test-val" style="color:#68d391">95 mg/dL ✓</span></div>
            <div class="hvc-test"><span class="hvc-test-name">Cholesterol</span><span class="hvc-test-val" style="color:#fc8181">218 mg/dL</span></div>
            <div class="hvc-test"><span class="hvc-test-name">Creatinine</span><span class="hvc-test-val" style="color:#68d391">0.9 mg/dL ✓</span></div>
          </div>
          <button class="btn btn-sm" style="width:100%;margin-top:16px;background:rgba(255,255,255,.15);color:white;border:1px solid rgba(255,255,255,.3)" onclick="showModal('login-modal')">View My Results</button>
        </div>
      </div>
    </div>
  </section>
  <section class="section" style="background:var(--off-white)"><div class="container">
    <div class="section-header text-center reveal">
      <div class="section-tag">Why Choose Us</div>
      <h2 class="section-heading">Healthcare Excellence at Every Step</h2>
      <p>From collection to report delivery, we maintain the highest standards.</p>
    </div>
    <div class="grid-4">
      ${[['🕐','Same-Day Results','Most routine panels ready within 4-6 hours. STAT results in under 2 hours.'],['🏅','ISO 15189 Certified','Accredited by the Egyptian Accreditation Council.'],['🏠','Home Collection','We send certified phlebotomists to your door.'],['📱','Digital Reports','Access your results online anytime.']].map(([i,t,d])=>`<div class="card reveal"><div class="card-body text-center"><div style="font-size:2.4rem;margin-bottom:16px">${i}</div><h4>${t}</h4><p style="font-size:.85rem;margin-top:8px">${d}</p></div></div>`).join('')}
    </div>
  </div></section>
  <section class="section"><div class="container">
    <div class="section-header reveal">
      <div class="section-tag">Our Services</div>
      <h2 class="section-heading">Popular Lab Tests</h2>
    </div>
    <div class="tests-grid">
      ${TESTS.slice(0,6).map(t=>`<div class="test-card reveal" onclick="showPage('booking')"><div class="test-icon">${t.icon}</div><div class="test-name">${t.name}</div><div class="test-desc">${t.desc}</div><div class="test-meta"><span class="test-price">${t.price} EGP</span><span class="test-time">⏱ ${t.turnaround}</span></div></div>`).join('')}
    </div>
    <div style="text-align:center;margin-top:36px"><button class="btn btn-outline" onclick="showPage('tests')">View All Tests →</button></div>
  </div></section>
  <section class="section" style="background:var(--off-white)"><div class="container">
    <div class="section-header text-center reveal">
      <div class="section-tag">Our Team</div>
      <h2 class="section-heading">Meet Our Specialists</h2>
    </div>
    <div class="grid-3">
      ${SPECIALISTS.slice(0,3).map(s=>`<div class="card specialist-card reveal"><div class="card-body"><div class="spec-img">${s.initials}</div><div class="spec-name">${s.name}</div><div class="spec-title">${s.title}</div><div class="spec-tags">${s.tags.map(t=>`<span class="badge badge-teal">${t}</span>`).join('')}</div></div></div>`).join('')}
    </div>
    <div style="text-align:center;margin-top:36px"><button class="btn btn-outline" onclick="showPage('specialists')">All Specialists →</button></div>
  </div></section>
  <section class="section" style="background:var(--teal)"><div class="container text-center">
    <h2 style="color:white;margin-bottom:14px">Ready to Book Your Test?</h2>
    <p style="color:rgba(255,255,255,.8);margin-bottom:32px">Register in minutes — results delivered to your portal.</p>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-primary" style="background:white;color:var(--teal);border-color:white" onclick="showPage('booking')">Book Now</button>
      <button class="btn btn-outline" style="border-color:rgba(255,255,255,.5);color:white" onclick="showPage('contact')">Contact Us</button>
    </div>
  </div></section>`;
  return el;
});

registerPage('about', () => {
  const el = document.createElement('div');
  el.innerHTML = `
  <div class="page-header"><div class="container">
    <div class="breadcrumb"><a href="#" onclick="showPage('home')">Home</a> / About Us</div>
    <h1>About WIA’AM LABS</h1><p>Egypt's trusted partner in diagnostic excellence since 1998.</p>
  </div></div>
  <section class="section"><div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center" class="reveal">
      <div>
        <div class="section-tag">Our Story</div>
        <h2 class="section-heading" style="margin-top:10px">25 Years of Diagnostic Excellence</h2>
        <p>Founded in 1998, WIA’AM LABS has grown from a single facility to a nationwide network of six accredited branches serving over 25,000 patients annually.</p>
        <p style="margin-top:16px">Our commitment to accuracy, speed, and patient-centered care has earned us ISO 15189 certification.</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        ${[['25+','Years of Service'],['180+','Tests Offered'],['25k+','Patients/Year'],['99.8%','Accuracy Rate']].map(([n,l])=>`<div class="card"><div class="card-body text-center"><div style="font-size:2rem;font-weight:800;color:var(--teal)">${n}</div><div style="font-size:.82rem;color:var(--text-muted);margin-top:4px">${l}</div></div></div>`).join('')}
      </div>
    </div>
  </div></section>`;
  return el;
});

registerPage('specialists', () => {
  const el = document.createElement('div');
  el.innerHTML = `
  <div class="page-header"><div class="container">
    <div class="breadcrumb"><a href="#" onclick="showPage('home')">Home</a> / Specialists</div>
    <h1>Our Specialists</h1><p>Meet the board-certified experts behind WIA’AM LABS's diagnostic excellence.</p>
  </div></div>
  <section class="section"><div class="container">
    <div class="grid-3">
      ${SPECIALISTS.map(s=>`<div class="card specialist-card reveal"><div class="card-body"><div class="spec-img">${s.initials}</div><div class="spec-name">${s.name}</div><div class="spec-title">${s.title}</div><div class="spec-tags">${s.tags.map(t=>`<span class="badge badge-teal">${t}</span>`).join('')}</div><p style="font-size:.82rem;color:var(--text-muted);margin-top:14px;line-height:1.6">${s.bio}</p></div></div>`).join('')}
    </div>
  </div></section>`;
  return el;
});

registerPage('tests', () => {
  const el = document.createElement('div');
  const cats = ['All',...new Set(TESTS.map(t=>t.category))];
  el.innerHTML = `
  <div class="page-header"><div class="container">
    <div class="breadcrumb"><a href="#" onclick="showPage('home')">Home</a> / Tests</div>
    <h1>Our Tests</h1><p>Explore our full catalog of diagnostic tests and panels.</p>
  </div></div>
  <section class="section"><div class="container">
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px">
      ${cats.map((c,i)=>`<button class="btn btn-sm ${i===0?'btn-primary':'btn-outline'}" onclick="filterTests('${c}',this)">${c}</button>`).join('')}
    </div>
    <div class="tests-grid" id="tests-grid">
      ${TESTS.map(t=>`
        <div class="test-card reveal" data-cat="${t.category}" style="cursor:pointer;transition:all .2s">
          <div onclick="togglePrecautions('prec-${t.id}', this.closest('.test-card'))">
            <div class="test-icon">${t.icon}</div>
            <div class="test-name">${t.name}</div>
            <div class="test-desc">${t.desc}</div>
            <div class="test-meta"><span class="test-price">${t.price} EGP</span><span class="test-time">⏱ ${t.turnaround}</span></div>
            <div style="margin-top:12px;font-size:.78rem;color:var(--teal);font-weight:600;display:flex;align-items:center;gap:4px">⚠️ View Precautions <span id="arr-${t.id}">▼</span></div>
          </div>
          <div id="prec-${t.id}" style="display:none;margin-top:14px;border-top:1.5px solid var(--border);padding-top:14px">
            <div style="font-size:.8rem;font-weight:700;color:var(--teal);margin-bottom:10px;letter-spacing:.04em">BEFORE YOUR TEST</div>
            <div style="display:grid;gap:8px">
              ${t.precautions.map(p=>`
                <div style="display:flex;gap:10px;align-items:flex-start;background:var(--off-white);border-radius:8px;padding:10px 12px">
                  <span style="font-size:1.1rem;flex-shrink:0">${p.icon}</span>
                  <div><div style="font-weight:700;font-size:.78rem;color:var(--text);margin-bottom:2px">${p.label}</div><div style="font-size:.78rem;color:var(--text-muted);line-height:1.5">${p.detail}</div></div>
                </div>`).join('')}
            </div>
            <button class="btn btn-primary" style="width:100%;margin-top:14px;font-size:.84rem" onclick="showPage('booking')">Book This Test →</button>
          </div>
        </div>`).join('')}
    </div>
  </div></section>`;
  window.filterTests = (cat, btn) => {
    document.querySelectorAll('[onclick*="filterTests"]').forEach(b=>b.className='btn btn-sm btn-outline');
    btn.className='btn btn-sm btn-primary';
    el.querySelectorAll('.test-card').forEach(c=>{ c.style.display=(cat==='All'||c.dataset.cat===cat)?'':'none'; });
  };
  window.togglePrecautions = (id, card) => {
    const panel = document.getElementById(id);
    const tid = id.replace('prec-','');
    const arr = document.getElementById('arr-'+tid);
    const isOpen = panel.style.display !== 'none';
    panel.style.display = isOpen ? 'none' : 'block';
    arr.textContent = isOpen ? '\u25BC' : '\u25B2';
    if(!isOpen) card.style.boxShadow = '0 8px 32px rgba(0,109,119,.15)';
    else card.style.boxShadow = '';
  };
  return el;
});

registerPage('contact', () => {
  const el = document.createElement('div');

  // Category config: label, icon, color, prompts
  const CATEGORIES = [
    { id:'result',    label:'Test Result Inquiry',      icon:'📋', color:'#3b82f6', bg:'#eff6ff', border:'#93c5fd',
      prompts:['I cannot access my results online','My result values seem abnormal','I need a printed copy of my report','I want to understand what my results mean'] },
    { id:'booking',   label:'Booking / Appointment',    icon:'📅', color:'#059669', bg:'#ecfdf5', border:'#6ee7b7',
      prompts:['I need to reschedule my appointment','I want to cancel my booking','I did not receive a confirmation','I need to change my branch or time'] },
    { id:'specialist',label:'Specialist / Doctor',      icon:'👨‍⚕️', color:'#7c3aed', bg:'#f5f3ff', border:'#c4b5fd',
      prompts:['I want to follow up with my specialist','I need a referral or second opinion','I have a question about my diagnosis','I want to change my assigned specialist'] },
    { id:'billing',   label:'Billing & Payments',       icon:'💳', color:'#b45309', bg:'#fffbeb', border:'#fcd34d',
      prompts:['I have a question about my invoice','I was charged incorrectly','I need a receipt for insurance','I want to inquire about payment plans'] },
    { id:'complaint', label:'Complaint / Feedback',     icon:'⚠️', color:'#dc2626', bg:'#fef2f2', border:'#fca5a5',
      prompts:['Staff behaviour was unprofessional','I waited too long for my appointment','The facility was not clean','I want to file a formal complaint'] },
    { id:'general',   label:'General Inquiry',          icon:'💬', color:'#475569', bg:'#f8fafc', border:'#cbd5e1',
      prompts:['I want to know more about a specific test','I need directions to a branch','I want to know your working hours','Other — I will describe below'] },
  ];

  const isLoggedIn = currentUser && currentRole === 'patient';
  const myBookings = isLoggedIn ? DB.bookings.filter(b=>b.patientId===currentUser.id && b.status==='Confirmed') : [];
  const myDoctors  = isLoggedIn ? [...new Set(myBookings.map(b=>b.doctorId))].map(id=>DB.doctors.find(d=>d.id===id)).filter(Boolean) : [];

  el.innerHTML = `
  <div class="page-header"><div class="container">
    <div class="breadcrumb"><a href="#" onclick="showPage('home')">Home</a> / Contact</div>
    <h1>Contact & Inquiries</h1>
    <p>Choose a category, fill in your details, and our team will respond within one business day.</p>
  </div></div>
  <section class="section"><div class="container">
    <div style="display:grid;grid-template-columns:1fr 1.6fr;gap:40px;align-items:start">

      <!-- LEFT: contact info -->
      <div>
        <h3 style="margin-bottom:16px">Get In Touch</h3>
        <div style="display:grid;gap:12px;margin-bottom:28px">
          ${[['📍','Address','45 Nasr City Rd, Cairo, Egypt'],['📞','Phone','+20 2 1234 5678'],['✉️','Email','info@wiaamlabs.eg'],['⏰','Hours','Sat–Thu: 7AM – 9PM']].map(([i,l,v])=>`
            <div style="display:flex;gap:14px;align-items:center;padding:13px 16px;background:var(--off-white);border:1px solid var(--border);border-radius:8px">
              <div style="font-size:1.4rem">${i}</div>
              <div><div style="font-weight:600;font-size:.85rem">${l}</div><div style="color:var(--text-muted);font-size:.85rem">${v}</div></div>
            </div>`).join('')}
        </div>

        <h4 style="margin-bottom:12px">Inquiry Categories</h4>
        <div style="display:grid;gap:8px">
          ${CATEGORIES.map(c=>`
            <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:${c.bg};border:1.5px solid ${c.border};border-radius:8px;cursor:pointer" onclick="selectCategory('${c.id}')">
              <span style="font-size:1.1rem">${c.icon}</span>
              <span style="font-size:.84rem;font-weight:600;color:${c.color}">${c.label}</span>
            </div>`).join('')}
        </div>
      </div>

      <!-- RIGHT: inquiry form -->
      <div class="card"><div class="card-body" style="padding:28px">
        <div id="contact-alert"></div>
        <h3 style="margin-bottom:6px">Send an Inquiry</h3>
        <p style="color:var(--text-muted);font-size:.85rem;margin-bottom:20px">All fields marked * are required.</p>

        <!-- Step 1: Category -->
        <div style="margin-bottom:20px">
          <label class="form-label">Category *</label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px" id="cat-grid">
            ${CATEGORIES.map(c=>`
              <button id="catbtn-${c.id}" onclick="selectCategory('${c.id}')"
                style="padding:10px 12px;border:2px solid var(--border);border-radius:6px;background:white;text-align:left;cursor:pointer;transition:all .15s;display:flex;align-items:center;gap:8px">
                <span style="font-size:1rem">${c.icon}</span>
                <span style="font-size:.78rem;font-weight:600;color:var(--text)">${c.label}</span>
              </button>`).join('')}
          </div>
        </div>

        <!-- Step 2: Prompts (shown after category selected) -->
        <div id="prompt-section" style="display:none;margin-bottom:20px">
          <label class="form-label">What best describes your inquiry? *</label>
          <div id="prompt-grid" style="display:grid;gap:8px"></div>
        </div>

        <!-- Divider -->
        <div class="divider" style="margin:20px 0"></div>

        <!-- Patient details -->
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input class="form-control" id="ct-name" placeholder="Your full name" value="${isLoggedIn?currentUser.name:''}">
          </div>
          <div class="form-group">
            <label class="form-label">Email *</label>
            <input class="form-control" id="ct-email" type="email" placeholder="your@email.com" value="${isLoggedIn?currentUser.email:''}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Patient ID</label>
            <input class="form-control" id="ct-pid" placeholder="e.g. P001 (if known)" value="${isLoggedIn?currentUser.id:''}">
          </div>
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input class="form-control" id="ct-phone" placeholder="010-XXXX-XXXX" value="${isLoggedIn&&currentUser.phone?currentUser.phone:''}">
          </div>
        </div>

        <!-- Specialist selector (shown for logged-in patients with bookings) -->
        ${myDoctors.length>0?`
        <div class="form-group">
          <label class="form-label">Related Specialist</label>
          <select class="form-control" id="ct-doctor">
            <option value="">— Select if relevant —</option>
            ${myDoctors.map(d=>`<option value="${d.id}">${d.name} (${d.specialty})</option>`).join('')}
          </select>
        </div>`:'<input type="hidden" id="ct-doctor" value="">'}

        <!-- Test selector (shown for logged-in patients with bookings) -->
        ${myBookings.length>0?`
        <div class="form-group">
          <label class="form-label">Related Appointment / Test</label>
          <select class="form-control" id="ct-booking">
            <option value="">— Select if relevant —</option>
            ${myBookings.map(b=>`<option value="${b.id}">${b.id} — ${b.tests.join(', ')} on ${b.date}</option>`).join('')}
          </select>
        </div>`:'<input type="hidden" id="ct-booking" value="">'}

        <div class="form-group">
          <label class="form-label">Additional Details</label>
          <textarea class="form-control" id="ct-msg" rows="4" placeholder="Please provide any additional context that may help us respond faster…"></textarea>
        </div>

        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          <button class="btn btn-primary" style="flex:1;min-width:160px" onclick="submitInquiry()">Submit Inquiry</button>
          <span style="font-size:.78rem;color:var(--text-muted)">We respond within 1 business day</span>
        </div>
      </div></div>
    </div>
  </div></section>`;

  let selectedCat = null;
  let selectedPrompt = null;

  window.selectCategory = (catId) => {
    selectedCat = catId;
    selectedPrompt = null;
    const cat = CATEGORIES.find(c=>c.id===catId);

    // Highlight selected category button
    CATEGORIES.forEach(c=>{
      const btn = el.querySelector('#catbtn-'+c.id);
      if(!btn) return;
      btn.style.borderColor = c.id===catId ? cat.color : 'var(--border)';
      btn.style.background  = c.id===catId ? cat.bg   : 'white';
      btn.querySelector('span:last-child').style.color = c.id===catId ? cat.color : 'var(--text)';
    });

    // Show prompts
    const promptGrid = el.querySelector('#prompt-grid');
    promptGrid.innerHTML = cat.prompts.map((p,i)=>`
      <button id="prompt-${i}" onclick="selectPrompt(${i}, '${p.replace(/'/g,"\'")}', '${catId}')"
        style="padding:10px 14px;border:1.5px solid ${cat.border};border-radius:6px;background:white;text-align:left;cursor:pointer;font-size:.82rem;color:${cat.color};font-weight:500;transition:all .15s">
        ${p}
      </button>`).join('');
    el.querySelector('#prompt-section').style.display = 'block';
    el.querySelector('#prompt-section').scrollIntoView({behavior:'smooth',block:'nearest'});
  };

  window.selectPrompt = (idx, text, catId) => {
    selectedPrompt = text;
    const cat = CATEGORIES.find(c=>c.id===catId);
    el.querySelectorAll('[id^="prompt-"]').forEach((b,i)=>{
      b.style.background   = i===idx ? cat.bg  : 'white';
      b.style.borderColor  = i===idx ? cat.color : cat.border;
      b.style.fontWeight   = i===idx ? '700'  : '500';
    });
    // Pre-fill message textarea with the prompt as a starter
    const msg = el.querySelector('#ct-msg');
    if(!msg.value || msg.dataset.auto==='1') {
      msg.value = text === 'Other — I will describe below' ? '' : text + '. ';
      msg.dataset.auto = '1';
    }
  };

  window.submitInquiry = () => {
    const name  = el.querySelector('#ct-name').value.trim();
    const email = el.querySelector('#ct-email').value.trim();
    const msg   = el.querySelector('#ct-msg').value.trim();
    const alertEl = el.querySelector('#contact-alert');

    if(!name||!email){alertEl.innerHTML=`<div class="alert alert-error">Please enter your name and email.</div>`;return;}
    if(!selectedCat){alertEl.innerHTML=`<div class="alert alert-error">Please select an inquiry category.</div>`;return;}

    const cat     = CATEGORIES.find(c=>c.id===selectedCat);
    const doctor  = el.querySelector('#ct-doctor')?.value || '';
    const booking = el.querySelector('#ct-booking')?.value || '';
    const pid     = el.querySelector('#ct-pid').value.trim();
    const phone   = el.querySelector('#ct-phone').value.trim();
    const docName = doctor ? (DB.doctors.find(d=>d.id===doctor)?.name||doctor) : '';
    const bkInfo  = booking ? DB.bookings.find(b=>b.id===booking) : null;

    const inquiry = {
      id: 'INQ-'+Date.now(),
      submittedAt: new Date().toLocaleString('en-EG'),
      category: cat.label,
      categoryId: cat.id,
      categoryIcon: cat.icon,
      prompt: selectedPrompt || '—',
      name, email, pid, phone,
      doctor: docName,
      booking: bkInfo ? `${bkInfo.id} — ${bkInfo.tests.join(', ')} on ${bkInfo.date}` : '',
      message: msg,
      status: 'New',
    };

    // Save to DB
    if(!DB.inquiries) DB.inquiries = [];
    DB.inquiries.push(inquiry);

    alertEl.innerHTML=`<div class="alert alert-success" style="border-left:4px solid #38a169">
      <div><strong>✅ Inquiry submitted successfully!</strong><br>
      <span style="font-size:.85rem">Reference: <strong>${inquiry.id}</strong> · Category: ${cat.icon} ${cat.label}<br>
      We'll respond to <strong>${email}</strong> within 1 business day.</span></div>
    </div>`;

    // Reset form
    el.querySelector('#ct-msg').value='';
    selectedCat=null; selectedPrompt=null;
    CATEGORIES.forEach(c=>{const b=el.querySelector('#catbtn-'+c.id);if(b){b.style.borderColor='var(--border)';b.style.background='white';}});
    el.querySelector('#prompt-section').style.display='none';
    setTimeout(()=>alertEl.innerHTML='',7000);
  };

  return el;
});

registerPage('register', () => {
  const el = document.createElement('div');
  el.innerHTML = `
  <div class="page-header"><div class="container">
    <div class="breadcrumb"><a href="#" onclick="showPage('home')">Home</a> / Register</div>
    <h1>Create a Patient Account</h1><p>Join WIA’AM LABS — your health portal awaits.</p>
  </div></div>
  <section class="section"><div class="container" style="max-width:580px">
    <div class="card"><div class="card-body">
      <div id="reg-alert"></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">First Name</label><input class="form-control" id="reg-fn" placeholder="First name"></div>
        <div class="form-group"><label class="form-label">Last Name</label><input class="form-control" id="reg-ln" placeholder="Last name"></div>
      </div>
      <div class="form-group"><label class="form-label">Email</label><input class="form-control" id="reg-email" type="email" placeholder="your@email.com"></div>
      <div class="form-group"><label class="form-label">Password</label><input class="form-control" id="reg-pass" type="password" placeholder="Min. 6 characters"></div>
      <div class="form-group"><label class="form-label">Phone</label><input class="form-control" id="reg-phone" placeholder="010-XXXX-XXXX"></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Date of Birth</label><input class="form-control" id="reg-dob" type="date"></div>
        <div class="form-group"><label class="form-label">Blood Type</label><select class="form-control" id="reg-blood">${['','A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b=>`<option>${b}</option>`).join('')}</select></div>
      </div>
      <button class="btn btn-primary" style="width:100%;margin-top:8px" onclick="doRegister()">Create Account</button>
      <div class="divider"></div>
      <p style="text-align:center;font-size:.87rem">Already have an account? <a href="#" onclick="showModal('login-modal')" style="color:var(--teal);font-weight:600">Sign In</a></p>
      <p style="text-align:center;font-size:.82rem;color:var(--text-muted);margin-top:8px">Are you a doctor or staff member? Your account is created by the administration. Please contact the registry.</p>
    </div></div>
  </div></section>`;
  window.doRegister = () => {
    const fn=el.querySelector('#reg-fn').value.trim(), ln=el.querySelector('#reg-ln').value.trim();
    const email=el.querySelector('#reg-email').value.trim(), pass=el.querySelector('#reg-pass').value;
    const phone=el.querySelector('#reg-phone').value.trim();
    const alertEl=el.querySelector('#reg-alert');
    if(!fn||!ln||!email||!pass){alertEl.innerHTML=`<div class="alert alert-error">Please fill in all required fields.</div>`;return;}
    if(pass.length<6){alertEl.innerHTML=`<div class="alert alert-error">Password must be at least 6 characters.</div>`;return;}
    const newP={id:'P'+Date.now(),name:`${fn} ${ln}`,email,password:pass,phone,dob:el.querySelector('#reg-dob').value,bloodType:el.querySelector('#reg-blood').value};
    DB.patients.push(newP); currentUser=newP; currentRole='patient';
    saveSession(); updateNavAuth();
    alertEl.innerHTML=`<div class="alert alert-success">Account created! Welcome, ${fn}! Redirecting...</div>`;
    setTimeout(()=>showPage('portal'),1800);
  };
  return el;
});

/* ── PATIENT PORTAL ─────────────────────────────── */
registerPage('portal', () => {
  const el = document.createElement('div');
  if (!currentUser || currentRole !== 'patient') {
    el.innerHTML = `<div class="page-header"><div class="container"><h1>Patient Portal</h1></div></div>
    <section class="section"><div class="container" style="max-width:480px">
      <div class="alert alert-info">Please sign in as a patient to access your portal.</div>
      <button class="btn btn-primary" onclick="showModal('login-modal')">Sign In</button>
    </div></section>`;
    return el;
  }
  const myResults = DB.results.filter(r=>r.patientId===currentUser.id);
  const myBookings = DB.bookings.filter(b=>b.patientId===currentUser.id);
  el.innerHTML = `
  <div class="page-header"><div class="container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
    <div><div class="breadcrumb" style="justify-content:flex-start"><a href="#" onclick="showPage('home')">Home</a> / My Portal</div>
    <h1>My Health Portal</h1><p style="color:rgba(255,255,255,.8)">Patient ID: <strong>${currentUser.id}</strong></p></div>
    <div style="display:flex;align-items:center;gap:12px">
      <div class="avatar" style="width:52px;height:52px;font-size:1.1rem">${currentUser.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
      <div style="color:white"><div style="font-weight:600">${currentUser.name}</div><div style="font-size:.82rem;opacity:.8">${currentUser.email}</div></div>
    </div>
  </div></div>
  <section class="section"><div class="container">
    <div class="grid-4" style="margin-bottom:36px">
      ${[['📋',myResults.length,'Lab Reports'],['📅',myBookings.filter(b=>b.status==='Confirmed').length,'Upcoming'],['🩸',currentUser.bloodType||'N/A','Blood Type'],['📆',myBookings.length,'Total Bookings']].map(([i,v,l])=>`<div class="card"><div class="card-body text-center"><div style="font-size:1.8rem;margin-bottom:8px">${i}</div><div style="font-size:2rem;font-weight:700;color:var(--teal)">${v}</div><div style="font-size:.82rem;color:var(--text-muted)">${l}</div></div></div>`).join('')}
    </div>
    ${(()=>{
      const upcoming = myBookings.filter(b=>b.status==='Confirmed');
      const alerts = [];
      upcoming.forEach(b=>{
        b.tests.forEach(testName=>{
          const testData = TESTS.find(t=>t.name===testName);
          if(testData && testData.precautions){
            alerts.push({ booking:b, test:testData });
          }
        });
      });
      if(alerts.length===0) return '';
      return `<div style="margin-bottom:28px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
          <div style="background:#fffbeb;border:2px solid #f6ad55;border-radius:8px;padding:4px 10px;font-size:.78rem;font-weight:700;color:#c05621;letter-spacing:.05em">⚠ PRE-TEST REMINDERS</div>
          <div style="font-size:.82rem;color:var(--text-muted)">Based on your upcoming appointments</div>
        </div>
        <div style="display:grid;gap:14px">
          ${alerts.map(({booking:b, test:t})=>`
            <div style="border:2px solid #f6ad55;border-radius:12px;background:#fffdf5;overflow:hidden">
              <div style="background:#fef3c7;padding:12px 18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                <div style="display:flex;align-items:center;gap:10px">
                  <span style="font-size:1.4rem">${t.icon}</span>
                  <div>
                    <div style="font-weight:700;font-size:.95rem;color:#92400e">${t.name}</div>
                    <div style="font-size:.78rem;color:#b45309">📅 ${b.date} at ${b.time} · ${b.location}</div>
                  </div>
                </div>
                <span style="background:#f6ad55;color:#7c2d12;font-size:.72rem;font-weight:700;padding:3px 10px;border-radius:4px;letter-spacing:.04em">APPOINTMENT ${b.id}</span>
              </div>
              <div style="padding:14px 18px;display:grid;gap:8px">
                ${t.precautions.map(p=>`
                  <div style="display:flex;gap:10px;align-items:flex-start">
                    <span style="font-size:1rem;flex-shrink:0;margin-top:1px">${p.icon}</span>
                    <div><span style="font-weight:700;font-size:.8rem;color:#92400e">${p.label}: </span><span style="font-size:.8rem;color:#78350f;line-height:1.5">${p.detail}</span></div>
                  </div>`).join('')}
              </div>
            </div>`).join('')}
        </div>
      </div>`;
    })()}
    <div class="portal-tabs">
      <button class="portal-tab active" onclick="switchTab(this,'tab-results')">My Results</button>
      <button class="portal-tab" onclick="switchTab(this,'tab-bookings')">My Bookings</button>
      <button class="portal-tab" onclick="switchTab(this,'tab-profile')">My Profile</button>
    </div>
    <div id="tab-results" class="portal-panel active">
      ${myResults.length===0?`<div class="alert alert-info">No results yet. <button class="btn btn-sm btn-primary" onclick="showPage('booking')" style="margin-left:8px">Book a Test</button></div>`:''}
      ${myResults.map(r=>`
        <div class="card reveal" style="margin-bottom:20px">
          <div style="padding:18px 24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;border-bottom:1px solid var(--border)">
            <div><div style="font-weight:700">${r.tests.map(t=>t.name).join(', ')}</div><div style="font-size:.82rem;color:var(--text-muted)">Report: ${r.reportNo} · ${r.orderedBy}</div></div>
            <div style="display:flex;align-items:center;gap:12px">
              <span class="badge badge-green">${r.status}</span>
              <span style="font-size:.85rem;color:var(--text-muted)">${r.date}</span>
              <button class="btn btn-sm btn-outline" onclick="toggleResult('res-${r.id}')">View</button>
            </div>
          </div>
          <div id="res-${r.id}" style="display:none">
            <div style="overflow-x:auto">
              <table class="results-table">
                <thead><tr><th>Test</th><th>LOINC</th><th>Value</th><th>Unit</th><th>Ref. Range</th><th>Status</th></tr></thead>
                <tbody>${r.tests.map(t=>`<tr><td><strong>${t.name}</strong></td><td style="font-family:monospace;font-size:.82rem;color:var(--text-muted)">${t.loinc}</td><td class="${t.flag==='H'?'flag-high':t.flag==='L'?'flag-low':'flag-norm'}">${t.value}</td><td>${t.unit}</td><td style="font-size:.85rem;color:var(--text-muted)">${t.refRange}</td><td><span class="badge ${t.flag==='N'?'badge-green':t.flag==='H'?'badge-red':'badge-orange'}">${t.flag==='N'?'Normal':t.flag==='H'?'High':'Low'}</span></td></tr>`).join('')}</tbody>
              </table>
            </div>
          </div>
        </div>`).join('')}
    </div>
    <div id="tab-bookings" class="portal-panel">
      <div style="display:flex;justify-content:flex-end;margin-bottom:16px">
        <button class="btn btn-primary btn-sm" onclick="showPage('booking')">+ New Booking</button>
      </div>
      ${myBookings.length===0?`<div class="alert alert-info">No bookings yet.</div>`:''}
      <div class="card" style="${myBookings.length===0?'display:none':''}">
        <div style="overflow-x:auto">
          <table class="results-table">
            <thead><tr><th>ID</th><th>Date</th><th>Time</th><th>Tests</th><th>Branch</th><th>Status</th></tr></thead>
            <tbody>${myBookings.map(b=>`<tr><td class="fw-600">${b.id}</td><td>${b.date}</td><td>${b.time}</td><td style="font-size:.83rem">${b.tests.join(', ')}</td><td style="font-size:.83rem">${b.location}</td><td><span class="badge ${b.status==='Confirmed'?'badge-teal':b.status==='Completed'?'badge-green':'badge-orange'}">${b.status}</span></td></tr>`).join('')}</tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="tab-profile" class="portal-panel">
      <div class="card"><div class="card-body">
        <div id="profile-alert"></div>
        <div style="display:flex;align-items:center;gap:20px;margin-bottom:28px;padding-bottom:24px;border-bottom:1px solid var(--border)">
          <div class="avatar" style="width:72px;height:72px;font-size:1.5rem">${currentUser.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
          <div><h3 style="margin-bottom:4px">${currentUser.name}</h3><p>Patient ID: <strong>${currentUser.id}</strong></p></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Full Name</label><input class="form-control" id="pf-name" value="${currentUser.name}"></div>
          <div class="form-group"><label class="form-label">Phone</label><input class="form-control" id="pf-phone" value="${currentUser.phone||''}"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Date of Birth</label><input class="form-control" type="date" id="pf-dob" value="${currentUser.dob||''}"></div>
          <div class="form-group"><label class="form-label">Blood Type</label><select class="form-control" id="pf-blood">${['','A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b=>`<option ${currentUser.bloodType===b?'selected':''}>${b}</option>`).join('')}</select></div>
        </div>
        <div class="form-group"><label class="form-label">Email</label><input class="form-control" value="${currentUser.email}" disabled style="background:var(--off-white)"></div>
        <button class="btn btn-primary" onclick="saveProfile()">Save Changes</button>
      </div></div>
    </div>
  </div></section>`;
  window.switchTab=(btn,panelId)=>{el.querySelectorAll('.portal-tab').forEach(b=>b.classList.remove('active'));el.querySelectorAll('.portal-panel').forEach(p=>p.classList.remove('active'));btn.classList.add('active');el.querySelector('#'+panelId)?.classList.add('active');};
  window.toggleResult=id=>{const d=document.getElementById(id);d.style.display=d.style.display==='none'?'block':'none';};
  window.saveProfile=()=>{currentUser.name=el.querySelector('#pf-name').value;currentUser.phone=el.querySelector('#pf-phone').value;currentUser.dob=el.querySelector('#pf-dob').value;currentUser.bloodType=el.querySelector('#pf-blood').value;saveSession();const a=el.querySelector('#profile-alert');a.innerHTML=`<div class="alert alert-success">Profile updated.</div>`;setTimeout(()=>a.innerHTML='',3000);};
  return el;
});

/* ── BOOKING PAGE with Calendar ─────────────────── */
registerPage('booking', () => {
  if (!currentUser || currentRole !== 'patient') {
    const el = document.createElement('div');
    el.innerHTML = `<div class="page-header"><div class="container"><h1>Book a Test</h1></div></div>
    <section class="section"><div class="container" style="max-width:480px">
      <div class="alert alert-info">Please sign in as a patient to book a test.</div>
      <div style="display:flex;gap:12px"><button class="btn btn-primary" onclick="showModal('login-modal')">Sign In</button><button class="btn btn-outline" onclick="showPage('register')">Register</button></div>
    </div></section>`;
    return el;
  }
  let step=1, selectedTests=[], selectedDate='', selectedTime='', selectedBranch='';
  const el = document.createElement('div');
  el.innerHTML = `
  <div class="page-header"><div class="container">
    <div class="breadcrumb"><a href="#" onclick="showPage('home')">Home</a> / Book a Test</div>
    <h1>Book a Test</h1><p>Welcome, ${currentUser.name.split(' ')[0]}! Schedule your appointment in 3 easy steps.</p>
  </div></div>
  <section class="section"><div class="container" style="max-width:800px">
    <div class="steps" id="booking-steps">
      <div class="step active" id="s1"><div class="step-num">1</div><div class="step-lbl">Select Tests</div></div>
      <div class="step" id="s2"><div class="step-num">2</div><div class="step-lbl">Date & Time</div></div>
      <div class="step" id="s3"><div class="step-num">3</div><div class="step-lbl">Confirm</div></div>
    </div>
    <div id="booking-content"></div>
  </div></section>`;

  // count bookings per date
  function getBookingCounts() {
    const counts = {};
    DB.bookings.forEach(b=>{
      if(b.status==='Confirmed'||b.status==='Completed') {
        counts[b.date] = (counts[b.date]||0)+1;
      }
    });
    return counts;
  }

  function buildCalendar(year, month, calContainer) {
    const today = new Date(); today.setHours(0,0,0,0);
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month+1, 0);
    const startDow = firstDay.getDay();
    const mNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const dNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const counts = getBookingCounts();

    let html = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <button class="btn btn-sm btn-outline" id="cal-prev" style="padding:6px 14px">&#8249; Prev</button>
        <strong style="font-size:1.05rem;color:var(--teal-dark)">${mNames[month]} ${year}</strong>
        <button class="btn btn-sm btn-outline" id="cal-next" style="padding:6px 14px">Next &#8250;</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:6px">
        ${dNames.map(d=>`<div style="text-align:center;font-size:.72rem;font-weight:700;color:var(--text-muted);padding:4px 0">${d}</div>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">`;

    for(let i=0;i<startDow;i++) html+=`<div></div>`;

    for(let d=1;d<=lastDay.getDate();d++){
      const ds=`${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const cellDate=new Date(year,month,d);
      const isPast=cellDate<today;
      const isSun=cellDate.getDay()===0;
      const cnt=counts[ds]||0;
      const isHeavy=cnt>=4;
      const isSel=ds===selectedDate;

      let bg='', color='var(--text-dark)', cursor='pointer', opacity='1', border='2px solid transparent', extra='';

      if(isPast||isSun){ bg='#f5f5f5'; color='#bbb'; cursor='not-allowed'; opacity='.45'; }
      else if(isHeavy){ bg='#ffe4e4'; color='#c00'; cursor='not-allowed'; opacity='.5'; }
      else if(isSel){ bg='var(--teal)'; color='white'; border='2px solid var(--teal-dark)'; }
      else if(cnt===1){ bg='rgba(0,109,119,.08)'; }
      else if(cnt===2){ bg='rgba(0,109,119,.16)'; }
      else if(cnt===3){ bg='rgba(0,109,119,.26)'; }

      const clickable=!isPast&&!isSun&&!isHeavy;
      const sub = cnt>0&&!isPast&&!isSun?`<div style="font-size:.55rem;margin-top:1px;opacity:.75">${cnt}×</div>`:'';
      html+=`<div class="cal-day" data-date="${ds}" data-click="${clickable}" style="text-align:center;padding:7px 2px;border-radius:8px;font-size:.88rem;font-weight:500;cursor:${cursor};opacity:${opacity};background:${bg};color:${color};border:${border};transition:all .15s">${d}${sub}</div>`;
    }
    html+=`</div>
    <div style="display:flex;flex-wrap:wrap;gap:14px;margin-top:14px;font-size:.75rem;color:var(--text-muted)">
      <span><span style="display:inline-block;width:11px;height:11px;background:var(--teal);border-radius:2px;margin-right:4px;vertical-align:middle"></span>Selected</span>
      <span><span style="display:inline-block;width:11px;height:11px;background:rgba(0,109,119,.25);border-radius:2px;margin-right:4px;vertical-align:middle"></span>Partially booked</span>
      <span><span style="display:inline-block;width:11px;height:11px;background:#ffe4e4;border-radius:2px;opacity:.7;margin-right:4px;vertical-align:middle"></span>Fully booked</span>
      <span><span style="display:inline-block;width:11px;height:11px;background:#f5f5f5;border-radius:2px;margin-right:4px;vertical-align:middle"></span>Unavailable</span>
    </div>`;

    calContainer.innerHTML = html;

    calContainer.querySelectorAll('.cal-day[data-click="true"]').forEach(cell=>{
      cell.addEventListener('mouseenter', function(){
        if(this.dataset.date!==selectedDate) this.style.background='var(--teal-pale)';
      });
      cell.addEventListener('mouseleave', function(){
        if(this.dataset.date!==selectedDate){
          const c=getBookingCounts()[this.dataset.date]||0;
          this.style.background=c===0?'':c===1?'rgba(0,109,119,.08)':c===2?'rgba(0,109,119,.16)':'rgba(0,109,119,.26)';
        }
      });
      cell.addEventListener('click', function(){
        selectedDate=this.dataset.date;
        buildCalendar(year,month,calContainer);
        const disp=el.querySelector('#sel-date-label');
        if(disp) disp.textContent=new Date(selectedDate+'T00:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
      });
    });

    calContainer.querySelector('#cal-prev').addEventListener('click',()=>{
      let nm=month-1,ny=year; if(nm<0){nm=11;ny--;}
      const lastOfPrev=new Date(ny,nm+1,0); if(lastOfPrev>=today) buildCalendar(ny,nm,calContainer);
    });
    calContainer.querySelector('#cal-next').addEventListener('click',()=>{
      let nm=month+1,ny=year; if(nm>11){nm=0;ny++;} buildCalendar(ny,nm,calContainer);
    });
  }

  function renderStep(){
    const bc=el.querySelector('#booking-content');
    if(step===1){
      bc.innerHTML=`<div class="card"><div class="card-body">
        <h3 style="margin-bottom:20px">Select Tests</h3>
        <div style="display:grid;gap:10px">
          ${TESTS.map(t=>`<label style="display:flex;align-items:center;gap:14px;padding:14px;border:1.5px solid var(--border);border-radius:12px;cursor:pointer;transition:all .2s" class="tsr" data-tid="${t.id}">
            <input type="checkbox" value="${t.id}" style="width:18px;height:18px;accent-color:var(--teal)">
            <span style="font-size:1.2rem">${t.icon}</span>
            <div style="flex:1"><div style="font-weight:600;font-size:.92rem">${t.name}</div><div style="font-size:.8rem;color:var(--text-muted)">${t.turnaround}</div></div>
            <span style="font-weight:700;color:var(--teal)">${t.price} EGP</span>
          </label>`).join('')}
        </div>
        <div style="margin-top:20px;padding:16px;background:var(--teal-pale);border-radius:12px;display:flex;justify-content:space-between;align-items:center">
          <span style="font-weight:600">Selected: <span id="sel-count">0</span> test(s)</span>
          <span style="font-size:1.1rem;font-weight:700;color:var(--teal)">Total: <span id="sel-total">0</span> EGP</span>
        </div>
        <button class="btn btn-primary" style="width:100%;margin-top:16px" onclick="bkStep2()">Next: Choose Date & Time</button>
      </div></div>`;
      bc.querySelectorAll('.tsr').forEach(row=>{
        row.addEventListener('click',()=>{
          const cb=row.querySelector('input'); cb.checked=!cb.checked;
          row.style.borderColor=cb.checked?'var(--teal)':'var(--border)';
          row.style.background=cb.checked?'var(--teal-pale)':'';
          const sel=[...bc.querySelectorAll('input:checked')].map(i=>i.value);
          selectedTests=sel;
          bc.querySelector('#sel-count').textContent=sel.length;
          bc.querySelector('#sel-total').textContent=TESTS.filter(t=>sel.includes(t.id)).reduce((a,t)=>a+t.price,0);
        });
      });
    }
    if(step===2){
      const now=new Date();
      bc.innerHTML=`<div class="card"><div class="card-body">
        <h3 style="margin-bottom:20px">Choose Date, Branch & Time</h3>
        <div class="form-group">
          <label class="form-label">Select Branch</label>
          <select class="form-control" id="branch-sel">
            <option value="">-- Select a branch --</option>
            ${['Branch A - Nasr City','Branch B - Heliopolis','Branch C - Maadi','Branch D - Dokki','Branch E - October City','Branch F - New Cairo'].map(b=>`<option>${b}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" style="margin-bottom:10px">Select Date <small style="color:var(--text-muted);font-weight:400">— dulled/red dates are unavailable or heavily booked</small></label>
          <div id="calendar-box" style="background:var(--off-white);border:1.5px solid var(--border);border-radius:14px;padding:18px"></div>
          <div id="sel-date-label" style="margin-top:10px;font-weight:600;color:var(--teal);min-height:22px;font-size:.95rem"></div>
        </div>
        <div class="form-group">
          <label class="form-label">Select Time</label>
          <div class="time-slots">
            ${['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30'].map((t,i)=>`<div class="${i===3||i===7?'time-slot booked':'time-slot available'}" onclick="bkSelTime(this,'${t}')">${t}</div>`).join('')}
          </div>
        </div>
        <div style="display:flex;gap:12px;margin-top:20px">
          <button class="btn btn-outline" onclick="bkBack()">Back</button>
          <button class="btn btn-primary" style="flex:1" onclick="bkStep3()">Next: Confirm</button>
        </div>
      </div></div>`;
      buildCalendar(now.getFullYear(),now.getMonth(),bc.querySelector('#calendar-box'));
    }
    if(step===3){
      const tns=TESTS.filter(t=>selectedTests.includes(t.id));
      const tot=tns.reduce((a,t)=>a+t.price,0);
      const dateLabel=selectedDate?new Date(selectedDate+'T00:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'}):'—';
      bc.innerHTML=`<div class="card"><div class="card-body">
        <h3 style="margin-bottom:20px">Confirm Booking</h3>
        <div class="alert alert-info">Please review your booking details before confirming.</div>
        <div style="display:grid;gap:14px">
          ${[['Patient',currentUser.name],['Branch',selectedBranch||'—'],['Date',dateLabel],['Time',selectedTime||'—']].map(([k,v])=>`<div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border)"><span class="text-muted">${k}</span><strong>${v}</strong></div>`).join('')}
          <div style="padding:12px 0">
            <span class="text-muted">Tests Selected:</span>
            <div style="margin-top:8px;display:grid;gap:6px">${tns.map(t=>`<div style="display:flex;justify-content:space-between;font-size:.88rem"><span>${t.icon} ${t.name}</span><span style="color:var(--teal);font-weight:600">${t.price} EGP</span></div>`).join('')}</div>
          </div>
          <div style="display:flex;justify-content:space-between;padding:14px;background:var(--teal-pale);border-radius:10px"><strong>Total Amount</strong><strong style="color:var(--teal);font-size:1.1rem">${tot} EGP</strong></div>
        </div>
        <div style="display:flex;gap:12px;margin-top:24px">
          <button class="btn btn-outline" onclick="bkBack()">Back</button>
          <button class="btn btn-primary" style="flex:1" onclick="bkConfirm()">Confirm Booking</button>
        </div>
      </div></div>`;
    }
    updateStepUI();
  }

  window.bkStep2=()=>{if(selectedTests.length===0){alert('Please select at least one test.');return;}step=2;renderStep();};
  window.bkStep3=()=>{
    const b=el.querySelector('#branch-sel')?.value;
    if(!b){alert('Please select a branch.');return;}
    if(!selectedDate){alert('Please select a date on the calendar.');return;}
    if(!selectedTime){alert('Please select a time slot.');return;}
    selectedBranch=b;step=3;renderStep();
  };
  window.bkBack=()=>{step--;renderStep();};
  window.bkSelTime=(elb,t)=>{
    if(elb.classList.contains('booked'))return;
    document.querySelectorAll('.time-slot.available').forEach(b=>b.classList.remove('selected'));
    elb.classList.add('selected');selectedTime=t;
  };
  window.bkConfirm=()=>{
    const nb={id:'B'+Date.now(),patientId:currentUser.id,date:selectedDate,time:selectedTime,
      tests:TESTS.filter(t=>selectedTests.includes(t.id)).map(t=>t.name),
      status:'Confirmed',location:selectedBranch,doctorId:'D001',machineId:'M001'};
    DB.bookings.push(nb);
    el.querySelector('#booking-content').innerHTML=`
      <div class="alert alert-success" style="font-size:1rem">Booking confirmed! Reference: <strong>${nb.id}</strong></div>
      <div class="card"><div class="card-body">
        <p>Your appointment: <strong>${new Date(selectedDate+'T00:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</strong> at <strong>${selectedTime}</strong> · ${selectedBranch}.</p>
        <p style="margin-top:12px">Confirmation will be sent to your email.</p>
        <div style="display:flex;gap:12px;margin-top:24px">
          <button class="btn btn-primary" onclick="showPage('portal')">View My Portal</button>
          <button class="btn btn-outline" onclick="showPage('home')">Return Home</button>
        </div>
      </div></div>`;
  };
  function updateStepUI(){for(let i=1;i<=3;i++){const s=el.querySelector('#s'+i);if(s)s.className='step'+(i<step?' done':i===step?' active':'');}}
  setTimeout(renderStep,0);
  return el;
});

/* ══════════════════════════════════════════════════
   SPECIALIST PORTAL
══════════════════════════════════════════════════ */
registerPage('specialist-portal', () => {
  const el = document.createElement('div');
  if (!currentUser || currentRole !== 'specialist') {
    el.innerHTML = `<div class="page-header"><div class="container"><h1>Specialist Portal</h1></div></div>
    <section class="section"><div class="container" style="max-width:480px">
      <div class="alert alert-info">Please sign in as a specialist to access this portal.</div>
      <button class="btn btn-primary" onclick="showModal('login-modal')">Sign In</button>
    </div></section>`;
    return el;
  }

  const myAppts = DB.bookings.filter(b=>b.doctorId===currentUser.id);
  const upcoming = myAppts.filter(b=>b.status==='Confirmed').sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time));
  const completed = myAppts.filter(b=>b.status==='Completed');

  // Group by date
  const byDate = {};
  upcoming.forEach(b=>{ if(!byDate[b.date])byDate[b.date]=[]; byDate[b.date].push(b); });
  const sortedDates = Object.keys(byDate).sort();
  const myDaySet = new Set(upcoming.map(b=>b.date));

  function buildMiniCal(year, month, calEl) {
    const today=new Date(); today.setHours(0,0,0,0);
    const firstDay=new Date(year,month,1), lastDay=new Date(year,month+1,0);
    const mNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const dNames=['S','M','T','W','T','F','S'];
    let html=`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <button class="btn btn-sm btn-outline" id="mc-prev" style="padding:3px 10px">&#8249;</button>
      <strong style="font-size:.88rem;color:var(--teal-dark)">${mNames[month]} ${year}</strong>
      <button class="btn btn-sm btn-outline" id="mc-next" style="padding:3px 10px">&#8250;</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;margin-bottom:4px">${dNames.map(d=>`<div style="text-align:center;font-size:.65rem;font-weight:700;color:var(--text-muted);padding:2px">${d}</div>`).join('')}</div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">`;
    const startDow=firstDay.getDay();
    for(let i=0;i<startDow;i++) html+=`<div></div>`;
    for(let d=1;d<=lastDay.getDate();d++){
      const ds=`${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const cellDate=new Date(year,month,d); const isPast=cellDate<today;
      const hasAppt=myDaySet.has(ds); const cnt=byDate[ds]?.length||0;
      let style=`text-align:center;padding:5px 1px;border-radius:5px;font-size:.78rem;`;
      if(hasAppt) style+=`background:var(--teal);color:white;font-weight:700;cursor:pointer;`;
      else if(isPast) style+=`opacity:.25;color:#999;`;
      else style+=`color:var(--text-muted);`;
      html+=`<div style="${style}" ${hasAppt?`onclick="spScrollDate('${ds}')"`:''}>${d}${hasAppt?`<div style="font-size:.5rem">${cnt}×</div>`:''}</div>`;
    }
    html+=`</div>`;
    calEl.innerHTML=html;
    calEl.querySelector('#mc-prev')?.addEventListener('click',()=>{let nm=month-1,ny=year;if(nm<0){nm=11;ny--;}buildMiniCal(ny,nm,calEl);});
    calEl.querySelector('#mc-next')?.addEventListener('click',()=>{let nm=month+1,ny=year;if(nm>11){nm=0;ny++;}buildMiniCal(ny,nm,calEl);});
  }

  window.spScrollDate=(ds)=>{
    const t=el.querySelector(`[data-sdate="${ds}"]`);
    if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
  };

  el.innerHTML = `
  <div class="page-header"><div class="container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
    <div>
      <div class="breadcrumb" style="justify-content:flex-start"><a href="#" onclick="showPage('home')">Home</a> / Specialist Portal</div>
      <h1>Specialist Portal</h1>
      <p style="color:rgba(255,255,255,.8)">${currentUser.specialty} · ${currentUser.license}</p>
    </div>
    <div style="display:flex;align-items:center;gap:12px">
      <div class="avatar" style="width:52px;height:52px;font-size:1.1rem">${currentUser.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
      <div style="color:white"><div style="font-weight:600">${currentUser.name}</div><div style="font-size:.82rem;opacity:.8">${currentUser.email}</div></div>
    </div>
  </div></div>
  <section class="section"><div class="container">
    <div class="grid-4" style="margin-bottom:32px">
      ${[['📅',upcoming.length,'Upcoming Appointments'],['✅',completed.length,'Completed'],['🔬',[...new Set(upcoming.map(b=>b.machineId))].length,'Machines Assigned'],['👥',[...new Set(upcoming.map(b=>b.patientId))].length,'Patients']].map(([i,v,l])=>`<div class="card"><div class="card-body text-center"><div style="font-size:1.8rem;margin-bottom:8px">${i}</div><div style="font-size:2rem;font-weight:700;color:var(--teal)">${v}</div><div style="font-size:.82rem;color:var(--text-muted)">${l}</div></div></div>`).join('')}
    </div>

    <div style="display:grid;grid-template-columns:240px 1fr;gap:24px;align-items:start">

      <!-- Mini Calendar -->
      <div class="card" style="position:sticky;top:90px">
        <div class="card-body">
          <h4 style="margin-bottom:12px;font-size:.92rem;color:var(--teal-dark)">My Schedule Calendar</h4>
          <div id="spec-mini-cal"></div>
          <div style="margin-top:12px;font-size:.72rem;color:var(--text-muted)">
            <span style="display:inline-block;width:10px;height:10px;background:var(--teal);border-radius:2px;margin-right:4px;vertical-align:middle"></span>Days with appointments — click to jump
          </div>
        </div>
      </div>

      <!-- Schedule -->
      <div>
        <h3 style="margin-bottom:20px">My Appointment Schedule</h3>
        ${upcoming.length===0?`<div class="alert alert-info">No upcoming appointments scheduled.</div>`:''}
        ${sortedDates.map(date=>{
          const appts=byDate[date];
          const dl=new Date(date+'T00:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
          return `<div data-sdate="${date}" style="margin-bottom:28px">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
              <div style="background:var(--teal);color:white;padding:5px 14px;border-radius:20px;font-size:.83rem;font-weight:700">${dl}</div>
              <div style="height:1px;flex:1;background:var(--border)"></div>
              <span style="font-size:.78rem;color:var(--text-muted)">${appts.length} appt${appts.length>1?'s':''}</span>
            </div>
            <div style="display:grid;gap:12px">
              ${appts.map(b=>{
                const pat=DB.patients.find(p=>p.id===b.patientId)||{name:'Unknown Patient',id:'?'};
                const mach=DB.machines.find(m=>m.id===b.machineId)||{name:'Unknown',type:'',status:'operational'};
                const mc=mach.status==='operational'?'#38a169':mach.status==='maintenance'?'#d69e2e':'#e53e3e';
                return `<div class="card" style="border-left:4px solid var(--teal)">
                  <div class="card-body" style="padding:16px 20px">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
                      <div>
                        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
                          <div style="background:var(--teal);color:white;padding:4px 12px;border-radius:20px;font-size:.88rem;font-weight:700">${b.time}</div>
                          <span class="badge badge-teal">${b.status}</span>
                        </div>
                        <div style="font-weight:700;font-size:1rem;margin-bottom:4px">Patient: ${pat.name}</div>
                        <div style="font-size:.82rem;color:var(--text-muted);margin-bottom:6px">ID: ${pat.id} · ${b.location}</div>
                        <div style="font-size:.85rem">Tests: ${b.tests.join(', ')}</div>
                      </div>
                      <div style="background:var(--off-white);border:1.5px solid var(--border);border-radius:10px;padding:10px 14px;min-width:170px">
                        <div style="font-size:.72rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:6px">Assigned Machine</div>
                        <div style="font-weight:700;color:var(--teal-dark);font-size:.88rem">${mach.name}</div>
                        <div style="font-size:.76rem;color:var(--text-muted);margin-bottom:8px">${mach.type}</div>
                        <div style="display:flex;align-items:center;gap:6px">
                          <div style="width:8px;height:8px;border-radius:50%;background:${mc}"></div>
                          <span style="font-size:.76rem;font-weight:600;color:${mc};text-transform:capitalize">${mach.status}</span>
                        </div>
                        ${mach.status!=='operational'?`<div style="margin-top:8px;font-size:.7rem;color:#c05621;background:#fffbeb;padding:4px 8px;border-radius:5px">Contact admin if rescheduling needed</div>`:''}
                      </div>
                    </div>
                  </div>
                </div>`;
              }).join('')}
            </div>
          </div>`;
        }).join('')}

        ${completed.length>0?`<div style="margin-top:32px">
          <h4 style="color:var(--text-muted);margin-bottom:14px">Completed Appointments</h4>
          <div class="card"><div style="overflow-x:auto">
            <table class="results-table">
              <thead><tr><th>Date</th><th>Time</th><th>Patient</th><th>Tests</th><th>Branch</th></tr></thead>
              <tbody>${completed.map(b=>{const p=DB.patients.find(pt=>pt.id===b.patientId)||{name:'Unknown'};return`<tr><td>${b.date}</td><td>${b.time}</td><td><strong>${p.name}</strong></td><td style="font-size:.83rem">${b.tests.join(', ')}</td><td style="font-size:.83rem">${b.location}</td></tr>`;}).join('')}</tbody>
            </table>
          </div></div>
        </div>`:``}
      </div>
    </div>
  </div></section>`;

  const now=new Date();
  buildMiniCal(now.getFullYear(),now.getMonth(),el.querySelector('#spec-mini-cal'));
  return el;
});

/* ══════════════════════════════════════════════════
   ADMIN / REGISTER PORTAL
══════════════════════════════════════════════════ */
registerPage('admin-portal', () => {
  const el = document.createElement('div');

  function render() {
    const tab = el.dataset.tab || 'machines';
    const upcomingAll = DB.bookings.filter(b=>b.status==='Confirmed').sort((a,b)=>a.date.localeCompare(b.date)||a.time.localeCompare(b.time));
    const op=DB.machines.filter(m=>m.status==='operational').length;
    const mt=DB.machines.filter(m=>m.status==='maintenance').length;
    const fl=DB.machines.filter(m=>m.status==='fault').length;

    el.innerHTML = `
    <div class="page-header"><div class="container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
      <div>
        <div class="breadcrumb" style="justify-content:flex-start"><a href="#" onclick="showPage('home')">Home</a> / Admin Portal</div>
        <h1>Admin & Registry Portal</h1>
        <p style="color:rgba(255,255,255,.8)">Machine Status · Specialist Schedules · Appointment Management</p>
      </div>
      <div style="color:white;text-align:right"><div style="font-weight:600">Administration</div><div style="font-size:.82rem;opacity:.8">WIA’AM LABS Registry</div></div>
    </div></div>
    <section class="section"><div class="container">

      <div class="grid-4" style="margin-bottom:32px">
        <div class="card"><div class="card-body text-center"><div style="font-size:1.8rem;margin-bottom:8px">✅</div><div style="font-size:2rem;font-weight:700;color:#38a169">${op}</div><div style="font-size:.82rem;color:var(--text-muted)">Operational</div></div></div>
        <div class="card"><div class="card-body text-center"><div style="font-size:1.8rem;margin-bottom:8px">🔧</div><div style="font-size:2rem;font-weight:700;color:#d69e2e">${mt}</div><div style="font-size:.82rem;color:var(--text-muted)">Under Maintenance</div></div></div>
        <div class="card"><div class="card-body text-center"><div style="font-size:1.8rem;margin-bottom:8px">⚠️</div><div style="font-size:2rem;font-weight:700;color:#e53e3e">${fl}</div><div style="font-size:.82rem;color:var(--text-muted)">Faults</div></div></div>
        <div class="card"><div class="card-body text-center"><div style="font-size:1.8rem;margin-bottom:8px">📅</div><div style="font-size:2rem;font-weight:700;color:var(--teal)">${upcomingAll.length}</div><div style="font-size:.82rem;color:var(--text-muted)">Upcoming Appointments</div></div></div>
      </div>

      <div class="portal-tabs">
        <button class="portal-tab ${tab==='machines'?'active':''}" onclick="adTab('machines',this)">Machine Status</button>
        <button class="portal-tab ${tab==='schedules'?'active':''}" onclick="adTab('schedules',this)">Specialist Schedules</button>
        <button class="portal-tab ${tab==='reschedule'?'active':''}" onclick="adTab('reschedule',this)">Reschedule / Manage</button>
        <button class="portal-tab ${tab==='doctors'?'active':''}" onclick="adTab('doctors',this)">👨‍⚕️ Manage Doctors</button>
        <button class="portal-tab ${tab==='inquiries'?'active':''}" onclick="adTab('inquiries',this)">📬 Inquiries <span id="inq-badge" style="background:#e53e3e;color:white;border-radius:4px;font-size:.68rem;padding:1px 6px;margin-left:4px;font-weight:700">${(DB.inquiries||[]).filter(i=>i.status==='New').length||''}</span></button>
      </div>

      <!-- MACHINES TAB -->
      <div id="ad-machines" class="portal-panel ${tab==='machines'?'active':''}">
        <h3 style="margin-bottom:6px">Machine Status Dashboard</h3>
        <p style="color:var(--text-muted);font-size:.88rem;margin-bottom:20px">Live equipment status. Click Contact Technician for faults or maintenance.</p>
        ${fl>0?`<div class="alert" style="background:#fff5f5;border:1.5px solid #fc8181;color:#c53030;margin-bottom:20px"><strong>${fl} machine(s) have faults.</strong> Affected appointments may need rescheduling — check the Reschedule tab.</div>`:''}
        <div style="display:grid;gap:16px">
          ${DB.machines.map(m=>{
            const sc=m.status==='operational'?'#38a169':m.status==='maintenance'?'#d69e2e':'#e53e3e';
            const sb=m.status==='operational'?'#f0fff4':m.status==='maintenance'?'#fffff0':'#fff5f5';
            const si=m.status==='operational'?'✅':m.status==='maintenance'?'🔧':'⚠️';
            const aff=DB.bookings.filter(b=>b.machineId===m.id&&b.status==='Confirmed');
            return `<div class="card" style="border-left:4px solid ${sc}">
              <div class="card-body" style="padding:18px 22px">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px">
                  <div style="flex:1;min-width:200px">
                    <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
                      <span style="font-size:1.2rem">${si}</span>
                      <span style="font-weight:700;font-size:1.05rem">${m.name}</span>
                      <span class="badge" style="background:${sb};color:${sc};border:1px solid ${sc};text-transform:capitalize">${m.status}</span>
                    </div>
                    <div style="font-size:.83rem;color:var(--text-muted);margin-bottom:4px">${m.type} · ${m.branch}</div>
                    <div style="font-size:.83rem;margin-bottom:8px">${m.notes}</div>
                    <div style="display:flex;gap:16px;font-size:.78rem;color:var(--text-muted)">
                      <span>Last: <strong>${m.lastMaintenance}</strong></span>
                      <span>Next: <strong>${m.nextMaintenance}</strong></span>
                    </div>
                    ${aff.length>0&&m.status!=='operational'?`<div style="margin-top:10px;padding:8px 12px;background:#fffbeb;border:1px solid #f6e05e;border-radius:8px;font-size:.78rem;color:#744210">
                      ${aff.length} upcoming appointment(s) on this machine need attention.
                      <button class="btn btn-sm" style="margin-left:8px;padding:2px 10px;font-size:.72rem;background:#d69e2e;color:white;border:none" onclick="adTab('reschedule',el.querySelector('.portal-tab:nth-child(3)'))">Reschedule</button>
                    </div>`:``}
                  </div>
                  <div style="background:var(--off-white);border:1.5px solid var(--border);border-radius:12px;padding:14px 18px;min-width:210px">
                    <div style="font-size:.72rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:8px">Technician Contact</div>
                    <div style="font-weight:600;margin-bottom:4px">${m.technician}</div>
                    <div style="font-size:.85rem;color:var(--teal-dark);font-weight:600">${m.techPhone}</div>
                    <button class="btn btn-sm btn-outline" style="margin-top:10px;width:100%;font-size:.78rem" onclick="alert('Contacting ${m.technician}\\n${m.techPhone}\\n\\nIn a real system this would trigger a call or notification.')">Contact Technician</button>
                  </div>
                </div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <!-- SCHEDULES TAB -->
      <div id="ad-schedules" class="portal-panel ${tab==='schedules'?'active':''}">
        <h3 style="margin-bottom:6px">All Specialist Schedules</h3>
        <p style="color:var(--text-muted);font-size:.88rem;margin-bottom:20px">Appointments grouped by specialist. Highlighted rows indicate overbooking.</p>
        ${DB.doctors.filter(d=>d.role==='specialist').map(doc=>{
          const dAppts=upcomingAll.filter(b=>b.doctorId===doc.id);
          const dayCounts={};
          dAppts.forEach(b=>{dayCounts[b.date]=(dayCounts[b.date]||0)+1;});
          const overloaded=Object.entries(dayCounts).filter(([,c])=>c>=3);
          return `<div class="card" style="margin-bottom:20px">
            <div style="padding:16px 22px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:14px">
              <div class="avatar" style="width:42px;height:42px;font-size:.88rem">${doc.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
              <div><div style="font-weight:700">${doc.name}</div><div style="font-size:.8rem;color:var(--text-muted)">${doc.specialty} · ${doc.phone}</div></div>
              <div style="margin-left:auto;display:flex;gap:8px;align-items:center">
                <span class="badge badge-teal">${dAppts.length} upcoming</span>
                ${overloaded.length>0?`<span class="badge" style="background:#fff5f5;color:#c53030;border:1px solid #fc8181">Overloaded ${overloaded.length} day(s)</span>`:''}
              </div>
            </div>
            ${dAppts.length===0?`<div style="padding:20px 22px;color:var(--text-muted)">No upcoming appointments.</div>`:`
            <div style="overflow-x:auto">
              <table class="results-table">
                <thead><tr><th>Date</th><th>Time</th><th>Patient</th><th>Tests</th><th>Machine</th><th>Branch</th><th>Action</th></tr></thead>
                <tbody>${dAppts.map(b=>{
                  const p=DB.patients.find(pt=>pt.id===b.patientId)||{name:'Unknown',id:'?'};
                  const m=DB.machines.find(mc=>mc.id===b.machineId)||{name:'?',status:'operational'};
                  const mc2=m.status==='operational'?'#38a169':m.status==='maintenance'?'#d69e2e':'#e53e3e';
                  const oc=dayCounts[b.date]||0;
                  return `<tr style="${oc>=3?'background:#fffbeb':''}">
                    <td><strong>${b.date}</strong>${oc>=3?`<div style="font-size:.7rem;color:#c05621">${oc} on this day</div>`:''}</td>
                    <td>${b.time}</td>
                    <td><strong>${p.name}</strong><div style="font-size:.73rem;color:var(--text-muted)">${p.id}</div></td>
                    <td style="font-size:.82rem">${b.tests.join(', ')}</td>
                    <td><span style="font-size:.82rem">${m.name}</span> <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${mc2};margin-left:4px"></span></td>
                    <td style="font-size:.82rem">${b.location}</td>
                    <td><button class="btn btn-sm btn-outline" style="font-size:.73rem;padding:4px 10px" onclick="openRS('${b.id}')">Reschedule</button></td>
                  </tr>`;
                }).join('')}</tbody>
              </table>
            </div>`}
          </div>`;
        }).join('')}
      </div>

      <!-- RESCHEDULE TAB -->
      <div id="ad-reschedule" class="portal-panel ${tab==='reschedule'?'active':''}">
        <h3 style="margin-bottom:6px">Reschedule & Manage Appointments</h3>
        <p style="color:var(--text-muted);font-size:.88rem;margin-bottom:20px">Handle conflicts from machine faults, maintenance, or overbooking.</p>
        <div id="rs-alert"></div>
        <div style="display:grid;gap:14px">
          ${upcomingAll.length===0?`<div class="alert alert-info">No upcoming appointments to manage.</div>`:
          upcomingAll.map(b=>{
            const p=DB.patients.find(pt=>pt.id===b.patientId)||{name:'Unknown'};
            const d=DB.doctors.find(dc=>dc.id===b.doctorId)||{name:'Unassigned'};
            const m=DB.machines.find(mc=>mc.id===b.machineId)||{name:'Unknown',status:'operational'};
            const mc=m.status==='operational'?'#38a169':m.status==='maintenance'?'#d69e2e':'#e53e3e';
            const flag=m.status!=='operational';
            return `<div class="card" style="border-left:4px solid ${flag?'#e53e3e':'var(--border)'}">
              <div class="card-body" style="padding:16px 22px">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                      <strong>${b.id}</strong>
                      <span class="badge badge-teal">${b.status}</span>
                      ${flag?`<span class="badge" style="background:#fff5f5;color:#c53030;border:1px solid #fc8181">Machine Issue</span>`:''}
                    </div>
                    <div style="font-size:.85rem;margin-bottom:2px">Patient: <strong>${p.name}</strong> (${p.id})</div>
                    <div style="font-size:.85rem;margin-bottom:2px">Specialist: ${d.name}</div>
                    <div style="font-size:.85rem;margin-bottom:2px">Date: ${b.date} at ${b.time} · ${b.location}</div>
                    <div style="font-size:.85rem;margin-bottom:6px">Tests: ${b.tests.join(', ')}</div>
                    <div style="font-size:.82rem">Machine: ${m.name} <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${mc};margin-left:4px"></span> <span style="color:${mc};text-transform:capitalize;font-weight:600">${m.status}</span></div>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:8px">
                    <button class="btn btn-primary btn-sm" onclick="openRS('${b.id}')">Reschedule</button>
                    <button class="btn btn-sm btn-outline" style="color:#e53e3e;border-color:#e53e3e" onclick="cancelAppt('${b.id}')">Cancel</button>
                  </div>
                </div>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <!-- MANAGE DOCTORS TAB -->
      <div id="ad-doctors" class="portal-panel ${tab==='doctors'?'active':''}">
        <h3 style="margin-bottom:6px">Doctor & Staff Accounts</h3>
        <p style="color:var(--text-muted);font-size:.88rem;margin-bottom:20px">Create and manage doctor/staff login credentials. Doctors cannot self-register.</p>
        <div id="ad-doc-alert"></div>
        <div class="card" style="margin-bottom:28px">
          <div class="card-body">
            <h4 style="margin-bottom:16px">➕ Assign New Doctor Account</h4>
            <div class="form-row">
              <div class="form-group"><label class="form-label">First Name</label><input class="form-control" id="nd-fn" placeholder="First name"></div>
              <div class="form-group"><label class="form-label">Last Name</label><input class="form-control" id="nd-ln" placeholder="Last name"></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label class="form-label">Email (Username)</label><input class="form-control" id="nd-email" type="email" placeholder="doctor@novalab.com"></div>
              <div class="form-group"><label class="form-label">Assigned Password</label><input class="form-control" id="nd-pass" type="text" placeholder="Min. 6 characters"></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label class="form-label">Specialty</label><input class="form-control" id="nd-spec" placeholder="e.g. Hematology"></div>
              <div class="form-group"><label class="form-label">Medical License No.</label><input class="form-control" id="nd-lic" placeholder="EG-MED-XXXXX"></div>
            </div>
            <div class="form-group"><label class="form-label">Phone</label><input class="form-control" id="nd-phone" placeholder="010-XXXX-XXXX"></div>
            <button class="btn btn-primary" style="margin-top:8px" onclick="createDoctorAccount()">Create Account & Assign Credentials</button>
          </div>
        </div>
        <h4 style="margin-bottom:14px">Current Specialist Accounts</h4>
        <div style="display:grid;gap:14px">
          ${DB.doctors.filter(d=>d.role==='specialist').map(doc=>`
            <div class="card" style="border-left:4px solid var(--teal)">
              <div class="card-body" style="padding:16px 22px">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                      <strong>${doc.name}</strong>
                      <span class="badge badge-teal">${doc.specialty}</span>
                    </div>
                    <div style="font-size:.85rem;margin-bottom:2px">License: <strong>${doc.license}</strong></div>
                    <div style="font-size:.85rem;margin-bottom:2px">📧 ${doc.email}</div>
                    <div style="font-size:.85rem">📞 ${doc.phone}</div>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:8px">
                    <button class="btn btn-sm btn-outline" style="color:#e53e3e;border-color:#e53e3e" onclick="removeDoctor('${doc.id}')">Remove Account</button>
                  </div>
                </div>
              </div>
            </div>`).join('')}
        </div>
      </div>


      <!-- INQUIRIES TAB -->
      <div id="ad-inquiries" class="portal-panel ${tab==='inquiries'?'active':''}">
        <h3 style="margin-bottom:6px">Patient Inquiries</h3>
        <p style="color:var(--text-muted);font-size:.88rem;margin-bottom:20px">Click any inquiry to expand details and update its status.</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px" id="inq-filters">
          ${['All','New','In Progress','Resolved'].map(s=>`<button class="btn btn-sm ${s==='All'?'btn-primary':'btn-outline'}" onclick="filterInq('${s}',this)">${s}</button>`).join('')}
        </div>

        <!-- Category summary pills -->
        <div id="inq-cat-summary" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">
          ${(()=>{
            const cats = ['result','booking','specialist','billing','complaint','general'];
            const labels = {result:'📋 Results',booking:'📅 Booking',specialist:'👨‍⚕️ Specialist',billing:'💳 Billing',complaint:'⚠️ Complaint',general:'💬 General'};
            const colors = {result:'#3b82f6',booking:'#059669',specialist:'#7c3aed',billing:'#b45309',complaint:'#dc2626',general:'#475569'};
            const bgs    = {result:'#eff6ff',booking:'#ecfdf5',specialist:'#f5f3ff',billing:'#fffbeb',complaint:'#fef2f2',general:'#f8fafc'};
            return cats.map(c=>{
              const count = (DB.inquiries||[]).filter(i=>i.categoryId===c).length;
              return `<div style="padding:5px 12px;border-radius:4px;background:${bgs[c]};border:1.5px solid;border-color:${colors[c]}33;font-size:.78rem;font-weight:700;color:${colors[c]};cursor:pointer" onclick="filterInqCat('${c}',this)">${labels[c]} <span style="background:${colors[c]};color:white;border-radius:3px;padding:1px 6px;margin-left:4px">${count}</span></div>`;
            }).join('');
          })()}
        </div>

        <div id="inq-list">
          ${(()=>{
            const inqs = DB.inquiries||[];
            if(inqs.length===0) return `<div class="alert alert-info">No inquiries yet. They will appear here once patients submit the contact form.</div>`;
            const colors={result:'#3b82f6',booking:'#059669',specialist:'#7c3aed',billing:'#b45309',complaint:'#dc2626',general:'#475569'};
            const bgs   ={result:'#eff6ff',booking:'#ecfdf5',specialist:'#f5f3ff',billing:'#fffbeb',complaint:'#fef2f2',general:'#f8fafc'};
            const statColors={'New':'#dc2626','In Progress':'#d69e2e','Resolved':'#38a169'};
            return inqs.slice().reverse().map((inq,i)=>`
              <div class="card inq-card" data-status="${inq.status}" data-cat="${inq.categoryId}" style="margin-bottom:12px;border-left:4px solid ${colors[inq.categoryId]||'var(--border)'}">
                <div style="padding:14px 20px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px" onclick="toggleInq('inq-body-${i}',this)">
                  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
                    <div style="font-size:1.2rem">${inq.categoryIcon}</div>
                    <div>
                      <div style="font-weight:700;font-size:.92rem">${inq.name} <span style="color:var(--text-muted);font-weight:400;font-size:.8rem">· ${inq.email}</span></div>
                      <div style="font-size:.8rem;color:${colors[inq.categoryId]||'var(--text-muted)'};font-weight:600">${inq.category}</div>
                      <div style="font-size:.78rem;color:var(--text-muted);margin-top:2px">${inq.prompt}</div>
                    </div>
                  </div>
                  <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
                    <span style="font-size:.72rem;background:${statColors[inq.status]||'#475569'};color:white;padding:2px 8px;border-radius:4px;font-weight:700">${inq.status}</span>
                    <span style="font-size:.75rem;color:var(--text-muted)">${inq.submittedAt}</span>
                    <span style="font-size:.8rem;color:var(--text-muted)">▼</span>
                  </div>
                </div>
                <div id="inq-body-${i}" style="display:none;padding:0 20px 18px;border-top:1px solid var(--border)">
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px;margin-bottom:14px">
                    ${[
                      ['🪪 Patient ID', inq.pid||'—'],
                      ['📞 Phone',      inq.phone||'—'],
                      ['👨‍⚕️ Specialist', inq.doctor||'—'],
                      ['📅 Appointment',inq.booking||'—'],
                    ].map(([l,v])=>`<div style="background:var(--off-white);border-radius:6px;padding:10px 14px"><div style="font-size:.72rem;color:var(--text-muted);font-weight:700;margin-bottom:2px">${l}</div><div style="font-size:.85rem;font-weight:600">${v}</div></div>`).join('')}
                  </div>
                  ${inq.message?`<div style="background:var(--off-white);border-radius:6px;padding:12px 16px;margin-bottom:14px"><div style="font-size:.72rem;color:var(--text-muted);font-weight:700;margin-bottom:6px">💬 ADDITIONAL MESSAGE</div><div style="font-size:.85rem;line-height:1.6">${inq.message}</div></div>`:''}
                  <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                    <span style="font-size:.8rem;font-weight:600;color:var(--text-muted)">Update Status:</span>
                    ${['New','In Progress','Resolved'].map(s=>`<button class="btn btn-sm" style="font-size:.76rem;background:${statColors[s]};color:white;border:none" onclick="updateInqStatus('${inq.id}',this,'${s}')">${s}</button>`).join('')}
                  </div>
                </div>
              </div>`).join('');
          })()}
        </div>
      </div>

    </div></section>

    <!-- Reschedule Modal -->
    <div id="rs-modal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h3>Reschedule Appointment</h3>
          <button class="modal-close" onclick="hideModal('rs-modal')">x</button>
        </div>
        <div class="modal-body" id="rs-modal-body"></div>
      </div>
    </div>`;

    window.adTab = (tab, btn) => {
      el.dataset.tab = tab;
      el.querySelectorAll('.portal-tab').forEach(b=>b.classList.remove('active'));
      el.querySelectorAll('.portal-panel').forEach(p=>p.classList.remove('active'));
      if(btn) btn.classList.add('active');
      el.querySelector('#ad-'+tab)?.classList.add('active');
    };

    window.toggleInq = (id, header) => {
      const body = document.getElementById(id);
      const isOpen = body.style.display !== 'none';
      body.style.display = isOpen ? 'none' : 'block';
      const arr = header.querySelector('span:last-child');
      if(arr) arr.textContent = isOpen ? '\u25BC' : '\u25B2';
    };

    window.filterInq = (status, btn) => {
      document.querySelectorAll('#inq-filters .btn').forEach(b=>{ b.className='btn btn-sm btn-outline'; });
      btn.className='btn btn-sm btn-primary';
      document.querySelectorAll('.inq-card').forEach(card=>{
        card.style.display = (status==='All' || card.dataset.status===status) ? '' : 'none';
      });
    };

    window.filterInqCat = (cat, pill) => {
      document.querySelectorAll('#inq-cat-summary div').forEach(p=>p.style.opacity='.4');
      pill.style.opacity='1';
      document.querySelectorAll('.inq-card').forEach(card=>{
        card.style.display = card.dataset.cat===cat ? '' : 'none';
      });
      // reset status filter
      document.querySelectorAll('#inq-filters .btn').forEach(b=>b.className='btn btn-sm btn-outline');
      document.querySelector('#inq-filters .btn')&&(document.querySelector('#inq-filters .btn').className='btn btn-sm btn-primary');
    };

    window.updateInqStatus = (inqId, btn, newStatus) => {
      const inq = (DB.inquiries||[]).find(i=>i.id===inqId);
      if(!inq) return;
      inq.status = newStatus;
      const statColors={'New':'#dc2626','In Progress':'#d69e2e','Resolved':'#38a169'};
      // Update badge in the card header
      const card = btn.closest('.inq-card');
      if(card){
        card.dataset.status = newStatus;
        const badge = card.querySelector('[style*="border-radius:4px;font-weight:700"]');
        if(badge){ badge.textContent=newStatus; badge.style.background=statColors[newStatus]; }
      }
      btn.style.outline='2px solid white';
      setTimeout(()=>btn.style.outline='',1200);
    };

    window.createDoctorAccount = () => {
      const fn=el.querySelector('#nd-fn').value.trim(), ln=el.querySelector('#nd-ln').value.trim();
      const email=el.querySelector('#nd-email').value.trim(), pass=el.querySelector('#nd-pass').value.trim();
      const spec=el.querySelector('#nd-spec').value.trim(), lic=el.querySelector('#nd-lic').value.trim();
      const phone=el.querySelector('#nd-phone').value.trim();
      const alertEl=el.querySelector('#ad-doc-alert');
      if(!fn||!ln||!email||!pass){alertEl.innerHTML=`<div class="alert alert-error" style="margin-bottom:16px">Please fill in name, email, and password.</div>`;return;}
      if(pass.length<6){alertEl.innerHTML=`<div class="alert alert-error" style="margin-bottom:16px">Password must be at least 6 characters.</div>`;return;}
      if(DB.doctors.find(d=>d.email===email)||DB.patients.find(p=>p.email===email)){alertEl.innerHTML=`<div class="alert alert-error" style="margin-bottom:16px">That email is already in use.</div>`;return;}
      const newD={id:'D'+Date.now(),name:`Dr. ${fn} ${ln}`,email,password:pass,phone,specialty:spec,license:lic,role:'specialist'};
      DB.doctors.push(newD);
      alertEl.innerHTML=`<div class="alert alert-success" style="margin-bottom:16px">Account created for Dr. ${fn} ${ln}. Credentials: <strong>${email}</strong> / <strong>${pass}</strong></div>`;
      setTimeout(()=>{alertEl.innerHTML='';render();el.dataset.tab='doctors';el.querySelectorAll('.portal-tab').forEach((b,i)=>{if(i===3)b.classList.add('active');else b.classList.remove('active');});el.querySelectorAll('.portal-panel').forEach(p=>p.id==='ad-doctors'?p.classList.add('active'):p.classList.remove('active'));},3500);
    };

    window.removeDoctor = (did) => {
      if(!confirm('Remove this doctor account? They will no longer be able to log in.'))return;
      const idx=DB.doctors.findIndex(d=>d.id===did); if(idx>-1)DB.doctors.splice(idx,1);
      render(); el.dataset.tab='doctors';
      el.querySelectorAll('.portal-tab').forEach((b,i)=>{if(i===3)b.classList.add('active');else b.classList.remove('active');});
      el.querySelectorAll('.portal-panel').forEach(p=>p.id==='ad-doctors'?p.classList.add('active'):p.classList.remove('active'));
    };

    window.openRS = (bid) => {
      const b=DB.bookings.find(bk=>bk.id===bid); if(!b)return;
      const pat=DB.patients.find(p=>p.id===b.patientId)||{name:'Unknown'};
      const specs=DB.doctors.filter(d=>d.role==='specialist');
      const mb=el.querySelector('#rs-modal-body');
      mb.innerHTML=`
        <div class="alert alert-info" style="margin-bottom:16px">Rescheduling <strong>${b.id}</strong> for <strong>${pat.name}</strong></div>
        <div class="form-group"><label class="form-label">Current Date & Time</label><input class="form-control" value="${b.date} at ${b.time}" disabled style="background:var(--off-white)"></div>
        <div class="form-group"><label class="form-label">New Date</label><input class="form-control" type="date" id="rs-date" value="${b.date}" min="${new Date().toISOString().slice(0,10)}"></div>
        <div class="form-group"><label class="form-label">New Time</label>
          <select class="form-control" id="rs-time">${['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30'].map(t=>`<option ${t===b.time?'selected':''}>${t}</option>`).join('')}</select>
        </div>
        <div class="form-group"><label class="form-label">Assign Specialist</label>
          <select class="form-control" id="rs-doc">${specs.map(d=>`<option value="${d.id}" ${d.id===b.doctorId?'selected':''}>${d.name} (${d.specialty})</option>`).join('')}</select>
        </div>
        <div class="form-group"><label class="form-label">Assign Machine</label>
          <select class="form-control" id="rs-mach">${DB.machines.map(m=>`<option value="${m.id}" ${m.id===b.machineId?'selected':''}>${m.name} — ${m.branch} [${m.status}]</option>`).join('')}</select>
        </div>
        <div style="display:flex;gap:10px;margin-top:20px">
          <button class="btn btn-outline" onclick="hideModal('rs-modal')">Cancel</button>
          <button class="btn btn-primary" style="flex:1" onclick="confirmRS('${bid}')">Confirm Reschedule</button>
        </div>`;
      showModal('rs-modal');
    };

    window.confirmRS = (bid) => {
      const b=DB.bookings.find(bk=>bk.id===bid); if(!b)return;
      b.date=el.querySelector('#rs-date').value;
      b.time=el.querySelector('#rs-time').value;
      b.doctorId=el.querySelector('#rs-doc').value;
      b.machineId=el.querySelector('#rs-mach').value;
      hideModal('rs-modal');
      const alEl=el.querySelector('#rs-alert');
      if(alEl){alEl.innerHTML=`<div class="alert alert-success" style="margin-bottom:16px">Appointment <strong>${bid}</strong> rescheduled to ${b.date} at ${b.time}.</div>`;setTimeout(()=>alEl.innerHTML='',4000);}
      render();
    };

    window.cancelAppt = (bid) => {
      if(!confirm(`Cancel appointment ${bid}?`))return;
      const b=DB.bookings.find(bk=>bk.id===bid); if(b)b.status='Cancelled';
      const alEl=el.querySelector('#rs-alert');
      if(alEl){alEl.innerHTML=`<div class="alert" style="background:#fff5f5;border:1.5px solid #fc8181;color:#c53030;margin-bottom:16px">Appointment <strong>${bid}</strong> cancelled.</div>`;setTimeout(()=>alEl.innerHTML='',4000);}
      render();
    };
  }

  render();
  return el;
});

/* ── LOGIN MODAL ────────────────────────────────── */
function buildLoginModal() {
  const d = document.createElement('div');
  d.id='login-modal'; d.className='modal-overlay';
  d.innerHTML=`<div class="modal">
    <div class="modal-header">
      <h3>Sign In to WIA’AM LABS</h3>
      <button class="modal-close" onclick="hideModal('login-modal')">x</button>
    </div>
    <div class="modal-body">
      <div style="display:flex;background:var(--off-white);border:1.5px solid var(--border);border-radius:6px;padding:4px;margin-bottom:24px">
        <button id="lm-p" style="flex:1;padding:9px;border-radius:4px;border:none;font-weight:600;font-size:.88rem;background:var(--teal);color:white;transition:all .2s" onclick="setLR('patient')">Patient</button>
        <button id="lm-d" style="flex:1;padding:9px;border-radius:4px;border:none;font-weight:600;font-size:.88rem;background:transparent;color:var(--text-muted);transition:all .2s" onclick="setLR('doctor')">Specialist</button>
      </div>
      <div id="login-alert"></div>
      <div class="form-group"><label class="form-label">Email</label><input class="form-control" id="login-email" type="email" placeholder="your@email.com" autocomplete="email"></div>
      <div class="form-group"><label class="form-label">Password</label><input class="form-control" id="login-pass" type="password" placeholder="Your password" autocomplete="current-password"></div>
      <div class="alert alert-info" style="font-size:.8rem;margin-bottom:16px">
        <strong>Patient:</strong> ahmed@example.com / ahmed123<br>
        <strong>Specialist:</strong> layla@novalab.com / doc123
      </div>
      <button class="btn btn-primary" style="width:100%" onclick="doLogin()">Sign In</button>
      <div class="divider"></div>
      <p style="text-align:center;font-size:.87rem">No account? <a href="#" onclick="hideModal('login-modal');showPage('register')" style="color:var(--teal);font-weight:600">Register as Patient</a></p>
      <p style="text-align:center;font-size:.8rem;color:var(--text-muted);margin-top:4px">Doctors & staff: contact the registry for your credentials.</p>
    </div>
  </div>`;
  document.body.appendChild(d);
  let lr='patient';
  window.setLR=role=>{
    lr=role;
    d.querySelector('#lm-p').style.cssText=`flex:1;padding:9px;border-radius:4px;border:none;font-weight:600;font-size:.88rem;transition:all .2s;background:${role==='patient'?'var(--teal)':'transparent'};color:${role==='patient'?'white':'var(--text-muted)'}`;
    d.querySelector('#lm-d').style.cssText=`flex:1;padding:9px;border-radius:4px;border:none;font-weight:600;font-size:.88rem;transition:all .2s;background:${role==='doctor'?'var(--teal)':'transparent'};color:${role==='doctor'?'white':'var(--text-muted)'}`;
  };
  window.doLogin=()=>{
    const em=d.querySelector('#login-email').value.trim(), pw=d.querySelector('#login-pass').value;
    const user=login(em,pw,lr);
    if(!user){d.querySelector('#login-alert').innerHTML=`<div class="alert alert-error">Invalid email or password.</div>`;return;}
    currentUser=user;
    currentRole = lr==='patient'?'patient':'specialist';
    saveSession(); updateNavAuth(); hideModal('login-modal');
    if(currentRole==='patient') showPage('portal');
    else showPage('specialist-portal');
  };
  d.querySelector('#login-email').addEventListener('keydown',e=>{if(e.key==='Enter')window.doLogin();});
  d.querySelector('#login-pass').addEventListener('keydown',e=>{if(e.key==='Enter')window.doLogin();});
}

/* ── INIT ────────────────────────────────────────── */
/* ── SECRET ADMIN URL ────────────────────────────────── */
// Admin portal is accessible only via #ad123 (not shown in nav, share only with admins)
const ADMIN_SECRET_HASH = 'ad123';

function handleHash(hash) {
  if (hash === ADMIN_SECRET_HASH) {
    showPage('admin-portal');
  } else if (hash && hash !== '') {
    showPage(hash);
  } else {
    showPage('home');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSession();
  buildLoginModal();
  updateNavAuth();
  const hash = location.hash.replace('#','') || 'home';
  handleHash(hash);
  window.addEventListener('hashchange', () => {
    handleHash(location.hash.replace('#',''));
  });
  document.querySelectorAll('.nav-links a[data-page]').forEach(a=>{
    a.addEventListener('click',e=>{
      e.preventDefault();
      document.querySelector('.nav-links')?.classList.remove('open');
      showPage(a.dataset.page);
    });
  });
});
