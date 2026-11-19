# Presentazione personale a Deborah Anastasio

## A chi serve questa homepage

La prima pagina di https://czekuns.github.io/deborahanastasio/ è **la presentazione del proponente a Deborah**, in prima persona. Non è la futura homepage ufficiale di Deborah. Lo scopo è spiegare che cosa viene proposto, perché è utile e che cosa il proponente realizzerà.

### Messaggio da mantenere

> Che cosa ti manca? Di sicuro non un'identità. Voglio che la comunicazione restituisca la stessa forza che hai dal vivo.

La proposta valorizza il percorso artistico e la reputazione costruita sul campo. La presenza digitale deve comunicare autorevolezza, riconoscibilità e continuità, senza imitare la comunicazione delle nuove leve o reinventare la personalità dell'artista. Evitare dati biografici, numeri di pubblico e risultati commerciali non verificati.

### I quattro argomenti della presentazione

1. **La lettera personale.** Simone racconta le diverse ore di osservazione delle performance e spiega che Deborah possiede già una forte identità: l'obiettivo è farla emergere online, senza ispirarsi o imitare le pagine di altri artisti.
2. **Il significato dei segni.** La buona stella scelta come portafortuna, il ricciolo della A ispirato al segno astrologico del Leone e il nome «la DAB» per l'identità della band.
3. **Il lavoro pratico.** Fotografie e video spesso compressi; preferenza per i file originali e invio come documenti, anche con WhatsApp. Le copertine sono state migliorate solo per necessità: niente ritocchi gratuiti.
4. **L'intenzione e le demo.** Il progetto è una proposta personale e aperta ai commenti di Deborah, con percorso: **Presentazione → Instagram → TikTok → Sito ufficiale (tappa finale)**. Le caption dei post e dei video sono scritte dal proponente Simone come interpretazioni del tone of voice di Deborah, non come citazioni o testi effettivamente scritti dall'artista: vanno riviste e approvate insieme. La prima pagina lo dichiara, TikTok lo esplicita nella nota laterale desktop e nel pannello Informazioni della simulazione mobile.

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