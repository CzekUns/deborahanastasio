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
  // La locandina resta il nono contenuto, dopo gli otto video.
  videoData.push({
    title:"San Valentino · Villa Gauro",
    headline:"",
    caption:"Un ricordo di una serata di San Valentino a Villa Gauro. Bacio grande! ❤️ #DeborahAnastasio #Live",
    photo:"./assets/deborah-sanvalentino-originale-hq.jpg",
    cover:"./assets/deborah-sanvalentino-originale-hq.jpg",
    photoPost:true,src:null,method:""
  });

  // Instagram: otto Reel, poi la sola locandina d'archivio.
  // Nessuna fotografia rosa tra i post e nessun contenuto ripetuto.
  var photoPosts=demo.posts.filter(function(p){return p.editorialStatic && p.img && !/deborah-cover-rosa-4x5\.webp/.test(p.img);});
  var uniquePhotos=[];
  var usedImages={};
  photoPosts.forEach(function(p){
    if(!usedImages[p.img]){usedImages[p.img]=true;uniquePhotos.push(p);}
  });
  demo.posts.length=0;
  items.forEach(function(asset){
    demo.posts.push({
      title:asset.title,type:"Video",videoSrc:asset.src,img:asset.cover,cover:asset.cover,
      caption:asset.caption||("Deborah Anastasio · "+asset.title)
    });
  });
  uniquePhotos.forEach(function(p){demo.posts.push(p);});
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
  video.autoplay=true;
  video.loop=true;
  video.muted=true;
  video.controls=false;
  video.setAttribute("aria-label","Video originale Deborah Anastasio");
  videoStage.insertBefore(video,videoStage.querySelector(".video-vignette"));
  video.addEventListener("loadedmetadata",function(){
    video.classList.toggle("portrait-video",video.videoHeight>video.videoWidth);
  });
  video.addEventListener("error",function(){
    player.classList.remove("has-real-video");
    video.hidden=true;
    videoImage.hidden=false;
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
    else if(window.DeborahMedia)window.DeborahMedia.play(video,false);
  });
}
function syncPlayer(){
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
    if(photoSoundline)photoSoundline.textContent="▧ Foto d’archivio · San Valentino · Villa Gauro";
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
  video.poster=entry.cover||entry.photo||"";
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
    if(window.DeborahMedia)window.DeborahMedia.play(video,false);
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
Promise.all([
  fetch(COVER_MAP,{cache:"no-store"}).then(function(r){return r.ok?r.json():{};}).catch(function(){return {};}),
  fetch(VERIFIED_MANIFEST,{cache:"no-store"}).then(function(r){return r.ok?r.json():{};}).catch(function(){return {};}),
  fetch(TREE_URL,{cache:"no-store"}).then(function(r){return r.ok?r.json():null;}).catch(function(){return null;})
]).then(function(results){
  var info=results[0]||{};
  coverMap=info.covers||{};
  var verifiedInventory=results[1]||{};
  var tree=results[2];
  var selected=chooseVideoFiles(tree,verifiedInventory);
  var entries=selected.map(function(file,i){
    var path=file.path;
    var namedCover=coverMap[path];
    var cover=(namedCover&&isCover(namedCover))? "./"+safeLocalPath(namedCover.replace(/^\.\//,"")):
      "./assets/deborah-avatar-centrato-ai.webp";
    var known=Array.isArray(verifiedInventory.videos)?verifiedInventory.videos.find(function(v){
      return v.sha&&v.sha===file.sha || v.path===path;
    }):null;
    return {
      path:path,
      src:"./"+safeLocalPath(path),
      cover:cover,
      title:known&&known.title?known.title:shortLabel(path,i),
      caption:known&&known.caption?known.caption:""
    };
  });
  updateMedia(entries);
}).catch(function(e){
  console.warn("Deborah media discovery unavailable:",e);
  // No fake video playback. Keep the static preview when no media is available.
});
})();