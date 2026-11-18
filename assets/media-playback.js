/* Deborah Anastasio — one active media player, shared sound preference.
   Browsers disallow unsolicited unmuted autoplay. A user gesture can enable
   sound for this browsing session; all subsequent videos reuse the choice. */
(function () {
  "use strict";
  var soundRequested=false;
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
    try{v.pause();}catch(e){}
    if(active===v)active=null;
  }
  function pauseContainer(root){
    videos(root).forEach(safePause);
  }
  function stopAll(except){
    document.querySelectorAll("video").forEach(function(v){if(v!==except)safePause(v);});
  }
  function blockedByScreen(v){
    if(!v || !v.isConnected || document.hidden)return true;
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
    v.muted=!withSound;
    var promise;
    try{promise=v.play();}catch(e){promise=Promise.reject(e);}
    if(!promise || !promise.catch)return Promise.resolve(true);
    return promise.then(function(){return true;}).catch(function(){
      // A mobile browser may reject an unmuted autoplay. Fall back to muted
      // playback and leave the visible button available for a user gesture.
      if(blockedByScreen(v))return false;
      v.muted=true;
      try{
        var second=v.play();
        if(second && second.catch)return second.then(function(){return true;}).catch(function(){return false;});
        return true;
      }catch(e){return false;}
    });
  }
  function play(v,fromGesture){
    if(!v)return Promise.resolve(false);
    if(fromGesture)soundRequested=true;
    dispatchSound();
    return attemptPlay(v,soundRequested);
  }
  function toggleSound(v){
    v=v||active||document.querySelector("#deborah-video-playback");
    if(!v || blockedByScreen(v))return;
    soundRequested=!soundRequested;
    dispatchSound();
    if(soundRequested){
      // This function is invoked directly by a click/tap, which can unlock
      // audible playback on iOS/Android. Keep audio on when switching clips.
      v.muted=false;
      stopAll(v);
      active=v;
      var p=v.play();
      if(p && p.catch)p.catch(function(){
        v.muted=true;
        v.play().catch(function(){});
      });
    }else{
      v.muted=true;
      if(v.paused && !blockedByScreen(v))v.play().catch(function(){});
    }
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
          videos(node).forEach(safePause);
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
    isSoundRequested:function(){return soundRequested;}
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",startObserver,{once:true});
  else startObserver();
})();