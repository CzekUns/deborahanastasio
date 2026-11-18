# Deborah Anastasio · studio SVG 02

Questa cartella conserva le bozze vettoriali del logotipo esteso, di **DA** e di **DAB (Deborah Anastasio Band)**.

**Fonte tipografica:** Playfair Display Regular, lettere trasformate in tracciati (nessun font viene distribuito). Il baffo champagne è un *path* SVG separato, sovrapposto alla **A**. Le tre applicazioni condividono esattamente la seguente geometria:

```svg
<path id="firma-baffo" d="M -530 175 C -440 105 -360 114 -263 236 C -65 494 151 705 448 705 C 737 705 995 597 1250 561 C 1464 531 1617 536 1680 620" fill="none" stroke="#D8B481" stroke-linecap="round" stroke-width="24"/>
```

Nei singoli file la stessa curva viene richiamata attraverso `<use href="#firma-baffo"/>`, scalata insieme alla lettera A. La forma è quindi identica e non viene reinventata. `firma-baffo.svg` ne rappresenta la vista isolata.

**Presentazione:** [identita-svg.html](../../identita-svg.html). **Tavola completa:** [TAVOLA-identita.svg](./TAVOLA-identita.svg).

Palette: bordeaux `#641E37`, profondo `#3E1728`, avorio `#F7F3EC`, champagne `#D8B481`.

Stato: **proposta**, non ancora un marchio definitivo approvato. I file non sostituiscono in automatico i loghi del prototipo esistente; servono a scegliere la costruzione corretta, per poi declinarla in copertine, sito e social.
