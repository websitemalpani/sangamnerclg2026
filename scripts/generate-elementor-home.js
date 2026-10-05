const fs = require("fs");
const path = require("path");

let sequence = 1;
const id = () => (sequence++).toString(16).padStart(7, "0").slice(-7);
const color = {
  ink: "#111D45",
  forest: "#183B73",
  leaf: "#1F5CAC",
  lime: "#FFD84D",
  cream: "#FFFAF0",
  sand: "#F3E5CC",
  coral: "#F15B3A",
  white: "#FFFFFF",
};

const responsivePadding = (top, right, bottom, left) => ({
  padding: { unit: "px", top: String(top), right: String(right), bottom: String(bottom), left: String(left), isLinked: false },
  padding_tablet: { unit: "px", top: String(top), right: "24", bottom: String(bottom), left: "24", isLinked: false },
  padding_mobile: { unit: "px", top: String(Math.min(top, 48)), right: "18", bottom: String(Math.min(bottom, 48)), left: "18", isLinked: false },
});

const container = (settings = {}, elements = []) => ({
  id: id(),
  elType: "container",
  settings,
  elements,
  isInner: false,
});

const widget = (widgetType, settings = {}) => ({
  id: id(),
  elType: "widget",
  widgetType,
  settings,
  elements: [],
});

const heading = (title, tag = "h2", settings = {}) =>
  widget("heading", { title, header_size: tag, ...settings });

const text = (editor, settings = {}) =>
  widget("text-editor", { editor, ...settings });

const button = (label, url, settings = {}) =>
  widget("button", {
    text: label,
    link: { url, is_external: url.startsWith("http"), nofollow: "" },
    size: "md",
    ...settings,
  });

const image = (url, alt, settings = {}) =>
  widget("image", {
    image: { url, id: "" },
    image_size: "full",
    caption_source: "none",
    custom_caption: alt,
    ...settings,
  });

const card = ({ title, description, url, background = color.cream, foreground = color.ink, eyebrow = "" }) =>
  container(
    {
      flex_direction: "column",
      justify_content: "space-between",
      background_background: "classic",
      background_color: background,
      border_radius: { unit: "px", top: "24", right: "24", bottom: "24", left: "24", isLinked: true },
      padding: { unit: "px", top: "26", right: "26", bottom: "26", left: "26", isLinked: true },
      min_height: { unit: "px", size: 190, sizes: [] },
      box_shadow_box_shadow_type: "yes",
      box_shadow_box_shadow: { horizontal: 0, vertical: 12, blur: 35, spread: -22, color: "rgba(17,29,69,0.35)" },
    },
    [
      ...(eyebrow ? [heading(eyebrow, "div", { title_color: foreground, typography_typography: "custom", typography_font_size: { unit: "px", size: 13, sizes: [] }, typography_font_weight: "700" })] : []),
      heading(title, "h3", { title_color: foreground, typography_typography: "custom", typography_font_size: { unit: "px", size: 25, sizes: [] }, typography_font_weight: "700" }),
      text(`<p>${description}</p>`, { text_color: foreground }),
      button("Learn more", url, {
        button_text_color: background === color.forest ? color.forest : color.white,
        background_color: background === color.forest ? color.lime : color.forest,
        border_radius: { unit: "px", top: "99", right: "99", bottom: "99", left: "99", isLinked: true },
      }),
    ],
  );

const essentials = [
  ["Admission 2026–27", "Apply online", "application.html", color.lime],
  ["Scholarships", "Funding support", "scholarships-for-students.html", color.cream],
  ["Examination", "Timetables and results", "examination.html", color.cream],
  ["Student’s Corner", "Student resources", "students-corner.html", color.cream],
  ["IQAC", "Quality assurance", "iqac.html", color.cream],
  ["AISHE / MIS", "Institutional data", "aishe-mis.html", color.cream],
  ["NIRF", "Rankings and reports", "nirf.html", color.cream],
  ["Innovation & Startup Cell", "Ideas into impact", "innovation-incubation-startup-cell.html", color.coral],
  ["Policies and Procedures", "Institutional policies", "policies-and-procedures.html", color.cream],
  ["SWAYAM", "Online learning", "https://swayam.gov.in/", color.cream],
];

