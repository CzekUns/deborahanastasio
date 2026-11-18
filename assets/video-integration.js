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
var files=[];
var coverMap={};
var ready=false;
var player=document.getElementById("tiktok-player");
var videoImage=document.getElementById("video-image");
var videoStage=player&&player.querySelector(".video-bg");
var video=null;
var soundBtn=null;
var videoWasUnmuted=false;

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
  if(!items.length)return;
  var videoData=demo.videos;
  // Video slots are independent of cover files. We duplicate media when
  // fewer videos than grid cells are available, as requested for this demo.
  while(videoData.length<items.length){
    videoData.push({title:"",headline:"",caption:"",photo:"",method:""});
  }
  for(var i=0;i<videoData.length;i++){
    var asset=items[i%items.length];
    var v=videoData[i];
    v.src=asset.src;
    v.title=asset.title;
    v.photo=asset.cover;
    v.cover=asset.cover;
    v.caption="Deborah Anastasio · "+asset.title;
    v.headline="";
    v.method="Video presente nel repository GitHub; la copertina è indipendente dal filmato e sarà sostituibile.";
  }
  demo.posts.forEach(function(p,index){
    var asset=items[index%items.length];
    p.videoSrc=asset.src;
    p.img=asset.cover;
    p.cover=asset.cover;
    p.title=asset.title;
    p.caption="Deborah Anastasio · "+asset.title;
    p.idea="Video originale caricato nella repository. Copertina temporanea, modificabile senza toccare il video.";
  });
  // Keep the Instagram wall in three columns, each tile 4:5.
  document.querySelectorAll("#ig-grid [data-post]").forEach(function(tile,i){
    var asset=items[i%items.length];
    tile.className="ig-tile image-tile has-video";
    tile.innerHTML='<img src="'+asset.cover+'" alt="Copertina temporanea: '+asset.title.replace(/"/g,"&quot;")+'" loading="lazy"><span class="tile-reel-mark">▶</span>';
  });
  // Update the desktop side-navigation without pretending that a still image
  // is a moving video.
  var list=document.getElementById("format-list");
  if(list){
    list.innerHTML=videoData.map(function(v,i){
      return '<button type="button" data-video="'+i+'"'+(i===0?' class="active"':'')+'><span>'+String(i+1).padStart(2,"0")+'</span><div><b>'+v.title.replace(/[&<>"]/g,function(x){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[x];})+'</b><small>Video dalla repository</small></div><span>↗</span></button>';
    }).join("");
  }
  ready=true;
  window.dispatchEvent(new CustomEvent("deborah:libraryready",{detail:{count:items.length,files:items.map(function(x){return x.path;})}}));
  demo.setVideo(0);
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
  soundBtn.textContent="♫";
  var actions=player.querySelector(".tiktok-actions");
  if(actions)actions.appendChild(soundBtn);
  soundBtn.addEventListener("click",function(e){
    e.stopPropagation();
    videoWasUnmuted=!videoWasUnmuted;
    video.muted=!videoWasUnmuted;
    soundBtn.textContent=videoWasUnmuted?"♪":"♫";
    soundBtn.setAttribute("aria-label",videoWasUnmuted?"Disattiva audio":"Attiva audio");
    if(video.paused)video.play().catch(function(){});
  });
  var playbackButton=document.getElementById("video-play");
  if(playbackButton)playbackButton.addEventListener("click",function(){
    if(!ready || !demo.videos[demo.getVideoIndex()].src)return;
    if(player.classList.contains("paused"))video.pause();
    else video.play().catch(function(){});
  });
}
function syncPlayer(){
  if(!ready || !player)return;
  ensureVideo();
  var index=demo.getVideoIndex();
  var entry=demo.videos[index];
  if(!entry || !entry.src)return;
  var url=entry.src;
  if(video.getAttribute("src")!==url){
    video.pause();
    video.setAttribute("src",url);
    video.load();
  }
  video.poster=entry.cover||entry.photo||"";
  video.muted=!videoWasUnmuted;
  video.hidden=false;
  videoImage.hidden=true;
  player.classList.add("has-real-video");
  var soundline=player.querySelector(".soundline");
  if(soundline)soundline.textContent="♫  Audio originale · Deborah Anastasio";
  var note=player.querySelector(".video-concept");
  if(note)note.textContent="VIDEO DAL REPOSITORY · COPERTINA PROVVISORIA";
  if(soundBtn)soundBtn.hidden=false;
  if(!player.classList.contains("paused") && location.hash==="#tiktok"){
    var result=video.play();
    if(result && result.catch)result.catch(function(){ /* Playback requires gesture on some devices. */ });
  }else video.pause();
}
document.addEventListener("visibilitychange",function(){
  if(!video)return;
  if(document.hidden)video.pause();
  else if(ready && location.hash==="#tiktok" && !player.classList.contains("paused"))video.play().catch(function(){});
});
window.addEventListener("hashchange",function(){
  if(!video)return;
  if(location.hash==="#tiktok" && ready && !player.classList.contains("paused"))video.play().catch(function(){});
  else video.pause();
});
window.addEventListener("deborah:videochange",syncPlayer);
Promise.all([
  fetch(COVER_MAP,{cache:"no-store"}).then(function(r){return r.ok?r.json():{};}).catch(function(){return {};}),
  fetch(TREE_URL,{cache:"no-store"}).then(function(r){if(!r.ok)throw Error("GitHub API "+r.status);return r.json();})
]).then(function(results){
  var info=results[0]||{};
  coverMap=info.covers||{};
  var tree=results[1];
  if(!tree || !Array.isArray(tree.tree))return;
  var paths=tree.tree.filter(function(entry){
    return entry.type==="blob"&&isVideo(entry.path)&&!/(^|\/)(node_modules|dist|backup|archive|test)(\/|$)/i.test(entry.path);
  }).map(function(entry){return entry.path;});
  paths.sort(function(a,b){return a.localeCompare(b,"it",{numeric:true,sensitivity:"base"});});
  var entries=paths.map(function(path,i){
    var namedCover=coverMap[path];
    var cover=(namedCover&&isCover(namedCover))? "./"+safeLocalPath(namedCover.replace(/^\.\//,"")):
      (i%2===0?"./assets/deborah-cover-rosa-4x5.webp":"./assets/deborah-gallery-san-valentino-4x5.webp");
    return {path:path,src:"./"+safeLocalPath(path),cover:cover,title:shortLabel(path,i)};
  });
  updateMedia(entries);
}).catch(function(e){
  console.warn("Deborah media auto-discovery not available:",e);
  /* Do not claim files exist; the original static storyboard stays visible. */
});
})();