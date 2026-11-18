# Presentazione personale a Deborah Anastasio

## A chi serve questa homepage

La prima pagina di https://czekuns.github.io/deborahanastasio/ è **la presentazione del proponente a Deborah**, in prima persona. Non è la futura homepage ufficiale di Deborah. Lo scopo è spiegare che cosa viene proposto, perché è utile e che cosa il proponente realizzerà.

### Messaggio da mantenere

> Il tuo nome ha già un valore. Voglio farlo vedere anche online.

La proposta valorizza il percorso artistico e la reputazione costruita sul campo. La presenza digitale deve comunicare autorevolezza, riconoscibilità e continuità, senza imitare la comunicazione delle nuove leve o reinventare la personalità dell'artista. Evitare dati biografici, numeri di pubblico e risultati commerciali non verificati.

### I quattro argomenti della presentazione

1. **La premessa.** Il percorso artistico esiste già; il progetto dà una forma riconoscibile alla presenza digitale.
2. **Il valore aggiunto.** Identità e famiglia di segni DA/DAB, selezione di fotografie/video autentici, lavorazioni grafiche e testuali, organizzazione dei canali, struttura web aggiornabile.
3. **Come si lavora.** L'artista fornisce materiali, repertorio, storia e approvazione; il proponente cura direzione digitale, impaginazione, montaggi/copertine e sviluppo. Eventuale gestione continuativa da concordare, non automaticamente inclusa.
4. **Una dimostrazione concreta.** La visita è una sequenza: **Presentazione → Instagram → TikTok → Sito ufficiale (tappa finale)**.

### Regole di navigazione

- `#visione` = presentazione del proponente.
- `#pitch-value` = parte centrale della presentazione, mantenendo attiva la vista `visione`.
- `#instagram` = simulazione Instagram, con layout immersivo su smartphone.
- `#tiktok` = simulazione TikTok, atterraggio Home.
- `#sito` = prototipo di sito ufficiale; arriva **per ultimo** nella narrazione.

La homepage vive nel primo `<section data-view="visione">` di `index.html`; i suoi stili dedicati sono in `assets/presentation.css`. Non modificare l'identità approvata DAB o il comportamento audio/video delle due simulazioni mentre si lavora al pitch.

### Stato del progetto e onestà della demo

La pagina iniziale è una proposta. Profili Instagram/TikTok e sito sono **simulazioni**, non gli account reali. Le copertine, i testi e la struttura possono essere approvati e sostituiti progressivamente; i video effettivamente presenti sono collegati dal manifesto `assets/videos.json` e dal sistema `assets/video-integration.js`. Le nuove copertine devono essere collegate tramite `assets/video-covers.json`, senza cambiare i file video.

Non presentare eventuali funzionalità simulate (commenti, follower, richieste, messaggi) come interazioni realmente pubblicate o spedite.