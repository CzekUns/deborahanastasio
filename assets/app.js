
(function(){
  "use strict";
  var validRoutes=["visione","instagram","tiktok","sito"];
  var instagramUrl="https://www.instagram.com/deborah.anastasio/";
  var tiktokUrl="https://www.tiktok.com/@debora.anastasio";
  var media={
    wedding:"https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
    concert:"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
    table:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=85",
    microphone:"https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=85",
    event:"https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85",
    rings:"https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85"
  };
  var uploaded={
    pink:"./assets/deborah-cover-rosa-4x5.webp",
    gallery:"./assets/deborah-sanvalentino-editorial-4x5.webp",
    blueArchive:"./assets/deborah-gallery-san-valentino-4x5.webp"
  };
  var posts=[
    {title:"Un momento che resta",type:"Wedding Diary",img:media.wedding,caption:"Ci sono momenti in cui una canzone riesce a dire tutto. ✨\n\nQual è il brano che portereste per sempre con voi? #weddingmusic #musicalive #napoli",idea:"Reel di un momento significativo, con ingresso musicale entro i primi due secondi."},
    {title:"La voce è un ricordo",type:"Post manifesto",caption:"La musica si ascolta. E a volte continua a farsi sentire molto dopo l'ultima nota. ♡\n\n#deborahanastasio #voce #musica",idea:"Post grafico riconoscibile per fissare il tono emozionale del profilo."},
    {title:"Live / 01",type:"Live Sessions",img:media.concert,caption:"Un frammento di una serata, tutto da ascoltare. 🎙️\n\n#livemusic #liveperformance",idea:"Estratto di una performance autentica, con audio originale autorizzato."},
    {title:"Tre note. Un'emozione.",type:"Il repertorio",caption:"Ogni canzone custodisce una storia. Quale vorresti ascoltare in un momento importante?\n\n#repertorio #musica",idea:"Rubrica che valorizza il repertorio reale, da concordare con l'artista."},
    {title:"Cerimonie",type:"Wedding Diary",img:media.table,caption:"Ogni dettaglio costruisce un'atmosfera. Anche la scelta della musica. ✨\n\n#cerimonie #musicaemozioni",idea:"Carousel con racconto fotografico di una cerimonia reale e crediti ai professionisti coinvolti."},
    {title:"Dietro ogni canzone",type:"Backstage",caption:"Prima dell'esibizione ci sono prove, idee e piccoli rituali. Ti porto dietro le quinte. 🎼\n\n#backstage #cantante",idea:"Video spontaneo dei preparativi, mantenendo la qualità audio minima necessaria."},
    {title:"La mia voce",type:"Presentazione",img:media.microphone,caption:"Una voce, tante storie da incontrare. Qui iniziamo a conoscerci. ♡\n\n#deborahanastasio",idea:"Un saluto, una canzone e un modo per conoscerci meglio."},
    {title:"Musica da vivere",type:"Live Sessions",caption:"La differenza tra sentire una canzone e viverla insieme.\n\n#live #musicaitaliana",idea:"Clip verticale breve con una frase di apertura che incuriosisca."},
    {title:"Eventi",type:"Atmosfere",img:media.event,caption:"Ogni evento ha il suo ritmo. L'idea è trovare quello che parla davvero delle persone. ✦\n\n#eventi #livemusic",idea:"Post portfolio con video o foto reali, se disponibili e autorizzati."},
    {title:"Le parole che cantiamo",type:"Storie di musica",caption:"Ci sono parole che, cantate, assumono un significato nuovo.\n\n#musicastories #voce",idea:"Micro-rubrica dedicata al rapporto con la musica, senza riprodurre testi protetti non autorizzati."},
    {title:"Wedding Diary",type:"Cerimonie",img:media.rings,caption:"Quando tutto si ferma per un istante e resta soltanto l'emozione.\n\n#weddingdiary #cerimonia",idea:"Racconto verticale di un evento, con riprese rispettose della privacy degli invitati."},
    {title:"Ci vediamo dal vivo",type:"Contatti",caption:"Hai una data speciale in mente? Raccontamela con un messaggio privato. ♡\n\n#contatti #musicalive",idea:"Post fissato con indicazioni semplici per richiedere disponibilità."}
  ];
  // Provvisoriamente i due contenuti autentici vengono ripetuti nelle due demo.
  // Non usare contenuti fittizi o scatti stock come se fossero di Deborah.
  var assetPair=[
    {img:uploaded.pink,title:"Deborah Anastasio",caption:"Ciao ragazzi! Un saluto grande da me. Ci vediamo presto con tanta musica! ❤️",idea:"Una foto e un saluto grande a chi passa di qui. ❤️"},
    {img:uploaded.gallery,title:"San Valentino · Villa Gauro",caption:"Un ricordo di San Valentino a Villa Gauro. Che bello rivivere queste serate! ❤️🎶",idea:"Un ricordo di San Valentino a Villa Gauro, tra musica e belle emozioni."}
  ];
  posts.forEach(function(p,i){
    var item=assetPair[i%2];
    p.img=item.img;p.title=item.title;p.caption=item.caption;p.idea=item.idea;
  });
  // Archival San Valentino poster: a real editorial still, never attach an unrelated video.
  posts[1].editorialStatic=true;
  posts[1].videoSrc=null;
  var grid=document.getElementById("ig-grid");
  if(grid)grid.querySelectorAll("[data-post]").forEach(function(el,i){
    var m=assetPair[i%2];
    el.className="ig-tile image-tile";
    el.innerHTML='<img src="'+m.img+'" alt="'+m.title+'" loading="lazy"><span class="tile-tag">'+(i%2?"ARCHIVIO / LIVE":"DEBORAH ANASTASIO")+'</span>';
  });
  // Spazi editoriali DAB: grafica tipografica, senza attribuire foto non verificate alla band.
  [2,8].forEach(function(i){
    var p=posts[i];
    p.title=i===2?"DAB · Deborah Anastasio Band":"DAB · Sul palco";
    p.type="DAB / La band";p.img="./assets/brand/stella/DAB-chiaro.svg?v=identita-stella-20261119";p.brandAsset="DAB";
    p.caption=i===2?"Con la DAB al completo l'energia è un'altra cosa! 🎶❤️ #DeborahAnastasioBand #MusicaDalVivo":"Le prove, le risate e poi tutti sul palco. Con la DAB ci divertiamo davvero! ❤️ #DAB #LiveMusic";
    p.idea="La DAB: i musicisti, le prove, le serate e la voglia di stare insieme sul palco.";
    var el=grid&&grid.querySelector('[data-post="'+i+'"]');
    if(el){el.className="ig-tile typographic-tile dab-tile";el.innerHTML='<img class="dab-tile-logo" src="./assets/brand/stella/DAB-chiaro.svg?v=identita-stella-20261119" alt="DAB · Deborah Anastasio Band" loading="lazy">';}
  });
  // Original San Valentino / Villa Gauro flyer: distinct from the burgundy redesign.
  var blueArchivePost=posts[3];
  blueArchivePost.title="San Valentino · Dinner Show · Villa Gauro";
  blueArchivePost.type="Archivio / Locandina";
  blueArchivePost.img=uploaded.blueArchive;
  blueArchivePost.caption="Un ricordo di una serata di San Valentino a Villa Gauro. Bacio grande! ❤️ #DeborahAnastasio #Live";
  blueArchivePost.idea="Locandina originale con Deborah in abito nero su sfondo blu. Contenuto d’archivio, non una nuova data.";
  blueArchivePost.editorialStatic=true;
  blueArchivePost.videoSrc=null;
  var blueArchiveTile=grid&&grid.querySelector('[data-post="3"]');
  if(blueArchiveTile){
    blueArchiveTile.className="ig-tile image-tile archival-photo-tile";
    blueArchiveTile.innerHTML='<img src="'+uploaded.blueArchive+'" alt="Deborah in abito nero su sfondo blu, San Valentino Dinner Show Villa Gauro" loading="lazy"><span class="tile-tag">ARCHIVIO</span>';
  }
  var stories=[
    {title:"La mia voce",detail:"Ciao ragazzi, sono Deborah! Qui vi porto con me, tra canzoni, emozioni e serate bellissime. ❤️"},
    {title:"Cerimonie",detail:"Ogni festa ha la sua emozione. Che bello accompagnarvi con la musica nei vostri momenti speciali!"},
    {title:"La DAB",detail:"Eccoci con la DAB! Tra musica dal vivo, prove e qualche risata, vi facciamo compagnia anche qui."},
    {title:"Backstage",detail:"Un po' di tremarella c'è sempre! Vi mostro le prove, i preparativi e quello che combiniamo prima di salire sul palco."},
    {title:"Contatti",detail:"Avete qualcosa di bello da festeggiare? Scrivetemi e raccontatemi tutto. Bacio grande! ❤️"}
  ];
  var videos=[
    {title:"Il momento",headline:"Quando la musica<br>rende eterno<br>un istante.",caption:"Il momento in cui la musica cambia l'atmosfera. ✨ #musicalive #cerimonie",photo:media.wedding,method:"Partire dal momento più forte della cerimonia, senza introduzione. Inserire una ripresa autorizzata di Deborah e l'audio originale."},
    {title:"La prova voce",headline:"Solo una voce.<br>E tutto<br>si ferma.",caption:"A volte bastano pochi secondi di musica dal vivo. 🎙️ #voce #cantante",photo:media.microphone,method:"Aprire subito sulla performance. Ripresa ravvicinata, audio pulito, sottotitoli essenziali e volto dell'artista."},
    {title:"Dietro le quinte",headline:"Cinque minuti<br>prima di<br>cantare...",caption:"Quello che succede prima dell'ultima nota. ✦ #backstage #musiclife",photo:media.concert,method:"Un piccolo racconto personale in tre scene: preparativi, attesa, primo istante sul palco."},
    {title:"Una canzone, una storia",headline:"Perché proprio<br>questa<br>canzone?",caption:"Ogni brano ha una storia. Qual è la tua? #repertorio #storiadimusica",photo:media.table,method:"Deborah racconta perché sceglie un determinato brano, poi ne esegue un breve frammento autorizzato."},
    {title:"Il prima e il dopo",headline:"Da una sala<br>in silenzio<br>alla musica.",caption:"Il prima, l'attesa, la prima nota. ♡ #eventi #livemusic",photo:media.event,method:"Montaggio a contrasto: preparazione, pubblico, inizio esibizione. Finale con una call to action discreta."}
  ];
  videos.forEach(function(v,i){
    var item=assetPair[i%2];
    v.title=item.title;v.photo=item.img;v.caption=item.caption;
    v.headline=i%2?"San Valentino<br>Dinner Show<br>Villa Gauro":"Deborah<br>Anastasio";
    v.method="Anteprima statica del materiale fotografico originale. Quando saranno forniti i video autorizzati, sostituire la foto con il filmato corrispondente.";
  });
  // Storyboard n.3 dedicato a DAB; la foto ripetuta è soltanto un segnaposto.
  videos[2].title="La DAB";
  videos[2].headline="DAB<br>La band.";
  videos[2].caption="La DAB, i musicisti e tutta la nostra voglia di cantare insieme. 🎶❤️ #DeborahAnastasioBand";
  videos[2].method="Sostituire la fotografia segnaposto con video autentici della DAB. Aprire sulla performance, dare spazio ai musicisti e usare audio live autorizzato.";
  var modal=document.getElementById("dialog-backdrop");
  var modalContent=document.getElementById("dialog-content");
  var closeBtn=document.getElementById("dialog-close");
  var lastFocus=null;
  function currentRoute(){
    var hash=decodeURIComponent(location.hash.replace(/^#/,"")).toLowerCase();
    if(hash.indexOf("site-")===0) return "sito";
    if(hash.indexOf("pitch-")===0) return "visione";
    return validRoutes.indexOf(hash)>-1?hash:"visione";
  }
  function route(){
    if(window.DeborahMedia)window.DeborahMedia.stopAll();
    var selected=currentRoute();
    document.querySelectorAll("[data-view]").forEach(function(el){el.hidden=el.dataset.view!==selected;});
    document.querySelectorAll("[data-route]").forEach(function(el){
      var active=el.dataset.route===selected;
      el.classList.toggle("active",active);
      if(active) el.setAttribute("aria-current","page");else el.removeAttribute("aria-current");
    });
    document.title="Deborah Anastasio — "+(selected==="visione"?"La proposta / Presentazione":selected==="sito"?"Sito ufficiale / Concept":selected[0].toUpperCase()+selected.slice(1)+" / Concept");
    if(location.hash.indexOf("#site-")===0 || location.hash.indexOf("#pitch-")===0){
      window.requestAnimationFrame(function(){var target=document.getElementById(location.hash.slice(1));if(target)target.scrollIntoView({behavior:"smooth"});});
    }else window.scrollTo({top:0,behavior:"auto"});
    closeModal();
  }
  function escapeText(value){return String(value).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
  function paragraphs(s){return escapeText(s).replace(/\n/g,"<br>");}
  function openModal(html){
    if(window.DeborahMedia)window.DeborahMedia.stopAll();
    lastFocus=document.activeElement;
    modalContent.innerHTML=html;
    modal.hidden=false;
    document.body.style.overflow="hidden";
    closeBtn.focus();
  }
  function closeModal(){
    if(modal.hidden)return;
    if(window.DeborahMedia)window.DeborahMedia.pauseContainer(modal);
    modal.hidden=true;
    document.body.style.overflow="";
    if(lastFocus && typeof lastFocus.focus==="function")lastFocus.focus();
  }
  function titleDialog(kicker,title,description){
    return '<span class="dialog-kicker">'+escapeText(kicker)+'</span><h2 id="dialog-title">'+escapeText(title)+'</h2><p>'+escapeText(description)+'</p>';
  }
  function openPost(i){
    var post=posts[i];if(!post)return;
    var html='<span class="dialog-kicker">INSTAGRAM / POST '+String(i+1).padStart(2,"0")+'</span>';
    if(post.videoSrc)html+='<video class="dialog-video" src="'+post.videoSrc+'" poster="'+post.img+'" autoplay muted playsinline controls preload="auto" aria-label="Video di Deborah Anastasio"></video>';
    else if(post.img)html+='<img class="dialog-photo" src="'+post.img+'" alt="Foto di anteprima del post">';
    html+='<h2 id="dialog-title">'+escapeText(post.title)+'</h2><p>'+escapeText(post.idea)+'</p>';
    html+='<div class="dialog-sample"><b>LA DIDASCALIA</b><p>'+paragraphs(post.caption)+'</p></div>';
    html+='<p class="dialog-small">Anteprima editoriale: i contenuti non sono pubblicati sui social.</p>';
    openModal(html);
    // Opening a post is an intentional click: start playback immediately
    // with the user's previously chosen audio preference (or sound if allowed).
    var openedVideo=modalContent.querySelector("video.dialog-video");
    if(openedVideo){
      if(window.DeborahMedia)window.DeborahMedia.play(openedVideo,true);
      else openedVideo.play().catch(function(){ openedVideo.muted=true; openedVideo.play().catch(function(){}); });
    }
  }
  function openStory(i){
    var story=stories[i];if(!story)return;
    openModal(titleDialog("INSTAGRAM / STORIA IN EVIDENZA",story.title,story.detail)+'<div class="dialog-sample"><b>LA MIA STORIA</b><p>Un piccolo spazio per condividere con voi musica, ricordi e momenti dietro le quinte.</p></div>');
  }
  function openContact(){
    openModal(titleDialog("SITO / PERCORSO CONTATTI","Scrivimi, mi farà piacere!","Mi fa piacere conoscere le vostre idee. Questo spazio è una dimostrazione: qui non si inviano messaggi reali.")+
      '<div class="dialog-action-row"><a href="'+instagramUrl+'" target="_blank" rel="noopener noreferrer">Instagram reale ↗</a><a href="'+tiktokUrl+'" target="_blank" rel="noopener noreferrer">TikTok reale ↗</a></div>'+
      '<p class="dialog-small">Per contattarmi davvero potete usare i miei profili social. Questa pagina è ancora una dimostrazione.</p>');
  }
  function shareDemo(){
    var url=location.href;
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(url).then(function(){
        openModal(titleDialog("LINK ALLA DEMO","Link copiato","Il collegamento alla vista attuale è stato copiato. Puoi condividerlo quando la demo sarà pubblicata."));
      }).catch(function(){openModal(titleDialog("LINK ALLA DEMO","Condividi la proposta",url));});
    }else openModal(titleDialog("LINK ALLA DEMO","Condividi la proposta",url));
  }
  document.addEventListener("click",function(ev){
    var post=ev.target.closest("[data-post]");
    if(post){openPost(Number(post.dataset.post));return;}
    var story=ev.target.closest("[data-story]");
    if(story){openStory(Number(story.dataset.story));return;}
    var action=ev.target.closest("[data-action]");
    if(action){
      var a=action.dataset.action;
      if(a==="contact")openContact();
      if(a==="share")shareDemo();
      if(a==="profile-info")openModal(titleDialog("INSTAGRAM / DETTAGLI","Un'anteprima del profilo","Il layout è ispirato alle logiche di Instagram, ma post, numeri e bio non riflettono dati estratti dal profilo reale. È un prototipo autonomo, non collegato a Meta."));
      if(a==="tiktok-info")openModal(titleDialog("TIKTOK / PRODUZIONE",videos[videoIndex].title,videos[videoIndex].method));
    }
    var video=ev.target.closest("[data-video]");
    if(video)setVideo(Number(video.dataset.video));
  });
  closeBtn.addEventListener("click",closeModal);
  modal.addEventListener("click",function(ev){if(ev.target===modal)closeModal();});
  window.addEventListener("keydown",function(ev){
    if(ev.key==="Escape")closeModal();
    if(!modal.hidden || ev.defaultPrevented || !canStepVideo())return;
    if(ev.key==="ArrowDown"||ev.key==="ArrowUp"){
      ev.preventDefault();
      setVideo(videoIndex+(ev.key==="ArrowDown"?1:-1));
    }
  });
  var videoIndex=0;
  var videoPlayer=document.getElementById("tiktok-player");
  var videoImage=document.getElementById("video-image");
  var videoHeadline=document.getElementById("video-headline");
  var videoCaption=document.getElementById("video-caption");
  var videoPlay=document.getElementById("video-play");
  var videoLike=document.getElementById("video-like");
  var likes={};
  function canStepVideo(){
    return currentRoute()==="tiktok" &&
      !videoPlayer.classList.contains("tt-native-open") &&
      !document.body.classList.contains("native-overlay-visible");
  }
  function setVideo(n){
    if(window.DeborahMedia)window.DeborahMedia.stopAll();
    videoIndex=(n+videos.length)%videos.length;
    var v=videos[videoIndex];
    videoImage.src=v.photo;
    videoImage.alt=v.photoPost?"Locandina San Valentino Dinner Show Villa Gauro, foto d’archivio":"Copertina del contenuto di Deborah Anastasio";
    videoPlayer.classList.toggle("has-photo-post",!!v.photoPost);
    videoPlay.hidden=!!v.photoPost;
    videoHeadline.innerHTML=v.headline||"";
    videoHeadline.style.animation="none";
    void videoHeadline.offsetHeight;
    videoHeadline.style.animation="";
    videoCaption.textContent=v.caption;
    document.getElementById("video-count").textContent=String(videoIndex+1).padStart(2,"0")+" / "+String(videos.length).padStart(2,"0");
    document.querySelectorAll("[data-video]").forEach(function(el){el.classList.toggle("active",Number(el.dataset.video)===videoIndex);});
    videoLike.classList.toggle("liked",!!likes[videoIndex]);
    videoLike.setAttribute("aria-pressed",String(!!likes[videoIndex]));
    videoLike.querySelector("span").textContent=likes[videoIndex]?"♥":"♡";
    videoPlayer.classList.add("playing");
    videoPlayer.classList.remove("paused");
    videoPlay.textContent="Ⅱ";
    window.dispatchEvent(new CustomEvent("deborah:videochange",{detail:{index:videoIndex}}));
  }
  document.getElementById("video-prev").addEventListener("click",function(){setVideo(videoIndex-1);});
  document.getElementById("video-next").addEventListener("click",function(){setVideo(videoIndex+1);});
  videoLike.addEventListener("click",function(){likes[videoIndex]=!likes[videoIndex];videoLike.classList.toggle("liked",likes[videoIndex]);videoLike.setAttribute("aria-pressed",String(likes[videoIndex]));videoLike.querySelector("span").textContent=likes[videoIndex]?"♥":"♡";});
  videoPlay.addEventListener("click",function(){
    var playing=videoPlayer.classList.toggle("playing");
    videoPlayer.classList.toggle("paused",!playing);
    videoPlay.textContent=playing?"Ⅱ":"▶";
    videoPlay.setAttribute("aria-label",playing?"Ferma l’animazione":"Avvia l’animazione");
  });
  var touchStart=null;
  videoPlayer.addEventListener("touchstart",function(e){
    touchStart=canStepVideo()&&e.touches.length===1&&!e.target.closest("button,a")
      ? {x:e.touches[0].clientX,y:e.touches[0].clientY} : null;
  },{passive:true});
  videoPlayer.addEventListener("touchend",function(e){
    var start=touchStart;
    touchStart=null;
    if(!start||!canStepVideo()||!e.changedTouches.length)return;
    var point=e.changedTouches[0];
    var delta=point.clientY-start.y;
    if(Math.abs(delta)>55 && Math.abs(delta)>Math.abs(point.clientX-start.x)*1.3){
      setVideo(videoIndex+(delta<0?1:-1));
    }
  },{passive:true});
  videoPlayer.addEventListener("touchcancel",function(){touchStart=null;},{passive:true});
  var lastWheel=0;
  videoPlayer.addEventListener("wheel",function(e){
    if(!canStepVideo()||e.ctrlKey||Math.abs(e.deltaY)<=Math.abs(e.deltaX))return;
    e.preventDefault();
    var now=performance.now();
    if(now-lastWheel<480||!e.deltaY)return;
    lastWheel=now;
    setVideo(videoIndex+(e.deltaY>0?1:-1));
  },{passive:false});
  window.DeborahDemo={posts:posts,stories:stories,videos:videos,setVideo:setVideo,getVideoIndex:function(){return videoIndex;}};
  window.addEventListener("hashchange",route);
  route();
  setVideo(0);
})();