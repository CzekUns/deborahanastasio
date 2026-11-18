/* Deborah Anastasio — mobile-first social experience */
(function(){
  "use strict";
  var demo=window.DeborahDemo;
  if(!demo){console.warn("Mobile social demo: missing base model");return;}
  var media=window.matchMedia("(max-width:800px)");
  var ig=document.querySelector(".ig-phone");
  var igNav=document.querySelector(".ig-bottom");
  var tt=document.getElementById("tiktok-player");
  var ttNav=document.querySelector(".tiktok-bottom");
  var igScreen=document.createElement("section");
  var ttPanel=document.createElement("section");
  var overlay=document.createElement("section");
  var currentIg="profile";
  var currentTt="home";
  var overlayType="";
  var selectedStory=0;
  var selectedReel=0;
  var igLikes={};
  var demoComments={};
  var tooltips={};
  var prevTop=0;
  var closeFocus=null;
  var videos=demo.videos;
  var posts=demo.posts;
  var stories=demo.stories;
  var allStoryImages=[
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=850&q=85",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=850&q=85",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=850&q=85",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=850&q=85",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=850&q=85"
  ];
  function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
  function plain(v){return esc(v).replace(/\n/g,"<br>");}
  function logo(){return '<span class="native-da-avatar">da.</span>';}
  function symbol(name){
    var p={
      home:'<path d="m3 10 9-7 9 7v10h-6v-7H9v7H3z"/>',
      search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
      plus:'<path d="M12 4v16M4 12h16"/>',
      heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 1 0-7.8 7.8l8.6 8.4a1.4 1.4 0 0 0 2 0l8.6-8.4a5.5 5.5 0 0 0-.6-7.8z"/>',
      comment:'<path d="M20 11a8 8 0 0 1-8 8c-1.3 0-2.7-.3-3.8-.9L4 20l1.2-4A8 8 0 1 1 20 11z"/>',
      send:'<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
      reels:'<rect x="3" y="4" width="18" height="17" rx="3"/><path d="M3 10h18M8 4l4 6M15 4l4 6M10 13l5 3-5 3z"/>',
      bookmark:'<path d="M6 3h12v18l-6-4-6 4z"/>',
      grid:'<rect x="2.5" y="2.5" width="19" height="19" rx="2"/><path d="M9 3v19M15 3v19M3 9h18M3 15h18"/>',
      inbox:'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="m4 6 8 7 8-7"/>',
      x:'<path d="M5 5 19 19M19 5 5 19"/>',
      back:'<path d="m15 4-8 8 8 8"/>',
      more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
      music:'<path d="M9 18V5l12-2v13M9 9l12-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="18" cy="16" rx="3" ry="2"/>'
    };
    return '<svg class="native-icon" viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">'+(p[name]||p.more)+'</svg>';
  }
  function socialMode(){
    var hash=window.location.hash.replace("#","");
    var view=hash==="instagram"?"instagram":hash==="tiktok"?"tiktok":"other";
    document.body.classList.toggle("social-instagram",media.matches&&view==="instagram");
    document.body.classList.toggle("social-tiktok",media.matches&&view==="tiktok");
    document.body.classList.toggle("social-fullscreen",media.matches&&(view==="instagram"||view==="tiktok"));
    document.querySelector('meta[name="theme-color"]').setAttribute("content",view==="tiktok"&&media.matches?"#080808":view==="instagram"&&media.matches?"#ffffff":"#26191e");
    closeOverlay();
    if(view==="instagram"){setIgScreen("profile");}
    if(view==="tiktok"){setTtScreen("home");}
  }
  var igHeaderBack=document.querySelector(".ig-top .ui-icon:first-child");
  if(igHeaderBack){igHeaderBack.outerHTML='<a class="ig-demo-back" href="#visione" aria-label="Torna alla presentazione">'+symbol("back")+'</a>';}
  var igHeaderMenu=document.querySelector(".ig-top .ui-icon:last-child");
  if(igHeaderMenu){igHeaderMenu.outerHTML='<button class="ig-demo-menu" type="button" data-action="profile-info" aria-label="Informazioni e ritorno alla presentazione">☰</button>';}
  var igHeaderName=document.querySelector(".ig-top strong");
  igScreen.id="ig-native-screen";
  igScreen.className="ig-native-screen";
  igScreen.hidden=true;
  igScreen.setAttribute("aria-live","polite");
  ig.insertBefore(igScreen,igNav);
  igNav.setAttribute("aria-label","Navigazione Instagram dimostrativa");
  igNav.innerHTML=[
    '<button type="button" data-ig-screen="home" aria-label="Home">'+symbol("home")+'</button>',
    '<button type="button" data-ig-screen="search" aria-label="Esplora">'+symbol("search")+'</button>',
    '<button type="button" data-ig-screen="create" aria-label="Crea">'+symbol("plus")+'</button>',
    '<button type="button" data-ig-screen="reels" aria-label="Reels">'+symbol("reels")+'</button>',
    '<button type="button" data-ig-screen="profile" aria-label="Profilo" class="active">'+logo()+'</button>'
  ].join("");
  function syncIgNav(){
    igNav.querySelectorAll("[data-ig-screen]").forEach(function(b){
      var active=b.dataset.igScreen===currentIg;
      b.classList.toggle("active",active);
      b.setAttribute("aria-current",active?"page":"false");
    });
    if(igHeaderName)igHeaderName.innerHTML=currentIg==="profile"?"deborah.anastasio <span class='ig-chevron'>⌄</span>":({"home":"Instagram","search":"Esplora","create":"Crea","reels":"Reels"})[currentIg];
  }
  function instaCard(p,i){
    var visual=p.img?'<img src="'+esc(p.img)+'" loading="lazy" alt="Foto dimostrativa per '+esc(p.title)+'">':'<div class="native-poster"><span>'+esc(p.title)+'</span><small>DEBORAH ANASTASIO</small></div>';
    return '<article class="native-feed-card"><div class="native-feed-author">'+logo()+'<b>deborah.anastasio</b><span>· Concept</span><button type="button" data-native-action="help" aria-label="Note sulla demo">'+symbol("more")+'</button></div><button class="native-feed-visual" type="button" data-native-post="'+i+'" aria-label="Apri il post '+esc(p.title)+'">'+visual+'</button><div class="native-feed-actions"><button type="button" data-native-like="'+i+'" aria-label="Mi piace">'+symbol("heart")+'</button><button type="button" data-native-post="'+i+'" aria-label="Apri commenti">'+symbol("comment")+'</button><button type="button" data-native-action="share" aria-label="Condividi il concept">'+symbol("send")+'</button><span class="feed-spacer"></span><button type="button" data-native-save="'+i+'" aria-label="Salva idea">'+symbol("bookmark")+'</button></div><p class="native-feed-caption"><b>deborah.anastasio</b> '+plain(p.caption)+'</p><button class="native-view-comments" type="button" data-native-post="'+i+'">Visualizza il post e i dettagli</button></article>';
  }
  function setIgScreen(screen){
    if(["profile","home","search","create","reels"].indexOf(screen)<0)screen="profile";
    currentIg=screen;
    ig.dataset.screen=screen;
    igScreen.hidden=screen==="profile";
    syncIgNav();
    if(screen==="profile"){igScreen.innerHTML="";return;}
    if(screen==="home"){
      igScreen.innerHTML='<div class="ig-home-top"><span class="ig-native-brand">Instagram</span><span>Progetto creativo</span></div><div class="ig-home-stories"><button type="button" data-native-story="0">'+logo()+'<small>La tua storia</small></button>'+stories.slice(1,4).map(function(s,i){return '<button type="button" data-native-story="'+(i+1)+'"><span class="home-story-ring">✦</span><small>'+esc(s.title)+'</small></button>';}).join("")+'</div>'+posts.slice(0,7).map(instaCard).join("");
    }else if(screen==="search"){
      igScreen.innerHTML='<div class="native-search-wrap"><label for="ig-native-search">'+symbol("search")+'<span class="sr-only">Cerca argomenti nel concept</span></label><input id="ig-native-search" type="search" placeholder="Cerca nel concept" autocomplete="off"></div><div class="native-search-chips"><span>Musica</span><span>Cerimonie</span><span>Live</span><span>Backstage</span></div><div id="native-explore-grid" class="native-explore-grid">'+posts.map(function(p,i){return '<button type="button" data-native-post="'+i+'">'+(p.img?'<img src="'+esc(p.img)+'" alt="'+esc(p.title)+'" loading="lazy">':'<span>'+esc(p.title)+'</span>')+'</button>';}).join("")+'</div>';
    }else if(screen==="create"){
      igScreen.innerHTML='<div class="native-empty"><div class="native-empty-icon">'+symbol("plus")+'</div><h2>Crea un contenuto</h2><p>Anteprima del futuro piano editoriale: post, storie e reel coordinati. Questa simulazione non pubblica nulla sui social reali.</p><button type="button" data-ig-screen="profile">Torna al profilo</button></div>';
    }else if(screen==="reels"){
      renderIgReel();
    }
    window.scrollTo({top:0,behavior:"auto"});
  }
  function renderIgReel(){
    var v=videos[selectedReel];
    igScreen.innerHTML='<div class="ig-reels-stage"><img src="'+esc(v.photo)+'" alt="Immagine segnaposto dello storyboard" class="ig-reel-photo"><div class="ig-reels-gradient"></div><span class="ig-reel-top">Reels <small>STORYBOARD</small></span><p class="ig-reel-headline">'+v.headline+'</p><div class="ig-reel-actions"><button type="button" data-native-reel-like aria-label="Metti mi piace">'+symbol("heart")+'</button><button type="button" data-native-action="share" aria-label="Condividi">'+symbol("send")+'</button></div><div class="ig-reel-bottom">'+logo()+'<b>deborah.anastasio</b><p>'+esc(v.caption)+'</p><small>Animazione dimostrativa · nessun video reale</small></div><div class="ig-reel-switch"><button type="button" data-native-reel-step="-1" aria-label="Reel precedente">↑</button><button type="button" data-native-reel-step="1" aria-label="Reel successivo">↓</button></div></div>';
  }
  ttPanel.id="tt-native-panel";
  ttPanel.className="tt-native-panel";
  ttPanel.hidden=true;
  ttPanel.setAttribute("aria-live","polite");
  tt.insertBefore(ttPanel,ttNav);
  var ttBack=document.createElement("a");
  ttBack.href="#visione";
  ttBack.className="tt-demo-return";
  ttBack.setAttribute("aria-label","Torna alla presentazione");
  ttBack.innerHTML=symbol("back");
  tt.appendChild(ttBack);
  ttNav.setAttribute("aria-label","Navigazione TikTok dimostrativa");
  ttNav.innerHTML=[
    '<button type="button" data-tt-screen="home" aria-label="Per te">'+symbol("home")+'<small>Home</small></button>',
    '<button type="button" data-tt-screen="search" aria-label="Scopri">'+symbol("search")+'<small>Scopri</small></button>',
    '<button type="button" data-tt-screen="create" class="tt-create-button" aria-label="Crea">'+symbol("plus")+'</button>',
    '<button type="button" data-tt-screen="inbox" aria-label="Posta in arrivo">'+symbol("inbox")+'<small>Posta</small></button>',
    '<button type="button" data-tt-screen="profile" aria-label="Profilo">'+logo()+'<small>Profilo</small></button>'
  ].join("");
  function setTtScreen(screen){
    if(["home","search","create","inbox","profile"].indexOf(screen)<0)screen="home";
    currentTt=screen;
    tt.classList.toggle("tt-native-open",screen!=="home");
    ttPanel.hidden=screen==="home";
    ttNav.querySelectorAll("[data-tt-screen]").forEach(function(b){
      b.classList.toggle("active",b.dataset.ttScreen===screen);
      b.setAttribute("aria-current",b.dataset.ttScreen===screen?"page":"false");
    });
    if(screen==="home"){ttPanel.innerHTML="";return;}
    if(screen==="profile"){
      ttPanel.innerHTML='<div class="tt-profile-header"><b>debora.anastasio</b><button type="button" data-native-action="help" aria-label="Informazioni">☰</button></div><div class="tt-native-profile">'+logo()+'<h2>@debora.anastasio</h2><div class="tt-profile-stats"><span><b>—</b><small>Seguiti</small></span><span><b>—</b><small>Follower</small></span><span><b>—</b><small>Mi piace</small></span></div><button type="button" data-native-action="profile-info">Informazioni sul profilo</button><p>Musica, voce e momenti che restano ✨<br>Napoli · Live & cerimonie</p><a href="#sito">Sito e contatti ↗</a></div><div class="tt-profile-grid-title">'+symbol("grid")+' <span>Video proposti</span></div><div class="tt-profile-grid">'+videos.map(function(v,i){return '<button type="button" data-native-video="'+i+'"><img src="'+esc(v.photo)+'" alt="Storyboard '+esc(v.title)+'"><span>▶</span><b>'+esc(v.title)+'</b></button>';}).join("")+'</div><p class="tt-profile-disclaimer">Layout dimostrativo: immagini e testi proposti, statistiche omesse.</p>';
    }else if(screen==="search"){
      ttPanel.innerHTML='<div class="tt-search-title"><h2>Scopri</h2><p>Esplora le idee video della nuova identità</p></div><div class="native-search-wrap tt-search"><label for="tt-native-search">'+symbol("search")+'</label><input id="tt-native-search" type="search" placeholder="Cerca format video" autocomplete="off"></div><div class="tt-discover-list">'+videos.map(function(v,i){return '<button type="button" data-native-video="'+i+'"><img src="'+esc(v.photo)+'" alt="Storyboard"><span><b>'+esc(v.title)+'</b><small>'+esc(v.caption)+'</small></span><span>▶</span></button>';}).join("")+'</div>';
    }else{
      var creating=screen==="create";
      ttPanel.innerHTML='<div class="tt-native-empty"><div class="tt-empty-symbol">'+symbol(creating?"plus":"inbox")+'</div><h2>'+(creating?"Nuovo video":"Posta in arrivo")+'</h2><p>'+(creating?"Qui nasceranno video reali con Deborah: esibizioni, backstage e piccoli racconti. La demo non carica né pubblica contenuti.":"Questo è un ambiente dimostrativo. Non sono stati importati messaggi, commenti o dati reali di TikTok.")+'</p><button type="button" data-tt-screen="home">Torna a Per te</button></div>';
    }
    ttPanel.scrollTop=0;
  }
  function setVideoNative(index){demo.setVideo(index);setTtScreen("home");}
  function showOverlay(html,type){
    closeFocus=document.activeElement;
    overlayType=type;
    overlay.innerHTML=html;
    overlay.hidden=false;
    document.body.classList.add("native-overlay-visible");
    var close=overlay.querySelector("[data-native-close]");
    if(close)close.focus({preventScroll:true});
  }
  function closeOverlay(){
    if(overlay.hidden)return;
    overlay.hidden=true;
    overlay.innerHTML="";
    overlayType="";
    document.body.classList.remove("native-overlay-visible");
    if(closeFocus&&typeof closeFocus.focus==="function")closeFocus.focus({preventScroll:true});
  }
  overlay.id="native-social-overlay";
  overlay.className="native-social-overlay";
  overlay.hidden=true;
  overlay.setAttribute("role","dialog");
  overlay.setAttribute("aria-modal","true");
  overlay.setAttribute("aria-label","Anteprima social");
  document.body.appendChild(overlay);
  function openPost(i){
    var p=posts[i];if(!p)return;
    var visual=p.img?'<img class="native-detail-photo" src="'+esc(p.img)+'" alt="Fotografia segnaposto per '+esc(p.title)+'">':'<div class="native-detail-poster"><span>'+esc(p.title)+'</span></div>';
    showOverlay('<div class="native-detail"><header class="native-detail-top"><button type="button" data-native-close aria-label="Indietro">'+symbol("back")+'</button><b>Post</b><button data-native-action="share" aria-label="Condividi">'+symbol("send")+'</button></header><div class="native-detail-scroll"><div class="native-detail-author">'+logo()+'<b>deborah.anastasio</b><span>· Concept</span></div>'+visual+'<div class="native-detail-actions"><button type="button" data-native-like="'+i+'" aria-label="Mi piace">'+symbol("heart")+'</button><button type="button" data-native-comment="'+i+'" aria-label="Commenti">'+symbol("comment")+'</button><button type="button" data-native-action="share" aria-label="Condividi">'+symbol("send")+'</button></div><p class="native-detail-caption"><b>deborah.anastasio</b> '+plain(p.caption)+'</p><div class="native-detail-note"><strong>IDEA EDITORIALE</strong><p>'+esc(p.idea)+'</p><small>Foto e testo in anteprima, non pubblicati.</small></div><div class="native-local-comments" id="ig-local-comments">'+renderLocalComments("ig-"+i)+'</div></div><form class="native-comment-form" data-comment-form="ig-'+i+'"><input name="comment" maxlength="180" placeholder="Scrivi un commento di prova…" aria-label="Commento di prova" required><button type="submit">Invia</button></form></div>',"post");
    syncLikes();
  }
  function renderLocalComments(key){
    return (demoComments[key]||[]).map(function(c){return '<p><b>Tu · anteprima:</b> '+esc(c)+'</p>';}).join("");
  }
  function openStory(i){
    selectedStory=(i+stories.length)%stories.length;
    var s=stories[selectedStory];
    showOverlay('<div class="native-story-view" style="--story-image:url(\''+allStoryImages[selectedStory]+'\')"><div class="native-story-progress">'+stories.map(function(_,idx){return '<span class="'+(idx===selectedStory?"current":idx<selectedStory?"watched":"")+'"></span>';}).join("")+'</div><header class="native-story-header">'+logo()+'<b>deborah.anastasio</b><small>Storia concept</small><button type="button" data-native-close aria-label="Chiudi la storia">'+symbol("x")+'</button></header><div class="native-story-text"><span>STORIE IN EVIDENZA</span><h2>'+esc(s.title)+'</h2><p>'+esc(s.detail)+'</p></div><div class="native-story-taps"><button type="button" data-story-step="-1" aria-label="Storia precedente"></button><button type="button" data-story-step="1" aria-label="Storia successiva"></button></div><div class="native-story-reply">Invia un messaggio <span>♡</span></div></div>',"story");
  }
  function openDirectMessage(){
    showOverlay('<div class="native-dm-view"><header><button type="button" data-native-close aria-label="Torna al profilo">'+symbol("back")+'</button>'+logo()+'<b>deborah.anastasio</b><small>Anteprima messaggi</small></header><main class="native-dm-thread"><span class="native-dm-avatar">'+logo()+'</span><h2>Deborah Anastasio</h2><p>Conversazione dimostrativa. I messaggi rimangono soltanto qui sullo schermo e non vengono inviati.</p><div id="native-dm-messages"></div></main><form class="native-dm-form" data-native-dm><input name="text" maxlength="280" required placeholder="Scrivi un messaggio di prova…" autocomplete="off" aria-label="Messaggio di prova"><button type="submit">'+symbol("send")+'</button></form></div>',"dm");
  }
  function openTtComments(){
    var i=demo.getVideoIndex();
    showOverlay('<div class="native-comments-sheet"><div class="native-sheet-handle"></div><div class="native-comments-header"><b>Commenti · Anteprima</b><button type="button" data-native-close aria-label="Chiudi commenti">'+symbol("x")+'</button></div><p class="native-comments-note">Qui puoi provare la sezione commenti. Nessun commento è reale e non viene salvato online.</p><div class="native-comments-list" id="tt-local-comments">'+renderLocalComments("tt-"+i)+'</div><form class="native-comment-form" data-comment-form="tt-'+i+'"><input name="comment" placeholder="Scrivi un commento di prova…" maxlength="180" required><button type="submit">Invia</button></form></div>',"comments");
  }
  function openInfo(){
    showOverlay('<div class="native-help"><header><button type="button" data-native-close aria-label="Chiudi">'+symbol("back")+'</button><b>Informazioni</b></header><div>'+logo()+'<h2>Deborah Anastasio<br><em>Digital Concept</em></h2><p>Stai esplorando una simulazione autonoma dei social. Non sei sulle piattaforme reali: foto, copertine e video sono proposte da approvare con l’artista.</p><a href="#visione" data-native-leave>Torna alla presentazione ↗</a><a href="https://www.instagram.com/deborah.anastasio/" target="_blank" rel="noopener noreferrer">Instagram reale ↗</a><a href="https://www.tiktok.com/@debora.anastasio" target="_blank" rel="noopener noreferrer">TikTok reale ↗</a></div></div>',"info");
  }
  function nativeShare(){
    var target=location.href;
    if(navigator.share){
      navigator.share({title:"Deborah Anastasio — Digital Concept",url:target}).catch(function(){});
    }else if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(target).then(function(){toast("Link della demo copiato");}).catch(function(){toast("Condividi il link dalla barra del browser");});
    }else toast("Condividi il link dalla barra del browser");
  }
  var toastNode=document.createElement("div");
  toastNode.className="native-toast";
  toastNode.setAttribute("role","status");
  toastNode.hidden=true;
  document.body.appendChild(toastNode);
  function toast(message){toastNode.textContent=message;toastNode.hidden=false;clearTimeout(tooltips.timeout);tooltips.timeout=setTimeout(function(){toastNode.hidden=true;},2300);}
  function syncLikes(){
    document.querySelectorAll("[data-native-like]").forEach(function(b){
      var active=!!igLikes[b.dataset.nativeLike];b.classList.toggle("is-liked",active);
      b.setAttribute("aria-pressed",active?"true":"false");
    });
  }
  document.addEventListener("click",function(e){
    if(!media.matches)return;
    var route=location.hash.slice(1);
    if(route!=="instagram"&&route!=="tiktok")return;
    var post=e.target.closest("[data-post]");
    var story=e.target.closest("[data-story]");
    var existingAction=e.target.closest('[data-action="tiktok-info"],[data-action="share"],[data-action="profile-info"],[data-action="contact"]');
    if(post&&route==="instagram"){e.preventDefault();e.stopImmediatePropagation();openPost(Number(post.dataset.post));return;}
    if(story&&route==="instagram"){e.preventDefault();e.stopImmediatePropagation();openStory(Number(story.dataset.story));return;}
    if(existingAction){
      e.preventDefault();e.stopImmediatePropagation();
      if(existingAction.dataset.action==="tiktok-info"&&route==="tiktok")openTtComments();
      else if(existingAction.dataset.action==="contact"&&route==="instagram")openDirectMessage();
      else if(existingAction.dataset.action==="share")nativeShare();
      else openInfo();
      return;
    }
  },true);
  document.addEventListener("click",function(e){
    var element=e.target.closest("button,a");
    if(!element)return;
    if(element.hasAttribute("data-native-close")){closeOverlay();return;}
    if(element.hasAttribute("data-native-leave")){closeOverlay();return;}
    if(element.hasAttribute("data-ig-screen")){setIgScreen(element.dataset.igScreen);return;}
    if(element.hasAttribute("data-tt-screen")){setTtScreen(element.dataset.ttScreen);return;}
    if(element.hasAttribute("data-native-post")){openPost(Number(element.dataset.nativePost));return;}
    if(element.hasAttribute("data-native-story")){openStory(Number(element.dataset.nativeStory));return;}
    if(element.hasAttribute("data-story-step")){openStory(selectedStory+Number(element.dataset.storyStep));return;}
    if(element.hasAttribute("data-native-video")){setVideoNative(Number(element.dataset.nativeVideo));return;}
    if(element.hasAttribute("data-native-reel-step")){selectedReel=(selectedReel+Number(element.dataset.nativeReelStep)+videos.length)%videos.length;renderIgReel();return;}
    if(element.hasAttribute("data-native-like")){var k=element.dataset.nativeLike;igLikes[k]=!igLikes[k];syncLikes();return;}
    if(element.hasAttribute("data-native-save")){element.classList.toggle("saved");toast(element.classList.contains("saved")?"Idea salvata in questa demo":"Idea rimossa dai salvati");return;}
    if(element.hasAttribute("data-native-reel-like")){element.classList.toggle("is-liked");return;}
    if(element.hasAttribute("data-native-comment")){var input=overlay.querySelector(".native-comment-form input");if(input)input.focus();return;}
    if(element.hasAttribute("data-native-action")){
      var action=element.dataset.nativeAction;
      if(action==="share")nativeShare();
      if(action==="help"||action==="profile-info")openInfo();
    }
  });
  document.addEventListener("input",function(e){
    if(e.target.id==="ig-native-search"){
      var q=e.target.value.trim().toLowerCase();
      document.querySelectorAll("#native-explore-grid button").forEach(function(b){
        var i=Number(b.dataset.nativePost);
        b.hidden=!(posts[i].title+" "+posts[i].type).toLowerCase().includes(q);
      });
    }
    if(e.target.id==="tt-native-search"){
      var q2=e.target.value.trim().toLowerCase();
      document.querySelectorAll(".tt-discover-list button").forEach(function(b){
        var idx=Number(b.dataset.nativeVideo);
        b.hidden=!(videos[idx].title+" "+videos[idx].caption).toLowerCase().includes(q2);
      });
    }
  });
  document.addEventListener("submit",function(e){
    var dm=e.target.closest("[data-native-dm]");
    if(dm){
      e.preventDefault();
      var message=dm.querySelector("input");
      var text=message.value.trim();
      if(!text)return;
      var thread=overlay.querySelector("#native-dm-messages");
      if(thread){var bubble=document.createElement("p");bubble.className="native-dm-bubble";bubble.textContent=text;thread.appendChild(bubble);thread.scrollIntoView({block:"end",behavior:"smooth"});}
      message.value="";
      toast("Messaggio mostrato soltanto in anteprima");
      return;
    }
    var form=e.target.closest("[data-comment-form]");
    if(!form)return;
    e.preventDefault();
    var input=form.querySelector("input");
    var val=input.value.trim();if(!val)return;
    var key=form.dataset.commentForm;
    if(!demoComments[key])demoComments[key]=[];
    demoComments[key].push(val);
    var area=overlay.querySelector(".native-local-comments,.native-comments-list");
    if(area)area.innerHTML=renderLocalComments(key);
    input.value="";
    toast("Commento aggiunto solo in questa demo");
  });
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"&&!overlay.hidden){e.preventDefault();closeOverlay();}
    if(!overlay.hidden&&overlayType==="story"&&e.key==="ArrowRight")openStory(selectedStory+1);
    if(!overlay.hidden&&overlayType==="story"&&e.key==="ArrowLeft")openStory(selectedStory-1);
  });
  /* The profile/search tab scroll must not switch the video behind it. */
  ttPanel.addEventListener("touchstart",function(e){e.stopPropagation();},{passive:true});
  ttPanel.addEventListener("touchend",function(e){e.stopPropagation();},{passive:true});
  var swipeStart=null;
  igScreen.addEventListener("touchstart",function(e){
    if(currentIg!=="reels"||e.touches.length!==1)return;
    swipeStart=e.touches[0].clientY;
  },{passive:true});
  igScreen.addEventListener("touchend",function(e){
    if(currentIg!=="reels"||swipeStart===null)return;
    var d=e.changedTouches[0].clientY-swipeStart;
    if(Math.abs(d)>70){selectedReel=(selectedReel+(d<0?1:-1)+videos.length)%videos.length;renderIgReel();}
    swipeStart=null;
  },{passive:true});
  window.addEventListener("hashchange",socialMode);
  if(media.addEventListener)media.addEventListener("change",socialMode);
  else if(media.addListener)media.addListener(socialMode);
  socialMode();
})();