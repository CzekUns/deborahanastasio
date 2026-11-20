#!/usr/bin/env python3
"""Extract review-only story cover candidates from repository video sources."""
import json
import math
import subprocess
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont, ImageFilter, ImageStat

OUT=Path("assets/storie/provini")
OUT.mkdir(parents=True,exist_ok=True)
INPUTS=[
    ("E1","Eventi 1","deborah_media/eventi 1.mp4"),
    ("E2","Eventi 2","deborah_media/eventi 2.mp4"),
    ("E3","Eventi 3","deborah_media/eventi 3.mp4"),
    ("V1","La mia voce 1","deborah_media/la mia voce 1.mp4"),
    ("V2","La mia voce 2","deborah_media/la mia voce 2.mp4"),
]
def duration(path):
    p=subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",path],text=True).strip()
    return float(p)
def grab(path,t,out,width=720):
    subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y","-ss",f"{t:.3f}","-i",path,
                    "-frames:v","1","-vf",f"scale={width}:-2","-q:v","3",str(out)],
                   check=True,stdout=subprocess.DEVNULL)
def load_font(size,bold=False):
    name="DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/"+name,size)
def rank(im):
    g=im.convert("L").resize((140,180))
    st=ImageStat.Stat(g)
    sharp=ImageStat.Stat(g.filter(ImageFilter.FIND_EDGES)).stddev[0]
    mean=st.mean[0]
    return sharp-min(28,abs(mean-125)*.16)
index={"version":1,"status":"candidates-not-covers","source":"Original uploaded GitHub story videos","videos":[]}
for prefix,title,path in INPUTS:
    d=duration(path)
    print("Extracting",title,path,"duration",round(d,2),flush=True)
    shots=[]
    for n in range(8):
        # Mirror the browser selector's exact frame timestamps.
        # This matters after the user's E1-06 / E2-07 / E3-03 / V1-01 / V2-04 selections:
        # using a nearby but different "sharper" frame would change their chosen poses.
        t=max(.05,min(d-.15,d*(.065+.87*(n+.5)/8)))
        name=f"{prefix}-{n+1:02d}.jpg"
        photo=OUT/name
        grab(path,t,photo,860)
        shots.append({"id":f"{prefix}-{n+1:02d}","timeSeconds":round(t,2),
                      "timeLabel":f"{int(t//60):02d}:{int(t%60):02d}",
                      "image":f"./assets/storie/provini/{name}"})
    index["videos"].append({"id":prefix,"title":title,"durationSeconds":round(d,2),
                            "source":path,"frames":shots})
    # One easy-to-compare contact sheet for each original video.
    cw,ch=260,350
    sheet=Image.new("RGB",(cw*4,ch*2),(35,25,34))
    draw=ImageDraw.Draw(sheet)
    for j,shot in enumerate(shots):
        with Image.open(OUT/f"{prefix}-{j+1:02d}.jpg") as raw:
            photo=ImageOps.contain(raw.convert("RGB"),(cw-12,ch-52))
        x=(j%4)*cw+(cw-photo.width)//2
        y=(j//4)*ch+8+(ch-52-photo.height)//2
        sheet.paste(photo,(x,y))
        bx=(j%4)*cw+10;by=(j//4)*ch+ch-34
        draw.text((bx,by),shot["id"]+"  "+shot["timeLabel"],font=load_font(15,True),fill="#ffe6cb")
    sheet.save(OUT/f"{prefix}-tavola.jpg",quality=90,optimize=True)
    print("Completed",prefix,flush=True)
(OUT/"index.json").write_text(json.dumps(index,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("All genuine source frames written.",flush=True)
