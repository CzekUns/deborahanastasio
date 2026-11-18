# Deborah Anastasio · Direzione estetica 01

**Versione:** v0.2 concept, 18 novembre 2026 — da approvare con Deborah.  
**Ambito:** Instagram simulato, TikTok simulato, sito concept e **Deborah Anastasio Band (DAB)**.

## Identità e posizionamento

Deborah è il centro della propria storia artistica. La presenza digitale deve esprimere autorevolezza, memoria musicale e presenza scenica: estetica editoriale/discografica, grandi ritratti, lettering riconoscibile, materiale d'archivio autentico e riprese live. Il riferimento a grandi interpreti e identità musicali come Whitney Houston è metodologico; non copiarne foto, loghi o materiali.

La rosa dell'attuale copertina è un elemento del suo archivio visivo, non un logo imposto per il futuro.

## Architettura Deborah / DAB

- **Deborah Anastasio**: identità primaria, firma dell'artista, ritratto e voce.
- **DAB — Deborah Anastasio Band**: identità parallela e riconoscibile per la sua band, nella stessa famiglia estetica. Nome per esteso almeno alla prima occorrenza. DAB vive nella home di progetto, nel sito come sezione autonoma, nei post e highlights Instagram, nei video TikTok.
- Trattamento DAB: monogramma sans geometrico molto grande, toni scuri da palco, dettagli champagne, spazio a filmati e musicisti veri. Il logo tipografico del prototipo è **provvisorio**, non registrato né approvato.
- Non inventare la formazione, date, repertorio, testimonianze, pubblico o performance: questi dati arrivano da Deborah e dai suoi materiali.

## Palette — già implementata nella base

| Funzione | Colore | Variabile |
| --- | --- | --- |
| Bordeaux | `#641E37` | `--wine` |
| Bordeaux profondo | `#3E1728` | `--wine-deep` |
| Avorio | `#F7F3EC` | `--cream` |
| Champagne | `#C9AC88` | `--sand` |
| Ebano | `#281D22` | `--ink` |
| Carta | `#FCFAF7` | `--paper` |

I token semantici del trattamento DAB sono in `assets/brand.css`; conservare il contrasto, soprattutto per testi piccoli. Non applicare i colori dell'identità alle UI native simulate di Instagram/TikTok.

## Tipografia

**Playfair Display** per titoli artistici ed editoriali, **DM Sans** per navigazione/didascalie. Per DAB: sigla in DM Sans Bold, nome esteso sottostante in serif. Sono i font già caricati dal prototipo. **Bodoni Moda** è una possibile alternativa da valutare in una prova dedicata, non un font già implementato.

Titoli grandi, spazi generosi, composizione pulita. Evitare decorazione floreale, lettering cliché da wedding, ombre e transizioni eccessive.

## Fotografia e montaggio

Fotografie reali, ritratti e performance al centro. Il materiale d'archivio resta dichiarato come archivio. Nessuna foto stock o di Deborah solista deve essere presentata come foto dei componenti o di un concerto DAB. Le immagini AI possono essere solo bozze riconoscibili come tali. Inserire i crediti di chi compare e riprende, verificando i diritti.

Per video: aprire sulla performance, privilegiare la qualità della voce, utilizzare testi discreti. Suono e interpretazione sono l'elemento distintivo.

## Grammatica dei canali

**Instagram:** immagini/post verticali **4:5**, 1080×1350. Feed coerente; rubriche artista, backstage, repertorio, **DAB**, eventi. Una storia in evidenza DAB e copertine editoriali dedicate. Nella demo non mostrare metriche inventate.

**TikTok:** video **9:16**, 1080×1920. Atterraggio sulla Home simulata, feed a schermo intero su smartphone, video verticali veri solo quando forniti. Uno storyboard DAB illustra il format senza fingersi filmato della band.

**Sito:** prima Deborah come artista, poi **DAB con sezione e segno tipografico autonomi**, quindi le esperienze e il contatto. La navigazione permette di raggiungere la band; il racconto non deve ridursi alle cerimonie.

## QA e materiali mancanti

Verificare leggibilità e interazione almeno a 360/390 px, safe-area, rotte `#instagram`, `#tiktok`, `#sito`, `#site-dab`, formato dei post 4:5 e assenza di scroll orizzontale. Per completare: logo ufficiale eventuale, biografia approvata, fotografie band, lineup, video e audio originali con autorizzazioni.

**Tutto resta una proposta dimostrativa:** nessun claim, formazione o servizio definitivo senza approvazione dell'artista.
