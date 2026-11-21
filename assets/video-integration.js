/* Deborah Anastasio — GitHub video integration.
   Video and cover are separate. Only files actually present in the public
   repository are played; all placeholders remain intact if no files exist. */
(function(){
"use strict";
var demo=window.DeborahDemo;
if(!demo)return;
var REPOSITORY="CzekUns/deborahanastasio";
var TREE_URL="https://api.github.com/repos/"+REPOSITORY+"/git/trees/main?recursive=1";
var COVER_MAP="./assets/video-covers.json";
var VERIFIED_MANIFEST="./assets/videos.json";
var files=[];
var coverMap={};
var ready=false;
var player=document.getElementById("tiktok-player");
var videoImage=document.getElementById("video-image");
var videoStage=player&&player.querySelector(".video-bg");
var video=null;
var soundBtn=null;
// Sound preference is shared across all Instagram and TikTok players.

function safeLocalPath(s){
  return String(s||"").split("/").map(encodeURIComponent).join("/");
}
function isVideo(p){return /\.(mp4|webm|m4v)$/i.test(p);}
function isCover(p){return /\.(webp|png|jpe?g)$/i.test(p);}
function shortLabel(path,i){
  var base=path.split("/").pop().replace(/\.(mp4|webm|m4v)$/i,"");
  var readable=base.replace(/^deborah[-_ ]?/i,"").replace(/[-_]+/g," ").trim();
  if(readable && readable.length<=35 && /[A-Za-z]{3,}/.test(readable))return readable;
  return "Video "+String(i+1).padStart(2,"0");
}
function updateMedia(items){
  files=items;
  var videoData=demo.videos;
  videoData.length=0;
  items.forEach(function(asset){
    videoData.push({
      src:asset.src,title:asset.title,photo:asset.cover,cover:asset.cover,
      caption:asset.caption||("Deborah Anastasio · "+asset.title),
      headline:"",method:"",photoPost:false
    });
  });
  // Nove Reel originali e distinti: Tutto Sposi sostituisce la locandina
  // di San Valentino come nono post, su Instagram e TikTok.
  demo.posts.length=0;
  items.forEach(function(asset){
    demo.posts.push({
      title:asset.title,type:"Video",videoSrc:asset.src,img:asset.cover,cover:asset.cover,
      caption:asset.caption||("Deborah Anastasio · "+asset.title)
    });
  });
  var grid=document.getElementById("ig-grid");
  if(grid){
    grid.innerHTML=demo.posts.map(function(p,i){
      var title=p.title.replace(/[&<>"]/g,function(x){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[x];});
      return '<button type="button" data-post="'+i+'" class="ig-tile image-tile'+(p.videoSrc?' has-video':'')+'">'+
        '<img src="'+p.img+'" alt="'+title+'" loading="lazy">'+
        (p.videoSrc?'<span class="tile-reel-mark" aria-hidden="true">▶</span>':'')+'</button>';
    }).join("");
  }
  var list=document.getElementById("format-list");
  if(list){
    list.innerHTML=videoData.map(function(v,i){
      var title=v.title.replace(/[&<>"]/g,function(x){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[x];});
      return '<button type="button" data-video="'+i+'"'+(i===0?' class="active"':'')+
      '><span>'+String(i+1).padStart(2,"0")+'</span><div><b>'+title+
      '</b><small>'+(v.photoPost?'Foto · Villa Gauro':'Video dal vivo')+'</small></div><span>↗</span></button>';
    }).join("");
  }
  ready=true;
  window.dispatchEvent(new CustomEvent("deborah:libraryready",{
    detail:{count:items.length,files:items.map(function(x){return x.path;})}
  }));
  if(videoData.length)demo.setVideo(0);
}
function ensureVideo(){
  if(!videoStage || video)return;
  video=document.createElement("video");
  video.id="deborah-video-playback";
  video.className="real-social-video";
  video.setAttribute("playsinline","");
  video.setAttribute("webkit-playsinline","");
  video.preload="metadata";
  video.autoplay=false;
  video.loop=true;
  video.muted=false;
  video.controls=false;
  video.setAttribute("aria-label","Video originale Deborah Anastasio");
  videoStage.insertBefore(video,videoStage.querySelector(".video-vignette"));
  video.addEventListener("loadedmetadata",function(){
    video.classList.toggle("portrait-video",video.videoHeight>video.videoWidth);
  });
  video.addEventListener("error",function(){
    player.classList.add("has-real-video");
    video.hidden=false;
    videoImage.hidden=true;
    var note=player.querySelector(".video-concept");
    if(note)note.textContent="Video non disponibile";
    if(soundBtn)soundBtn.hidden=true;
  });
  soundBtn=document.createElement("button");
  soundBtn.type="button";
  soundBtn.id="deborah-sound-toggle";
  soundBtn.className="tiktok-sound-toggle";
  soundBtn.setAttribute("aria-label","Attiva audio");
  soundBtn.textContent="♫ Attiva audio";
  soundBtn.setAttribute("data-deborah-audio-toggle","true");
  var actions=player.querySelector(".tiktok-actions");
  if(actions)actions.appendChild(soundBtn);
  // All sound buttons now use the shared media manager, preserving
  // the user's choice when swiping between videos or changing apps.
  var playbackButton=document.getElementById("video-play");
  if(playbackButton)playbackButton.addEventListener("click",function(){
    if(!ready || !demo.videos[demo.getVideoIndex()].src)return;
    if(player.classList.contains("paused"))video.pause();
    else if(window.DeborahMedia)window.DeborahMedia.play(video,true);
  });
}
function syncPlayer(event){
  if(!ready || !player)return;
  ensureVideo();
  var index=demo.getVideoIndex();
  var entry=demo.videos[index];
  if(entry && entry.photoPost){
    video.pause();
    if(video.hasAttribute("src")){
      video.removeAttribute("src");
      video.load();
    }
    video.hidden=true;
    videoImage.src=entry.photo;
    videoImage.hidden=false;
    player.classList.remove("has-real-video");
    player.classList.add("has-photo-post");
    var photoSoundline=player.querySelector(".soundline");
    if(photoSoundline)photoSoundline.textContent="▧ Foto d’archivio";
    var photoNote=player.querySelector(".video-concept");
    if(photoNote)photoNote.textContent="DAL MIO ARCHIVIO";
    if(soundBtn)soundBtn.hidden=true;
    return;
  }
  player.classList.remove("has-photo-post");
  if(!entry || !entry.src)return;
  var url=entry.src;
  if(video.getAttribute("src")!==url){
    video.pause();
    video.classList.remove("portrait-video");
    video.setAttribute("src",url);
    video.load();
  }
  video.removeAttribute("poster");
  video.muted=!(window.DeborahMedia && window.DeborahMedia.isSoundRequested());
  video.hidden=false;
  videoImage.hidden=true;
  player.classList.add("has-real-video");
  var soundline=player.querySelector(".soundline");
  if(soundline)soundline.textContent="♫  Audio originale · Deborah Anastasio";
  var note=player.querySelector(".video-concept");
  if(note)note.textContent="Deborah Anastasio";
  if(soundBtn)soundBtn.hidden=false;
  if(!player.classList.contains("paused") && location.hash==="#tiktok" && !player.classList.contains("tt-native-open")){
    if(window.DeborahMedia)window.DeborahMedia.play(video,!!(event && event.detail && event.detail.fromGesture));
  }else video.pause();
}
// Route/visibility/overlay lifecycle is owned by the shared media manager.
window.addEventListener("deborah:videochange",syncPlayer);
function chooseVideoFiles(repositoryTree,verifiedInventory){
  var verified=Array.isArray(verifiedInventory.videos)?verifiedInventory.videos:[];
  var present=repositoryTree&&Array.isArray(repositoryTree.tree)?
    new Set(repositoryTree.tree.filter(function(e){return e.type==="blob" && isVideo(e.path);})
      .map(function(e){return e.path;})):null;
  var seen={};
  return verified.filter(function(entry){
    if(entry.featured===false)return false;
    var identity=entry.sha||entry.path;
    if(!entry.path || seen[identity] || (present && !present.has(entry.path)))return false;
    seen[identity]=true;
    return true;
  });
}
// Prefer the checked-in editorial catalog embedded in the page.
// This avoids API rate limits, stale JSON fetches and generic placeholder captions.
function embeddedJSON(id){
  var node=document.getElementById(id);
  if(!node)return null;
  try{return JSON.parse(node.textContent);}catch(e){console.error("Invalid embedded media catalog",e);return null;}
}
function loadEditorialMedia(inventory,covers){
  var entries=chooseVideoFiles(null,inventory).map(function(file,i){
    var path=file.path;
    var namedCover=(covers.covers||{})[path];
    var known=inventory.videos.find(function(v){return v.path===path;})||file;
    return {
      path:path,
      src:"./"+safeLocalPath(path),
      cover:namedCover&&isCover(namedCover)?"./"+safeLocalPath(namedCover.replace(/^\.\//,"")):"./assets/deborah-avatar-centrato-ai.webp",
      title:known.title||shortLabel(path,i),
      caption:known.caption||""
    };
  });
  updateMedia(entries);
}
var builtInInventory=embeddedJSON("deborah-video-catalog");
var builtInCovers=embeddedJSON("deborah-video-covers");
if(builtInInventory && Array.isArray(builtInInventory.videos)){
  loadEditorialMedia(builtInInventory,builtInCovers||{});
}else{
  Promise.all([
    fetch(COVER_MAP,{cache:"no-store"}).then(function(r){return r.ok?r.json():{};}).catch(function(){return {};}),
    fetch(VERIFIED_MANIFEST,{cache:"no-store"}).then(function(r){return r.ok?r.json():{};}).catch(function(){return {};})
  ]).then(function(results){
    loadEditorialMedia(results[1],results[0]);
  }).catch(function(e){
    console.error("Deborah editorial catalog unavailable",e);
  });
}
})();
