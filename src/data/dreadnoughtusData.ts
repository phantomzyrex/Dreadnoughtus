export type EpistemicBadge = 'estimate' | 'debated' | 'inferred' | 'preserved';

export interface StatCardItem {
  id: string;
  label: string;
  value: string;
  detail: string;
  badge?: EpistemicBadge;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  branchSide: 'left' | 'right';
  badge?: EpistemicBadge;
}

export interface AnatomyHotspot {
  id: string;
  title: string;
  shortLabel: string;
  /** Percentage coordinates relative to the side-view container */
  x: number;
  y: number;
  /** Target point on the dinosaur body */
  anchorX: number;
  anchorY: number;
  badge: EpistemicBadge;
  preservedStatus: string;
  description: string;
  measurement?: string;
}

export interface SizeComparisonEntity {
  id: string;
  name: string;
  lengthMeters: number;
  lengthLabel: string;
  massLabel: string;
  heightMeters: number;
  isOptionalGiant?: boolean;
  isFocal?: boolean;
  badge?: EpistemicBadge;
  note: string;
}

export interface MassStudyEstimate {
  id: string;
  study: string;
  year: number;
  method: 'Scaling Equation' | '3D Volumetric' | 'Modified Scaling';
  minTonnes: number;
  maxTonnes: number;
  pointTonnes: number;
  label: string;
  notes: string;
  badge: EpistemicBadge;
}

export interface CompletenessEntry {
  taxon: string;
  totalSkeletalPercent: number;
  boneTypesExclSkullPercent: number;
  bonesFoundSummary: string;
  isFocal?: boolean;
}

export interface MythRealityItem {
  id: string;
  number: string;
  myth: string;
  reality: string;
  badge: EpistemicBadge;
}

export interface GalleryPlate {
  id: string;
  src: string;
  fallbackLabel: string;
  plateNumber: string;
  title: string;
  caption: string;
  badge: EpistemicBadge;
  svgSceneType: 'wading' | 'scapula' | 'vertebrae' | 'floodplain' | 'excavation' | 'histology';
}

export const HERO_CUTOUT_PATH = '/assets/dreadnoughtus-hero.png';
export const SIDE_CUTOUT_PATH = '/assets/dreadnoughtus-side.png';
export const AISTUDIO_CUTOUT_FALLBACK = '/assets/aistudio/Photorealistic_Sauropod_Dinosaur_Cutout_d88ba2f5.png';

