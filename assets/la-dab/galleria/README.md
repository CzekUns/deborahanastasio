# La DAB — galleria fotografica

Questa cartella contiene **quattro immagini WebP distinte** ricavate dalle elaborazioni grafiche approvate per la galleria della Deborah Anastasio Band. Non sono quattro ritagli della stessa immagine mostrati al volo: ciascuna fotografia è un file autonomo pubblicato sul branch `main`.

| Ordine | Asset | Titolo nel sito e nella storia |
| --- | --- | --- |
| 01 | `dab-01-serata-bianco.webp` | Serata in bianco |
| 02 | `dab-02-gruppo-nero.webp` | Insieme, fuori dal palco |
| 03 | `dab-03-sul-mare.webp` | Una serata sul mare |
| 04 | `dab-04-dietro-il-palco.webp` | Il nostro backstage |

## Dove sono utilizzate

1. **Sito:** `index.html`, sezione `#site-dab` → galleria `#site-dab-gallery`; pulsanti `data-dab-photo` aprono l'anteprima, controllata da `assets/app.js`.
2. **Instagram dimostrativo:** l'highlight **La DAB** (indice `2` dell'array `stories`) presenta le quattro foto come **quattro storie indipendenti**, con barre di avanzamento e navigazione precedente/successiva. Il comportamento responsive è in `assets/immersive.js`.
3. **Dati:** l'array `dabGallery` in `assets/app.js` fornisce i percorsi univoci alle due esperienze. Per sostituire una foto, aggiornare il relativo file oppure il percorso nel modello.
4. **Stili:** `assets/dab-gallery.css`, separati dal CSS del resto del progetto.

**Nota di fedeltà:** gli asset provengono da ritocchi generativi ImageGen delle fotografie inviate. Sono immagini dimostrative e possono contenere ricostruzioni di dettagli o volti; verificare somiglianza e gradimento dei membri prima di usare le elaborazioni nella comunicazione pubblica.

L'integrazione non modifica i video, le loro copertine o gli SVG approvati.
