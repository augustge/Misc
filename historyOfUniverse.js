
var EPOCHS = [];

var scrollY = 0;
var dscroll = 0.005;

var time = {
  x: 50,
  w: 20,
  h: 60
}

var title = {
  x: 200,
  w: 80,
  h: 60
}

var desc = {
  x: 400,
  w: 200,
  h: 60
}

function setup(){
  canvas = createCanvas(windowWidth,windowHeight);
  c1 = color("rgb(47, 52, 59)");
  c2 = color("rgb(166, 121, 61)");
  c3 = color("rgb(255, 149, 11)");
  c4 = color("rgb(199, 121, 102)");
  c5 = color("rgb(227, 205, 164)");
  c6 = color("rgb(112, 48, 48)");
  c7 = color("rgb(126, 130, 122)");
  c8 = color("rgb(247, 239, 246)");
  c9 = color("rgb(196, 196, 189)");
  c10= color("rgb(86, 190, 215)");
  c11= color("rgb(212, 50, 21)");
  c12= color("rgb(69, 59, 61)");
  c13= color("rgb(255, 0, 0)");
  c14= color("rgb(255, 149, 11)");
  fillTables();
}


function draw(){
  background(c12);

  translate(0,scrollY);

  topY       = 100;
  epochYjump = 80;


  for(var i=0; i<EPOCHS.length; i++){

    fill(c10)
    textSize(12)
    text(str(EPOCHS[i].TIME.t) + EPOCHS[i].TIME.unit,time.x,topY+epochYjump*i,time.w,time.h);

    fill(c14)
    textSize(18)
    text(EPOCHS[i].NAME,title.x,topY+epochYjump*i,title.w,title.h);

    fill(c9)
    textSize(12)
    text(EPOCHS[i].TEXT,desc.x,topY+epochYjump*i,desc.w,desc.h);
  }

  scrollY -= dscroll * (mouseY-height/2)

}

function makeEpoch(name,time,redshift,temperature,description){
  var epoch = {
    NAME: name,
    TIME: time,
    REDSHIFT: redshift,
    TEMPERATURE: temperature,
    TEXT: description
  }
  return epoch
}