export const OVERVIEW_STATS: StatCardItem[] = [
  {
    id: 'name-meaning',
    label: 'Name Meaning',
    value: '“Fears Nothing”',
    detail:
      'From the Old English "dreadnought". It alludes to its gigantic size, which presumably made healthy adults nearly impervious to attack, and to the dreadnought battleships, including the Argentine ARA Rivadavia and ARA Moreno. The species name schrani honours Adam Schran, who supported the research.',
    badge: 'inferred',
  },
  {
    id: 'lived',
    label: 'Lived',
    value: '~76–70 Million Years Ago',
    detail:
      'Late Cretaceous (Campanian to Maastrichtian), about 76–70 million years ago (older reports say about 77 Ma); the exact age of the Cerro Fortaleza Formation rock is uncertain.',
    badge: 'estimate',
  },
  {
    id: 'length',
    label: 'Total Length',
    value: '~26 m (85 ft)',
    detail:
      'For the main specimen, comprising a neck of about 11.3 m, torso and hips of about 5.1 m, and a tail of about 8.7 m.',
    badge: 'estimate',
  },
  {
    id: 'shoulder-height',
    label: 'Shoulder Height',
    value: '~6 m (20 ft)',
    detail: 'Estimated two-storey height at the dorsal shoulder girdle based on articulated limb and pectoral elements.',
    badge: 'estimate',
  },
  {
    id: 'mass',
    label: 'Body Mass',
    value: '22–59.3 Tonnes',
    detail:
      'The 2014 description estimated 59.3 tonnes; later volumetric studies gave about 22–40 tonnes; a revised scaling method gives about 48 tonnes.',
    badge: 'debated',
  },
  {
    id: 'growth-stage',
    label: 'Growth Stage',
    value: 'Sub-Adult / Still Growing',
    detail:
      'The main specimen lacked an external fundamental system in its humerus histology and was still growing when it died, so adults could have been bigger.',
    badge: 'inferred',
  },
  {
    id: 'fossil-material',
    label: 'Fossil Material',
    value: '~116 of ~256 Bones (~45%)',
    detail:
      'Two partial skeletons (a main specimen and a slightly smaller one); includes about 70.4% of the types of bone in the skeleton excluding the skull. The skull is known only from a jaw fragment and a tooth.',
    badge: 'preserved',
  },
  {
    id: 'shoulder-blade',
    label: 'Shoulder Blade (Scapula)',
    value: '1.74 m Long',
    detail: 'The longest scapula known in any titanosaur, anchoring a wide, broad-chested pectoral girdle.',
    badge: 'preserved',
  },
  {
    id: 'diet',
    label: 'Diet',
    value: 'Plant-Eater (Herbivore)',
    detail:
      'Browsed in temperate, humid forests of conifers, ferns, and southern-beech-type (Nothofagus) trees; exact plant species consumed are unknown.',
    badge: 'inferred',
  },
  {
    id: 'locomotion',
    label: 'Locomotion & Stance',
    value: 'Quadrupedal, Wide-Gauge',
    detail:
      'Four-legged, with a wide-gauge stance (limbs set wide of the body midline), though less extreme than in saltasaurid titanosaurs.',
    badge: 'preserved',
  },
  {
    id: 'group',
    label: 'Clade & Group',
    value: 'Dinosauria › Sauropoda › Titanosauria',
    detail: 'A derived basal titanosaur or lithostrotian (exact family-tree position within Titanosauria is debated).',
    badge: 'debated',
  },
  {
    id: 'status',
    label: 'Status',
    value: 'Extinct',
    detail: 'Known exclusively from the Cerro Fortaleza Formation of Santa Cruz Province, southern Patagonia, Argentina.',
    badge: 'preserved',
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: '2005',
    year: '2005',
    title: 'Discovery Along the Río La Leona',
    description:
      'Palaeontologist Kenneth Lacovara discovers the remains in the Cerro Fortaleza Formation, on the east bank of the Río La Leona, Santa Cruz Province, Patagonia, about 1,200 km from the best-known dinosaur sites of northern Patagonia.',
    branchSide: 'left',
    badge: 'preserved',
  },
  {
    id: '2005-2009',
    year: '2005–2009',
    title: 'Four Austral Summers of Excavation',
    description:
      'Excavating takes four austral summers; mules, ropes and many team members are needed to bring the heavy field-jacketed bones down to a truck.',
    branchSide: 'right',
    badge: 'preserved',
  },
  {
    id: '2009',
    year: '2009',
    title: 'Ocean Transit for Preparation & Study',
    description:
      'The fossils are shipped by ocean freighter to Philadelphia for preparation and study at Drexel University, the Academy of Natural Sciences and the Carnegie Museum of Natural History.',
    branchSide: 'left',
    badge: 'preserved',
  },
  {
    id: '2011',
    year: '2011',
    title: 'Bone Histology Reveals Active Growth',
    description:
      'A conference abstract (Schroeter, Boles and Lacovara) reports bone-histology results suggesting the animal was still growing when it died.',
    branchSide: 'right',
    badge: 'inferred',
  },
  {
    id: '2014-sep-4',
    year: '4 Sep 2014',
    title: 'Formal Description & 3D Open Access',
    description:
      'Lacovara et al. describe Dreadnoughtus schrani in Scientific Reports, estimating about 26 m and 59.3 tonnes. The bones are 3D-scanned and shared publicly as 3D files.',
    branchSide: 'left',
    badge: 'estimate',
  },
  {
    id: '2014-sep-vol',
    year: 'Sep 2014',
    title: 'First Volumetric Counter-Estimates',
    description:
      'Matt Wedel’s volumetric models give about 36–40 tonnes (or about 30 tonnes with a shorter torso); Gregory Paul estimates about 26 tonnes.',
    branchSide: 'right',
    badge: 'debated',
  },
  {
    id: '2015-mar',
    year: 'Mar 2015',
    title: 'Permanent Return to Río Gallegos',
    description:
      'The fossils return to their permanent home, the Museo Padre Molina in Río Gallegos, Santa Cruz Province, Argentina.',
    branchSide: 'left',
    badge: 'preserved',
  },
  {
    id: '2015-jun',
    year: 'Jun 2015',
    title: '3D Volumetric Digital Reconstruction',
    description:
      'Bates et al. build a 3D volumetric model and estimate 22.1–38.2 tonnes. Ullmann and Lacovara (2016) subsequently dispute their method.',
    branchSide: 'right',
    badge: 'debated',
  },
  {
    id: '2016',
    year: '2016',
    title: 'Detailed Limb Osteology & Lithostrotian Links',
    description:
      'Ullmann and Lacovara publish the detailed limb osteology and suggest Dreadnoughtus may be a lithostrotian related to Aeolosaurus.',
    branchSide: 'left',
    badge: 'debated',
  },
  {
    id: '2017',
    year: '2017',
    title: 'Modified Scaling Equation',
    description:
      'Campione’s modified scaling equation lowers the limb-scaling-based mass estimate to about 48 tonnes.',
    branchSide: 'right',
    badge: 'estimate',
  },
  {
    id: '2019-2020',
    year: '2019–2020',
    title: 'Updated Volumetric & Scaling Consensus Range',
    description:
      'Gregory Paul settles on about 31 tonnes; Campione and Evans estimate about 48–49 tonnes.',
    branchSide: 'left',
    badge: 'debated',
  },
  {
    id: '2022',
    year: '2022',
    title: 'Soft Tissue & Endogenous Collagen Reported',
    description:
      'Schroeter et al. report soft tissue and collagen from the main specimen and suggest it was buried in a sudden, rapid event.',
    branchSide: 'right',
    badge: 'preserved',
  },
  {
    id: '2024',
    year: '2024',
    title: 'Cerro Fortaleza Vertebrate Faunal Review',
    description:
      'Agnolín et al. review the fossil vertebrates of the Cerro Fortaleza Formation, placing Dreadnoughtus in broader Austral Basin context.',
    branchSide: 'left',
    badge: 'preserved',
  },
  {
    id: 'today',
    year: 'Today',
    title: 'An Open Paleontological Frontier',
    description:
      'Its exact body mass remains debated across volumetric and scaling methodologies, and no complete skull has yet been found.',
    branchSide: 'right',
    badge: 'debated',
  },
];

