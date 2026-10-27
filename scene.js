import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const wrap=document.querySelector('#estateWrap'),mount=document.querySelector('#scene');
const sz=()=>({w:mount.clientWidth||wrap.clientWidth||1,h:mount.clientHeight||wrap.clientHeight||1});
const S0=sz();
const scene=new THREE.Scene();scene.background=null;
const camera=new THREE.PerspectiveCamera(42,S0.w/S0.h,.1,300);camera.position.set(31,21,45);
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(S0.w,S0.h,false);
renderer.setClearColor(0x000000,0);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.02;
mount.appendChild(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement);
controls.target.set(0,2,0);controls.enableDamping=true;controls.dampingFactor=.055;controls.minDistance=14;controls.maxDistance=90;
controls.maxPolarAngle=Math.PI*.48;controls.mouseButtons.LEFT=THREE.MOUSE.ROTATE;controls.mouseButtons.MIDDLE=THREE.MOUSE.DOLLY;controls.mouseButtons.RIGHT=THREE.MOUSE.PAN;
scene.add(new THREE.HemisphereLight(0x5a4a44,0x120a08,.55));
const sun=new THREE.DirectionalLight(0xffb27a,1.6);sun.position.set(-26,19,22);sun.castShadow=true;
sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-42;sun.shadow.camera.right=42;sun.shadow.camera.top=42;sun.shadow.camera.bottom=-42;sun.shadow.bias=-.00025;scene.add(sun);
const fill=new THREE.DirectionalLight(0x5f7280,.35);fill.position.set(20,14,-20);scene.add(fill);
const mat=(color,roughness=.82,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
const plaster=mat('#c3baac'),plasterShade=mat('#8a8175'),timber=mat('#241310'),timberLight=mat('#6e1d16'),darkWood=mat('#130d0c'),roofMat=mat('#1a1615'),roofEdge=mat('#2e2522'),stone=mat('#55504a'),paving=mat('#6b665d'),paleStone=mat('#8b857a'),gold=mat('#b8903f',.4,.7);
const waterMat=new THREE.MeshStandardMaterial({color:'#161e1e',roughness:.25,metalness:.2});
const leafMats=['#2b3a2e','#3a4a34','#4a3a2e','#1f2b24'].map(c=>mat(c));
const windowGlow=new THREE.MeshStandardMaterial({color:'#b98a52',emissive:'#8a4a16',emissiveIntensity:.75,roughness:.92});
const gc=document.createElement('canvas');gc.width=gc.height=256;const gx=gc.getContext('2d');
gx.fillStyle='#777d70';gx.fillRect(0,0,256,256);
for(let i=0;i<1700;i++){const v=95+Math.random()*55;gx.fillStyle=`rgba(${v},${v+4},${v-4},${Math.random()*.12})`;gx.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*3,1+Math.random()*3);}
const groundTex=new THREE.CanvasTexture(gc);groundTex.wrapS=groundTex.wrapT=THREE.RepeatWrapping;groundTex.repeat.set(6,6);groundTex.colorSpace=THREE.SRGBColorSpace;
const groundMat=new THREE.MeshStandardMaterial({map:groundTex,color:'#5c4a3e',roughness:1});groundMat.transparent=true;
groundMat.onBeforeCompile=function(shader){shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vGroundW;').replace('#include <project_vertex>','#include <project_vertex>\nvGroundW=(modelMatrix*vec4(position,1.0)).xyz;');shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vGroundW;').replace('#include <dithering_fragment>','#include <dithering_fragment>\nfloat _gr=length(vGroundW.xz)/24.0;\ngl_FragColor.a*=smoothstep(1.0,0.30,_gr);');};
const ground=new THREE.Mesh(new THREE.PlaneGeometry(60,60),groundMat);ground.rotation.x=-Math.PI/2;ground.position.y=-.28;ground.receiveShadow=true;scene.add(ground);
const world=new THREE.Group();scene.add(world);const lanterns=[];
function box(parent,w,h,d,material,x,y,z,cast=true){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);o.position.set(x,y,z);o.castShadow=cast;o.receiveShadow=true;parent.add(o);return o;}
function cyl(parent,r1,r2,h,material,x,y,z,seg=12){const o=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,seg),material);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
function beam(parent,a,b,r,material,radial=8){const A=new THREE.Vector3(...a),B=new THREE.Vector3(...b);const dir=new THREE.Vector3().subVectors(B,A);const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,dir.length(),radial),material);m.position.copy(A).add(B).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());m.castShadow=true;parent.add(m);return m;}
function roof(parent,cx,cy,cz,w,d,material=roofMat,opts={}){
const g=new THREE.Group();g.position.set(cx,cy,cz);parent.add(g);
const hw=w/2,hd=d/2,rise=opts.rise||Math.min(1.25,Math.min(w,d)*.25),ridgeHalf=Math.max(.2,hw-hd*.62);
const tileLight=mat('#69716a',.72),ridgeMat=roofEdge,eaveLift=Math.min(.28,Math.min(w,d)*.07);
function sp(u,t,side){const x=(-ridgeHalf+u*2*ridgeHalf)*(1-t)+(-hw+u*2*hw)*t;const z=side*hd*t;const corner=Math.pow(Math.abs(u*2-1),2)*eaveLift*t*t;return[x,rise*(1-t)+corner,z];}
function plane(side){const pos=[],idx=[],nu=20,nt=9;for(let i=0;i<=nu;i++)for(let j=0;j<=nt;j++)pos.push(...sp(i/nu,j/nt,side));for(let i=0;i<nu;i++)for(let j=0;j<nt;j++){const a=i*(nt+1)+j,b=a+nt+1;if(side===1)idx.push(a,a+1,b,b,a+1,b+1);else idx.push(a,b,a+1,b,b+1,a+1);}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setIndex(idx);geo.computeVertexNormals();const mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:material.color,roughness:.82,side:THREE.DoubleSide}));mesh.castShadow=true;mesh.receiveShadow=true;g.add(mesh);}
plane(-1);plane(1);
function hip(sign){const pos=[],idx=[],nu=10,nt=9;for(let i=0;i<=nu;i++){const u=i/nu;for(let j=0;j<=nt;j++){const t=j/nt;const x=sign*(ridgeHalf*(1-t)+hw*t);const z=(u*2-1)*hd*t;const y=rise*(1-t)+Math.pow(Math.abs(u*2-1),2)*eaveLift*t*t;pos.push(x,y,z);}}for(let i=0;i<nu;i++)for(let j=0;j<nt;j++){const a=i*(nt+1)+j,b=a+nt+1;idx.push(a,b,a+1,b,b+1,a+1);}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setIndex(idx);geo.computeVertexNormals();const mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:material.color,roughness:.82,side:THREE.DoubleSide}));mesh.castShadow=true;mesh.receiveShadow=true;g.add(mesh);}
hip(-1);hip(1);
beam(g,[-hw,0,-hd],[hw,0,-hd],.075,darkWood,8);beam(g,[-hw,0,hd],[hw,0,hd],.075,darkWood,8);beam(g,[-hw,0,-hd],[-hw,0,hd],.07,darkWood,8);beam(g,[hw,0,-hd],[hw,0,hd],.07,darkWood,8);
for(const side of[-1,1]){for(let i=0;i<=10;i++){const u=i/10;beam(g,sp(u,.02,side),sp(u,1,side),.022,tileLight,5);}for(let row=1;row<=4;row++){const t=row/5;beam(g,sp(0,t,side),sp(1,t,side),.018,tileLight,5);}}
box(g,ridgeHalf*2+.16,.13,.22,ridgeMat,0,rise+.015,0);box(g,ridgeHalf*2-.12,.045,.12,tileLight,0,rise+.095,0);
for(const s of[-1,1]){const cap=new THREE.Mesh(new THREE.SphereGeometry(.105,10,8),ridgeMat);cap.position.set(s*(ridgeHalf+.04),rise+.10,0);cap.scale.set(1,.8,1);g.add(cap);for(const side of[-1,1]){const p0=[s*(hw-.22),.015,side*(hd-.22)],p1=[s*(hw+.02),eaveLift*.65,side*(hd+.02)],p2=[s*(hw+.16),eaveLift+Math.min(.18,eaveLift*.7),side*(hd+.16)];beam(g,p0,p1,.055,timberLight,7);beam(g,p1,p2,.043,timberLight,7);}}
for(const side of[-1,1])for(let x=-hw+.25;x<=hw-.2;x+=.42)box(g,.055,.12,.16,timberLight,x,-.035,side*(hd+.025),false);
return g;}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function drawIce(x,W,H){const r=rng(17);x.lineWidth=5;x.strokeRect(7,7,W-14,H-14);x.lineWidth=4;for(let i=0;i<26;i++){let px=r()*W,py=r()*H;x.beginPath();x.moveTo(px,py);const segs=1+Math.floor(r()*3);for(let k=0;k<segs;k++){px+=(r()-.5)*W*.62;py+=(r()-.5)*H*.62;x.lineTo(px,py);}x.stroke();}}
function drawHui(x,W,H){x.lineWidth=5;x.strokeRect(7,7,W-14,H-14);const cols=3,rows=4,cw=(W-14)/cols,ch=(H-14)/rows;x.lineWidth=3.6;for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){const ox=7+i*cw,oy=7+j*ch,m=cw*.17;x.beginPath();x.moveTo(ox+m*1.7,oy+m);x.lineTo(ox+cw-m*.75,oy+m);x.lineTo(ox+cw-m*.75,oy+ch-m*.75);x.lineTo(ox+m,oy+ch-m*.75);x.lineTo(ox+m,oy+m*2.5);x.stroke();}}
function drawFlower(x,W,H){x.lineWidth=5;x.strokeRect(7,7,W-14,H-14);const cx=W/2,cy=H/2,R=Math.min(W,H)*.33;x.beginPath();x.arc(cx,cy,R,0,Math.PI*2);x.stroke();x.lineWidth=3.6;x.beginPath();x.arc(cx,cy,R*.56,0,Math.PI*2);x.stroke();for(let k=0;k<8;k++){const a=k*Math.PI/4;x.beginPath();x.moveTo(cx+Math.cos(a)*R*.56,cy+Math.sin(a)*R*.56);x.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);x.stroke();}for(let k=0;k<4;k++){const a=Math.PI/4+k*Math.PI/2;x.beginPath();x.arc(cx+Math.cos(a)*R*1.28,cy+Math.sin(a)*R*1.28,R*.26,0,Math.PI*2);x.stroke();}}
const latCache={},paneMatCache={};
function latticeTex(kind){if(latCache[kind])return latCache[kind];const S=256,c=document.createElement('canvas');c.width=c.height=S;const x=c.getContext('2d');x.clearRect(0,0,S,S);x.strokeStyle='#8a4a30';x.lineCap='round';x.lineJoin='round';if(kind==='ice')drawIce(x,S,S);else if(kind==='hui')drawHui(x,S,S);else drawFlower(x,S,S);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;latCache[kind]=t;return t;}
function paneMat(kind){if(!paneMatCache[kind])paneMatCache[kind]=new THREE.MeshStandardMaterial({map:latticeTex(kind),alphaTest:.42,roughness:.85,metalness:.04,color:0xffffff,side:THREE.DoubleSide});return paneMatCache[kind];}
function latticePane(parent,w,h,kind,x,y,z){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),paneMat(kind));m.position.set(x,y,z);parent.add(m);return m;}
function windowFrame(parent,w,h,x,y,z,matF=timberLight){box(parent,w+.18,.075,.13,matF,x,y+h/2+.03,z,false);box(parent,w+.18,.075,.13,matF,x,y-h/2-.03,z,false);box(parent,.075,h+.14,.13,matF,x-w/2-.04,y,z,false);box(parent,.075,h+.14,.13,matF,x+w/2+.04,y,z,false);box(parent,w+.06,.055,.11,matF,x,y,z,false);}
function building(parent,x,z,w,d,opts={}){
const h=opts.h||3.2,baseY=opts.baseY||0,floors=opts.floors||1;
const group=new THREE.Group();group.position.set(x,baseY,z);parent.add(group);const front=d/2+.055;
box(group,w+.5,.42,d+.5,stone,0,.21,0);box(group,w,h,d,plaster,0,.42+h/2,0);box(group,w+.1,.15,d+.1,timber,0,.42+h,0);
for(const px of[-w/2+.12,w/2-.12])for(const pz of[-d/2+.12,d/2-.12])box(group,.22,h+.05,.22,timber,px,.44+h/2,pz);
box(group,w+.12,.2,.24,timberLight,0,.47+h,front);
const bays=5,bay=w/bays;
for(let i=0;i<bays;i++){const px=-w/2+bay*(i+.5);const isDoor=(i===2);const winW=bay*(isDoor?.74:.66);const winH=h*(isDoor?.68:.59);const winY=.46+winH/2+.22;box(group,winW+.16,winH+.16,.08,timber,px,winY,front+.015);const glow=!isDoor&&(i%3===1);box(group,winW,winH,.085,isDoor?darkWood:(glow?windowGlow:plasterShade),px,winY,front+.065);if(isDoor){box(group,winW*.46,winH*.96,.055,timberLight,px-winW*.25,winY,front+.12);box(group,winW*.46,winH*.96,.055,timberLight,px+winW*.25,winY,front+.12);latticePane(group,winW*.9,winH*.16,'hui',px,winY+winH*.40,front+.135);for(const dx of[-.25,.25]){box(group,.018,winH*.82,.018,gold,px+winW*dx,winY,front+.155,false);box(group,winW*.34,.025,.018,darkWood,px+winW*dx,winY+winH*.23,front+.16,false);box(group,.035,.08,.025,gold,px+winW*dx+(dx<0?winW*.1:-winW*.1),winY,front+.18,false);}}else{const kind=(i%2===0)?'ice':'hui';latticePane(group,winW*.94,winH*.94,kind,px,winY,front+.135);windowFrame(group,winW*.94,winH*.94,px,winY,front+.125);box(group,winW+.16,.09,.14,timberLight,px,winY-winH/2-.06,front+.1);}}
box(group,w+.52,.2,.42,darkWood,0,.42+h+.04,front-.02);
for(let px=-w/2+.45;px<w/2;px+=.9){box(group,.12,.28,.16,timberLight,px,.42+h+.16,front-.02);beam(group,[px,.42+h+.12,front-.08],[px+.22,.42+h+.34,front-.08],.055,timberLight,6);}
roof(group,0,.42+h+.18,0,w+1.05,d+1.0,roofMat,{rise:Math.min(1.35,Math.min(w,d)*.25)});
if(floors>=2){const y0=.42+h+.42,w2=w*.76,d2=d*.72,h2=opts.h2||h*.72;box(group,w2+.25,.3,d2+.25,stone,0,y0+.15,0);box(group,w2,h2,d2,plaster,0,y0+.3+h2/2,0);for(const px of[-w2/2+.1,w2/2-.1])for(const pz of[-d2/2+.1,d2/2-.1])box(group,.17,h2+.06,.17,timber,px,y0+.32+h2/2,pz);box(group,w2+.1,.15,d2+.1,timber,0,y0+.32+h2,0);const f2=d2/2+.055,winW=w2*.19,winH=h2*.55;for(let i=-2;i<=2;i++){const px=i*w2*.18,yy=y0+.38+h2*.52;const glow=(i%2===0);box(group,winW,winH,.075,timber,px,yy,f2+.015);box(group,winW*.9,winH*.9,.08,glow?windowGlow:darkWood,px,yy,f2+.06);latticePane(group,winW*.84,winH*.84,glow?'hui':'ice',px,yy,f2+.105);windowFrame(group,winW*.84,winH*.84,px,yy,f2+.1,timber);}box(group,w2+.38,.16,.6,stone,0,y0+.24,f2+.28);box(group,w2+.35,.11,.12,timberLight,0,y0+.95,f2+.54);for(let px=-w2/2;px<=w2/2+.01;px+=.42)box(group,.07,.72,.07,timberLight,px,y0+.58,f2+.54);for(let px=-w2/2+.3;px<=w2/2-.2;px+=.84)latticePane(group,.6,.44,'flower',px,y0+.62,f2+.5);roof(group,0,y0+.32+h2+.12,0,w2+.72,d2+.68,roofMat,{rise:Math.min(.95,Math.min(w2,d2)*.23)});}
return group;}
function corridor(parent,x,zStart,zEnd,width=2.45,postStep=2.65,baseY=.48){
const g=new THREE.Group();g.position.set(x,baseY,0);parent.add(g);
const zMin=Math.min(zStart,zEnd),zMax=Math.max(zStart,zEnd),length=zMax-zMin,zMid=(zMin+zMax)/2;
const colX=width*.38,postH=2.48,postY=postH/2+.08;
for(const side of[-1,1]){for(let z=zMin;z<=zMax+.01;z+=postStep){box(g,.42,.18,.42,stone,side*colX,.09,z,false);box(g,.20,postH,.20,timber,side*colX,postY,z);box(g,.28,.12,.28,timberLight,side*colX,postH+.10,z);box(g,.34,.13,.22,timberLight,side*colX,postH-.02,z);beam(g,[side*colX,postH-.10,z],[side*(colX+.22),postH+.12,z],.055,timberLight,6);}box(g,.20,.20,length,timberLight,side*colX,postH+.12,zMid);box(g,.13,.10,length,darkWood,side*colX,postH+.24,zMid);}
box(g,width*.48,.18,.18,darkWood,0,postH+.24,zMid);
for(let z=zMin;z<=zMax+.01;z+=postStep){beam(g,[-colX,postH+.25,z],[0,postH+.53,z],.055,timberLight,6);beam(g,[0,postH+.53,z],[colX,postH+.25,z],.055,timberLight,6);}
const r=roof(g,0,postH+.40,zMid,length+0.8,width+0.75,roofMat,{rise:Math.min(1.0,width*.30)});r.rotation.y=Math.PI/2;
for(const zz of[zMin-.05,zMax+.05])box(g,width*.72,.14,.16,timberLight,0,postH+.26,zz);
return g;}
box(world,34,.55,31,mat('#4a463e'),0,-.02,0);box(world,33,.16,30,paving,0,.31,0,false);
for(let x=-15;x<=15;x+=2.5)for(let z=-13;z<=13;z+=2.5)box(world,2.38,.035,2.38,(Math.abs((x+z)/2)%2<1)?paleStone:paving,x,.41,z,false);
for(const z of[-14.7]){box(world,33,.1,.45,stone,0,.54,z);box(world,33,2.3,.3,plaster,0,1.68,z);box(world,33.5,.16,.55,timber,0,2.87,z);for(let x=-15.5;x<=15.5;x+=3.1){box(world,.12,2.35,.38,plasterShade,x,1.68,z);box(world,.24,.16,.62,roofEdge,x,2.9,z);}}
for(const side of[-1,1]){const segCenter=side*9.1,segWidth=14.8;box(world,segWidth,.1,.45,stone,segCenter,.54,14.7);box(world,segWidth,2.3,.3,plaster,segCenter,1.68,14.7);box(world,segWidth+.5,.16,.55,timber,segCenter,2.87,14.7);for(let x=side===-1?-15.5:4.5;side===-1?x<=-4.5:x<=15.5;x+=3.1){box(world,.12,2.35,.38,plasterShade,x,1.68,14.7);box(world,.24,.16,.62,roofEdge,x,2.9,14.7);}}
for(const x of[-16.3,16.3]){box(world,.45,.1,29.4,stone,x,.54,0);box(world,.3,2.3,29.4,plaster,x,1.68,0);box(world,.55,.16,29.8,timber,x,2.87,0);for(let z=-13.5;z<=13.5;z+=3){box(world,.38,2.35,.12,plasterShade,x,1.68,z);box(world,.62,.16,.24,roofEdge,x,2.9,z);}}
building(world,0,-9,12.5,5.2,{h:3.6,floors:2,h2:2.5});building(world,0,0,10.2,4.8,{h:3.35,floors:2,h2:2.25});building(world,0,8.7,8.4,4.2,{h:3.0});building(world,-11,-8,4.4,4.5,{h:2.7});building(world,11,-8,4.4,4.5,{h:2.7});building(world,-10.8,1.5,4.2,4.2,{h:2.65});building(world,10.8,1.5,4.2,4.2,{h:2.65});
corridor(world,-7.55,-11.8,10.9,2.35,2.55,.40);corridor(world,7.55,-11.8,10.9,2.35,2.55,.40);
function entranceGate(){
const g=new THREE.Group();g.position.set(0,.40,14.35);world.add(g);
const redDoor=new THREE.MeshStandardMaterial({color:'#7a1710',roughness:.55,metalness:.05}),redDeep=new THREE.MeshStandardMaterial({color:'#4a0d09',roughness:.6,metalness:.05}),blackLac=new THREE.MeshStandardMaterial({color:'#161010',roughness:.45,metalness:.15}),goldTrim=new THREE.MeshStandardMaterial({color:'#c09a45',roughness:.35,metalness:.8}),whiteWall=new THREE.MeshStandardMaterial({color:'#c9c1b3',roughness:.92}),darkStone=new THREE.MeshStandardMaterial({color:'#4e4a44',roughness:.95}),midStone=new THREE.MeshStandardMaterial({color:'#6d6860',roughness:.9});
box(g,11.2,.34,3.4,darkStone,0,.17,.25);box(g,10.8,.16,3.0,midStone,0,.40,.15,false);
for(let i=0;i<4;i++)box(g,6.6,.12,.42,midStone,0,.32-i*.10,2.10+i*.40,false);
for(const s of[-1,1]){for(let i=0;i<4;i++)box(g,.24,.12,.42,darkStone,s*3.42,.32-i*.10,2.10+i*.40,false);const drum=new THREE.Group();drum.position.set(s*3.42,0,1.62);g.add(drum);box(drum,.60,.30,.60,darkStone,0,.15,0);const dc=cyl(drum,.28,.28,.28,darkStone,0,.52,0,16);dc.rotation.z=Math.PI/2;const f1=new THREE.Mesh(new THREE.CylinderGeometry(.20,.20,.02,16),goldTrim);f1.rotation.z=Math.PI/2;f1.position.set(.15,.52,0);drum.add(f1);const f2=f1.clone();f2.position.x=-.15;drum.add(f2);}
for(const s of[-1,1]){const wing=new THREE.Group();wing.position.set(s*5.0,0,1.2);wing.rotation.y=-s*.30;g.add(wing);box(wing,2.6,2.7,.36,whiteWall,0,1.55,0);box(wing,2.75,.24,.54,blackLac,0,2.98,0);box(wing,2.0,2.0,.06,redDeep,0,1.55,.20,false);box(wing,1.5,1.5,.05,blackLac,0,1.55,.24,false);latticePane(wing,1.36,1.36,'flower',0,1.55,.27);roof(wing,0,3.14,0,3.1,1.3,roofMat,{rise:.66});}
const pierX=2.30,pierW=1.10,pierH=3.7;
for(const x of[-pierX,pierX]){box(g,1.5,.32,1.35,darkStone,x,.16,0);box(g,pierW,pierH,1.15,whiteWall,x,pierH/2+.30,0);box(g,pierW+.10,.20,1.20,blackLac,x,.44,0);box(g,pierW+.10,.20,1.20,blackLac,x,pierH+.20,0);for(const dz of[-.50,.50])box(g,.17,pierH,.17,redDoor,x,pierH/2+.30,dz);}
box(g,2*pierX+pierW+.2,.34,1.30,blackLac,0,pierH+.32,0);box(g,2*pierX+pierW+.5,.16,1.42,redDeep,0,pierH+.57,0);
const doorH=3.0,leafW=(2*pierX-pierW)/2-.05;
for(const s of[-1,1]){const leaf=new THREE.Group();leaf.position.set(s*(2*pierX-pierW)/2,0,-.55);leaf.rotation.y=-s*.28;g.add(leaf);const panel=new THREE.Group();panel.position.set(-s*leafW/2,0,0);leaf.add(panel);box(panel,leafW,doorH,.12,redDoor,0,.30+doorH/2,0);for(let i=0;i<5;i++)for(let j=0;j<5;j++){const stud=new THREE.Mesh(new THREE.SphereGeometry(.05,8,6),goldTrim);stud.position.set(-leafW/2+.16+i*(leafW-.32)/4,.55+j*(doorH-.5)/4,.075);stud.scale.z=.6;panel.add(stud);}const ring=new THREE.Mesh(new THREE.TorusGeometry(.11,.022,8,16),goldTrim);ring.position.set(s*.18,.30+doorH*.52,.09);panel.add(ring);const boss=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,.03,10),goldTrim);boss.rotation.x=Math.PI/2;boss.position.set(s*.18,.30+doorH*.62,.07);panel.add(boss);}
box(g,2*pierX-pierW,.14,.36,blackLac,0,.44,0,false);
const plaque=new THREE.Group();plaque.position.set(0,pierH-1.0,.80);g.add(plaque);
box(plaque,2.1,.68,.10,blackLac,0,0,0);box(plaque,2.22,.10,.14,redDeep,0,.40,0,false);box(plaque,2.22,.10,.14,redDeep,0,-.40,0,false);
const pc=document.createElement('canvas');pc.width=512;pc.height=176;const pcx=pc.getContext('2d');pcx.fillStyle='#0e0a0a';pcx.fillRect(0,0,512,176);pcx.strokeStyle='#b08a3e';pcx.lineWidth=8;pcx.strokeRect(12,12,488,152);pcx.fillStyle='#d8b968';pcx.font='bold 104px "KaiTi","STKaiti","SimSun",serif';pcx.textAlign='center';pcx.textBaseline='middle';pcx.fillText('沈 宅',256,92);
const pt=new THREE.CanvasTexture(pc);pt.colorSpace=THREE.SRGBColorSpace;
const face=new THREE.Mesh(new THREE.PlaneGeometry(1.9,.60),new THREE.MeshBasicMaterial({map:pt}));face.position.z=.06;plaque.add(face);
for(let x=-2.6;x<=2.6;x+=.52){box(g,.26,.16,.26,blackLac,x,pierH+.80,.55,false);box(g,.70,.10,.14,redDeep,x,pierH+.94,.55,false);}
roof(g,0,pierH+1.05,0,7.4,3.4,roofMat,{rise:.70});roof(g,0,pierH+1.75,0,9.6,4.2,roofMat,{rise:1.45});
for(const s of[-1,1]){const lx=s*1.55,ly=pierH+.05,lz=1.05;beam(g,[lx,ly+.55,lz],[lx,ly-.05,lz],.014,timberLight,6);const lamp=new THREE.Mesh(new THREE.SphereGeometry(.20,16,12),new THREE.MeshStandardMaterial({color:'#c9301c',emissive:'#a81f0e',emissiveIntensity:.9,roughness:.5}));lamp.scale.y=1.3;lamp.position.set(lx,ly-.28,lz);g.add(lamp);const capT=new THREE.Mesh(new THREE.CylinderGeometry(.09,.12,.05,10),goldTrim);capT.position.set(lx,ly-.05,lz);g.add(capT);const capB=new THREE.Mesh(new THREE.CylinderGeometry(.12,.09,.05,10),goldTrim);capB.position.set(lx,ly-.52,lz);g.add(capB);const pl=new THREE.PointLight(0xff3b1e,2.2,6,2);pl.position.set(lx,ly-.28,lz);g.add(pl);lanterns.push(pl);}
for(const s of[-1,1]){const lion=new THREE.Group();lion.position.set(s*4.35,0,2.7);lion.rotation.y=s*.20;g.add(lion);box(lion,.95,.30,1.25,darkStone,0,.15,0);box(lion,1.05,.12,1.35,midStone,0,.36,0,false);box(lion,.56,.50,.55,darkStone,0,1.02,.15);const head=new THREE.Mesh(new THREE.DodecahedronGeometry(.30,0),darkStone);head.position.set(0,1.42,.22);head.scale.set(1,.95,1.05);head.castShadow=true;lion.add(head);for(const ex of[-.24,.24]){const ear=new THREE.Mesh(new THREE.SphereGeometry(.09,6,6),darkStone);ear.position.set(ex,1.58,.14);lion.add(ear);}for(const lx of[-.18,.18])box(lion,.14,.55,.16,darkStone,lx,.78,.30);const mane=new THREE.Mesh(new THREE.IcosahedronGeometry(.26,1),darkStone);mane.position.set(0,1.30,.04);mane.scale.set(1.1,.8,1);lion.add(mane);}
}
entranceGate();
for(const side of[-1,1]){for(const z of[-9,0,8.7]){box(world,.9,.16,1.45,stone,side*7.05,.47,z,false);box(world,.72,.08,1.28,paving,side*7.05,.58,z,false);}for(const z of[-12.0,11.0]){box(world,2.5,.16,1.1,stone,side*7.55,.48,z,false);box(world,2.9,.12,.45,paleStone,side*7.55,.31,z+(z<0?-.72:.72),false);}}
for(let z=11;z>=-12;z-=1.7){box(world,1.65,.075,1.48,paleStone,0,.53,z,false);box(world,.06,.08,1.48,stone,-.86,.53,z,false);box(world,.06,.08,1.48,stone,.86,.53,z,false);}
for(const[sx,sz,sw,sd]of[[0,-9,14.2,6.5],[0,0,11.6,5.8],[0,8.7,9.6,5.2]]){box(world,sw,.22,sd,stone,sx,.49,sz,false);box(world,sw-.22,.08,sd-.22,paving,sx,.64,sz,false);}
for(const side of[-1,1]){for(const z of[-10,-5,0,5,10]){box(world,2.1,.28,1.25,stone,side*13.1,.62,z,false);for(let i=0;i<4;i++){const shrub=new THREE.Mesh(new THREE.IcosahedronGeometry(.36,1),leafMats[(i+1)%4]);shrub.position.set(side*13.1+(i-1.5)*.34,.95,z+(i%2)*.25);shrub.scale.y=.75;shrub.castShadow=true;world.add(shrub);}}}
for(let i=0;i<3;i++)box(world,5.5,.16,.48,paleStone,0,.58+i*.06,11.2+i*.48,false);
box(world,5.2,.32,3.8,stone,-7,.62,5.3);box(world,4.85,.12,3.45,waterMat,-7,.81,5.3,false);
for(let i=0;i<5;i++){const r=.16+(i%3)*.06;const lily=new THREE.Mesh(new THREE.CircleGeometry(r,12),leafMats[i%4]);lily.rotation.x=-Math.PI/2;lily.position.set(-8.3+i*.56,.89,4.8+(i%2)*.7);world.add(lily);}
const bridge=new THREE.Group();bridge.position.set(-7,.9,5.3);world.add(bridge);const arch=new THREE.Mesh(new THREE.BoxGeometry(5.5,.22,.8),paleStone);arch.position.y=.15;arch.castShadow=true;bridge.add(arch);for(let x=-2.3;x<=2.31;x+=.46)box(bridge,.04,.28,.8,stone,x,.36,0,false);
function lantern(x,z){const g=new THREE.Group();g.position.set(x,.5,z);world.add(g);box(g,.72,.16,.72,stone,0,.08,0);box(g,.38,.82,.38,plasterShade,0,.55,0);box(g,.46,.48,.05,darkWood,0,.62,.22);box(g,.05,.48,.46,darkWood,0,.62,0);const glow=new THREE.PointLight(0xff3a1e,0,7);glow.position.set(0,.75,0);g.add(glow);lanterns.push(glow);const lightMat=new THREE.MeshStandardMaterial({color:'#ffb49a',emissive:'#c82a12',emissiveIntensity:.8});box(g,.22,.25,.22,lightMat,0,.68,0,false);const hat=new THREE.Mesh(new THREE.ConeGeometry(.52,.22,4),roofMat);hat.position.y=1.12;hat.rotation.y=Math.PI/4;hat.castShadow=true;g.add(hat);cyl(g,.06,.1,.13,gold,0,1.28,0,8);}
[[-3,11.5],[3,11.5],[-5,-2],[5,-2],[-12,5],[12,5],[-6,-11],[6,-11]].forEach(p=>lantern(p[0],p[1]));
function tree(x,z,scale=1){const g=new THREE.Group();g.position.set(x,.48,z);g.scale.setScalar(scale);world.add(g);cyl(g,.18,.32,2.6,timberLight,0,1.3,0,9);beam(g,[0,1.35,0],[-.6,2.5,.1],.12,timberLight);beam(g,[0,1.55,0],[.55,2.65,-.1],.12,timberLight);for(let i=0;i<13;i++){const a=i*2.399,rad=.45+(i%4)*.2,y=2.15+(i%5)*.36;const s=.65+(i%3)*.14;const leaf=new THREE.Mesh(new THREE.IcosahedronGeometry(s,1),leafMats[i%4]);leaf.position.set(Math.cos(a)*rad,y,Math.sin(a)*rad);leaf.scale.set(1,.78,1);leaf.castShadow=true;leaf.receiveShadow=true;g.add(leaf);}const top=new THREE.Mesh(new THREE.IcosahedronGeometry(.8,1),leafMats[1]);top.position.y=3.65;top.scale.set(1,.85,1);top.castShadow=true;g.add(top);}
tree(-13,10,1.1);tree(13,10,1.0);tree(-13,-3,.9);tree(13,-3,1.1);tree(-11,7,.72);tree(11,7,.72);
function bamboo(x,z){for(let i=0;i<7;i++){const xx=x+(Math.random()-.5)*1.5,zz=z+(Math.random()-.5)*1.2;const h=3.3+Math.random()*1.7;cyl(world,.035,.055,h,leafMats[1],xx,.5+h/2,zz,6);for(let j=1;j<6;j++){const y=.5+h*j/7;beam(world,[xx,y,zz],[xx+(Math.random()-.5)*.6,y+.1,zz+(Math.random()-.5)*.5],.018,leafMats[2],5);}}}
bamboo(-14,-10);bamboo(14,-10);
for(let i=0;i<13;i++){const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(.4+(i%3)*.15,0),i%2?stone:paleStone);rock.position.set(-10+(i%5)*.45,.58+(i%2)*.1,5.5+Math.floor(i/5)*.48);rock.scale.set(.8,1.3,.9);rock.rotation.y=i*.8;rock.castShadow=true;world.add(rock);}
for(const[cx,cz]of[[-12,5],[12,5],[-12,-11],[12,-11]]){for(let i=0;i<6;i++){const s=new THREE.Mesh(new THREE.IcosahedronGeometry(.35,1),leafMats[(i+1)%4]);s.position.set(cx+(i%3)*.45,.75,cz+Math.floor(i/3)*.45);s.scale.y=.7;s.castShadow=true;world.add(s);}}
const roomData=window.ROOM_DATA;
const hotspots=[];
function addHotspot(pos,data){const g=new THREE.Group();g.position.set(pos[0],pos[1],pos[2]);const core=new THREE.Mesh(new THREE.SphereGeometry(.13,16,12),new THREE.MeshBasicMaterial({color:0xffc38a}));g.add(core);const halo=new THREE.Mesh(new THREE.RingGeometry(.30,.40,32),new THREE.MeshBasicMaterial({color:0xff8c4a,transparent:true,opacity:.85,side:THREE.DoubleSide,depthWrite:false}));g.add(halo);const halo2=new THREE.Mesh(new THREE.RingGeometry(.54,.585,32),new THREE.MeshBasicMaterial({color:0xff6a30,transparent:true,opacity:.30,side:THREE.DoubleSide,depthWrite:false}));g.add(halo2);const pick=new THREE.Mesh(new THREE.SphereGeometry(.62,12,10),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false,colorWrite:false}));g.add(pick);g.userData={data,core,halo,halo2,pick,sealed:false,baseY:pos[1],phase:Math.random()*Math.PI*2};world.add(g);hotspots.push(g);return g;}
roomData.forEach(d=>addHotspot(d.pos,d));
const panel=document.querySelector('#panel'),pTitle=document.querySelector('#p-title'),pSub=document.querySelector('#p-sub'),pText=document.querySelector('#p-text'),pAnomaly=document.querySelector('#p-anomaly'),pBtn=document.querySelector('#p-talisman');
let current=null;
function openPanel(hs){current=hs;const d=hs.userData.data;pTitle.textContent=d.title;pSub.textContent=d.sub;if(d.anomaly&&!hs.userData.sealed){pText.textContent=d.text;pAnomaly.textContent='不对劲 —— '+d.red;pAnomaly.className='p-anomaly red';pBtn.style.display='block';}else if(hs.userData.sealed){pText.textContent=d.sealedText;pAnomaly.textContent='符纸贴上了，屋里安静下来。';pAnomaly.className='p-anomaly gold';pBtn.style.display='none';}else{pText.textContent=d.text;pAnomaly.textContent='';pAnomaly.className='p-anomaly';pBtn.style.display='none';}panel.classList.add('show');}
function closePanel(){panel.classList.remove('show');current=null;}
pBtn.addEventListener('click',()=>{if(!current)return;current.userData.sealed=true;openPanel(current);});
document.querySelector('#p-close').addEventListener('click',closePanel);
const ray=new THREE.Raycaster(),ndc=new THREE.Vector2();let hovered=null,downX=0,downY=0,downT=0;
function pickHotspot(clientX,clientY){const rect=renderer.domElement.getBoundingClientRect();ndc.x=((clientX-rect.left)/rect.width)*2-1;ndc.y=-((clientY-rect.top)/rect.height)*2+1;ray.setFromCamera(ndc,camera);const hits=ray.intersectObjects(hotspots,true);if(!hits.length)return null;let o=hits[0].object;while(o&&!o.userData.data)o=o.parent;return o||null;}
renderer.domElement.addEventListener('pointerdown',e=>{downX=e.clientX;downY=e.clientY;downT=performance.now();});
renderer.domElement.addEventListener('pointermove',e=>{const hs=pickHotspot(e.clientX,e.clientY);if(hs!==hovered){hovered=hs;renderer.domElement.style.cursor=hovered?'pointer':'grab';}});
renderer.domElement.addEventListener('pointerleave',()=>{hovered=null;renderer.domElement.style.cursor='grab';});
renderer.domElement.addEventListener('pointerup',e=>{const dist=Math.hypot(e.clientX-downX,e.clientY-downY);if(dist>6||performance.now()-downT>650)return;const hs=pickHotspot(e.clientX,e.clientY);if(hs)openPanel(hs);else closePanel();});
const initial={pos:new THREE.Vector3(31,21,45),target:new THREE.Vector3(0,2,0)};
document.querySelector('#reset').addEventListener('click',()=>{camera.position.copy(initial.pos);controls.target.copy(initial.target);controls.update();});
let lit=true;const lightBtn=document.querySelector('#lights');
function applyLights(){lanterns.forEach(l=>{l.intensity=lit?3.4:0});sun.intensity=lit?1.15:2.6;lightBtn.textContent=lit?'熄 灯':'点 灯';}
lightBtn.addEventListener('click',()=>{lit=!lit;applyLights();});applyLights();
function applyLayoutClass(){const w=mount.clientWidth||wrap.clientWidth||0;wrap.classList.toggle('narrow',w<720);wrap.classList.toggle('tiny',w<460);}
function updateSize(){applyLayoutClass();const{w,h}=sz();if(w<2||h<2)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false);renderer.setPixelRatio(Math.min(devicePixelRatio,2));}
applyLayoutClass();const ro=new ResizeObserver(updateSize);ro.observe(wrap);ro.observe(mount);addEventListener('resize',updateSize);
const clock=new THREE.Clock();
function animate(){requestAnimationFrame(animate);const t=clock.getElapsedTime();controls.update();hotspots.forEach((h,i)=>{const u=h.userData;const isHover=(h===hovered);h.position.y=u.baseY+Math.sin(t*1.2+u.phase)*.09;const pulse=1+Math.sin(t*1.8+i*1.3)*.10;const hoverScale=isHover?1.30:1;u.halo.scale.setScalar(pulse*hoverScale);u.halo2.scale.setScalar((1+Math.sin(t*1.8+i*1.3+1.1)*.08)*hoverScale);u.core.scale.setScalar((1+(isHover?.22:0)));u.halo.lookAt(camera.position);u.halo2.lookAt(camera.position);const baseCol=u.sealed?0xa08a52:0xff8c4a;const coreCol=u.sealed?0xd8c58a:0xffc38a;u.halo.material.color.setHex(isHover?(u.sealed?0xd6bc78:0xffb27a):baseCol);u.halo2.material.color.setHex(isHover?(u.sealed?0xd6bc78:0xff7a40):(u.sealed?0x7a6a40:0xff6a30));u.core.material.color.setHex(isHover?(u.sealed?0xfff0c0:0xffe0b0):coreCol);});renderer.render(scene,camera);}
animate();
setTimeout(()=>document.querySelector('#loading').classList.add('hide'),600);