function fillTables(){
  EPOCHS.push(
    {
      NAME: "Planck epoch",
      TIME: {t:1e-43,unit:"s"}, //<10−43 s
      REDSHIFT: "-",
      TEMPERATURE: "10^32 K", // >1019 GeV
      TEXT: "The Planck scale is the scale beyond which current physical theories do not have predictive value. The Planck epoch is the time during which physics is assumed to have been dominated by quantum effects of gravity."
    },
    {
      NAME: "Grand unification",
      TIME: {t:1e-36,unit:"s"},
      REDSHIFT: "-",
      TEMPERATURE: "10^16 GeV",
      TEXT: "The three forces of the Standard Model are unified."
    },
    {
      NAME: "Inflationary epoch (Electroweak epoch)",
      TIME: {t:1e-36,unit:"s"},
      REDSHIFT: "-",
      TEMPERATURE: "10^28 K",
      TEXT: "Cosmic inflation expands space by a factor of the order of 10^26 over a time of the order of 10^(-33) to 10^(-32) seconds. The universe is supercooled from about 10^27 down to 10^22 kelvins. The Strong Nuclear Force becomes distinct from the Electroweak Force."
    },
    {
      NAME: "Quark epoch",
      TIME: {t:1e-12,unit:"s"},
      REDSHIFT: "-",
      TEMPERATURE: "10^12 K",
      TEXT: "The forces of the Standard Model have separated, but energies are too high for quarks to coalesce into hadrons, instead forming a quark-gluon plasma. These are the highest energies directly observable in experiment in the Large Hadron Collider."
    },
    {
      NAME: "Hadron epoch",
      TIME: {t:[1e-6,1],unit:"s"},
      REDSHIFT: "-",
      TEMPERATURE: "10^10 K",
      TEXT: "Quarks are bound into hadrons. A slight matter-antimatter-asymmetry from the earlier phases (baryon asymmetry) results in an elimination of anti-hadrons."
    },
    {
      NAME: "Neutrino decoupling",
      TIME: {t:1,unit:"s"},
      REDSHIFT: "-",
      TEMPERATURE: "10^10 K",
      TEXT: "Neutrinos cease interacting with baryonic matter."
    },
    {
      NAME: "Lepton epoch",
      TIME: {t:[1,10],unit:"s"},
      REDSHIFT: "-",
      TEMPERATURE: "10^9 K",
      TEXT: "Leptons and anti-leptons remain in thermal equilibrium."
    },
    {
      NAME: "Photon epoch",
      TIME: {t:[10,1.3*1e13],unit:"s"},
      REDSHIFT: "-",
      TEMPERATURE: "10^9-10^4 K",
      TEXT: "The universe consists of a plasma of nuclei, electrons and photons; temperatures remain too high for the binding of electrons to nuclei."
    },
    {
      NAME: "Big Bang nucleosynthesis",
      TIME: {t:[10,1e3],unit:"s"},
      REDSHIFT: "-",
      TEMPERATURE: "10^11-10^9 K",
      TEXT: "Protons and neutrons are bound into primordial atomic nuclei, hydrogen and helium-4. Small amounts of deuterium, helium-3, and lithium-7 are also synthesized."
    },
    {
      NAME: "Matter-dominated era",
      TIME: {t:[47e3,10e9],unit:"yr"},
      REDSHIFT: [3600,0.4],
      TEMPERATURE: "10^4-4000 K",
      TEXT: "During this time, the energy density of matter dominates both radiation density and dark energy, resulting in a decelerated metric expansion of space."
    },
    {
      NAME: "Recombination",
      TIME: {t:380e3,unit:"yr"},
      REDSHIFT: 1100,
      TEMPERATURE: "4000 K",
      TEXT: "Electrons and atomic nuclei first become bound to form neutral atoms. Photons are no longer in thermal equilibrium with matter and the Universe first becomes transparent. Recombination lasts for about 100 ka, during which Universe is becoming more and more transparent to photons. The photons of the cosmic microwave background radiation originate at this time. The spherical volume of space which will become Observable universe is 42 million light-years in radius at this time."
    },
    {
      NAME: "Dark Ages",
      TIME: {t:[380e3,150e6],unit:"yr"},
      REDSHIFT: [1100,20],
      TEMPERATURE: "4000-60 K",
      TEXT: "The time between recombination and the formation of the first stars. During this time, the only radiation emitted was the hydrogen line. The chemistry of life may have begun shortly after the Big Bang, 13.8 billion years ago, during a 'habitable epoch' when the Universe was only 10-17 million years old."
    },
    {
      NAME: "Stelliferous Era",
      TIME: {t:[150e6,100e9],unit:"yr"},
      REDSHIFT: [20,-0.99],
      TEMPERATURE: "60-0.03 K",
      TEXT: "The time between the first formation of Population III stars until the cessation of star formation, leaving all stars in the form of degenerate remnants."
    },
    {
      NAME: "Reionization",
      TIME: {t:[150e6,1e9],unit:"yr"},
      REDSHIFT: [20,6],
      TEMPERATURE: "60-19 K",
      TEXT: "The most distant astronomical objects observable with telescopes date to this period; as of 2016, the most remote galaxy observed is GN-z11, at a redshift of 11.09. The earliest 'modern' Population III stars are formed in this period."
    },
    {
      NAME: "Galaxy formation and evolution",
      TIME: {t:[1e9,10e9],unit:"yr"},
      REDSHIFT: [6,0.4],
      TEMPERATURE: "19-4 K",
      TEXT: "Galaxies coalesce into 'proto-clusters' from about 1 Ga (z = 6) and into Galaxy clusters beginning at 3 Gy (z = 2.1), and into superclusters from about 5 Gy (z = 1.2), see list of galaxy groups and clusters, list of superclusters."
    },
    {
      NAME: "Dark-energy-dominated era",
      TIME: {t:10e9,unit:"yr"},
      REDSHIFT: 0.4,
      TEMPERATURE: "4 K",
      TEXT: "Matter density falls below dark energy density (vacuum energy), and expansion of space begins to accelerate. This time happens to correspond roughly to the time of the formation of the Solar System and the evolutionary history of life."
    },
    {
      NAME: "Present time",
      TIME: {t:13.8e9,unit:"yr"},
      REDSHIFT: 0,
      TEMPERATURE: "2.7 K",
      TEXT: "Farthest observable photons at this moment are CMB photons. They arrive from a sphere with the radius of 46 billion light-years. The spherical volume inside it is commonly referred to as Observable universe."
    },
    {
      NAME: "Far future",
      TIME: {t:100e9,unit:"yr"},
      REDSHIFT: -0.99,
      TEMPERATURE: "<0.1 K",
      TEXT: "The Stelliferous Era will end as stars eventually die and fewer are born to replace them, leading to a darkening universe. Various theories suggest a number of subsequent possibilities. Assuming proton decay, matter may eventually evaporate into a Dark Era (heat death). Alternatively the universe may collapse in a Big Crunch. Alternative suggestions include a false vacuum catastrophe or a Big Rip as possible ends to the universe."
    }
  )

}



//
