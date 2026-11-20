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
  var igFilter="posts";
  var currentTt="home";
  var overlayType="";
  var selectedStory=0;
  var selectedReel=0;
  var igLikes={};
  var demoComments={};
  var tooltips={};
  var closeFocus=null;
  var videos=demo.videos;
  var posts=demo.posts;
  var stories=demo.stories;
  var dabGallery=demo.dabGallery||[];
  var selectedDabFrame=0;
  var selectedClipFrame=0;
  var allStoryImages=["./assets/copertine/social/la-mia-voce-2.webp","./assets/copertine/social/eventi-1.webp","./assets/la-dab/galleria/dab-01-serata-bianco.webp","./assets/la-dab/galleria/dab-04-dietro-il-palco.webp","./assets/copertine/social/eventi-3.webp"];
  function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
  function plain(v){return esc(v).replace(/\n/g,"<br>");}
  function logo(){return '<span class="native-da-avatar native-da-photo"><img src="./assets/deborah-avatar-centrato-ai.webp" alt="" loading="lazy"></span>';}
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
    '<button type="button" data-ig-screen="home">'+symbol("home")+'<small>Home</small></button>',
    '<button type="button" data-ig-screen="search">'+symbol("search")+'<small>Esplora</small></button>',
    '<button type="button" data-ig-screen="reels">'+symbol("reels")+'<small>Reel</small></button>',
    '<button type="button" data-ig-screen="profile" class="active">'+logo()+'<small>Profilo</small></button>'
  ].join("");
  function syncIgNav(){
    igNav.querySelectorAll("[data-ig-screen]").forEach(function(b){
      var active=b.dataset.igScreen===currentIg;
      b.classList.toggle("active",active);
      b.setAttribute("aria-current",active?"page":"false");
    });
    if(igHeaderName)igHeaderName.textContent=({profile:"@deborah.anastasio",home:"Home",search:"Esplora",reels:"Reel"})[currentIg];
  }
  function setIgFilter(filter){
    igFilter=filter;
    var seen=new Set();
    ig.querySelectorAll("[data-ig-tab]").forEach(function(button){
      var active=button.dataset.igTab===filter;
      button.classList.toggle("active",active);
      button.setAttribute("aria-pressed",String(active));
    });
    ig.querySelectorAll("#ig-grid [data-post]").forEach(function(tile){
      var post=posts[Number(tile.dataset.post)];
      var src=post&&post.videoSrc;
      var show=filter==="posts" || (filter==="reels" && src && !seen.has(src)) ||
        (filter==="photos" && !src && post && post.img);
      tile.hidden=!show;
      if(src)seen.add(src);
    });
  }
  function reelItems(){
    var actual=videos.filter(function(v){return !!v.src;});
    return actual.length?actual:videos.filter(function(v){return !v.photoPost;});
  }
  function openProfileTile(i){
    var post=posts[i];
    if(igFilter==="reels" && post && post.videoSrc){
      var index=reelItems().findIndex(function(video){return video.src===post.videoSrc;});
      if(index!==-1){
        selectedReel=index;
        setIgScreen("reels",true);
        return;
      }
    }
    openPost(i);
  }
  function instaCard(p,i){
    var visual=p.img?'<img src="'+esc(p.img)+'" loading="lazy" alt="">'+
      (p.videoSrc?'<span class="tile-reel-mark">'+symbol("reels")+'</span>':''):
      '<div class="native-poster"><span>'+esc(p.title)+'</span></div>';
    return '<article class="native-feed-card"><div class="native-feed-author">'+logo()+'<b>deborah.anastasio</b><button type="button" data-native-action="help" aria-label="Note sulla demo">'+symbol("more")+'</button></div><button class="native-feed-visual" type="button" data-native-post="'+i+'" aria-label="Apri il post '+esc(p.title)+'">'+visual+'</button><div class="native-feed-actions"><button type="button" data-native-like="'+i+'" aria-label="Mi piace">'+symbol("heart")+'</button><button type="button" data-native-post="'+i+'" aria-label="Apri commenti">'+symbol("comment")+'</button><button type="button" data-native-action="share" aria-label="Condividi il concept">'+symbol("send")+'</button><span class="feed-spacer"></span><button type="button" data-native-save="'+i+'" aria-label="Salva idea">'+symbol("bookmark")+'</button></div><p class="native-feed-caption"><b>deborah.anastasio</b> '+plain(p.caption)+'</p><button class="native-view-comments" type="button" data-native-post="'+i+'">Leggi tutto</button></article>';
  }
  function setIgScreen(screen,userGesture){
    if(window.DeborahMedia)window.DeborahMedia.pauseContainer(igScreen);
    if(["profile","home","search","reels"].indexOf(screen)<0)screen="profile";
    currentIg=screen;
    ig.dataset.screen=screen;
    igScreen.hidden=screen==="profile";
    syncIgNav();
    if(screen==="profile"){igScreen.innerHTML="";setIgFilter(igFilter);return;}
    if(screen==="home"){
      igScreen.innerHTML='<div class="ig-home-stories"><button type="button" data-native-story="0">'+logo()+'<small>La tua storia</small></button>'+stories.slice(1,4).map(function(s,i){return '<button type="button" data-native-story="'+(i+1)+'"><span class="home-story-ring highlight-cover"><img src="./assets/brand/highlights/'+["eventi-v2","band","backstage-v2"][i]+'.svg" alt="" aria-hidden="true"></span><small>'+esc(s.title)+'</small></button>';}).join("")+'</div>'+posts.map(instaCard).join("");
    }else if(screen==="search"){
      igScreen.innerHTML='<div class="native-search-wrap"><label for="ig-native-search">'+symbol("search")+'<span class="sr-only">Cerca tra i contenuti</span></label><input id="ig-native-search" type="search" placeholder="Cerca una canzone o una serata" autocomplete="off"></div><div class="native-search-chips"><span>Musica</span><span>DAB</span><span>Live</span><span>Backstage</span></div><div id="native-explore-grid" class="native-explore-grid">'+posts.map(function(p,i){return '<button type="button" data-native-post="'+i+'">'+(p.img?'<img src="'+esc(p.img)+'" alt="'+esc(p.title)+'" loading="lazy">':'<span>'+esc(p.title)+'</span>')+'</button>';}).join("")+'</div>';
    }else if(screen==="reels"){
      renderIgReel(!!userGesture);
    }
    window.scrollTo({top:0,behavior:"auto"});
  }
  function renderIgReel(userGesture){
    if(window.DeborahMedia)window.DeborahMedia.pauseContainer(igScreen);
    var reelList=reelItems();
    if(!reelList.length)return;
    selectedReel=selectedReel%reelList.length;
    var v=reelList[selectedReel];
    var picture=v.src?'<video src="'+esc(v.src)+'" poster="'+esc(v.photo)+'" playsinline autoplay muted loop preload="metadata" controls class="ig-reel-video" aria-label="Reel di Deborah Anastasio"></video>':'<img src="'+esc(v.photo)+'" alt="Immagine dal mondo musicale di Deborah" class="ig-reel-photo">';
    igScreen.innerHTML='<div class="ig-reels-stage">'+picture+'<div class="ig-reels-gradient"></div><span class="ig-reel-top">Reel <small>'+(v.src?"DAL VIVO":"FOTO")+'</small></span>'+(v.src?'':'<p class="ig-reel-headline">'+v.headline+'</p>')+'<div class="ig-reel-actions"><button type="button" data-native-reel-like aria-label="Metti mi piace">'+symbol("heart")+'</button><button type="button" data-native-action="share" aria-label="Condividi">'+symbol("send")+'</button></div><div class="ig-reel-bottom">'+logo()+'<b>deborah.anastasio</b><p>'+esc(v.caption)+'</p><small>'+(v.src?"Deborah Anastasio":"Dal mio archivio")+'</small></div><div class="ig-reel-switch"><button type="button" data-native-reel-step="-1" aria-label="Reel precedente">↑</button><button type="button" data-native-reel-step="1" aria-label="Reel successivo">↓</button></div></div>';
    var reel=igScreen.querySelector("video.ig-reel-video");
    if(reel && window.DeborahMedia)window.DeborahMedia.play(reel,!!userGesture);
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
  tt.querySelector('[data-action="tiktok-info"] span').innerHTML=symbol("comment");
  tt.querySelector('[data-action="share"] span').innerHTML=symbol("send");
  var ttTop=tt.querySelector(".tiktok-top");
  if(ttTop)ttTop.innerHTML='<span class="tt-feed-label">Performance</span><button type="button" data-tt-screen="search" aria-label="Cerca">'+symbol("search")+'</button>';
  ttNav.setAttribute("aria-label","Navigazione TikTok dimostrativa");
  ttNav.innerHTML=[
    '<button type="button" data-tt-screen="home">'+symbol("home")+'<small>Video</small></button>',
    '<button type="button" data-tt-screen="search">'+symbol("search")+'<small>Cerca</small></button>',
    '<button type="button" data-tt-screen="profile">'+logo()+'<small>Profilo</small></button>'
  ].join("");
  function setTtScreen(screen){
    if(["home","search","profile"].indexOf(screen)<0)screen="home";
    if(screen!=="home" && window.DeborahMedia)window.DeborahMedia.pauseContainer(tt);
    currentTt=screen;
    tt.classList.toggle("tt-native-open",screen!=="home");
    ttPanel.hidden=screen==="home";
    ttNav.querySelectorAll("[data-tt-screen]").forEach(function(b){
      b.classList.toggle("active",b.dataset.ttScreen===screen);
      b.setAttribute("aria-current",b.dataset.ttScreen===screen?"page":"false");
    });
    if(screen==="home"){
      ttPanel.innerHTML="";
      document.dispatchEvent(new Event("deborah:contextchange"));
      return;
    }
    if(screen==="profile"){
      ttPanel.innerHTML='<div class="tt-profile-header"><b>debora.anastasio</b><button type="button" data-native-action="help" aria-label="Informazioni">☰</button></div><div class="tt-native-profile">'+logo()+'<h2>@debora.anastasio</h2><p>Performer per il tuo evento 🎤❤️<br>Live, spettacoli e la DAB</p><a href="#sito">Sito e contatti ↗</a></div><div class="tt-profile-grid-title">'+symbol("grid")+' <span>Raccolta video</span></div><div class="tt-profile-grid">'+videos.map(function(v,i){return '<button type="button" data-native-video="'+i+'"><img src="'+esc(v.photo)+'" alt=""><span>'+(v.photoPost?'▧':'▶')+'</span><b>'+esc(v.title)+'</b></button>';}).join("")+'</div>';
    }else if(screen==="search"){
      ttPanel.innerHTML='<div class="tt-search-title"><h2>Scopri</h2><p>Dove ci rivediamo? Scegli un video!</p></div><div class="native-search-wrap tt-search"><label for="tt-native-search">'+symbol("search")+'</label><input id="tt-native-search" type="search" placeholder="Cerca un video" autocomplete="off"></div><div class="tt-discover-list">'+videos.map(function(v,i){return '<button type="button" data-native-video="'+i+'"><img src="'+esc(v.photo)+'" alt="Storyboard"><span><b>'+esc(v.title)+'</b><small>'+esc(v.caption)+'</small></span><span>'+(v.photoPost?'FOTO':'▶')+'</span></button>';}).join("")+'</div>';
    }
    ttPanel.scrollTop=0;
    document.dispatchEvent(new Event("deborah:contextchange"));
  }
  function setVideoNative(index){setTtScreen("home");demo.setVideo(index);}
  function showOverlay(html,type){
    if(window.DeborahMedia)window.DeborahMedia.stopAll();
    closeFocus=document.activeElement;
    if(!media.matches){
      var host=location.hash==="#tiktok"?tt:ig;
      if(overlay.parentElement!==host)host.appendChild(overlay);
      host.classList.add("desktop-player-open");
      overlay.setAttribute("aria-modal","false");
    }else{
      if(overlay.parentElement!==document.body)document.body.appendChild(overlay);
      overlay.setAttribute("aria-modal","true");
    }
    overlayType=type;
    overlay.innerHTML=html;
    overlay.hidden=false;
    document.body.classList.toggle("native-overlay-visible",media.matches);
    var close=overlay.querySelector("[data-native-close]");
    if(close)close.focus({preventScroll:true});
    if(!media.matches)overlay.scrollIntoView({block:"nearest",behavior:"auto"});
  }
  function closeOverlay(){
    if(overlay.hidden)return;
    if(window.DeborahMedia)window.DeborahMedia.pauseContainer(overlay);
    overlay.hidden=true;
    overlay.innerHTML="";
    ig.classList.remove("desktop-player-open");
    tt.classList.remove("desktop-player-open");
    overlayType="";
    document.body.classList.remove("native-overlay-visible");
    document.dispatchEvent(new Event("deborah:contextchange"));
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
    var visual=p.videoSrc?'<div class="ig-post-video-frame"><video class="native-detail-video" src="'+esc(p.videoSrc)+'" poster="'+esc(p.img)+'" controls playsinline autoplay muted loop preload="auto" aria-label="Video originale Deborah Anastasio"></video></div>':p.img?'<img class="native-detail-photo" src="'+esc(p.img)+'" alt="Copertina per '+esc(p.title)+'">':'<div class="native-detail-poster"><span>'+esc(p.title)+'</span></div>';
    showOverlay('<div class="native-detail"><header class="native-detail-top"><button type="button" data-native-close aria-label="Indietro">'+symbol("back")+'</button><b>Post</b><button data-native-action="share" aria-label="Condividi">'+symbol("send")+'</button></header><div class="native-detail-scroll"><div class="native-detail-author">'+logo()+'<b>deborah.anastasio</b></div>'+visual+'<div class="native-detail-actions"><button type="button" data-native-like="'+i+'" aria-label="Mi piace">'+symbol("heart")+'</button><button type="button" data-native-comment="'+i+'" aria-label="Commenti">'+symbol("comment")+'</button><button type="button" data-native-action="share" aria-label="Condividi">'+symbol("send")+'</button></div><p class="native-detail-caption"><b>deborah.anastasio</b> '+plain(p.caption)+'</p><div class="native-local-comments" id="ig-local-comments">'+renderLocalComments("ig-"+i)+'</div></div><form class="native-comment-form" data-comment-form="ig-'+i+'"><input name="comment" maxlength="180" placeholder="Scrivi un commento di prova…" aria-label="Commento di prova" required><button type="submit">Invia</button></form></div>',"post");
    syncLikes();
    var openedVideo=overlay.querySelector("video.native-detail-video");
    if(openedVideo){
      if(window.DeborahMedia)window.DeborahMedia.play(openedVideo,true);
      else openedVideo.play().catch(function(){ openedVideo.muted=true; openedVideo.play().catch(function(){}); });
    }
  }
  function renderLocalComments(key){
    return (demoComments[key]||[]).map(function(c){return '<p><b>Tu · anteprima:</b> '+esc(c)+'</p>';}).join("");
  }
  function openStory(i,frame,fromAutomatic){
    selectedStory=(i+stories.length)%stories.length;
    var s=stories[selectedStory];
    if(s.clips && s.clips.length){
      selectedClipFrame=(typeof frame==="number" && frame>=0 && frame<s.clips.length)?frame:0;
      var clip=s.clips[selectedClipFrame];
      var marks=s.clips.map(function(_,idx){
        return '<span class="'+(idx===selectedClipFrame?'current':idx<selectedClipFrame?'watched':'')+'"></span>';
      }).join("");
      var body='<div class="native-story-view native-highlight-video-story">'+
        '<video class="native-highlight-video" src="'+esc(encodeURI(clip.src))+'" autoplay muted playsinline preload="auto" aria-label="'+esc(clip.label)+'"></video>'+
        '<div class="native-story-progress" aria-label="Video '+(selectedClipFrame+1)+' di '+s.clips.length+'">'+marks+'</div>'+
        '<header class="native-story-header">'+logo()+'<b>deborah.anastasio · '+esc(s.title)+'</b>'+
        '<button type="button" class="native-highlight-audio" data-highlight-sound aria-label="Attiva o disattiva audio">♫ Audio</button>'+
        '<button type="button" data-native-close aria-label="Chiudi la storia">'+symbol("x")+'</button></header>'+
        '<div class="native-story-taps"><button type="button" data-story-step="-1" aria-label="Video precedente"></button><button type="button" data-story-step="1" aria-label="Video successivo"></button></div>'+
        '<div class="native-highlight-bottom"><span>'+esc(s.title)+' · '+(selectedClipFrame+1)+' / '+s.clips.length+'</span>'+
        '<button type="button" data-highlight-pause aria-label="Metti in pausa">Ⅱ</button></div></div>';
      // Pause the outgoing video before replacing it: detached players must
      // never continue playing sound after a step or route transition.
      if(window.DeborahMedia)window.DeborahMedia.stopAll();
      if(!overlay.hidden && overlayType==="story"){
        overlay.innerHTML=body;
        var close=overlay.querySelector("[data-native-close]");
        if(close)close.focus({preventScroll:true});
      }else showOverlay(body,"story");
      var player=overlay.querySelector("video.native-highlight-video");
      if(player){
        var syncAudio=function(){
          var button=overlay.querySelector(".native-highlight-audio");
          if(button && player.isConnected)button.textContent=player.muted?"♫ Audio":"♪ Attivo";
        };
        player.addEventListener("volumechange",syncAudio);
        player.addEventListener("ended",function(){
          if(!player.isConnected || selectedStory!==i)return;
          if(selectedClipFrame+1<s.clips.length)openStory(i,selectedClipFrame+1,true);
          else closeOverlay();
        },{once:true});
        player.addEventListener("error",function(){
          var caption=overlay.querySelector(".native-highlight-bottom span");
          if(caption && player.isConnected)caption.textContent="Video non disponibile";
        });
        var promise=window.DeborahMedia?window.DeborahMedia.play(player,!fromAutomatic):player.play().catch(function(){player.muted=true;return player.play().catch(function(){});});
        if(promise && promise.then)promise.then(syncAudio);
      }
      return;
    }
    if(selectedStory===2 && dabGallery.length){
      selectedDabFrame=(typeof frame==="number" && frame>=0 && frame<dabGallery.length)?frame:0;
      var photo=dabGallery[selectedDabFrame];
      var progress=dabGallery.map(function(_,idx){
        return '<span class="'+(idx===selectedDabFrame?'current':idx<selectedDabFrame?'watched':'')+'"></span>';
      }).join("");
      var body='<div class="native-story-view native-dab-photo-story">'+
        '<img class="native-dab-story-picture" src="'+esc(photo.src)+'" alt="La DAB: '+esc(photo.title)+'">'+
        '<div class="native-story-progress" aria-label="Foto '+(selectedDabFrame+1)+' di '+dabGallery.length+'">'+progress+'</div>'+
        '<header class="native-story-header">'+logo()+'<b>deborah.anastasio · La DAB</b><button type="button" data-native-close aria-label="Chiudi la storia">'+symbol("x")+'</button></header>'+
        '<div class="native-story-text"><span>LA DAB · '+(selectedDabFrame+1)+' / '+dabGallery.length+'</span><h2>'+esc(photo.title)+'</h2></div>'+
        '<div class="native-story-taps"><button type="button" data-story-step="-1" aria-label="Foto precedente della DAB"></button><button type="button" data-story-step="1" aria-label="Foto successiva della DAB"></button></div>'+
        '<div class="native-story-reply">Una serata con La DAB <span>♡</span></div></div>';
      if(!overlay.hidden && overlayType==="story"){
        overlay.innerHTML=body;
        var close=overlay.querySelector("[data-native-close]");
        if(close)close.focus({preventScroll:true});
      }else showOverlay(body,"story");
      var view=overlay.querySelector(".native-dab-photo-story");
      if(view)view.style.setProperty("--story-image",'url("'+photo.src+'")');
      return;
    }
    showOverlay('<div class="native-story-view" style="--story-image:url(\''+allStoryImages[selectedStory]+'\')"><div class="native-story-progress">'+stories.map(function(_,idx){return '<span class="'+(idx===selectedStory?"current":idx<selectedStory?"watched":"")+'"></span>';}).join("")+'</div><header class="native-story-header">'+logo()+'<b>deborah.anastasio</b><button type="button" data-native-close aria-label="Chiudi la storia">'+symbol("x")+'</button></header><div class="native-story-text"><span>DAL MIO MONDO</span><h2>'+esc(s.title)+'</h2><p>'+esc(s.detail)+'</p></div><div class="native-story-taps"><button type="button" data-story-step="-1" aria-label="Storia precedente"></button><button type="button" data-story-step="1" aria-label="Storia successiva"></button></div><div class="native-story-reply">Invia un messaggio <span>♡</span></div></div>',"story");
  }
  function stepStory(delta,fromAutomatic){
    var current=stories[selectedStory];
    if(current && current.clips && current.clips.length){
      var next=selectedClipFrame+delta;
      if(next>=0 && next<current.clips.length){openStory(selectedStory,next,!!fromAutomatic);return;}
      if(fromAutomatic){closeOverlay();return;}
    }
    if(selectedStory===2 && dabGallery.length){
      var next=selectedDabFrame+delta;
      if(next>=0 && next<dabGallery.length){openStory(2,next);return;}
    }
    openStory(selectedStory+delta);
  }
  function openDirectMessage(){
    showOverlay('<div class="native-dm-view"><header><button type="button" data-native-close aria-label="Torna al profilo">'+symbol("back")+'</button>'+logo()+'<b>deborah.anastasio</b></header><main class="native-dm-thread"><span class="native-dm-avatar">'+logo()+'</span><h2>Deborah Anastasio</h2><p>Per scrivermi davvero, ci vediamo su Instagram! ❤️ I messaggi qui sono soltanto una prova.</p><div id="native-dm-messages"></div></main><form class="native-dm-form" data-native-dm><input name="text" maxlength="280" required placeholder="Scrivi un messaggio di prova…" autocomplete="off" aria-label="Messaggio di prova"><button type="submit">'+symbol("send")+'</button></form></div>',"dm");
  }
  function openTtComments(){
    var i=demo.getVideoIndex();
    showOverlay('<div class="native-comments-sheet"><div class="native-sheet-handle"></div><div class="native-comments-header"><b>Commenti</b><button type="button" data-native-close aria-label="Chiudi commenti">'+symbol("x")+'</button></div><p class="native-comments-note">Qui puoi scrivere un commento di prova. Non sarà pubblicato.</p><div class="native-comments-list" id="tt-local-comments">'+renderLocalComments("tt-"+i)+'</div><form class="native-comment-form" data-comment-form="tt-'+i+'"><input name="comment" placeholder="Scrivi un commento di prova…" maxlength="180" required><button type="submit">Invia</button></form></div>',"comments");
  }
  function openInfo(){
    // Nota del proponente distinta dalla simulazione della voce dell'artista.
    var captionNote=location.hash==="#tiktok"?
      '<section class="tt-caption-info" aria-label="Nota di Simone sulle caption"><span>NOTA DI SIMONE / LE CAPTION</span><h3>Le parole sotto ai video.</h3><p>Le caption di questa anteprima le scrivo io, cercando il tuo tone of voice. Con questi piccoli testi provo a far arrivare le tue parole e il modo in cui ti rivolgi al pubblico. Sono proposte da leggere e correggere insieme, finché non ti ci riconosci.</p></section>':"";
    showOverlay('<div class="native-help"><header><button type="button" data-native-close aria-label="Chiudi">'+symbol("back")+'</button><b>Informazioni</b></header><div>'+logo()+'<h2>Deborah Anastasio<br><em>La mia musica</em></h2><p>Benvenuti! Qui vi mostro un po’ del mio mondo musicale. Per vedere i post pubblicati ci troviamo sui miei canali social.</p>'+captionNote+'<a href="#visione" data-native-leave>Torna alla presentazione ↗</a><a href="https://www.instagram.com/deborah.anastasio/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://www.tiktok.com/@debora.anastasio" target="_blank" rel="noopener noreferrer">TikTok ↗</a></div></div>',"info");
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
    var route=location.hash.slice(1);
    if(route!=="instagram"&&route!=="tiktok")return;
    var post=e.target.closest("[data-post]");
    var story=e.target.closest("[data-story]");
    var existingAction=e.target.closest('[data-action="tiktok-info"],[data-action="share"],[data-action="profile-info"],[data-action="contact"]');
    if(post&&route==="instagram"){e.preventDefault();e.stopImmediatePropagation();openProfileTile(Number(post.dataset.post));return;}
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
    if(element.hasAttribute("data-ig-screen")){setIgScreen(element.dataset.igScreen,true);return;}
    if(element.hasAttribute("data-tt-screen")){setTtScreen(element.dataset.ttScreen);return;}
    if(element.hasAttribute("data-ig-tab")){setIgFilter(element.dataset.igTab);return;}
    if(element.hasAttribute("data-tt-step")){demo.setVideo(demo.getVideoIndex()+Number(element.dataset.ttStep));return;}
    if(element.hasAttribute("data-native-post")){openPost(Number(element.dataset.nativePost));return;}
    if(element.hasAttribute("data-native-story")){openStory(Number(element.dataset.nativeStory));return;}
    if(element.hasAttribute("data-highlight-sound")){
      var clipVideo=overlay.querySelector("video.native-highlight-video");
      if(clipVideo){
        if(window.DeborahMedia){
          if(window.DeborahMedia.isSoundRequested() && clipVideo.muted){
            clipVideo.muted=false;
            clipVideo.play().catch(function(){clipVideo.muted=true;});
          }else window.DeborahMedia.toggleSound(clipVideo);
        }else{clipVideo.muted=!clipVideo.muted;clipVideo.play().catch(function(){});}
        element.textContent=clipVideo.muted?"♫ Audio":"♪ Attivo";
      }
      return;
    }
    if(element.hasAttribute("data-highlight-pause")){
      var pausedVideo=overlay.querySelector("video.native-highlight-video");
      if(pausedVideo){
        if(pausedVideo.paused){
          if(window.DeborahMedia)window.DeborahMedia.play(pausedVideo,true);
          else pausedVideo.play().catch(function(){});
          element.textContent="Ⅱ";element.setAttribute("aria-label","Metti in pausa");
        }else{
          pausedVideo.pause();element.textContent="▶";element.setAttribute("aria-label","Riprendi il video");
        }
      }
      return;
    }
    if(element.hasAttribute("data-story-step")){stepStory(Number(element.dataset.storyStep));return;}
    if(element.hasAttribute("data-native-video")){setVideoNative(Number(element.dataset.nativeVideo));return;}
    if(element.hasAttribute("data-native-reel-step")){selectedReel=(selectedReel+Number(element.dataset.nativeReelStep)+reelItems().length)%reelItems().length;renderIgReel(true);return;}
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
    if(!overlay.hidden&&overlayType==="story"&&e.key==="ArrowRight")stepStory(1);
    if(!overlay.hidden&&overlayType==="story"&&e.key==="ArrowLeft")stepStory(-1);
  });
  /* The profile/search tab scroll must not switch the video behind it. */
  ttPanel.addEventListener("touchstart",function(e){e.stopPropagation();},{passive:true});
  ttPanel.addEventListener("touchend",function(e){e.stopPropagation();},{passive:true});
  tt.addEventListener("click",function(e){
    if(currentTt!=="home"||tt.classList.contains("has-photo-post"))return;
    if(e.target.closest(".video-bg")||e.target.closest(".video-headline")){
      var realVideo=document.getElementById("deborah-video-playback");
      // First intentional tap can unlock audible playback on mobile.
      if(realVideo && realVideo.muted && window.DeborahMedia && !window.DeborahMedia.isSoundRequested()){
        window.DeborahMedia.toggleSound(realVideo);
        return;
      }
      var play=document.getElementById("video-play");
      if(play)play.click();
    }
  });
  var swipeStart=null;
  igScreen.addEventListener("touchstart",function(e){
    swipeStart=currentIg==="reels"&&e.touches.length===1&&!e.target.closest("button,a")
      ? {x:e.touches[0].clientX,y:e.touches[0].clientY} : null;
  },{passive:true});
  igScreen.addEventListener("touchend",function(e){
    var start=swipeStart;
    swipeStart=null;
    if(currentIg!=="reels"||!start||!e.changedTouches.length)return;
    var point=e.changedTouches[0];
    var delta=point.clientY-start.y;
    if(Math.abs(delta)>55&&Math.abs(delta)>Math.abs(point.clientX-start.x)*1.3){
      selectedReel=(selectedReel+(delta<0?1:-1)+reelItems().length)%reelItems().length;
      renderIgReel();
    }
  },{passive:true});
  igScreen.addEventListener("touchcancel",function(){swipeStart=null;},{passive:true});
  window.addEventListener("deborah:libraryready",function(){
    if(currentIg==="profile"){
      setIgFilter(igFilter);
    }else if(location.hash==="#instagram")setIgScreen(currentIg);
    if(location.hash==="#tiktok")setTtScreen(currentTt);
  });
  window.addEventListener("hashchange",socialMode);
  if(media.addEventListener)media.addEventListener("change",socialMode);
  else if(media.addListener)media.addListener(socialMode);
  socialMode();
})();