const programs = [
  ["Arts", "Humanities · Languages · Social sciences", "Read culture, understand society, and discover new ways to tell human stories.", "arts.html", color.forest, color.white],
  ["Science", "Life · Physical · Computational sciences", "Question the known, test possibilities, and build solutions through discovery.", "science.html", color.lime, color.ink],
  ["Commerce", "Business · Finance · Management", "Understand markets, lead organizations, and create responsible enterprise.", "commerce.html", color.white, color.ink],
  ["Vocational", "Skills · Technology · Employability", "Build industry-ready expertise with focused, practical learning pathways.", "vocational-degrees.html", color.coral, color.ink],
];

const notices = [
  ["F.Y.B.A. Admission Notice", "एफ.वाय.बी.ए. प्रवेश सूचना"],
  ["F.Y.B.Sc. Admission Notice", "एफ.वाय.बी.एस्सी. प्रवेश सूचना"],
  ["F.Y.B.Voc. Admission Notice", "एफ.वाय.बी.व्होक. प्रवेश सूचना"],
  ["F.Y.B.Com. Admission Notice", "एफ.वाय.बी.कॉम. प्रवेश सूचना"],
];

const content = [
  container(
    {
      content_width: "full",
      min_height: { unit: "px", size: 620, sizes: [] },
      justify_content: "center",
      background_background: "classic",
      background_image: { url: "/media/images/slider/slider-img1.jpg", id: "" },
      background_position: "center center",
      background_size: "cover",
      background_overlay_background: "gradient",
      background_overlay_color: "rgba(9,22,57,0.94)",
      background_overlay_color_b: "rgba(15,43,86,0.30)",
      background_overlay_gradient_angle: { unit: "deg", size: 90, sizes: [] },
      ...responsivePadding(70, 40, 70, 40),
    },
    [
      container(
        { content_width: "boxed", width: { unit: "%", size: 100, sizes: [] }, max_width: { unit: "px", size: 1440, sizes: [] }, flex_direction: "column", align_items: "flex-start" },
        [
          text("<p><strong>Autonomous</strong> &nbsp; · &nbsp; <strong>NAAC A+</strong> &nbsp; · &nbsp; <strong>CGPA 3.58</strong> &nbsp; · &nbsp; <strong>DBT Star Status</strong></p>", { text_color: color.white }),
          heading("KNOWLEDGE WITH PURPOSE", "div", { title_color: color.lime, typography_typography: "custom", typography_font_size: { unit: "px", size: 14, sizes: [] }, typography_font_weight: "700", typography_letter_spacing: { unit: "px", size: 3, sizes: [] } }),
          heading('Learn boldly.<br><span style="color:#FFD84D">Lead wisely.</span>', "h1", { title_color: color.white, typography_typography: "custom", typography_font_size: { unit: "px", size: 58, sizes: [] }, typography_font_size_mobile: { unit: "px", size: 40, sizes: [] }, typography_font_weight: "800" }),
          text("<p>A vibrant autonomous institution where curiosity becomes capability—and every learner finds the confidence to shape what comes next.</p>", { text_color: color.white, typography_typography: "custom", typography_font_size: { unit: "px", size: 20, sizes: [] } }),
          container(
            { flex_direction: "row", flex_wrap: "wrap", gap: { unit: "px", column: "12", row: "12", isLinked: true } },
            [
              button("Explore admissions", "application.html", { button_text_color: color.forest, background_color: color.lime, border_radius: { unit: "px", top: "99", right: "99", bottom: "99", left: "99", isLinked: true } }),
              button("Find your program", "#programs", { button_text_color: color.white, background_color: "rgba(255,255,255,0.12)", border_border: "solid", border_width: { unit: "px", top: "1", right: "1", bottom: "1", left: "1", isLinked: true }, border_color: "rgba(255,255,255,0.45)", border_radius: { unit: "px", top: "99", right: "99", bottom: "99", left: "99", isLinked: true } }),
            ],
          ),
        ],
      ),
    ],
  ),
  container(
    { background_background: "classic", background_color: color.white, flex_direction: "column", ...responsivePadding(70, 40, 70, 40) },
    [
      heading("STUDENT ESSENTIALS", "div", { title_color: color.leaf, typography_typography: "custom", typography_font_weight: "700", typography_letter_spacing: { unit: "px", size: 2, sizes: [] } }),
      heading("Everything you need, right here.", "h2", { title_color: color.ink, typography_typography: "custom", typography_font_size: { unit: "px", size: 40, sizes: [] }, typography_font_weight: "800" }),
      container(
        { flex_direction: "row", flex_wrap: "wrap", gap: { unit: "px", column: "14", row: "14", isLinked: true } },
        essentials.map(([title, description, url, background]) =>
          container(
            { width: { unit: "%", size: 19, sizes: [] }, width_tablet: { unit: "%", size: 31, sizes: [] }, width_mobile: { unit: "%", size: 100, sizes: [] } },
            [card({ title, description, url, background })],
          ),
        ),
      ),
    ],
  ),
  container(
    { background_background: "classic", background_color: color.cream, flex_direction: "column", ...responsivePadding(70, 40, 70, 40) },
    [
      heading("MORE THAN A COLLEGE", "div", { title_color: color.leaf, typography_typography: "custom", typography_font_weight: "700" }),
      heading('A place to become <span style="color:#1F5CAC">more you.</span>', "h2", { title_color: color.ink, typography_typography: "custom", typography_font_size: { unit: "px", size: 42, sizes: [] }, typography_font_weight: "800" }),
      text("<p>Since 1961, Sangamner College has opened doors for learners across the region. Our classrooms connect academic depth with practical experience, strong values, and a community that notices every student.</p>", { text_color: color.ink, typography_typography: "custom", typography_font_size: { unit: "px", size: 18, sizes: [] } }),
      button("Discover our story", "about-college.html", { button_text_color: color.white, background_color: color.leaf }),
      container(
        { flex_direction: "row", flex_wrap: "wrap", gap: { unit: "px", column: "18", row: "18", isLinked: true } },
        [
          card({ title: "Learn by doing", description: "Labs, fieldwork, projects and internships turn knowledge into confident action.", url: "about-college.html", background: color.forest, foreground: color.white }),
          card({ title: "Think beyond borders", description: "Research, digital learning and interdisciplinary programs expand every horizon.", url: "research.html", background: color.coral }),
          card({ title: "Grow together", description: "Mentors, peers and an active campus community make progress deeply personal.", url: "campus.html", background: color.lime }),
        ].map((item) => container({ width: { unit: "%", size: 32, sizes: [] }, width_mobile: { unit: "%", size: 100, sizes: [] } }, [item])),
      ),
    ],
  ),
  container(
    { css_id: "programs", background_background: "classic", background_color: color.forest, flex_direction: "column", ...responsivePadding(70, 40, 70, 40) },
    [
      heading("SHAPE YOUR FUTURE", "div", { title_color: color.lime, typography_typography: "custom", typography_font_weight: "700" }),
      heading("Find your direction.", "h2", { title_color: color.white, typography_typography: "custom", typography_font_size: { unit: "px", size: 42, sizes: [] }, typography_font_weight: "800" }),
      text("<p>Choose a pathway that matches your curiosity and builds the skills the world needs.</p>", { text_color: color.white }),
      container(
        { flex_direction: "row", flex_wrap: "wrap", gap: { unit: "px", column: "18", row: "18", isLinked: true } },
        programs.map(([title, eyebrow, description, url, background, foreground]) =>
          container({ width: { unit: "%", size: 49, sizes: [] }, width_mobile: { unit: "%", size: 100, sizes: [] } }, [
            card({ title, eyebrow, description, url, background, foreground }),
          ]),
        ),
      ),
      button("View all departments", "departments.html", { button_text_color: color.forest, background_color: color.white }),
    ],
  ),
  container(
    { background_background: "classic", background_color: color.cream, flex_direction: "row", flex_wrap: "wrap", ...responsivePadding(70, 40, 70, 40) },
    [
      container(
        { width: { unit: "%", size: 34, sizes: [] }, width_mobile: { unit: "%", size: 100, sizes: [] }, background_background: "classic", background_color: color.coral, border_radius: { unit: "px", top: "24", right: "24", bottom: "24", left: "24", isLinked: true }, padding: { unit: "px", top: "32", right: "32", bottom: "32", left: "32", isLinked: true } },
        [
          heading("STAY INFORMED", "div", { title_color: color.ink }),
          heading("What’s happening now.", "h2", { title_color: color.ink, typography_typography: "custom", typography_font_size: { unit: "px", size: 36, sizes: [] }, typography_font_weight: "800" }),
          text("<p>Notices, deadlines and important updates—all in one place.</p>", { text_color: color.ink }),
          button("View all updates", "news-and-events.html", { button_text_color: color.white, background_color: color.ink }),
        ],
      ),
      container(
        { width: { unit: "%", size: 64, sizes: [] }, width_mobile: { unit: "%", size: 100, sizes: [] }, flex_direction: "column", gap: { unit: "px", column: "12", row: "12", isLinked: true } },
        notices.map(([title, marathi]) =>
          container(
            { background_background: "classic", background_color: color.white, border_radius: { unit: "px", top: "14", right: "14", bottom: "14", left: "14", isLinked: true }, padding: { unit: "px", top: "18", right: "18", bottom: "18", left: "18", isLinked: true } },
            [
              heading(title, "h3", { title_color: color.ink, typography_typography: "custom", typography_font_size: { unit: "px", size: 19, sizes: [] }, typography_font_weight: "700" }),
              text(`<p>${marathi}</p>`, { text_color: color.leaf }),
              button("View notice", "application.html", { button_text_color: color.white, background_color: color.leaf }),
            ],
          ),
        ),
      ),
    ],
  ),
  container(
    { background_background: "classic", background_color: color.sand, flex_direction: "column", ...responsivePadding(70, 40, 70, 40) },
    [
      heading("VOICES & CAMPUS LIFE", "div", { title_color: color.leaf, typography_typography: "custom", typography_font_weight: "700" }),
      heading("Leadership and happenings.", "h2", { title_color: color.ink, typography_typography: "custom", typography_font_size: { unit: "px", size: 42, sizes: [] }, typography_font_weight: "800" }),
      container(
        { flex_direction: "row", flex_wrap: "wrap", gap: { unit: "px", column: "18", row: "18", isLinked: true } },
        [
          card({ title: "Dr. Sanjay Malpani", eyebrow: "MESSAGE FROM THE CHAIRMAN", description: "It gives me immense pleasure to communicate with you all as the Chairman of an institution rooted in enduring values.", url: "message-from-the-chairman.html", background: color.forest, foreground: color.white }),
          card({ title: "Prof. Dr. Arun H. Gaikwad", eyebrow: "MESSAGE FROM THE PRINCIPAL", description: "Established to spread knowledge unto the last, we continue to serve as a lighthouse for rural youth.", url: "message-from-the-principal.html", background: color.white }),
          card({ title: "Events & Happenings", eyebrow: "CAMPUS LIFE", description: "Academic, cultural and community events will appear here.", url: "news-and-events.html", background: color.lime }),
        ].map((item) => container({ width: { unit: "%", size: 32, sizes: [] }, width_mobile: { unit: "%", size: 100, sizes: [] } }, [item])),
      ),
    ],
  ),
];

const template = {
  content,
  page_settings: {
    hide_title: "yes",
    background_background: "classic",
    background_color: color.cream,
  },
  version: "0.4",
  title: "Sangamner College Home",
  type: "page",
};

const output = path.resolve(__dirname, "..", "sangamner-college-home.elementor.json");
fs.writeFileSync(output, `${JSON.stringify(template, null, 2)}\n`, "utf8");
console.log(`Generated ${output}`);
console.log(`Top-level sections: ${content.length}`);
console.log(`Elementor elements: ${sequence - 1}`);
