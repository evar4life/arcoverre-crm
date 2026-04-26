import { useEffect, useState } from "react";

);

const leadStatuses = [
  "New Lead",
  "Contacted",
  "Qualified",
  "Converted",
  "Lost",
];

const leadServices = [
  "Glass Railing",
  "Frameless Shower",
  "Floating Staircase",
  "Custom Glass",
  "Other",
];

const projectStatuses = [
  "Pending",
  "In Progress",
  "Waiting on Material",
  "Ready to Install",
  "Completed",
];

const opportunityStages = [
  "Prospect",
  "Quoting",
  "Proposal Delivery",
  "Negotiation",
  "Quote Accepted",
  "Convert to Order",
  "Closed Lost",
];



const funnelColors = [
  "linear-gradient(135deg, #14b8a6, #0f766e)",
  "linear-gradient(135deg, #8b5cf6, #5b21b6)",
  "linear-gradient(135deg, #ef4444, #991b1b)",
  "linear-gradient(135deg, #f59e0b, #b45309)",
  "linear-gradient(135deg, #22c55e, #15803d)",
  "linear-gradient(135deg, #2563eb, #1e40af)",
  "linear-gradient(135deg, #64748b, #334155)",
];

const donutSolidColors = [
  "#14b8a6",
  "#8b5cf6",
  "#ef4444",
  "#f59e0b",
  "#22c55e",
  "#2563eb",
  "#64748b",
];

function buildDonutGradient(stageTotals) {
  const total = stageTotals.reduce((sum, item) => sum + cleanCurrency(item.total), 0);
  if (!total) return "conic-gradient(#2f3340 0deg 360deg)";

  let current = 0;
  const segments = stageTotals
    .map((item, index) => {
      const value = cleanCurrency(item.total);
      const degrees = (value / total) * 360;
      const start = current;
      const end = current + degrees;
      current = end;
      const color = donutSolidColors[index % donutSolidColors.length];
      return `${color} ${start}deg ${end}deg`;
    })
    .join(", ");

  return `conic-gradient(${segments})`;
}


const usStates = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];



const pricingPresets = {
  Glass: [
    { product: '1/2" Clear Tempered Glass', description: 'Custom cut clear tempered glass panel', unit_price: 95 },
    { product: '9/16" Laminated Glass', description: 'Custom laminated safety glass panel', unit_price: 125 },
    { product: '3/4" Clear Tempered Glass', description: 'Heavy clear tempered glass panel', unit_price: 165 },
    { product: 'Low-Iron Glass Upgrade', description: 'Low-iron premium glass upgrade', unit_price: 45 },
  ],
  Hardware: [
    { product: 'Standoff Hardware Set', description: 'Premium stainless standoff hardware set', unit_price: 85 },
    { product: 'Glass Clamp', description: 'Standard glass clamp hardware', unit_price: 38 },
    { product: 'Floor Mounted Post', description: 'Floor mounted railing post', unit_price: 185 },
    { product: 'Top Rail', description: 'Linear top rail material', unit_price: 65 },
  ],
  Labor: [
    { product: 'Standard Installation Labor', description: 'Standard installation labor', unit_price: 95 },
    { product: 'Field Measure / Site Visit', description: 'Field measurement and site visit', unit_price: 150 },
    { product: 'Engineering Coordination', description: 'Engineering / drawing coordination allowance', unit_price: 250 },
    { product: 'Premium / Difficult Access Labor', description: 'Additional labor for complex access or conditions', unit_price: 125 },
  ],
  "Add / Deduct": [
    { product: 'Add: Extra Hardware', description: 'Additional hardware allowance', unit_price: 100 },
    { product: 'Add: Rush Service', description: 'Rush production/service allowance', unit_price: 350 },
    { product: 'Deduct: Contractor Supplied Material', description: 'Credit for contractor supplied material', unit_price: -100 },
  ],
  Custom: [
    { product: 'Custom Item', description: 'Custom item or allowance', unit_price: 0 },
  ],
};


const quoteTemplates = {
  glassRailing: {
    label: "Glass Railing",
    product_summary: "Architectural glass railing system with selected glass panels, mounting hardware, and standard installation components.",
    scope_of_work: "Furnish and install glass railing system per approved field dimensions and final approved scope. Work includes standard installation of glass panels, posts/clamps/standoffs as applicable, anchoring, alignment, and final cleanup of installed glass areas.",
    inclusions: "Glass panels\nStandard mounting hardware\nStandard installation labor\nBasic alignment and cleanup\nStandard clear silicone/caulking where applicable",
    exclusions: "Permits and engineering unless specifically listed\nStructural steel or blocking by others\nDemolition of existing railing unless listed\nPainting, patching, flooring, or stucco work\nElectrical or waterproofing work\nAfter-hours labor",
    warranty: "Standard workmanship warranty to be provided based on final approved scope. Manufacturer warranty applies to eligible hardware and materials.",
    lead_time: "Current lead time is typically 3–6 weeks after approved quote, deposit, final field measurements, and approved glass/hardware selections.",
  },
  framelessShower: {
    label: "Frameless Shower",
    product_summary: "Custom frameless shower glass enclosure with selected hardware finish and standard installation.",
    scope_of_work: "Furnish and install frameless shower glass enclosure per approved field measurements. Work includes glass panels/door as required, hinges/clamps/pull hardware, setting, alignment, and standard clear silicone application.",
    inclusions: "Tempered safety glass\nSelected standard hardware finish\nStandard installation labor\nClear silicone application\nFinal wipe-down of installed glass",
    exclusions: "Tile repair or replacement\nWall corrections or out-of-plumb remediation\nWaterproofing\nPlumbing work\nPermits if required\nSpecialty hardware unless listed",
    warranty: "Standard workmanship warranty to be provided based on final approved scope. Hardware/manufacturer warranty applies where applicable.",
    lead_time: "Current lead time is typically 2–4 weeks after approved quote, deposit, and final field measurements.",
  },
  floatingStaircase: {
    label: "Floating Staircase / Stair Glass",
    product_summary: "Custom architectural stair glass system with selected mounting method and premium finish details.",
    scope_of_work: "Furnish and install custom stair glass system per approved measurements, drawings, and final scope. Work includes layout verification, glass installation, selected mounting hardware, alignment, and final cleanup of installed areas.",
    inclusions: "Custom glass panels\nSelected mounting hardware\nStandard installation labor\nLayout and alignment\nFinal cleanup of installed glass areas",
    exclusions: "Structural engineering unless listed\nSteel stringers, blocking, or structural supports\nDemolition\nPainting, patching, drywall, flooring, or tile work\nPermits and inspections unless listed\nAfter-hours premium labor",
    warranty: "Warranty to be provided based on final approved scope, materials, and installation conditions.",
    lead_time: "Current lead time is typically 4–8 weeks after approved quote, deposit, field verification, and approved drawings/submittals.",
  },
  customGlass: {
    label: "Custom Glass / Specialty",
    product_summary: "Custom glass and metal scope based on project requirements, selected materials, and approved measurements.",
    scope_of_work: "Furnish and install custom glass/metal scope as described in this proposal. Final production and installation are subject to approved measurements, material selections, and site conditions.",
    inclusions: "Custom glass/materials as listed\nStandard installation labor\nStandard hardware/components as listed\nFinal cleanup of installed scope",
    exclusions: "Permits, engineering, demolition, electrical, patching, painting, and work by others unless specifically included\nHidden conditions\nAfter-hours labor\nUnlisted specialty materials",
    warranty: "Warranty to be provided based on final approved materials, scope, and manufacturer coverage.",
    lead_time: "Current lead time will be confirmed after approved quote, deposit, final measurements, and material availability.",
  },
};


function cleanCurrency(value) {
  const cleaned = String(value ?? "").replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");
  const normalized = parts.length > 1 ? `${parts[0]}.${parts.slice(1).join("")}` : cleaned;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : 0;
}