export const ANATOMY_HOTSPOTS: AnatomyHotspot[] = [
  {
    id: 'skull-teeth',
    title: 'Skull and Teeth',
    shortLabel: '01 · Skull & Teeth',
    x: 58,
    y: 7,
    anchorX: 69,
    anchorY: 5.5,
    badge: 'inferred',
    preservedStatus: 'Not preserved (except 1 jaw fragment & 1 tooth): reconstructed from relatives',
    description:
      'Only a jaw fragment (maxilla) and a single peg-like tooth are known; the rest of the cranial profile is reconstructed from related titanosaurs.',
    measurement: 'Maxilla fragment + 1 tooth',
  },
  {
    id: 'neck',
    title: 'Cervical Series (Neck)',
    shortLabel: '02 · Neck (~11.3 m)',
    x: 78,
    y: 25,
    anchorX: 88,
    anchorY: 32,
    badge: 'estimate',
    preservedStatus: 'Mostly not preserved: reconstructed from relatives (1 rear cervical vertebra + ribs known)',
    description:
      'Unusually long for its body size, almost half of the animal’s length (about 11.3 m of 26 m, estimate). Only a rear neck vertebra and neck ribs of the main specimen are known, so the neck is mostly reconstructed. The reconstruction holds it more horizontally than in Brachiosaurus, because the forelimbs are not much longer than the hind limbs.',
    measurement: '~11.3 m length (estimate)',
  },
  {
    id: 'shoulder-chest',
    title: 'Shoulder and Chest (Pectoral Girdle)',
    shortLabel: '03 · Shoulder & Chest',
    x: 82,
    y: 57,
    anchorX: 88,
    anchorY: 64,
    badge: 'preserved',
    preservedStatus: 'Preserved in holotype (MPM-PV 1156)',
    description:
      'A wide shoulder girdle with broad breastbone (sternal) plates gave a broad-shouldered, broad-chested body. The shoulder blade (scapula) is 1.74 m long, the longest known of any titanosaur.',
    measurement: 'Scapula: 1.74 m (record)',
  },
  {
    id: 'forelimb',
    title: 'Forelimb',
    shortLabel: '04 · Forelimb',
    x: 86,
    y: 82,
    anchorX: 84,
    anchorY: 84,
    badge: 'preserved',
    preservedStatus: 'Humerus, radius, ulna preserved',
    description:
      'The forearm is longer than that of any previously known titanosaur (only brachiosaurids had longer ones), though not much longer than the hind limb; only Paralititan has a longer upper-arm bone (humerus).',
    measurement: 'Humerus histologically sampled',
  },
  {
    id: 'hips',
    title: 'Pelvic Girdle (Hips)',
    shortLabel: '05 · Hips (Ilium)',
    x: 56,
    y: 53,
    anchorX: 62,
    anchorY: 61,
    badge: 'preserved',
    preservedStatus: 'Complete pelvis preserved',
    description:
      'The ilium (top hip bone) is 1.31 m long, the largest known in a titanosaur, providing massive attachment area for locomotor and caudal musculature.',
    measurement: 'Ilium: 1.31 m (record)',
  },
  {
    id: 'hind-limb',
    title: 'Hind Limb and Wide-Gauge Stance',
    shortLabel: '06 · Hind Limb & Stance',
    x: 58,
    y: 86,
    anchorX: 56,
    anchorY: 85,
    badge: 'preserved',
    preservedStatus: 'Femur, tibia, fibula, pes elements preserved',
    description:
      'Wide-gauge stance (limbs set wide of the body midline) but not as wide as in saltasaurids, because the lower end of the thigh bone (femur) is square to the shaft and the femoral head is not turned strongly inward.',
    measurement: 'Femur: ~1.91 m',
  },
  {
    id: 'tail',
    title: 'Caudal Series (Tail)',
    shortLabel: '07 · Tail (~8.7 m)',
    x: 18,
    y: 62,
    anchorX: 25,
    anchorY: 69,
    badge: 'preserved',
    preservedStatus: '32 tail vertebrae preserved (17 articulated)',
    description:
      'The main specimen has 32 tail vertebrae, 17 of them still in their original order. The first tail vertebra has a keel underneath, the first third of the tail has cavities in the neural spines left by air sacs, and the V-shaped chevron bones below the tail are broadly expanded for powerful muscle attachment.',
    measurement: '~8.7 m length (estimate)',
  },
  {
    id: 'air-sacs',
    title: 'Pneumatic Air Sacs',
    shortLabel: '08 · Air Sacs',
    x: 41,
    y: 56,
    anchorX: 46,
    anchorY: 67,
    badge: 'preserved',
    preservedStatus: 'Osteological pneumatic fossae preserved',
    description:
      'Deep cavities (pneumatic fossae) in the neural spines of the anterior third of the tail show that air-sac extensions of the avian-like respiratory system invaded the bone, lightening the skeleton.',
    measurement: 'Anterior caudal pneumatization',
  },
  {
    id: 'soft-tissue',
    title: 'Soft Tissue and Collagen',
    shortLabel: '09 · Soft Tissue (2022)',
    x: 70,
    y: 74,
    anchorX: 79,
    anchorY: 75,
    badge: 'preserved',
    preservedStatus: 'Endogenous collagen peptides verified (2022)',
    description:
      'In 2022, soft tissue and endogenous collagen I peptides were reported from the main specimen (Schroeter et al., 2022), consistent with rapid, deep burial in a sudden flood event.',
    measurement: 'Collagen I preserved',
  },
  {
    id: 'skin-colour',
    title: 'Skin and Colouration',
    shortLabel: '10 · Skin & Colour',
    x: 68,
    y: 44,
    anchorX: 73,
    anchorY: 57,
    badge: 'inferred',
    preservedStatus: 'Unknown — no skin impressions or melanosomes recovered',
    description:
      'Skin texture and colouration of Dreadnoughtus are unknown. All celadon, jade, and spruce tones on this page are artistic colour-grading to place the reconstruction in its humid floodplain environment.',
    measurement: 'Pigmentation unknown',
  },
];

