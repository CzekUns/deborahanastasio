/* Deborah Anastasio — one active video, sound enabled on opening.
   When audible autoplay is blocked, offer an explicit play-with-audio button. */
(function () {
  "use strict";
  var soundRequested=true;
  var playbackRequest=0;
  var active=null;
  var handlersBound=false;
  var observer=null;

  function routeName(){
    var h=(location.hash||"").slice(1).toLowerCase();
    return h.indexOf("site-")===0?"sito":h;
  }
  function videos(root){
    var list=[];
    if(!root) return list;
    if(root.nodeType===1 && root.tagName==="VIDEO")list.push(root);
    if(root.querySelectorAll)root.querySelectorAll("video").forEach(function(v){list.push(v);});
    return list;
  }
  function safePause(v){
    if(!v || typeof v.pause!=="function")return;
    if(active===v)playbackRequest++;
    try{v.pause();}catch(e){}
    if(active===v)active=null;
  }
  function pauseContainer(root){
    videos(root).forEach(safePause);
  }
  function stopAll(except){
    document.querySelectorAll("video").forEach(function(v){if(v!==except)safePause(v);});
    document.querySelectorAll("[data-deborah-start]").forEach(function(button){
      if(button.mediaVideo!==except)button.remove();
    });
  }
  function blockedByScreen(v){
    if(!v || !v.isConnected || document.hidden || v.hidden || v.closest(".has-photo-post"))return true;
    var view=v.closest("[data-view]");
    if(view && view.hidden)return true;
    var route=routeName();
    if(view && view.dataset.view!==route)return true;
    var mobileOverlay=document.getElementById("native-social-overlay");
    if(mobileOverlay && !mobileOverlay.hidden && !mobileOverlay.contains(v))return true;
    var desktopDialog=document.getElementById("dialog-backdrop");
    if(desktopDialog && !desktopDialog.hidden && !desktopDialog.contains(v))return true;
    var igScreen=v.closest("#ig-native-screen");
    if(igScreen && igScreen.hidden)return true;
    var tt=v.closest("#tiktok-player");
    if(tt && tt.classList.contains("tt-native-open"))return true;
    return false;
  }
  function dispatchSound(){
    document.dispatchEvent(new CustomEvent("deborah:soundchange",{detail:{enabled:soundRequested}}));
    document.querySelectorAll("[data-deborah-audio-toggle]").forEach(function(b){
      var host=b.closest(".native-feed-visual,.ig-post-video-frame,.ig-reels-stage,#tiktok-player");
      var media=host && host.querySelector("video");
      var audible=!!(soundRequested && media && !media.muted);
      var label=audible?"Disattiva audio":"Attiva audio";
      b.setAttribute("aria-label",label);
      b.setAttribute("aria-pressed",audible?"true":"false");
      var nextText=b.id==="deborah-sound-toggle"?(audible?"♪ Attivo":"♫ Audio"):(audible?"♪ Audio attivo":"♫ Attiva audio");
      if(b.textContent!==nextText)b.textContent=nextText;
    });
  }
  function ensureButtons(){
    // TikTok already has its button in the right action rail.
    document.querySelectorAll("video.native-feed-video,video.native-detail-video,video.ig-reel-video").forEach(function(v){
      var host=v.closest(".native-feed-visual,.ig-post-video-frame,.ig-reels-stage");
      if(!host || host.querySelector("[data-deborah-audio-toggle]"))return;
      var b=document.createElement("button");
      b.type="button";
      b.className="deb-audio-toggle";
      b.dataset.deborahAudioToggle="true";
      b.textContent="♫ Attiva audio";
      host.appendChild(b);
    });
    dispatchSound();
  }
  function attemptPlay(v,withSound){
    if(!v || blockedByScreen(v)){safePause(v);return Promise.resolve(false);}
    stopAll(v);
    active=v;
    var request=++playbackRequest;
    v.muted=!withSound;
    v.defaultMuted=false;
    v.removeAttribute("muted");
    var promise;
    try{promise=v.play();}catch(e){promise=Promise.reject(e);}
    if(!promise || !promise.catch)return Promise.resolve(true);
    return promise.then(function(){
      if(request!==playbackRequest || blockedByScreen(v))return false;
      document.querySelectorAll("[data-deborah-start]").forEach(function(b){
        if(b.mediaVideo===v)b.remove();
      });
      dispatchSound();
      return true;
    }).catch(function(error){
      if(request!==playbackRequest || blockedByScreen(v) || active!==v)return false;
      if(error.name==="NotAllowedError"){
        v.pause();
        var host=v.closest(".ig-post-video-frame,.ig-reels-stage,.native-story-view,.dialog-card,#tiktok-player");
        if(host && !host.querySelector("[data-deborah-start]")){
          var button=document.createElement("button");
          button.type="button";
          button.className="deb-start-with-audio";
          button.dataset.deborahStart="true";
          button.mediaVideo=v;
          button.textContent="▶ Avvia con audio";
          host.appendChild(button);
        }
      }
      return false;
    });
  }
  function play(v,fromGesture){
    if(!v)return Promise.resolve(false);
    if(fromGesture){
      soundRequested=true;
      v.volume=1;
    }
    dispatchSound();
    return attemptPlay(v,soundRequested);
  }
  function requestSound(){
    soundRequested=true;
    dispatchSound();
  }
  function toggleSound(v){
    v=v||active||document.querySelector("#deborah-video-playback");
    if(!v || blockedByScreen(v))return;
    soundRequested=!soundRequested;
    attemptPlay(v,soundRequested);
    dispatchSound();
  }
  function refreshContext(){
    document.querySelectorAll("video").forEach(function(v){if(blockedByScreen(v))safePause(v);});
    var tt=document.getElementById("tiktok-player");
    var ttVid=document.getElementById("deborah-video-playback");
    if(ttVid && tt && !tt.classList.contains("paused") && !blockedByScreen(ttVid) && routeName()==="tiktok"){
      attemptPlay(ttVid,soundRequested);
    }
  }

  document.addEventListener("click",function(event){
    var start=event.target.closest("[data-deborah-start]");
    if(start){
      event.preventDefault();
      event.stopPropagation();
      play(start.mediaVideo,true);
      return;
    }
    var button=event.target.closest("[data-deborah-audio-toggle]");
    if(!button)return;
    event.preventDefault();
    event.stopPropagation();
    var host=button.closest(".native-feed-visual,.ig-post-video-frame,.ig-reels-stage,#tiktok-player");
    var v=host && host.querySelector("video");
    if(!v && button.id==="deborah-sound-toggle")v=document.getElementById("deborah-video-playback");
    toggleSound(v);
  },true);
  document.addEventListener("play",function(event){
    var v=event.target;
    if(!v || v.tagName!=="VIDEO")return;
    if(blockedByScreen(v)){safePause(v);return;}
    stopAll(v); active=v;
    // Leave muted fallback intact: forcing unmute during a play event can
    // trigger another autoplay rejection on mobile browsers.
  },true);
  document.addEventListener("visibilitychange",function(){
    if(document.hidden)stopAll();else refreshContext();
  });
  window.addEventListener("pagehide",function(){stopAll();});
  window.addEventListener("blur",function(){stopAll();});
  window.addEventListener("focus",function(){refreshContext();});
  document.addEventListener("volumechange",function(event){
    if(event.target && event.target.tagName==="VIDEO")dispatchSound();
  },true);
  window.addEventListener("hashchange",function(){
    stopAll();
    // Defer resumption until the original routing listeners finish.
    setTimeout(refreshContext,0);
  });
  document.addEventListener("deborah:contextchange",refreshContext);
  document.addEventListener("deborah:videochange",function(){stopAll();});
  function startObserver(){
    if(observer || !document.body)return;
    observer=new MutationObserver(function(changes){
      var removed=false,added=false;
      changes.forEach(function(change){
        change.removedNodes.forEach(function(node){
          videos(node).forEach(function(v){
            if(!v.isConnected || blockedByScreen(v))safePause(v);
          });
          removed=true;
        });
        if(change.addedNodes.length)added=true;
      });
      if(added)ensureButtons();
      if(removed && active && !active.isConnected)safePause(active);
    });
    observer.observe(document.body,{childList:true,subtree:true});
    ensureButtons();
  }
  window.DeborahMedia={
    play:play,
    pauseContainer:pauseContainer,
    stopAll:stopAll,
    toggleSound:toggleSound,
    refreshContext:refreshContext,
    isSoundRequested:function(){return soundRequested;},
    requestSound:requestSound
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",startObserver,{once:true});
  else startObserver();
})();
