export interface EventPhoto {
  src: string
  alt: string
}

export interface EventData {
  id: string
  title: string
  subtitle: string
  date: string
  location: string
  folder: string
  coverIndex: number
  photos: EventPhoto[]
  highlights: number[]
}

function generatePhotos(folder: string, filenames: string[]): EventPhoto[] {
  return filenames.map((name) => ({
    src: `/events/${folder}/${name}`,
    alt: `${folder} - ${name.replace(/\.[^.]+$/, '').replace(/_/g, ' ')}`,
  }))
}

export const eventsData: EventData[] = [
  {
    id: 'fiba-3v3',
    title: 'FIBA 3X3',
    subtitle: 'International stage. Half-court warfare.',
    date: '2024',
    location: 'International',
    folder: 'fiba-3v3',
    coverIndex: 7,
    highlights: [0, 3, 7, 9],
    photos: generatePhotos('fiba-3v3', [
      '_DSC0006.jpg','_DSC0067.jpg','_DSC0091.jpg','_DSC0172.jpg','_DSC0229.jpg',
      '_DSC0232.jpg','_DSC0234.jpg','_DSC0266.jpg','_DSC0329.jpg','_DSC0336.jpg',
      '_DSC0381.jpg','_DSC0383.jpg','_DSC0397.jpg','_DSC0418.jpg','_DSC0459.jpg',
      '_DSC0492.jpg','_DSC0517.jpg','_DSC0608.jpg','_DSC0686.jpg','_DSC0708.jpg',
      '_DSC0727.jpg','_DSC0832.jpg','_DSC0860.jpg','_DSC0931.jpg','_DSC0969.jpg',
      '_DSC0989.jpg',
    ]),
  },
  {
    id: 'capital-cup',
    title: 'CAPITAL CUP',
    subtitle: 'The crown jewel of streetball tournaments.',
    date: '2024',
    location: 'Capital City',
    folder: 'capital-cup',
    coverIndex: 4,
    highlights: [4, 12, 16, 3],
    photos: generatePhotos('capital-cup', [
      '_DSC0036.jpg','_DSC0065.jpg','_DSC0073.jpg','_DSC0083.jpg','_DSC0100.jpg',
      '_DSC0105.jpg','_DSC0107.jpg','_DSC0141.jpg','_DSC0147.jpg','_DSC0148.jpg',
      '_DSC0150.jpg','_DSC0242.jpg','_DSC0471.jpg','_DSC0490.jpg','_DSC0503.jpg',
      '_DSC0546.jpg','_DSC0611.jpg','_DSC0672.jpg','_DSC0767.jpg','_DSC0773.jpg',
      '_DSC0808.jpg','_DSC0816.jpg','_DSC0946.jpg',
    ]),
  },
  {
    id: 'anchorage',
    title: 'ANCHORAGE',
    subtitle: 'Where legends are forged in cold courts.',
    date: '2024',
    location: 'Anchorage',
    folder: 'anchorage',
    coverIndex: 0,
    highlights: [0, 2, 24, 31],
    photos: generatePhotos('anchorage', [
      'Uzair-14.jpg','Uzair-16.jpg','Uzair-32.jpg','Uzair-41.jpg','_DSC0031.jpg',
      '_DSC0049.jpg','_DSC0058.jpg','_DSC0072.jpg','_DSC0112.jpg','_DSC0113.jpg',
      '_DSC0136.jpg','_DSC0148.jpg','_DSC0156.jpg','_DSC0190.jpg','_DSC0270.jpg',
      '_DSC0281.jpg','_DSC0283.jpg','_DSC0294.jpg','_DSC0301.jpg','_DSC0310.jpg',
      '_DSC0328.jpg','_DSC0345.jpg','_DSC0397.jpg','_DSC0437.jpg','_DSC0484.jpg',
      '_DSC0488.jpg','_DSC0508.jpg','_DSC0512.jpg','_DSC0513.jpg','_DSC0515.jpg',
      '_DSC0595.jpg','_DSC0608.jpg','_DSC0614.jpg',
    ]),
  },
  {
    id: '3v3-rebels-cup',
    title: '3V3 REBELS CUP',
    subtitle: 'Street rules. No refs. Pure chaos.',
    date: '2024',
    location: 'Local Courts',
    folder: '3v3-rebels-cup',
    coverIndex: 5,
    highlights: [5, 7, 12],
    photos: generatePhotos('3v3-rebels-cup', [
      '_DSC0009.jpg','_DSC0017.jpg','_DSC0040.jpg','_DSC0050.jpg','_DSC0071.jpg',
      '_DSC0073.jpg','_DSC0074.jpg','_DSC0091.jpg','_DSC0098.jpg','_DSC0102.jpg',
      '_DSC0106.jpg','_DSC0125.jpg','_DSC0126.jpg','_DSC0127.jpg','_DSC0142.jpg',
      '_DSC0179.jpg','_DSC0183.jpg','_DSC0192.jpg','_DSC0205.jpg','_DSC0209.jpg',
    ]),
  },
  {
    id: 'giki-sports-fest',
    title: 'GIKI SPORTS FEST',
    subtitle: 'Campus heat. Student athletes going all out.',
    date: '2024',
    location: 'GIKI Campus',
    folder: 'giki-sports-fest',
    coverIndex: 9,
    highlights: [3, 7, 9, 14],
    photos: generatePhotos('giki-sports-fest', [
      'Sports Fest-01.jpg','Sports Fest-02.jpg','Sports Fest-03.jpg','Sports Fest-04.jpg',
      'Sports Fest-05.jpg','Sports Fest-06.jpg','Sports Fest-07.jpg','Sports Fest-08.jpg',
      'Sports Fest-09.jpg','Sports Fest-10.jpg','Sports Fest-11.jpg','Sports Fest-12.jpg',
      'Sports Fest-13.jpg','Sports Fest-14.jpg','Sports Fest-15.jpg','Sports Fest-16.jpg',
      'Sports Fest-17.jpg','Sports Fest-18.jpg','Sports Fest-19.jpg','Sports Fest-21.jpg',
    ]),
  },
  {
    id: 'rebels-all-star',
    title: 'REBELS ALL-STAR',
    subtitle: 'The best vs the best. No excuses.',
    date: '2024',
    location: 'Home Court',
    folder: 'rebels-all-star',
    coverIndex: 8,
    highlights: [7, 8, 12],
    photos: generatePhotos('rebels-all-star', [
      '_DSC0046.jpg','_DSC0051.jpg','_DSC0069.jpg','_DSC0078.jpg','_DSC0115.jpg',
      '_DSC0119.jpg','_DSC0132.jpg','_DSC0224.jpg','_DSC0253.jpg','_DSC0261.jpg',
      '_DSC0372.jpg','_DSC0386.jpg','_DSC0409.jpg','_DSC0666.jpg','_DSC0831.jpg',
      '_DSC0837.jpg','_DSC0841.jpg','_DSC0968.jpg','_DSC0994.jpg',
    ]),
  },
  {
    id: 'gbm-3v3',
    title: 'GBM 3V3',
    subtitle: 'Grit. Buckets. Mentality.',
    date: '2024',
    location: 'Local',
    folder: 'gbm-3v3',
    coverIndex: 8,
    highlights: [8, 11, 4],
    photos: generatePhotos('gbm-3v3', [
      '_DSC0004.jpg','_DSC0023.jpg','_DSC0030.jpg','_DSC0031.jpg','_DSC0100.jpg',
      '_DSC0167.jpg','_DSC0172.jpg','_DSC0180.jpg','_DSC0189.jpg','_DSC0202.jpg',
      '_DSC0225.jpg','_DSC0256.jpg','_DSC0263.jpg','_DSC0390.jpg','_DSC0442.jpg',
      '_DSC0742.jpg','_DSC0820.jpg','_DSC0833.jpg','_DSC0834.jpg',
    ]),
  },
  {
    id: 'twin-city',
    title: 'TWIN CITY',
    subtitle: 'Two cities. One ball. Winner takes all.',
    date: '2024',
    location: 'Twin City',
    folder: 'twin-city',
    coverIndex: 16,
    highlights: [16, 25, 18],
    photos: generatePhotos('twin-city', [
      '_DSC0048.jpg','_DSC0073.jpg','_DSC0074.jpg','_DSC0076.jpg','_DSC0090.jpg',
      '_DSC0127.jpg','_DSC0147.jpg','_DSC0157.jpg','_DSC0175.jpg','_DSC0182.jpg',
      '_DSC0218.jpg','_DSC0233.jpg','_DSC0272.jpg','_DSC0305.jpg','_DSC0320.jpg',
      '_DSC0340.jpg','_DSC0382.jpg','_DSC0450.jpg','_DSC0462.jpg','_DSC0464.jpg',
      '_DSC0466.jpg','_DSC0468.jpg','_DSC0474.jpg','_DSC0492.jpg','_DSC0493.jpg',
      '_DSC0544.jpg','_DSC0670.jpg','_DSC0700.jpg','_DSC0754.jpg','_DSC0795.jpg',
    ]),
  },
]

export function getHighlightPhotos() {
  const highlights: (EventPhoto & { eventTitle: string; eventId: string })[] = []
  for (const event of eventsData) {
    for (const idx of event.highlights) {
      if (event.photos[idx]) {
        highlights.push({
          ...event.photos[idx],
          eventTitle: event.title,
          eventId: event.id,
        })
      }
    }
  }
  return highlights
}