export const SIZE_COMPARISON_ENTITIES: SizeComparisonEntity[] = [
  {
    id: 'human',
    name: 'Human (Homo sapiens)',
    lengthMeters: 1.7,
    lengthLabel: '1.7 m',
    massLabel: '~0.07 tonnes',
    heightMeters: 1.7,
    note: 'Modern adult reference scale.',
  },
  {
    id: 'elephant',
    name: 'African Bush Elephant',
    lengthMeters: 6.5,
    lengthLabel: '~3–4 m shoulder height',
    massLabel: 'Up to ~6 tonnes',
    heightMeters: 3.6,
    note: 'Largest living land animal today.',
  },
  {
    id: 'trex',
    name: 'Tyrannosaurus rex',
    lengthMeters: 12.0,
    lengthLabel: '~12 m',
    massLabel: '~8–9 tonnes',
    heightMeters: 3.9,
    badge: 'estimate',
    note: 'Apex Late Cretaceous North American theropod.',
  },
  {
    id: 'bus',
    name: 'Standard City Bus',
    lengthMeters: 12.0,
    lengthLabel: '~12 m',
    massLabel: '~11–14 tonnes (unladen)',
    heightMeters: 3.2,
    note: 'Urban transit vehicle length reference.',
  },
  {
    id: 'dreadnoughtus',
    name: 'Dreadnoughtus schrani',
    lengthMeters: 26.0,
    lengthLabel: '~26 m (85 ft)',
    massLabel: '~22–59 tonnes (method-dependent)',
    heightMeters: 6.0,
    isFocal: true,
    badge: 'debated',
    note: 'Main specimen (still growing when it died); neck ~11.3 m, torso/hips ~5.1 m, tail ~8.7 m.',
  },
  {
    id: 'blue-whale',
    name: 'Blue Whale (Balaenoptera musculus)',
    lengthMeters: 30.0,
    lengthLabel: 'Up to ~30 m',
    massLabel: 'Can exceed 150 tonnes',
    heightMeters: 4.5,
    note: 'Heavier than any known sauropod in Earth history.',
  },
  {
    id: 'patagotitan',
    name: 'Patagotitan mayorum',
    lengthMeters: 34.0,
    lengthLabel: '~31–37 m',
    massLabel: '~50–60 tonnes',
    heightMeters: 6.2,
    isOptionalGiant: true,
    badge: 'estimate',
    note: 'Older Chubut Province titanosaur (~101.6 Ma); known from multiple individuals.',
  },
  {
    id: 'argentinosaurus',
    name: 'Argentinosaurus huinculensis',
    lengthMeters: 33.0,
    lengthLabel: '~30–35 m',
    massLabel: '~65–80 tonnes',
    heightMeters: 6.5,
    isOptionalGiant: true,
    badge: 'estimate',
    note: 'Older Neuquén Basin titanosaur (~107 Ma); very fragmentary (~5.1% of skeleton known).',
  },
];

