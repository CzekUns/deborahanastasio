# Deborah Anastasio · studio SVG 02

Questa cartella conserva le bozze vettoriali del logotipo esteso, di **DA** e di **DAB (Deborah Anastasio Band)**.

**Fonte tipografica:** Playfair Display Regular, lettere trasformate in tracciati (nessun font viene distribuito). Il baffo champagne è un *path* SVG separato, sovrapposto alla **A**. Le tre applicazioni condividono esattamente la seguente geometria:

```svg
<path id="firma-baffo" d="M -570 450 C -390 185 -155 190 42 405 C 270 655 490 684 710 604 C 910 530 1012 385 1252 420 C 1493 454 1705 676 1868 654 C 1925 650 1965 608 2020 540" fill="none" stroke="#D8B481" stroke-linecap="round" stroke-width="20"/>
```

Nei singoli file la stessa curva viene richiamata attraverso `<use href="#firma-baffo"/>`, scalata insieme alla lettera A. La forma è quindi identica e non viene reinventata. `firma-baffo.svg` ne rappresenta la vista isolata.

**Presentazione:** [identita-svg.html](../../identita-svg.html). **Tavola completa:** [TAVOLA-identita.svg](./TAVOLA-identita.svg).

Palette: bordeaux `#641E37`, profondo `#3E1728`, avorio `#F7F3EC`, champagne `#D8B481`.

Stato: **proposta**, non ancora un marchio definitivo approvato. I file non sostituiscono in automatico i loghi del prototipo esistente; servono a scegliere la costruzione corretta, per poi declinarla in copertine, sito e social.

## Revisione SVG v2 — 18 novembre 2026

La **A** è adesso una **V capovolta (Λ), senza traversa**, in ogni ricorrenza del nome, DA e DAB. Il **baffo è una S lunga**, con due cambi di concavità, tracciata una volta e riusata con lo stesso percorso SVG in ogni applicazione. Le altre lettere derivano da Playfair Display, trasformate in tracciati. L'edizione precedente resta disponibile nella cronologia Git.
