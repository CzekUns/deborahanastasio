# Deborah Anastasio — Digital Identity Concept

Progetto **dimostrativo** con due livelli distinti: la prima pagina è una **presentazione personale del proponente a Deborah Anastasio**, mentre le pagine successive sono simulazioni di Instagram, TikTok e del futuro sito ufficiale. Non è collegato agli account social reali e non modifica i profili online.


## Percorso di presentazione — versione 18 novembre 2026

La sequenza è intenzionale e va preservata:

**01 La proposta (voce del proponente) → 02 Instagram (demo) → 03 TikTok (demo) → 04 Sito ufficiale (finale).**

La homepage è uno spazio di spiegazione in prima persona. Racconta **perché** proporre il progetto, **quale valore** il proponente porta, **che cosa realizza concretamente** e **quale parte richiede i materiali e l'approvazione di Deborah**. È distinto dalla comunicazione pubblica dell'artista.

La guida editoriale e di handoff è in `docs/PRESENTAZIONE_DEBORAH.md`. Stili solo per la presentazione in `assets/presentation.css`. Gli hash `#visione` e `#pitch-value` aprono la vista di proposta, mentre `#instagram`, `#tiktok` e `#sito` restano le dimostrazioni indipendenti.

## Cosa contiene

- **La proposta** (#visione): presentazione commerciale in prima persona, valore aggiunto del proponente, metodo, collaborazione e percorso guidato per Deborah.
- **Instagram concept** (#instagram): simulazione responsive del profilo, bio proposta, 5 storie in evidenza, 12 post/copertine coordinate, apertura dei post con idea + caption, filtri post/reel.
- **TikTok concept** (#tiktok): simulazione verticale con 5 storyboard, navigazione con pulsanti, tastiera e swipe, format e note di produzione. I riquadri **non sono video veri e non riproducono audio**.
- **Sito ufficiale concept** (#sito): sito vetrina navigabile, proposta artistica, punti di contatto e una CTA dimostrativa senza raccolta dati.

Tutti i testi promozionali e le caption sono **proposte creative**, da approvare con l'artista. Le fotografie di atmosfera da Unsplash sono **segnaposto** e non rappresentano necessariamente Deborah, sue esibizioni o clienti. Nessuna statistica, recensione, prezzo, disponibilità o dichiarazione autobiografica è stata inventata.

## Link social forniti

- Instagram attuale: https://www.instagram.com/deborah.anastasio/
- TikTok attuale: https://www.tiktok.com/@debora.anastasio

Le piattaforme potrebbero impedire la lettura automatizzata di contenuti e dati. Il prototipo non tenta di aggirare restrizioni o fare scraping dei profili.

## Come visualizzare

Il progetto è statico: HTML + CSS + JavaScript, senza npm, database o chiavi API. Basta scaricare la repository e aprire index.html nel browser; font e foto di esempio richiedono internet.

Per pubblicare su **GitHub Pages**:

1. Apri la repository → **Settings** → **Pages**.
2. In **Build and deployment**, seleziona **Deploy from a branch**.
3. Scegli main, cartella /(root), poi **Save**.
4. Attendi che GitHub pubblichi e usa l'URL mostrato in **Pages**. Non considerare un indirizzo come attivo prima della verifica.

**Attenzione:** questa repository è stata creata privata. GitHub Pages con GitHub Free funziona sui repository pubblici; la pubblicazione direttamente da repository privati richiede un piano GitHub che la supporti. La visibilità del sito pubblicato è una questione separata dalla visibilità del codice: verificare prima di condividere. Non cambiare visibilità automaticamente.

## Materiali da sostituire prima di presentarlo come definitivo

1. **Ritratto reale autorizzato** di Deborah, foto live e backstage.
2. **Video verticali veri** e audio originali autorizzati per TikTok / Reels.
3. **Biografia approvata**, repertorio effettivo, servizi e formazioni davvero disponibili.
4. **Contatti reali**, preferenza su modulo / WhatsApp / DM e disponibilità.
5. **Consensi** per eventuali volti degli invitati o di coppie ritratte e verifica dei diritti sui brani e materiali.

## Struttura

- index.html — viste del concept
- assets/style.css — identità visiva responsive
- assets/app.js — routing, popup, post, story e storyboard video
- README.md — documentazione del concept

## Principio della proposta

**Instagram** costruisce il desiderio e rende immediatamente visibile un portfolio.
**TikTok** permette la scoperta attraverso voce, momenti e carattere.
**Il sito** dà autorevolezza e organizza il percorso al contatto.

### Fonti esterne e contesto da verificare

Il nome Deborah Anastasio appare in cronache pubbliche di eventi musicali, inclusa una notizia su un concerto di beneficenza a Nola: https://www.zerottounonews.it/events/nola-serata-di-beneficenza-con-monica-sarnelli-e-lino-dangio/ . Questo riferimento è **contesto**, non autorizzazione a usare fotografie né certificazione dell'intero profilo artistico.

---

Concept v0.1 · Novembre 2026. Non affiliato a Meta, Instagram, ByteDance o TikTok.

## Aggiornamento mobile immersivo (18 novembre 2026)

Su **smartphone** le sezioni Instagram e TikTok si aprono **senza cornice di telefono e senza pannelli di presentazione**: l'interfaccia occupa l'intero schermo come una simulazione delle app.

**Instagram:**
- profilo full-width, bio, highlights, griglia e tab post;
- barra inferiore Home / Esplora / Crea / Reels / Profilo;
- home-feed e ricerca demo, con post apribili e caption;
- stories a schermo intero, con avanzamento e chiusura;
- vista del singolo post con commenti di prova;
- anteprima Direct con messaggi locali che **non vengono inviati**.

**TikTok:**
- video storyboard a schermo intero, con swipe verso il prossimo/precedente;
- pulsanti laterali e barra inferiore Home / Scopri / Crea / Posta / Profilo;
- tap sullo storyboard per fermare/riprendere l'effetto visuale;
- vista profilo, griglia video proposta, ricerca e commenti di prova;
- sul profilo la barra inferiore passa al tema chiaro.

**Avvertenze:** sono simulazioni originali e indipendenti. I video sono animazioni di immagini segnaposto, **non registrazioni o performance reali** e non contengono audio della cantante. Nessuna piattaforma riceve post, DM, commenti o dati. I contenuti digitati per prova restano solo nello stato temporaneo della pagina. La demo esplicita il carattere dimostrativo, senza statistiche fittizie.

Gli ambienti possono essere aperti direttamente con:
- URL della pubblicazione + #instagram
- URL della pubblicazione + #tiktok

Il layout desktop mantiene le cornici smartphone e le note strategiche.


## Asset autentici (18 novembre 2026)

Foto ricevute dall'utente e aggiunte a GitHub come WebP 4:5 ottimizzati, in risoluzione leggera per questa prima demo mobile:

- `assets/deborah-cover-rosa-4x5.webp` — fotografia con sfondo rosa, usata come copertina e avatar Instagram;
- `assets/deborah-gallery-san-valentino-4x5.webp` — locandina dalla galleria (San Valentino, Dinner Show, Villa Gauro), trattata come materiale d'archivio e non come evento futuro.

Finché non ci sono altri materiali scelti, **gli stessi due asset vengono riutilizzati sia su Instagram sia su TikTok**. La Home TikTok è il primo schermo della sezione `#tiktok`; il profilo Instagram apre direttamente la sezione `#instagram`. I post del feed Instagram e le viste singole rispettano il rapporto **4:5**. La griglia profilo resta fatta di anteprime più piccole come nell'app.

Queste sono copie ottimizzate per il prototipo: conservare i JPG originali e sostituire con risoluzioni più alte prima della presentazione definitiva. Non sono stati caricati video in questa modifica.

## Direzione artistica v0.2 — Deborah e DAB

Aggiunta la guida [Identità estetica](docs/IDENTITA-ESTETICA.md) e lo stylesheet `assets/brand.css`. **DAB** significa **Deborah Anastasio Band**, la band di Deborah: ha ora un richiamo nella visione, una sezione dedicata nel [sito concept](#site-dab), una storia in evidenza e contenuti editoriali nelle simulazioni social. La sigla tipografica è una proposta, non un marchio ufficiale. Non vengono inventati musicisti, performance né fotografie della band.

## Studio vettoriale DA / DAB

Nuova [anteprima indipendente dei monogrammi](identita-svg.html) e [cartella SVG](assets/brand/README.md). Il baffo della A è un unico tracciato, applicato sopra le lettere Playfair Display convertite in vettori. La bozza non sostituisce ancora il design della demo principale.


## Video GitHub e copertine indipendenti — predisposizione del 18 novembre 2026

Il browser legge l'albero pubblico del branch `main` e individua i file **MP4/WebM/M4V** realmente presenti, ordinandoli per nome. L'integrazione è in `assets/video-integration.js` e si applica a entrambi i profili simulati:

- Instagram: griglia anteprime **4:5**, video riproducibili nel feed e nei post aperti, Reel verticali.
- TikTok: apertura sulla Home, video riprodotti nel feed con swipe, pausa e comando per l'audio.
- I filmati possono essere ripetuti temporaneamente tra i due canali.
- Ogni filmato possiede una **copertina indipendente**. Per sostituirla, carica l'immagine e associa i percorsi in `assets/video-covers.json`. Fino a quel momento restano le due immagini provvisorie già fornite.
- I video assenti o non ancora pubblicati non vengono simulati come se esistessero: in quel caso rimangono gli storyboard precedenti.

La cartella `deborah_media/` è il percorso consigliato per il caricamento di nuovi filmati. La Libreria di ChatGPT conserva alcuni filmati preparati in un'altra chat, ma al controllo successivo del branch main (18/11/2026) risultavano **4 filmati MP4 distinti già presenti**, quindi la loro riproduzione reale dipende dal caricamento di quei file su GitHub.

Una volta presenti, i video saranno scoperti in automatico al successivo aggiornamento della demo (può servire ricaricare la pagina dopo la pubblicazione di Pages).

### Verifica caricamento effettuato — 18 novembre 2026

Sono stati verificati **4 video MP4 distinti** nel branch `main` (un quinto percorso era un duplicato identico di un altro). La lista stabile è in `assets/videos.json`, ordinata `Video 01`–`Video 04`. La pagina rilegge anche l'albero GitHub per scoprire eventuali nuovi caricamenti. Se la richiesta pubblica a GitHub non funziona, usa l'inventario verificato.

Le copertine provvisorie sono mappate ai **nomi reali dei file** in `assets/video-covers.json`. Per cambiarle basta aggiornare il percorso dell'immagine: nessun video viene modificato. TikTok e Reels mostrano ciascun filmato distinto una sola volta, mentre il muro Instagram può ripeterli provvisoriamente per riempire la griglia.

La cartella `deborah_media/.chunks/` contiene frammenti binari di un tentativo di trasferimento alternativo; non sono video riproducibili e non vengono mostrati dall'applicazione.