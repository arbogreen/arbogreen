# DESIGN-BRIEF.md — Sistema di design del sito

> Compilare una volta per progetto. Vive nella root del progetto, a fianco di CLAUDE.md.
> Prima di creare o modificare qualsiasi pagina, sezione, footer o navbar, questo file va letto.
> Se il sito è nuovo, si compila insieme in chat. Se il sito esiste già, la prima bozza la propone Claude analizzando il sito — poi si conferma/corregge insieme.

## Identità del brand
- Nome cliente / attività: Arbogreen Service — impresa individuale di arboricoltura e manutenzione del verde, titolare agrotecnico certificato. Base a Città della Pieve (PG), operativa nelle province di Perugia e Siena.
- Settore/nicchia: Arboricoltura e cura del verde ornamentale. Nicchia tecnica/specialistica, non giardinaggio generico: tree climbing, potature e abbattimenti in quota (anche con gru/piattaforma), trattamenti fitosanitari, creazione e cura di giardini, impianti di irrigazione.
- Parole chiave del mood: professionale, tecnico, moderno. Competenza specialistica e sicurezza in quota messe al centro, comunicate con un linguaggio visivo attuale: contrasto verde acido / fondi scuri, foto reali di lavoro sugli alberi e tipografia sans pulita, senza fronzoli decorativi.
- Asset esistenti: logo Arbogreen (arbogreen-logo.png) + mark/simbolo isolato (arbogreen-mark.png), set favicon completo. Ampia libreria di foto reali dei lavori (potatura, abbattimento, tree climbing, gru/piattaforma, giardini, irrigazione) in assets/. Wordmark "ARBOGREEN Service" con "ARBO" e "Service" in verde scuro, "GREEN" in verde acido. Presenza social: Instagram (@arbogreenservice), WhatsApp business. Nessun Facebook, nessuna mappa GBP incorporata.

## Colori
- Colore primario (background/brand): verde acido #8db51e (--accent) come colore identitario del marchio, con la variante brillante #a5cb28 (--accent-bright) per hover e dettagli luminosi. Fondi in due registri: chiaro "paper" #f5f6f1 (--paper) e scuro quasi-nero #101716 (--ink).
- Colore secondario: verde scuro/bosco #153b2b, usato nel wordmark ("ARBO" e "Service") e come verde profondo di supporto. Nelle sezioni scure compaiono anche varianti molto profonde come #0a1b15 (sfondo card attrezzature) e #17201e (--ink-soft).
- **Colore CTA — UNO SOLO, usato esclusivamente per le call-to-action:** verde acido #a5cb28 (--accent-bright), affiancato dalla variante #8db51e (--accent) sui bordi. È il colore di tutte le CTA del sito (hero "Richiedi preventivo", CTA contatto finale, frecce servizi/aree). Vedi "Note ed eccezioni" per lo stato attuale.
- Colore del comune corrente sulle mappe area: verde #85ab29 (--territory-current), a circa il 78% del percorso tra il verde scuro #153b2b e il verde acido #a5cb28. Serve a distinguere il comune della pagina (sempre evidenziato, non modificabile dall'utente) dai comuni che l'utente accende con hover o click, che restano #a5cb28. Nasce perché il verde scuro #153b2b sul fondo scuro delle sezioni mappa rende solo 1.46:1 e sparisce; il precedente #5d832a, esattamente a metà strada, si leggeva invece troppo spento accanto al lime. **Uso esclusivo: riempimento del comune corrente nelle mappe delle pagine area, non altrove. Su #0a1b15 rende 6.65:1, quindi passerebbe AA anche come testo: la restrizione resta per coerenza di sistema, non per contrasto.**
- Confini delle mappe area: hairline bianca unica, `stroke-width: 1`, applicata a un layer `<g>` separato con `opacity: 0.34` sul gruppo — mai sul singolo tratto. Vale per tutti i confini senza eccezioni: perimetro provinciale, comuni serviti e comune corrente. Il motivo è che due comuni confinanti disegnano lo stesso confine due volte: come elementi traslucidi separati l'alpha si somma (34% + 34% = 56%) e i confini interni risultano più marcati di quelli esterni, dove il comune non ha vicini. Composto una volta sola a livello di gruppo, lo spessore resta uniforme su tutta la mappa. La geometria vive una volta sola in `<defs>` senza classi, e i due layer (riempimenti e confini) la richiamano via `<use>`.
- Colori neutri (testo, sfondi secondari): testo scuro #101716 (--ink) su fondi chiari; testo bianco #ffffff (--white) su fondi scuri; sfondo chiaro "paper" #f5f6f1 (--paper). Bianchi/grigi semitrasparenti (rgba bianco su scuro) per testi secondari, bordi sottili e separatori.
- Contrasto verificato (testo su sfondo colorato, WCAG AA): combinazioni reali del sito conformi — testo scuro su paper 16.7:1, bianco su scuro 18.2:1, verde acido su fondo scuro 9.7:1, CTA hover (testo scuro su verde) 9.7:1, verde scuro #153b2b su paper 11.4:1. ATTENZIONE: il verde acido #a5cb28 su fondo chiaro rende solo 1.7:1 → va usato solo su fondi scuri o come riempimento/bordo, mai come testo su chiaro.

