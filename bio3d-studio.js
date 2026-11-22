(() => {
  // ================= 1. COMPLETE NCERT CLASS 11 & 12 BIOLOGY 3D CATALOG (ALL 32 CHAPTERS) =================
  const NCERT_BIO_DIAGRAMS = [
    // CLASS 11 BIOLOGY (Chapters 1 - 19)
    { id: "c11_1", cls: 11, ch: "Ch 1: The Living World", fig: "Fig 1.1", title: "Taxonomic Hierarchy Pyramid", type: "pyramid",
      tip: "As we go higher from Species to Kingdom, the number of common characteristics goes on decreasing.",
      labels: [
        { p: [0, 1.65, 0], n: "Kingdom (Broadest)", d: "Highest taxonomic category with fewest shared traits." },
        { p: [0.55, 0.9, 0.3], n: "Phylum / Division", d: "Division is used for plants; Phylum for animals." },
        { p: [0.85, 0.15, 0.45], n: "Class & Order", d: "Assemblage of families with few similar characters." },
        { p: [1.15, -0.6, 0.6], n: "Family & Genus", d: "Group of closely related species (e.g., Panthera)." },
        { p: [1.45, -1.35, 0.75], n: "Species (Basic Unit)", d: "Group of organisms with fundamental similarities." }
      ]
    },
    { id: "c11_2a", cls: 11, ch: "Ch 2: Biological Classification", fig: "Fig 2.6b", title: "T4 Bacteriophage Virus", type: "bacteriophage",
      tip: "Bacteriophages are generally double-stranded DNA (dsDNA) viruses that infect bacteria.",
      labels: [
        { p: [0, 1.6, 0], n: "Head (Capsid)", d: "Proteinaceous polyhedral coat enclosing dsDNA." },
        { p: [0, 0.78, 0.2], n: "Collar", d: "Connects the icosahedral head to the helical tail sheath." },
        { p: [0.22, 0.1, 0], n: "Sheath", d: "Contractile helical tube that injects viral DNA into host." },
        { p: [0, -0.7, 0.2], n: "Base Plate", d: "Anchors pins and tail fibers onto bacterial wall." },
        { p: [1.1, -1.35, 0.5], n: "Tail Fibres (6)", d: "Recognize specific receptors on host bacteria." }
      ]
    },
    { id: "c11_2b", cls: 11, ch: "Ch 2: Biological Classification", fig: "Fig 2.1", title: "Prokaryotic Bacterial Cell", type: "prokaryote",
      tip: "Plasmids confer unique phenotypic characters like antibiotic resistance to bacteria.",
      labels: [
        { p: [0, 0.95, 0], n: "Glycocalyx & Cell Wall", d: "Peptidoglycan wall provides structural shape." },
        { p: [0.1, 0.1, 0.2], n: "Nucleoid (Genomic DNA)", d: "Naked circular DNA without a nuclear membrane." },
        { p: [-0.7, -0.2, 0.3], n: "Plasmid DNA", d: "Small extra-chromosomal circular DNA used in rDNA." },
        { p: [0.65, -0.35, 0.35], n: "70S Ribosomes", d: "Site of protein synthesis (50S + 30S subunits)." },
        { p: [2.1, 0.1, 0], n: "Flagellum", d: "Thin filamentous extension for bacterial motility." }
      ]
    },
    { id: "c11_3", cls: 11, ch: "Ch 3: Plant Kingdom", fig: "Fig 3.2", title: "Bryophyte & Sporophyte Axis", type: "flower_ovule",
      tip: "In Bryophytes, the dominant phase is the haploid gametophyte; the sporophyte is attached and dependent on it.",
      labels: [
        { p: [0, 1.7, 0], n: "Capsule (Sporangium)", d: "Produces haploid spores by meiosis." },
        { p: [0, 0.7, 0.1], n: "Seta", d: "Stalk elevating the capsule for spore dispersal." },
        { p: [0, -0.2, 0.2], n: "Foot & Gametophyte", d: "Absorbs nutrients from photosynthetic gametophyte." },
        { p: [-0.8, -0.9, 0.2], n: "Leaf-like Appendages", d: "Haploid photosynthetic structures (not true leaves)." },
        { p: [0, -1.5, 0], n: "Rhizoids", d: "Unicellular or multicellular root-like anchoring structures." }
      ]
    },
    { id: "c11_4", cls: 11, ch: "Ch 4: Animal Kingdom", fig: "Fig 4.3", title: "Coelom & Germ Layers (T.S.)", type: "stem_ts",
      tip: "True Coelom (body cavity lined by mesoderm) is seen from Annelida through Chordata.",
      labels: [
        { p: [0, 0.5, 1.45], n: "Ectoderm (Outer)", d: "Forms outer skin and nervous system." },
        { p: [0.9, 0.5, 0.7], n: "Mesoderm", d: "Middle germinal layer lining the true coelom." },
        { p: [-0.7, 0.5, 0.5], n: "Coelom (Body Cavity)", d: "Fluid-filled cavity between body wall and gut wall." },
        { p: [0, 0.5, 0], n: "Endoderm (Gut)", d: "Innermost layer lining the digestive tract." }
      ]
    },
    { id: "c11_5", cls: 11, ch: "Ch 5: Morphology of Flowering Plants", fig: "Fig 5.10", title: "Parts of a Typical Flower (L.S.)", type: "flower_ovule",
      tip: "Hypogynous flowers (mustard, china rose, brinjal) have a superior ovary; epigynous (guava, cucumber) have an inferior ovary.",
      labels: [
        { p: [0, 1.75, 0], n: "Stigma & Style", d: "Receptive surface for pollen grains on the gynoecium." },
        { p: [0.85, 1.15, 0.2], n: "Anther (Stamen)", d: "Bilobed male reproductive part producing pollen." },
        { p: [-1.1, 0.65, 0.4], n: "Corolla (Petals)", d: "Brightly coloured whorl to attract pollinators." },
        { p: [0, -0.2, 0.3], n: "Ovary & Ovules", d: "Enlarged basal carpel housing ovules (future seeds)." },
        { p: [0.7, -0.95, 0.3], n: "Calyx (Sepals) & Thalamus", d: "Green outermost whorl protecting the bud." }
      ]
    },
    { id: "c11_6", cls: 11, ch: "Ch 6: Anatomy of Flowering Plants", fig: "Fig 6.4", title: "T.S. of Dicot Stem", type: "stem_ts",
      tip: "In Dicot stems, vascular bundles are conjoint, open (cambium present), endarch, and arranged in a ring.",
      labels: [
        { p: [0, 0.5, 1.5], n: "Epidermis & Cuticle", d: "Outermost protective layer with trichomes." },
        { p: [0.95, 0.5, 0.85], n: "Hypodermis & Cortex", d: "Collenchymatous hypodermis gives mechanical strength." },
        { p: [-0.85, 0.5, 0.6], n: "Vascular Bundle Ring", d: "Conjoint, collateral & open (xylem inner, phloem outer)." },
        { p: [0, 0.5, 0], n: "Central Pith", d: "Large parenchymatous cells with intercellular spaces." }
      ]
    },
    { id: "c11_7", cls: 11, ch: "Ch 7: Structural Organisation (Frog)", fig: "Fig 7.2", title: "Frog Circulatory Heart (3-Chambered)", type: "heart",
      tip: "Rana tigrina has a 3-chambered heart (2 atria + 1 ventricle) with sinus venosus and conus arteriosus.",
      labels: [
        { p: [0.65, 0.75, 0.4], n: "Right Atrium", d: "Receives deoxygenated blood via triangular sinus venosus." },
        { p: [-0.65, 0.75, 0.4], n: "Left Atrium", d: "Receives oxygenated blood from lungs & skin." },
        { p: [0, -0.75, 0.45], n: "Single Ventricle", d: "Muscular lower chamber mixing blood before pumping." },
        { p: [0.1, 1.5, 0.1], n: "Conus Arteriosus", d: "Sac-like vessel on ventral side carrying blood out." }
      ]
    },
    { id: "c11_8a", cls: 11, ch: "Ch 8: Cell — The Unit of Life", fig: "Fig 8.3a", title: "Plant Cell (Ultrastructure)", type: "plant_cell",
      tip: "Plant cells possess cell wall, plastids, and a large central vacuole (up to 90% volume), but lack centrioles.",
      labels: [
        { p: [1.5, 0.8, 0.6], n: "Cellulose Cell Wall", d: "Rigid non-living outer boundary for shape & protection." },
        { p: [-0.3, 0.1, 0.3], n: "Large Central Vacuole", d: "Bound by single membrane called Tonoplast." },
        { p: [0.85, 0.55, -0.3], n: "Nucleus & Nucleolus", d: "Pushed to periphery by the large central vacuole." },
        { p: [-0.95, -0.65, 0.5], n: "Chloroplast", d: "Double-membrane site of photosynthesis." },
        { p: [0.75, -0.75, 0.5], n: "Mitochondrion", d: "Powerhouse producing cellular ATP." }
      ]
    },
    { id: "c11_8b", cls: 11, ch: "Ch 8: Cell — The Unit of Life", fig: "Fig 8.3b", title: "Animal Cell (Ultrastructure)", type: "animal_cell",
      tip: "Animal cells contain non-membrane-bound centrioles (centrosome) that help in cell division.",
      labels: [
        { p: [1.45, 0.2, 0.4], n: "Plasma Membrane", d: "Selectively permeable phospholipid bilayer." },
        { p: [0, 0.2, 0.2], n: "Nucleus & Nucleolus", d: "Centrally located control center with chromatin." },
        { p: [-0.85, 0.5, 0.5], n: "Rough ER & Ribosomes", d: "Continuous with outer nuclear membrane for protein synthesis." },
        { p: [0.75, -0.75, 0.4], n: "Golgi Apparatus", d: "Cis (forming) & Trans (maturing) faces package glycoproteins." },
        { p: [-0.75, -0.65, 0.5], n: "Centrioles & Lysosomes", d: "Spindle formation & hydrolytic acid enzymes." }
      ]
    },
    { id: "c11_8c", cls: 11, ch: "Ch 8: Cell — The Unit of Life", fig: "Fig 8.4", title: "Fluid Mosaic Model (Plasma Membrane)", type: "fluid_mosaic",
      tip: "Proposed by Singer & Nicolson (1972): quasi-fluid nature of lipids enables lateral movement of proteins.",
      labels: [
        { p: [-1.1, 0.65, 0.4], n: "Hydrophilic Polar Heads", d: "Phosphate heads oriented outward toward aqueous medium." },
        { p: [-1.1, 0, 0.4], n: "Hydrophobic Lipid Tails", d: "Non-polar saturated hydrocarbon tails protected inside." },
        { p: [0.1, 0.2, 0.2], n: "Integral Channel Protein", d: "Buried partially or totally across the bilayer for transport." },
        { p: [1.05, 0.9, 0.3], n: "Sugar / Glycolipid Chain", d: "Involved in cell-to-cell recognition." },
        { p: [0.95, -0.1, 0.4], n: "Cholesterol", d: "Modulates membrane fluidity and stability." }
      ]
    },
    { id: "c11_8d", cls: 11, ch: "Ch 8: Cell — The Unit of Life", fig: "Fig 8.7", title: "Sectional View of Mitochondrion", type: "mitochondrion",
      tip: "Cristae increase surface area for ATP synthesis; matrix contains single circular DNA and 70S ribosomes.",
      labels: [
        { p: [0, 0.95, 0.4], n: "Outer Membrane", d: "Smooth continuous limiting boundary." },
        { p: [-0.6, 0.45, 0.5], n: "Inner Membrane (Cristae)", d: "Infoldings increasing surface area for ETS & ATP synthase." },
        { p: [0.2, 0, 0.3], n: "Mitochondrial Matrix", d: "Site of Krebs Cycle; contains circular DNA & 70S ribosomes." },
        { p: [0.95, -0.4, 0.4], n: "Inter-membrane Space", d: "Proton (H+) gradient accumulates here during chemiosmosis." }
      ]
    },
    { id: "c11_8e", cls: 11, ch: "Ch 8: Cell — The Unit of Life", fig: "Fig 8.8", title: "Sectional View of Chloroplast", type: "chloroplast",
      tip: "Thylakoids are stacked like coins into Grana (light reaction); Stroma contains RuBisCO enzymes (dark reaction).",
      labels: [
        { p: [0, 0.95, 0.4], n: "Double Membrane Envelope", d: "Inner chloroplast membrane is less permeable than outer." },
        { p: [-0.65, 0.15, 0.3], n: "Granum (Thylakoid Stack)", d: "Contains chlorophyll pigments for light reactions." },
        { p: [0.15, 0.1, 0.2], n: "Stroma Lamellae", d: "Flat membranous tubules connecting different grana." },
        { p: [0.85, -0.35, 0.4], n: "Stroma & 70S Ribosomes", d: "Site of Calvin cycle carbohydrate synthesis & circular DNA." }
      ]
    },
    { id: "c11_8f", cls: 11, ch: "Ch 8: Cell — The Unit of Life", fig: "Fig 8.10", title: "Cilia / Flagella (9 + 2 Axoneme)", type: "cilia_9plus2",
      tip: "Eukaryotic cilia/flagella show 9+2 microtubule arrangement; basal bodies/centrioles show 9+0 cartwheel.",
      labels: [
        { p: [0, 1.55, 0.2], n: "Plasma Membrane", d: "Covers the entire ciliary axoneme core." },
        { p: [1.15, 0.7, 0.2], n: "Peripheral Doublets (9)", d: "9 pairs of radially arranged microtubules linked by bridges." },
        { p: [0, 0, 0.25], n: "Central Microtubules (2)", d: "Enclosed by a central sheath connected via bridges." },
        { p: [-0.7, -0.4, 0.2], n: "Radial Spokes (9)", d: "Connect each peripheral doublet to the central sheath." }
      ]
    },
    { id: "c11_9", cls: 11, ch: "Ch 9: Biomolecules", fig: "Fig 9.5", title: "Secondary Structure of B-DNA", type: "dna_helix",
      tip: "In B-DNA, pitch is 34 Å (3.4 nm) with 10 base pairs per turn; rise per base pair is 3.4 Å.",
      labels: [
        { p: [0.75, 1.35, 0.2], n: "Sugar-Phosphate Backbone", d: "Antiparallel chains linked by 3'-5' phosphodiester bonds." },
        { p: [0, 0.45, 0.3], n: "Base Pairs (A=T, G≡C)", d: "2 H-bonds between A & T; 3 H-bonds between G & C." },
        { p: [-0.8, -0.45, 0.2], n: "36° Turn Per Step", d: "Full 360° helical pitch spans 10 base pairs (3.4 nm)." },
        { p: [0.7, -1.35, 0.2], n: "5' & 3' Polarity", d: "Two strands run in opposite antiparallel directions." }
      ]
    },
    { id: "c11_10", cls: 11, ch: "Ch 10: Cell Cycle & Cell Division", fig: "Fig 10.2", title: "Metaphase Chromosome & Kinetochore", type: "chromosome",
      tip: "Metaphase is the best stage to study chromosome morphology; spindle fibres attach specifically to kinetochores.",
      labels: [
        { p: [-0.45, 1.25, 0.2], n: "Sister Chromatids", d: "Two identical DNA halves replicated during S-phase." },
        { p: [0, 0, 0.35], n: "Centromere & Kinetochore", d: "Primary constriction with disc-shaped protein kinetochores." },
        { p: [0.55, -1.25, 0.2], n: "Telomere (Long Arm q)", d: "Protective ends preventing chromosomal fusion." },
        { p: [0.45, 1.55, 0.2], n: "Satellite (NOR)", d: "Non-staining secondary constriction seen in some chromosomes." }
      ]
    },
    { id: "c11_11", cls: 11, ch: "Ch 11: Photosynthesis in Higher Plants", fig: "Fig 11.7", title: "Chemiosmotic ATP Synthesis (Thylakoid)", type: "chloroplast",
      tip: "In chloroplasts, protons (H+) accumulate inside the Thylakoid LUMEN; ATP synthase F1 faces the Stroma.",
      labels: [
        { p: [-0.65, 0.3, 0.3], n: "PS II & Water Splitting", d: "Splits H2O on lumen side, releasing O2 and H+ ions." },
        { p: [0.1, 0.2, 0.3], n: "Cytochrome b6f & PS I", d: "Pumps H+ from stroma into lumen during electron flow." },
        { p: [0.85, -0.3, 0.4], n: "CF0–CF1 ATP Synthase", d: "Facilitated H+ diffusion drives ATP synthesis in stroma." }
      ]
    },
    { id: "c11_12", cls: 11, ch: "Ch 12: Respiration in Plants", fig: "Fig 12.4", title: "Mitochondrial ETS & Oxidative Phosphorylation", type: "mitochondrion",
      tip: "Complex IV is Cytochrome c oxidase; Oxygen acts as the final hydrogen/electron acceptor forming metabolic water.",
      labels: [
        { p: [-0.75, 0.3, 0.4], n: "Complex I–IV (Inner Mem.)", d: "NADH dehydrogenase to Cytochrome c oxidase chain." },
        { p: [0.9, -0.35, 0.4], n: "Inter-membrane H+ Pool", d: "High proton concentration drives F0-F1 Complex V." },
        { p: [0.1, 0, 0.3], n: "Matrix (Krebs Cycle)", d: "Generates NADH + H+ and FADH2; O2 forms H2O." }
      ]
    },
    { id: "c11_13", cls: 11, ch: "Ch 13: Plant Growth & Development", fig: "Fig 13.3", title: "Shoot Apex & PGR Growth Zones", type: "flower_ovule",
      tip: "Auxin causes apical dominance; Cytokinin overcomes it; Gibberellins promote bolting in rosette plants.",
      labels: [
        { p: [0, 1.7, 0], n: "Apical Meristem (Auxin)", d: "Meristematic phase with rich protoplasm & high division." },
        { p: [0, 0.5, 0.2], n: "Zone of Elongation (GA)", d: "Cell enlargement, vacuolation & new cell wall deposition." },
        { p: [0, -0.8, 0.2], n: "Zone of Maturation", d: "Cells attain maximal size and functional differentiation." }
      ]
    },
    { id: "c11_14", cls: 11, ch: "Ch 14: Breathing & Exchange of Gases", fig: "Fig 14.4", title: "Alveolus & Pulmonary Capillary Mesh", type: "alveolus",
      tip: "The diffusion membrane is <1 mm thick with 3 layers: squamous epithelium of alveoli, capillary endothelium & basement substance.",
      labels: [
        { p: [0, 1.55, 0], n: "Terminal Bronchiole", d: "Conducting airway delivering inspired air (pO2 = 104 mmHg)." },
        { p: [-0.8, 0.2, 0.7], n: "Alveolar Sacs", d: "Thin one-cell-thick squamous epithelium for gas exchange." },
        { p: [0.95, 0.1, 0.6], n: "Oxygenated Capillary (Red)", d: "Carries O2-rich blood (pO2 = 95 mmHg) to pulmonary vein." },
        { p: [0.5, -0.95, 0.6], n: "Deoxygenated Capillary (Blue)", d: "Brings CO2-rich blood (pCO2 = 45 mmHg) from pulmonary artery." }
      ]
    },
    { id: "c11_15", cls: 11, ch: "Ch 15: Body Fluids & Circulation", fig: "Fig 15.2", title: "Section of Human Heart", type: "heart",
      tip: "Left ventricle has the thickest muscular wall; SA Node (right upper corner of right atrium) generates 70-75 AP/min.",
      labels: [
        { p: [0.1, 1.65, 0.1], n: "Aorta (Systemic Arch)", d: "Largest artery distributing oxygenated blood to the body." },
        { p: [-0.55, 1.3, 0.3], n: "Pulmonary Artery", d: "Carries deoxygenated blood from RV to lungs." },
        { p: [0.85, 0.7, 0.35], n: "Right Atrium & SA Node", d: "Natural pacemaker receiving blood via Vena Cava." },
        { p: [-0.75, 0.65, 0.35], n: "Left Atrium", d: "Receives oxygenated blood via 4 Pulmonary Veins." },
        { p: [0.55, -0.7, 0.5], n: "Right Ventricle (Tricuspid)", d: "Pumps deoxygenated blood via semilunar valve." },
        { p: [-0.55, -0.8, 0.55], n: "Left Ventricle (Thickest)", d: "Guarded by Bicuspid/Mitral valve; pumps into Aorta." }
      ]
    },
    { id: "c11_16", cls: 11, ch: "Ch 16: Excretory Products", fig: "Fig 16.3", title: "Structure of a Nephron", type: "nephron",
      tip: "Descending limb of Loop of Henle is permeable to water; Ascending limb is impermeable to water but transports electrolytes.",
      labels: [
        { p: [-1.25, 1.25, 0.2], n: "Bowman's Capsule & Glomerulus", d: "Malpighian body performing ultrafiltration (GFR = 125 mL/min)." },
        { p: [-0.65, 0.75, 0.3], n: "PCT (Proximal Tubule)", d: "Simple cuboidal brush border reabsorbs 70–80% electrolytes & water." },
        { p: [-0.45, -1.25, 0.2], n: "Henle's Loop (Hairpin)", d: "Counter-current mechanism maintains medullary osmolarity (1200 mOsm/L)." },
        { p: [0.65, 0.85, 0.2], n: "DCT (Distal Tubule)", d: "Conditional reabsorption of Na+ and water under Aldosterone/ADH." },
        { p: [1.35, -0.3, 0.2], n: "Collecting Duct", d: "Concentrates urine and drains into renal pelvis." }
      ]
    },
    { id: "c11_17", cls: 11, ch: "Ch 17: Locomotion & Movement", fig: "Fig 17.2", title: "Sarcomere (Functional Unit of Contraction)", type: "sarcomere",
      tip: "During muscle contraction, I-band and H-zone shorten, while the length of the A-band (myosin) stays constant.",
      labels: [
        { p: [-1.55, 0.9, 0.2], n: "Z-Line (Krause's Mem.)", d: "Elastic fibre bisecting the I-band; anchors thin actin filaments." },
        { p: [0, 0.85, 0.3], n: "A-Band (Dark / Myosin)", d: "Anisotropic band; length remains unchanged during contraction." },
        { p: [0, -0.85, 0.3], n: "H-Zone & M-Line", d: "Central myosin zone not overlapped by actin at rest." },
        { p: [1.15, -0.85, 0.2], n: "Actin Thin Filaments", d: "Slide inward over myosin cross-bridges using ATP." }
      ]
    },
    { id: "c11_18a", cls: 11, ch: "Ch 18: Neural Control & Coordination", fig: "Fig 18.1", title: "Structure of a Myelinated Neuron", type: "neuron",
      tip: "Saltatory conduction occurs only in myelinated axons as action potentials jump from Node to Node of Ranvier.",
      labels: [
        { p: [-1.65, 0.75, 0.2], n: "Dendrites", d: "Short branched fibres with Nissl's granules transmitting impulses toward soma." },
        { p: [-1.1, 0, 0.3], n: "Cell Body (Soma)", d: "Contains nucleus and granular Nissl's bodies (RER)." },
        { p: [0.1, 0.45, 0.2], n: "Myelin Sheath (Schwann Cell)", d: "Insulating lipid layer speeding up nerve conduction." },
        { p: [0.55, -0.45, 0.2], n: "Node of Ranvier", d: "Unmyelinated gap between adjacent Schwann cells." },
        { p: [1.75, 0, 0.2], n: "Synaptic Knobs", d: "Bulb-like axon terminals storing neurotransmitter vesicles." }
      ]
    },
    { id: "c11_18b", cls: 11, ch: "Ch 18: Neural Control & Coordination", fig: "Fig 18.4", title: "Sagittal Section of Human Brain", type: "brain",
      tip: "Hypothalamus controls body temperature, hunger & thirst; Cerebellum maintains posture & equilibrium; Medulla controls respiration & CV reflexes.",
      labels: [
        { p: [0, 1.1, 0.4], n: "Cerebrum (Forebrain)", d: "Largest part; left & right hemispheres linked by Corpus Callosum." },
        { p: [0.1, 0.15, 0.3], n: "Thalamus & Hypothalamus", d: "Sensory relay center & thermoregulation/endocrine hub." },
        { p: [-0.85, -0.55, 0.3], n: "Cerebellum (Hindbrain)", d: "Highly convoluted surface coordinating balance & precision." },
        { p: [0.35, -0.7, 0.3], n: "Pons & Medulla Oblongata", d: "Brainstem centers for pneumotaxic breathing & heartbeat." }
      ]
    },
    { id: "c11_19", cls: 11, ch: "Ch 19: Chemical Coordination", fig: "Fig 19.5", title: "Hormone Receptor Mechanism (Membrane)", type: "fluid_mosaic",
      tip: "Protein/peptide hormones (FSH, Insulin) bind membrane receptors generating 2nd messengers (cAMP, IP3, Ca++); steroid hormones enter the nucleus.",
      labels: [
        { p: [0.1, 0.95, 0.2], n: "Peptide Hormone + Receptor", d: "Water-soluble hormone cannot cross lipid bilayer." },
        { p: [-1.1, 0, 0.4], n: "Target Cell Membrane", d: "Phospholipid bilayer housing transmembrane receptors." },
        { p: [0.1, -0.85, 0.3], n: "Second Messenger (cAMP)", d: "Triggers biochemical & physiological responses inside cell." }
      ]
    },

    // CLASS 12 BIOLOGY (Chapters 1 - 13)
    { id: "c12_1", cls: 12, ch: "Ch 1: Sexual Reprod. in Flowering Plants", fig: "Fig 1.7d", title: "Anatropous Ovule & 7-Celled Embryo Sac", type: "flower_ovule",
      tip: "A typical mature Angiosperm embryo sac is 7-celled and 8-nucleate (3 antipodals, 1 central cell with 2 polar nuclei, 2 synergids + 1 egg).",
      labels: [
        { p: [0, 1.65, 0], n: "Chalazal Pole (3 Antipodals)", d: "Basal part of the ovule opposite the micropyle." },
        { p: [0.85, 0.7, 0.3], n: "Outer & Inner Integuments", d: "Protective envelopes forming future seed coat (testa/tegmen)." },
        { p: [0, 0.15, 0.3], n: "Central Cell (2 Polar Nuclei)", d: "Fuses with 2nd male gamete (Triple Fusion → 3n PEN)." },
        { p: [0, -0.55, 0.35], n: "Egg Apparatus (Egg + 2 Synergids)", d: "Filiform apparatus in synergids guides the pollen tube." },
        { p: [0, -1.35, 0.2], n: "Micropyle & Funicle", d: "Opening for pollen tube entry & stalk attached to placenta." }
      ]
    },
    { id: "c12_2", cls: 12, ch: "Ch 2: Human Reproduction", fig: "Fig 2.6", title: "Structure of a Human Sperm", type: "sperm_ovum",
      tip: "Acrosome is derived from Golgi body and contains hyaluronidase/acrosin enzymes to dissolve zona pellucida.",
      labels: [
        { p: [-1.45, 0.35, 0.2], n: "Acrosome Cap", d: "Filled with lytic enzymes for fertilising the ovum." },
        { p: [-1.05, -0.3, 0.25], n: "Haploid Nucleus (Head)", d: "Elongated head carrying 23 chromosomes (22+X or 22+Y)." },
        { p: [-0.25, 0.4, 0.2], n: "Middle Piece (Mitochondria)", d: "Spirally arranged mitochondria power tail motility." },
        { p: [1.35, 0, 0.2], n: "Tail (Flagellum)", d: "Facilitates vigorous sperm movement in female tract." }
      ]
    },
    { id: "c12_3", cls: 12, ch: "Ch 3: Reproductive Health", fig: "Fig 3.1", title: "Copper-T IUD & Contraceptive Action", type: "antibody",
      tip: "Cu-releasing IUDs (CuT, Cu7, Multiload 375) suppress sperm motility and fertilising capacity; LNG-20 makes uterus unsuitable for implantation.",
      labels: [
        { p: [0, 1.35, 0.2], n: "T-Frame Arms", d: "Inserted into uterus by trained medical professionals." },
        { p: [0, 0.1, 0.25], n: "Copper Wire Coil (Cu++ Ions)", d: "Increases phagocytosis of sperms & suppresses motility." },
        { p: [0, -1.25, 0.2], n: "Retrieval Thread", d: "Allows safe verification and removal." }
      ]
    },
    { id: "c12_4", cls: 12, ch: "Ch 4: Principles of Inheritance", fig: "Fig 4.11", title: "Homologous Chromosomes & Linkage", type: "chromosome",
      tip: "T.H. Morgan used Drosophila melanogaster to prove linkage; tighter linkage means lower recombination frequency.",
      labels: [
        { p: [-0.45, 1.2, 0.2], n: "Linked Gene Loci", d: "Genes close together on same chromosome stay together." },
        { p: [0, 0, 0.35], n: "Centromere", d: "Segregates homologous chromatids in Anaphase." },
        { p: [0.55, -1.2, 0.2], n: "Crossing Over Site (Chiasma)", d: "Recombination during Pachytene generates variation." }
      ]
    },
    { id: "c12_5a", cls: 12, ch: "Ch 5: Molecular Basis of Inheritance", fig: "Fig 5.3", title: "Watson-Crick DNA Double Helix", type: "dna_helix",
      tip: "Chargaff's Rule: A/T = G/C = 1 in dsDNA; distance between a base pair in a helix is 0.34 nm.",
      labels: [
        { p: [0.75, 1.35, 0.2], n: "5' → 3' Leading Backbone", d: "Deoxyribose sugar + Phosphate group covalent chain." },
        { p: [0, 0.45, 0.3], n: "Hydrogen-Bonded Base Pairs", d: "Purines (A, G) pair specifically with Pyrimidines (T, C)." },
        { p: [-0.8, -0.5, 0.2], n: "Major & Minor Grooves", d: "Binding sites for regulatory proteins & RNA polymerase." },
        { p: [0.7, -1.35, 0.2], n: "3' → 5' Antiparallel Strand", d: "Template strand for continuous DNA replication." }
      ]
    },
    { id: "c12_5b", cls: 12, ch: "Ch 5: Molecular Basis of Inheritance", fig: "Fig 5.14", title: "The Lac Operon (Inducible System)", type: "operon",
      tip: "Lactose (allolactose) acts as an inducer by binding and inactivating the i-gene repressor, allowing transcription of z, y, a.",
      labels: [
        { p: [-1.65, 0.5, 0.2], n: "Regulator Gene (i)", d: "Constitutively synthesizes the repressor mRNA & protein." },
        { p: [-0.85, 0.6, 0.2], n: "Promoter (p) & Operator (o)", d: "RNA Polymerase binds p; Repressor blocks o when lactose absent." },
        { p: [0.15, 0.55, 0.2], n: "lac z (β-Galactosidase)", d: "Hydrolyses lactose into galactose + glucose." },
        { p: [0.95, 0.55, 0.2], n: "lac y (Permease)", d: "Increases cell permeability to β-galactosides." },
        { p: [1.65, 0.55, 0.2], n: "lac a (Transacetylase)", d: "Transfers acetyl group during lactose metabolism." }
      ]
    },
    { id: "c12_6", cls: 12, ch: "Ch 6: Evolution", fig: "Fig 6.1", title: "Miller's Spark Discharge Apparatus", type: "bioreactor",
      tip: "S.L. Miller (1953) created CH4, H2, NH3 and water vapour at 800°C with electric discharge and observed formation of amino acids.",
      labels: [
        { p: [0, 1.55, 0.2], n: "Electrodes (800°C Spark)", d: "Simulated primitive lightning in reducing atmosphere." },
        { p: [0.95, 0.5, 0.2], n: "CH4, NH3, H2 & H2O", d: "Oxygen-free primitive Earth gas mixture (2:1:2)." },
        { p: [-0.95, -0.4, 0.2], n: "Condenser Jacket", d: "Cools gases so organic droplets collect in liquid trap." },
        { p: [0, -1.25, 0.2], n: "Amino Acid Trap", d: "Yielded Alanine, Glycine & Aspartic acid." }
      ]
    },
    { id: "c12_7", cls: 12, ch: "Ch 7: Human Health & Disease", fig: "Fig 7.4", title: "Structure of an Antibody (H2L2 IgG)", type: "antibody",
      tip: "Each antibody molecule has 4 peptide chains: 2 small Light (L) chains and 2 longer Heavy (H) chains linked by disulphide bonds.",
      labels: [
        { p: [-0.95, 1.35, 0.2], n: "Antigen-Binding Site (Fab)", d: "Variable N-terminal region specific to each pathogen epitope." },
        { p: [0.9, 0.65, 0.2], n: "Light Chain (L)", d: "Two shorter polypeptide chains paired with heavy arms." },
        { p: [0.35, -0.35, 0.25], n: "Heavy Chain (H)", d: "Two longer chains forming the Y-stem (Fc region)." },
        { p: [0, 0.2, 0.3], n: "Disulphide Bonds (-S-S-)", d: "Covalent bridges stabilizing the H2L2 Y-conformation." }
      ]
    },
    { id: "c12_8", cls: 12, ch: "Ch 8: Microbes in Human Welfare", fig: "Fig 8.8", title: "Typical Biogas Plant (Methanogens)", type: "bioreactor",
      tip: "Methanobacterium grows anaerobically on cellulosic dung material to produce mainly Methane (CH4), CO2 and H2.",
      labels: [
        { p: [0, 1.55, 0.2], n: "Floating Gas Holder", d: "Rises as anaerobic methanogens generate biogas (CH4)." },
        { p: [-1.0, 0.4, 0.2], n: "Dung + Water Slurry Inlet", d: "Feeds cattle dung rich in Methanobacterium." },
        { p: [0, -0.65, 0.3], n: "Concrete Digester Tank", d: "10–15 ft deep anaerobic fermentation chamber." },
        { p: [1.05, -0.8, 0.2], n: "Spent Slurry Outlet", d: "Used directly as nutrient-rich organic fertiliser." }
      ]
    },
    { id: "c12_9a", cls: 12, ch: "Ch 9: Biotechnology — Principles", fig: "Fig 9.4", title: "E. coli Cloning Vector pBR322", type: "plasmid_pbr322",
      tip: "Insertional inactivation at BamHI/SalI destroys Tetracycline resistance (tetR) while keeping Ampicillin resistance (ampR) intact.",
      labels: [
        { p: [1.35, 0.75, 0.2], n: "tetR (BamHI, SalI)", d: "Tetracycline resistance selectable marker site." },
        { p: [-1.35, 0.75, 0.2], n: "ampR (PstI, PvuI)", d: "Ampicillin resistance selectable marker site." },
        { p: [0, 1.45, 0.2], n: "EcoRI, ClaI, HindIII", d: "Unique single restriction recognition sites." },
        { p: [-0.85, -1.2, 0.2], n: "ori (Origin of Replication)", d: "Controls replication start and vector copy number." },
        { p: [0.85, -1.2, 0.2], n: "rop (PvuII)", d: "Codes for proteins involved in plasmid replication." }
      ]
    },
    { id: "c12_9b", cls: 12, ch: "Ch 9: Biotechnology — Principles", fig: "Fig 9.7a", title: "Simple Stirred-Tank Bioreactor", type: "bioreactor",
      tip: "Curved base facilitates mixing; agitator & sparger ensure uniform oxygen availability and pH/temp control for 100–1000 L cultures.",
      labels: [
        { p: [0, 1.65, 0.2], n: "Motor & Agitator Shaft", d: "Drives flat-bladed impellers for homogeneous mixing." },
        { p: [-1.05, 0.85, 0.2], n: "Acid/Base pH & Foam Breaker", d: "Maintains optimal pH and breaks surface froth." },
        { p: [0.95, 0.1, 0.25], n: "Flat-Bladed Impellers", d: "Disperses oxygen bubbles throughout culture broth." },
        { p: [0, -1.25, 0.25], n: "Sterile Air Sparger", d: "Bubbles sterile oxygen upward from curved base." }
      ]
    },
    { id: "c12_10", cls: 12, ch: "Ch 10: Biotechnology & Applications", fig: "Fig 10.3", title: "Maturation of Pro-Insulin to Insulin", type: "operon",
      tip: "Eli Lilly (1983) synthesized A and B chains separately in E. coli and linked them via disulphide bonds (C-peptide is absent in mature insulin).",
      labels: [
        { p: [-1.45, 0.55, 0.2], n: "A-Peptide Chain", d: "21 amino acids; retained in mature functional insulin." },
        { p: [0, 0.65, 0.25], n: "C-Peptide (Removed)", d: "Extra stretch removed during maturation of pro-insulin." },
        { p: [1.45, 0.55, 0.2], n: "B-Peptide Chain", d: "30 amino acids linked to A-chain by disulphide bridges." }
      ]
    },
    { id: "c12_11", cls: 12, ch: "Ch 11: Organisms & Populations", fig: "Fig 11.1", title: "Age Pyramids (Expanding Population)", type: "pyramid",
      tip: "Triangular (broad base) = Expanding; Bell-shaped = Stable; Urn-shaped (narrow base) = Declining population.",
      labels: [
        { p: [0, 1.55, 0], n: "Post-Reproductive (Top)", d: "Smallest cohort in a rapidly expanding population." },
        { p: [0.85, 0.1, 0.45], n: "Reproductive Cohort", d: "Actively reproducing middle age group." },
        { p: [1.45, -1.3, 0.75], n: "Pre-Reproductive (Base)", d: "Broadest base indicates high future growth rate." }
      ]
    },
    { id: "c12_12", cls: 12, ch: "Ch 12: Ecosystem", fig: "Fig 12.4d", title: "Pyramid of Energy (10% Law)", type: "pyramid",
      tip: "Pyramid of Energy is ALWAYS upright because energy is inevitably lost as heat at each trophic transfer (Lindeman's 10% Law).",
      labels: [
        { p: [0, 1.6, 0], n: "Tertiary Consumers (10 J)", d: "Top carnivores receiving lowest net energy." },
        { p: [0.65, 0.65, 0.35], n: "Secondary Consumers (100 J)", d: "Carnivores feeding on primary consumers." },
        { p: [1.05, -0.35, 0.55], n: "Primary Consumers (1,000 J)", d: "Herbivores converting plant biomass." },
        { p: [1.45, -1.35, 0.75], n: "Producers (10,000 J)", d: "Capture ~1% of incident sunlight (1,000,000 J)." }
      ]
    },
    { id: "c12_13", cls: 12, ch: "Ch 13: Biodiversity & Conservation", fig: "Fig 13.1", title: "Global Species Diversity (Invertebrates)", type: "stem_ts",
      tip: "Insects make up more than 70% of all recorded animal species (7 out of every 10 animals on Earth are insects); Fungi exceed all vertebrates combined.",
      labels: [
        { p: [0.95, 0.5, 0.65], n: "Insects (>70% Animals)", d: "Largest taxonomic group in global animal diversity." },
        { p: [-0.95, 0.5, 0.65], n: "Molluscs & Crustaceans", d: "Second major invertebrate share." },
        { p: [0, 0.5, -1.1], n: "Fungi & Angiosperms", d: "Dominate global plant/fungal biodiversity pie." }
      ]
    }
  ];

  // ================= 2. NEW USER INTRODUCTION PRESENTATION SLIDES =================
  const INTRO_SLIDES = [
    { icon: "⚡", tag: "WELCOME TO STUDYPUNCH", title: "Your NEET 2027 Executive Atelier",
      body: "Designed to replace chaotic timers and scattered PDFs with one cloud-synced cockpit. Swipe horizontally across 6 tactical screens, track every NCERT chapter, and sync live across phone and laptop.",
      bullets: ["Cloud-synced via Firebase & Google Login", "Installable on your phone like a native app (PWA)", "3 Custom Web Themes inside ⚙️ Settings: Sunset, Flora & Fauna, Night Sky"] },
    { icon: "🌌", tag: "ZERO-DISTRACTION CLOCK-IN", title: "Sanctuary Focus & Live Wallpapers",
      body: "Hit Clock In to enter fullscreen Blackout Focus Mode. Choose Pitch Black, Live Aurora, Snowfall, or Focus Rain—with optional calming white-noise rain/wind audio—while your live status broadcasts to friends.",
      bullets: ["Optional NEET 2027 Doomsday Clock (02 May 2027) ticking Seconds → Days", "Automatic 4-Chart Web Telemetry (7-day bar, subject split, 14-day velocity)", "Manual Study Ledger & one-click CSV backup"] },
    { icon: "🎯", tag: "SMART NEXT-STEP ENGINE", title: "DOT AI & Complete NCERT Tracker",
      body: "Every NCERT Class 11 & Class 12 chapter across Physics, Chemistry, and Biology is wired into your checklist. DOT AI scans your unchecked nodes and prescribes the exact topic to study next.",
      bullets: ["Instant Search across all NCERT chapters and sub-topics", "One-tap Clock In directly from any NCERT topic or DOT card", "Auto-feeds your live completion % to the Global Arena"] },
    { icon: "🌐", tag: "3D PROGRESS VISUALIZATION", title: "3D Spider-Web Mastery Observatory",
      body: "Swipe to Slide 3 (3D Web) to inspect your preparation as a glowing 3D holographic crystal. Drag 360° with your finger or mouse as each NCERT subject stretches your mastery apex outward.",
      bullets: ["Real-time 6-Axis 3D Vector Coordinates (Phys/Chem/Bio Class 11 & 12)", "Dynamic Mastery Rank Badges from Initiate to Apex MBBS Legend", "Auto-orbit & scroll-to-zoom controls"] },
    { icon: "🧬", tag: "NEW: 3D NCERT BIO ATLAS", title: "Interactive 3D Biology Diagrams",
      body: "Tap the 🧬 3D Bio button in the top bar anytime to explore high-yield NCERT Class 11 & 12 Biology diagrams rebuilt in interactive 3D—complete with floating NCERT labels, Explode View, and Quiz Mode.",
      bullets: ["Covers all 32 rationalized NCERT Class 11 & 12 Biology chapters", "Explode View separates layers to reveal internal anatomy", "Quiz Mode hides labels into '?' pins so you can test recall"] },
    { icon: "🔫", tag: "STUDY WITH FRIENDS", title: "Live Arena, Notes Vault & Revolver Party",
      body: "Compete in real time on the Live Leaderboard, store high-yield formulas in your private Cloud Notes Vault, and unwind with friends in the Multiplayer NEET Revolver Roulette game.",
      bullets: ["Add multiple friends with 3-Heart survival bars & chapter-specific quizzes", "12-second bullet defusal timer for high-pressure NEET recall", "Replay this tour anytime from ⚙️ Settings → Replay Intro"] }
  ];

  // ================= 3. INJECT UI (HEADER BUTTON, SETTINGS HOOK, INTRO MODAL, 3D ATLAS PAGE) =================
  function injectAddons() {
    // A. Add "🧬 3D Bio" button in header next to Settings
    const openSettingsBtn = document.getElementById("openSettingsBtn");
    if (openSettingsBtn && !document.getElementById("openBio3dBtn")) {
      const bioBtn = document.createElement("button");
      bioBtn.id = "openBio3dBtn";
      bioBtn.type = "button";
      bioBtn.className = "clicky px-3 py-2 rounded-xl text-xs font-extrabold theme-btn-primary flex items-center gap-1.5 shadow-sm";
      bioBtn.innerHTML = `<span>🧬</span><span class="hidden xs:inline sm:inline">3D Bio</span>`;
      bioBtn.title = "Open 3D NCERT Biology Diagrams Lab";
      openSettingsBtn.parentNode.insertBefore(bioBtn, openSettingsBtn);
      bioBtn.addEventListener("click", openBio3dAtlas);
    }

    // B. Add "🎬 Replay Intro Tour" button inside Settings Modal
    const settingsExportBtn = document.getElementById("settingsExportCsvBtn");
    if (settingsExportBtn && !document.getElementById("replayIntroBtn")) {
      const replayBtn = document.createElement("button");
      replayBtn.id = "replayIntroBtn";
      replayBtn.type = "button";
      replayBtn.className = "clicky px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20";
      replayBtn.textContent = "🎬 Replay Intro Tour";
      settingsExportBtn.parentNode.insertBefore(replayBtn, settingsExportBtn);
      replayBtn.addEventListener("click", () => {
        document.getElementById("settingsModal")?.classList.add("hidden");
        openIntroPresentation(0);
      });
    }

    // C. Inject New User Intro Presentation Modal
    if (!document.getElementById("spIntroModal")) {
      const introEl = document.createElement("div");
      introEl.id = "spIntroModal";
      introEl.className = "hidden fixed inset-0 z-[130] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4";
      introEl.innerHTML = `
        <div class="luxury-card rounded-3xl w-full max-w-xl overflow-hidden border border-white/20 shadow-2xl flex flex-col">
          <div class="px-6 pt-5 pb-3 flex items-center justify-between border-b border-white/10">
            <div class="flex items-center gap-2">
              <span id="introSlideTag" class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] bg-white/10 theme-gradient-text border border-white/15">WELCOME</span>
            </div>
            <button type="button" id="introSkipBtn" class="clicky text-xs font-semibold text-zinc-400 hover:text-white px-2 py-1">Skip Tour ✕</button>
          </div>

          <div class="p-6 sm:p-8 text-center space-y-5">
            <div id="introSlideIcon" class="w-20 h-20 mx-auto rounded-3xl bg-black/80 border border-white/15 flex items-center justify-center text-4xl shadow-xl">⚡</div>
            <div>
              <h2 id="introSlideTitle" class="font-serif-luxury text-2xl sm:text-3xl font-bold text-white tracking-tight"></h2>
              <p id="introSlideBody" class="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-3 max-w-md mx-auto"></p>
            </div>
            <ul id="introSlideBullets" class="text-left max-w-md mx-auto space-y-2 bg-black/60 p-4 rounded-2xl border border-zinc-800 text-xs text-zinc-300"></ul>
          </div>

          <div class="px-6 py-4 bg-black/50 border-t border-white/10 flex items-center justify-between gap-3">
            <button type="button" id="introPrevBtn" class="clicky px-4 py-2 rounded-xl text-xs font-bold bg-zinc-900 text-zinc-300 border border-zinc-800 hover:text-white">← Back</button>
            <div id="introDots" class="flex items-center gap-1.5"></div>
            <button type="button" id="introNextBtn" class="clicky px-5 py-2 rounded-xl text-xs font-extrabold theme-btn-primary">Next →</button>
          </div>
        </div>`;
      document.body.appendChild(introEl);

      document.getElementById("introSkipBtn").addEventListener("click", closeIntroPresentation);
      document.getElementById("introPrevBtn").addEventListener("click", () => renderIntroSlide(introIdx - 1));
      document.getElementById("introNextBtn").addEventListener("click", () => {
        if (introIdx >= INTRO_SLIDES.length - 1) closeIntroPresentation();
        else renderIntroSlide(introIdx + 1);
      });
    }

    // D. Inject Dedicated Full-Screen 3D NCERT Biology Diagrams Page
    if (!document.getElementById("bio3dAtlasPage")) {
      const pageEl = document.createElement("div");
      pageEl.id = "bio3dAtlasPage";
      pageEl.className = "hidden fixed inset-0 z-[120] flex flex-col overflow-hidden";
      pageEl.style.background = "var(--bg-base)";
      pageEl.innerHTML = `
        <header class="bg-black/85 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div class="flex items-center gap-3">
            <button type="button" id="closeBio3dBtn" class="clicky px-3 py-2 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-800 text-white border border-white/15">← Back</button>
            <div>
              <h2 class="font-serif-luxury text-base sm:text-xl font-bold theme-gradient-text leading-tight">🧬 NCERT Biology 3D Diagram Lab</h2>
              <p class="text-[10px] text-zinc-400">All 32 NCERT Class 11 &amp; 12 Chapters • Interactive 3D Models &amp; Quiz Mode</p>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-1.5">
            <button type="button" id="bio3dRotateBtn" class="clicky px-3 py-1.5 rounded-xl text-[11px] font-bold bg-zinc-900 text-zinc-200 border border-white/15">🔄 Orbit: ON</button>
            <button type="button" id="bio3dExplodeBtn" class="clicky px-3 py-1.5 rounded-xl text-[11px] font-bold bg-zinc-900 text-zinc-200 border border-white/15">💥 Explode: OFF</button>
            <button type="button" id="bio3dQuizBtn" class="clicky px-3 py-1.5 rounded-xl text-[11px] font-extrabold theme-btn-primary">👁️ Labels: ON</button>
          </div>
        </header>

        <div class="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <!-- Left Sidebar: NCERT Diagram Directory -->
          <aside class="w-full lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/55 flex flex-col max-h-[34vh] lg:max-h-none shrink-0">
            <div class="p-3 space-y-2 border-b border-white/10">
              <input id="bio3dSearchInput" type="text" placeholder="🔍 Search NCERT diagram or chapter..." class="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400" />
              <div class="grid grid-cols-3 gap-1.5">
                <button type="button" data-cls="ALL" class="bio-cls-btn clicky py-1.5 rounded-lg text-[11px] font-bold theme-btn-primary">All (36)</button>
                <button type="button" data-cls="11" class="bio-cls-btn clicky py-1.5 rounded-lg text-[11px] font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800">Class 11</button>
                <button type="button" data-cls="12" class="bio-cls-btn clicky py-1.5 rounded-lg text-[11px] font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800">Class 12</button>
              </div>
            </div>
            <div id="bio3dListContainer" class="flex-1 overflow-y-auto p-2.5 space-y-1.5"></div>
          </aside>

          <!-- Right Main 3D Stage -->
          <main class="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-b from-black/70 to-black/95">
            <div id="bio3dViewportWrap" class="flex-1 relative overflow-hidden">
              <canvas id="bio3dWebglCanvas" class="w-full h-full block cursor-grab active:cursor-grabbing" style="touch-action:none;"></canvas>
              <div id="bio3dLabelsLayer" class="absolute inset-0 pointer-events-none overflow-hidden"></div>

              <!-- Top-left Diagram Info Badge -->
              <div class="absolute top-3 left-3 right-3 sm:right-auto max-w-md pointer-events-none">
                <div class="inline-block bg-black/75 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-2.5">
                  <div class="flex items-center gap-2">
                    <span id="bio3dFigBadge" class="px-2 py-0.5 rounded-md text-[10px] font-extrabold theme-btn-primary">Fig 15.2</span>
                    <span id="bio3dChText" class="text-[10px] font-semibold text-zinc-400">Ch 15: Body Fluids</span>
                  </div>
                  <h3 id="bio3dTitleText" class="font-serif-luxury text-base sm:text-lg font-bold text-white mt-0.5">Section of Human Heart</h3>
                </div>
              </div>

              <!-- Bottom Controls Hint -->
              <div class="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/75 border border-white/10 text-[10px] text-zinc-400 pointer-events-none">
                🖱️ Drag 360° • Scroll to Zoom • Tap any label pin for NCERT note
              </div>
            </div>

            <!-- Bottom High-Yield NCERT Tip & Selected Label Bar -->
            <div class="bg-black/90 border-t border-white/10 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
              <div class="text-xs text-zinc-300">
                <span class="font-extrabold theme-gradient-text">💡 NCERT NEET High-Yield:</span>
                <span id="bio3dTipText" class="ml-1 text-zinc-200"></span>
              </div>
              <div id="bio3dLabelDetailBox" class="hidden sm:max-w-sm px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-[11px] text-white"></div>
            </div>
          </main>
        </div>`;
      document.body.appendChild(pageEl);

      document.getElementById("closeBio3dBtn").addEventListener("click", closeBio3dAtlas);
      document.getElementById("bio3dSearchInput").addEventListener("input", renderBioList);
      document.querySelectorAll(".bio-cls-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          bioFilterClass = btn.getAttribute("data-cls");
          document.querySelectorAll(".bio-cls-btn").forEach(b => {
            b.className = b.getAttribute("data-cls") === bioFilterClass
              ? "bio-cls-btn clicky py-1.5 rounded-lg text-[11px] font-bold theme-btn-primary"
              : "bio-cls-btn clicky py-1.5 rounded-lg text-[11px] font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800";
          });
          renderBioList();
        });
      });

      document.getElementById("bio3dRotateBtn").addEventListener("click", (e) => {
        bioAutoRotate = !bioAutoRotate;
        e.target.textContent = bioAutoRotate ? "🔄 Orbit: ON" : "⏸ Orbit: OFF";
      });
      document.getElementById("bio3dExplodeBtn").addEventListener("click", (e) => {
        bioExploded = !bioExploded;
        e.target.textContent = bioExploded ? "💥 Explode: ON" : "💥 Explode: OFF";
      });
      document.getElementById("bio3dQuizBtn").addEventListener("click", (e) => {
        bioQuizMode = !bioQuizMode;
        bioRevealedPins.clear();
        e.target.textContent = bioQuizMode ? "🧠 Quiz Mode: Tap ? Pins" : "👁️ Labels: ON";
        rebuildLabelPins();
      });
    }
  }

  // ================= 4. INTRO PRESENTATION CONTROLLER =================
  let introIdx = 0;
  function renderIntroSlide(idx) {
    introIdx = Math.max(0, Math.min(INTRO_SLIDES.length - 1, idx));
    const s = INTRO_SLIDES[introIdx];
    document.getElementById("introSlideTag").textContent = `${introIdx + 1} / ${INTRO_SLIDES.length} • ${s.tag}`;
    document.getElementById("introSlideIcon").textContent = s.icon;
    document.getElementById("introSlideTitle").textContent = s.title;
    document.getElementById("introSlideBody").textContent = s.body;
    document.getElementById("introSlideBullets").innerHTML = s.bullets.map(b => `<li class="flex items-start gap-2"><span class="theme-gradient-text font-bold">✦</span><span>${b}</span></li>`).join("");
    document.getElementById("introPrevBtn").classList.toggle("opacity-40", introIdx === 0);
    document.getElementById("introPrevBtn").disabled = introIdx === 0;
    document.getElementById("introNextBtn").textContent = introIdx === INTRO_SLIDES.length - 1 ? "Launch StudyPunch 🚀" : "Next →";
    document.getElementById("introDots").innerHTML = INTRO_SLIDES.map((_, i) =>
      `<span class="h-1.5 rounded-full transition-all duration-300 ${i === introIdx ? 'w-6 bg-white' : 'w-1.5 bg-zinc-700'}"></span>`
    ).join("");
  }

  function openIntroPresentation(startIndex = 0) {
    renderIntroSlide(startIndex);
    document.getElementById("spIntroModal").classList.remove("hidden");
  }

  function closeIntroPresentation() {
    localStorage.setItem("studypunch_intro_seen_v1", "true");
    document.getElementById("spIntroModal").classList.add("hidden");
  }

  // ================= 5. THREE.JS 3D NCERT BIOLOGY RENDERER =================
  let bioFilterClass = "ALL", activeBioDiagram = NCERT_BIO_DIAGRAMS.find(d => d.id === "c11_15") || NCERT_BIO_DIAGRAMS[0];
  let bioAutoRotate = true, bioExploded = false, bioQuizMode = false;
  const bioRevealedPins = new Set();

  let scene = null, camera = null, renderer = null, modelGroup = null, bioAnimId = null;
  let bioRotX = 0.25, bioRotY = 0.4, bioZoom = 5.4, bioDragging = false, lastX = 0, lastY = 0;

  function initThreeEngine() {
    if (renderer || !window.THREE) return;
    const canvas = document.getElementById("bio3dWebglCanvas");
    const wrap = document.getElementById("bio3dViewportWrap");
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, (wrap.clientWidth || 600) / (wrap.clientHeight || 420), 0.1, 100);
    camera.position.z = bioZoom;

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(wrap.clientWidth || 600, wrap.clientHeight || 420);

    scene.add(new THREE.AmbientLight(0xffffff, 0.72));
    const keyLight = new THREE.DirectionalLight(0xfff5e4, 1.15);
    keyLight.position.set(6, 8, 7);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.65);
    rimLight.position.set(-6, -4, -6);
    scene.add(rimLight);
    const fillLight = new THREE.PointLight(0xf59e0b, 0.45, 25);
    fillLight.position.set(0, -5, 5);
    scene.add(fillLight);

    modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Unified pointer drag + wheel zoom
    canvas.addEventListener("pointerdown", (e) => { bioDragging = true; lastX = e.clientX; lastY = e.clientY; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener("pointerup", () => { bioDragging = false; });
    canvas.addEventListener("pointermove", (e) => {
      if (!bioDragging) return;
      bioRotY += (e.clientX - lastX) * 0.01;
      bioRotX = Math.max(-1.4, Math.min(1.4, bioRotX + (e.clientY - lastY) * 0.01));
      lastX = e.clientX; lastY = e.clientY;
    });
    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      bioZoom = Math.max(2.6, Math.min(9.5, bioZoom + e.deltaY * 0.004));
    }, { passive: false });

    window.addEventListener("resize", () => {
      if (!renderer || document.getElementById("bio3dAtlasPage").classList.contains("hidden")) return;
      const w = wrap.clientWidth || 600, h = wrap.clientHeight || 420;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  function addPart(geo, color, pos = [0, 0, 0], rot = [0, 0, 0], opts = {}) {
    const mat = new THREE.MeshStandardMaterial({
      color, roughness: opts.rough ?? 0.35, metalness: opts.metal ?? 0.12,
      transparent: !!opts.opacity, opacity: opts.opacity ?? 1,
      wireframe: !!opts.wireframe, side: opts.double ? THREE.DoubleSide : THREE.FrontSide
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(...pos);
    m.rotation.set(...rot);
    m.userData.basePos = new THREE.Vector3(...pos);
    m.userData.explodeDir = new THREE.Vector3(...pos).length() > 0.05
      ? new THREE.Vector3(...pos).normalize().multiplyScalar(0.55)
      : new THREE.Vector3(0, 0.35, 0);
    modelGroup.add(m);
    return m;
  }

  function addTube(pointsArr, radius, color, opts = {}) {
    const curve = new THREE.CatmullRomCurve3(pointsArr.map(p => new THREE.Vector3(...p)));
    const geo = new THREE.TubeGeometry(curve, opts.segs || 36, radius, 12, !!opts.closed);
    return addPart(geo, color, [0, 0, 0], [0, 0, 0], opts);
  }

  function build3dModel(type) {
    if (!modelGroup || !window.THREE) return;
    while (modelGroup.children.length) {
      const c = modelGroup.children[0];
      if (c.geometry) c.geometry.dispose();
      if (c.material) c.material.dispose();
      modelGroup.remove(c);
    }

    const T = THREE;
    if (type === "dna_helix") {
      const s1 = [], s2 = [];
      for (let i = 0; i <= 24; i++) {
        const t = i / 24, ang = t * Math.PI * 4, y = (t - 0.5) * 3.6, r = 0.68;
        const x1 = Math.cos(ang) * r, z1 = Math.sin(ang) * r;
        const x2 = Math.cos(ang + Math.PI) * r, z2 = Math.sin(ang + Math.PI) * r;
        s1.push([x1, y, z1]); s2.push([x2, y, z2]);
        if (i % 2 === 0 && i > 0 && i < 24) {
          const isAT = i % 4 === 0;
          addTube([[x1, y, z1], [0, y, 0]], 0.055, isAT ? 0xf59e0b : 0x10b981, { segs: 6 });
          addTube([[0, y, 0], [x2, y, z2]], 0.055, isAT ? 0xef4444 : 0x38bdf8, { segs: 6 });
        }
      }
      addTube(s1, 0.09, 0x818cf8, { segs: 64 });
      addTube(s2, 0.09, 0xf472b6, { segs: 64 });
    }
    else if (type === "heart") {
      addPart(new T.SphereGeometry(0.75, 24, 24), 0xdc2626, [-0.45, -0.55, 0], [0, 0, 0.25]); // LV (thick)
      addPart(new T.SphereGeometry(0.65, 24, 24), 0x3b82f6, [0.45, -0.45, 0.08], [0, 0, -0.2]); // RV
      addPart(new T.SphereGeometry(0.48, 20, 20), 0xef4444, [-0.55, 0.55, -0.05]); // LA
      addPart(new T.SphereGeometry(0.52, 20, 20), 0x2563eb, [0.58, 0.58, 0.05]); // RA
      addPart(new T.SphereGeometry(0.11, 14, 14), 0xfacc15, [0.85, 0.85, 0.35]); // SA Node
      addTube([[-0.25, 0.3, 0], [-0.2, 1.45, 0], [0.25, 1.65, -0.15], [0.4, 0.9, -0.4]], 0.19, 0xe11d48); // Aorta
      addTube([[0.25, 0.1, 0.2], [0.1, 1.15, 0.25], [-0.75, 1.25, 0.15]], 0.16, 0x60a5fa); // Pulmonary Artery
      addTube([[0.75, 1.55, 0], [0.7, 0.75, 0]], 0.15, 0x1d4ed8); // Sup Vena Cava
    }
    else if (type === "nephron") {
      addPart(new T.SphereGeometry(0.42, 22, 22, 0, Math.PI * 1.5), 0xfde68a, [-1.2, 1.1, 0], [0, 0, -0.5], { double: true, opacity: 0.75 });
      addPart(new T.TorusKnotGeometry(0.22, 0.055, 48, 8), 0xef4444, [-1.2, 1.1, 0]); // Glomerulus
      addTube([[-0.9, 0.95, 0], [-0.55, 1.2, 0.2], [-0.35, 0.75, -0.2], [-0.55, 0.25, 0.15], [-0.45, -1.35, 0], [-0.15, -1.5, 0], [0.05, -1.3, 0], [0.1, 0.75, 0], [0.55, 1.05, 0.2], [0.9, 0.65, -0.15], [1.25, 0.75, 0]], 0.085, 0xf59e0b, { segs: 80 });
      addPart(new T.CylinderGeometry(0.13, 0.15, 2.9, 16), 0x10b981, [1.3, -0.35, 0]); // Collecting Duct
    }
    else if (type === "mitochondrion") {
      addPart(new T.CapsuleGeometry(0.75, 1.4, 12, 24), 0xd97706, [0, 0, 0], [0, 0, Math.PI / 2], { opacity: 0.42 });
      const cr = [];
      for (let i = -5; i <= 5; i++) cr.push([i * 0.22, (i % 2 === 0 ? 0.45 : -0.45), (i % 3 === 0 ? 0.15 : -0.15)]);
      addTube(cr, 0.08, 0xfbbf24, { segs: 64 });
      addPart(new T.TorusGeometry(0.25, 0.035, 10, 24), 0x38bdf8, [0.1, 0, 0.15]); // mtDNA
      for (let k = 0; k < 6; k++) addPart(new T.SphereGeometry(0.06, 10, 10), 0x10b981, [(k - 2.5) * 0.35, (k % 2 ? 0.2 : -0.2), 0.25]);
    }
    else if (type === "chloroplast") {
      addPart(new T.SphereGeometry(1.3, 24, 20), 0x15803d, [0, 0, 0], [0, 0, 0], { opacity: 0.35 }).scale.set(1.25, 0.65, 0.8);
      [-0.75, 0, 0.75].forEach((gx, idx) => {
        for (let d = 0; d < 5; d++) addPart(new T.CylinderGeometry(0.28, 0.28, 0.09, 18), 0x22c55e, [gx, -0.3 + d * 0.14, idx === 1 ? 0.15 : -0.05]);
      });
      addPart(new T.BoxGeometry(1.7, 0.04, 0.12), 0x84cc16, [0, 0.05, 0.05]); // Stroma lamellae
      addPart(new T.SphereGeometry(0.16, 14, 14), 0xfef08a, [0.4, -0.25, 0.35]); // Starch
    }
    else if (type === "bacteriophage") {
      addPart(new T.IcosahedronGeometry(0.68, 0), 0x6366f1, [0, 1.35, 0]);
      addPart(new T.CylinderGeometry(0.2, 0.22, 0.16, 12), 0xf59e0b, [0, 0.72, 0]);
      addPart(new T.CylinderGeometry(0.16, 0.16, 1.25, 16), 0x38bdf8, [0, 0.02, 0]);
      addPart(new T.CylinderGeometry(0.38, 0.38, 0.12, 6), 0xf59e0b, [0, -0.65, 0]);
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        addTube([[Math.cos(a) * 0.32, -0.65, Math.sin(a) * 0.32], [Math.cos(a) * 0.85, -0.35, Math.sin(a) * 0.85], [Math.cos(a) * 1.15, -1.45, Math.sin(a) * 1.15]], 0.035, 0xe2e8f0, { segs: 12 });
      }
    }
    else if (type === "prokaryote") {
      addPart(new T.CapsuleGeometry(0.68, 1.5, 12, 24), 0x10b981, [0, 0, 0], [0, 0, Math.PI / 2], { opacity: 0.38 });
      addPart(new T.TorusKnotGeometry(0.38, 0.045, 56, 8), 0xf59e0b, [0, 0, 0]);
      addPart(new T.TorusGeometry(0.2, 0.035, 10, 20), 0x38bdf8, [-0.75, -0.15, 0.15]);
      for (let i = 0; i < 10; i++) addPart(new T.SphereGeometry(0.055, 10, 10), 0xf472b6, [(Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 0.7, (Math.random() - 0.5) * 0.5]);
      addTube([[1.35, 0, 0], [1.85, 0.25, 0.1], [2.25, -0.25, -0.1], [2.65, 0.15, 0]], 0.04, 0xfde68a);
    }
    else if (type === "plant_cell" || type === "animal_cell") {
      if (type === "plant_cell") {
        addPart(new T.BoxGeometry(2.7, 2.1, 1.9), 0x15803d, [0, 0, 0], [0, 0, 0], { opacity: 0.24 });
        addPart(new T.BoxGeometry(2.72, 2.12, 1.92), 0x22c55e, [0, 0, 0], [0, 0, 0], { wireframe: true, opacity: 0.45 });
        addPart(new T.SphereGeometry(0.72, 20, 20), 0x38bdf8, [-0.35, 0, 0], [0, 0, 0], { opacity: 0.55 }); // Vacuole
        addPart(new T.SphereGeometry(0.42, 20, 20), 0x818cf8, [0.75, 0.45, -0.2]); // Nucleus
        addPart(new T.CapsuleGeometry(0.2, 0.35, 8, 12), 0x10b981, [-0.85, -0.6, 0.4], [0, 0, 1.2]);
        addPart(new T.CapsuleGeometry(0.18, 0.32, 8, 12), 0xf59e0b, [0.7, -0.65, 0.35], [0, 0, 0.4]);
      } else {
        addPart(new T.SphereGeometry(1.5, 28, 28), 0x6366f1, [0, 0, 0], [0, 0, 0], { opacity: 0.22 });
        addPart(new T.SphereGeometry(0.55, 22, 22), 0x818cf8, [0, 0.15, 0], [0, 0, 0], { opacity: 0.8 });
        addPart(new T.SphereGeometry(0.2, 16, 16), 0xfde68a, [0, 0.15, 0.1]); // Nucleolus
        addPart(new T.TorusGeometry(0.8, 0.08, 10, 28, Math.PI * 1.2), 0x38bdf8, [0, 0.15, 0], [0.6, 0.2, 0.5]); // ER
        addPart(new T.CapsuleGeometry(0.18, 0.38, 8, 14), 0xf59e0b, [0.85, -0.5, 0.35], [0, 0, 0.8]); // Mito
        addPart(new T.BoxGeometry(0.55, 0.1, 0.3), 0x10b981, [0.7, -0.75, 0.2]); // Golgi
        addPart(new T.CylinderGeometry(0.08, 0.08, 0.38, 10), 0xf43f5e, [-0.75, -0.6, 0.4], [0, 0, 1.57]); // Centriole
        addPart(new T.CylinderGeometry(0.08, 0.08, 0.38, 10), 0xf43f5e, [-0.75, -0.6, 0.4]);
      }
    }
    else if (type === "fluid_mosaic") {
      for (let x = -1.4; x <= 1.4; x += 0.4) {
        for (let z = -0.6; z <= 0.6; z += 0.4) {
          if (Math.abs(x) < 0.35 && Math.abs(z) < 0.35) continue;
          addPart(new T.SphereGeometry(0.14, 12, 12), 0x38bdf8, [x, 0.55, z]);
          addPart(new T.SphereGeometry(0.14, 12, 12), 0x38bdf8, [x, -0.55, z]);
          addPart(new T.CylinderGeometry(0.025, 0.025, 0.42, 6), 0xfde68a, [x - 0.04, 0.24, z]);
          addPart(new T.CylinderGeometry(0.025, 0.025, 0.42, 6), 0xfde68a, [x + 0.04, -0.24, z]);
        }
      }
      addPart(new T.CylinderGeometry(0.36, 0.36, 1.55, 20), 0xe11d48, [0, 0, 0]); // Integral protein
      addPart(new T.SphereGeometry(0.28, 16, 16), 0x10b981, [1.0, 0.85, 0.1]); // Sugar/Glycoprotein
      addPart(new T.BoxGeometry(0.14, 0.45, 0.14), 0xf59e0b, [0.95, 0, 0.3]); // Cholesterol
    }
    else if (type === "cilia_9plus2") {
      addPart(new T.TorusGeometry(1.5, 0.06, 12, 48), 0x38bdf8, [0, 0, 0]);
      addPart(new T.CylinderGeometry(0.12, 0.12, 0.7, 14), 0xf59e0b, [-0.16, 0, 0], [Math.PI / 2, 0, 0]);
      addPart(new T.CylinderGeometry(0.12, 0.12, 0.7, 14), 0xf59e0b, [0.16, 0, 0], [Math.PI / 2, 0, 0]);
      addPart(new T.TorusGeometry(0.36, 0.03, 10, 28), 0xfde68a, [0, 0, 0]);
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2, r = 1.15;
        addPart(new T.CylinderGeometry(0.1, 0.1, 0.7, 12), 0x10b981, [Math.cos(a) * r, Math.sin(a) * r, 0], [Math.PI / 2, 0, 0]);
        addPart(new T.CylinderGeometry(0.1, 0.1, 0.7, 12), 0x818cf8, [Math.cos(a + 0.16) * r, Math.sin(a + 0.16) * r, 0], [Math.PI / 2, 0, 0]);
        addTube([[Math.cos(a) * 0.36, Math.sin(a) * 0.36, 0], [Math.cos(a) * 1.05, Math.sin(a) * 1.05, 0]], 0.025, 0x94a3b8, { segs: 4 });
      }
    }
    else if (type === "chromosome") {
      addPart(new T.CapsuleGeometry(0.24, 1.35, 10, 16), 0x818cf8, [-0.32, 0.78, 0], [0, 0, 0.18]);
      addPart(new T.CapsuleGeometry(0.24, 1.35, 10, 16), 0x818cf8, [0.32, 0.78, 0], [0, 0, -0.18]);
      addPart(new T.CapsuleGeometry(0.24, 1.45, 10, 16), 0x6366f1, [-0.35, -0.82, 0], [0, 0, -0.18]);
      addPart(new T.CapsuleGeometry(0.24, 1.45, 10, 16), 0x6366f1, [0.35, -0.82, 0], [0, 0, 0.18]);
      addPart(new T.SphereGeometry(0.28, 18, 18), 0xf59e0b, [0, 0, 0]); // Centromere
      addPart(new T.CylinderGeometry(0.32, 0.32, 0.08, 18), 0x10b981, [-0.26, 0, 0], [0, 0, Math.PI / 2]); // Kinetochore
      addPart(new T.CylinderGeometry(0.32, 0.32, 0.08, 18), 0x10b981, [0.26, 0, 0], [0, 0, Math.PI / 2]);
    }
    else if (type === "neuron") {
      addPart(new T.DodecahedronGeometry(0.52, 1), 0x818cf8, [-1.15, 0, 0]);
      addPart(new T.SphereGeometry(0.2, 14, 14), 0xfde68a, [-1.15, 0, 0.25]);
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        addTube([[-1.15, 0, 0], [-1.15 + Math.cos(a) * 0.9, Math.sin(a) * 0.85, (i % 2 ? 0.2 : -0.2)]], 0.045, 0xa78bfa, { segs: 8 });
      }
      addPart(new T.CylinderGeometry(0.05, 0.05, 2.7, 10), 0xe2e8f0, [0.35, 0, 0], [0, 0, Math.PI / 2]);
      [-0.35, 0.25, 0.85].forEach(x => addPart(new T.CapsuleGeometry(0.16, 0.32, 8, 14), 0xf59e0b, [x, 0, 0], [0, 0, Math.PI / 2]));
      for (let j = -1; j <= 1; j++) {
        addTube([[1.5, 0, 0], [1.85, j * 0.45, j * 0.15]], 0.035, 0x38bdf8, { segs: 6 });
        addPart(new T.SphereGeometry(0.1, 10, 10), 0x10b981, [1.88, j * 0.45, j * 0.15]);
      }
    }
    else if (type === "brain") {
      addPart(new T.SphereGeometry(0.95, 24, 24), 0xf472b6, [-0.28, 0.45, 0]).scale.set(1.25, 0.9, 0.72);
      addPart(new T.SphereGeometry(0.95, 24, 24), 0xec4899, [0.28, 0.45, 0]).scale.set(1.25, 0.9, 0.72);
      addPart(new T.SphereGeometry(0.45, 18, 18), 0xa855f7, [-0.75, -0.45, 0]); // Cerebellum
      addPart(new T.SphereGeometry(0.32, 16, 16), 0xf59e0b, [0.1, 0.1, 0.15]); // Thalamus/Hypothalamus
      addPart(new T.CylinderGeometry(0.24, 0.18, 1.05, 14), 0x38bdf8, [0.22, -0.8, 0], [0, 0, -0.25]); // Pons + Medulla
    }
    else if (type === "sarcomere") {
      addPart(new T.BoxGeometry(0.12, 1.9, 1.2), 0x38bdf8, [-1.55, 0, 0]); // Z-line L
      addPart(new T.BoxGeometry(0.12, 1.9, 1.2), 0x38bdf8, [1.55, 0, 0]);  // Z-line R
      addPart(new T.BoxGeometry(0.05, 1.6, 0.9), 0xfde68a, [0, 0, 0]);    // M-line
      [-0.5, 0, 0.5].forEach(y => addPart(new T.CylinderGeometry(0.08, 0.08, 1.85, 12), 0xe11d48, [0, y, 0], [0, 0, Math.PI / 2])); // Myosin
      [-0.75, -0.25, 0.25, 0.75].forEach(y => {
        addPart(new T.CylinderGeometry(0.035, 0.035, 1.15, 8), 0x10b981, [-0.98, y, 0.15], [0, 0, Math.PI / 2]);
        addPart(new T.CylinderGeometry(0.035, 0.035, 1.15, 8), 0x10b981, [0.98, y, 0.15], [0, 0, Math.PI / 2]);
      });
    }
    else if (type === "alveolus") {
      addPart(new T.CylinderGeometry(0.22, 0.26, 1.1, 16), 0xfde68a, [0, 1.25, 0]);
      [[0, 0.3, 0], [-0.65, 0.1, 0.3], [0.65, 0.1, 0.3], [-0.5, -0.55, -0.25], [0.5, -0.55, -0.25], [0, -0.75, 0.35]].forEach(p => {
        addPart(new T.SphereGeometry(0.48, 18, 18), 0xfca5a5, p, [0, 0, 0], { opacity: 0.78 });
      });
      addTube([[0.9, 0.8, 0.5], [1.0, 0, 0.7], [0.4, -0.9, 0.6], [-0.4, -0.9, 0.6]], 0.075, 0xef4444);
      addTube([[-0.9, 0.8, 0.5], [-1.0, -0.1, 0.65], [-0.3, -1.0, 0.5]], 0.075, 0x3b82f6);
    }
    else if (type === "flower_ovule") {
      addPart(new T.SphereGeometry(0.65, 22, 22), 0x10b981, [0, -0.25, 0], [0, 0, 0], { opacity: 0.45 }); // Ovary/Ovule
      addPart(new T.SphereGeometry(0.22, 16, 16), 0xfde68a, [0, -0.25, 0]); // Embryo sac / Egg
      addPart(new T.CylinderGeometry(0.11, 0.16, 1.35, 14), 0x22c55e, [0, 0.9, 0]); // Style
      addPart(new T.SphereGeometry(0.22, 14, 14), 0xf59e0b, [0, 1.65, 0]); // Stigma
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        addPart(new T.SphereGeometry(0.52, 14, 14), 0xf43f5e, [Math.cos(a) * 0.95, 0.35, Math.sin(a) * 0.95], [0, 0, 0], { opacity: 0.65 }).scale.set(0.7, 1.3, 0.25);
        addTube([[0, -0.6, 0], [Math.cos(a + 0.3) * 0.75, 0.95, Math.sin(a + 0.3) * 0.75]], 0.03, 0xfef08a, { segs: 8 });
        addPart(new T.CapsuleGeometry(0.08, 0.16, 6, 10), 0xf59e0b, [Math.cos(a + 0.3) * 0.75, 1.05, Math.sin(a + 0.3) * 0.75]);
      }
      addPart(new T.CylinderGeometry(0.14, 0.14, 0.9, 12), 0x15803d, [0, -1.2, 0]);
    }
    else if (type === "antibody") {
      addPart(new T.CapsuleGeometry(0.11, 1.2, 8, 14), 0x3b82f6, [-0.18, -0.65, 0]); // Heavy stem L
      addPart(new T.CapsuleGeometry(0.11, 1.2, 8, 14), 0x3b82f6, [0.18, -0.65, 0]);  // Heavy stem R
      addPart(new T.CapsuleGeometry(0.11, 1.1, 8, 14), 0x60a5fa, [-0.62, 0.65, 0], [0, 0, 0.68]);
      addPart(new T.CapsuleGeometry(0.11, 1.1, 8, 14), 0x60a5fa, [0.62, 0.65, 0], [0, 0, -0.68]);
      addPart(new T.CapsuleGeometry(0.09, 0.9, 8, 14), 0xf59e0b, [-0.95, 0.85, 0.08], [0, 0, 0.68]); // Light L
      addPart(new T.CapsuleGeometry(0.09, 0.9, 8, 14), 0xf59e0b, [0.95, 0.85, 0.08], [0, 0, -0.68]);  // Light R
      addPart(new T.BoxGeometry(0.45, 0.06, 0.06), 0xfacc15, [0, 0.05, 0]); // Disulfide bridge
    }
    else if (type === "plasmid_pbr322") {
      addPart(new T.TorusGeometry(1.3, 0.08, 14, 60), 0x94a3b8, [0, 0, 0]);
      addPart(new T.TorusGeometry(1.3, 0.14, 14, 24, 1.0), 0xe11d48, [0, 0, 0], [0, 0, 0.2]);  // tetR
      addPart(new T.TorusGeometry(1.3, 0.14, 14, 24, 1.0), 0x38bdf8, [0, 0, 0], [0, 0, 2.0]);  // ampR
      addPart(new T.TorusGeometry(1.3, 0.14, 14, 20, 0.7), 0x10b981, [0, 0, 0], [0, 0, 3.8]);  // ori
      addPart(new T.TorusGeometry(1.3, 0.14, 14, 20, 0.6), 0xf59e0b, [0, 0, 0], [0, 0, 5.0]);  // rop
      [1.55, 0.6, 2.5].forEach(a => addPart(new T.SphereGeometry(0.11, 12, 12), 0xfef08a, [Math.cos(a) * 1.3, Math.sin(a) * 1.3, 0.15]));
    }
    else if (type === "sperm_ovum") {
      addPart(new T.SphereGeometry(0.42, 20, 20), 0x818cf8, [-1.15, 0, 0]).scale.set(1.35, 0.85, 0.85);
      addPart(new T.SphereGeometry(0.32, 16, 16), 0xf59e0b, [-1.52, 0, 0]).scale.set(0.9, 0.72, 0.72); // Acrosome
      addPart(new T.CylinderGeometry(0.15, 0.13, 0.85, 16), 0x10b981, [-0.25, 0, 0], [0, 0, Math.PI / 2]); // Middle piece
      addTube([[0.18, 0, 0], [0.75, 0.22, 0.1], [1.35, -0.22, -0.1], [1.95, 0.18, 0]], 0.045, 0xe2e8f0);
    }
    else if (type === "stem_ts") {
      addPart(new T.CylinderGeometry(1.48, 1.48, 0.75, 36), 0x15803d, [0, 0, 0], [0, 0, 0], { opacity: 0.45 });
      addPart(new T.CylinderGeometry(0.42, 0.42, 0.78, 24), 0xfde68a, [0, 0, 0]); // Pith
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        addPart(new T.CylinderGeometry(0.16, 0.16, 0.82, 12), 0xe11d48, [Math.cos(a) * 0.88, 0, Math.sin(a) * 0.88]); // Xylem
        addPart(new T.CylinderGeometry(0.15, 0.15, 0.82, 12), 0x38bdf8, [Math.cos(a) * 1.12, 0, Math.sin(a) * 1.12]); // Phloem
      }
    }
    else if (type === "pyramid") {
      const cols = [0x10b981, 0x38bdf8, 0xf59e0b, 0xe11d48];
      [0, 1, 2, 3].forEach(lvl => {
        const sz = 2.6 - lvl * 0.6;
        addPart(new T.BoxGeometry(sz, 0.58, sz), cols[lvl], [0, -1.25 + lvl * 0.78, 0], [0, 0, 0], { opacity: 0.82 });
      });
    }
    else if (type === "bioreactor") {
      addPart(new T.CylinderGeometry(0.95, 0.95, 2.1, 28), 0x38bdf8, [0, -0.1, 0], [0, 0, 0], { opacity: 0.28 });
      addPart(new T.SphereGeometry(0.95, 24, 14, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), 0x38bdf8, [0, -1.15, 0], [0, 0, 0], { opacity: 0.32 });
      addPart(new T.CylinderGeometry(0.06, 0.06, 2.75, 12), 0xe2e8f0, [0, 0.2, 0]); // Shaft
      addPart(new T.BoxGeometry(0.55, 0.35, 0.55), 0xf59e0b, [0, 1.55, 0]); // Motor
      [-0.55, 0.25].forEach(y => {
        addPart(new T.BoxGeometry(1.15, 0.14, 0.08), 0x94a3b8, [0, y, 0]);
        addPart(new T.BoxGeometry(0.08, 0.14, 1.15), 0x94a3b8, [0, y, 0]);
      });
      addPart(new T.TorusGeometry(0.55, 0.06, 10, 24), 0x10b981, [0, -1.15, 0], [Math.PI / 2, 0, 0]); // Sparger
    }
    else if (type === "operon") {
      addPart(new T.BoxGeometry(3.8, 0.18, 0.35), 0x475569, [0, 0, 0]);
      [[-1.6, 0x818cf8], [-0.9, 0x38bdf8], [-0.35, 0xf59e0b], [0.25, 0x10b981], [0.95, 0x22c55e], [1.6, 0x84cc16]].forEach(([x, col]) => {
        addPart(new T.BoxGeometry(0.52, 0.42, 0.48), col, [x, 0.15, 0]);
      });
      addPart(new T.SphereGeometry(0.26, 16, 16), 0xe11d48, [-0.9, 0.65, 0.2]); // RNA Pol / Repressor
    }
  }

  function rebuildLabelPins() {
    const layer = document.getElementById("bio3dLabelsLayer");
    if (!layer || !activeBioDiagram) return;
    layer.innerHTML = activeBioDiagram.labels.map((lbl, idx) => {
      const hidden = bioQuizMode && !bioRevealedPins.has(idx);
      return `
        <button type="button" data-pin="${idx}" class="bio3d-pin pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md border shadow-lg transition hover:scale-105 ${hidden ? 'bg-amber-500 text-black border-white' : 'bg-black/80 text-white border-white/25'}">
          ${hidden ? `? ${idx + 1}` : lbl.n}
        </button>`;
    }).join("");

    layer.querySelectorAll(".bio3d-pin").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-pin"));
        const lbl = activeBioDiagram.labels[idx];
        if (bioQuizMode && !bioRevealedPins.has(idx)) {
          bioRevealedPins.add(idx);
          rebuildLabelPins();
        }
        const box = document.getElementById("bio3dLabelDetailBox");
        box.innerHTML = `<strong class="theme-gradient-text">${lbl.n}:</strong> ${lbl.d}`;
        box.classList.remove("hidden");
      });
    });
  }

  function updateProjectedLabels() {
    if (!renderer || !modelGroup || !activeBioDiagram) return;
    const wrap = document.getElementById("bio3dViewportWrap");
    const w = wrap.clientWidth, h = wrap.clientHeight;
    modelGroup.updateMatrixWorld();

    const pins = document.querySelectorAll(".bio3d-pin");
    activeBioDiagram.labels.forEach((lbl, idx) => {
      const el = pins[idx];
      if (!el) return;
      const v = new THREE.Vector3(...lbl.p);
      if (bioExploded) v.multiplyScalar(1.3);
      v.applyMatrix4(modelGroup.matrixWorld);
      v.project(camera);
      if (v.z > 1) { el.style.opacity = "0"; return; }
      el.style.opacity = "1";
      el.style.left = `${(v.x * 0.5 + 0.5) * w}px`;
      el.style.top = `${(-v.y * 0.5 + 0.5) * h}px`;
    });
  }

  function animateBio3d() {
    if (document.getElementById("bio3dAtlasPage").classList.contains("hidden")) { bioAnimId = null; return; }
    if (bioAutoRotate && !bioDragging) bioRotY += 0.007;
    if (modelGroup) {
      modelGroup.rotation.x = bioRotX;
      modelGroup.rotation.y = bioRotY;
      modelGroup.children.forEach(m => {
        if (!m.userData.basePos) return;
        const target = bioExploded ? m.userData.basePos.clone().add(m.userData.explodeDir) : m.userData.basePos;
        m.position.lerp(target, 0.12);
      });
    }
    if (camera) camera.position.z += (bioZoom - camera.position.z) * 0.15;
    if (renderer) renderer.render(scene, camera);
    updateProjectedLabels();
    bioAnimId = requestAnimationFrame(animateBio3d);
  }

  function selectBioDiagram(diag) {
    activeBioDiagram = diag;
    bioRevealedPins.clear();
    document.getElementById("bio3dFigBadge").textContent = `Class ${diag.cls} • ${diag.fig}`;
    document.getElementById("bio3dChText").textContent = diag.ch;
    document.getElementById("bio3dTitleText").textContent = diag.title;
    document.getElementById("bio3dTipText").textContent = diag.tip;
    document.getElementById("bio3dLabelDetailBox").classList.add("hidden");
    build3dModel(diag.type);
    rebuildLabelPins();
    renderBioList();
  }

  function renderBioList() {
    const q = (document.getElementById("bio3dSearchInput")?.value || "").toLowerCase().trim();
    const list = NCERT_BIO_DIAGRAMS.filter(d => {
      const clsOk = bioFilterClass === "ALL" || String(d.cls) === bioFilterClass;
      const qOk = !q || d.title.toLowerCase().includes(q) || d.ch.toLowerCase().includes(q) || d.fig.toLowerCase().includes(q);
      return clsOk && qOk;
    });
    const cont = document.getElementById("bio3dListContainer");
    if (!cont) return;
    cont.innerHTML = list.length ? list.map(d => {
      const active = activeBioDiagram && activeBioDiagram.id === d.id;
      return `
        <button type="button" data-diag="${d.id}" class="bio-item-btn clicky w-full text-left p-3 rounded-2xl border transition ${active ? 'bg-white/15 border-white/35 text-white' : 'bg-black/70 border-zinc-800/90 text-zinc-300 hover:bg-zinc-900'}">
          <div class="flex items-center justify-between gap-2 mb-0.5">
            <span class="text-[9px] font-extrabold uppercase tracking-wider ${active ? 'theme-gradient-text' : 'text-zinc-500'}">Class ${d.cls} • ${d.fig}</span>
            <span class="text-[9px] text-zinc-500">${d.labels.length} labels</span>
          </div>
          <p class="text-xs font-bold leading-snug">${d.title}</p>
          <p class="text-[10px] text-zinc-500 truncate mt-0.5">${d.ch}</p>
        </button>`;
    }).join("") : `<p class="text-xs text-zinc-500 text-center py-6">No matching NCERT diagrams.</p>`;

    cont.querySelectorAll(".bio-item-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const found = NCERT_BIO_DIAGRAMS.find(x => x.id === btn.getAttribute("data-diag"));
        if (found) selectBioDiagram(found);
      });
    });
  }

  function openBio3dAtlas() {
    document.getElementById("bio3dAtlasPage").classList.remove("hidden");
    initThreeEngine();
    selectBioDiagram(activeBioDiagram);
    if (!bioAnimId) animateBio3d();
  }

  function closeBio3dAtlas() {
    document.getElementById("bio3dAtlasPage").classList.add("hidden");
    if (bioAnimId) { cancelAnimationFrame(bioAnimId); bioAnimId = null; }
  }

  // ================= 6. BOOT ON PAGE READY =================
  function bootStudio() {
    injectAddons();
    if (!localStorage.getItem("studypunch_intro_seen_v1")) {
      setTimeout(() => openIntroPresentation(0), 450);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootStudio);
  else bootStudio();
})();
