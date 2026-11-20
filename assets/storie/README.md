# Provini per copertine delle storie in evidenza

## Origine

I provini vengono esclusivamente dai **cinque video reali** caricati dall'utente in \`deborah_media/\`:

| ID | Highlight | Origine |
|---|---|---|
| E1 | Eventi | \`eventi 1.mp4\` |
| E2 | Eventi | \`eventi 2.mp4\` |
| E3 | Eventi | \`eventi 3.mp4\` |
| V1 | La mia voce | \`la mia voce 1.mp4\` |
| V2 | La mia voce | \`la mia voce 2.mp4\` |

La pagina **[\`provini-storie.html\`](../../provini-storie.html)** mostra otto fotogrammi per ciascun video, con codice \`E1-01\`, \`E2-08\`, \`V1-03\` ecc. L'utente può selezionarli e copiare la lista per decidere quali candidati inviare a ImageGen.

## Come si generano

- \`scripts/estrai_provini_storie.py\`: legge i cinque video con FFmpeg e prova tre timestamp attigui per ogni ottavo del filmato; privilegia esposizione e nitidezza. Pubblica un'immagine JPEG originale per candidato, cinque tavole di contatto e \`index.json\`.
- \`.github/workflows/provini-storie.yml\`: prova a eseguire automaticamente lo script dopo il commit del workflow, se Actions è abilitato e può scrivere su main.
- La pagina HTML ha un **fallback autonomo**: se gli asset pre-estratti non esistono, carica direttamente i video su GitHub Pages ed estrae otto fotogrammi equidistanti nel browser con HTML5 video e Canvas. Il fallback potrebbe richiedere qualche secondo su mobile.

## Stati del processo

1. **Provini**, non copertine approvate. Non cambiano immagini di profilo, post, Reel o highlight già pubblicati.
2. **Scelta dell'utente**: codici dei frame preferiti per ogni video.
3. **Ritocco ImageGen**: trattamento estetico fotografico coerente con il brand senza alterare l'identità dei soggetti.
4. **Approvazione finale**: solo dopo collegare i nuovi file alle copertine dei contenuti social.

Non trattare i provini come video nuovi o copertine definitive. Mantenere gli originali.