export const MASS_DEBATE_STUDIES: MassStudyEstimate[] = [
  {
    id: 'lacovara-2014',
    study: 'Lacovara et al. (2014)',
    year: 2014,
    method: 'Scaling Equation',
    minTonnes: 59.3,
    maxTonnes: 59.3,
    pointTonnes: 59.3,
    label: '59.3 t (humerus + femur circumference scaling)',
    notes: 'Original Scientific Reports description using quadrupedal limb-bone circumference scaling equation.',
    badge: 'estimate',
  },
  {
    id: 'benson-2014',
    study: 'Benson et al. (2014)',
    year: 2014,
    method: 'Scaling Equation',
    minTonnes: 44.0,
    maxTonnes: 59.0,
    pointTonnes: 59.0,
    label: 'Up to 59 t (questioned for very large error)',
    notes: 'Broad macroevolutionary scaling dataset; later questioned for wide confidence intervals on extreme giants.',
    badge: 'debated',
  },
  {
    id: 'wedel-2014',
    study: 'Wedel (2014)',
    year: 2014,
    method: '3D Volumetric',
    minTonnes: 30.0,
    maxTonnes: 40.0,
    pointTonnes: 38.0,
    label: '36–40 t (~30 t with shorter torso)',
    notes: 'Volumetric comparisons correcting for extensive avian-style respiratory air sacs and torso proportions.',
    badge: 'estimate',
  },
  {
    id: 'paul-2014',
    study: 'Paul (2014)',
    year: 2014,
    method: '3D Volumetric',
    minTonnes: 26.0,
    maxTonnes: 26.0,
    pointTonnes: 26.0,
    label: '~26 t (initial skeletal restoration volume)',
    notes: 'Initial rigorous skeletal-volume estimate by Gregory S. Paul.',
    badge: 'estimate',
  },
  {
    id: 'bates-2015',
    study: 'Bates et al. (2015)',
    year: 2015,
    method: '3D Volumetric',
    minTonnes: 22.1,
    maxTonnes: 38.2,
    pointTonnes: 27.9,
    label: '22.1–38.2 t (3D digital volumetric model)',
    notes: 'Laser-scan-derived 3D hull reconstruction; Ullmann and Lacovara (2016) disputed the soft-tissue expansion bounds.',
    badge: 'debated',
  },
  {
    id: 'campione-2017',
    study: 'Campione (2017)',
    year: 2017,
    method: 'Modified Scaling',
    minTonnes: 48.0,
    maxTonnes: 48.0,
    pointTonnes: 48.0,
    label: '~48 t (modified scaling equation)',
    notes: 'Revised statistical model accounting for scaling curvature at extreme body sizes.',
    badge: 'estimate',
  },
  {
    id: 'paul-2019',
    study: 'Paul (2019)',
    year: 2019,
    method: '3D Volumetric',
    minTonnes: 31.0,
    maxTonnes: 31.0,
    pointTonnes: 31.0,
    label: '~31 t (revised volumetric model)',
    notes: 'Updated volumetric restoration by Gregory S. Paul incorporating refined chest and tail cross-sections.',
    badge: 'estimate',
  },
  {
    id: 'campione-evans-2020',
    study: 'Campione & Evans (2020)',
    year: 2020,
    method: 'Modified Scaling',
    minTonnes: 48.0,
    maxTonnes: 49.0,
    pointTonnes: 48.5,
    label: '~48–49 t (stylopodial circumference synthesis)',
    notes: 'Synthesis noting the gap between scaling and volume methods may stem from posture/gait effects or specimen immaturity.',
    badge: 'debated',
  },
];