function formatMoney(value) {
  return cleanCurrency(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatCurrencyInput(value) {
  const input = String(value ?? "").replace(/[^0-9.]/g, "");
  if (!input) return "";

  const firstDot = input.indexOf(".");
  let dollars = input;
  let cents = "";
  let hasDecimal = false;

  if (firstDot >= 0) {
    hasDecimal = true;
    dollars = input.slice(0, firstDot);
    cents = input.slice(firstDot + 1).replace(/\./g, "").slice(0, 2);
  }

  const formattedDollars = dollars ? Number(dollars).toLocaleString("en-US") : "0";
  return "$" + formattedDollars + (hasDecimal ? "." + cents : "");
}


function formatPhone(value) {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

function EmailLink({ email }) {
  if (!email) return "—";
  return (
    <a href={`mailto:${email}`} style={styles.emailLink}>
      {email}
    </a>
  );
}

function PhoneText({ phone }) {
  return phone ? formatPhone(phone) : "—";
}


function dateOnly(value) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

function followUpStatus(dateValue) {
  if (!dateValue) return { label: "No follow-up", type: "none" };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const date = new Date(dateValue);
  date.setHours(0, 0, 0, 0);

  const diffDays = Math.round((date - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: "Overdue", type: "overdue" };
  if (diffDays === 0) return { label: "Due Today", type: "today" };
  return { label: `Due in ${diffDays} day${diffDays === 1 ? "" : "s"}`, type: "upcoming" };
}


function stageProbability(stage) {
  const map = {
    Prospect: 10,
    Quoting: 25,
    "Proposal Delivery": 45,
    Negotiation: 65,
    "Quote Accepted": 90,
    "Convert to Order": 100,
    "Closed Lost": 0,
  };

  return map[stage] ?? 0;
}

export default function App() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState("home");
  const [sidePanel, setSidePanel] = useState(null);

  const [accounts, setAccounts] = useState([]);
  const [opps, setOpps] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [leads, setLeads] = useState([]);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectEditor, setProjectEditor] = useState({});
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceForm, setInvoiceForm] = useState({
    amount: "",
    due_date: "",
    notes: "",
  });
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    payment_date: "",
    method: "Zelle",
    notes: "",
  });

  const [selectedLead, setSelectedLead] = useState(null);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    service_interest: "",
    project_details: "",
    status: "New Lead",
  });
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [approvalToken, setApprovalToken] = useState(null);
  const [publicQuote, setPublicQuote] = useState(null);
  const [publicApprovalName, setPublicApprovalName] = useState("");
  const [publicApprovalLoading, setPublicApprovalLoading] = useState(false);
  const [publicApprovalMessage, setPublicApprovalMessage] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [callLogs, setCallLogs] = useState([]);
  const [callLogNote, setCallLogNote] = useState("");
  const [editingAccount, setEditingAccount] = useState(null);
  const [accountEditForm, setAccountEditForm] = useState(null);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);

  const [accountForm, setAccountForm] = useState({
    account_name: "",
    account_type: "Contractor",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    contact_person: "",
    phone: "",
    email: "",
  });

  const [oppForm, setOppForm] = useState({
    project_name: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    estimated_value: "",
  });

  const [quoteForm, setQuoteForm] = useState({
    description: "",
    amount: "",
    status: "Draft",
    sold_to_account_id: "",
    follow_up_date: "",
    follow_up_note: "",
    template_key: "",
  });

  const [productForm, setProductForm] = useState({
    category: "Glass",
    product_name: "",
    description: "",
    unit_price: "",
    is_active: true,
  });

  const [quoteEditor, setQuoteEditor] = useState({});
  const [selectedQuoteTemplate, setSelectedQuoteTemplate] = useState("");
  const [quoteLineItems, setQuoteLineItems] = useState([]);
  const [lineItemForm, setLineItemForm] = useState({
    category: "Glass",
    product: "",
    description: "",
    quantity: "1",
    unit_price: "",
  });

  const [sendQuoteModal, setSendQuoteModal] = useState(false);
  const [sendQuoteForm, setSendQuoteForm] = useState({
    to: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session)
    );
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/\/approve\/([^/]+)/);

    if (match?.[1]) {
      setApprovalToken(match[1]);
      loadPublicQuote(match[1]);
    }
  }, []);

  useEffect(() => {
    if (session?.user) loadAll();
  }, [session]);


  async function loadPublicQuote(token) {
    setPublicApprovalLoading(true);

    const { data, error } = await supabase.rpc("get_public_quote_by_token", {
      token_input: token,
    });

    if (error) {
      setPublicApprovalMessage(error.message);
      setPublicQuote(null);
    } else {
      setPublicQuote(Array.isArray(data) ? data[0] : data);
    }

    setPublicApprovalLoading(false);
  }

  async function approvePublicQuote() {
    if (!approvalToken) return;
    if (!publicApprovalName.trim()) return alert("Please type your name to approve.");

    setPublicApprovalLoading(true);

    const { error } = await supabase.rpc("approve_quote_by_token", {
      token_input: approvalToken,
      approved_name_input: publicApprovalName.trim(),
    });

    if (error) {
      setPublicApprovalMessage(error.message);
    } else {
      setPublicApprovalMessage("Quote approved successfully. Thank you.");
      await loadPublicQuote(approvalToken);
    }

    setPublicApprovalLoading(false);
  }

  async function loadAll() {
    await Promise.all([loadAccounts(), loadOpps(), loadQuotes(), loadCallLogs(), loadProducts(), loadProjects(), loadInvoices(), loadPayments(), loadLeads()]);
  }

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  }

  async function logout() {
    await supabase.auth.signOut();
  }


  async function loadLeads() {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("owner_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn(error.message);
      setLeads([]);
    } else {
      setLeads(data || []);
    }
  }

  function resetLeadForm() {
    setLeadForm({
      full_name: "",
      phone: "",
      email: "",
      service_interest: "",
      project_details: "",
      status: "New Lead",
    });
  }

  async function addLead() {
    if (!leadForm.full_name) return alert("Lead name is required.");
    if (!leadForm.phone && !leadForm.email) return alert("Add at least a phone or email.");

    const { error } = await supabase.from("leads").insert([
      {
        owner_id: session.user.id,
        full_name: leadForm.full_name,
        phone: leadForm.phone,
        email: leadForm.email,
        service_interest: leadForm.service_interest,
        project_details: leadForm.project_details,
        status: leadForm.status || "New Lead",
        source: "Manual Entry",
      },
    ]);

    if (error) return alert(error.message);

    resetLeadForm();
    setLeadModalOpen(false);
    loadLeads();
  }

  function openLead(lead) {
    setSelectedLead(lead);
    setSidePanel("lead");
  }

  async function updateLeadStatus(lead, status) {
    if (!lead) return;

    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", lead.id);

    if (error) return alert(error.message);

    const updated = { ...lead, status };
    setSelectedLead(updated);
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? updated : l)));
  }

  function suggestedFollowUpEmail(lead) {
    return (
      `Hi ${lead?.full_name || ""},\n\n` +
      `Thank you for reaching out to Arcoverre. We received your request for ${lead?.service_interest || "your project"}.\n\n` +
      `I’d like to schedule a quick call or site visit to better understand the project, take measurements if needed, and prepare an accurate quote.\n\n` +
      `What day and time works best for you?\n\n` +
      `Best regards,\nArcoverre Team`
    );
  }

  function openLeadFollowUpEmail(lead) {
    if (!lead?.email) return alert("This lead does not have an email address.");

    const subject = `Arcoverre Quote Request`;
    const body = suggestedFollowUpEmail(lead);

    window.location.href =
      `mailto:${encodeURIComponent(lead.email)}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  }

  async function convertLeadToOpportunityQuote(lead) {
    if (!lead) return;

    const confirmed = confirm("Convert this lead into an Account, Opportunity, and draft Quote?");
    if (!confirmed) return;

    const { data: account, error: accountError } = await supabase
      .from("accounts")
      .insert([
        {
          owner_id: session.user.id,
          account_name: lead.full_name,
          account_type: "Homeowner",
          contact_person: lead.full_name,
          phone: lead.phone,
          email: lead.email,
          address: "",
          city: "",
          state: "",
          zip_code: "",
        },
      ])
      .select()
      .single();

    if (accountError) return alert(accountError.message);

    const opportunity_number = `OPP-${Date.now().toString().slice(-6)}`;

    const { data: opportunity, error: oppError } = await supabase
      .from("opportunities")
      .insert([
        {
          owner_id: session.user.id,
          account_id: account.id,
          opportunity_number,
          project_name: lead.service_interest || "New Lead Opportunity",
          address: "",
          city: "",
          state: "",
          zip_code: "",
          estimated_value: 0,
          status: "Prospect",
        },
      ])
      .select()
      .single();

    if (oppError) return alert(oppError.message);

    const quote_number = `Q-${Date.now().toString().slice(-6)}`;

    const { data: quote, error: quoteError } = await supabase
      .from("quotes")
      .insert([
        {
          owner_id: session.user.id,
          opportunity_id: opportunity.id,
          sold_to_account_id: account.id,
          quote_number,
          description: lead.project_details || lead.service_interest || "Manual lead quote request",
          amount: 0,
          net_price: 0,
          status: "Draft",
          product_summary: "",
          scope_of_work: lead.project_details || "",
          add_deduct: "",
          lead_time: "Current lead time will be confirmed after approved quote and deposit.",
          warranty: "Warranty to be provided based on final approved scope.",
          inclusions: "Glass, hardware, and standard installation as described in this quote.",
          exclusions: "Permits, engineering, demolition, electrical, patching, painting, and work by others unless specified.",
        },
      ])
      .select()
      .single();

    if (quoteError) return alert(quoteError.message);

    await supabase
      .from("leads")
      .update({
        status: "Converted",
        converted_account_id: account.id,
        converted_opportunity_id: opportunity.id,
        converted_quote_id: quote.id,
      })
      .eq("id", lead.id);

    await loadAll();

    setSelectedLead(null);
    setSidePanel(null);
    await openQuote(quote);
  }

  async function deleteLead(lead) {
    const confirmed = confirm(`Delete lead "${lead.full_name}"?`);
    if (!confirmed) return;

    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", lead.id);

    if (error) return alert(error.message);

    setLeads((prev) => prev.filter((l) => l.id !== lead.id));
    if (selectedLead?.id === lead.id) {
      setSelectedLead(null);
      setSidePanel(null);
    }
  }

  async function loadAccounts() {
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("owner_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) alert(error.message);
    else setAccounts(data || []);
  }

  async function loadOpps() {
    const { data, error } = await supabase
      .from("opportunities")
      .select("*")
      .eq("owner_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) alert(error.message);
    else setOpps(data || []);
  }

  async function loadQuotes() {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("owner_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) alert(error.message);
    else setQuotes(data || []);
  }


  async function loadCallLogs() {
    const { data, error } = await supabase
      .from("quote_call_logs")
      .select("*")
      .eq("owner_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn(error.message);
      setCallLogs([]);
    } else {
      setCallLogs(data || []);
    }
  }

  async function addCallLog() {
    if (!selectedQuote) return alert("Open a quote first.");
    if (!callLogNote.trim()) return alert("Type a call note first.");

    const { error } = await supabase.from("quote_call_logs").insert([
      {
        owner_id: session.user.id,
        quote_id: selectedQuote.id,
        note: callLogNote.trim(),
      },
    ]);

    if (error) return alert(error.message);

    setCallLogNote("");
    loadCallLogs();
  }

  async function deleteCallLog(log) {
    const confirmed = confirm("Delete this call note?");
    if (!confirmed) return;

    const { error } = await supabase
      .from("quote_call_logs")
      .delete()
      .eq("id", log.id);

    if (error) return alert(error.message);

    setCallLogs((prev) => prev.filter((item) => item.id !== log.id));
  }



  async function loadProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("owner_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn(error.message);
      setProjects([]);
    } else {
      setProjects(data || []);
    }
  }

  async function convertQuoteToProject(quote = selectedQuote) {
    if (!quote) return alert("Open a quote first.");

    if (quote.status !== "Approved") {
      const proceed = confirm("This quote is not marked Approved yet. Convert anyway?");
      if (!proceed) return;
    }

    const existing = projects.find((p) => p.quote_id === quote.id);
    if (existing) {
      alert("This quote has already been converted to a project.");
      setView("projects");
      return;
    }

    const opp = opps.find((o) => o.id === quote.opportunity_id);
    const shipTo = opp ? accounts.find((a) => a.id === opp.account_id) : null;
    const soldTo = accounts.find((a) => a.id === quote.sold_to_account_id);

    const project_number = `PRJ-${Date.now().toString().slice(-6)}`;

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          owner_id: session.user.id,
          project_number,
          quote_id: quote.id,
          opportunity_id: quote.opportunity_id,
          ship_to_account_id: shipTo?.id || null,
          sold_to_account_id: soldTo?.id || null,
          project_name: opp?.project_name || quote.description || "New Project",
          address: opp?.address || shipTo?.address || "",
          city: opp?.city || shipTo?.city || "",
          state: opp?.state || shipTo?.state || "",
          zip_code: opp?.zip_code || shipTo?.zip_code || "",
          total_amount: cleanCurrency(quote.net_price || quote.amount),
          status: "In Progress",
          notes: "",
        },
      ])
      .select()
      .single();

    if (error) return alert(error.message);

    setProjects((prev) => [data, ...prev]);

    await supabase
      .from("opportunities")
      .update({ status: "Convert to Order" })
      .eq("id", quote.opportunity_id);

    setOpps((prev) =>
      prev.map((o) =>
        o.id === quote.opportunity_id ? { ...o, status: "Convert to Order" } : o
      )
    );

    alert("Project created successfully.");
    setView("projects");
  }


  function openProject(project) {
    setSelectedProject(project);
    setProjectEditor({
      status: project.status || "In Progress",
      notes: project.notes || "",
      deposit_received_date: project.deposit_received_date ? dateOnly(project.deposit_received_date) : "",
      material_ordered_date: project.material_ordered_date ? dateOnly(project.material_ordered_date) : "",
      install_date: project.install_date ? dateOnly(project.install_date) : "",
      completed_date: project.completed_date ? dateOnly(project.completed_date) : "",
    });
    setSidePanel("project");
  }

  async function saveProjectDetails(project = selectedProject) {
    if (!project) return;

    const updates = {
      status: projectEditor.status || "In Progress",
      notes: projectEditor.notes || "",
      deposit_received_date: projectEditor.deposit_received_date || null,
      material_ordered_date: projectEditor.material_ordered_date || null,
      install_date: projectEditor.install_date || null,
      completed_date: projectEditor.completed_date || null,
    };

    const { error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", project.id);

    if (error) return alert(error.message);

    const updated = { ...project, ...updates };
    setSelectedProject(updated);
    setProjects((prev) => prev.map((p) => (p.id === project.id ? updated : p)));
    alert("Project updated.");
  }

  async function updateProjectStatus(project, status) {
    if (!project) return;

    const updates = {
      status,
      completed_date: status === "Completed" ? new Date().toISOString().slice(0, 10) : project.completed_date,
    };

    const { error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", project.id);

    if (error) return alert(error.message);

    const updated = { ...project, ...updates };
    setSelectedProject(updated);
    setProjectEditor((prev) => ({ ...prev, ...updates }));
    setProjects((prev) => prev.map((p) => (p.id === project.id ? updated : p)));
  }


  async function loadInvoices() {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("owner_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn(error.message);
      setInvoices([]);
    } else {
      setInvoices(data || []);
    }
  }

  async function loadPayments() {
    const { data, error } = await supabase
      .from("invoice_payments")
      .select("*")
      .eq("owner_id", session.user.id)
      .order("payment_date", { ascending: false });

    if (error) {
      console.warn(error.message);
      setPayments([]);
    } else {
      setPayments(data || []);
    }
  }

  function invoicePayments(invoiceId) {
    return payments.filter((p) => p.invoice_id === invoiceId);
  }

  function invoicePaidTotal(invoiceId) {
    return invoicePayments(invoiceId).reduce((sum, p) => sum + cleanCurrency(p.amount), 0);
  }

  function invoiceBalance(invoice) {
    return cleanCurrency(invoice.amount) - invoicePaidTotal(invoice.id);
  }

  function invoiceStatus(invoice) {
    const paid = invoicePaidTotal(invoice.id);
    const amount = cleanCurrency(invoice.amount);
    if (amount > 0 && paid >= amount) return "Paid";
    if (paid > 0) return "Partial";
    return invoice.status || "Draft";
  }

  async function createInvoiceFromProject(project = selectedProject) {
    if (!project) return alert("Open a project first.");

    const invoice_number = `INV-${Date.now().toString().slice(-6)}`;
    const amount = cleanCurrency(invoiceForm.amount || project.total_amount);
    const dueDate = invoiceForm.due_date || null;

    const { data, error } = await supabase
      .from("invoices")
      .insert([
        {
          owner_id: session.user.id,
          invoice_number,
          project_id: project.id,
          sold_to_account_id: project.sold_to_account_id,
          amount,
          status: "Draft",
          due_date: dueDate,
          notes: invoiceForm.notes || "",
        },
      ])
      .select()
      .single();

    if (error) return alert(error.message);

    setInvoices((prev) => [data, ...prev]);
    setInvoiceForm({ amount: "", due_date: "", notes: "" });
    setSelectedInvoice(data);
    setSidePanel("invoice");
    alert("Invoice created.");
  }

  function openInvoice(invoice) {
    if (!invoice) return;
    setSelectedInvoice(invoice);
    setPaymentForm({
      amount: "",
      payment_date: new Date().toISOString().slice(0, 10),
      method: "Zelle",
      notes: "",
    });
    setSidePanel("invoice");
  }

  async function markInvoiceSent(invoice = selectedInvoice) {
    if (!invoice) return;

    const updates = {
      status: "Sent",
      sent_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("invoices")
      .update(updates)
      .eq("id", invoice.id);

    if (error) return alert(error.message);

    const updated = { ...invoice, ...updates };
    setSelectedInvoice(updated);
    setInvoices((prev) => prev.map((i) => (i.id === invoice.id ? updated : i)));
    alert("Invoice marked as sent.");
  }

  async function addInvoicePayment(invoice = selectedInvoice) {
    if (!invoice) return alert("Open an invoice first.");
    if (!paymentForm.amount) return alert("Payment amount is required.");

    const amount = cleanCurrency(paymentForm.amount);

    const { data, error } = await supabase
      .from("invoice_payments")
      .insert([
        {
          owner_id: session.user.id,
          invoice_id: invoice.id,
          amount,
          payment_date: paymentForm.payment_date || new Date().toISOString().slice(0, 10),
          method: paymentForm.method || "",
          notes: paymentForm.notes || "",
        },
      ])
      .select()
      .single();

    if (error) return alert(error.message);

    const updatedPayments = [data, ...payments];
    setPayments(updatedPayments);

    const paid = updatedPayments
      .filter((p) => p.invoice_id === invoice.id)
      .reduce((sum, p) => sum + cleanCurrency(p.amount), 0);

    const newStatus = paid >= cleanCurrency(invoice.amount) ? "Paid" : "Partial";

    const { error: invoiceError } = await supabase
      .from("invoices")
      .update({ status: newStatus })
      .eq("id", invoice.id);

    if (invoiceError) return alert(invoiceError.message);

    const updatedInvoice = { ...invoice, status: newStatus };
    setSelectedInvoice(updatedInvoice);
    setInvoices((prev) => prev.map((i) => (i.id === invoice.id ? updatedInvoice : i)));

    setPaymentForm({
      amount: "",
      payment_date: new Date().toISOString().slice(0, 10),
      method: "Zelle",
      notes: "",
    });
  }

  async function deleteInvoice(invoice) {
    const confirmed = confirm(`Delete invoice "${invoice.invoice_number}"?`);
    if (!confirmed) return;

    const { error } = await supabase
      .from("invoices")
      .delete()
      .eq("id", invoice.id);

    if (error) return alert(error.message);

    setInvoices((prev) => prev.filter((i) => i.id !== invoice.id));
    if (selectedInvoice?.id === invoice.id) {
      setSelectedInvoice(null);
      setSidePanel(null);
    }
  }

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("owner_id", session.user.id)
      .order("category", { ascending: true })
      .order("product_name", { ascending: true });

    if (error) {
      console.warn(error.message);
      setProducts([]);
    } else {
      setProducts(data || []);
    }
  }

  async function addProduct() {
    if (!productForm.product_name) return alert("Product name is required.");

    const { error } = await supabase.from("products").insert([
      {
        owner_id: session.user.id,
        category: productForm.category,
        product_name: productForm.product_name,
        description: productForm.description,
        unit_price: cleanCurrency(productForm.unit_price),
        is_active: productForm.is_active,
      },
    ]);

    if (error) return alert(error.message);

    setProductForm({
      category: "Glass",
      product_name: "",
      description: "",
      unit_price: "",
      is_active: true,
    });
    setProductModalOpen(false);
    loadProducts();
  }

  async function editProduct(product) {
    const product_name = prompt("Product name:", product.product_name || "");
    if (!product_name) return;

    const category = prompt("Category:", product.category || "Glass");
    const description = prompt("Description:", product.description || "");
    const unit_price = prompt("Unit price:", product.unit_price || "0");
    const is_active = confirm("Should this product remain active? Click OK for active, Cancel for inactive.");

    const updates = {
      product_name,
      category,
      description,
      unit_price: cleanCurrency(unit_price),
      is_active,
    };

    const { error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", product.id);

    if (error) return alert(error.message);

    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, ...updates } : p))
    );
  }

  async function deleteProduct(product) {
    const confirmed = confirm(`Delete product "${product.product_name}"?`);
    if (!confirmed) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) return alert(error.message);

    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  }

  function activeProductsByCategory(category) {
    return products.filter((p) => p.is_active !== false && p.category === category);
  }

  async function addAccount() {
    if (!accountForm.account_name) return alert("Account name is required.");

    const { error } = await supabase.from("accounts").insert([
      {
        owner_id: session.user.id,
        ...accountForm,
      },
    ]);

    if (error) return alert(error.message);

    setAccountForm({
      account_name: "",
      account_type: "Contractor",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      contact_person: "",
      phone: "",
      email: "",
    });
    setAccountModalOpen(false);
    loadAccounts();
  }

  function editAccount(account) {
    setAccountEditForm({
      account_name: account.account_name || "",
      account_type: account.account_type || "Contractor",
      address: account.address || "",
      city: account.city || "",
      state: account.state || "",
      zip_code: account.zip_code || "",
      contact_person: account.contact_person || "",
      phone: account.phone || "",
      email: account.email || "",
    });
    setEditingAccount(account);
  }

  async function saveAccountEdit() {
    if (!editingAccount || !accountEditForm) return;
    if (!accountEditForm.account_name) return alert("Account name is required.");

    const updates = { ...accountEditForm };

    const { error } = await supabase
      .from("accounts")
      .update(updates)
      .eq("id", editingAccount.id);

    if (error) return alert(error.message);

    const updated = { ...editingAccount, ...updates };

    setAccounts((prev) =>
      prev.map((a) => (a.id === editingAccount.id ? updated : a))
    );

    if (selectedAccount?.id === editingAccount.id) {
      setSelectedAccount(updated);
    }

    setEditingAccount(null);
    setAccountEditForm(null);
  }

  async function deleteAccount(account) {
    const confirmed = confirm(
      `Delete account "${account.account_name}"? This should only be done if you no longer need it.`
    );
    if (!confirmed) return;

    const { error } = await supabase
      .from("accounts")
      .delete()
      .eq("id", account.id);

    if (error) return alert(error.message);

    setAccounts((prev) => prev.filter((a) => a.id !== account.id));

    if (selectedAccount?.id === account.id) {
      setSelectedAccount(null);
      setView("accounts");
    }
  }

  async function addOpp() {
    if (!selectedAccount) return alert("Open an account first.");
    if (!oppForm.project_name) return alert("Opportunity name is required.");

    const opportunity_number = `OPP-${Date.now().toString().slice(-6)}`;

    const { error } = await supabase.from("opportunities").insert([
      {
        owner_id: session.user.id,
        account_id: selectedAccount.id,
        opportunity_number,
        project_name: oppForm.project_name,
        address: oppForm.address,
        city: oppForm.city,
        state: oppForm.state,
        zip_code: oppForm.zip_code,
        estimated_value: cleanCurrency(oppForm.estimated_value),
        status: "Prospect",
      },
    ]);

    if (error) return alert(error.message);

    setOppForm({ project_name: "", address: "", city: "", state: "", zip_code: "", estimated_value: "" });
    loadOpps();
  }

  async function editOpp(opp) {
    const project_name = prompt("Opportunity name:", opp.project_name || "");
    if (!project_name) return;

    const address = prompt("Address:", opp.address || "");
    const city = prompt("City:", opp.city || "");
    const state = prompt("State:", opp.state || "");
    const zip_code = prompt("Zip code:", opp.zip_code || "");
    const estimated_value = prompt("Estimated value:", opp.estimated_value || "0");

    const updates = {
      project_name,
      address,
      city,
      state,
      zip_code,
      estimated_value: cleanCurrency(estimated_value),
    };

    const { error } = await supabase
      .from("opportunities")
      .update(updates)
      .eq("id", opp.id);

    if (error) return alert(error.message);

    setOpps((prev) =>
      prev.map((o) => (o.id === opp.id ? { ...o, ...updates } : o))
    );

    if (selectedOpp?.id === opp.id) {
      setSelectedOpp({ ...selectedOpp, ...updates });
    }
  }

  async function deleteOpp(opp) {
    const confirmed = confirm(`Delete opportunity "${opp.project_name}"?`);
    if (!confirmed) return;

    const { error } = await supabase
      .from("opportunities")
      .delete()
      .eq("id", opp.id);

    if (error) return alert(error.message);

    setOpps((prev) => prev.filter((o) => o.id !== opp.id));

    if (selectedOpp?.id === opp.id) {
      setSelectedOpp(null);
      setView("opportunities");
    }
  }

  async function updateOppStage(stage) {
    if (!selectedOpp) return;

    const { error } = await supabase
      .from("opportunities")
      .update({ status: stage })
      .eq("id", selectedOpp.id);

    if (error) return alert(error.message);

    const updated = { ...selectedOpp, status: stage };
    setSelectedOpp(updated);
    setOpps((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
  }



  async function loadQuoteLineItems(quoteId) {
    if (!quoteId) {
      setQuoteLineItems([]);
      return;
    }

    const { data, error } = await supabase
      .from("quote_line_items")
      .select("*")
      .eq("quote_id", quoteId)
      .order("created_at", { ascending: true });

    if (error) {
      console.warn(error.message);
      setQuoteLineItems([]);
      return;
    }

    setQuoteLineItems(data || []);
  }

  function lineItemsTotal(items = quoteLineItems) {
    return items.reduce((sum, item) => sum + cleanCurrency(item.total), 0);
  }

  async function syncQuoteTotal(items, quote = selectedQuote) {
    if (!quote) return;

    const total = lineItemsTotal(items);
    if (total <= 0) return;

    const updates = {
      amount: total,
      net_price: total,
    };

    const { error } = await supabase
      .from("quotes")
      .update(updates)
      .eq("id", quote.id);

    if (error) return alert(error.message);

    const updatedQuote = { ...quote, ...updates };
    setSelectedQuote(updatedQuote);
    setQuoteEditor((prev) => ({
      ...prev,
      amount: formatMoney(total),
      net_price: formatMoney(total),
    }));
    setQuotes((prev) => prev.map((q) => (q.id === quote.id ? updatedQuote : q)));
  }


  function applyPricingPreset(productIdOrName) {
    const productFromCatalog = products.find((item) => item.id === productIdOrName);

    if (productFromCatalog) {
      setLineItemForm({
        ...lineItemForm,
        product: productFromCatalog.product_name,
        description: productFromCatalog.description || "",
        unit_price: formatMoney(productFromCatalog.unit_price),
      });
      return;
    }

    const preset = (pricingPresets[lineItemForm.category] || []).find(
      (item) => item.product === productIdOrName
    );

    if (!preset) {
      setLineItemForm({ ...lineItemForm, product: productIdOrName });
      return;
    }

    setLineItemForm({
      ...lineItemForm,
      product: preset.product,
      description: preset.description,
      unit_price: formatMoney(preset.unit_price),
    });
  }

  async function addQuoteLineItem() {
    if (!selectedQuote) return alert("Open a quote first.");
    if (!lineItemForm.product && !lineItemForm.description) {
      return alert("Add a product or description first.");
    }

    const quantity = cleanCurrency(lineItemForm.quantity || 1);
    const unitPrice = cleanCurrency(lineItemForm.unit_price);
    const total = quantity * unitPrice;

    const item = {
      owner_id: session.user.id,
      quote_id: selectedQuote.id,
      category: lineItemForm.category || "Custom",
      product: lineItemForm.product || "",
      description: lineItemForm.description || "",
      quantity,
      unit_price: unitPrice,
      total,
    };

    const { data, error } = await supabase
      .from("quote_line_items")
      .insert([item])
      .select()
      .single();

    if (error) return alert(error.message);

    const updatedItems = [...quoteLineItems, data];
    setQuoteLineItems(updatedItems);
    setLineItemForm({
      category: "Glass",
      product: "",
      description: "",
      quantity: "1",
      unit_price: "",
    });

    await syncQuoteTotal(updatedItems);
  }

  async function deleteQuoteLineItem(item) {
    const confirmed = confirm("Delete this quote line item?");
    if (!confirmed) return;

    const { error } = await supabase
      .from("quote_line_items")
      .delete()
      .eq("id", item.id);

    if (error) return alert(error.message);

    const updatedItems = quoteLineItems.filter((line) => line.id !== item.id);
    setQuoteLineItems(updatedItems);
    await syncQuoteTotal(updatedItems);
  }

  async function createQuoteFromOpportunity(opp) {
    if (!opp) return alert("Select an opportunity first.");

    const soldToAccountId = opp.account_id || "";
    const quote_number = `Q-${Date.now().toString().slice(-6)}`;

    const { data, error } = await supabase
      .from("quotes")
      .insert([
        {
          owner_id: session.user.id,
          opportunity_id: opp.id,
          sold_to_account_id: soldToAccountId,
          quote_number,
          description: opp.project_name || "New Quote",
          amount: cleanCurrency(opp.estimated_value),
          net_price: cleanCurrency(opp.estimated_value),
          status: "Draft",
          follow_up_date: null,
          follow_up_note: "",
          product_summary: "",
          scope_of_work: "",
          add_deduct: "",
          lead_time: "Current lead time will be confirmed after approved quote and deposit.",
          warranty: "Warranty to be provided based on final approved scope.",
          inclusions: "Glass, hardware, and standard installation as described in this quote.",
          exclusions: "Permits, engineering, demolition, electrical, patching, painting, and work by others unless specified.",
        },
      ])
      .select()
      .single();

    if (error) return alert(error.message);

    setQuotes((prev) => [data, ...prev]);
    setSidePanel(null);
    await openQuote(data);
  }

  async function addQuote() {
    if (!selectedOpp) return alert("Open an opportunity first.");
    if (!quoteForm.sold_to_account_id) return alert("Choose the Sold To account for this quote.");

    const quote_number = `Q-${Date.now().toString().slice(-6)}`;
    const selectedTemplate = quoteTemplates[quoteForm.template_key] || null;

    const { error } = await supabase.from("quotes").insert([
      {
        owner_id: session.user.id,
        opportunity_id: selectedOpp.id,
        sold_to_account_id: quoteForm.sold_to_account_id,
        quote_number,
        description: quoteForm.description,
        amount: cleanCurrency(quoteForm.amount),
        net_price: cleanCurrency(quoteForm.amount),
        status: quoteForm.status,
        follow_up_date: quoteForm.follow_up_date || null,
        follow_up_note: quoteForm.follow_up_note || "",
        product_summary: selectedTemplate?.product_summary || "",
        scope_of_work: selectedTemplate?.scope_of_work || "",
        add_deduct: "",
        lead_time: selectedTemplate?.lead_time || "Current lead time will be confirmed after approved quote and deposit.",
        warranty: selectedTemplate?.warranty || "Warranty to be provided based on final approved scope.",
        inclusions: selectedTemplate?.inclusions || "Glass, hardware, and standard installation as described in this quote.",
        exclusions: selectedTemplate?.exclusions || "Permits, engineering, demolition, electrical, patching, painting, and work by others unless specified.",
      },
    ]);

    if (error) return alert(error.message);

    setQuoteForm({ description: "", amount: "", status: "Draft", sold_to_account_id: "", follow_up_date: "", follow_up_note: "", template_key: "" });
    loadQuotes();
  }

  async function saveQuoteDetails() {
    if (!selectedQuote) return;

    const updates = {
      ...quoteEditor,
      amount: cleanCurrency(quoteEditor.amount),
      net_price: cleanCurrency(quoteEditor.net_price || quoteEditor.amount),
      follow_up_date: quoteEditor.follow_up_date || null,
      follow_up_note: quoteEditor.follow_up_note || "",
    };

    const { error } = await supabase
      .from("quotes")
      .update(updates)
      .eq("id", selectedQuote.id);

    if (error) return alert(error.message);

    const updated = { ...selectedQuote, ...updates };
    setSelectedQuote(updated);
    setQuotes((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
    alert("Quote saved.");
  }

  async function updateQuoteStatus(id, status) {
    const { error } = await supabase.from("quotes").update({ status }).eq("id", id);
    if (error) alert(error.message);
    else loadQuotes();
  }



  async function ensureQuoteApprovalToken(quote = selectedQuote) {
    if (!quote) return null;
    if (quote.approval_token) return quote.approval_token;

    const token =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const { error } = await supabase
      .from("quotes")
      .update({ approval_token: token })
      .eq("id", quote.id);

    if (error) {
      alert(error.message);
      return null;
    }

    const updated = { ...quote, approval_token: token };
    setSelectedQuote((prev) => (prev?.id === quote.id ? updated : prev));
    setQuotes((prev) => prev.map((q) => (q.id === quote.id ? updated : q)));
    return token;
  }

  async function openSendQuoteModal(quote = selectedQuote) {
    if (!quote) return alert("Open a quote first.");

    const opp = opps.find((o) => o.id === quote.opportunity_id);
    const soldTo = accounts.find((a) => a.id === (quote.sold_to_account_id || quoteEditor.sold_to_account_id));
    const emailTo = soldTo?.email || "";
    const token = await ensureQuoteApprovalToken(quote);
    const approvalLink = token ? `${window.location.origin}/approve/${token}` : "";

    setSelectedQuote({ ...quote, approval_token: token || quote.approval_token });
    setSendQuoteForm({
      to: emailTo,
      subject: `Arcoverre Quote ${quote.quote_number}${opp?.project_name ? ` - ${opp.project_name}` : ""}`,
      message:
        `Hi ${soldTo?.contact_person || soldTo?.account_name || ""},\n\n` +
        `Thank you for the opportunity to quote this project.\n\n` +
        `Attached/Included is quote ${quote.quote_number} for ${opp?.project_name || "your project"}.\n\n` +
        `You can approve the quote here:\n${approvalLink}\n\n` +
        `Please review it and let us know if you have any questions.\n\n` +
        `Best regards,\nArcoverre Team`,
    });
    setSendQuoteModal(true);
  }

  async function sendQuoteByEmail() {
    if (!selectedQuote) return alert("Open a quote first.");
    if (!sendQuoteForm.to) return alert("Add an email address first.");

    await markQuoteSent(selectedQuote, false);

    const mailto =
      `mailto:${encodeURIComponent(sendQuoteForm.to)}` +
      `?subject=${encodeURIComponent(sendQuoteForm.subject)}` +
      `&body=${encodeURIComponent(sendQuoteForm.message)}`;

    window.location.href = mailto;
    setSendQuoteModal(false);
  }

  async function markQuoteSent(quote = selectedQuote, showAlert = true) {
    if (!quote) return;

    const updates = {
      status: "Sent",
      sent_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("quotes")
      .update(updates)
      .eq("id", quote.id);

    if (error) return alert(error.message);

    const updated = { ...quote, ...updates };
    setSelectedQuote((prev) => (prev?.id === quote.id ? { ...prev, ...updates } : prev));
    setQuotes((prev) => prev.map((q) => (q.id === quote.id ? updated : q)));
    if (showAlert) alert("Quote marked as Sent.");
  }

  async function approveQuote(quote = selectedQuote) {
    if (!quote) return;

    const quoteUpdates = {
      status: "Approved",
      approved_at: new Date().toISOString(),
    };

    const { error: quoteError } = await supabase
      .from("quotes")
      .update(quoteUpdates)
      .eq("id", quote.id);

    if (quoteError) return alert(quoteError.message);

    const opportunityId = quote.opportunity_id;
    const { error: oppError } = await supabase
      .from("opportunities")
      .update({ status: "Quote Accepted" })
      .eq("id", opportunityId);

    if (oppError) return alert(oppError.message);

    const updatedQuote = { ...quote, ...quoteUpdates };
    setSelectedQuote((prev) => (prev?.id === quote.id ? { ...prev, ...quoteUpdates } : prev));
    setQuotes((prev) => prev.map((q) => (q.id === quote.id ? updatedQuote : q)));

    setOpps((prev) =>
      prev.map((o) =>
        o.id === opportunityId ? { ...o, status: "Quote Accepted" } : o
      )
    );

    if (selectedOpp?.id === opportunityId) {
      setSelectedOpp({ ...selectedOpp, status: "Quote Accepted" });
    }

    alert("Quote approved and opportunity moved to Quote Accepted.");
  }

  async function rejectQuote(quote = selectedQuote) {
    if (!quote) return;

    const updates = { status: "Rejected" };

    const { error } = await supabase
      .from("quotes")
      .update(updates)
      .eq("id", quote.id);

    if (error) return alert(error.message);

    const updated = { ...quote, ...updates };
    setSelectedQuote((prev) => (prev?.id === quote.id ? { ...prev, ...updates } : prev));
    setQuotes((prev) => prev.map((q) => (q.id === quote.id ? updated : q)));
    alert("Quote marked as Rejected.");
  }

  async function deleteQuote(quote) {
    const confirmed = confirm(`Delete quote "${quote.quote_number}"?`);
    if (!confirmed) return;

    const { error } = await supabase
      .from("quotes")
      .delete()
      .eq("id", quote.id);

    if (error) return alert(error.message);

    setQuotes((prev) => prev.filter((q) => q.id !== quote.id));

    if (selectedQuote?.id === quote.id) {
      setSelectedQuote(null);
      setView("quotes");
    }
  }

  async function openAccount(account) {
    setSidePanel(null);
    setSelectedAccount(account);
    setSelectedOpp(null);
    setSelectedQuote(null);
    setView("opportunities");
  }

  async function openOpp(opp) {
    setSidePanel(null);
    setSelectedOpp(opp);
    setSelectedQuote(null);
    await loadPhotos(opp.id);
    setView("opportunityDetail");
  }

  async function openQuote(quote) {
    setSidePanel(null);
    setSelectedQuoteTemplate("");
    setSelectedQuote(quote);
    setQuoteEditor({
      description: quote.description || "",
      sold_to_account_id: quote.sold_to_account_id || "",
      follow_up_date: quote.follow_up_date ? dateOnly(quote.follow_up_date) : "",
      follow_up_note: quote.follow_up_note || "",
      amount: quote.amount ? formatMoney(quote.amount) : "",
      status: quote.status || "Draft",
      product_summary: quote.product_summary || "",
      scope_of_work: quote.scope_of_work || "",
      add_deduct: quote.add_deduct || "",
      lead_time: quote.lead_time || "",
      warranty: quote.warranty || "",
      inclusions: quote.inclusions || "",
      exclusions: quote.exclusions || "",
      net_price: quote.net_price || quote.amount ? formatMoney(quote.net_price || quote.amount) : "",
    });
    await loadQuoteLineItems(quote.id);
    setView("quoteDetail");
  }

  async function loadPhotos(oppId) {
    const folder = `${session.user.id}/${oppId}`;
    const { data, error } = await supabase.storage.from("project-photos").list(folder);
    if (error) return;

    const urls = await Promise.all(
      (data || []).map(async (file) => {
        const path = `${folder}/${file.name}`;
        const { data: signed } = await supabase.storage
          .from("project-photos")
          .createSignedUrl(path, 3600);

        return { name: file.name, path, url: signed?.signedUrl };
      })
    );

    setPhotos(urls);
  }

  async function uploadPhoto(file) {
    if (!file || !selectedOpp) return;

    const path = `${session.user.id}/${selectedOpp.id}/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("project-photos")
      .upload(path, file);

    if (error) alert(error.message);
    else loadPhotos(selectedOpp.id);
  }

  async function deletePhoto(photo) {
    const confirmed = confirm("Delete this photo?");
    if (!confirmed) return;

    const { error } = await supabase.storage
      .from("project-photos")
      .remove([photo.path]);

    if (error) return alert(error.message);

    setPhotos((prev) => prev.filter((p) => p.path !== photo.path));
  }


  function applyQuoteTemplate(templateKey) {
    setSelectedQuoteTemplate(templateKey);
    if (!templateKey) return;

    const template = quoteTemplates[templateKey];
    if (!template) return;

    const confirmed =
      !quoteEditor.product_summary &&
      !quoteEditor.scope_of_work &&
      !quoteEditor.inclusions &&
      !quoteEditor.exclusions
        ? true
        : confirm("Apply this template? It will replace the current quote template fields.");

    if (!confirmed) return;

    setQuoteEditor((prev) => ({
      ...prev,
      product_summary: template.product_summary,
      scope_of_work: template.scope_of_work,
      inclusions: template.inclusions,
      exclusions: template.exclusions,
      warranty: template.warranty,
      lead_time: template.lead_time,
    }));
  }

  function printQuote() {
    window.print();
  }

  const normalizedSearch = searchTerm.toLowerCase().trim();

  const filteredAccounts = accounts.filter((a) =>
    [a.account_name, a.account_type, a.address, a.city, a.state, a.zip_code, a.contact_person, a.phone, a.email]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch)
  );

  const filteredOpps = opps.filter((o) => {
    const account = accounts.find((a) => a.id === o.account_id);
    return [
      o.project_name,
      o.city,
      o.address,
      o.status,
      o.opportunity_number,
      account?.account_name,
      account?.contact_person,
      account?.phone,
      account?.email,
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch);
  });

  const filteredQuotes = quotes.filter((q) => {
    const opp = opps.find((o) => o.id === q.opportunity_id);
    const account = opp ? accounts.find((a) => a.id === opp.account_id) : null;
    return [
      q.quote_number,
      q.description,
      q.status,
      opp?.project_name,
      opp?.opportunity_number,
      account?.account_name,
      account?.contact_person,
      account?.phone,
      account?.email,
    ]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch);
  });



  const filteredLeads = leads.filter((lead) =>
    [lead.full_name, lead.phone, lead.email, lead.service_interest, lead.project_details, lead.status]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch)
  );

  const searchResults = normalizedSearch
    ? {
        accounts: filteredAccounts.slice(0, 8),
        opportunities: filteredOpps.slice(0, 8),
        quotes: filteredQuotes.slice(0, 8),
        leads: filteredLeads.slice(0, 8),
      }
    : { accounts: [], opportunities: [], quotes: [] };

  const totalSearchResults =
    searchResults.accounts.length +
    searchResults.opportunities.length +
    searchResults.quotes.length +
    (searchResults.leads?.length || 0);

  function openSearchResultsPage() {
    if (!normalizedSearch) return;
    setShowSearchDropdown(false);
    setSidePanel(null);
    setView("searchResults");
  }

  const accountOpps = selectedAccount
    ? filteredOpps.filter((o) => o.account_id === selectedAccount.id)
    : filteredOpps;

  const oppQuotes = selectedOpp
    ? quotes.filter((q) => q.opportunity_id === selectedOpp.id)
    : [];

  const selectedOppAccount = selectedOpp
    ? accounts.find((a) => a.id === selectedOpp.account_id)
    : null;

  const selectedQuoteOpp = selectedQuote
    ? opps.find((o) => o.id === selectedQuote.opportunity_id)
    : null;

  const selectedQuoteAccount = selectedQuoteOpp
    ? accounts.find((a) => a.id === selectedQuoteOpp.account_id)
    : null;

  const selectedQuoteSoldToAccount = selectedQuote
    ? accounts.find((a) => a.id === (quoteEditor.sold_to_account_id || selectedQuote.sold_to_account_id))
    : null;

  const selectedQuoteCallLogs = selectedQuote
    ? callLogs.filter((log) => log.quote_id === selectedQuote.id)
    : [];

  const totalPipeline = opps.reduce((s, o) => s + cleanCurrency(o.estimated_value), 0);
  const totalQuotes = quotes.reduce((s, q) => s + cleanCurrency(q.amount), 0);

  const openOpps = opps.filter((o) => !["Closed Lost", "Convert to Order"].includes(o.status));
  const wonOpps = opps.filter((o) => ["Quote Accepted", "Convert to Order"].includes(o.status));
  const lostOpps = opps.filter((o) => o.status === "Closed Lost");
  const sentQuotes = quotes.filter((q) => q.status === "Sent");
  const approvedQuotes = quotes.filter((q) => q.status === "Approved");
  const draftQuotes = quotes.filter((q) => q.status === "Draft");

  const stageTotals = opportunityStages.map((stage) => {
    const stageOpps = opps.filter((o) => o.status === stage);
    const total = stageOpps.reduce((s, o) => s + cleanCurrency(o.estimated_value), 0);
    const weighted = stageOpps.reduce(
      (s, o) => s + cleanCurrency(o.estimated_value) * (stageProbability(stage) / 100),
      0
    );
    const percent = totalPipeline ? Math.round((total / totalPipeline) * 100) : 0;
    return {
      stage,
      count: stageOpps.length,
      total,
      weighted,
      percent,
      probability: stageProbability(stage),
    };
  });

  const activePipelineTotal = openOpps.reduce((s, o) => s + cleanCurrency(o.estimated_value), 0);
  const weightedPipelineTotal = openOpps.reduce(
    (s, o) => s + cleanCurrency(o.estimated_value) * (stageProbability(o.status) / 100),
    0
  );
  const acceptedPipelineTotal = opps
    .filter((o) => ["Quote Accepted", "Convert to Order"].includes(o.status))
    .reduce((s, o) => s + cleanCurrency(o.estimated_value), 0);
  const lostPipelineTotal = lostOpps.reduce((s, o) => s + cleanCurrency(o.estimated_value), 0);
  const conversionRate = opps.length
    ? Math.round((wonOpps.length / Math.max(wonOpps.length + lostOpps.length, 1)) * 100)
    : 0;

  const totalInvoiced = invoices.reduce((s, i) => s + cleanCurrency(i.amount), 0);
  const totalCollected = payments.reduce((s, p) => s + cleanCurrency(p.amount), 0);
  const outstandingBalance = invoices.reduce((s, i) => s + Math.max(invoiceBalance(i), 0), 0);
  const openInvoices = invoices.filter((i) => invoiceStatus(i) !== "Paid");

  const topAccounts = accounts
    .map((account) => {
      const accountOpportunities = opps.filter((o) => o.account_id === account.id);
      const total = accountOpportunities.reduce((s, o) => s + cleanCurrency(o.estimated_value), 0);
      return { ...account, total, count: accountOpportunities.length };
    })
    .filter((a) => a.total > 0 || a.count > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const quotesNeedingFollowUp = quotes
    .filter((q) => ["Draft", "Sent"].includes(q.status))
    .slice(0, 5);

  const followUpQuotes = quotes
    .filter((q) => q.follow_up_date && !["Approved", "Rejected"].includes(q.status))
    .sort((a, b) => new Date(a.follow_up_date) - new Date(b.follow_up_date));

  const overdueFollowUps = followUpQuotes.filter((q) => followUpStatus(q.follow_up_date).type === "overdue");
  const todayFollowUps = followUpQuotes.filter((q) => followUpStatus(q.follow_up_date).type === "today");
  const upcomingFollowUps = followUpQuotes.filter((q) => followUpStatus(q.follow_up_date).type === "upcoming");


  if (approvalToken) {
    return (
      <PublicApprovalPage
        quote={publicQuote}
        loading={publicApprovalLoading}
        message={publicApprovalMessage}
        approvalName={publicApprovalName}
        setApprovalName={setPublicApprovalName}
        onApprove={approvePublicQuote}
        formatMoney={formatMoney}
      />
    );
  }

  if (!session) {
    return (
      <div style={styles.loginPage}>
        <div style={styles.loginBox}>
          <img src="/arcoverre-logo.png" alt="Arcoverre" style={styles.loginLogo} />
          <input style={styles.input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input style={styles.input} placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button style={styles.goldBtn} onClick={login}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <style>
        {`
          html, body, #root {
            margin: 0;
            padding: 0;
            background: #0A0A09 !important;
            min-height: 100%;
            width: 100%;
            overflow-x: hidden;
          }

          * {
            box-sizing: border-box;
          }

          #root {
            display: flex;
            justify-content: center;
          }

          .record-drawer-safe h2,
          .record-drawer-safe h3,
          .record-drawer-safe p {
            color: #111827;
          }

          @media (max-width: 1100px) {
            body .dashboard-responsive { display: block; }
          }


          @media (max-width: 900px) {
            #root {
              display: block;
            }

            .no-print {
              max-width: 100vw;
            }

            button,
            input,
            select,
            textarea {
              font-size: 16px !important;
            }
          }

          @media (max-width: 760px) {
            [data-mobile-shell="true"] {
              width: 100vw !important;
              max-width: 100vw !important;
              margin: 0 !important;
              border-radius: 0 !important;
              overflow-x: hidden !important;
            }

            [data-mobile-topbar="true"] {
              display: flex !important;
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 12px !important;
              height: auto !important;
              min-height: auto !important;
              padding: 14px 16px !important;
              position: relative !important;
              z-index: 5 !important;
            }

            [data-mobile-topbar="true"] > * {
              width: 100% !important;
              max-width: 100% !important;
            }

            [data-mobile-topbar="true"] img {
              width: 120px !important;
              max-width: 120px !important;
              height: auto !important;
              display: block !important;
              margin: 0 auto !important;
            }

            [data-mobile-topbar="true"] input {
              width: 100% !important;
              height: 54px !important;
              font-size: 16px !important;
            }

            [data-mobile-topbar="true"] button {
              width: 100% !important;
              height: 48px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              margin: 0 !important;
              position: static !important;
            }

            [data-mobile-nav="true"] {
              display: flex !important;
              flex-wrap: wrap !important;
              justify-content: center !important;
              align-items: center !important;
              gap: 8px !important;
              padding: 12px 10px 16px !important;
              margin: 0 !important;
              height: auto !important;
              min-height: auto !important;
              position: relative !important;
              z-index: 4 !important;
              background: #161412 !important;
              border-top: 1px solid rgba(201,169,110,0.18) !important;
              border-bottom: 1px solid rgba(201,169,110,0.18) !important;
              overflow: visible !important;
              white-space: normal !important;
            }

            [data-mobile-nav="true"] button {
              flex: 0 1 auto !important;
              min-width: 118px !important;
              height: 44px !important;
              padding: 8px 13px !important;
              font-size: 15px !important;
              border-radius: 999px !important;
              margin: 0 !important;
            }

            [data-mobile-view="true"] {
              padding: 14px !important;
            }

            [data-mobile-dashboard-stats="true"],
            [data-mobile-focus="true"],
            [data-mobile-grid-large="true"],
            [data-mobile-grid-small="true"],
            [data-mobile-executive-grid="true"],
            [data-mobile-search-grid="true"],
            [data-mobile-summary-grid="true"] {
              display: grid !important;
              grid-template-columns: 1fr !important;
              gap: 12px !important;
            }

            [data-mobile-header="true"] {
              display: grid !important;
              grid-template-columns: 1fr !important;
              gap: 12px !important;
              align-items: stretch !important;
            }

            [data-mobile-header="true"] button {
              width: 100% !important;
            }

            [data-mobile-funnel-body="true"],
            [data-mobile-donut-wrap="true"],
            [data-mobile-two-col="true"],
            [data-mobile-four-col="true"] {
              display: grid !important;
              grid-template-columns: 1fr !important;
              gap: 12px !important;
            }

            [data-mobile-donut-chart="true"] {
              width: 210px !important;
              height: 210px !important;
            }

            [data-mobile-drawer="true"] {
              position: fixed !important;
              inset: auto 0 0 0 !important;
              width: 100vw !important;
              max-width: 100vw !important;
              height: 82vh !important;
              overflow-y: auto !important;
              border-radius: 22px 22px 0 0 !important;
              z-index: 1000 !important;
            }

            [data-mobile-table="true"] {
              overflow-x: auto !important;
              -webkit-overflow-scrolling: touch !important;
            }

            [data-mobile-quote-layout="true"] {
              display: grid !important;
              grid-template-columns: 1fr !important;
              gap: 14px !important;
            }

            [data-mobile-line-item-form="true"] {
              display: grid !important;
              grid-template-columns: 1fr !important;
            }

            [data-mobile-modal="true"] {
              width: 96vw !important;
              max-width: 96vw !important;
              max-height: 90vh !important;
            }
          }


          @media print {
            @page {
              size: letter;
              margin: 0.35in;
            }

            html, body, #root {
              background: #ffffff !important;
            }

            body * {
              visibility: hidden;
            }

            #printableQuote, #printableQuote * {
              visibility: visible;
            }

            #printableQuote {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              margin: 0 !important;
            }

            #printableQuote > div {
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              border-radius: 0 !important;
              box-shadow: none !important;
            }

            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      <div style={styles.pageShell} data-mobile-shell="true">
        <div className="no-print" style={styles.topbar} data-mobile-topbar="true">
          <div style={styles.brand}>
            <img src="/arcoverre-logo.png" alt="Arcoverre" style={styles.logoImg} />
          </div>
          <div style={styles.searchWrap}>
            <input
              style={styles.globalSearch}
              placeholder="Search accounts, opportunities, quotes..."
              value={searchTerm}
              onFocus={() => setShowSearchDropdown(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSearchDropdown(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") openSearchResultsPage();
                if (e.key === "Escape") setShowSearchDropdown(false);
              }}
            />

            {showSearchDropdown && normalizedSearch && (
              <div style={styles.searchDropdown}>
                <div style={styles.searchDropdownHeader}>
                  <strong>Search Results</strong>
                  <button style={styles.searchViewAllBtn} onClick={openSearchResultsPage}>
                    View All
                  </button>
                </div>


                <SearchGroup
                  title="Leads"
                  items={searchResults.leads || []}
                  emptyText="No leads found"
                  renderItem={(lead) => (
                    <button style={styles.searchResultItem} onClick={() => { openLead(lead); setShowSearchDropdown(false); }}>
                      <strong>{lead.full_name}</strong>
                      <span>{lead.service_interest || "Lead"} · {lead.status || "New Lead"}</span>
                    </button>
                  )}
                />

                <SearchGroup
                  title="Accounts"
                  items={searchResults.accounts}
                  emptyText="No accounts found"
                  renderItem={(a) => (
                    <button style={styles.searchResultItem} onClick={() => { setSelectedAccount(a); setSidePanel("account"); setShowSearchDropdown(false); }}>
                      <strong>{a.account_name}</strong>
                      <span>{[a.city, a.state, a.zip_code].filter(Boolean).join(", ") || a.account_type || "Account"}</span>
                    </button>
                  )}
                />

                <SearchGroup
                  title="Opportunities"
                  items={searchResults.opportunities}
                  emptyText="No opportunities found"
                  renderItem={(o) => (
                    <button style={styles.searchResultItem} onClick={() => { setSelectedOpp(o); setSelectedQuote(null); setSidePanel("opportunity"); loadPhotos(o.id); setShowSearchDropdown(false); }}>
                      <strong>{o.project_name}</strong>
                      <span>{o.status} · {formatMoney(o.estimated_value)}</span>
                    </button>
                  )}
                />

                <SearchGroup
                  title="Quotes"
                  items={searchResults.quotes}
                  emptyText="No quotes found"
                  renderItem={(q) => {
                    const opp = opps.find((o) => o.id === q.opportunity_id);
                    const soldTo = accounts.find((a) => a.id === q.sold_to_account_id);
                    return (
                      <button style={styles.searchResultItem} onClick={() => { openQuote(q); setShowSearchDropdown(false); }}>
                        <strong>{q.quote_number}</strong>
                        <span>{soldTo?.account_name || "Sold To"} · {opp?.project_name || "Project"} · {formatMoney(q.amount)}</span>
                      </button>
                    );
                  }}
                />
              </div>
            )}
          </div>
          <button style={styles.outlineBtn} onClick={logout}>Logout</button>
        </div>

        <div className="no-print" style={styles.nav} data-mobile-nav="true">
          {["home", "leads", "accounts", "opportunities", "quotes", "projects", "invoices", "products"].map((v) => (
            <button key={v} style={view === v ? styles.navActive : styles.navBtn} onClick={() => setView(v)}>
              {v === "home" ? "Home" : v[0].toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

        {view === "home" && (
          <div className="no-print" style={styles.dashboardPage} data-mobile-view="true">
            <div style={styles.dashboardHeader}>
              <div>
                <p style={styles.sfObjectLabel}>Dashboard</p>
                <h2 style={styles.dashboardTitle}>Arcoverre Sales Dashboard</h2>
                <p style={styles.dashboardSubtext}>Pipeline health, quote activity, and follow-up priorities in one place.</p>
              </div>
              <button style={styles.refreshBtn} onClick={loadAll}>↻ Refresh</button>
            </div>

            <div style={styles.dashboardFocusStrip} data-mobile-focus="true">
              <div style={styles.focusItem}>
                <span>Today’s Focus</span>
                <strong>{overdueFollowUps.length + todayFollowUps.length > 0 ? "Follow up required" : "Pipeline is clear today"}</strong>
              </div>
              <div style={styles.focusItem}>
                <span>Open Opportunities</span>
                <strong>{openOpps.length}</strong>
              </div>
              <div style={styles.focusItem}>
                <span>Quotes Sent</span>
                <strong>{sentQuotes.length}</strong>
              </div>
              <div style={styles.focusItem}>
                <span>Outstanding Balance</span>
                <strong>{formatMoney(outstandingBalance)}</strong>
              </div>
            </div>

            <div style={styles.dashboardStatsGrid} data-mobile-dashboard-stats="true">
              <DashboardMetric title="Active Pipeline" value={formatMoney(activePipelineTotal)} caption={`${openOpps.length} active opportunities`} />
              <DashboardMetric title="Weighted Forecast" value={formatMoney(weightedPipelineTotal)} caption="Based on stage probability" />
              <DashboardMetric title="Accepted" value={formatMoney(acceptedPipelineTotal)} caption={`${wonOpps.length} accepted opportunities`} />
              <DashboardMetric title="Needs Follow Up" value={overdueFollowUps.length + todayFollowUps.length} caption={`${overdueFollowUps.length} overdue · ${todayFollowUps.length} due today`} />
            </div>

            <div style={styles.dashboardSectionHeader}>
              <h3>Pipeline Overview</h3>
              <p>Track value by stage and expected revenue.</p>
            </div>

            <div style={styles.executivePipelineGrid} data-mobile-executive-grid="true">
              <div style={styles.funnelPanel}>
                <div style={styles.funnelHeader}>
                  <div>
                    <h3 style={styles.funnelTitle}>Sales Pipeline Funnel</h3>
                    <p style={styles.funnelSubtitle}>Amount by opportunity stage and weighted forecast</p>
                  </div>
                  <div style={styles.funnelTotalPill}>
                    <span>Total Pipeline</span>
                    <strong>{formatMoney(activePipelineTotal)}</strong>
                  </div>
                </div>

                <div style={styles.funnelStatsRow}>
                  <div style={styles.funnelStatCard}>
                    <span>Weighted Forecast</span>
                    <strong>{formatMoney(weightedPipelineTotal)}</strong>
                  </div>
                  <div style={styles.funnelStatCard}>
                    <span>Accepted</span>
                    <strong>{formatMoney(acceptedPipelineTotal)}</strong>
                  </div>
                  <div style={styles.funnelStatCard}>
                    <span>Lost</span>
                    <strong>{formatMoney(lostPipelineTotal)}</strong>
                  </div>
                  <div style={styles.funnelStatCard}>
                    <span>Win Rate</span>
                    <strong>{conversionRate}%</strong>
                  </div>
                </div>

                <div style={styles.funnelBody} data-mobile-funnel-body="true">
                  <div style={styles.funnelShapeWrap}>
                    {stageTotals.map((item, index) => (
                      <button
                        key={item.stage}
                        style={{
                          ...styles.funnelSegment,
                          width: `${100 - index * 8}%`,
                          background: funnelColors[index % funnelColors.length],
                        }}
                        onClick={() => setView("opportunities")}
                      >
                        <span>{item.stage}</span>
                        <strong>{formatMoney(item.total)}</strong>
                      </button>
                    ))}
                  </div>

                  <div style={styles.funnelNumbers}>
                    <div style={styles.funnelNumbersHead}>
                      <span>Stage</span>
                      <span>Probability</span>
                      <span>Weighted</span>
                    </div>
                    {stageTotals.map((item) => (
                      <div key={item.stage} style={styles.funnelNumberRow}>
                        <span>{item.count} opps</span>
                        <strong>{item.probability}%</strong>
                        <em>{formatMoney(item.weighted)}</em>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.funnelTip}>
                  <span>💡</span>
                  <p>Tip: Focus on moving opportunities from Prospect into Proposal Delivery and follow up on quotes due today.</p>
                </div>
              </div>

              <div style={styles.donutPanel}>
                <div style={styles.funnelHeader}>
                  <div>
                    <h3 style={styles.funnelTitle}>Pipeline Mix</h3>
                    <p style={styles.funnelSubtitle}>Visual breakdown by stage</p>
                  </div>
                </div>

                <div style={styles.donutWrap} data-mobile-donut-wrap="true">
                  <div style={{
                    ...styles.donutChart,
                    background: buildDonutGradient(stageTotals),
                  }}>
                    <div style={styles.donutCenter}>
                      <span>Total</span>
                      <strong>{formatMoney(activePipelineTotal).replace(".00", "")}</strong>
                    </div>
                  </div>

                  <div style={styles.donutLegend}>
                    {stageTotals.map((item, index) => (
                      <div key={item.stage} style={styles.donutLegendRow}>
                        <i style={{ background: funnelColors[index % funnelColors.length] }}></i>
                        <span>{item.stage}</span>
                        <strong>{item.percent}%</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <button style={styles.fullReportBtn} onClick={() => setView("opportunities")}>
                  View Opportunities →
                </button>
              </div>
            </div>

            <div style={styles.dashboardSectionHeaderClean}>
              <div>
                <h3>Sales Activity</h3>
                <p>Recent opportunities, top accounts, invoices, and quote movement.</p>
              </div>
            </div>

            <div style={styles.dashboardGridSmall} data-mobile-grid-small="true">
              <div style={styles.dashboardCard}>
                <div style={styles.cleanCardTop}>
                  <div>
                    <h3 style={styles.cardTitle}>Recent Opportunities</h3>
                    <p style={styles.cardSubtitle}>Latest active project opportunities</p>
                  </div>
                  <button style={styles.cleanCardAction} onClick={() => setView("opportunities")}>View All →</button>
                </div>
                <DataTable
                  columns={["Opportunity", "Account", "Stage", "Amount"]}
                  rows={filteredOpps.slice(0, 8).map((o) => [
                    <button style={styles.recordLink} onClick={() => { setSelectedOpp(o); setSelectedQuote(null); setSidePanel("opportunity"); loadPhotos(o.id); }}>{o.project_name}</button>,
                    accounts.find((a) => a.id === o.account_id)?.account_name || "—",
                    o.status,
                    formatMoney(o.estimated_value),
                  ])}
                />
              </div>


              <div style={styles.dashboardCard}>
                <div style={styles.cleanCardTop}>
                  <div>
                    <h3 style={styles.cardTitle}>Pipeline Health</h3>
                    <p style={styles.cardSubtitle}>Current opportunity performance</p>
                  </div>
                </div>
                <div style={styles.pipelineHealthList}>
                  <div style={styles.pipelineHealthRow}><span>Active Opportunities</span><strong>{openOpps.length}</strong></div>
                  <div style={styles.pipelineHealthRow}><span>Accepted / Won</span><strong>{wonOpps.length}</strong></div>
                  <div style={styles.pipelineHealthRow}><span>Closed Lost</span><strong>{lostOpps.length}</strong></div>
                  <div style={styles.pipelineHealthRow}><span>Win Rate</span><strong>{conversionRate}%</strong></div>
                </div>
              </div>

              <div style={styles.dashboardCard}>
                <div style={styles.cleanCardTop}>
                  <div>
                    <h3 style={styles.cardTitle}>Top Accounts</h3>
                    <p style={styles.cardSubtitle}>Highest opportunity value</p>
                  </div>
                  <button style={styles.cleanCardAction} onClick={() => setView("accounts")}>View All →</button>
                </div>
                {topAccounts.length === 0 ? (
                  <p style={styles.emptyState}>No account pipeline yet.</p>
                ) : (
                  topAccounts.map((a) => (
                    <button key={a.id} style={styles.dashboardListRow} onClick={() => { setSelectedAccount(a); setSidePanel("account"); }}>
                      <div>
                        <strong>{a.account_name}</strong>
                        <span>{a.count} opportunities</span>
                      </div>
                      <em>{formatMoney(a.total)}</em>
                    </button>
                  ))
                )}
              </div>


              <div style={styles.dashboardCard}>
                <div style={styles.cleanCardTop}>
                  <div>
                    <h3 style={styles.cardTitle}>Open Invoices</h3>
                    <p style={styles.cardSubtitle}>Outstanding balances and payment status</p>
                  </div>
                  <button style={styles.cleanCardAction} onClick={() => setView("invoices")}>View All →</button>
                </div>
                {openInvoices.length === 0 ? (
                  <p style={styles.emptyState}>No open invoices.</p>
                ) : (
                  openInvoices.slice(0, 6).map((invoice) => {
                    const project = (projects || []).find((p) => p.id === invoice.project_id);
                    return (
                      <button key={invoice.id} style={styles.dashboardListRow} onClick={() => onOpenInvoice(invoice)}>
                        <div>
                          <strong>{invoice.invoice_number}</strong>
                          <span>{project?.project_name || "Project"} · {invoiceStatus(invoice)}</span>
                        </div>
                        <em>{formatMoney(invoiceBalance(invoice))}</em>
                      </button>
                    );
                  })
                )}
              </div>

              <div style={styles.dashboardCard}>
                <div style={styles.cleanCardTop}>
                  <div>
                    <h3 style={styles.cardTitle}>Recent Quotes</h3>
                    <p style={styles.cardSubtitle}>Most recent quote activity</p>
                  </div>
                  <button style={styles.cleanCardAction} onClick={() => setView("quotes")}>View All →</button>
                </div>
                {filteredQuotes.slice(0, 6).map((q) => {
                  const opp = opps.find((o) => o.id === q.opportunity_id);
                  return (
                    <button key={q.id} style={styles.dashboardListRow} onClick={() => openQuote(q)}>
                      <div>
                        <strong>{q.quote_number}</strong>
                        <span>{opp?.project_name || "Project"} · {q.status}</span>
                      </div>
                      <em>{formatMoney(q.amount)}</em>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}


        {view === "leads" && (
          <div className="no-print" style={styles.viewArea} data-mobile-view="true">
            <div style={styles.sfListHeader} data-mobile-header="true">
              <div>
                <p style={styles.sfObjectLabel}>Lead Intake</p>
                <h2 style={styles.sfListTitle}>Leads</h2>
              </div>
              <button style={styles.goldBtn} onClick={() => setLeadModalOpen(true)}>+ New Lead</button>
            </div>

            <DataTable
              columns={["Name", "Phone", "Email", "Service", "Status", "Created", "Actions"]}
              rows={leads.map((lead) => [
                <button style={styles.recordLink} onClick={() => openLead(lead)}>{lead.full_name || "—"}</button>,
                <PhoneText phone={lead.phone} />,
                <EmailLink email={lead.email} />,
                lead.service_interest || "—",
                <StatusPill status={lead.status || "New Lead"} />,
                lead.created_at ? new Date(lead.created_at).toLocaleDateString() : "—",
                <ActionGroup>
                  <button style={styles.smallBtn} onClick={() => openLead(lead)}>Preview</button>
                  <button style={styles.smallBtn} onClick={() => openLeadFollowUpEmail(lead)}>Email</button>
                  <button style={styles.goldBtn} onClick={() => convertLeadToOpportunityQuote(lead)}>Convert</button>
                  <button style={styles.dangerBtn} onClick={() => deleteLead(lead)}>Delete</button>
                </ActionGroup>,
              ])}
            />
          </div>
        )}

        {view === "accounts" && (
          <div className="no-print" style={styles.viewArea} data-mobile-view="true">
            <div style={styles.sfListHeader} data-mobile-header="true">
              <div>
                <p style={styles.sfObjectLabel}>Accounts</p>
                <h2 style={styles.sfListTitle}>All Accounts</h2>
              </div>
              <button style={styles.goldBtn} onClick={() => setAccountModalOpen(true)}>+ New Account</button>
            </div>


            <DataTable
              columns={["Account Name", "Type", "Address", "City", "State", "Zip", "Contact", "Phone", "Email", "Actions"]}
              rows={filteredAccounts.map((a) => [
                <button style={styles.recordLink} onClick={() => { setSelectedAccount(a); setSidePanel("account"); }}>{a.account_name}</button>,
                a.account_type,
                a.address || "—",
                a.city || "—",
                a.state || "—",
                a.zip_code || "—",
                a.contact_person || "—",
                <PhoneText phone={a.phone} />,
                <EmailLink email={a.email} />,
                <ActionGroup>
                  <button style={styles.smallBtn} onClick={() => { setSelectedAccount(a); setSidePanel("account"); }}>Preview</button>
                  <button style={styles.smallBtn} onClick={() => editAccount(a)}>Edit</button>
                  <button style={styles.dangerBtn} onClick={() => deleteAccount(a)}>Delete</button>
                </ActionGroup>,
              ])}
            />
          </div>
        )}

        {view === "opportunities" && (
          <div className="no-print" style={styles.viewArea} data-mobile-view="true">
            <div style={styles.recordHeader}>
              <div><p style={styles.sfObjectLabel}>Opportunities</p><h2 style={styles.sfListTitle}>{selectedAccount ? `${selectedAccount.account_name} Opportunities` : "All Opportunities"}</h2></div>
              {selectedAccount && <button style={styles.outlineBtn} onClick={() => setSelectedAccount(null)}>View All</button>}
            </div>

            {selectedAccount && (
              <div style={styles.formBar}>
                <input style={styles.input} placeholder="Opportunity Name" value={oppForm.project_name} onChange={(e) => setOppForm({ ...oppForm, project_name: e.target.value })} />
                <input style={styles.input} placeholder="Address" value={oppForm.address} onChange={(e) => setOppForm({ ...oppForm, address: e.target.value })} />
                <input style={styles.input} placeholder="City" value={oppForm.city} onChange={(e) => setOppForm({ ...oppForm, city: e.target.value })} />
                <select style={styles.inputSmall} value={oppForm.state} onChange={(e) => setOppForm({ ...oppForm, state: e.target.value })}>
                  <option value="">State</option>
                  {usStates.map((state) => <option key={state} value={state}>{state}</option>)}
                </select>
                <input style={styles.inputSmall} placeholder="Zip Code" value={oppForm.zip_code} onChange={(e) => setOppForm({ ...oppForm, zip_code: e.target.value })} />
                <input style={styles.input} placeholder="Estimated Value" value={oppForm.estimated_value} onChange={(e) => setOppForm({ ...oppForm, estimated_value: formatCurrencyInput(e.target.value) })} />
                <button style={styles.goldBtn} onClick={addOpp}>New Opportunity</button>
              </div>
            )}

            <DataTable
              columns={["Opportunity Name", "Account Name", "Stage", "Amount", "Actions"]}
              rows={accountOpps.map((o) => [
                <button style={styles.recordLink} onClick={() => { setSelectedOpp(o); setSelectedQuote(null); setSidePanel("opportunity"); loadPhotos(o.id); }}>{o.project_name}</button>,
                accounts.find((a) => a.id === o.account_id)?.account_name || "—",
                o.status,
                formatMoney(o.estimated_value),
                <ActionGroup>
                  <button style={styles.smallBtn} onClick={() => { setSelectedOpp(o); setSelectedQuote(null); setSidePanel("opportunity"); loadPhotos(o.id); }}>Preview</button>
                  <button style={styles.smallBtn} onClick={() => editOpp(o)}>Edit</button>
                  <button style={styles.dangerBtn} onClick={() => deleteOpp(o)}>Delete</button>
                </ActionGroup>,
              ])}
            />
          </div>
        )}

        {view === "quotes" && (
          <div className="no-print" style={styles.viewArea} data-mobile-view="true">
            <div style={styles.sfListHeader} data-mobile-header="true"><div><p style={styles.sfObjectLabel}>Quotes</p><h2 style={styles.sfListTitle}>All Quotes</h2></div></div>
            <DataTable
              columns={["Quote #", "Opportunity", "Sold To", "Status", "Follow-Up", "Amount", "Actions"]}
              rows={filteredQuotes.map((q) => {
                const opp = opps.find((o) => o.id === q.opportunity_id);
                return [
                  <button style={styles.recordLink} onClick={() => { setSelectedQuote(q); setSidePanel("quote"); }}>{q.quote_number}</button>,
                  opp?.project_name || "—",
                  accounts.find((a) => a.id === q.sold_to_account_id)?.account_name || "—",
                  q.status,
                  q.follow_up_date ? `${new Date(q.follow_up_date).toLocaleDateString()} · ${followUpStatus(q.follow_up_date).label}` : "—",
                  formatMoney(q.amount),
                  <ActionGroup>
                    <button style={styles.smallBtn} onClick={() => { setSelectedQuote(q); setSidePanel("quote"); }}>Preview</button>
                    <button style={styles.dangerBtn} onClick={() => deleteQuote(q)}>Delete</button>
                  </ActionGroup>,
                ];
              })}
            />
          </div>
        )}




        {view === "projects" && (
          <div className="no-print" style={styles.viewArea} data-mobile-view="true">
            <div style={styles.sfListHeader} data-mobile-header="true">
              <div>
                <p style={styles.sfObjectLabel}>Operations</p>
                <h2 style={styles.sfListTitle}>Projects</h2>
              </div>
              <div style={styles.sfHeaderHint}>Approved quotes converted to work</div>
            </div>

            <DataTable
              columns={["Project #", "Project Name", "Sold To", "Ship To", "Status", "Amount", "Location", "Actions"]}
              rows={projects.map((p) => {
                const soldTo = accounts.find((a) => a.id === p.sold_to_account_id);
                const shipTo = accounts.find((a) => a.id === p.ship_to_account_id);
                const quote = quotes.find((q) => q.id === p.quote_id);

                return [
                  <button style={styles.recordLink} onClick={() => openProject(p)}>{p.project_number || "—"}</button>,
                  <button style={styles.recordLink} onClick={() => openProject(p)}>{p.project_name || "—"}</button>,
                  soldTo?.account_name || "—",
                  shipTo?.account_name || "—",
                  <StatusPill status={p.status || "In Progress"} />,
                  formatMoney(p.total_amount),
                  [p.city, p.state, p.zip_code].filter(Boolean).join(", ") || "—",
                  <ActionGroup>
                    <button style={styles.smallBtn} onClick={() => openProject(p)}>Preview</button>
                    {quote && <button style={styles.smallBtn} onClick={() => openQuote(quote)}>Open Quote</button>}
                  </ActionGroup>,
                ];
              })}
            />
          </div>
        )}


        {view === "invoices" && (
          <div className="no-print" style={styles.viewArea} data-mobile-view="true">
            <div style={styles.sfListHeader} data-mobile-header="true">
              <div>
                <p style={styles.sfObjectLabel}>Financials</p>
                <h2 style={styles.sfListTitle}>Invoices</h2>
              </div>
              <div style={styles.sfHeaderHint}>Track deposits, balances, and payments</div>
            </div>

            <div style={styles.invoiceSummaryGrid} data-mobile-summary-grid="true">
              <div style={styles.invoiceSummaryCard}>
                <span>Total Invoiced</span>
                <strong>{formatMoney(totalInvoiced)}</strong>
              </div>
              <div style={styles.invoiceSummaryCard}>
                <span>Collected</span>
                <strong>{formatMoney(totalCollected)}</strong>
              </div>
              <div style={styles.invoiceSummaryCard}>
                <span>Outstanding</span>
                <strong>{formatMoney(outstandingBalance)}</strong>
              </div>
              <div style={styles.invoiceSummaryCard}>
                <span>Open Invoices</span>
                <strong>{openInvoices.length}</strong>
              </div>
            </div>

            <DataTable
              columns={["Invoice #", "Project", "Status", "Amount", "Paid", "Balance", "Due Date", "Actions"]}
              rows={invoices.map((invoice) => {
                const project = (projects || []).find((p) => p.id === invoice.project_id);

                return [
                  <button style={styles.recordLink} onClick={() => onOpenInvoice(invoice)}>{invoice.invoice_number}</button>,
                  project?.project_name || "—",
                  <StatusPill status={invoiceStatus(invoice)} />,
                  formatMoney(invoice.amount),
                  formatMoney(invoicePaidTotal(invoice.id)),
                  formatMoney(invoiceBalance(invoice)),
                  invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "—",
                  <ActionGroup>
                    <button style={styles.smallBtn} onClick={() => onOpenInvoice(invoice)}>Preview</button>
                    <button style={styles.smallBtn} onClick={() => markInvoiceSent(invoice)}>Mark Sent</button>
                    <button style={styles.dangerBtn} onClick={() => deleteInvoice(invoice)}>Delete</button>
                  </ActionGroup>,
                ];
              })}
            />
          </div>
        )}

        {view === "products" && (
          <div className="no-print" style={styles.viewArea} data-mobile-view="true">
            <div style={styles.sfListHeader} data-mobile-header="true">
              <div>
                <p style={styles.sfObjectLabel}>Price Book</p>
                <h2 style={styles.sfListTitle}>Product Catalog</h2>
              </div>
              <button style={styles.goldBtn} onClick={() => setProductModalOpen(true)}>+ New Product</button>
            </div>



            <DataTable
              columns={["Category", "Product", "Description", "Unit Price", "Status", "Actions"]}
              rows={products.map((p) => [
                p.category || "—",
                p.product_name || "—",
                p.description || "—",
                formatMoney(p.unit_price),
                p.is_active === false ? "Inactive" : "Active",
                <ActionGroup>
                  <button style={styles.smallBtn} onClick={() => editProduct(p)}>Edit</button>
                  <button style={styles.dangerBtn} onClick={() => deleteProduct(p)}>Delete</button>
                </ActionGroup>,
              ])}
            />
          </div>
        )}

        {view === "searchResults" && (
          <div className="no-print" style={styles.viewArea} data-mobile-view="true">
            <div style={styles.sfListHeader} data-mobile-header="true">
              <div>
                <p style={styles.sfObjectLabel}>Global Search</p>
                <h2 style={styles.sfListTitle}>Results for “{searchTerm}”</h2>
              </div>
              <div style={styles.sfHeaderHint}>{totalSearchResults} results found</div>
            </div>

            <div style={styles.searchResultsGrid} data-mobile-search-grid="true">
              <SearchResultsCard title="Accounts">
                {filteredAccounts.length === 0 ? (
                  <p style={styles.emptyState}>No accounts found.</p>
                ) : (
                  filteredAccounts.map((a) => (
                    <button key={a.id} style={styles.searchFullRow} onClick={() => { setSelectedAccount(a); setSidePanel("account"); }}>
                      <div>
                        <strong>{a.account_name}</strong>
                        <span>{a.account_type} · {[a.address, a.city, a.state, a.zip_code].filter(Boolean).join(", ")}</span>
                      </div>
                      <em>{formatPhone(a.phone)}</em>
                    </button>
                  ))
                )}
              </SearchResultsCard>

              <SearchResultsCard title="Opportunities">
                {filteredOpps.length === 0 ? (
                  <p style={styles.emptyState}>No opportunities found.</p>
                ) : (
                  filteredOpps.map((o) => {
                    const account = accounts.find((a) => a.id === o.account_id);
                    return (
                      <button key={o.id} style={styles.searchFullRow} onClick={() => { setSelectedOpp(o); setSelectedQuote(null); setSidePanel("opportunity"); loadPhotos(o.id); }}>
                        <div>
                          <strong>{o.project_name}</strong>
                          <span>{account?.account_name || "Ship To"} · {o.status}</span>
                        </div>
                        <em>{formatMoney(o.estimated_value)}</em>
                      </button>
                    );
                  })
                )}
              </SearchResultsCard>

              <SearchResultsCard title="Quotes">
                {filteredQuotes.length === 0 ? (
                  <p style={styles.emptyState}>No quotes found.</p>
                ) : (
                  filteredQuotes.map((q) => {
                    const opp = opps.find((o) => o.id === q.opportunity_id);
                    const soldTo = accounts.find((a) => a.id === q.sold_to_account_id);
                    return (
                      <button key={q.id} style={styles.searchFullRow} onClick={() => openQuote(q)}>
                        <div>
                          <strong>{q.quote_number}</strong>
                          <span>{soldTo?.account_name || "Sold To"} · {opp?.project_name || "Project"} · {q.status}</span>
                        </div>
                        <em>{formatMoney(q.amount)}</em>
                      </button>
                    );
                  })
                )}
              </SearchResultsCard>
            </div>
          </div>
        )}

        {view === "opportunityDetail" && selectedOpp && (
          <div className="no-print" style={styles.viewArea} data-mobile-view="true">
            <button style={{ ...styles.outlineBtn, margin: "20px 28px 0" }} onClick={() => setView("opportunities")}>Back</button>

            <div style={styles.detailHeader}>
              <div>
                <p style={styles.objectLabel}>Opportunity</p>
                <h2>{selectedOpp.project_name}</h2>
                <p>{selectedOpp.opportunity_number}</p>
                <p>{selectedOppAccount?.account_name}</p>
                <button style={styles.goldBtn} onClick={() => createQuoteFromOpportunity(selectedOpp)}>Create Quote</button>
              </div>
              <div style={styles.amountBox}>
                <span>{formatMoney(selectedOpp.estimated_value)}</span>
                <small>{stageProbability(selectedOpp.status)}% · Weighted {formatMoney(cleanCurrency(selectedOpp.estimated_value) * (stageProbability(selectedOpp.status) / 100))}</small>
              </div>
            </div>

            <StagePath currentStage={selectedOpp.status} onStageClick={updateOppStage} />

            <div style={styles.detailGrid}>
              <div style={styles.detailPanel}>
                <h3>Create Quote</h3>
                <div style={styles.formBarNoPad}>
                  <select style={styles.input} value={quoteForm.sold_to_account_id} onChange={(e) => setQuoteForm({ ...quoteForm, sold_to_account_id: e.target.value })}>
                    <option value="">Sold To Account</option>
                    {accounts.map((a) => <option key={a.id} value={a.id}>{a.account_name}</option>)}
                  </select>
                  <select style={styles.input} value={quoteForm.template_key || ""} onChange={(e) => setQuoteForm({ ...quoteForm, template_key: e.target.value })}>
                    <option value="">Quote Template</option>
                    {Object.entries(quoteTemplates).map(([key, template]) => (
                      <option key={key} value={key}>{template.label}</option>
                    ))}
                  </select>
                  <input style={styles.input} placeholder="Quote Description" value={quoteForm.description} onChange={(e) => setQuoteForm({ ...quoteForm, description: e.target.value })} />
                  <input style={styles.input} placeholder="Amount" value={quoteForm.amount} onChange={(e) => setQuoteForm({ ...quoteForm, amount: formatCurrencyInput(e.target.value) })} />
                  <input style={styles.input} type="date" value={quoteForm.follow_up_date} onChange={(e) => setQuoteForm({ ...quoteForm, follow_up_date: e.target.value })} />
                  <input style={styles.input} placeholder="Follow-up note" value={quoteForm.follow_up_note} onChange={(e) => setQuoteForm({ ...quoteForm, follow_up_note: e.target.value })} />
                  <button style={styles.goldBtn} onClick={addQuote}>Add Quote</button>
                </div>

                <h3>Quotes</h3>
                {oppQuotes.map((q) => (
                  <div key={q.id} style={styles.miniCard}>
                    <button style={styles.linkBtn} onClick={() => openQuote(q)}>{q.quote_number}</button>
                    <p>{q.description}</p>
                    <p>{formatMoney(q.amount)} · {q.status}</p>
                    <ActionGroup>
                      <button style={styles.smallBtn} onClick={() => openQuote(q)}>Edit Quote</button>
                      <button style={styles.statusMiniSent} onClick={() => markQuoteSent(q)}>Sent</button>
                      <button style={styles.statusMiniApproved} onClick={() => approveQuote(q)}>Approved</button>
                      <button style={styles.smallBtn} onClick={() => rejectQuote(q)}>Rejected</button>
                      <button style={styles.dangerBtn} onClick={() => deleteQuote(q)}>Delete</button>
                    </ActionGroup>
                  </div>
                ))}
              </div>

              <div style={styles.detailPanel}>
                <h3>Photos / Files</h3>
                <input type="file" accept="image/*" onChange={(e) => uploadPhoto(e.target.files[0])} />
                <div style={styles.photoGrid}>
                  {photos.map((p) => (
                    <div key={p.path} style={styles.photoCard}>
                      <img
                        src={p.url}
                        alt={p.name}
                        style={styles.photoThumb}
                        onClick={() => setLightboxPhoto(p.url)}
                      />
                      <button style={styles.dangerBtnFull} onClick={() => deletePhoto(p)}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === "quoteDetail" && selectedQuote && (
          <>
            <div className="no-print" style={styles.quoteToolbar}>
              <button style={styles.outlineBtn} onClick={() => setView("quotes")}>Back</button>
              <button style={styles.goldBtn} onClick={saveQuoteDetails}>Save Quote Details</button>
              <button style={styles.sendQuoteBtn} onClick={() => openSendQuoteModal(selectedQuote)}>Send Quote</button>
              <button style={styles.statusBtnSent} onClick={() => markQuoteSent(selectedQuote)}>Mark Sent</button>
              <button style={styles.statusBtnApproved} onClick={() => approveQuote(selectedQuote)}>Approve Quote</button>
              <button style={styles.convertProjectBtn} onClick={() => convertQuoteToProject(selectedQuote)}>Convert to Project</button>
              <button style={styles.goldBtn} onClick={printQuote}>Print / Save PDF</button>
            </div>

            <div className="no-print" style={styles.quoteDetailGrid}>
              <div style={styles.detailPanel}>
                <div style={styles.quoteBuilderHeader}>
                  <h2>Quote Builder</h2>
                  <div style={styles.templatePicker}>
                    <label style={styles.templateLabel}>Template</label>
                    <select
                      style={styles.templateSelect}
                      value={selectedQuoteTemplate}
                      onChange={(e) => applyQuoteTemplate(e.target.value)}
                    >
                      <option value="">Choose Quote Template</option>
                      {Object.entries(quoteTemplates).map(([key, template]) => (
                        <option key={key} value={key}>{template.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={styles.templateQuickRow}>
                  {Object.entries(quoteTemplates).map(([key, template]) => (
                    <button
                      key={key}
                      style={selectedQuoteTemplate === key ? styles.templateQuickActive : styles.templateQuickBtn}
                      onClick={() => applyQuoteTemplate(key)}
                    >
                      {template.label}
                    </button>
                  ))}
                </div>

                <div style={styles.fieldBlock}>
                  <label style={styles.fieldLabel}>Sold To Account</label>
                  <select style={styles.inputWide} value={quoteEditor.sold_to_account_id || ""} onChange={(e) => setQuoteEditor({ ...quoteEditor, sold_to_account_id: e.target.value })}>
                    <option value="">Sold To Account</option>
                    {accounts.map((a) => <option key={a.id} value={a.id}>{a.account_name}</option>)}
                  </select>
                </div>
                <div style={styles.followUpEditorBox}>
                  <div style={styles.followUpEditorTop}>
                    <div>
                      <label style={styles.fieldLabel}>Next Follow-Up Date</label>
                      <input
                        style={styles.inputWide}
                        type="date"
                        value={quoteEditor.follow_up_date || ""}
                        onChange={(e) => setQuoteEditor({ ...quoteEditor, follow_up_date: e.target.value })}
                      />
                    </div>
                    <div style={styles.followUpStatusBox}>
                      <span>Follow-Up Status</span>
                      <strong>{followUpStatus(quoteEditor.follow_up_date).label}</strong>
                    </div>
                  </div>

                  <label style={styles.fieldLabel}>Follow-Up Note</label>
                  <textarea
                    style={styles.textarea}
                    value={quoteEditor.follow_up_note || ""}
                    placeholder="Example: Follow up with contractor after bid review..."
                    onChange={(e) => setQuoteEditor({ ...quoteEditor, follow_up_note: e.target.value })}
                  />
                </div>

                <Field label="Quote Description" value={quoteEditor.description} onChange={(v) => setQuoteEditor({ ...quoteEditor, description: v })} />
                <Field label="Amount" value={quoteEditor.amount} onChange={(v) => { const formatted = formatCurrencyInput(v); setQuoteEditor({ ...quoteEditor, amount: formatted, net_price: formatted }); }} />

                <div style={styles.lineItemsBox}>
                  <div style={styles.lineItemsHeader}>
                    <div>
                      <h3 style={styles.lineItemsTitle}>Quote Line Items</h3>
                      <p style={styles.lineItemsSubtitle}>Choose a preset product or material, adjust quantity/price if needed, and totals update automatically.</p>
                    </div>
                    <strong style={styles.lineItemsTotal}>{formatMoney(lineItemsTotal())}</strong>
                  </div>

                  <div style={styles.lineItemFormGrid} data-mobile-line-item-form="true">
                    <select
                      style={{ ...styles.input, ...styles.lineItemField }}
                      value={lineItemForm.category}
                      onChange={(e) =>
                        setLineItemForm({
                          ...lineItemForm,
                          category: e.target.value,
                          product: "",
                          description: "",
                          unit_price: "",
                        })
                      }
                    >
                      <option>Glass</option>
                      <option>Hardware</option>
                      <option>Labor</option>
                      <option>Add / Deduct</option>
                      <option>Custom</option>
                    </select>
                    <select
                      style={{ ...styles.input, ...styles.lineItemField }}
                      value={lineItemForm.product}
                      onChange={(e) => applyPricingPreset(e.target.value)}
                    >
                      <option value="">Select Product / Material</option>
                      {activeProductsByCategory(lineItemForm.category).map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.product_name} · {formatMoney(product.unit_price)}
                        </option>
                      ))}
                      {activeProductsByCategory(lineItemForm.category).length === 0 &&
                        (pricingPresets[lineItemForm.category] || []).map((preset) => (
                          <option key={preset.product} value={preset.product}>
                            {preset.product} · {formatMoney(preset.unit_price)}
                          </option>
                        ))}

                    </select>
                    <input
                      style={{ ...styles.input, ...styles.lineItemField }}
                      placeholder="Description"
                      value={lineItemForm.description}
                      onChange={(e) => setLineItemForm({ ...lineItemForm, description: e.target.value })}
                    />
                    <input
                      style={{ ...styles.input, ...styles.lineItemSmall }}
                      placeholder="Qty"
                      value={lineItemForm.quantity}
                      onChange={(e) => setLineItemForm({ ...lineItemForm, quantity: e.target.value })}
                    />
                    <input
                      style={{ ...styles.input, ...styles.lineItemField }}
                      placeholder="Unit Price"
                      value={lineItemForm.unit_price}
                      onChange={(e) => setLineItemForm({ ...lineItemForm, unit_price: formatCurrencyInput(e.target.value) })}
                    />
                    <button style={{ ...styles.goldBtn, ...styles.lineItemButton }} onClick={addQuoteLineItem}>Add Item</button>
                  </div>

                  <p style={styles.presetNote}>Products come from your Product Catalog. If a category has no products yet, starter presets are shown. You can override the unit price before adding.</p>

                  {quoteLineItems.length === 0 ? (
                    <p style={styles.lineItemsEmpty}>No line items yet. Add the first material or labor item above.</p>
                  ) : (
                    <div style={styles.lineItemsTable}>
                      <div style={styles.lineItemsTableHead}>
                        <span>Category</span>
                        <span>Product</span>
                        <span>Description</span>
                        <span>Qty</span>
                        <span>Unit</span>
                        <span>Total</span>
                        <span></span>
                      </div>

                      {quoteLineItems.map((item) => (
                        <div key={item.id} style={styles.lineItemsRow}>
                          <span>{item.category}</span>
                          <strong>{item.product || "—"}</strong>
                          <span>{item.description || "—"}</span>
                          <span>{item.quantity}</span>
                          <span>{formatMoney(item.unit_price)}</span>
                          <strong>{formatMoney(item.total)}</strong>
                          <button style={styles.lineDeleteBtn} onClick={() => deleteQuoteLineItem(item)}>Delete</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Field label="Product Summary" textarea value={quoteEditor.product_summary} onChange={(v) => setQuoteEditor({ ...quoteEditor, product_summary: v })} />
                <Field label="Scope of Work Content" textarea value={quoteEditor.scope_of_work} onChange={(v) => setQuoteEditor({ ...quoteEditor, scope_of_work: v })} />
                <Field label="Add / Deduct as Required" textarea value={quoteEditor.add_deduct} onChange={(v) => setQuoteEditor({ ...quoteEditor, add_deduct: v })} />
                <Field label="Lead Time" textarea value={quoteEditor.lead_time} onChange={(v) => setQuoteEditor({ ...quoteEditor, lead_time: v })} />
                <Field label="Warranty" textarea value={quoteEditor.warranty} onChange={(v) => setQuoteEditor({ ...quoteEditor, warranty: v })} />
                <Field label="Inclusions" textarea value={quoteEditor.inclusions} onChange={(v) => setQuoteEditor({ ...quoteEditor, inclusions: v })} />
                <Field label="Exclusions" textarea value={quoteEditor.exclusions} onChange={(v) => setQuoteEditor({ ...quoteEditor, exclusions: v })} />

                <div style={styles.callLogBox}>
                  <h3 style={styles.callLogTitle}>Recent Call Log</h3>
                  <textarea
                    style={styles.callLogTextarea}
                    placeholder="Write notes from your last conversation..."
                    value={callLogNote}
                    onChange={(e) => setCallLogNote(e.target.value)}
                  />
                  <button style={styles.goldBtn} onClick={addCallLog}>Add Call Note</button>

                  <div style={styles.callLogList}>
                    {selectedQuoteCallLogs.length === 0 ? (
                      <p style={styles.muted}>No call notes yet.</p>
                    ) : (
                      selectedQuoteCallLogs.map((log) => (
                        <div key={log.id} style={styles.callLogItem}>
                          <div style={styles.callLogMeta}>
                            <strong>{new Date(log.created_at).toLocaleString()}</strong>
                            <button style={styles.callLogDelete} onClick={() => deleteCallLog(log)}>Delete</button>
                          </div>
                          <p>{log.note}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div style={styles.previewPanel}>
                <div style={styles.previewHeader}>
                  <h2>Live Quote Preview</h2>
                  <p style={styles.previewHelpText}>This updates as you type. Click Print / Save PDF when ready.</p>
                </div>

                <div style={styles.previewFrame}>
                  <div style={styles.previewScaler}>
                    <QuoteTemplate
                      selectedQuote={selectedQuote}
                      selectedQuoteAccount={selectedQuoteAccount}
                      selectedQuoteSoldToAccount={selectedQuoteSoldToAccount}
                      selectedQuoteOpp={selectedQuoteOpp}
                      quoteEditor={quoteEditor}
                      quoteLineItems={quoteLineItems}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div id="printableQuote" style={styles.printOnlyQuote}>
              <QuoteTemplate
                selectedQuote={selectedQuote}
                selectedQuoteAccount={selectedQuoteAccount}
                selectedQuoteSoldToAccount={selectedQuoteSoldToAccount}
                selectedQuoteOpp={selectedQuoteOpp}
                quoteEditor={quoteEditor}
                quoteLineItems={quoteLineItems}
              />
            </div>
          </>
        )}


        {sidePanel && (
          <div style={styles.drawerOverlay} onClick={() => setSidePanel(null)}>
            <div onClick={(e) => e.stopPropagation()}>
              <RecordSidePanel
                type={sidePanel}
                account={selectedAccount}
                opportunity={selectedOpp}
                quote={selectedQuote}
                project={selectedProject}
                invoice={selectedInvoice}
                lead={selectedLead}
                projectEditor={projectEditor}
                setProjectEditor={setProjectEditor}
                accounts={accounts}
                opps={opps}
                projects={projects}
                quotes={quotes}
                photos={photos}
                callLogs={callLogs}
                invoices={invoices}
                payments={payments}
                invoiceForm={invoiceForm}
                setInvoiceForm={setInvoiceForm}
                paymentForm={paymentForm}
                setPaymentForm={setPaymentForm}
                formatMoney={formatMoney}
                onClose={() => setSidePanel(null)}
                onEditAccount={editAccount}
                onDeleteAccount={deleteAccount}
                onEditOpp={editOpp}
                onDeleteOpp={deleteOpp}
                onDeleteQuote={deleteQuote}
                onCreateQuoteFromOpportunity={createQuoteFromOpportunity}
                onOpenSendQuoteModal={openSendQuoteModal}
                onMarkQuoteSent={markQuoteSent}
                onApproveQuote={approveQuote}
                onRejectQuote={rejectQuote}
                onConvertQuoteToProject={convertQuoteToProject}
                onOpenProject={openProject}
                onOpenLeadFollowUpEmail={openLeadFollowUpEmail}
                onConvertLeadToOpportunityQuote={convertLeadToOpportunityQuote}
                onUpdateLeadStatus={updateLeadStatus}
                onDeleteLead={deleteLead}
                onSaveProjectDetails={saveProjectDetails}
                onUpdateProjectStatus={updateProjectStatus}
                onCreateInvoiceFromProject={createInvoiceFromProject}
                onOpenInvoice={openInvoice}
                onMarkInvoiceSent={markInvoiceSent}
                onAddInvoicePayment={addInvoicePayment}
                onUploadPhoto={uploadPhoto}
                onDeletePhoto={deletePhoto}
                onOpenPhoto={setLightboxPhoto}
                onOpenAccount={openAccount}
                onOpenOpp={openOpp}
                onOpenQuote={openQuote}
                onUpdateOppStage={updateOppStage}
              />
            </div>
          </div>
        )}

        {editingAccount && accountEditForm && (
          <div style={styles.modalOverlay} onClick={() => { setEditingAccount(null); setAccountEditForm(null); }}>
            <div style={styles.accountEditModal} data-mobile-modal="true" onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <div>
                  <p style={styles.sfObjectLabel}>Edit Account</p>
                  <h2 style={styles.modalTitle}>{editingAccount.account_name}</h2>
                </div>
              </div>

              <div style={styles.modalFormStack}>
                <label style={styles.modalLabel}>Account Name</label>
                <input style={styles.modalInput} value={accountEditForm.account_name} onChange={(e) => setAccountEditForm({ ...accountEditForm, account_name: e.target.value })} />

                <label style={styles.modalLabel}>Type</label>
                <select style={styles.modalInput} value={accountEditForm.account_type} onChange={(e) => setAccountEditForm({ ...accountEditForm, account_type: e.target.value })}>
                  <option>Contractor</option><option>Builder</option><option>Designer</option><option>Homeowner</option>
                </select>

                <label style={styles.modalLabel}>Address</label>
                <input style={styles.modalInput} value={accountEditForm.address} onChange={(e) => setAccountEditForm({ ...accountEditForm, address: e.target.value })} />

                <label style={styles.modalLabel}>City, State & Zip Code</label>
                <div style={styles.modalCityRow} data-mobile-two-col="true">
                  <input style={styles.modalInput} placeholder="City" value={accountEditForm.city} onChange={(e) => setAccountEditForm({ ...accountEditForm, city: e.target.value })} />
                  <select style={styles.modalStateSelect} value={accountEditForm.state} onChange={(e) => setAccountEditForm({ ...accountEditForm, state: e.target.value })}>
                    <option value="">State</option>
                    {usStates.map((state) => <option key={state} value={state}>{state}</option>)}
                  </select>
                  <input style={styles.modalZipInput} placeholder="Zip Code" value={accountEditForm.zip_code} onChange={(e) => setAccountEditForm({ ...accountEditForm, zip_code: e.target.value })} />
                </div>

                <label style={styles.modalLabel}>Contact</label>
                <input style={styles.modalInput} placeholder="Contact Person" value={accountEditForm.contact_person} onChange={(e) => setAccountEditForm({ ...accountEditForm, contact_person: e.target.value })} />

                <label style={styles.modalLabel}>Phone</label>
                <input style={styles.modalInput} value={accountEditForm.phone} onChange={(e) => setAccountEditForm({ ...accountEditForm, phone: e.target.value })} />

                <label style={styles.modalLabel}>Email</label>
                <input style={styles.modalInput} value={accountEditForm.email} onChange={(e) => setAccountEditForm({ ...accountEditForm, email: e.target.value })} />
              </div>

              <div style={styles.modalActions}>
                <button style={styles.outlineDarkBtn} onClick={() => { setEditingAccount(null); setAccountEditForm(null); }}>Cancel</button>
                <button style={styles.goldBtn} onClick={saveAccountEdit}>Save Account</button>
              </div>
            </div>
          </div>
        )}




        {accountModalOpen && (
          <div style={styles.modalOverlay} onClick={() => setAccountModalOpen(false)}>
            <div style={styles.accountEditModal} data-mobile-modal="true" onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <div>
                  <p style={styles.sfObjectLabel}>Account Entry</p>
                  <h2 style={styles.modalTitle}>New Account</h2>
                </div>
              </div>

              <div style={styles.modalFormStack}>
                <label style={styles.modalLabel}>Account Name</label>
                <input style={styles.modalInput} value={accountForm.account_name} onChange={(e) => setAccountForm({ ...accountForm, account_name: e.target.value })} placeholder="Account / Customer Name" />

                <label style={styles.modalLabel}>Type</label>
                <select style={styles.modalInput} value={accountForm.account_type} onChange={(e) => setAccountForm({ ...accountForm, account_type: e.target.value })}>
                  <option>Contractor</option><option>Builder</option><option>Designer</option><option>Homeowner</option>
                </select>

                <label style={styles.modalLabel}>Address</label>
                <input style={styles.modalInput} value={accountForm.address} onChange={(e) => setAccountForm({ ...accountForm, address: e.target.value })} placeholder="Street Address" />

                <label style={styles.modalLabel}>City, State & Zip</label>
                <div style={styles.modalCityRow} data-mobile-two-col="true">
                  <input style={styles.modalInput} placeholder="City" value={accountForm.city} onChange={(e) => setAccountForm({ ...accountForm, city: e.target.value })} />
                  <select style={styles.modalStateSelect} value={accountForm.state} onChange={(e) => setAccountForm({ ...accountForm, state: e.target.value })}>
                    <option value="">State</option>
                    {usStates.map((state) => <option key={state} value={state}>{state}</option>)}
                  </select>
                  <input style={styles.modalZipInput} placeholder="Zip Code" value={accountForm.zip_code} onChange={(e) => setAccountForm({ ...accountForm, zip_code: e.target.value })} />
                </div>

                <label style={styles.modalLabel}>Contact</label>
                <input style={styles.modalInput} value={accountForm.contact_person} onChange={(e) => setAccountForm({ ...accountForm, contact_person: e.target.value })} placeholder="Contact Person" />

                <label style={styles.modalLabel}>Phone</label>
                <input style={styles.modalInput} value={accountForm.phone} onChange={(e) => setAccountForm({ ...accountForm, phone: formatPhone(e.target.value) })} placeholder="(305) 000-0000" />

                <label style={styles.modalLabel}>Email</label>
                <input style={styles.modalInput} value={accountForm.email} onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })} placeholder="customer@email.com" />
              </div>

              <div style={styles.modalActions}>
                <button style={styles.outlineDarkBtn} onClick={() => setAccountModalOpen(false)}>Cancel</button>
                <button style={styles.goldBtn} onClick={addAccount}>Save Account</button>
              </div>
            </div>
          </div>
        )}

        {productModalOpen && (
          <div style={styles.modalOverlay} onClick={() => setProductModalOpen(false)}>
            <div style={styles.accountEditModal} data-mobile-modal="true" onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <div>
                  <p style={styles.sfObjectLabel}>Price Book</p>
                  <h2 style={styles.modalTitle}>New Product</h2>
                </div>
              </div>

              <div style={styles.modalFormStack}>
                <label style={styles.modalLabel}>Category</label>
                <select style={styles.modalInput} value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}>
                  <option>Glass</option>
                  <option>Hardware</option>
                  <option>Labor</option>
                  <option>Add / Deduct</option>
                  <option>Custom</option>
                </select>

                <label style={styles.modalLabel}>Product Name</label>
                <input style={styles.modalInput} value={productForm.product_name} onChange={(e) => setProductForm({ ...productForm, product_name: e.target.value })} placeholder="Product / Material Name" />

                <label style={styles.modalLabel}>Description</label>
                <textarea style={styles.leadModalTextarea} value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} placeholder="Short product description..." />

                <label style={styles.modalLabel}>Unit Price</label>
                <input style={styles.modalInput} value={productForm.unit_price} onChange={(e) => setProductForm({ ...productForm, unit_price: formatCurrencyInput(e.target.value) })} placeholder="$0.00" />

                <label style={styles.productActiveToggle}>
                  <input type="checkbox" checked={productForm.is_active} onChange={(e) => setProductForm({ ...productForm, is_active: e.target.checked })} />
                  Active Product
                </label>
              </div>

              <div style={styles.modalActions}>
                <button style={styles.outlineDarkBtn} onClick={() => setProductModalOpen(false)}>Cancel</button>
                <button style={styles.goldBtn} onClick={addProduct}>Save Product</button>
              </div>
            </div>
          </div>
        )}

        {leadModalOpen && (
          <div style={styles.modalOverlay} onClick={() => setLeadModalOpen(false)}>
            <div style={styles.accountEditModal} data-mobile-modal="true" onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <div>
                  <p style={styles.sfObjectLabel}>Manual Lead Entry</p>
                  <h2 style={styles.modalTitle}>New Lead</h2>
                </div>
              </div>

              <div style={styles.modalFormStack}>
                <label style={styles.modalLabel}>Full Name</label>
                <input
                  style={styles.modalInput}
                  value={leadForm.full_name}
                  onChange={(e) => setLeadForm({ ...leadForm, full_name: e.target.value })}
                  placeholder="Customer name"
                />

                <label style={styles.modalLabel}>Phone</label>
                <input
                  style={styles.modalInput}
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm({ ...leadForm, phone: formatPhone(e.target.value) })}
                  placeholder="(305) 000-0000"
                />

                <label style={styles.modalLabel}>Email</label>
                <input
                  style={styles.modalInput}
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  placeholder="customer@email.com"
                />

                <label style={styles.modalLabel}>Service Interested In</label>
                <select
                  style={styles.modalInput}
                  value={leadForm.service_interest}
                  onChange={(e) => setLeadForm({ ...leadForm, service_interest: e.target.value })}
                >
                  <option value="">Select service</option>
                  {leadServices.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>

                <label style={styles.modalLabel}>Status</label>
                <select
                  style={styles.modalInput}
                  value={leadForm.status}
                  onChange={(e) => setLeadForm({ ...leadForm, status: e.target.value })}
                >
                  {leadStatuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>

                <label style={styles.modalLabel}>Project Details</label>
                <textarea
                  style={styles.leadModalTextarea}
                  value={leadForm.project_details}
                  onChange={(e) => setLeadForm({ ...leadForm, project_details: e.target.value })}
                  placeholder="Paste details from the email request..."
                />
              </div>

              <div style={styles.modalActions}>
                <button style={styles.outlineDarkBtn} onClick={() => setLeadModalOpen(false)}>Cancel</button>
                <button style={styles.goldBtn} onClick={addLead}>Save Lead</button>
              </div>
            </div>
          </div>
        )}

        {sendQuoteModal && selectedQuote && (
          <div style={styles.modalOverlay} onClick={() => setSendQuoteModal(false)}>
            <div style={styles.sendQuoteModal} data-mobile-modal="true" onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <div>
                  <p style={styles.sfObjectLabel}>Send Quote</p>
                  <h2 style={styles.modalTitle}>{selectedQuote.quote_number}</h2>
                </div>
              </div>

              <div style={styles.sendQuoteBody}>
                <label style={styles.modalLabel}>To</label>
                <input
                  style={styles.modalInput}
                  value={sendQuoteForm.to}
                  onChange={(e) => setSendQuoteForm({ ...sendQuoteForm, to: e.target.value })}
                  placeholder="customer@email.com"
                />

                <label style={styles.modalLabel}>Subject</label>
                <input
                  style={styles.modalInput}
                  value={sendQuoteForm.subject}
                  onChange={(e) => setSendQuoteForm({ ...sendQuoteForm, subject: e.target.value })}
                />

                <label style={styles.modalLabel}>Message</label>
                <textarea
                  style={styles.sendQuoteTextarea}
                  value={sendQuoteForm.message}
                  onChange={(e) => setSendQuoteForm({ ...sendQuoteForm, message: e.target.value })}
                />

                <div style={styles.sendQuoteNotice}>
                  <strong>Note:</strong> This opens your email app with the message ready. Attach the saved PDF before sending.
                  <br />
                  The message includes a customer approval link.
                </div>
              </div>

              <div style={styles.modalActions}>
                <button style={styles.outlineDarkBtn} onClick={() => setSendQuoteModal(false)}>Cancel</button>
                <button style={styles.goldBtn} onClick={printQuote}>Print / Save PDF</button>
                <button style={styles.sendQuoteBtn} onClick={sendQuoteByEmail}>Open Email + Mark Sent</button>
              </div>
            </div>
          </div>
        )}

        {lightboxPhoto && (
          <div className="no-print" style={styles.lightbox} onClick={() => setLightboxPhoto(null)}>
            <img src={lightboxPhoto} style={styles.lightboxImg} />
          </div>
        )}
      </div>
    </div>
  );
}


function PublicApprovalPage({
  quote,
  loading,
  message,
  approvalName,
  setApprovalName,
  onApprove,
  formatMoney,
}) {
  return (
    <div style={styles.publicApprovalPage}>
      <div style={styles.publicApprovalCard}>
        <img src="/arcoverre-logo.png" alt="Arcoverre" style={styles.publicApprovalLogo} />

        {loading && <p style={styles.publicApprovalMuted}>Loading quote...</p>}

        {!loading && !quote && (
          <>
            <h1 style={styles.publicApprovalTitle}>Quote Not Found</h1>
            <p style={styles.publicApprovalMuted}>{message || "This approval link is unavailable."}</p>
          </>
        )}

        {!loading && quote && (
          <>
            <p style={styles.publicApprovalEyebrow}>Quote Approval</p>
            <h1 style={styles.publicApprovalTitle}>{quote.quote_number}</h1>

            <div style={styles.publicApprovalSummary}>
              <InfoRow label="Project" value={quote.project_name} />
              <InfoRow label="Sold To" value={quote.sold_to_name} />
              <InfoRow label="Ship To" value={quote.ship_to_name} />
              <InfoRow label="Status" value={<StatusPill status={quote.status} />} />
              <InfoRow label="Net Price" value={formatMoney(quote.net_price || quote.amount)} />
            </div>

            {quote.status === "Approved" ? (
              <div style={styles.publicApprovedBox}>
                <h2>Approved</h2>
                <p>This quote has already been approved.</p>
                {quote.approved_by_name && <p>Approved by: <strong>{quote.approved_by_name}</strong></p>}
              </div>
            ) : (
              <>
                <p style={styles.publicApprovalText}>
                  By typing your name below and clicking Approve Quote, you confirm authorization to approve this quote and move forward with the proposed scope.
                </p>

                <label style={styles.modalLabel}>Authorized Name</label>
                <input
                  style={styles.modalInput}
                  value={approvalName}
                  onChange={(e) => setApprovalName(e.target.value)}
                  placeholder="Type your full name"
                />

                <button style={styles.publicApproveBtn} onClick={onApprove} disabled={loading}>
                  Approve Quote
                </button>
              </>
            )}

            {message && <p style={styles.publicApprovalMessage}>{message}</p>}
          </>
        )}
      </div>
    </div>
  );
}

function StagePath({ currentStage, onStageClick }) {
  return (
    <div style={styles.pipelineWrapper}>
      {opportunityStages.map((stage, index) => {
        const isActive = stage === currentStage;
        const isCompleted =
          opportunityStages.indexOf(currentStage) > index &&
          currentStage !== "Closed Lost";

        return (
          <button
            key={stage}
            style={{
              ...styles.pipelineStage,
              ...(isActive ? styles.pipelineStageActive : {}),
              ...(isCompleted ? styles.pipelineStageCompleted : {}),
              ...(stage === "Closed Lost" && isActive ? styles.pipelineStageLost : {}),
            }}
            onClick={() => onStageClick(stage)}
          >
            {stage}
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, value, onChange, textarea }) {
  return (
    <div style={styles.fieldBlock}>
      <label style={styles.fieldLabel}>{label}</label>
      {textarea ? (
        <textarea style={styles.textarea} value={value || ""} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input style={styles.inputWide} value={value || ""} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function QuoteTemplate({ selectedQuote, selectedQuoteAccount, selectedQuoteSoldToAccount, selectedQuoteOpp, quoteEditor, quoteLineItems = [] }) {
  const netPrice = cleanCurrency(quoteEditor.net_price || quoteEditor.amount);
  const today = new Date();
  const validUntil = new Date(today);
  validUntil.setDate(today.getDate() + 30);

  return (
    <div style={styles.quoteDocumentLuxury}>
      <section style={{ ...styles.quotePageLuxury, ...styles.quoteCoverPage }}>
        <div style={styles.coverWatermark}>A</div>
        <div style={styles.coverTopNote}>
          Please ensure that POs, contracts, payments, and other legal documents are issued to Arcoverre.
        </div>

        <div style={styles.coverCenterBlock}>
          <img src="/arcoverre-logo.png" alt="Arcoverre" style={styles.coverLogo} />
          <div style={styles.coverGoldRule}></div>
          <p style={styles.coverEyebrow}>CUSTOM QUOTE</p>
          <h1 style={styles.coverQuoteNumber}>{selectedQuote.quote_number}</h1>
          <h2 style={styles.coverProject}>{selectedQuoteOpp?.project_name || "Project"}</h2>
          <p style={styles.coverPrepared}>Sold To</p>
          <h3 style={styles.coverCustomer}>{selectedQuoteSoldToAccount?.account_name || selectedQuoteAccount?.account_name || "Customer"}</h3>
          <p style={styles.coverDate}>{today.toLocaleDateString()}</p>
        </div>

        <div style={styles.coverFooter}>ARCOVERRE • ARCHITECTURAL GLASS & METAL</div>
      </section>

      <section style={styles.quotePageLuxury}>
        <div style={styles.pageWatermark}>A</div>
        <QuotePageHeader selectedQuote={selectedQuote} selectedQuoteOpp={selectedQuoteOpp} />

        <div style={styles.clientProjectGridLuxury}>
          <div style={styles.clientBoxLuxury}>
            <h3 style={styles.luxurySmallHeading}>Sold To</h3>
            <h2 style={styles.luxuryClientName}>{selectedQuoteSoldToAccount?.account_name || "Sold To Customer"}</h2>
            <p>{selectedQuoteSoldToAccount?.address || ""}</p>
            <p>{[selectedQuoteSoldToAccount?.city, selectedQuoteSoldToAccount?.state, selectedQuoteSoldToAccount?.zip_code].filter(Boolean).join(", ")}</p>
            <p>{selectedQuoteSoldToAccount?.contact_person || ""}</p>
            <p>{selectedQuoteSoldToAccount?.phone ? formatPhone(selectedQuoteSoldToAccount.phone) : ""}</p>
            <p>{selectedQuoteSoldToAccount?.email || ""}</p>
          </div>

          <div style={styles.projectBoxLuxury}>
            <h3 style={styles.luxurySmallHeading}>Ship To / Project Information</h3>
            <p><strong>Ship To:</strong> {selectedQuoteAccount?.account_name || "Project Location"}</p>
            <p><strong>Project:</strong> {selectedQuoteOpp?.project_name || "Project"}</p>
            <p><strong>Address:</strong> {selectedQuoteOpp?.address || selectedQuoteAccount?.address || "—"}</p>
            <p><strong>Location:</strong> {[selectedQuoteOpp?.city || selectedQuoteAccount?.city, selectedQuoteOpp?.state || selectedQuoteAccount?.state, selectedQuoteOpp?.zip_code || selectedQuoteAccount?.zip_code].filter(Boolean).join(", ") || "—"}</p>
            <p><strong>Opportunity #:</strong> {selectedQuoteOpp?.opportunity_number || "—"}</p>
            <p><strong>Valid Until:</strong> {validUntil.toLocaleDateString()}</p>
          </div>
        </div>

        <div style={styles.netPriceBandLuxury}>
          <div>
            <p style={styles.netPriceLabel}>Net Price</p>
            <h2 style={styles.netPriceAmount}>{formatMoney(netPrice)}</h2>
          </div>
          <p style={styles.netPriceNote}>Pricing is based on the scope, inclusions, and exclusions listed in this proposal.</p>
        </div>


        {quoteLineItems.length > 0 && (
          <div style={styles.quoteLineItemsLuxury}>
            <h3 style={styles.contentTitleLuxury}>Quote Line Items</h3>
            <div style={styles.quoteLineItemsHeaderLuxury}>
              <span>Category</span>
              <span>Product / Description</span>
              <span>Qty</span>
              <span>Unit</span>
              <span>Total</span>
            </div>
            {quoteLineItems.map((item) => (
              <div key={item.id} style={styles.quoteLineItemRowLuxury}>
                <span>{item.category}</span>
                <span>
                  <strong>{item.product || "Item"}</strong>
                  <em>{item.description || ""}</em>
                </span>
                <span>{item.quantity}</span>
                <span>{formatMoney(item.unit_price)}</span>
                <strong>{formatMoney(item.total)}</strong>
              </div>
            ))}
            <div style={styles.quoteLineItemsTotalLuxury}>
              <span>Line Items Total</span>
              <strong>{formatMoney(quoteLineItems.reduce((sum, item) => sum + cleanCurrency(item.total), 0))}</strong>
            </div>
          </div>
        )}

        <QuoteContentSection
          title="Product Summary"
          text={quoteEditor.product_summary || "Product summary to be provided."}
        />

        <QuoteContentSection
          title="Scope of Work"
          text={quoteEditor.scope_of_work || quoteEditor.description || "Scope of work to be provided."}
        />

        <QuoteContentSection
          title="Add / Deduct"
          text={quoteEditor.add_deduct || "No add/deduct items currently listed."}
        />

        <QuoteContentSection
          title="Lead Time"
          text={quoteEditor.lead_time || "Current lead time will be confirmed after approved quote and deposit."}
        />
      </section>

      <section style={styles.quotePageLuxury}>
        <div style={styles.pageWatermark}>A</div>
        <QuotePageHeader selectedQuote={selectedQuote} selectedQuoteOpp={selectedQuoteOpp} />

        <QuoteContentSection
          title="Warranty"
          text={quoteEditor.warranty || "Warranty to be provided based on final approved scope."}
        />

        <QuoteContentSection
          title="Inclusions"
          text={quoteEditor.inclusions || "Glass, hardware, and standard installation as described in this quote."}
        />

        <QuoteContentSection
          title="Exclusions"
          text={quoteEditor.exclusions || "Permits, engineering, demolition, electrical, patching, painting, and work by others unless specified."}
        />

        <div style={styles.conditionsBoxLuxury}>
          <h3 style={styles.luxurySmallHeading}>Conditions</h3>
          <ol style={styles.conditionsListLuxury}>
            <li>This quotation is based on the information available at the time of proposal and is subject to final field verification.</li>
            <li>Changes to scope, site conditions, materials, finish selections, or schedule may affect final pricing and lead time.</li>
            <li>Permits, engineering, inspections, demolition, electrical, patching, painting, and work by others are excluded unless specifically listed as included.</li>
            <li>Deposit, payment schedule, and final production release will be confirmed after acceptance of this quote.</li>
          </ol>
        </div>

        <div style={styles.acceptanceBoxLuxury}>
          <p style={styles.acceptanceIntroLuxury}>
            I affirm that I have the authority to accept this quotation and authorize Arcoverre to proceed with the above stated work at the net price of <strong>{formatMoney(netPrice)}</strong>, plus applicable taxes or approved changes.
          </p>

          <div style={styles.signatureGridLuxury}>
            <p>Signature: ___________________________________</p>
            <p>Title: _______________________________</p>
            <p>Name: _______________________________________</p>
            <p>Date: _______________________________</p>
            <p>Company: ____________________________________</p>
            <p>Ref#: _______________________________</p>
          </div>
        </div>

        <div style={styles.luxuryThankYou}>
          <p>Thank you for the opportunity to partner with you on this project.</p>
          <strong>Arcoverre Team</strong>
        </div>
      </section>
    </div>
  );
}

function QuotePageHeader({ selectedQuote, selectedQuoteOpp }) {
  return (
    <div style={styles.quotePageHeaderLuxury}>
      <img src="/arcoverre-logo.png" alt="Arcoverre" style={styles.pageLogoLuxury} />
      <div style={styles.pageHeaderRightLuxury}>
        <strong>Quotation: {selectedQuote.quote_number}</strong>
        <span>{selectedQuoteOpp?.project_name || "Project"}</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
}

function QuoteContentSection({ title, text }) {
  return (
    <div style={styles.contentSectionLuxury}>
      <h3 style={styles.contentTitleLuxury}>{title}</h3>
      <p style={styles.contentTextLuxury}>{text}</p>
    </div>
  );
}


function RecordSidePanel({
  type,
  account,
  opportunity,
  quote,
  project,
  invoice,
  lead,
  projectEditor,
  setProjectEditor,
  accounts,
  opps,
  projects,
  quotes,
  photos,
  callLogs,
  invoices,
  payments,
  invoiceForm,
  setInvoiceForm,
  paymentForm,
  setPaymentForm,
  formatMoney,
  onClose,
  onEditAccount,
  onDeleteAccount,
  onEditOpp,
  onDeleteOpp,
  onDeleteQuote,
  onCreateQuoteFromOpportunity,
  onOpenSendQuoteModal,
  onMarkQuoteSent,
  onApproveQuote,
  onRejectQuote,
  onConvertQuoteToProject,
  onOpenProject,
  onOpenLeadFollowUpEmail,
  onConvertLeadToOpportunityQuote,
  onUpdateLeadStatus,
  onDeleteLead,
  onSaveProjectDetails,
  onUpdateProjectStatus,
  onCreateInvoiceFromProject,
  onOpenInvoice,
  onMarkInvoiceSent,
  onAddInvoicePayment,
  onUploadPhoto,
  onDeletePhoto,
  onOpenPhoto,
  onOpenAccount,
  onOpenOpp,
  onOpenQuote,
  onUpdateOppStage,
}) {
  const oppAccount = opportunity ? accounts.find((a) => a.id === opportunity.account_id) : null;
  const quoteOpp = quote ? opps.find((o) => o.id === quote.opportunity_id) : null;
  const quoteAccount = quoteOpp ? accounts.find((a) => a.id === quoteOpp.account_id) : null;

  function localInvoicePayments(invoiceId) {
    return (payments || []).filter((p) => p.invoice_id === invoiceId);
  }

  function localInvoicePaidTotal(invoiceId) {
    return localInvoicePayments(invoiceId).reduce((sum, p) => sum + cleanCurrency(p.amount), 0);
  }

  function localInvoiceStatus(invoiceItem) {
    if (!invoiceItem) return "Draft";
    const paid = localInvoicePaidTotal(invoiceItem.id);
    const amount = cleanCurrency(invoiceItem.amount);
    if (amount > 0 && paid >= amount) return "Paid";
    if (paid > 0) return "Partial";
    return invoiceItem.status || "Draft";
  }

  if (type === "account" && account) {
    const accountOpps = opps.filter((o) => o.account_id === account.id);
    return (
      <aside style={styles.recordDrawer} data-mobile-drawer="true">
        <div style={styles.drawerHeader}>
          <div>
            <p style={styles.sfObjectLabel}>Ship To Account</p>
            <h2 style={styles.drawerTitle}>{account.account_name}</h2>
          </div>
          
        </div>

        <div style={styles.drawerActions}>
          <button style={styles.goldBtn} onClick={() => onOpenAccount(account)}>View / Create Opportunities</button>
          <button style={styles.smallBtn} onClick={() => onEditAccount(account)}>Edit</button>
          <button style={styles.dangerBtn} onClick={() => onDeleteAccount(account)}>Delete</button>
        </div>

        <div style={styles.drawerCard}>
          <InfoRow label="Type" value={account.account_type} />
          <InfoRow label="Address" value={account.address} />
          <InfoRow label="City / State / Zip" value={[account.city, account.state, account.zip_code].filter(Boolean).join(", ")} />
          <InfoRow label="Contact" value={account.contact_person} />
          <InfoRow label="Phone" value={<PhoneText phone={account.phone} />} />
          <InfoRow label="Email" value={<EmailLink email={account.email} />} />
        </div>

        <h3 style={styles.drawerSectionTitle}>Related Opportunities</h3>
        {accountOpps.length === 0 ? (
          <p style={styles.drawerMuted}>No opportunities yet.</p>
        ) : (
          accountOpps.slice(0, 6).map((o) => (
            <button key={o.id} style={styles.relatedRow} onClick={() => onOpenOpp(o)}>
              <span>{o.project_name}</span>
              <strong>{formatMoney(o.estimated_value)}</strong>
            </button>
          ))
        )}
      </aside>
    );
  }

  if (type === "opportunity" && opportunity) {
    const relatedQuotes = quotes.filter((q) => q.opportunity_id === opportunity.id);
    return (
      <aside style={styles.recordDrawer} data-mobile-drawer="true">
        <div style={styles.drawerHeader}>
          <div>
            <p style={styles.sfObjectLabel}>Opportunity</p>
            <h2 style={styles.drawerTitle}>{opportunity.project_name}</h2>
          </div>
          
        </div>

        <div style={styles.drawerActions}>
          <button style={styles.goldBtn} onClick={() => onCreateQuoteFromOpportunity(opportunity)}>Create Quote</button>
          <button style={styles.smallBtn} onClick={() => onOpenOpp(opportunity)}>Open Full Detail</button>
          <button style={styles.smallBtn} onClick={() => onEditOpp(opportunity)}>Edit</button>
          <button style={styles.dangerBtn} onClick={() => onDeleteOpp(opportunity)}>Delete</button>
        </div>

        <div style={styles.drawerStageGrid}>
          {opportunityStages.map((stage) => (
            <button
              key={stage}
              style={{
                ...styles.drawerStageChip,
                ...(opportunity.status === stage ? styles.drawerStageChipActive : {}),
                ...(stage === "Closed Lost" && opportunity.status === stage ? styles.drawerStageChipLost : {}),
              }}
              onClick={() => onUpdateOppStage(stage)}
            >
              {stage}
            </button>
          ))}
        </div>

        <div style={styles.drawerCard}>
          <InfoRow label="Account" value={oppAccount?.account_name} />
          <InfoRow label="Opportunity #" value={opportunity.opportunity_number} />
          <InfoRow label="Stage" value={<StatusPill status={opportunity.status} />} />
          <InfoRow label="Stage Probability" value={`${stageProbability(opportunity.status)}%`} />
          <InfoRow label="Weighted Value" value={formatMoney(cleanCurrency(opportunity.estimated_value) * (stageProbability(opportunity.status) / 100))} />
          <InfoRow label="Amount" value={formatMoney(opportunity.estimated_value)} />
          <InfoRow label="Address" value={opportunity.address} />
          <InfoRow label="City / State / Zip" value={[opportunity.city, opportunity.state, opportunity.zip_code].filter(Boolean).join(", ")} />
        </div>

        <h3 style={styles.drawerSectionTitle}>Quotes</h3>
        {relatedQuotes.length === 0 ? (
          <p style={styles.drawerMuted}>No quotes yet. Open full detail to create one.</p>
        ) : (
          relatedQuotes.map((q) => (
            <button key={q.id} style={styles.relatedRow} onClick={() => onOpenQuote(q)}>
              <span>{q.quote_number} · {q.status}</span>
              <strong>{formatMoney(q.amount)}</strong>
            </button>
          ))
        )}

        <h3 style={styles.drawerSectionTitle}>Photos / Files</h3>
        <div style={styles.drawerUploadBox}>
          <input
            type="file"
            accept="image/*"
            style={styles.drawerFileInput}
            onChange={(e) => onUploadPhoto(e.target.files[0])}
          />
          <p style={styles.drawerMuted}>Upload project photos directly from this preview panel.</p>
        </div>

        {photos.length === 0 ? (
          <p style={styles.drawerMuted}>No photos uploaded yet.</p>
        ) : (
          <div style={styles.drawerPhotoGrid}>
            {photos.slice(0, 9).map((p) => (
              <div key={p.path} style={styles.drawerPhotoCard}>
                <img
                  src={p.url}
                  alt={p.name}
                  style={styles.drawerPhoto}
                  onClick={() => onOpenPhoto(p.url)}
                />
                <button style={styles.drawerPhotoDelete} onClick={() => onDeletePhoto(p)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </aside>
    );
  }

  if (type === "quote" && quote) {
    return (
      <aside style={styles.recordDrawer} data-mobile-drawer="true">
        <div style={styles.drawerHeader}>
          <div>
            <p style={styles.sfObjectLabel}>Quote</p>
            <h2 style={styles.drawerTitle}>{quote.quote_number}</h2>
          </div>
          
        </div>

        <div style={styles.drawerActions}>
          <button style={styles.goldBtn} onClick={() => onOpenQuote(quote)}>Open Quote Builder</button>
          <button style={styles.sendQuoteMiniBtn} onClick={() => onOpenSendQuoteModal(quote)}>Send</button>
          <button style={styles.statusMiniSent} onClick={() => onMarkQuoteSent(quote)}>Mark Sent</button>
          <button style={styles.statusMiniApproved} onClick={() => onApproveQuote(quote)}>Approve</button>
          <button style={styles.convertMiniBtn} onClick={() => onConvertQuoteToProject(quote)}>Convert</button>
          <button style={styles.smallBtn} onClick={() => onRejectQuote(quote)}>Reject</button>
          <button style={styles.dangerBtn} onClick={() => onDeleteQuote(quote)}>Delete</button>
        </div>

        <div style={styles.drawerCard}>
          <InfoRow label="Status" value={<StatusPill status={quote.status} />} />
          <InfoRow label="Sent Date" value={quote.sent_at ? new Date(quote.sent_at).toLocaleDateString() : "—"} />
          <InfoRow label="Approved Date" value={quote.approved_at ? new Date(quote.approved_at).toLocaleDateString() : "—"} />
          <InfoRow label="Approved By" value={quote.approved_by_name || "—"} />
          <InfoRow label="Follow-Up" value={quote.follow_up_date ? `${new Date(quote.follow_up_date).toLocaleDateString()} · ${followUpStatus(quote.follow_up_date).label}` : "—"} />
          <InfoRow label="Amount" value={formatMoney(quote.amount)} />
          <InfoRow label="Opportunity" value={quoteOpp?.project_name} />
          <InfoRow label="Ship To" value={quoteAccount?.account_name} />
          <InfoRow label="Sold To" value={accounts.find((a) => a.id === quote.sold_to_account_id)?.account_name} />
          <InfoRow label="Description" value={quote.description} />
          <InfoRow label="Call Notes" value={callLogs.filter((log) => log.quote_id === quote.id).length} />
        </div>

        <div style={styles.drawerHighlight}>
          <span>Net Price</span>
          <strong>{formatMoney(quote.net_price || quote.amount)}</strong>
        </div>
      </aside>
    );
  }




  if (type === "lead" && lead) {
    return (
      <aside style={styles.recordDrawer} data-mobile-drawer="true">
        <div style={styles.drawerHeader}>
          <div>
            <p style={styles.sfObjectLabel}>Lead</p>
            <h2 style={styles.drawerTitle}>{lead.full_name}</h2>
          </div>
        </div>

        <div style={styles.drawerActions}>
          <button style={styles.goldBtn} onClick={() => onConvertLeadToOpportunityQuote(lead)}>Convert Lead</button>
          <button style={styles.smallBtn} onClick={() => onOpenLeadFollowUpEmail(lead)}>Follow-Up Email</button>
          <button style={styles.dangerBtn} onClick={() => onDeleteLead(lead)}>Delete</button>
        </div>

        <div style={styles.drawerStageGrid}>
          {leadStatuses.map((status) => (
            <button
              key={status}
              style={{
                ...styles.drawerStageChip,
                ...((lead.status || "New Lead") === status ? styles.drawerStageChipActive : {}),
              }}
              onClick={() => onUpdateLeadStatus(lead, status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div style={styles.drawerCard}>
          <InfoRow label="Status" value={<StatusPill status={lead.status || "New Lead"} />} />
          <InfoRow label="Phone" value={<PhoneText phone={lead.phone} />} />
          <InfoRow label="Email" value={<EmailLink email={lead.email} />} />
          <InfoRow label="Service" value={lead.service_interest || "—"} />
          <InfoRow label="Source" value={lead.source || "Manual Entry"} />
          <InfoRow label="Created" value={lead.created_at ? new Date(lead.created_at).toLocaleString() : "—"} />
        </div>

        <h3 style={styles.drawerSectionTitle}>Project Details</h3>
        <div style={styles.projectNotesBox}>
          <p style={styles.leadDetailsText}>{lead.project_details || "No project details provided."}</p>
        </div>

        <h3 style={styles.drawerSectionTitle}>Suggested Follow-Up Email</h3>
        <div style={styles.projectNotesBox}>
          <pre style={styles.leadEmailPreview}>{`Hi ${lead.full_name || ""},

Thank you for reaching out to Arcoverre. We received your request for ${lead.service_interest || "your project"}.

I’d like to schedule a quick call or site visit to better understand the project, take measurements if needed, and prepare an accurate quote.

What day and time works best for you?

Best regards,
Arcoverre Team`}</pre>
        </div>
      </aside>
    );
  }

  if (type === "invoice" && invoice) {
    const project = (projects || []).find((p) => p.id === invoice.project_id);
    const soldTo = (accounts || []).find((a) => a.id === invoice.sold_to_account_id);
    const paidTotal = (payments || []).filter((p) => p.invoice_id === invoice.id).reduce((sum, p) => sum + cleanCurrency(p.amount), 0);
    const balance = cleanCurrency(invoice.amount) - paidTotal;
    const invoicePaymentList = (payments || []).filter((p) => p.invoice_id === invoice.id);

    return (
      <aside style={styles.recordDrawer} data-mobile-drawer="true">
        <div style={styles.drawerHeader}>
          <div>
            <p style={styles.sfObjectLabel}>Invoice</p>
            <h2 style={styles.drawerTitle}>{invoice.invoice_number}</h2>
          </div>
        </div>

        <div style={styles.drawerActions}>
          <button style={styles.goldBtn} onClick={() => onMarkInvoiceSent(invoice)}>Mark Sent</button>
          {project && <button style={styles.smallBtn} onClick={() => onOpenProject(project)}>Open Project</button>}
        </div>

        <div style={styles.drawerCard}>
          <InfoRow label="Status" value={<StatusPill status={localInvoiceStatus(invoice)} />} />
          <InfoRow label="Project" value={project?.project_name} />
          <InfoRow label="Sold To" value={soldTo?.account_name} />
          <InfoRow label="Amount" value={formatMoney(invoice.amount)} />
          <InfoRow label="Paid" value={formatMoney(paidTotal)} />
          <InfoRow label="Balance" value={formatMoney(balance)} />
          <InfoRow label="Due Date" value={invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : "—"} />
        </div>

        <h3 style={styles.drawerSectionTitle}>Add Payment</h3>
        <div style={styles.invoicePaymentBox}>
          <input
            style={styles.modalInput}
            placeholder="Payment Amount"
            value={paymentForm.amount}
            onChange={(e) => setPaymentForm({ ...paymentForm, amount: formatCurrencyInput(e.target.value) })}
          />
          <input
            style={styles.modalInput}
            type="date"
            value={paymentForm.payment_date}
            onChange={(e) => setPaymentForm({ ...paymentForm, payment_date: e.target.value })}
          />
          <select
            style={styles.modalInput}
            value={paymentForm.method}
            onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
          >
            <option>Zelle</option>
            <option>Check</option>
            <option>Cash</option>
            <option>Credit Card</option>
            <option>Wire</option>
            <option>ACH</option>
            <option>Other</option>
          </select>
          <input
            style={styles.modalInput}
            placeholder="Payment Notes"
            value={paymentForm.notes}
            onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
          />
          <button style={styles.goldBtn} onClick={() => onAddInvoicePayment(invoice)}>Add Payment</button>
        </div>

        <h3 style={styles.drawerSectionTitle}>Payment History</h3>
        <div style={styles.projectInvoiceList}>
          {invoicePaymentList.length === 0 ? (
            <p style={styles.drawerMuted}>No payments recorded yet.</p>
          ) : (
            invoicePaymentList.map((payment) => (
              <div key={payment.id} style={styles.paymentHistoryRow}>
                <div>
                  <strong>{formatMoney(payment.amount)}</strong>
                  <span>{payment.method} · {payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : "—"}</span>
                </div>
                <em>{payment.notes || ""}</em>
              </div>
            ))
          )}
        </div>
      </aside>
    );
  }

  if (type === "project" && project) {
    const quote = quotes.find((q) => q.id === project.quote_id);
    const soldTo = accounts.find((a) => a.id === project.sold_to_account_id);
    const shipTo = accounts.find((a) => a.id === project.ship_to_account_id);

    return (
      <aside style={styles.recordDrawer} data-mobile-drawer="true">
        <div style={styles.drawerHeader}>
          <div>
            <p style={styles.sfObjectLabel}>Project</p>
            <h2 style={styles.drawerTitle}>{project.project_name}</h2>
          </div>
        </div>

        <div style={styles.drawerActions}>
          {quote && <button style={styles.goldBtn} onClick={() => onOpenQuote(quote)}>Open Quote</button>}
          <button style={styles.goldBtn} onClick={() => onSaveProjectDetails(project)}>Save Project</button>
        </div>

        <div style={styles.drawerStageGrid}>
          {projectStatuses.map((status) => (
            <button
              key={status}
              style={{
                ...styles.drawerStageChip,
                ...(projectEditor.status === status ? styles.drawerStageChipActive : {}),
              }}
              onClick={() => {
                setProjectEditor({ ...projectEditor, status });
                onUpdateProjectStatus(project, status);
              }}
            >
              {status}
            </button>
          ))}
        </div>

        <div style={styles.drawerCard}>
          <InfoRow label="Project #" value={project.project_number} />
          <InfoRow label="Status" value={<StatusPill status={projectEditor.status || project.status} />} />
          <InfoRow label="Sold To" value={soldTo?.account_name} />
          <InfoRow label="Ship To" value={shipTo?.account_name} />
          <InfoRow label="Amount" value={formatMoney(project.total_amount)} />
          <InfoRow label="Address" value={project.address} />
          <InfoRow label="Location" value={[project.city, project.state, project.zip_code].filter(Boolean).join(", ")} />
        </div>

        <h3 style={styles.drawerSectionTitle}>Create Invoice</h3>
        <div style={styles.invoiceCreateBox}>
          <input
            style={styles.modalInput}
            placeholder="Invoice Amount"
            value={invoiceForm.amount}
            onChange={(e) => setInvoiceForm({ ...invoiceForm, amount: formatCurrencyInput(e.target.value) })}
          />
          <input
            style={styles.modalInput}
            type="date"
            value={invoiceForm.due_date}
            onChange={(e) => setInvoiceForm({ ...invoiceForm, due_date: e.target.value })}
          />
          <input
            style={styles.modalInput}
            placeholder="Invoice Notes"
            value={invoiceForm.notes}
            onChange={(e) => setInvoiceForm({ ...invoiceForm, notes: e.target.value })}
          />
          <button style={styles.goldBtn} onClick={() => onCreateInvoiceFromProject(project)}>
            Create Invoice
          </button>
        </div>

        <h3 style={styles.drawerSectionTitle}>Project Invoices</h3>
        <div style={styles.projectInvoiceList}>
          {invoices.filter((invoice) => invoice.project_id === project.id).length === 0 ? (
            <p style={styles.drawerMuted}>No invoices created yet.</p>
          ) : (
            invoices.filter((invoice) => invoice.project_id === project.id).map((invoice) => (
              <button key={invoice.id} style={styles.relatedRow} onClick={() => onOpenInvoice(invoice)}>
                <span>{invoice.invoice_number} · {localInvoiceStatus(invoice)}</span>
                <strong>{formatMoney(cleanCurrency(invoice.amount) - localInvoicePaidTotal(invoice.id))}</strong>
              </button>
            ))
          )}
        </div>

        <h3 style={styles.drawerSectionTitle}>Project Dates</h3>
        <div style={styles.projectDateGrid} data-mobile-two-col="true">
          <label>
            <span>Deposit Received</span>
            <input style={styles.modalInput} type="date" value={projectEditor.deposit_received_date || ""} onChange={(e) => setProjectEditor({ ...projectEditor, deposit_received_date: e.target.value })} />
          </label>
          <label>
            <span>Material Ordered</span>
            <input style={styles.modalInput} type="date" value={projectEditor.material_ordered_date || ""} onChange={(e) => setProjectEditor({ ...projectEditor, material_ordered_date: e.target.value })} />
          </label>
          <label>
            <span>Install Date</span>
            <input style={styles.modalInput} type="date" value={projectEditor.install_date || ""} onChange={(e) => setProjectEditor({ ...projectEditor, install_date: e.target.value })} />
          </label>
          <label>
            <span>Completed Date</span>
            <input style={styles.modalInput} type="date" value={projectEditor.completed_date || ""} onChange={(e) => setProjectEditor({ ...projectEditor, completed_date: e.target.value })} />
          </label>
        </div>

        <h3 style={styles.drawerSectionTitle}>Project Notes</h3>
        <div style={styles.projectNotesBox}>
          <textarea
            style={styles.projectNotesTextarea}
            value={projectEditor.notes || ""}
            placeholder="Add project production notes, material updates, installation details..."
            onChange={(e) => setProjectEditor({ ...projectEditor, notes: e.target.value })}
          />
        </div>
      </aside>
    );
  }

  return null;
}

function InfoRow({ label, value }) {
  return (
    <div style={styles.infoRow}>
      <span>{label}</span>
      <strong>{value || "—"}</strong>
    </div>
  );
}

function StatusPill({ status }) {
  const statusStyle =
    status === "Approved"
      ? styles.statusPillApproved
      : status === "Sent"
      ? styles.statusPillSent
      : status === "Rejected"
      ? styles.statusPillRejected
      : styles.statusPill;

  return <span style={statusStyle}>{status || "Draft"}</span>;
}




function SearchGroup({ title, items, emptyText, renderItem }) {
  return (
    <div style={styles.searchGroup}>
      <p style={styles.searchGroupTitle}>{title}</p>
      {items.length === 0 ? (
        <p style={styles.searchEmpty}>{emptyText}</p>
      ) : (
        items.map((item) => renderItem(item))
      )}
    </div>
  );
}

function SearchResultsCard({ title, children }) {
  return (
    <div style={styles.searchResultsCard}>
      <h3 style={styles.cardTitle}>{title}</h3>
      {children}
    </div>
  );
}

function DashboardMetric({ title, value, caption }) {
  return (
    <div style={styles.dashboardMetric}>
      <p style={styles.metricTitle}>{title}</p>
      <h2 style={styles.metricValue}>{value}</h2>
      <span style={styles.metricCaption}>{caption}</span>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div style={styles.statCard}>
      <p style={styles.statTitle}>{title}</p>
      <h2 style={styles.statValue}>{value}</h2>
    </div>
  );
}

function ActionGroup({ children }) {
  return <div style={styles.actionGroup}>{children}</div>;
}

function DataTable({ columns, rows }) {
  const [sortConfig, setSortConfig] = useState({ index: null, direction: "asc" });

  function getCellText(cell) {
    if (cell === null || cell === undefined) return "";

    if (typeof cell === "string" || typeof cell === "number") {
      return String(cell);
    }

    if (Array.isArray(cell)) {
      return cell.map(getCellText).join(" ");
    }

    if (cell?.props?.children) {
      return getCellText(cell.props.children);
    }

    return "";
  }

  function normalizeSortValue(value) {
    const text = String(value || "").trim();

    const currencyNumber = text.replace(/[$,\s]/g, "");
    if (currencyNumber && !Number.isNaN(Number(currencyNumber))) {
      return Number(currencyNumber);
    }

    const idNumber = text.match(/[A-Za-z]+-?(\d+)/);
    if (idNumber) {
      return Number(idNumber[1]);
    }

    return text.toLowerCase();
  }

  function sortRows(data) {
    if (sortConfig.index === null) return data;

    return [...data].sort((a, b) => {
      const valueA = normalizeSortValue(getCellText(a[sortConfig.index]));
      const valueB = normalizeSortValue(getCellText(b[sortConfig.index]));

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
      }

      if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  function handleSort(index, column) {
    if (String(column).toLowerCase() === "actions") return;

    setSortConfig((prev) => ({
      index,
      direction: prev.index === index && prev.direction === "asc" ? "desc" : "asc",
    }));
  }

  function sortIcon(index, column) {
    if (String(column).toLowerCase() === "actions") return "";
    if (sortConfig.index !== index) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  }

  const sortedRows = sortRows(rows);

  return (
    <div style={styles.tableWrap} data-mobile-table="true">
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={c} style={styles.th}>
                <button
                  type="button"
                  style={styles.sortHeaderBtn}
                  onClick={() => handleSort(i, c)}
                >
                  <span>{c}</span>
                  <span style={styles.sortIcon}>{sortIcon(i, c)}</span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((r, i) => (
            <tr key={i}>{r.map((cell, j) => <td key={j} style={styles.td}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#080806",
    color: "#F5F0E8",
    fontFamily: "Inter, Arial",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  

  pageShell: {
    width: "100%",
    maxWidth: 1600,
    margin: "0 auto",
    minHeight: "100vh",
    background: "#080806",
    overflow: "hidden",
  },

  loginPage: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0A0A09" },
  loginBox: { background: "#1A1816", padding: 34, borderRadius: 18, width: 380, border: "1px solid rgba(201,169,110,0.25)", display: "grid", gap: 12 },
  loginLogo: { height: 90, width: "auto", display: "block", margin: "0 auto 14px" },

  topbar: {
    height: 74,
    display: "grid",
    gridTemplateColumns: "240px minmax(280px, 1fr) 110px",
    gap: 20,
    alignItems: "center",
    padding: "0 28px",
    borderBottom: "1px solid rgba(201,169,110,0.25)",
    background: "#080806",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },

  brand: { display: "flex", alignItems: "center" },
  logoImg: { height: 54, width: "auto", display: "block" },

  globalSearch: {
    padding: 11,
    borderRadius: 8,
    border: "1px solid rgba(201,169,110,0.35)",
    width: "100%",
    background: "#F5F0E8",
    color: "#0A0A09",
  },

  nav: { display: "flex", gap: 6, padding: "8px 28px", borderBottom: "1px solid #ddd6c7", background: "#ffffff", justifyContent: "center", flexWrap: "wrap" },
  navBtn: { background: "transparent", color: "#374151", border: "1px solid #e5e1d8", padding: "8px 14px", borderRadius: 999, cursor: "pointer", fontWeight: 700 },
  navActive: { background: "#111111", color: "#E6C37A", border: "1px solid #111111", padding: "8px 14px", borderRadius: 999, fontWeight: "bold", cursor: "pointer" },

  grid: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) 360px", gap: 18, padding: 20, width: "100%" },
  viewArea: {
    minHeight: 680,
    width: "calc(100% - 40px)",
    margin: "20px",
    background: "#111111",
    border: "1px solid rgba(201,169,110,0.16)",
    borderRadius: 16,
    overflow: "hidden",
    paddingBottom: 18,
  },

  mainPanel: { background: "#ffffff", border: "1px solid #e5e1d8", borderRadius: 14, padding: 18, color: "#1f2937", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" },
  sidePanel: { background: "#ffffff", border: "1px solid #e5e1d8", borderRadius: 14, padding: 18, color: "#1f2937", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" },
  stats: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 },
  statCard: {
    background: "linear-gradient(145deg, #ffffff, #fbfaf7)",
    border: "1px solid #e5dcc8",
    borderRadius: 12,
    padding: 16,
    color: "#111827",
    boxShadow: "0 8px 22px rgba(0,0,0,0.05)",
  },

  recordHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 28px 12px",
    background: "#ffffff",
    color: "#111827",
    borderBottom: "1px solid #e5e1d8",
  },
  formBar: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    padding: "12px 28px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e1d8",
    alignItems: "center",
  },
  formBarNoPad: { display: "flex", gap: 10, flexWrap: "wrap", padding: "0 0 20px" },

  input: { padding: "8px 10px", borderRadius: 6, border: "1px solid #cfd4dc", background: "#ffffff", color: "#111827", minHeight: 34 },
  inputSmall: { padding: "8px 10px", borderRadius: 6, border: "1px solid #cfd4dc", background: "#ffffff", color: "#111827", width: 110, minHeight: 34 },
  inputWide: { padding: 10, borderRadius: 8, border: "1px solid rgba(201,169,110,0.25)", background: "#F5F0E8", color: "#0A0A09", width: "100%" },
  textarea: { padding: 10, borderRadius: 8, border: "1px solid rgba(201,169,110,0.25)", background: "#F5F0E8", color: "#0A0A09", width: "100%", minHeight: 90 },

  goldBtn: { background: "#C9A96E", color: "#0A0A09", border: "none", padding: "10px 16px", borderRadius: 8, fontWeight: "bold", cursor: "pointer" },
  outlineBtn: { background: "transparent", color: "#F5F0E8", border: "1px solid rgba(201,169,110,0.4)", padding: "10px 16px", borderRadius: 8, cursor: "pointer" },
  smallBtn: { background: "#2A2826", color: "#F5F0E8", border: "1px solid rgba(201,169,110,0.2)", borderRadius: 6, padding: "6px 10px", cursor: "pointer" },
  dangerBtn: { background: "#7f1d1d", color: "#ffffff", border: "1px solid #991b1b", borderRadius: 6, padding: "6px 10px", cursor: "pointer" },
  linkBtn: { background: "transparent", color: "#C9A96E", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 },
  actionGroup: { display: "flex", gap: 6, flexWrap: "wrap" },

  tableWrap: {
    margin: "12px 0 0",
    background: "#ffffff",
    borderRadius: 10,
    overflow: "auto",
    maxWidth: "100%",
    border: "1px solid #e5e1d8",
    boxShadow: "none",
  },
  table: { width: "100%", borderCollapse: "collapse", color: "#1f2937", fontSize: 13 },
  th: { textAlign: "left", borderBottom: "1px solid #e5e7eb", padding: "9px 12px", background: "#f9fafb", color: "#6B7280", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 },
  td: { borderBottom: "1px solid #ddd", padding: 10, fontSize: 12, verticalAlign: "top" },

  detailHeader: { margin: 28, padding: 22, borderRadius: 12, background: "#1A1816", border: "1px solid rgba(201,169,110,0.18)", display: "flex", justifyContent: "space-between", gap: 20 },
  objectLabel: { color: "#C9A96E", textTransform: "uppercase", letterSpacing: 2 },
  amountBox: {
    color: "#C9A96E",
    fontWeight: "bold",
    display: "grid",
    gap: 4,
    textAlign: "right",
  },
  detailGrid: { display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(360px, 520px)", gap: 18, padding: "0 28px 28px", width: "100%" },
  quoteDetailGrid: { display: "grid", gridTemplateColumns: "minmax(520px, 1fr) 520px", gap: 18, padding: "0 28px 28px", alignItems: "start" },
  detailPanel: { background: "#1A1816", border: "1px solid rgba(201,169,110,0.18)", borderRadius: 12, padding: 18 },
  previewPanel: {
    background: "#1A1816",
    border: "1px solid rgba(201,169,110,0.20)",
    borderRadius: 14,
    padding: 16,
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
    position: "sticky",
    top: 150,
    maxHeight: "calc(100vh - 180px)",
    overflow: "auto",
  },
  previewHeader: {
    marginBottom: 12,
    textAlign: "center",
    color: "#F5F0E8",
  },
  previewFrame: {
    background: "#ffffff",
    border: "1px solid #e5e1d8",
    borderRadius: 14,
    padding: 18,
    overflow: "auto",
    boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
  },
  previewScaler: {
    width: 960,
    transform: "scale(0.48)",
    transformOrigin: "top left",
    height: 790,
  },
  printOnlyQuote: { position: "absolute", left: -10000, top: 0, width: 960 },

  miniCard: { borderTop: "1px solid rgba(201,169,110,0.18)", padding: "12px 0" },

  pipelineWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 4,
    margin: "0 28px 28px",
    background: "#141312",
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(201,169,110,0.18)",
  },
  pipelineStage: {
    background: "#2A2826",
    color: "#F5F0E8",
    border: "1px solid rgba(201,169,110,0.18)",
    padding: "12px 8px",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    clipPath: "polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%, 8% 50%)",
  },
  pipelineStageActive: { background: "#C9A96E", color: "#0A0A09", border: "1px solid #C9A96E" },
  pipelineStageCompleted: { background: "rgba(201,169,110,0.35)", color: "#F5F0E8" },
  pipelineStageLost: { background: "#991b1b", color: "#ffffff", border: "1px solid #991b1b" },

  photoGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))", gap: 10, marginTop: 12 },
  photoCard: { background: "#141312", border: "1px solid rgba(201,169,110,0.18)", borderRadius: 10, padding: 8 },
  photoThumb: { width: "100%", height: 85, objectFit: "cover", borderRadius: 8, cursor: "pointer", border: "1px solid rgba(201,169,110,0.25)" },
  dangerBtnFull: { background: "#7f1d1d", color: "#ffffff", border: "1px solid #991b1b", borderRadius: 6, padding: "6px 10px", cursor: "pointer", width: "100%", marginTop: 6 },
  lightbox: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 },
  lightboxImg: { maxWidth: "90vw", maxHeight: "90vh", borderRadius: 12 },

  quoteToolbar: { display: "flex", gap: 10, padding: 28, justifyContent: "center", flexWrap: "wrap" },

  quotePreviewPro: {
    background: "#ffffff",
    color: "#111111",
    margin: 0,
    padding: 34,
    borderRadius: 6,
    maxWidth: 960,
    position: "relative",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
  },

  quoteWatermarkPro: {
    position: "absolute",
    top: "38%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 420,
    color: "rgba(201,169,110,0.055)",
    fontWeight: "bold",
    zIndex: 0,
    lineHeight: 1,
  },

  quoteTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    position: "relative",
    zIndex: 1,
  },

  quoteLogoPro: { width: 320, height: "auto" },
  quoteTopRight: { textAlign: "right", lineHeight: 1.25 },
  quoteLabel: { color: "#C28B32", fontSize: 34, letterSpacing: 4, fontWeight: 500 },
  quoteNumberPro: { fontSize: 36, fontWeight: 800, margin: "6px 0 12px" },
  goldLine: { height: 3, background: "#C28B32", margin: "28px 0 28px", position: "relative", zIndex: 1 },

  infoBox: {
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr",
    gap: 28,
    border: "1px solid #d6d6d6",
    padding: 26,
    marginBottom: 18,
    position: "relative",
    zIndex: 1,
  },
  infoColumn: { fontSize: 14, lineHeight: 1.45 },
  infoDivider: { background: "rgba(201,169,110,0.45)" },
  goldHeading: { color: "#C28B32", marginTop: 0, textTransform: "uppercase", letterSpacing: 0.5 },
  customerName: { margin: "4px 0 8px", fontSize: 20 },

  summaryBar: { display: "grid", gridTemplateColumns: "1fr 240px", margin: "14px 0 20px", position: "relative", zIndex: 1 },
  summaryTitle: { background: "#151515", color: "#C28B32", fontSize: 22, fontWeight: 800, letterSpacing: 1, padding: "24px 28px" },
  summaryTotal: { background: "#C28B32", color: "#ffffff", padding: "18px 24px", textAlign: "center", display: "grid", gap: 4 },
  scopeLine: { borderBottom: "1px solid #d6d6d6", padding: "0 0 18px", marginBottom: 22, position: "relative", zIndex: 1, fontSize: 14, lineHeight: 1.45 },
  goldInline: { color: "#C28B32" },

  quoteSectionGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 34px", position: "relative", zIndex: 1 },
  quoteSectionPro: { pageBreakInside: "avoid" },
  quoteSectionTitle: { color: "#C28B32", textTransform: "uppercase", borderBottom: "1px solid rgba(194,139,50,0.55)", paddingBottom: 7, margin: "0 0 9px", fontSize: 17 },
  quoteSectionText: { whiteSpace: "pre-line", lineHeight: 1.35, fontSize: 13.5, margin: 0 },

  signatureArea: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, borderTop: "2px solid rgba(201,169,110,0.65)", marginTop: 24, paddingTop: 18, position: "relative", zIndex: 1, fontSize: 14 },
  signatureText: { fontSize: 30, fontFamily: "cursive", margin: "8px 0 12px" },

  fieldBlock: { marginBottom: 12 },
  fieldLabel: { display: "block", marginBottom: 6, color: "#C9A96E", fontWeight: "bold" },
  muted: { color: "#AFA9A3" },

  quoteDocumentLuxury: {
    width: 960,
    background: "#ffffff",
    color: "#151515",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  quotePageLuxury: {
    width: 960,
    minHeight: 1240,
    background: "#ffffff",
    color: "#151515",
    padding: "54px 62px",
    position: "relative",
    overflow: "hidden",
    pageBreakAfter: "always",
    boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
  },
  quoteCoverPage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    background: "linear-gradient(180deg, #ffffff 0%, #fbfaf7 100%)",
  },
  coverWatermark: { position: "absolute", top: "48%", left: "50%", transform: "translate(-50%, -50%)", fontSize: 620, color: "rgba(201,169,110,0.055)", lineHeight: 1, fontWeight: 700, zIndex: 0 },
  coverTopNote: { position: "relative", zIndex: 1, maxWidth: 520, margin: "0 auto", fontSize: 15, lineHeight: 1.45, color: "#555" },
  coverCenterBlock: { position: "relative", zIndex: 1, marginTop: 80 },
  coverLogo: { width: 360, height: "auto", marginBottom: 26 },
  coverGoldRule: { width: 150, height: 3, background: "#C9A96E", margin: "0 auto 28px" },
  coverEyebrow: { color: "#C28B32", fontSize: 18, letterSpacing: 5, textTransform: "uppercase", margin: "0 0 14px", fontFamily: "Arial, sans-serif" },
  coverQuoteNumber: { fontSize: 56, margin: "0 0 22px", color: "#111", fontFamily: "Arial, sans-serif", letterSpacing: 1 },
  coverProject: { fontSize: 30, fontWeight: 500, margin: "0 0 40px", color: "#222" },
  coverPrepared: { color: "#9a7a3a", textTransform: "uppercase", letterSpacing: 3, fontSize: 13, margin: "0 0 10px", fontFamily: "Arial, sans-serif" },
  coverCustomer: { fontSize: 28, margin: "0 0 16px", color: "#111" },
  coverDate: { color: "#555", fontSize: 16 },
  coverFooter: { position: "relative", zIndex: 1, fontFamily: "Arial, sans-serif", color: "#777", fontSize: 13, letterSpacing: 2 },
  pageWatermark: { position: "absolute", top: "52%", left: "50%", transform: "translate(-50%, -50%)", fontSize: 560, color: "rgba(201,169,110,0.045)", lineHeight: 1, fontWeight: 700, zIndex: 0 },
  quotePageHeaderLuxury: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 22, marginBottom: 28, borderBottom: "3px solid #C9A96E", position: "relative", zIndex: 1, fontFamily: "Arial, sans-serif" },
  pageLogoLuxury: { width: 230, height: "auto" },
  pageHeaderRightLuxury: { display: "grid", gap: 5, textAlign: "right", color: "#222", fontSize: 13 },
  clientProjectGridLuxury: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 26, position: "relative", zIndex: 1 },
  clientBoxLuxury: { border: "1px solid #ddd6c8", padding: 22, minHeight: 150, background: "rgba(255,255,255,0.86)" },
  projectBoxLuxury: { border: "1px solid #ddd6c8", padding: 22, minHeight: 150, background: "rgba(255,255,255,0.86)" },
  luxurySmallHeading: { margin: "0 0 12px", color: "#C28B32", textTransform: "uppercase", letterSpacing: 1.5, fontFamily: "Arial, sans-serif", fontSize: 14 },
  luxuryClientName: { margin: "0 0 12px", fontSize: 24, color: "#111" },
  netPriceBandLuxury: { display: "grid", gridTemplateColumns: "300px 1fr", alignItems: "center", background: "#111111", color: "#ffffff", margin: "0 0 30px", position: "relative", zIndex: 1 },
  netPriceLabel: { margin: 0, padding: "22px 24px 4px", color: "#C9A96E", textTransform: "uppercase", letterSpacing: 2, fontFamily: "Arial, sans-serif", fontSize: 13 },
  netPriceAmount: { margin: 0, padding: "0 24px 22px", fontFamily: "Arial, sans-serif", fontSize: 30, color: "#E6C37A", fontWeight: 800, letterSpacing: 1 },
  netPriceNote: { margin: 0, padding: "22px 28px", borderLeft: "1px solid rgba(201,169,110,0.35)", color: "#ddd", fontSize: 14, lineHeight: 1.45 },
  contentSectionLuxury: { position: "relative", zIndex: 1, marginBottom: 26, pageBreakInside: "avoid" },
  contentTitleLuxury: { margin: "0 0 10px", color: "#C28B32", fontSize: 19, textTransform: "uppercase", letterSpacing: 1.4, fontFamily: "Arial, sans-serif", borderBottom: "1px solid #d8c08a", paddingBottom: 9 },
  contentTextLuxury: { whiteSpace: "pre-line", margin: 0, lineHeight: 1.55, fontSize: 15, color: "#222" },
  conditionsBoxLuxury: { position: "relative", zIndex: 1, border: "1px solid #ddd6c8", padding: "22px 24px", marginTop: 6, background: "rgba(255,255,255,0.9)" },
  conditionsListLuxury: { margin: "0 0 0 18px", padding: 0, lineHeight: 1.55, fontSize: 14 },
  acceptanceBoxLuxury: { position: "relative", zIndex: 1, marginTop: 28, paddingTop: 22, borderTop: "3px solid #C9A96E" },
  acceptanceIntroLuxury: { fontSize: 15, lineHeight: 1.55, marginBottom: 28 },
  signatureGridLuxury: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 28px", fontSize: 14, fontFamily: "Arial, sans-serif" },
  luxuryThankYou: { position: "absolute", bottom: 42, left: 62, right: 62, display: "flex", justifyContent: "space-between", borderTop: "1px solid #ddd6c8", paddingTop: 14, color: "#555", fontSize: 14 },

  previewScaler: { width: 960, transform: "scale(0.48)", transformOrigin: "top left", height: 1900 },
  printOnlyQuote: { position: "absolute", left: -10000, top: 0, width: 960 },

  sfListHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 28px 12px",
    background: "#ffffff",
    color: "#111827",
    borderBottom: "1px solid #e5e1d8",
  },
  sfObjectLabel: {
    margin: 0,
    color: "#8b6f36",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontWeight: 900,
  },
  recordDrawer: {
    position: "fixed",
    right: 22,
    top: 132,
    width: 460,
    maxWidth: "calc(100vw - 44px)",
    maxHeight: "calc(100vh - 152px)",
    overflowY: "auto",
    overflowX: "hidden",
    background: "#ffffff",
    color: "#111827",
    border: "1px solid #ddd6c7",
    borderRadius: 16,
    boxShadow: "0 24px 70px rgba(0,0,0,0.32)",
    zIndex: 70,
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    padding: 20,
    borderBottom: "1px solid #ebe7dd",
    background: "linear-gradient(180deg, #fffdf8, #f8f6f1)",
    color: "#111827",
  },
  drawerClose: {
    width: 34,
    height: 34,
    borderRadius: 999,
    border: "1px solid #ddd6c7",
    background: "#ffffff",
    cursor: "pointer",
    fontSize: 24,
    lineHeight: 1,
  },
  drawerActions: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    padding: "14px 20px",
    borderBottom: "1px solid #ebe7dd",
  },
  drawerCard: {
    margin: 20,
    border: "1px solid #ebe7dd",
    borderRadius: 12,
    overflow: "hidden",
    background: "#fff",
  },
  infoRow: {
    display: "grid",
    gridTemplateColumns: "135px minmax(0, 1fr)",
    gap: 12,
    padding: "11px 14px",
    borderBottom: "1px solid #f0ede6",
    fontSize: 13,
    color: "#111827",
    overflowWrap: "anywhere",
  },
  drawerSectionTitle: {
    margin: "18px 20px 10px",
    color: "#111827",
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  drawerMuted: {
    margin: "0 20px 18px",
    color: "#6b7280",
    fontSize: 13,
  },
  relatedRow: {
    width: "calc(100% - 40px)",
    margin: "0 20px 8px",
    padding: "12px 14px",
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    border: "1px solid #ebe7dd",
    borderRadius: 10,
    background: "#fbfaf7",
    color: "#111827",
    cursor: "pointer",
    textAlign: "left",
    overflowWrap: "anywhere",
  },
  statusPill: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "4px 10px",
    background: "rgba(201,169,110,0.18)",
    color: "#7a5a18",
    fontSize: 12,
    fontWeight: 800,
  },
  drawerHighlight: {
    margin: 20,
    padding: 18,
    borderRadius: 14,
    background: "#111111",
    color: "#E6C37A",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  drawerPhotoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
    padding: "0 20px 20px",
  },
  drawerPhoto: {
    width: "100%",
    height: 72,
    objectFit: "cover",
    borderRadius: 8,
    border: "1px solid #ebe7dd",
    cursor: "pointer",
    display: "block",
  },

  sfListTitle: {
    margin: "3px 0 0",
    color: "#111827",
    fontSize: 22,
    lineHeight: 1.1,
  },
  sfHeaderHint: {
    color: "#6b7280",
    fontSize: 12,
    border: "1px solid #e5e1d8",
    background: "#fbfaf7",
    borderRadius: 999,
    padding: "7px 12px",
  },
  drawerOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.18)",
    zIndex: 65,
  },
  drawerStageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 8,
    padding: "14px 20px",
    background: "#ffffff",
    borderBottom: "1px solid #ebe7dd",
  },
  drawerStageChip: {
    border: "1px solid #e5dcc8",
    background: "#fbfaf7",
    color: "#111827",
    borderRadius: 999,
    padding: "9px 10px",
    fontSize: 12,
    fontWeight: 800,
    cursor: "pointer",
    whiteSpace: "normal",
    lineHeight: 1.15,
  },
  drawerStageChipActive: {
    background: "#C9A96E",
    border: "1px solid #C9A96E",
    color: "#0A0A09",
  },
  drawerStageChipLost: {
    background: "#991b1b",
    border: "1px solid #991b1b",
    color: "#ffffff",
  },

  drawerTitle: {
    margin: "4px 0 0",
    color: "#111827",
    fontSize: 22,
    lineHeight: 1.15,
    fontWeight: 900,
  },
  dashboardSectionTitle: {
  fontSize: 18,
  fontWeight: 600,
  letterSpacing: 0.5,
},
  statTitle: {
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: 0.5,
  color: "#374151",
  textTransform: "uppercase",
  },
  statValue: {
  fontSize: 22,
  fontWeight: 600,
  color: "#C9A96E",
},

  previewHelpText: {
    color: "#C8C0B8",
    margin: "6px 0 14px",
    fontSize: 13,
    lineHeight: 1.4,
  },

  drawerUploadBox: {
    margin: "0 20px 14px",
    padding: 12,
    border: "1px dashed #d8d2c4",
    borderRadius: 12,
    background: "#fbfaf7",
  },
  drawerFileInput: {
    width: "100%",
    color: "#111827",
    fontSize: 12,
  },
  drawerPhotoCard: {
    background: "#fbfaf7",
    border: "1px solid #ebe7dd",
    borderRadius: 10,
    padding: 6,
  },
  drawerPhotoDelete: {
    width: "100%",
    marginTop: 6,
    padding: "6px 8px",
    borderRadius: 7,
    border: "1px solid #7f1d1d",
    background: "#8B1E1E",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: 11,
    fontWeight: 800,
  },

  refreshBtn: {
    background: "#C9A96E",
    color: "#0A0A09",
    border: "1px solid #C9A96E",
    borderRadius: 10,
    padding: "10px 16px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(201,169,110,0.28)",
    whiteSpace: "nowrap",
  },

  accountFormCard: {
    display: "grid",
    gap: 12,
    padding: "16px 28px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e1d8",
  },
  accountFormRowTop: {
    display: "grid",
    gridTemplateColumns: "minmax(260px, 1fr) 180px",
    gap: 12,
  },
  accountFormRowCity: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 1fr) 130px 160px",
    gap: 12,
  },
  accountFormRowContact: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 1fr) minmax(180px, 0.8fr) minmax(220px, 1fr) auto",
    gap: 12,
    alignItems: "center",
  },
  accountInputFull: {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 8,
    border: "1px solid #cfd4dc",
    background: "#ffffff",
    color: "#111827",
    minHeight: 42,
    fontSize: 14,
  },
  accountInputWide: {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 8,
    border: "1px solid #cfd4dc",
    background: "#ffffff",
    color: "#111827",
    minHeight: 42,
    fontSize: 14,
  },
  accountInputType: {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 8,
    border: "1px solid #cfd4dc",
    background: "#ffffff",
    color: "#111827",
    minHeight: 42,
    fontSize: 14,
  },
  accountInputState: {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 8,
    border: "1px solid #cfd4dc",
    background: "#ffffff",
    color: "#111827",
    minHeight: 42,
    fontSize: 14,
  },
  accountInputZip: {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 8,
    border: "1px solid #cfd4dc",
    background: "#ffffff",
    color: "#111827",
    minHeight: 42,
    fontSize: 14,
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.58)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  accountEditModal: {
    width: 620,
    maxWidth: "95vw",
    maxHeight: "92vh",
    overflow: "auto",
    background: "#ffffff",
    color: "#111827",
    border: "1px solid #e5dcc8",
    borderRadius: 18,
    boxShadow: "0 30px 90px rgba(0,0,0,0.45)",
  },
  modalHeader: {
    padding: "22px 24px",
    borderBottom: "1px solid #e5e1d8",
    background: "linear-gradient(180deg, #fffdf8, #f8f6f1)",
  },
  modalTitle: {
    color: "#111827",
    margin: "4px 0 0",
    fontSize: 22,
    fontWeight: 800,
  },
  modalFormStack: {
    padding: 24,
    display: "grid",
    gap: 8,
  },
  modalLabel: {
    color: "#8B6F36",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: 800,
    marginTop: 6,
  },
  modalInput: {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 8,
    border: "1px solid #cfd4dc",
    background: "#ffffff",
    color: "#111827",
    fontSize: 14,
    minHeight: 42,
  },
  modalCityRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 120px 150px",
    gap: 10,
  },
  modalStateSelect: {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 8,
    border: "1px solid #cfd4dc",
    background: "#ffffff",
    color: "#111827",
    fontSize: 14,
    minHeight: 42,
  },
  modalZipInput: {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 8,
    border: "1px solid #cfd4dc",
    background: "#ffffff",
    color: "#111827",
    fontSize: 14,
    minHeight: 42,
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    padding: "16px 24px 22px",
    borderTop: "1px solid #e5e1d8",
  },
  outlineDarkBtn: {
    background: "#ffffff",
    color: "#111827",
    border: "1px solid #d8d2c4",
    padding: "10px 16px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
  },

  statusBtnSent: {
    background: "#111827",
    color: "#F5F0E8",
    border: "1px solid rgba(201,169,110,0.35)",
    padding: "10px 16px",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
  },
  statusBtnApproved: {
    background: "#166534",
    color: "#ffffff",
    border: "1px solid #166534",
    padding: "10px 16px",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
  },
  statusMiniSent: {
    background: "#111827",
    color: "#F5F0E8",
    border: "1px solid rgba(201,169,110,0.35)",
    borderRadius: 6,
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: 700,
  },
  statusMiniApproved: {
    background: "#166534",
    color: "#ffffff",
    border: "1px solid #166534",
    borderRadius: 6,
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: 700,
  },
  statusPillSent: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "4px 10px",
    background: "rgba(17,24,39,0.10)",
    color: "#111827",
    fontSize: 12,
    fontWeight: 800,
  },
  statusPillApproved: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "4px 10px",
    background: "rgba(22,101,52,0.12)",
    color: "#166534",
    fontSize: 12,
    fontWeight: 800,
  },
  statusPillRejected: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "4px 10px",
    background: "rgba(127,29,29,0.12)",
    color: "#7f1d1d",
    fontSize: 12,
    fontWeight: 800,
  },

  sortHeaderBtn: {
    width: "100%",
    background: "transparent",
    border: "none",
    color: "#6B7280",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: 0,
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: 800,
    textAlign: "left",
  },
  sortIcon: {
    color: "#8B6F36",
    fontSize: 12,
    fontWeight: 900,
  },

  searchWrap: {
    position: "relative",
    width: "100%",
    maxWidth: 680,
    justifySelf: "center",
  },
  searchDropdown: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    right: 0,
    background: "#ffffff",
    color: "#111827",
    border: "1px solid #e5e1d8",
    borderRadius: 14,
    boxShadow: "0 22px 70px rgba(0,0,0,0.35)",
    zIndex: 2000,
    overflow: "hidden",
  },
  searchDropdownHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    borderBottom: "1px solid #eee8db",
    background: "#fbfaf7",
  },
  searchViewAllBtn: {
    background: "#C9A96E",
    color: "#0A0A09",
    border: "1px solid #C9A96E",
    borderRadius: 999,
    padding: "6px 10px",
    fontWeight: 800,
    cursor: "pointer",
  },
  searchGroup: {
    padding: "10px 14px",
    borderBottom: "1px solid #f0ede6",
  },
  searchGroupTitle: {
    margin: "0 0 8px",
    color: "#8B6F36",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: 900,
  },
  searchResultItem: {
    width: "100%",
    display: "grid",
    gap: 3,
    textAlign: "left",
    border: "none",
    background: "transparent",
    padding: "8px 6px",
    borderRadius: 8,
    cursor: "pointer",
    color: "#111827",
  },
  searchEmpty: {
    margin: 0,
    color: "#6b7280",
    fontSize: 12,
  },
  searchResultsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 14,
    padding: 20,
  },
  searchResultsCard: {
    background: "#ffffff",
    color: "#111827",
    border: "1px solid #e5e1d8",
    borderRadius: 14,
    padding: 16,
    minWidth: 0,
  },
  searchFullRow: {
    width: "100%",
    border: "1px solid #eee8db",
    background: "#fbfaf7",
    borderRadius: 10,
    padding: "11px 12px",
    marginTop: 8,
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    cursor: "pointer",
    textAlign: "left",
    color: "#111827",
  },
  emailLink: {
    color: "#8B6F36",
    fontWeight: 800,
    textDecoration: "none",
  },
  callLogBox: {
    marginTop: 22,
    paddingTop: 18,
    borderTop: "1px solid rgba(201,169,110,0.22)",
  },
  callLogTitle: {
    color: "#C9A96E",
    margin: "0 0 10px",
  },
  callLogTextarea: {
    width: "100%",
    minHeight: 90,
    padding: 10,
    borderRadius: 8,
    border: "1px solid rgba(201,169,110,0.25)",
    background: "#F5F0E8",
    color: "#0A0A09",
    marginBottom: 10,
  },
  callLogList: {
    display: "grid",
    gap: 10,
    marginTop: 14,
  },
  callLogItem: {
    background: "#141312",
    border: "1px solid rgba(201,169,110,0.20)",
    borderRadius: 10,
    padding: 12,
    color: "#F5F0E8",
  },
  callLogMeta: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "center",
    color: "#C9A96E",
    fontSize: 12,
  },
  callLogDelete: {
    background: "#7f1d1d",
    color: "#ffffff",
    border: "1px solid #991b1b",
    borderRadius: 6,
    padding: "4px 8px",
    cursor: "pointer",
    fontSize: 11,
  },

  followUpBadge: {
    borderRadius: 999,
    padding: "5px 9px",
    background: "#f3f4f6",
    color: "#374151",
    fontSize: 11,
    fontWeight: 900,
    whiteSpace: "nowrap",
    fontStyle: "normal",
  },
  followUpOverdue: {
    background: "rgba(127,29,29,0.12)",
    color: "#7f1d1d",
  },
  followUpToday: {
    background: "rgba(201,169,110,0.22)",
    color: "#8B6F36",
  },
  followUpEditorBox: {
    border: "1px solid rgba(201,169,110,0.22)",
    borderRadius: 12,
    padding: 14,
    background: "#141312",
    marginBottom: 14,
  },
  followUpEditorTop: {
    display: "grid",
    gridTemplateColumns: "1fr 190px",
    gap: 12,
    alignItems: "end",
    marginBottom: 12,
  },
  followUpStatusBox: {
    background: "#F5F0E8",
    color: "#0A0A09",
    borderRadius: 10,
    padding: "10px 12px",
    display: "grid",
    gap: 4,
  },

  dashboardPage: {
    padding: 20,
    width: "100%",
    display: "grid",
    gap: 14,
  },
  dashboardHeader: {
    background: "linear-gradient(135deg, #ffffff 0%, #fbfaf7 100%)",
    color: "#111827",
    border: "1px solid #e5e1d8",
    borderRadius: 18,
    padding: "22px 26px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 18,
    boxShadow: "0 14px 40px rgba(0,0,0,0.10)",
    marginBottom: 0,
  },
  dashboardTitle: {
    color: "#111827",
    textAlign: "left",
    margin: "4px 0 8px",
    fontSize: 26,
    fontWeight: 650,
    letterSpacing: 0.2,
  },
  dashboardSubtext: {
    margin: 0,
    color: "#64748b",
    fontSize: 13,
    lineHeight: 1.45,
  },
  dashboardFocusStrip: {
    display: "grid",
    gridTemplateColumns: "1.4fr repeat(3, minmax(150px, 1fr))",
    gap: 10,
  },
  dashboardFocusStripItem: {
    background: "#ffffff",
  },
  dashboardStatsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 12,
    marginBottom: 0,
  },
  dashboardMetric: {
    background: "linear-gradient(180deg, #ffffff, #fbfaf7)",
    color: "#111827",
    border: "1px solid #e5e1d8",
    borderRadius: 16,
    padding: 18,
    boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
    minHeight: 118,
    display: "grid",
    alignContent: "center",
  },
  metricTitle: {
    margin: 0,
    color: "#64748b",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    fontWeight: 900,
  },
  metricValue: {
    margin: "10px 0 5px",
    color: "#8B6F36",
    fontSize: 27,
    fontWeight: 700,
    lineHeight: 1.05,
  },
  metricCaption: {
    color: "#64748b",
    fontSize: 12,
  },
  dashboardSectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    gap: 16,
    margin: "6px 2px -2px",
    color: "#F5F0E8",
  },
  dashboardGridLarge: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.35fr) minmax(340px, 0.65fr)",
    gap: 14,
    marginBottom: 0,
  },
  cardHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
    marginBottom: 14,
    borderBottom: "1px solid #f0ede6",
    paddingBottom: 12,
  },
  stageList: {
    display: "grid",
    gap: 12,
  },
  stageItem: {
    borderTop: "1px solid #f0ede6",
    paddingTop: 11,
  },
  stageName: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
  },
  stageDot: {
    display: "inline-block",
    width: 8,
    height: 8,
    borderRadius: 999,
    background: "#C9A96E",
    boxShadow: "0 0 0 3px rgba(201,169,110,0.15)",
  },
  stageRowTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    color: "#111827",
    fontSize: 13,
    fontWeight: 800,
  },
  stageBarTrack: {
    height: 9,
    borderRadius: 999,
    background: "#f0ede6",
    overflow: "hidden",
    margin: "8px 0 5px",
  },
  stageBarFill: {
    height: "100%",
    borderRadius: 999,
    background: "linear-gradient(90deg, #8B6F36, #C9A96E)",
  },
  stageMeta: {
    margin: 0,
    color: "#64748b",
    fontSize: 11,
  },
  pipelineSummaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 8,
    margin: "12px 0 16px",
  },
  pipelineMiniBox: {
    background: "#fbfaf7",
    border: "1px solid #eee8db",
    borderRadius: 12,
    padding: 11,
    display: "grid",
    gap: 5,
  },

  focusItem: {
    background: "#ffffff",
    color: "#111827",
    border: "1px solid #e5e1d8",
    borderRadius: 14,
    padding: "13px 15px",
    display: "grid",
    gap: 5,
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  },

  quoteBuilderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 14,
  },
  templatePicker: {
    minWidth: 240,
    display: "grid",
    gap: 6,
  },
  templateLabel: {
    color: "#C9A96E",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: 900,
  },
  templateSelect: {
    padding: "9px 11px",
    borderRadius: 8,
    border: "1px solid rgba(201,169,110,0.35)",
    background: "#F5F0E8",
    color: "#0A0A09",
    minHeight: 38,
  },
  templateQuickRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    margin: "0 0 16px",
    paddingBottom: 14,
    borderBottom: "1px solid rgba(201,169,110,0.18)",
  },
  templateQuickBtn: {
    background: "#2A2826",
    color: "#F5F0E8",
    border: "1px solid rgba(201,169,110,0.22)",
    borderRadius: 999,
    padding: "7px 11px",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 800,
  },
  templateQuickActive: {
    background: "#C9A96E",
    color: "#0A0A09",
    border: "1px solid #C9A96E",
    borderRadius: 999,
    padding: "7px 11px",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 900,
  },

  lineItemsBox: {
    background: "#141312",
    border: "1px solid rgba(201,169,110,0.22)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  lineItemsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
    marginBottom: 12,
  },
  lineItemsTitle: {
    color: "#C9A96E",
    margin: 0,
    fontSize: 17,
  },
  lineItemsSubtitle: {
    color: "#AFA9A3",
    margin: "4px 0 0",
    fontSize: 12,
    lineHeight: 1.35,
  },
  lineItemsTotal: {
    color: "#C9A96E",
    fontSize: 18,
    whiteSpace: "nowrap",
  },
  lineItemFormGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  lineItemsEmpty: {
    color: "#AFA9A3",
    fontSize: 13,
    margin: "10px 0 0",
  },
  lineItemsTable: {
    border: "1px solid rgba(201,169,110,0.18)",
    borderRadius: 10,
    overflowX: "auto",
    overflowY: "hidden",
    marginTop: 10,
  },
  lineItemsTableHead: {
    display: "grid",
    gridTemplateColumns: "110px 1fr 1.4fr 70px 100px 110px 80px",
    gap: 8,
    padding: "9px 10px",
    background: "#2A2826",
    color: "#C9A96E",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    fontWeight: 900,
    minWidth: 820,
  },
  lineItemsRow: {
    display: "grid",
    gridTemplateColumns: "110px 1fr 1.4fr 70px 100px 110px 80px",
    gap: 8,
    padding: "9px 10px",
    borderTop: "1px solid rgba(201,169,110,0.12)",
    color: "#F5F0E8",
    fontSize: 12,
    alignItems: "center",
    minWidth: 820,
  },
  lineDeleteBtn: {
    background: "#7f1d1d",
    color: "#ffffff",
    border: "1px solid #991b1b",
    borderRadius: 6,
    padding: "5px 8px",
    cursor: "pointer",
    fontSize: 11,
    fontWeight: 800,
  },
  quoteLineItemsLuxury: {
    border: "1px solid #e5e1d8",
    margin: "24px 0",
    position: "relative",
    zIndex: 1,
  },
  quoteLineItemsHeaderLuxury: {
    display: "grid",
    gridTemplateColumns: "120px 1fr 70px 100px 110px",
    gap: 10,
    padding: "10px 12px",
    background: "#f5f0e8",
    color: "#8B6F36",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontWeight: 800,
  },
  quoteLineItemRowLuxury: {
    display: "grid",
    gridTemplateColumns: "120px 1fr 70px 100px 110px",
    gap: 10,
    padding: "10px 12px",
    borderTop: "1px solid #eee8db",
    fontSize: 12,
    alignItems: "start",
  },
  quoteLineItemsTotalLuxury: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 18,
    padding: "12px",
    borderTop: "2px solid #C9A96E",
    fontSize: 14,
  },

  lineItemField: {
    flex: "1 1 180px",
    minWidth: 150,
  },
  lineItemSmall: {
    flex: "0 0 90px",
    minWidth: 80,
  },
  lineItemButton: {
    flex: "0 0 auto",
  },

  presetNote: {
    color: "#AFA9A3",
    fontSize: 12,
    margin: "0 0 10px",
  },

  productFormCard: {
    display: "grid",
    gridTemplateColumns: "150px minmax(180px, 1fr) minmax(240px, 1.5fr) 140px 90px auto",
    gap: 10,
    padding: "16px 28px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e1d8",
    alignItems: "center",
  },
  productActiveToggle: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    color: "#111827",
    fontSize: 13,
    fontWeight: 700,
  },

  sendQuoteBtn: {
    background: "#2563eb",
    color: "#ffffff",
    border: "1px solid #2563eb",
    padding: "10px 16px",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
  },
  sendQuoteMiniBtn: {
    background: "#2563eb",
    color: "#ffffff",
    border: "1px solid #2563eb",
    borderRadius: 6,
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: 700,
  },
  sendQuoteModal: {
    width: 680,
    maxWidth: "95vw",
    maxHeight: "92vh",
    overflow: "auto",
    background: "#ffffff",
    color: "#111827",
    border: "1px solid #e5dcc8",
    borderRadius: 18,
    boxShadow: "0 30px 90px rgba(0,0,0,0.45)",
  },
  sendQuoteBody: {
    padding: 24,
    display: "grid",
    gap: 8,
  },
  sendQuoteTextarea: {
    width: "100%",
    minHeight: 190,
    padding: "11px 12px",
    borderRadius: 8,
    border: "1px solid #cfd4dc",
    background: "#ffffff",
    color: "#111827",
    fontSize: 14,
    lineHeight: 1.45,
  },
  sendQuoteNotice: {
    background: "#eff6ff",
    color: "#1e3a8a",
    border: "1px solid #bfdbfe",
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    lineHeight: 1.4,
    marginTop: 8,
  },

  publicApprovalPage: {
    minHeight: "100vh",
    background: "#080806",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    fontFamily: "Inter, Arial",
  },
  publicApprovalCard: {
    width: 620,
    maxWidth: "96vw",
    background: "#ffffff",
    color: "#111827",
    borderRadius: 18,
    border: "1px solid #e5dcc8",
    boxShadow: "0 30px 90px rgba(0,0,0,0.45)",
    padding: 30,
  },
  publicApprovalLogo: {
    width: 220,
    display: "block",
    margin: "0 auto 18px",
  },
  publicApprovalEyebrow: {
    color: "#8B6F36",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: 900,
    textAlign: "center",
    margin: "10px 0 6px",
  },
  publicApprovalTitle: {
    color: "#111827",
    textAlign: "center",
    margin: "0 0 18px",
    fontSize: 30,
  },
  publicApprovalSummary: {
    border: "1px solid #eee8db",
    borderRadius: 12,
    overflow: "hidden",
    margin: "18px 0",
  },
  publicApprovalText: {
    color: "#374151",
    lineHeight: 1.5,
    fontSize: 14,
  },
  publicApproveBtn: {
    background: "#166534",
    color: "#ffffff",
    border: "1px solid #166534",
    width: "100%",
    padding: "13px 16px",
    borderRadius: 10,
    fontWeight: 900,
    cursor: "pointer",
    marginTop: 14,
  },
  publicApprovalMuted: {
    color: "#64748b",
    textAlign: "center",
  },
  publicApprovalMessage: {
    color: "#166534",
    textAlign: "center",
    fontWeight: 800,
  },
  publicApprovedBox: {
    background: "rgba(22,101,52,0.10)",
    border: "1px solid rgba(22,101,52,0.25)",
    borderRadius: 12,
    padding: 16,
    color: "#166534",
    textAlign: "center",
  },

  convertProjectBtn: {
    background: "#0f766e",
    color: "#ffffff",
    border: "1px solid #0f766e",
    padding: "10px 16px",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
  },
  convertMiniBtn: {
    background: "#0f766e",
    color: "#ffffff",
    border: "1px solid #0f766e",
    borderRadius: 6,
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: 700,
  },

  projectDateGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    margin: "0 20px 18px",
  },
  projectNotesBox: {
    margin: "0 20px 22px",
  },
  projectNotesTextarea: {
    width: "100%",
    minHeight: 130,
    padding: "11px 12px",
    borderRadius: 10,
    border: "1px solid #cfd4dc",
    background: "#ffffff",
    color: "#111827",
    fontSize: 13,
    lineHeight: 1.45,
  },

  invoiceSummaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 12,
    padding: 20,
  },
  invoiceSummaryCard: {
    background: "#ffffff",
    border: "1px solid #e5e1d8",
    borderRadius: 14,
    padding: 16,
    color: "#111827",
    display: "grid",
    gap: 6,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  invoiceCreateBox: {
    margin: "0 20px 18px",
    display: "grid",
    gap: 8,
    padding: 12,
    border: "1px solid #eee8db",
    borderRadius: 12,
    background: "#fbfaf7",
  },
  projectInvoiceList: {
    margin: "0 0 18px",
  },
  invoicePaymentBox: {
    margin: "0 20px 18px",
    display: "grid",
    gap: 8,
    padding: 12,
    border: "1px solid #eee8db",
    borderRadius: 12,
    background: "#fbfaf7",
  },
  paymentHistoryRow: {
    width: "calc(100% - 40px)",
    margin: "0 20px 8px",
    padding: "12px 14px",
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    border: "1px solid #ebe7dd",
    borderRadius: 10,
    background: "#fbfaf7",
    color: "#111827",
  },

  leadModalTextarea: {
    width: "100%",
    minHeight: 130,
    padding: "11px 12px",
    borderRadius: 8,
    border: "1px solid #cfd4dc",
    background: "#ffffff",
    color: "#111827",
    fontSize: 14,
    lineHeight: 1.45,
  },
  leadDetailsText: {
    color: "#111827",
    margin: 0,
    lineHeight: 1.5,
  },
  leadEmailPreview: {
    whiteSpace: "pre-wrap",
    background: "#fbfaf7",
    border: "1px solid #eee8db",
    borderRadius: 10,
    padding: 12,
    color: "#111827",
    fontFamily: "Inter, Arial",
    lineHeight: 1.45,
  },

  executivePipelineGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.15fr) minmax(360px, 0.85fr)",
    gap: 18,
    marginBottom: 0,
  },
  funnelHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 14,
    alignItems: "flex-start",
    marginBottom: 18,
  },
  funnelTitle: {
    margin: 0,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: 850,
    letterSpacing: 0.2,
  },
  funnelSubtitle: {
    margin: "6px 0 0",
    color: "#cbd5e1",
    fontSize: 13,
  },
  funnelStatsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 10,
    marginBottom: 22,
  },
  funnelBody: {
    display: "grid",
    gridTemplateColumns: "minmax(260px, 1fr) minmax(220px, 0.75fr)",
    gap: 24,
    alignItems: "center",
  },
  funnelShapeWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    padding: "8px 0",
  },
  funnelSegment: {
    minHeight: 48,
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#ffffff",
    borderRadius: "10px 10px 16px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 18px",
    fontWeight: 850,
    cursor: "pointer",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 12px 24px rgba(0,0,0,0.26)",
  },
  funnelNumbers: {
    display: "grid",
    gap: 3,
  },
  funnelNumbersHead: {
    display: "grid",
    gridTemplateColumns: "1fr 0.8fr 1fr",
    gap: 10,
    color: "#94a3b8",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.9,
    paddingBottom: 8,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  funnelNumberRow: {
    display: "grid",
    gridTemplateColumns: "1fr 0.8fr 1fr",
    gap: 10,
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    color: "#e5e7eb",
    fontSize: 13,
    alignItems: "center",
  },
  funnelTip: {
    marginTop: 20,
    border: "1px solid rgba(201,169,110,0.15)",
    borderRadius: 14,
    background: "rgba(255,255,255,0.04)",
    padding: "12px 14px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "#cbd5e1",
  },
  donutWrap: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 0.9fr) minmax(190px, 1fr)",
    gap: 22,
    alignItems: "center",
    marginTop: 22,
  },
  donutChart: {
    width: 230,
    height: 230,
    borderRadius: "50%",
    position: "relative",
    margin: "0 auto",
    boxShadow: "0 18px 45px rgba(0,0,0,0.40)",
  },
  donutLegend: {
    display: "grid",
    gap: 10,
  },
  donutLegendRow: {
    display: "grid",
    gridTemplateColumns: "14px 1fr auto",
    alignItems: "center",
    gap: 9,
    color: "#e5e7eb",
    fontSize: 13,
  },

  dashboardSectionHeaderClean: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    gap: 16,
    margin: "10px 2px 4px",
    color: "#F5F0E8",
  },
  dashboardGridSmall: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.15fr) minmax(300px, 0.7fr) minmax(300px, 0.7fr)",
    gap: 18,
  },
  cleanCardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: "1px solid rgba(201,169,110,0.13)",
  },
  cardTitle: {
    margin: 0,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 850,
    letterSpacing: 0.2,
  },
  cardSubtitle: {
    margin: "5px 0 0",
    color: "#CBD5E1",
    fontSize: 12,
    lineHeight: 1.35,
  },
  dashboardListRowText: {
    color: "#F8FAFC",
  },
  pipelineHealthList: {
    display: "grid",
    gap: 10,
    marginTop: 0,
  },
  emptyState: {
    color: "#CBD5E1",
    margin: "12px 0",
    fontSize: 13,
  },
  sfTableWrap: {
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    overflow: "auto",
    background: "rgba(255,255,255,0.04)",
  },
  sfTable: {
    width: "100%",
    borderCollapse: "collapse",
    color: "#F8FAFC",
  },
  sfTh: {
    color: "#E6C37A",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    background: "rgba(255,255,255,0.035)",
    borderBottom: "1px solid rgba(201,169,110,0.16)",
    padding: "12px 14px",
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  sfTd: {
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    padding: "12px 14px",
    color: "#F8FAFC",
    verticalAlign: "middle",
  },
  recordLink: {
    background: "transparent",
    border: 0,
    color: "#E6C37A",
    fontWeight: 850,
    cursor: "pointer",
    textAlign: "left",
    padding: 0,
  },
  cardBadge: {
    background: "rgba(201,169,110,0.12)",
    color: "#E6C37A",
    border: "1px solid rgba(201,169,110,0.28)",
    borderRadius: 999,
    padding: "7px 11px",
    fontSize: 12,
    fontWeight: 850,
    whiteSpace: "nowrap",
  },

  funnelPanel: {
    background: "linear-gradient(145deg, #0A0A09 0%, #11110F 52%, #1A1712 100%)",
    border: "1px solid rgba(201,169,110,0.24)",
    borderRadius: 20,
    padding: 22,
    color: "#F8FAFC",
    boxShadow: "0 22px 70px rgba(0,0,0,0.42), 0 0 42px rgba(201,169,110,0.08)",
    minWidth: 0,
  },
  donutPanel: {
    background: "linear-gradient(145deg, #0A0A09 0%, #11110F 52%, #1A1712 100%)",
    border: "1px solid rgba(201,169,110,0.24)",
    borderRadius: 20,
    padding: 22,
    color: "#F8FAFC",
    boxShadow: "0 22px 70px rgba(0,0,0,0.42), 0 0 42px rgba(201,169,110,0.08)",
    minWidth: 0,
  },
  dashboardCard: {
    background: "linear-gradient(145deg, #0A0A09 0%, #11110F 55%, #1A1712 100%)",
    color: "#F8FAFC",
    border: "1px solid rgba(201,169,110,0.20)",
    borderRadius: 18,
    padding: 18,
    boxShadow: "0 18px 55px rgba(0,0,0,0.36), 0 0 35px rgba(201,169,110,0.06)",
    minWidth: 0,
  },
  funnelStatCard: {
    background: "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(201,169,110,0.045))",
    border: "1px solid rgba(201,169,110,0.18)",
    borderRadius: 15,
    padding: "13px 14px",
    display: "grid",
    gap: 6,
  },
  funnelTotalPill: {
    background: "rgba(10,10,9,0.80)",
    border: "1px solid rgba(201,169,110,0.34)",
    borderRadius: 999,
    padding: "10px 15px",
    display: "grid",
    gap: 3,
    textAlign: "right",
    minWidth: 138,
    boxShadow: "0 0 24px rgba(201,169,110,0.10)",
  },
  donutCenter: {
    position: "absolute",
    inset: "26%",
    background: "linear-gradient(145deg, #0A0A09, #15130F)",
    border: "1px solid rgba(201,169,110,0.18)",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    alignContent: "center",
    color: "#FFFFFF",
    textAlign: "center",
    boxShadow: "inset 0 0 35px rgba(0,0,0,0.55), 0 0 24px rgba(201,169,110,0.08)",
  },
  fullReportBtn: {
    marginTop: 24,
    width: "100%",
    background: "linear-gradient(145deg, rgba(201,169,110,0.12), rgba(255,255,255,0.045))",
    color: "#E6C37A",
    border: "1px solid rgba(201,169,110,0.28)",
    borderRadius: 12,
    padding: "12px 14px",
    fontWeight: 850,
    cursor: "pointer",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
  },
  dashboardListRow: {
    width: "100%",
    border: "1px solid rgba(201,169,110,0.14)",
    background: "linear-gradient(145deg, rgba(255,255,255,0.045), rgba(201,169,110,0.035))",
    borderRadius: 13,
    padding: "12px 13px",
    marginTop: 8,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    cursor: "pointer",
    textAlign: "left",
    color: "#F8FAFC",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  },
  pipelineHealthRow: {
    background: "linear-gradient(145deg, rgba(255,255,255,0.045), rgba(201,169,110,0.035))",
    border: "1px solid rgba(201,169,110,0.14)",
    borderRadius: 13,
    padding: "12px 13px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#F8FAFC",
  },
  cleanCardAction: {
    background: "rgba(201,169,110,0.12)",
    color: "#E6C37A",
    border: "1px solid rgba(201,169,110,0.34)",
    borderRadius: 999,
    padding: "7px 11px",
    fontSize: 12,
    fontWeight: 800,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  mobileNote: {
    display: "none",
  },

};
