
topics = [
    {
        name: "Medications",
        link: "/medications"
    },
    {
        name: "Cardiac Protocols",
        link: "/cardiac/protocols"
    },
    {
        name: "Medical Protocols",
        link: "/medical/protocols"
    },
    {
        name: "Trauma Protocols",
        link: "/trauma/protocols"
    }
]

resources = [
    {
        name: "NREMT",
        link: "https://www.nremt.org/"
    },
    {
        name: "NAEMT",
        link: "https://www.naemt.org/"
    },
    {
        name: "Prodigy EMS",
        link: "https://www.prodigyems.com/"
    },
    {
        name: "12 Lead Trainer",
        link: "https://12leadtrainer.com/"
    }
];



const index = (req, res) => {
    res.render('index', {
        title: 'ParaStudy',
        pageName: 'Home',
        topics,
        resources
    })
};


module.exports = index;




/*
quickReference = [
    {
    name: "Adult Vital Signs: Expected Normals",
    vitals: {
        bp: "Around: 120/80", 
        hr: "60 - 100", 
        rr: "12 - 20",
        spo2: "94% - 100%",
        capnography: "35 - 45",
        ph: "7.35 - 7.45",
        bgl: "90 - 130 mm/dL"
        },
    }
]

acronyms = [
    {
        name: "AVPU",
        translation: "Alert, Verbal, Pain, Unresponsive",
        purpose: "Used to determine level of consiousness."
    },
    {
        name: "AEIOUTIPS",
        translation: "Alcohol, Epilepsy/Endocrine, Insulin, O, Uremia, Trauma/Tamponade, I, Pseumothorax, S",
        purpose: "Aids differential diagnosis in patients with Altered Mental Status."
    },
    {
        name: "Hs & Ts",
        translation: "Hypothermia, Head Trauma, Tamponade, Transaxemic Acid",
        purpose: "Potential causes for cardiac arrest."
    },
    {
        name: "PERRL",
        translation: "Pupils Equal, Round, Reactive to light",
        purpose: "Test to help identify neurological deficits."
    },
    {
        name: "PMS",
        translation: "Pulse, Motor, Sensory",
        purpose: "Test to ensure proper systemic circulation during both before and after splinting procudures."
    }
]

assessment = [
    {
        name: 'Patient Assessment: General',
        step1: "Scene size up",
        step2: "Primary assessment: AVPU, ABCs, RAPID head to toe physical",
        step3: "Transport decision",
        step4: "Ongoing assessment: Secondary head to toe physical"
    }
]

medicationMath = [
    {
        name: "Medication Math"
    }
]
    */