export const CERRO_FORTALEZA_FAUNA = [
  {
    name: 'Puertasaurus reuili',
    group: 'Giant Titanosaur',
    detail: 'Known from just four massive vertebrae from Cerros Los Hornos in the same formation.',
  },
  {
    name: 'Orkoraptor burkei',
    group: 'Megaraptoran Theropod',
    detail: 'Large predatory/scavenging theropod; shed teeth among Dreadnoughtus bones may belong to relatives like Orkoraptor.',
  },
  {
    name: 'Austrocheirus isasii',
    group: 'Abelisauroid / Ceratosaurian Theropod',
    detail: 'Medium-sized carnivorous dinosaur described from partial forelimb and hindlimb material.',
  },
  {
    name: 'Talenkauen santacrucensis',
    group: 'Elasmarian Ornithopod',
    detail: 'Basal iguanodontian herbivore with unusual mineralized intercostal plates along its ribs.',
  },
  {
    name: 'Ankylosaurian Indet.',
    group: 'Thyreophoran Dinosaur',
    detail: 'Represented by isolated dermal armour plates (osteoderms).',
  },
  {
    name: 'Iguanodontoid & Abelisaurid Teeth',
    group: 'Isolated Dental Remains',
    detail: 'Along with additional distinct titanosaur teeth indicating higher dinosaur diversity.',
  },
  {
    name: 'Freshwater Turtles, Crocodyliforms & Atlantoceratodus',
    group: 'Aquatic & Semi-Aquatic Vertebrates',
    detail: 'Including the lungfish Atlantoceratodus, confirming perennial river channels and floodplain pools.',
  },
];

export const COMPLETENESS_CHART_DATA: CompletenessEntry[] = [
  {
    taxon: 'Dreadnoughtus schrani',
    totalSkeletalPercent: 45.5,
    boneTypesExclSkullPercent: 70.4,
    bonesFoundSummary: '~116 of ~256 bones (two specimens; 17 articulated caudals)',
    isFocal: true,
  },
  {
    taxon: 'Turiasaurus riodevensis',
    totalSkeletalPercent: 44.1,
    boneTypesExclSkullPercent: 45.8,
    bonesFoundSummary: 'European non-titanosaur eusauropod giant',
  },
  {
    taxon: 'Futalognkosaurus dukei',
    totalSkeletalPercent: 15.2,
    boneTypesExclSkullPercent: 26.8,
    bonesFoundSummary: 'Neck, back, sacrum, and hip elements',
  },
  {
    taxon: 'Paralititan stromeri',
    totalSkeletalPercent: 7.8,
    boneTypesExclSkullPercent: 12.7,
    bonesFoundSummary: 'Egyptian giant with longer humerus than Dreadnoughtus',
  },
  {
    taxon: 'Argentinosaurus huinculensis',
    totalSkeletalPercent: 5.1,
    boneTypesExclSkullPercent: 9.2,
    bonesFoundSummary: 'Vertebrae, sacrum, tibia, and fragmentary ribs',
  },
  {
    taxon: 'Antarctosaurus giganteus',
    totalSkeletalPercent: 2.3,
    boneTypesExclSkullPercent: 3.5,
    bonesFoundSummary: 'Femora and fragmentary cranial/postcranial pieces',
  },
  {
    taxon: 'Puertasaurus reuili',
    totalSkeletalPercent: 1.6,
    boneTypesExclSkullPercent: 2.8,
    bonesFoundSummary: 'Only four vertebrae (1 cervical, 1 dorsal, 2 caudals)',
  },
];

export const TITANOSAUR_RELATIVES = [
  {
    name: 'Puertasaurus',
    summary: 'Found in the same formation (Cerro Fortaleza), a giant known from just four vertebrae.',
  },
  {
    name: 'Patagotitan',
    summary: 'Older (~101.6 Ma) Patagonian giant (~31–37 m, 50–60 tonnes) known from multiple partial skeletons.',
  },
  {
    name: 'Argentinosaurus',
    summary: 'Older (~107 Ma, newly re-dated in 2026) giant (~30–35 m, 65–80 tonnes), known from ~5.1% of the skeleton.',
  },
  {
    name: 'Futalognkosaurus',
    summary: 'Late Cretaceous Patagonian lognkosaurian known from ~15.2% of the skeleton.',
  },
  {
    name: 'Paralititan',
    summary: 'Cretaceous giant from coastal mangrove deposits in Egypt; possesses an even longer humerus than Dreadnoughtus.',
  },
  {
    name: 'Aeolosaurus',
    summary: 'South American lithostrotian sharing key limb osteology characters highlighted by Ullmann & Lacovara (2016).',
  },
  {
    name: 'Gondwanatitan',
    summary: 'Brazilian aeolosaurid titanosaur with limb morphology comparable to Dreadnoughtus.',
  },
  {
    name: 'Saltasaurus',
    summary: 'Armoured saltasaurid titanosaur with a much more extreme wide-gauge stance than Dreadnoughtus.',
  },
];

