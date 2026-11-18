# HANDOFF A CHATGPT WORK — Identità Deborah Anastasio / DAB

> **AGGIORNAMENTO SUCCESSIVO — 18 NOVEMBRE 2026, APPROVAZIONE COMPLETA.** Il proprietario ha esplicitamente approvato i 12 SVG contenuti nella [PR #1](https://github.com/CzekUns/deborahanastasio/pull/1), **inclusa la firma estesa**. I tre master DAB, DA, DEBORAH ANASTASIO sono stati copiati byte-per-byte in `assets/brand/approved/` su `main`; gli alias legacy sono stati allineati. Tutte le descrizioni precedenti di «firma non approvata» e «vettoriale incompleto» in questo documento riguardano lo **stato storico prima della PR** e sono superate. Per i prossimi lavori usare i 12 master approvati senza alterarne le curve. Vedi [assets/brand/README.md](../assets/brand/README.md).

**Stato:** 18 novembre 2026 · consegna da seguire prima di altre modifiche grafiche  
**Repository:** `CzekUns/deborahanastasio` · branch `main` (può evolvere)  
**Sito demo:** https://czekuns.github.io/deborahanastasio/#sito

## 0. Non iniziare senza l'immagine approvata

Il **pass DAB originale** è conservato nel file `DEBORAH_ANASTASIO_WORK_KIT.zip` consegnato all'utente nella chat ChatGPT da cui proviene questo handoff, in:

`01_REFERENCE_APPROVED/DAB_pass_ORIGINALE_APPROVATO.png`.

Il file fotografico originale **non è garantito nella repository**. L'utente deve **allegare il ZIP alla nuova sessione Work**. Non usare il solo SVG corrente come se fosse il riferimento approvato.

Nel ZIP sono presenti anche:
- `01_REFERENCE_APPROVED/DAB_mockup_secondary_ONLY_UPPER_LOGO.png` — mockup secondario: solo il DAB nel pannello **alto** è una seconda indicazione estetica; **la firma in basso non è approvata**.
- `02_FEEDBACK_DEFECTS/A_apice_difettoso.png` — apice A da ripulire.
- `02_FEEDBACK_DEFECTS/Curva_D_raccordo_difettoso.png` — raccordo del baffo alla D ancora imperfetto.
- `03_PREVIOUS_ATTEMPTS_NOT_APPROVED/` — vecchie versioni, **non approvate**, da usare solo come antiesempi.
- `00_LEGGIMI_PRIMA.md` — istruzioni complete; `04_BRIEF_AND_QA/CHECKLIST.md` — criteri QA; `04_BRIEF_AND_QA/PROMPT_DA_INCOLLARE_IN_WORK.txt` — prompt completo.

## 1. Cosa è approvato

L'utente ha selezionato il marchio **DAB · Deborah Anastasio Band** mostrato sul pass bordeaux: grandi lettere serif Didone color avorio, un **baffo champagne** che parte sotto la curva inferiore della D, attraversa A e prosegue sopra B con chiusura affusolata. Il nome completo sotto la sigla termina con **BAND in oro**. La scritta **LIVE** e il pass fotografico sono elementi applicativi, *non* parte del logo base.

L'utente ha poi confermato che «DAB è perfetto»: non cambiare la direzione estetica, non reinterpretare la DAB tramite generazione immagini. Correggere soltanto i difetti di vettorializzazione (apice A, raccordo sotto D, continuità, spessori e maschere).

La matrice DAB deve generare una famiglia:
1. **DAB** master: riproduzione vettoriale pulita dal riferimento approvato.
2. **DA**: derivato delle stesse D e A, con la stessa logica del baffo.
3. **DEBORAH ANASTASIO**: firma estesa con tipografia coerente con il DAB; sulla **prima A di ANASTASIO** serve **un piccolo baffo con lo stesso identico movimento del fregio DAB**. Non una lunga onda che passa sotto tutta la parola, né una curva geometricamente copiata senza cura dell'attacco.

La firma estesa **non è ancora approvata**. Il precedente tentativo usa Didot/Georgia come testo SVG con fallback browser-dipendente, e un baffo sovrapposto non armonizzato. Va ridisegnata e presentata prima di sostituirla sul sito.

## 2. Materiale in GitHub

| File | Stato | Uso |
| --- | --- | --- |
| [DAB-monogramma.svg](../assets/brand/DAB-monogramma.svg) | Ricostruzione vettoriale incompleta | Base tecnica; verificare con pass originale |
| [DA-monogramma.svg](../assets/brand/DA-monogramma.svg) | Derivato preliminare | Da riallineare al master ripulito |
| [deborah-anastasio.svg](../assets/brand/deborah-anastasio.svg) | **Non approvato** | Da rifare |
| [TAVOLA-identita.svg](../assets/brand/TAVOLA-identita.svg) | Confronto attuale | Sostituire con QA visivo reale |
| [identita-svg.html](../identita-svg.html) | Anteprima web separata | Possibile luogo di presentazione |
| [IDENTITA-ESTETICA.md](IDENTITA-ESTETICA.md) | Direzione di brand | Colori, editorialità, criteri canali |
| [index.html](../index.html) | Sito concept | Loghi già collegati e demo da preservare |
| [brand.css](../assets/brand.css) | Styling dei loghi | Responsive, vetrina e sezione band |
| [immersive.css](../assets/immersive.css), [immersive.js](../assets/immersive.js) | Social demo | **Non modificare** per il logo |
| [video-integration.js](../assets/video-integration.js) | Video demo | **Non modificare** per il logo |

La palette esistente è bordeaux `#641E37`, bordeaux profondo `#3E1728`, avorio `#F7F3EC` (logo circa `#F6F0E5`), champagne `#C9AC88` (logo circa `#D9B77D`), ebano `#281D22`.

## 3. Workflow richiesto

1. Apri il ZIP allegato e **leggi il pass originale**. Osserva curve, rapporti di spessore e dimensioni delle lettere. Recupera dalla repo lo stato di `main` e documenta l'ultimo commit.
2. Crea **branch separato** (es. `design/dab-master-refinement`) e tieni intatta la pubblicazione corrente fino a revisione.
3. Ricostruisci il **DAB come vero vettoriale** (tracciati Bézier ben raccordati). Correggi la punta sfrangiata della A e il raccordo del baffo **che deve seguire la D sottostante**. Non cambiare proporzioni approvate.
4. Solo dopo, deriva il monogramma DA **dalle stesse forme**.
5. Ricostruisci la firma DEBORAH ANASTASIO con la stessa famiglia tipografica **trasformata in contorni**, e un fregio piccolo e integrato sulla prima A di ANASTASIO.
6. Presenta una **tavola comparativa**: DAB originale vs master, DA, firma estesa, zoom 400% dell'apice A e della giunzione sotto D, su bordeaux e su avorio. Testa riduzioni 32/64px e header mobile 360/390px.
7. Prepara SVG su fondo trasparente, PNG preview e changelog delle differenze. Fornisci il link a branch/PR e chiedi **approvazione estetica della nuova firma** prima di pubblicarla.

## 4. Regole non negoziabili

- La generazione immagini non è fonte geometrica finale; può essere usata solo per mockup.
- Mai scambiare il **logo DAB approvato** con i precedenti tentativi SVG mal rifiniti.
- Nessun font fallback: trasforma le lettere definitive in contorni, usando font con licenza compatibile senza redistribuire file di font.
- Nessuna nuova onda, serpentina o decorazione generica.
- Non duplicare il baffo e non attaccarlo come elemento estraneo alla A: curare tangenti, raccordi, peso e sovrapposizioni.
- Nessuna modifica a video, social immersivi, contatti o contenuti editoriali.
- Nessuna dichiarazione di fedeltà pixel-perfect da una foto raster 393×289 senza adeguata verifica.

**Criterio finale:** `DAB` conserva l'identità approvata, `DA` è un derivato vero e la firma estesa è coerente e raffinata, pronta per una valutazione estetica indipendente.
