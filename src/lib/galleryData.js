// Placeholder photos only — 3-5 per event, all 16:9 (800x450).
// Swap each `photos` array for real URLs once you upload the actual folders.
const ph = (slug, n) =>
  Array.from(
    { length: n },
    (_, i) => `https://picsum.photos/seed/${slug}-${i}/800/450`,
  );

export const galleryData = [
  {
    year: "2026–2027",
    events: [
      {
        id: "aurora-2026",
        title: "AURORA 2026",
        category: "Flagship Event",
        photos: [
          "/gallery/2026/AURORA/1.png",
          "/gallery/2026/AURORA/2.png",
          "/gallery/2026/AURORA/3.png",
          "/gallery/2026/AURORA/4.png",
          "/gallery/2026/AURORA/5.png",
          "/gallery/2026/AURORA/6.png",
          "/gallery/2026/AURORA/7.png",
          "/gallery/2026/AURORA/8.png",
        ],
      },
      {
        id: "book-fair-2026",
        title: "Book Fair 2026",
        category: "Community & Outreach",
        photos: [
          "/gallery/2026/Bookfair/1.png",
          "/gallery/2026/Bookfair/2.png",
          "/gallery/2026/Bookfair/3.png",
        ],
      },
      {
        id: "foundation-day-2026",
        title: "Foundation Day Celebration",
        category: "Foundation",
        photos: [
          "/gallery/2026/Foundation_Day/1.png",
          "/gallery/2026/Foundation_Day/2.png",
          "/gallery/2026/Foundation_Day/3.png",
          "/gallery/2026/Foundation_Day/4.png",
          "/gallery/2026/Foundation_Day/5.png",
        ],
      },
      {
        id: "iem-icdc-2026",
        title: "IEM-ICDC 2026",
        category: "Talk & Seminar",
        photos: [
          "/gallery/2026/IEM_ICDC/4.png",
          "/gallery/2026/IEM_ICDC/5.png",
        ],
      },
      {
        id: "matlab-workshop-2026",
        title: "MATLAB Workshop",
        category: "Workshop",
        photos: [
          "/gallery/2026/MATLAB_Workshop/1.png",
          "/gallery/2026/MATLAB_Workshop/2.png",
          "/gallery/2026/MATLAB_Workshop/3.png",
          "/gallery/2026/MATLAB_Workshop/4.png",
        ],
      },
    ],
  },
  {
    year: "2025–2026",
    events: [
      {
        id: "aurora-2025",
        title: "AURORA 2025",
        category: "Flagship Event",
        photos: [
          "/gallery/2025/Aurora/1.png",
          "/gallery/2025/Aurora/2.png",
          "/gallery/2025/Aurora/3.jpg",
          "/gallery/2025/Aurora/4.jpg",
          "/gallery/2025/Aurora/5.jpg",
        ],
      },
      {
        id: "book-fair-2025",
        title: "Book Fair Quiz 2025",
        category: "Community & Outreach",
        photos: [
          "/gallery/2025/Bookfair/1.png",
          "/gallery/2025/Bookfair/2.jpg",
          "/gallery/2025/Bookfair/3.png",
        ],
      },
      {
        id: "foundation-day-2025",
        title: "Foundation Day Celebration",
        category: "Foundation",
        photos: [
          "/gallery/2025/FOUNDATION_DAY/1.png",
          "/gallery/2025/FOUNDATION_DAY/2.png",
          "/gallery/2025/FOUNDATION_DAY/3.png",
        ],
      },
      {
        id: "iem-icdc-2025",
        title: "IEM-ICDC 2025",
        category: "Talk & Seminar",
        photos: [
          "/gallery/2025/IEM_ICDC/1.jpeg",
          "/gallery/2025/IEM_ICDC/2.jpeg",
          "/gallery/2025/IEM_ICDC/3.jpeg",
        ],
      },
      {
        id: "iete-eastern-zonal-2025",
        title: "IETE Eastern Zonal Congress",
        category: "Achievement",
        photos: [
          "/gallery/2025/IETE_EASTERN_ZONAL/1.JPG",
          "/gallery/2025/IETE_EASTERN_ZONAL/2.jpg",
          "/gallery/2025/IETE_EASTERN_ZONAL/3.png",
          "/gallery/2025/IETE_EASTERN_ZONAL/4.jpeg",
        ],
      },
      {
        id: "matlab-workshop-2025",
        title: "MATLAB Workshop",
        category: "Workshop",
        photos: [
          "/gallery/2025/MATLAB_Workshop/1.jpg",
          "/gallery/2025/MATLAB_Workshop/2.png",
          "/gallery/2025/MATLAB_Workshop/3.png",
        ],
      },
      {
        id: "umbrella-distribution-2025",
        title: "Umbrella Distribution Drive",
        category: "Social Initiative",
        photos: [
          "/gallery/2025/UMBRELLA_DISTRIBUTION/1.png",
          "/gallery/2025/UMBRELLA_DISTRIBUTION/2.png",
        ],
      },
    ],
  },
  {
    year: "2024–2025",
    events: [
      {
        id: "best-isf-award-2024",
        title: "Best ISF Award",
        category: "Achievement",
        photos: [
          "/gallery/2024/BEST_ISF_AWARD/1.png",
          "/gallery/2024/BEST_ISF_AWARD/2.jpeg",
          "/gallery/2024/BEST_ISF_AWARD/3.jpeg",
          "/gallery/2024/BEST_ISF_AWARD/4.jpeg",
        ],
      },
    ],
  },
  {
    year: "2023–2024",
    events: [
      {
        id: "book-fair-2023",
        title: "Bookfair Quiz 2023",
        category: "Community & Outreach",
        photos: [
          "/gallery/2023/Book_Fair/1.JPG",
          "/gallery/2023/Book_Fair/2.JPG",
          "/gallery/2023/Book_Fair/3.JPG",
        ],
      },
      {
        id: "foundation-day-2023",
        title: "Foundation Day Celebration",
        category: "Foundation",
        photos: [
          "/gallery/2023/Foundation_Day/2.JPG",
          "/gallery/2023/Foundation_Day/3.JPG",
          "/gallery/2023/Foundation_Day/4.JPG",
          "/gallery/2023/Foundation_Day/5.JPG",
          "/gallery/2023/Foundation_Day/6.jpeg",
        ],
      },
      {
        id: "iete-students-day-2023",
        title: "IETE Students' Day",
        category: "Celebration",
        photos: [
          "/gallery/2023/IETE_Student’s_Day/1.jpeg",
          "/gallery/2023/IETE_Student’s_Day/2.jpeg",
          "/gallery/2023/IETE_Student’s_Day/3.jpeg",
        ],
      },
      {
        id: "remastering-python-2023",
        title: "Workshop — Python",
        category: "Workshop",
        photos: [
          "/gallery/2023/RemasteringPython/1.png",
          "/gallery/2023/RemasteringPython/2.png",
          "/gallery/2023/RemasteringPython/3.png",
        ],
      },
      {
        id: "spamrush-2023",
        title: "SPAMRUSH Project Exhibition",
        category: "Competition",
        photos: [
          "/gallery/2023/SPAMRUSH_ProjectExhibition/1.jpeg",
          "/gallery/2023/SPAMRUSH_ProjectExhibition/2.jpeg",
          "/gallery/2023/SPAMRUSH_ProjectExhibition/3.jpeg",
        ],
      },
      {
        id: "vasant-mahotsav-2023",
        title: "Vasant Mahotsav",
        category: "Celebration",
        photos: [
          "/gallery/2023/VasantMahotsav/1.png",
          "/gallery/2023/VasantMahotsav/2.jpeg",
          "/gallery/2023/VasantMahotsav/3.jpeg",
        ],
      },
    ],
  },
  {
    year: "2022–2023",
    events: [
      {
        id: "book-fair-2022",
        title: "Book Fair 2022",
        category: "Community & Outreach",
        photos: [
          "/gallery/2022/Bookfair/1.jpeg",
          "/gallery/2022/Bookfair/2.jpeg",
          "/gallery/2022/Bookfair/3.jpeg",
        ],
      },
      {
        id: "certificate-distribution-2022",
        title: "Certificate Distribution",
        category: "Celebration",
        photos: [
          "/gallery/2022/Certificate_Distribution/1.jpeg",
          "/gallery/2022/Certificate_Distribution/2.jpeg",
        ],
      },
      {
        id: "inaugural-ceremony-2022",
        title: "Inaugural Ceremony",
        category: "Foundation",
        photos: [
          "/gallery/2022/Inaugural_Ceremony/4.jpeg",
          "/gallery/2022/Inaugural_Ceremony/5.jpeg",
        ],
      },
      {
        id: "remastering-c-2022",
        title: "Remastering C Language",
        category: "Workshop",
        photos: [
          "/gallery/2022/REMASTERING_C/1.png",
          "/gallery/2022/REMASTERING_C/2.png",
          "/gallery/2022/REMASTERING_C/3.png",
          "/gallery/2022/REMASTERING_C/4.png",
        ],
      },
    ],
  },
];