export const MYTH_VS_REALITY_CARDS: MythRealityItem[] = [
  {
    id: 'myth-1',
    number: '01',
    myth: '“Dreadnoughtus weighed 59 tonnes, more than a jet.”',
    reality:
      'That was the 2014 scaling estimate. Later work gives about 22–40 tonnes from 3D volume models and about 48 tonnes from a revised scaling method, so its mass is debated.',
    badge: 'debated',
  },
  {
    id: 'myth-2',
    number: '02',
    myth: '“It was the biggest dinosaur ever.”',
    reality:
      'No. It is among the biggest known from reasonably complete remains, but Patagotitan and Argentinosaurus are comparable, and the modern blue whale is heavier than any known sauropod.',
    badge: 'estimate',
  },
  {
    id: 'myth-3',
    number: '03',
    myth: '“It was fully grown.”',
    reality:
      'No. Bone histology of the upper-arm bone shows abundant fast-growing tissue and lacks the outer bone layer of mature adults—the main specimen was still growing when it died, so adults could have been larger.',
    badge: 'inferred',
  },
  {
    id: 'myth-4',
    number: '04',
    myth: '“We have its whole skeleton, head included.”',
    reality:
      'No. About 45% of the bones, and about 70% of the bone types excluding the skull, are known. The skull is represented only by a single jaw fragment (maxilla) and one tooth.',
    badge: 'preserved',
  },
  {
    id: 'myth-5',
    number: '05',
    myth: '“It lived in a tropical swamp.”',
    reality:
      'The Cerro Fortaleza rocks (~52°S paleolatitude) show a temperate, humid river floodplain with shifting channels, natural levees, and crevasse-splay floods surrounded by conifer and southern-beech forests—not a permanent swamp.',
    badge: 'inferred',
  },
  {
    id: 'myth-6',
    number: '06',
    myth: '“Nothing ever touched it.”',
    reality:
      'The name reflects the idea that healthy adults were nearly impervious to attack. However, numerous shed theropod teeth found among the bones suggest megaraptoran scavengers fed on the carcass after death, not that anything hunted a living adult.',
    badge: 'inferred',
  },
];

export const GALLERY_PLATES: GalleryPlate[] = [
  {
    id: 'gallery-01',
    src: '/assets/gallery-01.jpg',
    fallbackLabel: '/assets/gallery-01.jpg · Floodplain Wading Reconstruction',
    plateNumber: 'PLATE I',
    title: 'Wading the Río La Leona Paleochannel',
    caption:
      'Artistic reconstruction of Dreadnoughtus schrani crossing a braided crevasse-splay channel in overcast drizzle (~52°S paleolatitude). Colours are artistic; real skin colour is unknown.',
    badge: 'inferred',
    svgSceneType: 'wading',
  },
  {
    id: 'gallery-02',
    src: '/assets/gallery-02.jpg',
    fallbackLabel: '/assets/gallery-02.jpg · 1.74 m Scapula & Pectoral Girdle',
    plateNumber: 'PLATE II',
    title: 'The 1.74 m Scapula (MPM-PV 1156)',
    caption:
      'Comparative osteological plate of the left scapula and sternal plates—the longest shoulder blade documented in any titanosaur.',
    badge: 'preserved',
    svgSceneType: 'scapula',
  },
  {
    id: 'gallery-03',
    src: '/assets/gallery-03.jpg',
    fallbackLabel: '/assets/gallery-03.jpg · Articulated Caudal Series',
    plateNumber: 'PLATE III',
    title: '32 Caudal Vertebrae & Pneumatic Spines',
    caption:
      'Seventeen anterior-to-mid tail vertebrae preserved in original anatomical articulation, displaying pneumatic cavities invaded by respiratory air sacs.',
    badge: 'preserved',
    svgSceneType: 'vertebrae',
  },
  {
    id: 'gallery-04',
    src: '/assets/gallery-04.jpg',
    fallbackLabel: '/assets/gallery-04.jpg · Avulsion & Crevasse-Splay Stratigraphy',
    plateNumber: 'PLATE IV',
    title: 'Cerro Fortaleza Avulsion & Crevasse Splay',
    caption:
      'Sedimentological diagram of the 460 m sandstone succession showing levee breach and liquefied sand fan burial that preserved both skeletons.',
    badge: 'inferred',
    svgSceneType: 'floodplain',
  },
  {
    id: 'gallery-05',
    src: '/assets/gallery-05.jpg',
    fallbackLabel: '/assets/gallery-05.jpg · Four Austral Summers Field Excavation',
    plateNumber: 'PLATE V',
    title: 'Río La Leona Quarry & Mule Pack Transit (2005–2009)',
    caption:
      'Quarry map showing the spatial association of the holotype (MPM-PV 1156), paratype (MPM-PV 3546), and shed megaraptoran scavenging teeth.',
    badge: 'preserved',
    svgSceneType: 'excavation',
  },
  {
    id: 'gallery-06',
    src: '/assets/gallery-06.jpg',
    fallbackLabel: '/assets/gallery-06.jpg · Humerus Histology & 2022 Collagen',
    plateNumber: 'PLATE VI',
    title: 'Humeral Bone Histology & Endogenous Collagen (2022)',
    caption:
      'Cross-polarized microstructure of the humerus lacking an External Fundamental System (EFS) alongside 2022 soft-tissue peptide recovery.',
    badge: 'preserved',
    svgSceneType: 'histology',
  },
];

