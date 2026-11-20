
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
    gallery:"./assets/deborah-sanvalentino-originale-hq.jpg",
    blueArchive:"./assets/deborah-sanvalentino-originale-hq.jpg"
  };
  // Feed Instagram: solo materiali reali e contenuti distinti.
  // I cinque video vengono aggiunti dal catalogo verificato in video-integration.js.
  // Le due foto statiche sono uniche e non vengono duplicate per riempire la griglia.
  var posts=[
    {title:"Deborah Anastasio",type:"Fotografia",img:uploaded.pink,
      caption:"Ciao ragazzi! Un saluto grande da me. Ci vediamo presto con tanta musica! ❤️",
      editorialStatic:true},
    {title:"San Valentino · Villa Gauro",type:"Archivio",img:uploaded.blueArchive,
      caption:"Un ricordo di una serata di San Valentino a Villa Gauro. Bacio grande! ❤️ #DeborahAnastasio #Live",
      editorialStatic:true}
  ];
  var grid=document.getElementById("ig-grid");
  if(grid){
    grid.innerHTML=posts.map(function(p,i){
      return '<button data-post="'+i+'" class="ig-tile image-tile"><img src="'+p.img+'" alt="'+p.title.replace(/"/g,"&quot;")+'" loading="lazy"></button>';
    }).join("");
  }
  var dabGallery=[{"src":"./assets/la-dab/galleria/dab-01-serata-bianco.webp","title":"Serata in bianco"},{"src":"./assets/la-dab/galleria/dab-02-gruppo-nero.webp","title":"Insieme, fuori dal palco"},{"src":"./assets/la-dab/galleria/dab-03-sul-mare.webp","title":"Una serata sul mare"},{"src":"./assets/la-dab/galleria/dab-04-dietro-il-palco.webp","title":"Il nostro backstage"}];
  var stories=[
    {title:"La mia voce",detail:"Ciao ragazzi, sono Deborah! Qui vi porto con me, tra canzoni, emozioni e serate bellissime. ❤️"},
    {title:"Eventi",detail:"Ciao ragazzi! Dalle feste agli eventi aziendali, ogni occasione è diversa. Io ci metto la voce e tutta la voglia di farvi divertire! 🎶❤️"},
    {title:"La DAB",detail:"Eccoci con la DAB! Tra musica dal vivo, prove e qualche risata, vi facciamo compagnia anche qui."},
    {title:"Backstage",detail:"Un po' di tremarella c'è sempre! Vi mostro le prove, i preparativi e quello che combiniamo prima di salire sul palco."},
    {title:"Per il tuo evento",detail:"State organizzando un evento? Scrivetemi, raccontatemi la vostra idea e vediamo come viverla insieme. Bacio grande! ❤️"}
  ];
  // I video arrivano esclusivamente dal catalogo verificato, senza storyboard ripetuti.
  stories[2].images=dabGallery;
  // Files named by the uploader expressly identify their highlight and order.
  // Keep story clips distinct from the feed/Reels catalog and the La DAB photo gallery.
  stories[0].clips=[
    {src:"./deborah_media/la mia voce 1.mp4",label:"La mia voce · 1"},
    {src:"./deborah_media/la mia voce 2.mp4",label:"La mia voce · 2"}
  ];
  stories[1].clips=[
    {src:"./deborah_media/eventi 1.mp4",label:"Eventi · 1"},
    {src:"./deborah_media/eventi 2.mp4",label:"Eventi · 2"},
    {src:"./deborah_media/eventi 3.mp4",label:"Eventi · 3"}
  ];
  stories[3].clips=[
    {src:"./deborah_media/backstage 1.mp4",label:"Backstage · 1"}
  ];

  var videos=[];
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
    var banner=document.querySelector(".concept-banner");
    if(banner){banner.hidden=selected!=="visione";banner.style.display=selected==="visione"?"":"none";}
    document.querySelectorAll("[data-view]").forEach(function(el){el.hidden=el.dataset.view!==selected;});
    document.querySelectorAll("[data-route]").forEach(function(el){
      var active=el.dataset.route===selected;
      el.classList.toggle("active",active);
      if(active) el.setAttribute("aria-current","page");else el.removeAttribute("aria-current");
    });
    document.title="Deborah Anastasio — "+(selected==="visione"?"La proposta / Presentazione":selected==="sito"?"La mia musica":selected[0].toUpperCase()+selected.slice(1));
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
    html+='<h2 id="dialog-title">'+escapeText(post.title)+'</h2>';
    html+='<div class="dialog-sample"><b>LA DIDASCALIA</b><p>'+paragraphs(post.caption)+'</p></div>';
    
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
    if(story.clips&&story.clips.length){openHighlightClip(i,0);return;}
    if(i===2&&dabGallery.length){openBandPhoto(0);return;}
    openModal(titleDialog("STORIE IN EVIDENZA",story.title,story.detail));
  }
  var activeHighlight=-1,activeHighlightClip=0;
  function openHighlightClip(storyIndex,clipIndex,auto){
    var story=stories[storyIndex];
    if(!story||!story.clips||!story.clips.length)return;
    activeHighlight=storyIndex;
    activeHighlightClip=Math.max(0,Math.min(clipIndex,story.clips.length-1));
    var clip=story.clips[activeHighlightClip];
    var progress=story.clips.map(function(_,i){return '<i class="'+(i<=activeHighlightClip?'watched':'')+'"></i>';}).join("");
    var markup='<div class="dab-highlight-dialog"><span class="dialog-kicker">STORIE / '+escapeText(story.title)+' · '+(activeHighlightClip+1)+' / '+story.clips.length+'</span>'+
      '<div class="dab-highlight-progress">'+progress+'</div>'+
      '<video class="dab-highlight-dialog-video" src="'+encodeURI(clip.src)+'" playsinline muted autoplay preload="auto" aria-label="'+escapeText(clip.label)+'"></video>'+
      '<div class="dab-highlight-dialog-actions"><button type="button" data-highlight-step="-1" aria-label="Video precedente">←</button>'+
      '<button type="button" data-highlight-sound aria-label="Attiva o disattiva audio">♫ Audio</button>'+
      '<button type="button" data-highlight-pause aria-label="Metti in pausa">Ⅱ</button>'+
      '<button type="button" data-highlight-step="1" aria-label="Video successivo">→</button></div></div>';
    if(window.DeborahMedia)window.DeborahMedia.stopAll();
    if(!modal.hidden&&modalContent.querySelector(".dab-highlight-dialog")){
      modalContent.innerHTML=markup;
    }else openModal(markup);
    var vid=modalContent.querySelector(".dab-highlight-dialog-video");
    if(!vid)return;
    vid.addEventListener("ended",function(){
      if(activeHighlightClip+1<story.clips.length)openHighlightClip(storyIndex,activeHighlightClip+1,true);
      else closeModal();
    },{once:true});
    var p=window.DeborahMedia?window.DeborahMedia.play(vid,!auto):vid.play().catch(function(){});
    if(p&&p.then)p.then(function(){var b=modalContent.querySelector("[data-highlight-sound]");if(b&&vid.isConnected)b.textContent=vid.muted?"♫ Audio":"♪ Attivo";});
  }
  function stepHighlight(delta){
    var story=stories[activeHighlight];
    if(!story||!story.clips)return;
    var next=activeHighlightClip+delta;
    if(next>=0&&next<story.clips.length)openHighlightClip(activeHighlight,next);
    else closeModal();
  }
  var activeDabPhoto=-1;
  function openBandPhoto(n){
    if(!dabGallery.length)return;
    activeDabPhoto=(n+dabGallery.length)%dabGallery.length;
    var photo=dabGallery[activeDabPhoto];
    var content='<div class="dab-gallery-dialog"><span class="dialog-kicker">LA DAB / FOTO '+(activeDabPhoto+1)+' DI '+dabGallery.length+'</span>'+
      '<h2 id="dialog-title">'+escapeText(photo.title)+'</h2>'+
      '<img src="'+photo.src+'" alt="La DAB — '+escapeText(photo.title)+'">'+
      '<div class="dab-gallery-dialog-actions"><button type="button" data-dab-step="-1" aria-label="Foto precedente">← Precedente</button>'+
      '<span>'+(activeDabPhoto+1)+' / '+dabGallery.length+'</span>'+
      '<button type="button" data-dab-step="1" aria-label="Foto successiva">Successiva →</button></div></div>';
    if(!modal.hidden&&modalContent.querySelector(".dab-gallery-dialog")){
      modalContent.innerHTML=content;
      closeBtn.focus();
    }else openModal(content);
  }
  function openContact(){
    openModal(titleDialog("CONTATTI","Scrivimi, mi farà piacere!","State organizzando un evento? Raccontatemi la vostra idea sui miei canali social. Vi aspetto! ❤️")+
      '<div class="dialog-action-row"><a href="'+instagramUrl+'" target="_blank" rel="noopener noreferrer">Instagram reale ↗</a><a href="'+tiktokUrl+'" target="_blank" rel="noopener noreferrer">TikTok reale ↗</a></div>'+
      '<p class="dialog-small">I messaggi si inviano direttamente tramite Instagram o TikTok.</p>');
  }
  function shareDemo(){
    var url=location.href;
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(url).then(function(){
        openModal(titleDialog("CONDIVIDI","Link copiato","Link copiato! Puoi condividerlo con chi vuoi."));
      }).catch(function(){openModal(titleDialog("CONDIVIDI","Condividi il link",url));});
    }else openModal(titleDialog("CONDIVIDI","Condividi il link",url));
  }
  document.addEventListener("click",function(ev){
    var highlightStep=ev.target.closest("[data-highlight-step]");
    if(highlightStep){stepHighlight(Number(highlightStep.dataset.highlightStep));return;}
    var highlightPause=ev.target.closest("[data-highlight-pause]");
    if(highlightPause){
      var hv=modalContent.querySelector(".dab-highlight-dialog-video");
      if(hv){if(hv.paused){if(window.DeborahMedia)window.DeborahMedia.play(hv,true);else hv.play().catch(function(){});highlightPause.textContent="Ⅱ";}else{hv.pause();highlightPause.textContent="▶";}}
      return;
    }
    var highlightSound=ev.target.closest("[data-highlight-sound]");
    if(highlightSound){
      var sv=modalContent.querySelector(".dab-highlight-dialog-video");
      if(sv){if(window.DeborahMedia)window.DeborahMedia.toggleSound(sv);else{sv.muted=!sv.muted;sv.play().catch(function(){});}highlightSound.textContent=sv.muted?"♫ Audio":"♪ Attivo";}
      return;
    }
    var dabPhoto=ev.target.closest("[data-dab-photo]");
    if(dabPhoto){openBandPhoto(Number(dabPhoto.dataset.dabPhoto));return;}
    var dabStep=ev.target.closest("[data-dab-step]");
    if(dabStep){openBandPhoto(activeDabPhoto+Number(dabStep.dataset.dabStep));return;}
    var post=ev.target.closest("[data-post]");
    if(post){openPost(Number(post.dataset.post));return;}
    var story=ev.target.closest("[data-story]");
    if(story){openStory(Number(story.dataset.story));return;}
    var action=ev.target.closest("[data-action]");
    if(action){
      var a=action.dataset.action;
      if(a==="contact")openContact();
      if(a==="share")shareDemo();
      if(a==="profile-info")openModal(titleDialog("INSTAGRAM / DETTAGLI","Il profilo di Deborah","Stai guardando un'anteprima del progetto di Deborah. Per i contenuti pubblicati visita il suo profilo Instagram."));
      if(a==="tiktok-info")openModal(titleDialog("TIKTOK / PRODUZIONE",videos[videoIndex].title,videos[videoIndex].method));
    }
    var video=ev.target.closest("[data-video]");
    if(video)setVideo(Number(video.dataset.video));
  });
  closeBtn.addEventListener("click",closeModal);
  modal.addEventListener("click",function(ev){if(ev.target===modal)closeModal();});
  window.addEventListener("keydown",function(ev){
    if(ev.key==="Escape")closeModal();
    if(!modal.hidden && modalContent.querySelector(".dab-gallery-dialog") && (ev.key==="ArrowRight"||ev.key==="ArrowLeft")){
      ev.preventDefault();openBandPhoto(activeDabPhoto+(ev.key==="ArrowRight"?1:-1));return;
    }
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
    if(!videos.length)return;
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
  window.DeborahDemo={posts:posts,stories:stories,videos:videos,dabGallery:dabGallery,setVideo:setVideo,getVideoIndex:function(){return videoIndex;}};
  window.addEventListener("hashchange",route);
  route();
  setVideo(0);
})();