## Tipografia
- Font titoli: stack di sistema "Segoe UI", "Helvetica Neue", Arial, sans-serif — nessun webfont caricato (zero dipendenze da Google Fonts, scelta di leggerezza). I titoli non hanno un font dedicato: usano lo stesso stack del corpo, differenziati per peso e dimensione.
- Font corpo testo (se diverso dai titoli): identico ai titoli — "Segoe UI", "Helvetica Neue", Arial, sans-serif. Un solo font per tutto il sito; la gerarchia si crea con dimensione, peso e spaziatura, non con famiglie diverse.
- Scala tipografica (dimensioni indicative H1 / H2 / H3 / body / small): valori fluidi con clamp(). H1 hero ~3.3→6.6rem (≈53–106px); H2 di sezione ~2.4→4.8rem (≈38–77px, alcune fino a 5.8rem); H3/sottotitoli interni ~1.35→2rem (≈22–32px); body ~1→1.24rem (≈16–20px); small/eyebrow ~0.62→0.9rem (≈10–14px), spesso in maiuscoletto con letter-spacing ampio.

## Spaziatura e layout
- Scala di spaziatura (es. multipli di 8px): nessuna scala rigida a step fissi — spaziature fluide con clamp() che scalano col viewport. Valori ricorrenti: gap 9–16px tra elementi, padding interni di card ~24–46px.
- Larghezza massima del contenuto: contenitore principale ~1160px; i blocchi di solo testo si restringono a ~700–920px per leggibilità.
- Padding standard delle sezioni (alto/basso): verticale fluido clamp(~105px → 155px) su desktop, orizzontale ~40px; su mobile i valori si riducono via clamp.

## Componenti
- Stile bottoni (forma, radius, ombra, stato hover/attivo): CTA primaria (hero) rettangolare squadrata, nessun radius, min-width ~220px, padding ~19px 25px, bordo 1px verde acido, testo bianco su fondo scuro semitrasparente; hover → riempimento verde acido con testo scuro (transizione ~180ms). Variante CTA contatto con radius 12px, sfondo verde tenue (rgba), bordo verde e freccia; hover con leggero sollevamento (translateY -2px) e ombra morbida.
- Stile card: radius prevalente 18px (14px su alcune), bordo sottile, ombra ampia e morbida (es. 0 24px 60px rgba scuro molto diffusa); card immagine su fondo scuro #0a1b15. Dettagli minori con radius 3px; un solo elemento pill (radius 999px) isolato.
- Stile form/input: il sito non usa moduli. Il contatto avviene solo via link diretti — WhatsApp (wa.me), telefono (tel:) ed email (mailto:). Nessuno stile input/textarea/select definito: da specificare solo se in futuro si aggiunge un modulo.

## Immagini
- Trattamento foto (rapporto di crop, filtro/color grading): foto reali a colori naturali, senza filtri grayscale/duotone; diverse versioni upscaled/enhanced. Crop prevalenti landscape ~1.4:1 e 1:1 per avatar/elementi tondi; hero a tutta larghezza. Angoli arrotondati 14–18px sulle immagini dentro le card.
- Stile illustrazioni, se presenti (flat / line / 3D — una sola): solo icone SVG "line" — tratto sottile (~1.8px), stroke currentColor, linecap arrotondato. Nessuna illustrazione flat/3D: un solo stile coerente.
- Origine immagini per sezione (foto reali del cliente vs stock, dove si usa cosa): foto reali del cliente/dei lavori in tutte le sezioni (potatura, abbattimento, tree climbing, gru, giardini, irrigazione, attrezzature, certificati). Mappe delle province come file SVG. Nessuno stock evidente.

## Riferimenti
- Siti/stili che piacciono (fonte di inspirazione): nessun riferimento esterno. Il sito è già impostato e va solo ultimato: il riferimento principale è il sito stesso: coerenza con quanto già costruito (colori, tipografia, componenti descritti in questo brief).
- Siti/stili da evitare: nessuno indicato.

## Note ed eccezioni
- (eventuali deroghe specifiche per questo cliente rispetto ai principi di default)
- Stato attuale del colore CTA: il verde acido (#a5cb28 / #8db51e) è sì il colore delle CTA, ma oggi è usato anche fuori dalle CTA — wordmark "GREEN", separatori del menu, bordi delle card, drop-shadow, span nei titoli. Al momento quindi NON è esclusivo delle call-to-action. Questa è la fotografia fedele del sito online attuale.
- Nessun webfont esterno: scelta di stack di sistema (leggerezza, zero dipendenze).
- Nessun form sul sito: contatto solo via link diretti WhatsApp/telefono/email.