export const FAST_FACTS: string[] = [
  'Its name means “fears nothing” and nods to early 20th-century dreadnought battleships, including two Argentine ones (ARA Rivadavia and ARA Moreno).',
  'It took four austral summers (2005–2009) to dig out, with mules and ropes hauling the heavy plaster-jacketed bones to a waiting truck.',
  'Its shoulder blade (scapula), at 1.74 m long, is the longest known in any titanosaur.',
  'Its neck (~11.3 m) made up almost half of its entire ~26 m body length (estimate).',
  'A sudden river levee break (avulsion) and liquefied sediment flood buried both individuals quickly, explaining why so much of the skeleton survived.',
  'About 45.5% of its total bones (and 70.4% of postcranial bone types) are known, versus about 5.1% for Argentinosaurus and about 1.6% for Puertasaurus.',
  'Fossilized soft tissue and endogenous collagen peptides were reported from the main specimen in 2022 (Schroeter et al., 2022).',
  'Its bones were laser-scanned in 3D and shared openly as digital 3D files, and the physical fossils are permanently housed at the Museo Padre Molina in Río Gallegos, Argentina.',
];

export const ACADEMIC_SOURCES: string[] = [
  'Lacovara, K. J. et al. (2014). A gigantic, exceptionally complete titanosaurian sauropod dinosaur from southern Patagonia, Argentina. Scientific Reports, 4, 6196.',
  'Schroeter, E., Boles, Z. & Lacovara, K. (2011). The histology of a massive titanosaur from Argentina and implications for maximum size in sauropods. Journal of Vertebrate Paleontology Abstracts.',
  'Wedel, M. J. (2014). How big was Dreadnoughtus? Volumetric mass reassessments (SV-POW!).',
  'Paul, G. S. (2014). Volumetric skeletal restorations of Dreadnoughtus schrani (~26 tonnes).',
  'Bates, K. T. et al. (2015). Downsizing a giant: re-evaluating Dreadnoughtus body mass. Biology Letters, 11(6), 20150215.',
  'Ullmann, P. V. & Lacovara, K. J. (2016). Appendicular osteology of Dreadnoughtus schrani, a giant titanosaurian (Sauropoda, Titanosauria) from the Upper Cretaceous of Patagonia, Argentina. Journal of Vertebrate Paleontology, 36(6).',
  'Campione, N. E. (2017). Extrapolating body masses in large terrestrial vertebrates. Paleobiology, 43(4), 693–699.',
  'Paul, G. S. (2019). Determining the largest known land animal: a critical comparison of differing methods for restoring the volume and mass of extinct animals. Annals of the Carnegie Museum, 85(4), 335–358.',
  'Campione, N. E. & Evans, D. C. (2020). The accuracy and precision of body mass estimation in non-avian dinosaurs. Biological Reviews, 95(6), 1759–1797.',
  'Schroeter, E. R. et al. (2022). Soft tissue and endogenous collagen preservation in Dreadnoughtus schrani from the Cerro Fortaleza Formation.',
  'Sickmann, Z. T. et al. (2018). Detrital-zircon U-Pb geochronology and provenance of the Austral Basin, southern Patagonia.',
  'Paulina-Carabajal, A., Ullmann, P. V. & Lacovara, K. J. (2021). Titanosaur cranial and axial morphology in southern Patagonia.',
  'Agnolín, F. L. et al. (2024). Review of the fossil vertebrates of the Cerro Fortaleza Formation (Upper Cretaceous), Santa Cruz Province, Argentina.',
  'Egerton, V. M. Drexel University PhD thesis on the geology, fossil wood, and paleoecology of the Cerro Fortaleza Formation.',
  'Sander, P. M. et al. (2011). Biology of the sauropod dinosaurs: the evolution of gigantism. Biological Reviews, 86(1), 117–155.',
  'Revista Chilena de Historia Natural (2012). Review of the Late Cretaceous Austral-Antarctic conifer and Nothofagus flora.',
  'Institutional Collections & Archives: Museo Padre Molina (Río Gallegos, Argentina); Academy of Natural Sciences of Drexel University (Philadelphia); Carnegie Museum of Natural History (Pittsburgh).',
];
