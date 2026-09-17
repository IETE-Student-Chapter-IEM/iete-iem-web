// Placeholder photos only — 3-5 per event, all 16:9 (800x450).
// Swap each `photos` array for real URLs once you upload the actual folders.
const ph = (slug, n) =>
  Array.from({ length: n }, (_, i) => `https://picsum.photos/seed/${slug}-${i}/800/450`);

export const galleryData = [
  {
    year: "2026–2027",
    events: [
      { id: "aurora-2026", title: "AURORA 2026", category: "Flagship Event", photos: ph("aurora-2026", 5) },
      { id: "book-fair-2026", title: "Book Fair 2026", category: "Community & Outreach", photos: ph("bookfair-2026", 3) },
      { id: "foundation-day-2026", title: "Foundation Day Celebration", category: "Foundation", photos: ph("foundation-2026", 4) },
      { id: "iete-zonal-congress", title: "IETE Zonal Congress", category: "Achievement", photos: ph("zonal-congress", 3) },
      { id: "industry-talk-lti", title: "Industry Talk — LTIMindtree", category: "Talk & Seminar", photos: ph("industry-lti", 3) },
      { id: "matlab-workshop-26a", title: "MATLAB Workshop", category: "Workshop", photos: ph("matlab-a", 4) },
      { id: "matlab-workshop-26b", title: "MATLAB Workshop", category: "Workshop", photos: ph("matlab-b", 3) },
      { id: "umbrella-distribution", title: "Umbrella Distribution Drive", category: "Social Initiative", photos: ph("umbrella", 4) },
    ],
  },
  {
    year: "2025–2026",
    events: [
      { id: "alumni-talk-24", title: "Alumni Talk", category: "Talk & Seminar", photos: ph("alumni-24", 3) },
      { id: "aurora-2k26", title: "AURORA 2K26", category: "Flagship Event", photos: ph("aurora-2k26", 5) },
      { id: "best-isf-award", title: "Best ISF Award", category: "Achievement", photos: ph("best-isf", 3) },
      { id: "book-fair-25", title: "Book Fair Quiz 2025", category: "Community & Outreach", photos: ph("bookfair-25", 3) },
      { id: "fdp-2024", title: "Faculty Development Program", category: "Workshop", photos: ph("fdp-24", 4) },
      { id: "iem-icdc-2025", title: "IEM-ICDC 2025", category: "Talk & Seminar", photos: ph("icdc-25", 3) },
      { id: "vision-india-25", title: "Vision India Photography 2025", category: "Competition", photos: ph("vision-25", 3) },
    ],
  },
  {
    year: "2024–2025",
    events: [
      { id: "ajc-bose-lecture", title: "AJC Bose Memorial Lecture", category: "Talk & Seminar", photos: ph("ajc-bose", 3) },
      { id: "book-fair-24", title: "Book Fair Quiz 2024", category: "Community & Outreach", photos: ph("bookfair-24", 3) },
      { id: "spamrush-2023", title: "SPAMRUSH Project Exhibition", category: "Competition", photos: ph("spamrush", 4) },
      { id: "talk-iot-2023", title: "Talk on IoT", category: "Talk & Seminar", photos: ph("iot-talk", 3) },
      { id: "vision-india-24", title: "Vision India Photography 2024", category: "Competition", photos: ph("vision-24", 3) },
    ],
  },
  {
    year: "2023–2024",
    events: [
      { id: "bookfair-quiz-23", title: "Bookfair Quiz 2023", category: "Community & Outreach", photos: ph("bookfair-quiz-23", 3) },
      { id: "certificate-dist", title: "Certificate Distribution", category: "Celebration", photos: ph("cert-dist", 3) },
      { id: "coding-comp-22", title: "Coding Competition", category: "Competition", photos: ph("coding-22", 4) },
      { id: "iete-students-day", title: "IETE Students' Day", category: "Celebration", photos: ph("students-day", 3) },
      { id: "inauguration-22", title: "Inauguration", category: "Foundation", photos: ph("inauguration", 4) },
      { id: "quiz-arena-23", title: "Quiz Arena 2023", category: "Competition", photos: ph("quiz-arena", 3) },
      { id: "rangoli-23", title: "Rangoli Making Competition", category: "Celebration", photos: ph("rangoli", 3) },
      { id: "vision-india-23", title: "Vision India 2023", category: "Competition", photos: ph("vision-23", 3) },
      { id: "workshop-c-22", title: "Workshop — C Language", category: "Workshop", photos: ph("workshop-c", 4) },
      { id: "workshop-python-23", title: "Workshop — Python", category: "Workshop", photos: ph("workshop-python", 3) },
    ],
  },
  {
    year: "2022–2023",
    events: [
      { id: "inauguration-ceremony", title: "Inaugural Ceremony", category: "Foundation", photos: ph("inaugural", 3) },
      { id: "feel-the-drop", title: "Feel the Drop", category: "Competition", photos: ph("feel-drop", 3) },
      { id: "remastering-c", title: "Remastering C Language", category: "Workshop", photos: ph("remaster-c", 3) },
    ],
  },
];
