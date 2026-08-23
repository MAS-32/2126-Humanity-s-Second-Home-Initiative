(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const Jf="modulepreload",Qf=function(s,t){return new URL(s,t).href},fd={},tp=function(t,e,n){let i=Promise.resolve();if(e&&e.length>0){let c=function(p){return Promise.all(p.map(m=>Promise.resolve(m).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),h=a?.nonce||a?.getAttribute("nonce");i=c(e.map(p=>{if(p=Qf(p,n),p in fd)return;fd[p]=!0;const m=p.endsWith(".css"),g=m?'[rel="stylesheet"]':"";if(n)for(let y=o.length-1;y>=0;y--){const S=o[y];if(S.href===p&&(!m||S.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${g}`))return;const d=document.createElement("link");if(d.rel=m?"stylesheet":Jf,m||(d.as="script"),d.crossOrigin="",d.href=p,h&&d.setAttribute("nonce",h),document.head.appendChild(d),m)return new Promise((y,S)=>{d.addEventListener("load",y),d.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${p}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})};const dh="179",gs={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Fs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ep=0,pd=1,np=2,Hu=1,ip=2,ds=3,Bs=0,Jn=1,Xn=2,_s=0,Vr=1,On=2,md=3,gd=4,sp=5,sr=100,rp=101,op=102,ap=103,lp=104,cp=200,hp=201,dp=202,up=203,wc=204,Sc=205,fp=206,pp=207,mp=208,gp=209,_p=210,xp=211,vp=212,yp=213,Mp=214,bc=0,Ec=1,Tc=2,Wr=3,Ac=4,Cc=5,Rc=6,Pc=7,Gu=0,wp=1,Sp=2,Os=0,Wu=1,Xu=2,Yu=3,uh=4,qu=5,ju=6,Ku=7,_d="attached",bp="detached",Zu=300,Xr=301,Yr=302,$a=303,Ic=304,cl=306,us=1e3,or=1001,Dc=1002,pi=1003,Ep=1004,ca=1005,Xi=1006,Nl=1007,ar=1008,qi=1009,$u=1010,Ju=1011,Io=1012,fh=1013,lr=1014,Pi=1015,xs=1016,ph=1017,mh=1018,Do=1020,Qu=35902,tf=1021,ef=1022,xi=1023,Lo=1026,Uo=1027,gh=1028,_h=1029,nf=1030,xh=1031,vh=1033,Wa=33776,Xa=33777,Ya=33778,qa=33779,Lc=35840,Uc=35841,Nc=35842,Fc=35843,Oc=36196,Bc=37492,zc=37496,kc=37808,Vc=37809,Hc=37810,Gc=37811,Wc=37812,Xc=37813,Yc=37814,qc=37815,jc=37816,Kc=37817,Zc=37818,$c=37819,Jc=37820,Qc=37821,ja=36492,th=36494,eh=36495,sf=36283,nh=36284,ih=36285,sh=36286,Tp=2200,Ap=2201,Cp=2202,Ja=2300,rh=2301,Fl=2302,Br=2400,zr=2401,Qa=2402,yh=2500,Rp=2501,zy=0,ky=1,Vy=2,Pp=3200,Ip=3201,rf=0,Dp=1,Ns="",Bn="srgb",qr="srgb-linear",tl="linear",rn="srgb",gr=7680,xd=519,Lp=512,Up=513,Np=514,of=515,Fp=516,Op=517,Bp=518,zp=519,oh=35044,vd="300 es",Yi=2e3,el=2001;class zs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const Kn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let yd=1234567;const Ao=Math.PI/180,jr=180/Math.PI;function Ii(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Kn[s&255]+Kn[s>>8&255]+Kn[s>>16&255]+Kn[s>>24&255]+"-"+Kn[t&255]+Kn[t>>8&255]+"-"+Kn[t>>16&15|64]+Kn[t>>24&255]+"-"+Kn[e&63|128]+Kn[e>>8&255]+"-"+Kn[e>>16&255]+Kn[e>>24&255]+Kn[n&255]+Kn[n>>8&255]+Kn[n>>16&255]+Kn[n>>24&255]).toLowerCase()}function Fe(s,t,e){return Math.max(t,Math.min(e,s))}function Mh(s,t){return(s%t+t)%t}function kp(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function Vp(s,t,e){return s!==t?(e-s)/(t-s):0}function Co(s,t,e){return(1-e)*s+e*t}function Hp(s,t,e,n){return Co(s,t,1-Math.exp(-e*n))}function Gp(s,t=1){return t-Math.abs(Mh(s,t*2)-t)}function Wp(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Xp(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Yp(s,t){return s+Math.floor(Math.random()*(t-s+1))}function qp(s,t){return s+Math.random()*(t-s)}function jp(s){return s*(.5-Math.random())}function Kp(s){s!==void 0&&(yd=s);let t=yd+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Zp(s){return s*Ao}function $p(s){return s*jr}function Jp(s){return(s&s-1)===0&&s!==0}function Qp(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function tm(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function em(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),h=o(e/2),c=r((t+n)/2),p=o((t+n)/2),m=r((t-n)/2),g=o((t-n)/2),d=r((n-t)/2),y=o((n-t)/2);switch(i){case"XYX":s.set(a*p,h*m,h*g,a*c);break;case"YZY":s.set(h*g,a*p,h*m,a*c);break;case"ZXZ":s.set(h*m,h*g,a*p,a*c);break;case"XZX":s.set(a*p,h*y,h*d,a*c);break;case"YXY":s.set(h*d,a*p,h*y,a*c);break;case"ZYZ":s.set(h*y,h*d,a*p,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ri(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function on(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const nm={DEG2RAD:Ao,RAD2DEG:jr,generateUUID:Ii,clamp:Fe,euclideanModulo:Mh,mapLinear:kp,inverseLerp:Vp,lerp:Co,damp:Hp,pingpong:Gp,smoothstep:Wp,smootherstep:Xp,randInt:Yp,randFloat:qp,randFloatSpread:jp,seededRandom:Kp,degToRad:Zp,radToDeg:$p,isPowerOfTwo:Jp,ceilPowerOfTwo:Qp,floorPowerOfTwo:tm,setQuaternionFromProperEuler:em,normalize:on,denormalize:Ri};class Dt{constructor(t=0,e=0){Dt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Fe(this.x,t.x,e.x),this.y=Fe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Fe(this.x,t,e),this.y=Fe(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Fe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ci{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let h=n[i+0],c=n[i+1],p=n[i+2],m=n[i+3];const g=r[o+0],d=r[o+1],y=r[o+2],S=r[o+3];if(a===0){t[e+0]=h,t[e+1]=c,t[e+2]=p,t[e+3]=m;return}if(a===1){t[e+0]=g,t[e+1]=d,t[e+2]=y,t[e+3]=S;return}if(m!==S||h!==g||c!==d||p!==y){let v=1-a;const _=h*g+c*d+p*y+m*S,I=_>=0?1:-1,P=1-_*_;if(P>Number.EPSILON){const O=Math.sqrt(P),B=Math.atan2(O,_*I);v=Math.sin(v*B)/O,a=Math.sin(a*B)/O}const A=a*I;if(h=h*v+g*A,c=c*v+d*A,p=p*v+y*A,m=m*v+S*A,v===1-a){const O=1/Math.sqrt(h*h+c*c+p*p+m*m);h*=O,c*=O,p*=O,m*=O}}t[e]=h,t[e+1]=c,t[e+2]=p,t[e+3]=m}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],h=n[i+1],c=n[i+2],p=n[i+3],m=r[o],g=r[o+1],d=r[o+2],y=r[o+3];return t[e]=a*y+p*m+h*d-c*g,t[e+1]=h*y+p*g+c*m-a*d,t[e+2]=c*y+p*d+a*g-h*m,t[e+3]=p*y-a*m-h*g-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,h=Math.sin,c=a(n/2),p=a(i/2),m=a(r/2),g=h(n/2),d=h(i/2),y=h(r/2);switch(o){case"XYZ":this._x=g*p*m+c*d*y,this._y=c*d*m-g*p*y,this._z=c*p*y+g*d*m,this._w=c*p*m-g*d*y;break;case"YXZ":this._x=g*p*m+c*d*y,this._y=c*d*m-g*p*y,this._z=c*p*y-g*d*m,this._w=c*p*m+g*d*y;break;case"ZXY":this._x=g*p*m-c*d*y,this._y=c*d*m+g*p*y,this._z=c*p*y+g*d*m,this._w=c*p*m-g*d*y;break;case"ZYX":this._x=g*p*m-c*d*y,this._y=c*d*m+g*p*y,this._z=c*p*y-g*d*m,this._w=c*p*m+g*d*y;break;case"YZX":this._x=g*p*m+c*d*y,this._y=c*d*m+g*p*y,this._z=c*p*y-g*d*m,this._w=c*p*m-g*d*y;break;case"XZY":this._x=g*p*m-c*d*y,this._y=c*d*m-g*p*y,this._z=c*p*y+g*d*m,this._w=c*p*m+g*d*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],h=e[9],c=e[2],p=e[6],m=e[10],g=n+a+m;if(g>0){const d=.5/Math.sqrt(g+1);this._w=.25/d,this._x=(p-h)*d,this._y=(r-c)*d,this._z=(o-i)*d}else if(n>a&&n>m){const d=2*Math.sqrt(1+n-a-m);this._w=(p-h)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(r+c)/d}else if(a>m){const d=2*Math.sqrt(1+a-n-m);this._w=(r-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(h+p)/d}else{const d=2*Math.sqrt(1+m-n-a);this._w=(o-i)/d,this._x=(r+c)/d,this._y=(h+p)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Fe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,h=e._y,c=e._z,p=e._w;return this._x=n*p+o*a+i*c-r*h,this._y=i*p+o*h+r*a-n*c,this._z=r*p+o*c+n*h-i*a,this._w=o*p-n*a-i*h-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const h=1-a*a;if(h<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(h),p=Math.atan2(c,a),m=Math.sin((1-e)*p)/c,g=Math.sin(e*p)/c;return this._w=o*m+this._w*g,this._x=n*m+this._x*g,this._y=i*m+this._y*g,this._z=r*m+this._z*g,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class M{constructor(t=0,e=0,n=0){M.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Md.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Md.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,h=t.w,c=2*(o*i-a*n),p=2*(a*e-r*i),m=2*(r*n-o*e);return this.x=e+h*c+o*m-a*p,this.y=n+h*p+a*c-r*m,this.z=i+h*m+r*p-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Fe(this.x,t.x,e.x),this.y=Fe(this.y,t.y,e.y),this.z=Fe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Fe(this.x,t,e),this.y=Fe(this.y,t,e),this.z=Fe(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Fe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,h=e.z;return this.x=i*h-r*a,this.y=r*o-n*h,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ol.copy(this).projectOnVector(t),this.sub(Ol)}reflect(t){return this.sub(Ol.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ol=new M,Md=new ci;class Ne{constructor(t,e,n,i,r,o,a,h,c){Ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,h,c)}set(t,e,n,i,r,o,a,h,c){const p=this.elements;return p[0]=t,p[1]=i,p[2]=a,p[3]=e,p[4]=r,p[5]=h,p[6]=n,p[7]=o,p[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],h=n[6],c=n[1],p=n[4],m=n[7],g=n[2],d=n[5],y=n[8],S=i[0],v=i[3],_=i[6],I=i[1],P=i[4],A=i[7],O=i[2],B=i[5],k=i[8];return r[0]=o*S+a*I+h*O,r[3]=o*v+a*P+h*B,r[6]=o*_+a*A+h*k,r[1]=c*S+p*I+m*O,r[4]=c*v+p*P+m*B,r[7]=c*_+p*A+m*k,r[2]=g*S+d*I+y*O,r[5]=g*v+d*P+y*B,r[8]=g*_+d*A+y*k,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],h=t[6],c=t[7],p=t[8];return e*o*p-e*a*c-n*r*p+n*a*h+i*r*c-i*o*h}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],h=t[6],c=t[7],p=t[8],m=p*o-a*c,g=a*h-p*r,d=c*r-o*h,y=e*m+n*g+i*d;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/y;return t[0]=m*S,t[1]=(i*c-p*n)*S,t[2]=(a*n-i*o)*S,t[3]=g*S,t[4]=(p*e-i*h)*S,t[5]=(i*r-a*e)*S,t[6]=d*S,t[7]=(n*h-c*e)*S,t[8]=(o*e-n*r)*S,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const h=Math.cos(r),c=Math.sin(r);return this.set(n*h,n*c,-n*(h*o+c*a)+o+t,-i*c,i*h,-i*(-c*o+h*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Bl.makeScale(t,e)),this}rotate(t){return this.premultiply(Bl.makeRotation(-t)),this}translate(t,e){return this.premultiply(Bl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Bl=new Ne;function af(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function No(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function im(){const s=No("canvas");return s.style.display="block",s}const wd={};function Hr(s){s in wd||(wd[s]=!0,console.warn(s))}function sm(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Sd=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bd=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function rm(){const s={enabled:!0,workingColorSpace:qr,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===rn&&(i.r=vs(i.r),i.g=vs(i.g),i.b=vs(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===rn&&(i.r=Gr(i.r),i.g=Gr(i.g),i.b=Gr(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ns?tl:this.spaces[i].transfer},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Hr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Hr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[qr]:{primaries:t,whitePoint:n,transfer:tl,toXYZ:Sd,fromXYZ:bd,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Bn},outputColorSpaceConfig:{drawingBufferColorSpace:Bn}},[Bn]:{primaries:t,whitePoint:n,transfer:rn,toXYZ:Sd,fromXYZ:bd,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Bn}}}),s}const $e=rm();function vs(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Gr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let _r;class om{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{_r===void 0&&(_r=No("canvas")),_r.width=t.width,_r.height=t.height;const i=_r.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=_r}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=No("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=vs(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(vs(e[n]/255)*255):e[n]=vs(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let am=0;class wh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:am++}),this.uuid=Ii(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(zl(i[o].image)):r.push(zl(i[o]))}else r=zl(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function zl(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?om.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let lm=0;const kl=new M;class Yn extends zs{constructor(t=Yn.DEFAULT_IMAGE,e=Yn.DEFAULT_MAPPING,n=or,i=or,r=Xi,o=ar,a=xi,h=qi,c=Yn.DEFAULT_ANISOTROPY,p=Ns){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lm++}),this.uuid=Ii(),this.name="",this.source=new wh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=h,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=p,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(kl).x}get height(){return this.source.getSize(kl).y}get depth(){return this.source.getSize(kl).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Zu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case us:t.x=t.x-Math.floor(t.x);break;case or:t.x=t.x<0?0:1;break;case Dc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case us:t.y=t.y-Math.floor(t.y);break;case or:t.y=t.y<0?0:1;break;case Dc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Yn.DEFAULT_IMAGE=null;Yn.DEFAULT_MAPPING=Zu;Yn.DEFAULT_ANISOTROPY=1;class tn{constructor(t=0,e=0,n=0,i=1){tn.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const h=t.elements,c=h[0],p=h[4],m=h[8],g=h[1],d=h[5],y=h[9],S=h[2],v=h[6],_=h[10];if(Math.abs(p-g)<.01&&Math.abs(m-S)<.01&&Math.abs(y-v)<.01){if(Math.abs(p+g)<.1&&Math.abs(m+S)<.1&&Math.abs(y+v)<.1&&Math.abs(c+d+_-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const P=(c+1)/2,A=(d+1)/2,O=(_+1)/2,B=(p+g)/4,k=(m+S)/4,V=(y+v)/4;return P>A&&P>O?P<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(P),i=B/n,r=k/n):A>O?A<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(A),n=B/i,r=V/i):O<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(O),n=k/r,i=V/r),this.set(n,i,r,e),this}let I=Math.sqrt((v-y)*(v-y)+(m-S)*(m-S)+(g-p)*(g-p));return Math.abs(I)<.001&&(I=1),this.x=(v-y)/I,this.y=(m-S)/I,this.z=(g-p)/I,this.w=Math.acos((c+d+_-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Fe(this.x,t.x,e.x),this.y=Fe(this.y,t.y,e.y),this.z=Fe(this.z,t.z,e.z),this.w=Fe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Fe(this.x,t,e),this.y=Fe(this.y,t,e),this.z=Fe(this.z,t,e),this.w=Fe(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Fe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cm extends zs{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new tn(0,0,t,e),this.scissorTest=!1,this.viewport=new tn(0,0,t,e);const i={width:t,height:e,depth:n.depth},r=new Yn(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Xi,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new wh(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Di extends cm{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class lf extends Yn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=pi,this.minFilter=pi,this.wrapR=or,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class hm extends Yn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=pi,this.minFilter=pi,this.wrapR=or,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ji{constructor(t=new M(1/0,1/0,1/0),e=new M(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(bi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(bi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=bi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,bi):bi.fromBufferAttribute(r,o),bi.applyMatrix4(t.matrixWorld),this.expandByPoint(bi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ha.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ha.copy(n.boundingBox)),ha.applyMatrix4(t.matrixWorld),this.union(ha)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,bi),bi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fo),da.subVectors(this.max,fo),xr.subVectors(t.a,fo),vr.subVectors(t.b,fo),yr.subVectors(t.c,fo),Rs.subVectors(vr,xr),Ps.subVectors(yr,vr),Zs.subVectors(xr,yr);let e=[0,-Rs.z,Rs.y,0,-Ps.z,Ps.y,0,-Zs.z,Zs.y,Rs.z,0,-Rs.x,Ps.z,0,-Ps.x,Zs.z,0,-Zs.x,-Rs.y,Rs.x,0,-Ps.y,Ps.x,0,-Zs.y,Zs.x,0];return!Vl(e,xr,vr,yr,da)||(e=[1,0,0,0,1,0,0,0,1],!Vl(e,xr,vr,yr,da))?!1:(ua.crossVectors(Rs,Ps),e=[ua.x,ua.y,ua.z],Vl(e,xr,vr,yr,da))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,bi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(bi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(rs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),rs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),rs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),rs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),rs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),rs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),rs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),rs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(rs),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const rs=[new M,new M,new M,new M,new M,new M,new M,new M],bi=new M,ha=new ji,xr=new M,vr=new M,yr=new M,Rs=new M,Ps=new M,Zs=new M,fo=new M,da=new M,ua=new M,$s=new M;function Vl(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){$s.fromArray(s,r);const a=i.x*Math.abs($s.x)+i.y*Math.abs($s.y)+i.z*Math.abs($s.z),h=t.dot($s),c=e.dot($s),p=n.dot($s);if(Math.max(-Math.max(h,c,p),Math.min(h,c,p))>a)return!1}return!0}const dm=new ji,po=new M,Hl=new M;class ys{constructor(t=new M,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):dm.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;po.subVectors(t,this.center);const e=po.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(po,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Hl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(po.copy(t.center).add(Hl)),this.expandByPoint(po.copy(t.center).sub(Hl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const os=new M,Gl=new M,fa=new M,Is=new M,Wl=new M,pa=new M,Xl=new M;class $r{constructor(t=new M,e=new M(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,os)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=os.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(os.copy(this.origin).addScaledVector(this.direction,e),os.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Gl.copy(t).add(e).multiplyScalar(.5),fa.copy(e).sub(t).normalize(),Is.copy(this.origin).sub(Gl);const r=t.distanceTo(e)*.5,o=-this.direction.dot(fa),a=Is.dot(this.direction),h=-Is.dot(fa),c=Is.lengthSq(),p=Math.abs(1-o*o);let m,g,d,y;if(p>0)if(m=o*h-a,g=o*a-h,y=r*p,m>=0)if(g>=-y)if(g<=y){const S=1/p;m*=S,g*=S,d=m*(m+o*g+2*a)+g*(o*m+g+2*h)+c}else g=r,m=Math.max(0,-(o*g+a)),d=-m*m+g*(g+2*h)+c;else g=-r,m=Math.max(0,-(o*g+a)),d=-m*m+g*(g+2*h)+c;else g<=-y?(m=Math.max(0,-(-o*r+a)),g=m>0?-r:Math.min(Math.max(-r,-h),r),d=-m*m+g*(g+2*h)+c):g<=y?(m=0,g=Math.min(Math.max(-r,-h),r),d=g*(g+2*h)+c):(m=Math.max(0,-(o*r+a)),g=m>0?r:Math.min(Math.max(-r,-h),r),d=-m*m+g*(g+2*h)+c);else g=o>0?-r:r,m=Math.max(0,-(o*g+a)),d=-m*m+g*(g+2*h)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,m),i&&i.copy(Gl).addScaledVector(fa,g),d}intersectSphere(t,e){os.subVectors(t.center,this.origin);const n=os.dot(this.direction),i=os.dot(os)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,h=n+o;return h<0?null:a<0?this.at(h,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,h;const c=1/this.direction.x,p=1/this.direction.y,m=1/this.direction.z,g=this.origin;return c>=0?(n=(t.min.x-g.x)*c,i=(t.max.x-g.x)*c):(n=(t.max.x-g.x)*c,i=(t.min.x-g.x)*c),p>=0?(r=(t.min.y-g.y)*p,o=(t.max.y-g.y)*p):(r=(t.max.y-g.y)*p,o=(t.min.y-g.y)*p),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),m>=0?(a=(t.min.z-g.z)*m,h=(t.max.z-g.z)*m):(a=(t.max.z-g.z)*m,h=(t.min.z-g.z)*m),n>h||a>i)||((a>n||n!==n)&&(n=a),(h<i||i!==i)&&(i=h),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,os)!==null}intersectTriangle(t,e,n,i,r){Wl.subVectors(e,t),pa.subVectors(n,t),Xl.crossVectors(Wl,pa);let o=this.direction.dot(Xl),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Is.subVectors(this.origin,t);const h=a*this.direction.dot(pa.crossVectors(Is,pa));if(h<0)return null;const c=a*this.direction.dot(Wl.cross(Is));if(c<0||h+c>o)return null;const p=-a*Is.dot(Xl);return p<0?null:this.at(p/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ce{constructor(t,e,n,i,r,o,a,h,c,p,m,g,d,y,S,v){Ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,h,c,p,m,g,d,y,S,v)}set(t,e,n,i,r,o,a,h,c,p,m,g,d,y,S,v){const _=this.elements;return _[0]=t,_[4]=e,_[8]=n,_[12]=i,_[1]=r,_[5]=o,_[9]=a,_[13]=h,_[2]=c,_[6]=p,_[10]=m,_[14]=g,_[3]=d,_[7]=y,_[11]=S,_[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ce().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Mr.setFromMatrixColumn(t,0).length(),r=1/Mr.setFromMatrixColumn(t,1).length(),o=1/Mr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),h=Math.cos(i),c=Math.sin(i),p=Math.cos(r),m=Math.sin(r);if(t.order==="XYZ"){const g=o*p,d=o*m,y=a*p,S=a*m;e[0]=h*p,e[4]=-h*m,e[8]=c,e[1]=d+y*c,e[5]=g-S*c,e[9]=-a*h,e[2]=S-g*c,e[6]=y+d*c,e[10]=o*h}else if(t.order==="YXZ"){const g=h*p,d=h*m,y=c*p,S=c*m;e[0]=g+S*a,e[4]=y*a-d,e[8]=o*c,e[1]=o*m,e[5]=o*p,e[9]=-a,e[2]=d*a-y,e[6]=S+g*a,e[10]=o*h}else if(t.order==="ZXY"){const g=h*p,d=h*m,y=c*p,S=c*m;e[0]=g-S*a,e[4]=-o*m,e[8]=y+d*a,e[1]=d+y*a,e[5]=o*p,e[9]=S-g*a,e[2]=-o*c,e[6]=a,e[10]=o*h}else if(t.order==="ZYX"){const g=o*p,d=o*m,y=a*p,S=a*m;e[0]=h*p,e[4]=y*c-d,e[8]=g*c+S,e[1]=h*m,e[5]=S*c+g,e[9]=d*c-y,e[2]=-c,e[6]=a*h,e[10]=o*h}else if(t.order==="YZX"){const g=o*h,d=o*c,y=a*h,S=a*c;e[0]=h*p,e[4]=S-g*m,e[8]=y*m+d,e[1]=m,e[5]=o*p,e[9]=-a*p,e[2]=-c*p,e[6]=d*m+y,e[10]=g-S*m}else if(t.order==="XZY"){const g=o*h,d=o*c,y=a*h,S=a*c;e[0]=h*p,e[4]=-m,e[8]=c*p,e[1]=g*m+S,e[5]=o*p,e[9]=d*m-y,e[2]=y*m-d,e[6]=a*p,e[10]=S*m+g}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(um,t,fm)}lookAt(t,e,n){const i=this.elements;return ui.subVectors(t,e),ui.lengthSq()===0&&(ui.z=1),ui.normalize(),Ds.crossVectors(n,ui),Ds.lengthSq()===0&&(Math.abs(n.z)===1?ui.x+=1e-4:ui.z+=1e-4,ui.normalize(),Ds.crossVectors(n,ui)),Ds.normalize(),ma.crossVectors(ui,Ds),i[0]=Ds.x,i[4]=ma.x,i[8]=ui.x,i[1]=Ds.y,i[5]=ma.y,i[9]=ui.y,i[2]=Ds.z,i[6]=ma.z,i[10]=ui.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],h=n[8],c=n[12],p=n[1],m=n[5],g=n[9],d=n[13],y=n[2],S=n[6],v=n[10],_=n[14],I=n[3],P=n[7],A=n[11],O=n[15],B=i[0],k=i[4],V=i[8],C=i[12],E=i[1],z=i[5],Q=i[9],it=i[13],rt=i[2],xt=i[6],lt=i[10],vt=i[14],ot=i[3],Ct=i[7],Xt=i[11],Kt=i[15];return r[0]=o*B+a*E+h*rt+c*ot,r[4]=o*k+a*z+h*xt+c*Ct,r[8]=o*V+a*Q+h*lt+c*Xt,r[12]=o*C+a*it+h*vt+c*Kt,r[1]=p*B+m*E+g*rt+d*ot,r[5]=p*k+m*z+g*xt+d*Ct,r[9]=p*V+m*Q+g*lt+d*Xt,r[13]=p*C+m*it+g*vt+d*Kt,r[2]=y*B+S*E+v*rt+_*ot,r[6]=y*k+S*z+v*xt+_*Ct,r[10]=y*V+S*Q+v*lt+_*Xt,r[14]=y*C+S*it+v*vt+_*Kt,r[3]=I*B+P*E+A*rt+O*ot,r[7]=I*k+P*z+A*xt+O*Ct,r[11]=I*V+P*Q+A*lt+O*Xt,r[15]=I*C+P*it+A*vt+O*Kt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],h=t[9],c=t[13],p=t[2],m=t[6],g=t[10],d=t[14],y=t[3],S=t[7],v=t[11],_=t[15];return y*(+r*h*m-i*c*m-r*a*g+n*c*g+i*a*d-n*h*d)+S*(+e*h*d-e*c*g+r*o*g-i*o*d+i*c*p-r*h*p)+v*(+e*c*m-e*a*d-r*o*m+n*o*d+r*a*p-n*c*p)+_*(-i*a*p-e*h*m+e*a*g+i*o*m-n*o*g+n*h*p)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],h=t[6],c=t[7],p=t[8],m=t[9],g=t[10],d=t[11],y=t[12],S=t[13],v=t[14],_=t[15],I=m*v*c-S*g*c+S*h*d-a*v*d-m*h*_+a*g*_,P=y*g*c-p*v*c-y*h*d+o*v*d+p*h*_-o*g*_,A=p*S*c-y*m*c+y*a*d-o*S*d-p*a*_+o*m*_,O=y*m*h-p*S*h-y*a*g+o*S*g+p*a*v-o*m*v,B=e*I+n*P+i*A+r*O;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/B;return t[0]=I*k,t[1]=(S*g*r-m*v*r-S*i*d+n*v*d+m*i*_-n*g*_)*k,t[2]=(a*v*r-S*h*r+S*i*c-n*v*c-a*i*_+n*h*_)*k,t[3]=(m*h*r-a*g*r-m*i*c+n*g*c+a*i*d-n*h*d)*k,t[4]=P*k,t[5]=(p*v*r-y*g*r+y*i*d-e*v*d-p*i*_+e*g*_)*k,t[6]=(y*h*r-o*v*r-y*i*c+e*v*c+o*i*_-e*h*_)*k,t[7]=(o*g*r-p*h*r+p*i*c-e*g*c-o*i*d+e*h*d)*k,t[8]=A*k,t[9]=(y*m*r-p*S*r-y*n*d+e*S*d+p*n*_-e*m*_)*k,t[10]=(o*S*r-y*a*r+y*n*c-e*S*c-o*n*_+e*a*_)*k,t[11]=(p*a*r-o*m*r-p*n*c+e*m*c+o*n*d-e*a*d)*k,t[12]=O*k,t[13]=(p*S*i-y*m*i+y*n*g-e*S*g-p*n*v+e*m*v)*k,t[14]=(y*a*i-o*S*i-y*n*h+e*S*h+o*n*v-e*a*v)*k,t[15]=(o*m*i-p*a*i+p*n*h-e*m*h-o*n*g+e*a*g)*k,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,h=t.z,c=r*o,p=r*a;return this.set(c*o+n,c*a-i*h,c*h+i*a,0,c*a+i*h,p*a+n,p*h-i*o,0,c*h-i*a,p*h+i*o,r*h*h+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,h=e._w,c=r+r,p=o+o,m=a+a,g=r*c,d=r*p,y=r*m,S=o*p,v=o*m,_=a*m,I=h*c,P=h*p,A=h*m,O=n.x,B=n.y,k=n.z;return i[0]=(1-(S+_))*O,i[1]=(d+A)*O,i[2]=(y-P)*O,i[3]=0,i[4]=(d-A)*B,i[5]=(1-(g+_))*B,i[6]=(v+I)*B,i[7]=0,i[8]=(y+P)*k,i[9]=(v-I)*k,i[10]=(1-(g+S))*k,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Mr.set(i[0],i[1],i[2]).length();const o=Mr.set(i[4],i[5],i[6]).length(),a=Mr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Ei.copy(this);const c=1/r,p=1/o,m=1/a;return Ei.elements[0]*=c,Ei.elements[1]*=c,Ei.elements[2]*=c,Ei.elements[4]*=p,Ei.elements[5]*=p,Ei.elements[6]*=p,Ei.elements[8]*=m,Ei.elements[9]*=m,Ei.elements[10]*=m,e.setFromRotationMatrix(Ei),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=Yi,h=!1){const c=this.elements,p=2*r/(e-t),m=2*r/(n-i),g=(e+t)/(e-t),d=(n+i)/(n-i);let y,S;if(h)y=r/(o-r),S=o*r/(o-r);else if(a===Yi)y=-(o+r)/(o-r),S=-2*o*r/(o-r);else if(a===el)y=-o/(o-r),S=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=p,c[4]=0,c[8]=g,c[12]=0,c[1]=0,c[5]=m,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=y,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=Yi,h=!1){const c=this.elements,p=2/(e-t),m=2/(n-i),g=-(e+t)/(e-t),d=-(n+i)/(n-i);let y,S;if(h)y=1/(o-r),S=o/(o-r);else if(a===Yi)y=-2/(o-r),S=-(o+r)/(o-r);else if(a===el)y=-1/(o-r),S=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=p,c[4]=0,c[8]=0,c[12]=g,c[1]=0,c[5]=m,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=y,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Mr=new M,Ei=new Ce,um=new M(0,0,0),fm=new M(1,1,1),Ds=new M,ma=new M,ui=new M,Ed=new Ce,Td=new ci;class Li{constructor(t=0,e=0,n=0,i=Li.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],h=i[1],c=i[5],p=i[9],m=i[2],g=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(Fe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-p,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(g,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Fe(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(h,c)):(this._y=Math.atan2(-m,r),this._z=0);break;case"ZXY":this._x=Math.asin(Fe(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-m,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-Fe(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(g,d),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Fe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-p,c),this._y=Math.atan2(-m,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Fe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(g,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-p,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ed.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ed,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Td.setFromEuler(this),this.setFromQuaternion(Td,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Li.DEFAULT_ORDER="XYZ";class Sh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let pm=0;const Ad=new M,wr=new ci,as=new Ce,ga=new M,mo=new M,mm=new M,gm=new ci,Cd=new M(1,0,0),Rd=new M(0,1,0),Pd=new M(0,0,1),Id={type:"added"},_m={type:"removed"},Sr={type:"childadded",child:null},Yl={type:"childremoved",child:null};class En extends zs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pm++}),this.uuid=Ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=En.DEFAULT_UP.clone();const t=new M,e=new Li,n=new ci,i=new M(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ce},normalMatrix:{value:new Ne}}),this.matrix=new Ce,this.matrixWorld=new Ce,this.matrixAutoUpdate=En.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Sh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return wr.setFromAxisAngle(t,e),this.quaternion.multiply(wr),this}rotateOnWorldAxis(t,e){return wr.setFromAxisAngle(t,e),this.quaternion.premultiply(wr),this}rotateX(t){return this.rotateOnAxis(Cd,t)}rotateY(t){return this.rotateOnAxis(Rd,t)}rotateZ(t){return this.rotateOnAxis(Pd,t)}translateOnAxis(t,e){return Ad.copy(t).applyQuaternion(this.quaternion),this.position.add(Ad.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Cd,t)}translateY(t){return this.translateOnAxis(Rd,t)}translateZ(t){return this.translateOnAxis(Pd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(as.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ga.copy(t):ga.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),mo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?as.lookAt(mo,ga,this.up):as.lookAt(ga,mo,this.up),this.quaternion.setFromRotationMatrix(as),i&&(as.extractRotation(i.matrixWorld),wr.setFromRotationMatrix(as),this.quaternion.premultiply(wr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Id),Sr.child=t,this.dispatchEvent(Sr),Sr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(_m),Yl.child=t,this.dispatchEvent(Yl),Yl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),as.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),as.multiply(t.parent.matrixWorld)),t.applyMatrix4(as),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Id),Sr.child=t,this.dispatchEvent(Sr),Sr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mo,t,mm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mo,gm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,h){return a[h.uuid]===void 0&&(a[h.uuid]=h.toJSON(t)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const h=a.shapes;if(Array.isArray(h))for(let c=0,p=h.length;c<p;c++){const m=h[c];r(t.shapes,m)}else r(t.shapes,h)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let h=0,c=this.material.length;h<c;h++)a.push(r(t.materials,this.material[h]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const h=this.animations[a];i.animations.push(r(t.animations,h))}}if(e){const a=o(t.geometries),h=o(t.materials),c=o(t.textures),p=o(t.images),m=o(t.shapes),g=o(t.skeletons),d=o(t.animations),y=o(t.nodes);a.length>0&&(n.geometries=a),h.length>0&&(n.materials=h),c.length>0&&(n.textures=c),p.length>0&&(n.images=p),m.length>0&&(n.shapes=m),g.length>0&&(n.skeletons=g),d.length>0&&(n.animations=d),y.length>0&&(n.nodes=y)}return n.object=i,n;function o(a){const h=[];for(const c in a){const p=a[c];delete p.metadata,h.push(p)}return h}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}En.DEFAULT_UP=new M(0,1,0);En.DEFAULT_MATRIX_AUTO_UPDATE=!0;En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ti=new M,ls=new M,ql=new M,cs=new M,br=new M,Er=new M,Dd=new M,jl=new M,Kl=new M,Zl=new M,$l=new tn,Jl=new tn,Ql=new tn;class _i{constructor(t=new M,e=new M,n=new M){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Ti.subVectors(t,e),i.cross(Ti);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Ti.subVectors(i,e),ls.subVectors(n,e),ql.subVectors(t,e);const o=Ti.dot(Ti),a=Ti.dot(ls),h=Ti.dot(ql),c=ls.dot(ls),p=ls.dot(ql),m=o*c-a*a;if(m===0)return r.set(0,0,0),null;const g=1/m,d=(c*h-a*p)*g,y=(o*p-a*h)*g;return r.set(1-d-y,y,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,cs)===null?!1:cs.x>=0&&cs.y>=0&&cs.x+cs.y<=1}static getInterpolation(t,e,n,i,r,o,a,h){return this.getBarycoord(t,e,n,i,cs)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,cs.x),h.addScaledVector(o,cs.y),h.addScaledVector(a,cs.z),h)}static getInterpolatedAttribute(t,e,n,i,r,o){return $l.setScalar(0),Jl.setScalar(0),Ql.setScalar(0),$l.fromBufferAttribute(t,e),Jl.fromBufferAttribute(t,n),Ql.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector($l,r.x),o.addScaledVector(Jl,r.y),o.addScaledVector(Ql,r.z),o}static isFrontFacing(t,e,n,i){return Ti.subVectors(n,e),ls.subVectors(t,e),Ti.cross(ls).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ti.subVectors(this.c,this.b),ls.subVectors(this.a,this.b),Ti.cross(ls).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return _i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return _i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return _i.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return _i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return _i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;br.subVectors(i,n),Er.subVectors(r,n),jl.subVectors(t,n);const h=br.dot(jl),c=Er.dot(jl);if(h<=0&&c<=0)return e.copy(n);Kl.subVectors(t,i);const p=br.dot(Kl),m=Er.dot(Kl);if(p>=0&&m<=p)return e.copy(i);const g=h*m-p*c;if(g<=0&&h>=0&&p<=0)return o=h/(h-p),e.copy(n).addScaledVector(br,o);Zl.subVectors(t,r);const d=br.dot(Zl),y=Er.dot(Zl);if(y>=0&&d<=y)return e.copy(r);const S=d*c-h*y;if(S<=0&&c>=0&&y<=0)return a=c/(c-y),e.copy(n).addScaledVector(Er,a);const v=p*y-d*m;if(v<=0&&m-p>=0&&d-y>=0)return Dd.subVectors(r,i),a=(m-p)/(m-p+(d-y)),e.copy(i).addScaledVector(Dd,a);const _=1/(v+S+g);return o=S*_,a=g*_,e.copy(n).addScaledVector(br,o).addScaledVector(Er,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const cf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ls={h:0,s:0,l:0},_a={h:0,s:0,l:0};function tc(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class be{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Bn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$e.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=$e.workingColorSpace){return this.r=t,this.g=e,this.b=n,$e.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=$e.workingColorSpace){if(t=Mh(t,1),e=Fe(e,0,1),n=Fe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=tc(o,r,t+1/3),this.g=tc(o,r,t),this.b=tc(o,r,t-1/3)}return $e.colorSpaceToWorking(this,i),this}setStyle(t,e=Bn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Bn){const n=cf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vs(t.r),this.g=vs(t.g),this.b=vs(t.b),this}copyLinearToSRGB(t){return this.r=Gr(t.r),this.g=Gr(t.g),this.b=Gr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Bn){return $e.workingToColorSpace(Zn.copy(this),t),Math.round(Fe(Zn.r*255,0,255))*65536+Math.round(Fe(Zn.g*255,0,255))*256+Math.round(Fe(Zn.b*255,0,255))}getHexString(t=Bn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$e.workingColorSpace){$e.workingToColorSpace(Zn.copy(this),e);const n=Zn.r,i=Zn.g,r=Zn.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let h,c;const p=(a+o)/2;if(a===o)h=0,c=0;else{const m=o-a;switch(c=p<=.5?m/(o+a):m/(2-o-a),o){case n:h=(i-r)/m+(i<r?6:0);break;case i:h=(r-n)/m+2;break;case r:h=(n-i)/m+4;break}h/=6}return t.h=h,t.s=c,t.l=p,t}getRGB(t,e=$e.workingColorSpace){return $e.workingToColorSpace(Zn.copy(this),e),t.r=Zn.r,t.g=Zn.g,t.b=Zn.b,t}getStyle(t=Bn){$e.workingToColorSpace(Zn.copy(this),t);const e=Zn.r,n=Zn.g,i=Zn.b;return t!==Bn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Ls),this.setHSL(Ls.h+t,Ls.s+e,Ls.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ls),t.getHSL(_a);const n=Co(Ls.h,_a.h,e),i=Co(Ls.s,_a.s,e),r=Co(Ls.l,_a.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zn=new be;be.NAMES=cf;let xm=0;class ks extends zs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xm++}),this.uuid=Ii(),this.name="",this.type="Material",this.blending=Vr,this.side=Bs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wc,this.blendDst=Sc,this.blendEquation=sr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new be(0,0,0),this.blendAlpha=0,this.depthFunc=Wr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gr,this.stencilZFail=gr,this.stencilZPass=gr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Vr&&(n.blending=this.blending),this.side!==Bs&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==wc&&(n.blendSrc=this.blendSrc),this.blendDst!==Sc&&(n.blendDst=this.blendDst),this.blendEquation!==sr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Wr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xd&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==gr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==gr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const h=r[a];delete h.metadata,o.push(h)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class gn extends ks{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Li,this.combine=Gu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Dn=new M,xa=new Dt;let vm=0;class Hn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vm++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=oh,this.updateRanges=[],this.gpuType=Pi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)xa.fromBufferAttribute(this,e),xa.applyMatrix3(t),this.setXY(e,xa.x,xa.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Dn.fromBufferAttribute(this,e),Dn.applyMatrix3(t),this.setXYZ(e,Dn.x,Dn.y,Dn.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Dn.fromBufferAttribute(this,e),Dn.applyMatrix4(t),this.setXYZ(e,Dn.x,Dn.y,Dn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Dn.fromBufferAttribute(this,e),Dn.applyNormalMatrix(t),this.setXYZ(e,Dn.x,Dn.y,Dn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Dn.fromBufferAttribute(this,e),Dn.transformDirection(t),this.setXYZ(e,Dn.x,Dn.y,Dn.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ri(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=on(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ri(e,this.array)),e}setX(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ri(e,this.array)),e}setY(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ri(e,this.array)),e}setZ(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ri(e,this.array)),e}setW(t,e){return this.normalized&&(e=on(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=on(e,this.array),n=on(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=on(e,this.array),n=on(n,this.array),i=on(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=on(e,this.array),n=on(n,this.array),i=on(i,this.array),r=on(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==oh&&(t.usage=this.usage),t}}class hf extends Hn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class df extends Hn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class We extends Hn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let ym=0;const gi=new Ce,ec=new En,Tr=new M,fi=new ji,go=new ji,Vn=new M;class vn extends zs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ym++}),this.uuid=Ii(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(af(t)?df:hf)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ne().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return gi.makeRotationFromQuaternion(t),this.applyMatrix4(gi),this}rotateX(t){return gi.makeRotationX(t),this.applyMatrix4(gi),this}rotateY(t){return gi.makeRotationY(t),this.applyMatrix4(gi),this}rotateZ(t){return gi.makeRotationZ(t),this.applyMatrix4(gi),this}translate(t,e,n){return gi.makeTranslation(t,e,n),this.applyMatrix4(gi),this}scale(t,e,n){return gi.makeScale(t,e,n),this.applyMatrix4(gi),this}lookAt(t){return ec.lookAt(t),ec.updateMatrix(),this.applyMatrix4(ec.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Tr).negate(),this.translate(Tr.x,Tr.y,Tr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new We(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ji);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new M(-1/0,-1/0,-1/0),new M(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];fi.setFromBufferAttribute(r),this.morphTargetsRelative?(Vn.addVectors(this.boundingBox.min,fi.min),this.boundingBox.expandByPoint(Vn),Vn.addVectors(this.boundingBox.max,fi.max),this.boundingBox.expandByPoint(Vn)):(this.boundingBox.expandByPoint(fi.min),this.boundingBox.expandByPoint(fi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ys);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new M,1/0);return}if(t){const n=this.boundingSphere.center;if(fi.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];go.setFromBufferAttribute(a),this.morphTargetsRelative?(Vn.addVectors(fi.min,go.min),fi.expandByPoint(Vn),Vn.addVectors(fi.max,go.max),fi.expandByPoint(Vn)):(fi.expandByPoint(go.min),fi.expandByPoint(go.max))}fi.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Vn.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Vn));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],h=this.morphTargetsRelative;for(let c=0,p=a.count;c<p;c++)Vn.fromBufferAttribute(a,c),h&&(Tr.fromBufferAttribute(t,c),Vn.add(Tr)),i=Math.max(i,n.distanceToSquared(Vn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Hn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],h=[];for(let V=0;V<n.count;V++)a[V]=new M,h[V]=new M;const c=new M,p=new M,m=new M,g=new Dt,d=new Dt,y=new Dt,S=new M,v=new M;function _(V,C,E){c.fromBufferAttribute(n,V),p.fromBufferAttribute(n,C),m.fromBufferAttribute(n,E),g.fromBufferAttribute(r,V),d.fromBufferAttribute(r,C),y.fromBufferAttribute(r,E),p.sub(c),m.sub(c),d.sub(g),y.sub(g);const z=1/(d.x*y.y-y.x*d.y);isFinite(z)&&(S.copy(p).multiplyScalar(y.y).addScaledVector(m,-d.y).multiplyScalar(z),v.copy(m).multiplyScalar(d.x).addScaledVector(p,-y.x).multiplyScalar(z),a[V].add(S),a[C].add(S),a[E].add(S),h[V].add(v),h[C].add(v),h[E].add(v))}let I=this.groups;I.length===0&&(I=[{start:0,count:t.count}]);for(let V=0,C=I.length;V<C;++V){const E=I[V],z=E.start,Q=E.count;for(let it=z,rt=z+Q;it<rt;it+=3)_(t.getX(it+0),t.getX(it+1),t.getX(it+2))}const P=new M,A=new M,O=new M,B=new M;function k(V){O.fromBufferAttribute(i,V),B.copy(O);const C=a[V];P.copy(C),P.sub(O.multiplyScalar(O.dot(C))).normalize(),A.crossVectors(B,C);const z=A.dot(h[V])<0?-1:1;o.setXYZW(V,P.x,P.y,P.z,z)}for(let V=0,C=I.length;V<C;++V){const E=I[V],z=E.start,Q=E.count;for(let it=z,rt=z+Q;it<rt;it+=3)k(t.getX(it+0)),k(t.getX(it+1)),k(t.getX(it+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Hn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let g=0,d=n.count;g<d;g++)n.setXYZ(g,0,0,0);const i=new M,r=new M,o=new M,a=new M,h=new M,c=new M,p=new M,m=new M;if(t)for(let g=0,d=t.count;g<d;g+=3){const y=t.getX(g+0),S=t.getX(g+1),v=t.getX(g+2);i.fromBufferAttribute(e,y),r.fromBufferAttribute(e,S),o.fromBufferAttribute(e,v),p.subVectors(o,r),m.subVectors(i,r),p.cross(m),a.fromBufferAttribute(n,y),h.fromBufferAttribute(n,S),c.fromBufferAttribute(n,v),a.add(p),h.add(p),c.add(p),n.setXYZ(y,a.x,a.y,a.z),n.setXYZ(S,h.x,h.y,h.z),n.setXYZ(v,c.x,c.y,c.z)}else for(let g=0,d=e.count;g<d;g+=3)i.fromBufferAttribute(e,g+0),r.fromBufferAttribute(e,g+1),o.fromBufferAttribute(e,g+2),p.subVectors(o,r),m.subVectors(i,r),p.cross(m),n.setXYZ(g+0,p.x,p.y,p.z),n.setXYZ(g+1,p.x,p.y,p.z),n.setXYZ(g+2,p.x,p.y,p.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Vn.fromBufferAttribute(t,e),Vn.normalize(),t.setXYZ(e,Vn.x,Vn.y,Vn.z)}toNonIndexed(){function t(a,h){const c=a.array,p=a.itemSize,m=a.normalized,g=new c.constructor(h.length*p);let d=0,y=0;for(let S=0,v=h.length;S<v;S++){a.isInterleavedBufferAttribute?d=h[S]*a.data.stride+a.offset:d=h[S]*p;for(let _=0;_<p;_++)g[y++]=c[d++]}return new Hn(g,p,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new vn,n=this.index.array,i=this.attributes;for(const a in i){const h=i[a],c=t(h,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const h=[],c=r[a];for(let p=0,m=c.length;p<m;p++){const g=c[p],d=t(g,n);h.push(d)}e.morphAttributes[a]=h}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,h=o.length;a<h;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const c in h)h[c]!==void 0&&(t[c]=h[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const h in n){const c=n[h];t.data.attributes[h]=c.toJSON(t.data)}const i={};let r=!1;for(const h in this.morphAttributes){const c=this.morphAttributes[h],p=[];for(let m=0,g=c.length;m<g;m++){const d=c[m];p.push(d.toJSON(t.data))}p.length>0&&(i[h]=p,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const c in i){const p=i[c];this.setAttribute(c,p.clone(e))}const r=t.morphAttributes;for(const c in r){const p=[],m=r[c];for(let g=0,d=m.length;g<d;g++)p.push(m[g].clone(e));this.morphAttributes[c]=p}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,p=o.length;c<p;c++){const m=o[c];this.addGroup(m.start,m.count,m.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const h=t.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ld=new Ce,Js=new $r,va=new ys,Ud=new M,ya=new M,Ma=new M,wa=new M,nc=new M,Sa=new M,Nd=new M,ba=new M;class b extends En{constructor(t=new vn,e=new gn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){Sa.set(0,0,0);for(let h=0,c=r.length;h<c;h++){const p=a[h],m=r[h];p!==0&&(nc.fromBufferAttribute(m,t),o?Sa.addScaledVector(nc,p):Sa.addScaledVector(nc.sub(e),p))}e.add(Sa)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),va.copy(n.boundingSphere),va.applyMatrix4(r),Js.copy(t.ray).recast(t.near),!(va.containsPoint(Js.origin)===!1&&(Js.intersectSphere(va,Ud)===null||Js.origin.distanceToSquared(Ud)>(t.far-t.near)**2))&&(Ld.copy(r).invert(),Js.copy(t.ray).applyMatrix4(Ld),!(n.boundingBox!==null&&Js.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Js)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,h=r.attributes.position,c=r.attributes.uv,p=r.attributes.uv1,m=r.attributes.normal,g=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let y=0,S=g.length;y<S;y++){const v=g[y],_=o[v.materialIndex],I=Math.max(v.start,d.start),P=Math.min(a.count,Math.min(v.start+v.count,d.start+d.count));for(let A=I,O=P;A<O;A+=3){const B=a.getX(A),k=a.getX(A+1),V=a.getX(A+2);i=Ea(this,_,t,n,c,p,m,B,k,V),i&&(i.faceIndex=Math.floor(A/3),i.face.materialIndex=v.materialIndex,e.push(i))}}else{const y=Math.max(0,d.start),S=Math.min(a.count,d.start+d.count);for(let v=y,_=S;v<_;v+=3){const I=a.getX(v),P=a.getX(v+1),A=a.getX(v+2);i=Ea(this,o,t,n,c,p,m,I,P,A),i&&(i.faceIndex=Math.floor(v/3),e.push(i))}}else if(h!==void 0)if(Array.isArray(o))for(let y=0,S=g.length;y<S;y++){const v=g[y],_=o[v.materialIndex],I=Math.max(v.start,d.start),P=Math.min(h.count,Math.min(v.start+v.count,d.start+d.count));for(let A=I,O=P;A<O;A+=3){const B=A,k=A+1,V=A+2;i=Ea(this,_,t,n,c,p,m,B,k,V),i&&(i.faceIndex=Math.floor(A/3),i.face.materialIndex=v.materialIndex,e.push(i))}}else{const y=Math.max(0,d.start),S=Math.min(h.count,d.start+d.count);for(let v=y,_=S;v<_;v+=3){const I=v,P=v+1,A=v+2;i=Ea(this,o,t,n,c,p,m,I,P,A),i&&(i.faceIndex=Math.floor(v/3),e.push(i))}}}}function Mm(s,t,e,n,i,r,o,a){let h;if(t.side===Jn?h=n.intersectTriangle(o,r,i,!0,a):h=n.intersectTriangle(i,r,o,t.side===Bs,a),h===null)return null;ba.copy(a),ba.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(ba);return c<e.near||c>e.far?null:{distance:c,point:ba.clone(),object:s}}function Ea(s,t,e,n,i,r,o,a,h,c){s.getVertexPosition(a,ya),s.getVertexPosition(h,Ma),s.getVertexPosition(c,wa);const p=Mm(s,t,e,n,ya,Ma,wa,Nd);if(p){const m=new M;_i.getBarycoord(Nd,ya,Ma,wa,m),i&&(p.uv=_i.getInterpolatedAttribute(i,a,h,c,m,new Dt)),r&&(p.uv1=_i.getInterpolatedAttribute(r,a,h,c,m,new Dt)),o&&(p.normal=_i.getInterpolatedAttribute(o,a,h,c,m,new M),p.normal.dot(n.direction)>0&&p.normal.multiplyScalar(-1));const g={a,b:h,c,normal:new M,materialIndex:0};_i.getNormal(ya,Ma,wa,g.normal),p.face=g,p.barycoord=m}return p}class Nt extends vn{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const h=[],c=[],p=[],m=[];let g=0,d=0;y("z","y","x",-1,-1,n,e,t,o,r,0),y("z","y","x",1,-1,n,e,-t,o,r,1),y("x","z","y",1,1,t,n,e,i,o,2),y("x","z","y",1,-1,t,n,-e,i,o,3),y("x","y","z",1,-1,t,e,n,i,r,4),y("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(h),this.setAttribute("position",new We(c,3)),this.setAttribute("normal",new We(p,3)),this.setAttribute("uv",new We(m,2));function y(S,v,_,I,P,A,O,B,k,V,C){const E=A/k,z=O/V,Q=A/2,it=O/2,rt=B/2,xt=k+1,lt=V+1;let vt=0,ot=0;const Ct=new M;for(let Xt=0;Xt<lt;Xt++){const Kt=Xt*z-it;for(let Pe=0;Pe<xt;Pe++){const ln=Pe*E-Q;Ct[S]=ln*I,Ct[v]=Kt*P,Ct[_]=rt,c.push(Ct.x,Ct.y,Ct.z),Ct[S]=0,Ct[v]=0,Ct[_]=B>0?1:-1,p.push(Ct.x,Ct.y,Ct.z),m.push(Pe/k),m.push(1-Xt/V),vt+=1}}for(let Xt=0;Xt<V;Xt++)for(let Kt=0;Kt<k;Kt++){const Pe=g+Kt+xt*Xt,ln=g+Kt+xt*(Xt+1),en=g+(Kt+1)+xt*(Xt+1),ct=g+(Kt+1)+xt*Xt;h.push(Pe,ln,ct),h.push(ln,en,ct),ot+=6}a.addGroup(d,ot,C),d+=ot,g+=vt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Kr(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function ni(s){const t={};for(let e=0;e<s.length;e++){const n=Kr(s[e]);for(const i in n)t[i]=n[i]}return t}function wm(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function uf(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$e.workingColorSpace}const Fo={clone:Kr,merge:ni};var Sm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $n extends ks{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sm,this.fragmentShader=bm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Kr(t.uniforms),this.uniformsGroups=wm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class ff extends En{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ce,this.projectionMatrix=new Ce,this.projectionMatrixInverse=new Ce,this.coordinateSystem=Yi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Us=new M,Fd=new Dt,Od=new Dt;class li extends ff{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=jr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ao*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return jr*2*Math.atan(Math.tan(Ao*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Us.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Us.x,Us.y).multiplyScalar(-t/Us.z),Us.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Us.x,Us.y).multiplyScalar(-t/Us.z)}getViewSize(t,e){return this.getViewBounds(t,Fd,Od),e.subVectors(Od,Fd)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ao*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const h=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/h,e-=o.offsetY*n/c,i*=o.width/h,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ar=-90,Cr=1;class Em extends En{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new li(Ar,Cr,t,e);i.layers=this.layers,this.add(i);const r=new li(Ar,Cr,t,e);r.layers=this.layers,this.add(r);const o=new li(Ar,Cr,t,e);o.layers=this.layers,this.add(o);const a=new li(Ar,Cr,t,e);a.layers=this.layers,this.add(a);const h=new li(Ar,Cr,t,e);h.layers=this.layers,this.add(h);const c=new li(Ar,Cr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,h]=e;for(const c of e)this.remove(c);if(t===Yi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(t===el)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,h,c,p]=this.children,m=t.getRenderTarget(),g=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),y=t.xr.enabled;t.xr.enabled=!1;const S=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,h),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=S,t.setRenderTarget(n,5,i),t.render(e,p),t.setRenderTarget(m,g,d),t.xr.enabled=y,n.texture.needsPMREMUpdate=!0}}class pf extends Yn{constructor(t=[],e=Xr,n,i,r,o,a,h,c,p){super(t,e,n,i,r,o,a,h,c,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Tm extends Di{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new pf(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Nt(5,5,5),r=new $n({name:"CubemapFromEquirect",uniforms:Kr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Jn,blending:_s});r.uniforms.tEquirect.value=e;const o=new b(i,r),a=e.minFilter;return e.minFilter===ar&&(e.minFilter=Xi),new Em(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}class St extends En{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Am={type:"move"};class ic{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new St,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new St,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new M,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new M),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new St,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new M,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new M),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,h=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const S of t.hand.values()){const v=e.getJointPose(S,n),_=this._getHandJoint(c,S);v!==null&&(_.matrix.fromArray(v.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=v.radius),_.visible=v!==null}const p=c.joints["index-finger-tip"],m=c.joints["thumb-tip"],g=p.position.distanceTo(m.position),d=.02,y=.005;c.inputState.pinching&&g>d+y?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&g<=d-y&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else h!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Am)))}return a!==null&&(a.visible=i!==null),h!==null&&(h.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new St;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class bh{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new be(t),this.density=e}clone(){return new bh(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Eh{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new be(t),this.near=e,this.far=n}clone(){return new Eh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Bd extends En{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Li,this.environmentIntensity=1,this.environmentRotation=new Li,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Cm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=oh,this.updateRanges=[],this.version=0,this.uuid=Ii()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ii()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ii()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ei=new M;class nl{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)ei.fromBufferAttribute(this,e),ei.applyMatrix4(t),this.setXYZ(e,ei.x,ei.y,ei.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ei.fromBufferAttribute(this,e),ei.applyNormalMatrix(t),this.setXYZ(e,ei.x,ei.y,ei.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ei.fromBufferAttribute(this,e),ei.transformDirection(t),this.setXYZ(e,ei.x,ei.y,ei.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Ri(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=on(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=on(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=on(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=on(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=on(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Ri(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Ri(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Ri(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Ri(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=on(e,this.array),n=on(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=on(e,this.array),n=on(n,this.array),i=on(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=on(e,this.array),n=on(n,this.array),i=on(i,this.array),r=on(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Hn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new nl(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Eo extends ks{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new be(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Rr;const _o=new M,Pr=new M,Ir=new M,Dr=new Dt,xo=new Dt,mf=new Ce,Ta=new M,vo=new M,Aa=new M,zd=new Dt,sc=new Dt,kd=new Dt;class Ca extends En{constructor(t=new Eo){if(super(),this.isSprite=!0,this.type="Sprite",Rr===void 0){Rr=new vn;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Cm(e,5);Rr.setIndex([0,1,2,0,2,3]),Rr.setAttribute("position",new nl(n,3,0,!1)),Rr.setAttribute("uv",new nl(n,2,3,!1))}this.geometry=Rr,this.material=t,this.center=new Dt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Pr.setFromMatrixScale(this.matrixWorld),mf.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ir.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Pr.multiplyScalar(-Ir.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;Ra(Ta.set(-.5,-.5,0),Ir,o,Pr,i,r),Ra(vo.set(.5,-.5,0),Ir,o,Pr,i,r),Ra(Aa.set(.5,.5,0),Ir,o,Pr,i,r),zd.set(0,0),sc.set(1,0),kd.set(1,1);let a=t.ray.intersectTriangle(Ta,vo,Aa,!1,_o);if(a===null&&(Ra(vo.set(-.5,.5,0),Ir,o,Pr,i,r),sc.set(0,1),a=t.ray.intersectTriangle(Ta,Aa,vo,!1,_o),a===null))return;const h=t.ray.origin.distanceTo(_o);h<t.near||h>t.far||e.push({distance:h,point:_o.clone(),uv:_i.getInterpolation(_o,Ta,vo,Aa,zd,sc,kd,new Dt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Ra(s,t,e,n,i,r){Dr.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(xo.x=r*Dr.x-i*Dr.y,xo.y=i*Dr.x+r*Dr.y):xo.copy(Dr),s.copy(t),s.x+=xo.x,s.y+=xo.y,s.applyMatrix4(mf)}const Vd=new M,Hd=new tn,Gd=new tn,Rm=new M,Wd=new Ce,Pa=new M,rc=new ys,Xd=new Ce,oc=new $r;class Hy extends b{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=_d,this.bindMatrix=new Ce,this.bindMatrixInverse=new Ce,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new ji),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Pa),this.boundingBox.expandByPoint(Pa)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ys),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Pa),this.boundingSphere.expandByPoint(Pa)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rc.copy(this.boundingSphere),rc.applyMatrix4(i),t.ray.intersectsSphere(rc)!==!1&&(Xd.copy(i).invert(),oc.copy(t.ray).applyMatrix4(Xd),!(this.boundingBox!==null&&oc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,oc)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new tn,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===_d?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===bp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;Hd.fromBufferAttribute(i.attributes.skinIndex,t),Gd.fromBufferAttribute(i.attributes.skinWeight,t),Vd.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const o=Gd.getComponent(r);if(o!==0){const a=Hd.getComponent(r);Wd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Rm.copy(Vd).applyMatrix4(Wd),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class Pm extends En{constructor(){super(),this.isBone=!0,this.type="Bone"}}class gf extends Yn{constructor(t=null,e=1,n=1,i,r,o,a,h,c=pi,p=pi,m,g){super(null,o,a,h,c,p,i,r,m,g),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Yd=new Ce,Im=new Ce;class _f{constructor(t=[],e=[]){this.uuid=Ii(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ce)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Ce;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:Im;Yd.multiplyMatrices(a,e[r]),Yd.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new _f(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new gf(e,t,t,xi,Pi);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const r=t.bones[n];let o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Pm),this.bones.push(o),this.boneInverses.push(new Ce().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,r=e.length;i<r;i++){const o=e[i];t.bones.push(o.uuid);const a=n[i];t.boneInverses.push(a.toArray())}return t}}class qd extends Hn{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Lr=new Ce,jd=new Ce,Ia=[],Kd=new ji,Dm=new Ce,yo=new b,Mo=new ys;class Lm extends b{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new qd(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Dm)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ji),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Lr),Kd.copy(t.boundingBox).applyMatrix4(Lr),this.boundingBox.union(Kd)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ys),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Lr),Mo.copy(t.boundingSphere).applyMatrix4(Lr),this.boundingSphere.union(Mo)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(yo.geometry=this.geometry,yo.material=this.material,yo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Mo.copy(this.boundingSphere),Mo.applyMatrix4(n),t.ray.intersectsSphere(Mo)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Lr),jd.multiplyMatrices(n,Lr),yo.matrixWorld=jd,yo.raycast(t,Ia);for(let o=0,a=Ia.length;o<a;o++){const h=Ia[o];h.instanceId=r,h.object=this,e.push(h)}Ia.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new qd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new gf(new Float32Array(i*this.count),i,this.count,gh,Pi));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,h=i*t;r[h]=a,r.set(n,h+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ac=new M,Um=new M,Nm=new Ne;class fs{constructor(t=new M(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=ac.subVectors(n,e).cross(Um.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ac),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Nm.getNormalMatrix(t),i=this.coplanarPoint(ac).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qs=new ys,Fm=new Dt(.5,.5),Da=new M;class Th{constructor(t=new fs,e=new fs,n=new fs,i=new fs,r=new fs,o=new fs){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Yi,n=!1){const i=this.planes,r=t.elements,o=r[0],a=r[1],h=r[2],c=r[3],p=r[4],m=r[5],g=r[6],d=r[7],y=r[8],S=r[9],v=r[10],_=r[11],I=r[12],P=r[13],A=r[14],O=r[15];if(i[0].setComponents(c-o,d-p,_-y,O-I).normalize(),i[1].setComponents(c+o,d+p,_+y,O+I).normalize(),i[2].setComponents(c+a,d+m,_+S,O+P).normalize(),i[3].setComponents(c-a,d-m,_-S,O-P).normalize(),n)i[4].setComponents(h,g,v,A).normalize(),i[5].setComponents(c-h,d-g,_-v,O-A).normalize();else if(i[4].setComponents(c-h,d-g,_-v,O-A).normalize(),e===Yi)i[5].setComponents(c+h,d+g,_+v,O+A).normalize();else if(e===el)i[5].setComponents(h,g,v,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Qs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Qs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Qs)}intersectsSprite(t){Qs.center.set(0,0,0);const e=Fm.distanceTo(t.center);return Qs.radius=.7071067811865476+e,Qs.applyMatrix4(t.matrixWorld),this.intersectsSphere(Qs)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Da.x=i.normal.x>0?t.max.x:t.min.x,Da.y=i.normal.y>0?t.max.y:t.min.y,Da.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Da)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Om extends ks{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const il=new M,sl=new M,Zd=new Ce,wo=new $r,La=new ys,lc=new M,$d=new M;class xf extends En{constructor(t=new vn,e=new Om){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)il.fromBufferAttribute(e,i-1),sl.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=il.distanceTo(sl);t.setAttribute("lineDistance",new We(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),La.copy(n.boundingSphere),La.applyMatrix4(i),La.radius+=r,t.ray.intersectsSphere(La)===!1)return;Zd.copy(i).invert(),wo.copy(t.ray).applyMatrix4(Zd);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=a*a,c=this.isLineSegments?2:1,p=n.index,g=n.attributes.position;if(p!==null){const d=Math.max(0,o.start),y=Math.min(p.count,o.start+o.count);for(let S=d,v=y-1;S<v;S+=c){const _=p.getX(S),I=p.getX(S+1),P=Ua(this,t,wo,h,_,I,S);P&&e.push(P)}if(this.isLineLoop){const S=p.getX(y-1),v=p.getX(d),_=Ua(this,t,wo,h,S,v,y-1);_&&e.push(_)}}else{const d=Math.max(0,o.start),y=Math.min(g.count,o.start+o.count);for(let S=d,v=y-1;S<v;S+=c){const _=Ua(this,t,wo,h,S,S+1,S);_&&e.push(_)}if(this.isLineLoop){const S=Ua(this,t,wo,h,y-1,d,y-1);S&&e.push(S)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ua(s,t,e,n,i,r,o){const a=s.geometry.attributes.position;if(il.fromBufferAttribute(a,i),sl.fromBufferAttribute(a,r),e.distanceSqToSegment(il,sl,lc,$d)>n)return;lc.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(lc);if(!(c<t.near||c>t.far))return{distance:c,point:$d.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}const Jd=new M,Qd=new M;class Gy extends xf{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)Jd.fromBufferAttribute(e,i),Qd.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Jd.distanceTo(Qd);t.setAttribute("lineDistance",new We(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Wy extends xf{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class nr extends ks{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const tu=new Ce,ah=new $r,Na=new ys,Fa=new M;class Ur extends En{constructor(t=new vn,e=new nr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Na.copy(n.boundingSphere),Na.applyMatrix4(i),Na.radius+=r,t.ray.intersectsSphere(Na)===!1)return;tu.copy(i).invert(),ah.copy(t.ray).applyMatrix4(tu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=a*a,c=n.index,m=n.attributes.position;if(c!==null){const g=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let y=g,S=d;y<S;y++){const v=c.getX(y);Fa.fromBufferAttribute(m,v),eu(Fa,v,h,i,t,e,this)}}else{const g=Math.max(0,o.start),d=Math.min(m.count,o.start+o.count);for(let y=g,S=d;y<S;y++)Fa.fromBufferAttribute(m,y),eu(Fa,y,h,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function eu(s,t,e,n,i,r,o){const a=ah.distanceSqToPoint(s);if(a<e){const h=new M;ah.closestPointToPoint(s,h),h.applyMatrix4(n);const c=i.ray.origin.distanceTo(h);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:h,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class ri extends Yn{constructor(t,e,n,i,r,o,a,h,c){super(t,e,n,i,r,o,a,h,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class vf extends Yn{constructor(t,e,n=lr,i,r,o,a=pi,h=pi,c,p=Lo,m=1){if(p!==Lo&&p!==Uo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:t,height:e,depth:m};super(g,i,r,o,a,h,p,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new wh(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Ge extends vn{constructor(t=1,e=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:i,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));const o=[],a=[],h=[],c=[],p=e/2,m=Math.PI/2*t,g=e,d=2*m+g,y=n*2+r,S=i+1,v=new M,_=new M;for(let I=0;I<=y;I++){let P=0,A=0,O=0,B=0;if(I<=n){const C=I/n,E=C*Math.PI/2;A=-p-t*Math.cos(E),O=t*Math.sin(E),B=-t*Math.cos(E),P=C*m}else if(I<=n+r){const C=(I-n)/r;A=-p+C*e,O=t,B=0,P=m+C*g}else{const C=(I-n-r)/n,E=C*Math.PI/2;A=p+t*Math.sin(E),O=t*Math.cos(E),B=t*Math.sin(E),P=m+g+C*m}const k=Math.max(0,Math.min(1,P/d));let V=0;I===0?V=.5/i:I===y&&(V=-.5/i);for(let C=0;C<=i;C++){const E=C/i,z=E*Math.PI*2,Q=Math.sin(z),it=Math.cos(z);_.x=-O*it,_.y=A,_.z=O*Q,a.push(_.x,_.y,_.z),v.set(-O*it,B,O*Q),v.normalize(),h.push(v.x,v.y,v.z),c.push(E+V,k)}if(I>0){const C=(I-1)*S;for(let E=0;E<i;E++){const z=C+E,Q=C+E+1,it=I*S+E,rt=I*S+E+1;o.push(z,Q,it),o.push(Q,rt,it)}}}this.setIndex(o),this.setAttribute("position",new We(a,3)),this.setAttribute("normal",new We(h,3)),this.setAttribute("uv",new We(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ge(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class ai extends vn{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],h=[],c=new M,p=new Dt;o.push(0,0,0),a.push(0,0,1),h.push(.5,.5);for(let m=0,g=3;m<=e;m++,g+=3){const d=n+m/e*i;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),p.x=(o[g]/t+1)/2,p.y=(o[g+1]/t+1)/2,h.push(p.x,p.y)}for(let m=1;m<=e;m++)r.push(m,m+1,0);this.setIndex(r),this.setAttribute("position",new We(o,3)),this.setAttribute("normal",new We(a,3)),this.setAttribute("uv",new We(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ai(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class pt extends vn{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:h};const c=this;i=Math.floor(i),r=Math.floor(r);const p=[],m=[],g=[],d=[];let y=0;const S=[],v=n/2;let _=0;I(),o===!1&&(t>0&&P(!0),e>0&&P(!1)),this.setIndex(p),this.setAttribute("position",new We(m,3)),this.setAttribute("normal",new We(g,3)),this.setAttribute("uv",new We(d,2));function I(){const A=new M,O=new M;let B=0;const k=(e-t)/n;for(let V=0;V<=r;V++){const C=[],E=V/r,z=E*(e-t)+t;for(let Q=0;Q<=i;Q++){const it=Q/i,rt=it*h+a,xt=Math.sin(rt),lt=Math.cos(rt);O.x=z*xt,O.y=-E*n+v,O.z=z*lt,m.push(O.x,O.y,O.z),A.set(xt,k,lt).normalize(),g.push(A.x,A.y,A.z),d.push(it,1-E),C.push(y++)}S.push(C)}for(let V=0;V<i;V++)for(let C=0;C<r;C++){const E=S[C][V],z=S[C+1][V],Q=S[C+1][V+1],it=S[C][V+1];(t>0||C!==0)&&(p.push(E,z,it),B+=3),(e>0||C!==r-1)&&(p.push(z,Q,it),B+=3)}c.addGroup(_,B,0),_+=B}function P(A){const O=y,B=new Dt,k=new M;let V=0;const C=A===!0?t:e,E=A===!0?1:-1;for(let Q=1;Q<=i;Q++)m.push(0,v*E,0),g.push(0,E,0),d.push(.5,.5),y++;const z=y;for(let Q=0;Q<=i;Q++){const rt=Q/i*h+a,xt=Math.cos(rt),lt=Math.sin(rt);k.x=C*lt,k.y=v*E,k.z=C*xt,m.push(k.x,k.y,k.z),g.push(0,E,0),B.x=xt*.5+.5,B.y=lt*.5*E+.5,d.push(B.x,B.y),y++}for(let Q=0;Q<i;Q++){const it=O+Q,rt=z+Q;A===!0?p.push(rt,rt+1,it):p.push(rt+1,rt,it),V+=3}c.addGroup(_,V,A===!0?1:2),_+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pt(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ai extends pt{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Ai(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Oo extends vn{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],o=[];a(i),c(n),p(),this.setAttribute("position",new We(r,3)),this.setAttribute("normal",new We(r.slice(),3)),this.setAttribute("uv",new We(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(I){const P=new M,A=new M,O=new M;for(let B=0;B<e.length;B+=3)d(e[B+0],P),d(e[B+1],A),d(e[B+2],O),h(P,A,O,I)}function h(I,P,A,O){const B=O+1,k=[];for(let V=0;V<=B;V++){k[V]=[];const C=I.clone().lerp(A,V/B),E=P.clone().lerp(A,V/B),z=B-V;for(let Q=0;Q<=z;Q++)Q===0&&V===B?k[V][Q]=C:k[V][Q]=C.clone().lerp(E,Q/z)}for(let V=0;V<B;V++)for(let C=0;C<2*(B-V)-1;C++){const E=Math.floor(C/2);C%2===0?(g(k[V][E+1]),g(k[V+1][E]),g(k[V][E])):(g(k[V][E+1]),g(k[V+1][E+1]),g(k[V+1][E]))}}function c(I){const P=new M;for(let A=0;A<r.length;A+=3)P.x=r[A+0],P.y=r[A+1],P.z=r[A+2],P.normalize().multiplyScalar(I),r[A+0]=P.x,r[A+1]=P.y,r[A+2]=P.z}function p(){const I=new M;for(let P=0;P<r.length;P+=3){I.x=r[P+0],I.y=r[P+1],I.z=r[P+2];const A=v(I)/2/Math.PI+.5,O=_(I)/Math.PI+.5;o.push(A,1-O)}y(),m()}function m(){for(let I=0;I<o.length;I+=6){const P=o[I+0],A=o[I+2],O=o[I+4],B=Math.max(P,A,O),k=Math.min(P,A,O);B>.9&&k<.1&&(P<.2&&(o[I+0]+=1),A<.2&&(o[I+2]+=1),O<.2&&(o[I+4]+=1))}}function g(I){r.push(I.x,I.y,I.z)}function d(I,P){const A=I*3;P.x=t[A+0],P.y=t[A+1],P.z=t[A+2]}function y(){const I=new M,P=new M,A=new M,O=new M,B=new Dt,k=new Dt,V=new Dt;for(let C=0,E=0;C<r.length;C+=9,E+=6){I.set(r[C+0],r[C+1],r[C+2]),P.set(r[C+3],r[C+4],r[C+5]),A.set(r[C+6],r[C+7],r[C+8]),B.set(o[E+0],o[E+1]),k.set(o[E+2],o[E+3]),V.set(o[E+4],o[E+5]),O.copy(I).add(P).add(A).divideScalar(3);const z=v(O);S(B,E+0,I,z),S(k,E+2,P,z),S(V,E+4,A,z)}}function S(I,P,A,O){O<0&&I.x===1&&(o[P]=I.x-1),A.x===0&&A.z===0&&(o[P]=O/2/Math.PI+.5)}function v(I){return Math.atan2(I.z,-I.x)}function _(I){return Math.atan2(-I.y,Math.sqrt(I.x*I.x+I.z*I.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oo(t.vertices,t.indices,t.radius,t.details)}}class rl extends Oo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new rl(t.radius,t.detail)}}class Ms{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,h=r-1,c;for(;a<=h;)if(i=Math.floor(a+(h-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)h=i-1;else{h=i;break}if(i=h,n[i]===o)return i/(r-1);const p=n[i],g=n[i+1]-p,d=(o-p)/g;return(i+d)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),h=e||(o.isVector2?new Dt:new M);return h.copy(a).sub(o).normalize(),h}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new M,i=[],r=[],o=[],a=new M,h=new Ce;for(let d=0;d<=t;d++){const y=d/t;i[d]=this.getTangentAt(y,new M)}r[0]=new M,o[0]=new M;let c=Number.MAX_VALUE;const p=Math.abs(i[0].x),m=Math.abs(i[0].y),g=Math.abs(i[0].z);p<=c&&(c=p,n.set(1,0,0)),m<=c&&(c=m,n.set(0,1,0)),g<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const y=Math.acos(Fe(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(h.makeRotationAxis(a,y))}o[d].crossVectors(i[d],r[d])}if(e===!0){let d=Math.acos(Fe(r[0].dot(r[t]),-1,1));d/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let y=1;y<=t;y++)r[y].applyMatrix4(h.makeRotationAxis(i[y],d*y)),o[y].crossVectors(i[y],r[y])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class yf extends Ms{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,h=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=h}getPoint(t,e=new Dt){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let h=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const p=Math.cos(this.aRotation),m=Math.sin(this.aRotation),g=h-this.aX,d=c-this.aY;h=g*p-d*m+this.aX,c=g*m+d*p+this.aY}return n.set(h,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Bm extends yf{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ah(){let s=0,t=0,e=0,n=0;function i(r,o,a,h){s=r,t=a,e=-3*r+3*o-2*a-h,n=2*r-2*o+a+h}return{initCatmullRom:function(r,o,a,h,c){i(o,a,c*(a-r),c*(h-o))},initNonuniformCatmullRom:function(r,o,a,h,c,p,m){let g=(o-r)/c-(a-r)/(c+p)+(a-o)/p,d=(a-o)/p-(h-o)/(p+m)+(h-a)/m;g*=p,d*=p,i(o,a,g,d)},calc:function(r){const o=r*r,a=o*r;return s+t*r+e*o+n*a}}}const Oa=new M,cc=new Ah,hc=new Ah,dc=new Ah;class Or extends Ms{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new M){const n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),h=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:h===0&&a===r-1&&(a=r-2,h=1);let c,p;this.closed||a>0?c=i[(a-1)%r]:(Oa.subVectors(i[0],i[1]).add(i[0]),c=Oa);const m=i[a%r],g=i[(a+1)%r];if(this.closed||a+2<r?p=i[(a+2)%r]:(Oa.subVectors(i[r-1],i[r-2]).add(i[r-1]),p=Oa),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let y=Math.pow(c.distanceToSquared(m),d),S=Math.pow(m.distanceToSquared(g),d),v=Math.pow(g.distanceToSquared(p),d);S<1e-4&&(S=1),y<1e-4&&(y=S),v<1e-4&&(v=S),cc.initNonuniformCatmullRom(c.x,m.x,g.x,p.x,y,S,v),hc.initNonuniformCatmullRom(c.y,m.y,g.y,p.y,y,S,v),dc.initNonuniformCatmullRom(c.z,m.z,g.z,p.z,y,S,v)}else this.curveType==="catmullrom"&&(cc.initCatmullRom(c.x,m.x,g.x,p.x,this.tension),hc.initCatmullRom(c.y,m.y,g.y,p.y,this.tension),dc.initCatmullRom(c.z,m.z,g.z,p.z,this.tension));return n.set(cc.calc(h),hc.calc(h),dc.calc(h)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new M().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function nu(s,t,e,n,i){const r=(n-t)*.5,o=(i-e)*.5,a=s*s,h=s*a;return(2*e-2*n+r+o)*h+(-3*e+3*n-2*r-o)*a+r*s+e}function zm(s,t){const e=1-s;return e*e*t}function km(s,t){return 2*(1-s)*s*t}function Vm(s,t){return s*s*t}function Ro(s,t,e,n){return zm(s,t)+km(s,e)+Vm(s,n)}function Hm(s,t){const e=1-s;return e*e*e*t}function Gm(s,t){const e=1-s;return 3*e*e*s*t}function Wm(s,t){return 3*(1-s)*s*s*t}function Xm(s,t){return s*s*s*t}function Po(s,t,e,n,i){return Hm(s,t)+Gm(s,e)+Wm(s,n)+Xm(s,i)}class Ym extends Ms{constructor(t=new Dt,e=new Dt,n=new Dt,i=new Dt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Dt){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Po(t,i.x,r.x,o.x,a.x),Po(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class qm extends Ms{constructor(t=new M,e=new M,n=new M,i=new M){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new M){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Po(t,i.x,r.x,o.x,a.x),Po(t,i.y,r.y,o.y,a.y),Po(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class jm extends Ms{constructor(t=new Dt,e=new Dt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Dt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Dt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Km extends Ms{constructor(t=new M,e=new M){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new M){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new M){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zm extends Ms{constructor(t=new Dt,e=new Dt,n=new Dt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Dt){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Ro(t,i.x,r.x,o.x),Ro(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ol extends Ms{constructor(t=new M,e=new M,n=new M){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new M){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Ro(t,i.x,r.x,o.x),Ro(t,i.y,r.y,o.y),Ro(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $m extends Ms{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Dt){const n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,h=i[o===0?o:o-1],c=i[o],p=i[o>i.length-2?i.length-1:o+1],m=i[o>i.length-3?i.length-1:o+2];return n.set(nu(a,h.x,c.x,p.x,m.x),nu(a,h.y,c.y,p.y,m.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new Dt().fromArray(i))}return this}}var Jm=Object.freeze({__proto__:null,ArcCurve:Bm,CatmullRomCurve3:Or,CubicBezierCurve:Ym,CubicBezierCurve3:qm,EllipseCurve:yf,LineCurve:jm,LineCurve3:Km,QuadraticBezierCurve:Zm,QuadraticBezierCurve3:ol,SplineCurve:$m});class Ch extends Oo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ch(t.radius,t.detail)}}class Rh extends Oo{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Rh(t.radius,t.detail)}}class ps extends vn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),h=Math.floor(i),c=a+1,p=h+1,m=t/a,g=e/h,d=[],y=[],S=[],v=[];for(let _=0;_<p;_++){const I=_*g-o;for(let P=0;P<c;P++){const A=P*m-r;y.push(A,-I,0),S.push(0,0,1),v.push(P/a),v.push(1-_/h)}}for(let _=0;_<h;_++)for(let I=0;I<a;I++){const P=I+c*_,A=I+c*(_+1),O=I+1+c*(_+1),B=I+1+c*_;d.push(P,A,B),d.push(A,O,B)}this.setIndex(d),this.setAttribute("position",new We(y,3)),this.setAttribute("normal",new We(S,3)),this.setAttribute("uv",new We(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ps(t.width,t.height,t.widthSegments,t.heightSegments)}}class ie extends vn{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const h=Math.min(o+a,Math.PI);let c=0;const p=[],m=new M,g=new M,d=[],y=[],S=[],v=[];for(let _=0;_<=n;_++){const I=[],P=_/n;let A=0;_===0&&o===0?A=.5/e:_===n&&h===Math.PI&&(A=-.5/e);for(let O=0;O<=e;O++){const B=O/e;m.x=-t*Math.cos(i+B*r)*Math.sin(o+P*a),m.y=t*Math.cos(o+P*a),m.z=t*Math.sin(i+B*r)*Math.sin(o+P*a),y.push(m.x,m.y,m.z),g.copy(m).normalize(),S.push(g.x,g.y,g.z),v.push(B+A,1-P),I.push(c++)}p.push(I)}for(let _=0;_<n;_++)for(let I=0;I<e;I++){const P=p[_][I+1],A=p[_][I],O=p[_+1][I],B=p[_+1][I+1];(_!==0||o>0)&&d.push(P,A,B),(_!==n-1||h<Math.PI)&&d.push(A,O,B)}this.setIndex(d),this.setAttribute("position",new We(y,3)),this.setAttribute("normal",new We(S,3)),this.setAttribute("uv",new We(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ie(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ve extends vn{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],h=[],c=[],p=new M,m=new M,g=new M;for(let d=0;d<=n;d++)for(let y=0;y<=i;y++){const S=y/i*r,v=d/n*Math.PI*2;m.x=(t+e*Math.cos(v))*Math.cos(S),m.y=(t+e*Math.cos(v))*Math.sin(S),m.z=e*Math.sin(v),a.push(m.x,m.y,m.z),p.x=t*Math.cos(S),p.y=t*Math.sin(S),g.subVectors(m,p).normalize(),h.push(g.x,g.y,g.z),c.push(y/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let y=1;y<=i;y++){const S=(i+1)*d+y-1,v=(i+1)*(d-1)+y-1,_=(i+1)*(d-1)+y,I=(i+1)*d+y;o.push(S,v,I),o.push(v,_,I)}this.setIndex(o),this.setAttribute("position",new We(a,3)),this.setAttribute("normal",new We(h,3)),this.setAttribute("uv",new We(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ve(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Ci extends vn{constructor(t=new ol(new M(-1,-1,0),new M(-1,1,0),new M(1,1,0)),e=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new M,h=new M,c=new Dt;let p=new M;const m=[],g=[],d=[],y=[];S(),this.setIndex(y),this.setAttribute("position",new We(m,3)),this.setAttribute("normal",new We(g,3)),this.setAttribute("uv",new We(d,2));function S(){for(let P=0;P<e;P++)v(P);v(r===!1?e:0),I(),_()}function v(P){p=t.getPointAt(P/e,p);const A=o.normals[P],O=o.binormals[P];for(let B=0;B<=i;B++){const k=B/i*Math.PI*2,V=Math.sin(k),C=-Math.cos(k);h.x=C*A.x+V*O.x,h.y=C*A.y+V*O.y,h.z=C*A.z+V*O.z,h.normalize(),g.push(h.x,h.y,h.z),a.x=p.x+n*h.x,a.y=p.y+n*h.y,a.z=p.z+n*h.z,m.push(a.x,a.y,a.z)}}function _(){for(let P=1;P<=e;P++)for(let A=1;A<=i;A++){const O=(i+1)*(P-1)+(A-1),B=(i+1)*P+(A-1),k=(i+1)*P+A,V=(i+1)*(P-1)+A;y.push(O,B,V),y.push(B,k,V)}}function I(){for(let P=0;P<=e;P++)for(let A=0;A<=i;A++)c.x=P/e,c.y=A/i,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Ci(new Jm[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Qm extends $n{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class wt extends ks{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rf,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Li,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class So extends wt{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Dt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Fe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class t0 extends ks{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Pp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class e0 extends ks{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}function Ba(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function n0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function i0(s){function t(i,r){return s[i]-s[r]}const e=s.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function iu(s,t,e){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=e[r]*t;for(let h=0;h!==t;++h)i[o++]=s[a+h]}return i}function Mf(s,t,e,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push(...o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=s[i++];while(r!==void 0)}class hl{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],r=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=r)){const a=e[1];t<a&&(n=2,r=a);for(let h=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===h)break;if(i=r,r=e[--n-1],t>=r)break e}o=n,n=0;break n}break t}for(;n<o;){const a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class s0 extends hl{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Br,endingEnd:Br}}intervalChanged_(t,e,n){const i=this.parameterPositions;let r=t-2,o=t+1,a=i[r],h=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case zr:r=t,a=2*e-n;break;case Qa:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(h===void 0)switch(this.getSettings_().endingEnd){case zr:o=t,h=2*n-e;break;case Qa:o=1,h=n+i[1]-i[0];break;default:o=t-1,h=e}const c=(n-e)*.5,p=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(h-n),this._offsetPrev=r*p,this._offsetNext=o*p}interpolate_(t,e,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,h=t*a,c=h-a,p=this._offsetPrev,m=this._offsetNext,g=this._weightPrev,d=this._weightNext,y=(n-e)/(i-e),S=y*y,v=S*y,_=-g*v+2*g*S-g*y,I=(1+g)*v+(-1.5-2*g)*S+(-.5+g)*y+1,P=(-1-d)*v+(1.5+d)*S+.5*y,A=d*v-d*S;for(let O=0;O!==a;++O)r[O]=_*o[p+O]+I*o[c+O]+P*o[h+O]+A*o[m+O];return r}}class wf extends hl{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,h=t*a,c=h-a,p=(n-e)/(i-e),m=1-p;for(let g=0;g!==a;++g)r[g]=o[c+g]*m+o[h+g]*p;return r}}class r0 extends hl{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class Ui{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ba(e,this.TimeBufferType),this.values=Ba(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ba(t.times,Array),values:Ba(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new r0(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new wf(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new s0(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ja:e=this.InterpolantFactoryMethodDiscrete;break;case rh:e=this.InterpolantFactoryMethodLinear;break;case Fl:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ja;case this.InterpolantFactoryMethodLinear:return rh;case this.InterpolantFactoryMethodSmooth:return Fl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){const h=n[a];if(typeof h=="number"&&isNaN(h)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,h),t=!1;break}if(o!==null&&o>h){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,h,o),t=!1;break}o=h}if(i!==void 0&&n0(i))for(let a=0,h=i.length;a!==h;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Fl,r=t.length-1;let o=1;for(let a=1;a<r;++a){let h=!1;const c=t[a],p=t[a+1];if(c!==p&&(a!==1||c!==t[0]))if(i)h=!0;else{const m=a*n,g=m-n,d=m+n;for(let y=0;y!==n;++y){const S=e[m+y];if(S!==e[g+y]||S!==e[d+y]){h=!0;break}}}if(h){if(a!==o){t[o]=t[a];const m=a*n,g=o*n;for(let d=0;d!==n;++d)e[g+d]=e[m+d]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,h=o*n,c=0;c!==n;++c)e[h+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}Ui.prototype.ValueTypeName="";Ui.prototype.TimeBufferType=Float32Array;Ui.prototype.ValueBufferType=Float32Array;Ui.prototype.DefaultInterpolation=rh;class Jr extends Ui{constructor(t,e,n){super(t,e,n)}}Jr.prototype.ValueTypeName="bool";Jr.prototype.ValueBufferType=Array;Jr.prototype.DefaultInterpolation=Ja;Jr.prototype.InterpolantFactoryMethodLinear=void 0;Jr.prototype.InterpolantFactoryMethodSmooth=void 0;class Sf extends Ui{constructor(t,e,n,i){super(t,e,n,i)}}Sf.prototype.ValueTypeName="color";class al extends Ui{constructor(t,e,n,i){super(t,e,n,i)}}al.prototype.ValueTypeName="number";class o0 extends hl{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,h=(n-e)/(i-e);let c=t*a;for(let p=c+a;c!==p;c+=4)ci.slerpFlat(r,0,o,c-a,o,c,h);return r}}class dl extends Ui{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new o0(this.times,this.values,this.getValueSize(),t)}}dl.prototype.ValueTypeName="quaternion";dl.prototype.InterpolantFactoryMethodSmooth=void 0;class Qr extends Ui{constructor(t,e,n){super(t,e,n)}}Qr.prototype.ValueTypeName="string";Qr.prototype.ValueBufferType=Array;Qr.prototype.DefaultInterpolation=Ja;Qr.prototype.InterpolantFactoryMethodLinear=void 0;Qr.prototype.InterpolantFactoryMethodSmooth=void 0;class ll extends Ui{constructor(t,e,n,i){super(t,e,n,i)}}ll.prototype.ValueTypeName="vector";class su{constructor(t="",e=-1,n=[],i=yh){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=Ii(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(l0(n[o]).scale(i));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let r=0,o=n.length;r!==o;++r)e.push(Ui.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const r=e.length,o=[];for(let a=0;a<r;a++){let h=[],c=[];h.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const p=i0(h);h=iu(h,1,p),c=iu(c,1,p),!i&&h[0]===0&&(h.push(r),c.push(c[0])),o.push(new al(".morphTargetInfluences["+e[a].name+"]",h,c).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,h=t.length;a<h;a++){const c=t[a],p=c.name.match(r);if(p&&p.length>1){const m=p[1];let g=i[m];g||(i[m]=g=[]),g.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return o}static parseAnimation(t,e){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(m,g,d,y,S){if(d.length!==0){const v=[],_=[];Mf(d,v,_,y),v.length!==0&&S.push(new m(g,v,_))}},i=[],r=t.name||"default",o=t.fps||30,a=t.blendMode;let h=t.length||-1;const c=t.hierarchy||[];for(let m=0;m<c.length;m++){const g=c[m].keys;if(!(!g||g.length===0))if(g[0].morphTargets){const d={};let y;for(y=0;y<g.length;y++)if(g[y].morphTargets)for(let S=0;S<g[y].morphTargets.length;S++)d[g[y].morphTargets[S]]=-1;for(const S in d){const v=[],_=[];for(let I=0;I!==g[y].morphTargets.length;++I){const P=g[y];v.push(P.time),_.push(P.morphTarget===S?1:0)}i.push(new al(".morphTargetInfluence["+S+"]",v,_))}h=d.length*o}else{const d=".bones["+e[m].name+"]";n(ll,d+".position",g,"pos",i),n(dl,d+".quaternion",g,"rot",i),n(ll,d+".scale",g,"scl",i)}}return i.length===0?null:new this(r,h,i,a)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function a0(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return al;case"vector":case"vector2":case"vector3":case"vector4":return ll;case"color":return Sf;case"quaternion":return dl;case"bool":case"boolean":return Jr;case"string":return Qr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function l0(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=a0(s.type);if(s.times===void 0){const e=[],n=[];Mf(s.keys,e,n,"value"),s.times=e,s.values=n}return t.parse!==void 0?t.parse(s):new t(s.name,s.times,s.values,s.interpolation)}const ms={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class c0{constructor(t,e,n){const i=this;let r=!1,o=0,a=0,h;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(p){a++,r===!1&&i.onStart!==void 0&&i.onStart(p,o,a),r=!0},this.itemEnd=function(p){o++,i.onProgress!==void 0&&i.onProgress(p,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(p){i.onError!==void 0&&i.onError(p)},this.resolveURL=function(p){return h?h(p):p},this.setURLModifier=function(p){return h=p,this},this.addHandler=function(p,m){return c.push(p,m),this},this.removeHandler=function(p){const m=c.indexOf(p);return m!==-1&&c.splice(m,2),this},this.getHandler=function(p){for(let m=0,g=c.length;m<g;m+=2){const d=c[m],y=c[m+1];if(d.global&&(d.lastIndex=0),d.test(p))return y}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const h0=new c0;class Bo{constructor(t){this.manager=t!==void 0?t:h0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}Bo.DEFAULT_MATERIAL_NAME="__DEFAULT";const hs={};class d0 extends Error{constructor(t,e){super(t),this.response=e}}class Xy extends Bo{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=ms.get(`file:${t}`);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(hs[t]!==void 0){hs[t].push({onLoad:e,onProgress:n,onError:i});return}hs[t]=[],hs[t].push({onLoad:e,onProgress:n,onError:i});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,h=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const p=hs[t],m=c.body.getReader(),g=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=g?parseInt(g):0,y=d!==0;let S=0;const v=new ReadableStream({start(_){I();function I(){m.read().then(({done:P,value:A})=>{if(P)_.close();else{S+=A.byteLength;const O=new ProgressEvent("progress",{lengthComputable:y,loaded:S,total:d});for(let B=0,k=p.length;B<k;B++){const V=p[B];V.onProgress&&V.onProgress(O)}_.enqueue(A),I()}},P=>{_.error(P)})}}});return new Response(v)}else throw new d0(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(h){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(p=>new DOMParser().parseFromString(p,a));case"json":return c.json();default:if(a==="")return c.text();{const m=/charset="?([^;"\s]*)"?/i.exec(a),g=m&&m[1]?m[1].toLowerCase():void 0,d=new TextDecoder(g);return c.arrayBuffer().then(y=>d.decode(y))}}}).then(c=>{ms.add(`file:${t}`,c);const p=hs[t];delete hs[t];for(let m=0,g=p.length;m<g;m++){const d=p[m];d.onLoad&&d.onLoad(c)}}).catch(c=>{const p=hs[t];if(p===void 0)throw this.manager.itemError(t),c;delete hs[t];for(let m=0,g=p.length;m<g;m++){const d=p[m];d.onError&&d.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Nr=new WeakMap;class u0 extends Bo{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=ms.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let m=Nr.get(o);m===void 0&&(m=[],Nr.set(o,m)),m.push({onLoad:e,onError:i})}return o}const a=No("img");function h(){p(),e&&e(this);const m=Nr.get(this)||[];for(let g=0;g<m.length;g++){const d=m[g];d.onLoad&&d.onLoad(this)}Nr.delete(this),r.manager.itemEnd(t)}function c(m){p(),i&&i(m),ms.remove(`image:${t}`);const g=Nr.get(this)||[];for(let d=0;d<g.length;d++){const y=g[d];y.onError&&y.onError(m)}Nr.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function p(){a.removeEventListener("load",h,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",h,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),ms.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}}class ru extends Bo{constructor(t){super(t)}load(t,e,n,i){const r=new Yn,o=new u0(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class zo extends En{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new be(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class ou extends zo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(En.DEFAULT_UP),this.updateMatrix(),this.groundColor=new be(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const uc=new Ce,au=new M,lu=new M;class Ph{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Dt(512,512),this.mapType=qi,this.map=null,this.mapPass=null,this.matrix=new Ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Th,this._frameExtents=new Dt(1,1),this._viewportCount=1,this._viewports=[new tn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;au.setFromMatrixPosition(t.matrixWorld),e.position.copy(au),lu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(lu),e.updateMatrixWorld(),uc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uc,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(uc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class f0 extends Ph{constructor(){super(new li(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,n=jr*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Yy extends zo{constructor(t,e,n=0,i=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(En.DEFAULT_UP),this.updateMatrix(),this.target=new En,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new f0}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const cu=new Ce,bo=new M,fc=new M;class p0 extends Ph{constructor(){super(new li(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Dt(4,2),this._viewportCount=6,this._viewports=[new tn(2,1,1,1),new tn(0,1,1,1),new tn(3,1,1,1),new tn(1,1,1,1),new tn(3,0,1,1),new tn(1,0,1,1)],this._cubeDirections=[new M(1,0,0),new M(-1,0,0),new M(0,0,1),new M(0,0,-1),new M(0,1,0),new M(0,-1,0)],this._cubeUps=[new M(0,1,0),new M(0,1,0),new M(0,1,0),new M(0,1,0),new M(0,0,1),new M(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),bo.setFromMatrixPosition(t.matrixWorld),n.position.copy(bo),fc.copy(n.position),fc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(fc),n.updateMatrixWorld(),i.makeTranslation(-bo.x,-bo.y,-bo.z),cu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cu,n.coordinateSystem,n.reversedDepth)}}class m0 extends zo{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new p0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Ih extends ff{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,h=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=p*this.view.offsetY,h=a-p*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class g0 extends Ph{constructor(){super(new Ih(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class hu extends zo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(En.DEFAULT_UP),this.updateMatrix(),this.target=new En,this.shadow=new g0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class du extends zo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class qy{static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}const pc=new WeakMap;class jy extends Bo{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=ms.get(`image-bitmap:${t}`);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(c=>{if(pc.has(o)===!0)i&&i(pc.get(o)),r.manager.itemError(t),r.manager.itemEnd(t);else return e&&e(c),r.manager.itemEnd(t),c});return}return setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const h=fetch(t,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return ms.add(`image-bitmap:${t}`,c),e&&e(c),r.manager.itemEnd(t),c}).catch(function(c){i&&i(c),pc.set(h,c),ms.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});ms.add(`image-bitmap:${t}`,h),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class _0 extends li{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class bf{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}class x0{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,r,o;switch(e){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,r=t*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=e}else{o+=e;const a=e/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const h=e*this._origIndex;this._mixBufferRegion(n,i,h,1-r,e)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let h=e,c=e+e;h!==c;++h)if(n[h]!==n[h+e]){a.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let r=n,o=i;r!==o;++r)e[r]=e[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)t[e+o]=t[n+o]}_slerp(t,e,n,i){ci.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,r){const o=this._workIndex*r;ci.multiplyQuaternionsFlat(t,o,t,e,t,n),ci.slerpFlat(t,e,t,e,t,o,i)}_lerp(t,e,n,i,r){const o=1-i;for(let a=0;a!==r;++a){const h=e+a;t[h]=t[h]*o+t[n+a]*i}}_lerpAdditive(t,e,n,i,r){for(let o=0;o!==r;++o){const a=e+o;t[a]=t[a]+t[n+o]*i}}}const Dh="\\[\\]\\.:\\/",v0=new RegExp("["+Dh+"]","g"),Lh="[^"+Dh+"]",y0="[^"+Dh.replace("\\.","")+"]",M0=/((?:WC+[\/:])*)/.source.replace("WC",Lh),w0=/(WCOD+)?/.source.replace("WCOD",y0),S0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Lh),b0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Lh),E0=new RegExp("^"+M0+w0+S0+b0+"$"),T0=["material","materials","bones","map"];class A0{constructor(t,e,n){const i=n||an.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class an{constructor(t,e,n){this.path=e,this.parsedPath=n||an.parseTrackName(e),this.node=an.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new an.Composite(t,e,n):new an(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(v0,"")}static parseTrackName(t){const e=E0.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);T0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===e||a.uuid===e)return a;const h=n(a.children);if(h)return h}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let r=e.propertyIndex;if(t||(t=an.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let p=0;p<t.length;p++)if(t[p].name===c){c=p;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}const o=t[i];if(o===void 0){const c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let h=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}h=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(h=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(h=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[h],this.setValue=this.SetterByBindingTypeAndVersioning[h][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}an.Composite=A0;an.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};an.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};an.prototype.GetterByBindingType=[an.prototype._getValue_direct,an.prototype._getValue_array,an.prototype._getValue_arrayElement,an.prototype._getValue_toArray];an.prototype.SetterByBindingTypeAndVersioning=[[an.prototype._setValue_direct,an.prototype._setValue_direct_setNeedsUpdate,an.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[an.prototype._setValue_array,an.prototype._setValue_array_setNeedsUpdate,an.prototype._setValue_array_setMatrixWorldNeedsUpdate],[an.prototype._setValue_arrayElement,an.prototype._setValue_arrayElement_setNeedsUpdate,an.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[an.prototype._setValue_fromArray,an.prototype._setValue_fromArray_setNeedsUpdate,an.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class C0{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const r=e.tracks,o=r.length,a=new Array(o),h={endingStart:Br,endingEnd:Br};for(let c=0;c!==o;++c){const p=r[c].createInterpolant(null);a[c]=p,p.settings=h}this._interpolantSettings=h,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Ap,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n=!1){if(t.fadeOut(e),this.fadeIn(e),n===!0){const i=this._clip.duration,r=t._clip.duration,o=r/i,a=i/r;t.warp(1,o,e),this.warp(a,1,e)}return this}crossFadeTo(t,e,n=!1){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,r=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const h=a.parameterPositions,c=a.sampleValues;return h[0]=r,h[1]=r+n,c[0]=t/o,c[1]=e/o,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}const r=this._startTime;if(r!==null){const h=(t-r)*n;h<0||n===0?e=0:(this._startTime=null,e=n*h)}e*=this._updateTimeScale(t);const o=this._updateTime(e),a=this._updateWeight(t);if(a>0){const h=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Rp:for(let p=0,m=h.length;p!==m;++p)h[p].evaluate(o),c[p].accumulateAdditive(a);break;case yh:default:for(let p=0,m=h.length;p!==m;++p)h[p].evaluate(o),c[p].accumulate(i,a)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,r=this._loopCount;const o=n===Cp;if(t===0)return r===-1?i:o&&(r&1)===1?e-i:i;if(n===Tp){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(r===-1&&(t>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=e||i<0){const a=Math.floor(i/e);i-=e*a,r+=Math.abs(a);const h=this.repetitions-r;if(h<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(h===1){const c=t<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=zr,i.endingEnd=zr):(t?i.endingStart=this.zeroSlopeAtStart?zr:Br:i.endingStart=Qa,e?i.endingEnd=this.zeroSlopeAtEnd?zr:Br:i.endingEnd=Qa)}_scheduleFading(t,e,n){const i=this._mixer,r=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,h=o.sampleValues;return a[0]=r,h[0]=e,a[1]=r+t,h[1]=n,this}}const R0=new Float32Array(1);class P0 extends zs{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,r=i.length,o=t._propertyBindings,a=t._interpolants,h=n.uuid,c=this._bindingsByRootAndName;let p=c[h];p===void 0&&(p={},c[h]=p);for(let m=0;m!==r;++m){const g=i[m],d=g.name;let y=p[d];if(y!==void 0)++y.referenceCount,o[m]=y;else{if(y=o[m],y!==void 0){y._cacheIndex===null&&(++y.referenceCount,this._addInactiveBinding(y,h,d));continue}const S=e&&e._propertyBindings[m].binding.parsedPath;y=new x0(an.create(n,d,S),g.ValueTypeName,g.getValueSize()),++y.referenceCount,this._addInactiveBinding(y,h,d),o[m]=y}a[m].resultBuffer=y.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,i=t._clip.uuid,r=this._actionsByClip[i];this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,i,n)}const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const r=e[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const r=e[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,r=this._actionsByClip;let o=r[e];if(o===void 0)o={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=o;else{const a=o.knownActions;t._byClipCacheIndex=a.length,a.push(t)}t._cacheIndex=i.length,i.push(t),o.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const r=t._clip.uuid,o=this._actionsByClip,a=o[r],h=a.knownActions,c=h[h.length-1],p=t._byClipCacheIndex;c._byClipCacheIndex=p,h[p]=c,h.pop(),t._byClipCacheIndex=null;const m=a.actionByRoot,g=(t._localRoot||this._root).uuid;delete m[g],h.length===0&&delete o[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const r=e[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,r=this._bindings;let o=i[e];o===void 0&&(o={},i[e]=o),o[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],h=e[e.length-1],c=t._cacheIndex;h._cacheIndex=c,e[c]=h,e.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,r=e[i];t._cacheIndex=i,e[i]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new wf(new Float32Array(2),new Float32Array(2),1,R0),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,r=e[i];t.__cacheIndex=i,e[i]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){const i=e||this._root,r=i.uuid;let o=typeof t=="string"?su.findByName(i,t):t;const a=o!==null?o.uuid:t,h=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=yh),h!==void 0){const m=h.actionByRoot[r];if(m!==void 0&&m.blendMode===n)return m;c=h.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const p=new C0(this,o,e,n);return this._bindAction(p,c),this._addInactiveAction(p,a,r),p}existingAction(t,e){const n=e||this._root,i=n.uuid,r=typeof t=="string"?su.findByName(n,t):t,o=r?r.uuid:t,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,r=Math.sign(t),o=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(i,t,r,o);const a=this._bindings,h=this._nActiveBindings;for(let c=0;c!==h;++c)a[c].apply(o);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const o=r.knownActions;for(let a=0,h=o.length;a!==h;++a){const c=o[a];this._deactivateAction(c);const p=c._cacheIndex,m=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,m._cacheIndex=p,e[p]=m,e.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,h=a[e];h!==void 0&&(this._deactivateAction(h),this._removeInactiveAction(h))}const i=this._bindingsByRootAndName,r=i[e];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const uu=new Ce;class I0{constructor(t,e,n=0,i=1/0){this.ray=new $r(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Sh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return uu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(uu),this}intersectObject(t,e=!0,n=[]){return lh(t,this,n,e),n.sort(fu),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)lh(t[i],this,n,e);return n.sort(fu),n}}function fu(s,t){return s.distance-t.distance}function lh(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)lh(r[o],t,e,!0)}}class pu{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Fe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Fe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class D0 extends zs{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function mu(s,t,e,n){const i=L0(n);switch(e){case tf:return s*t;case gh:return s*t/i.components*i.byteLength;case _h:return s*t/i.components*i.byteLength;case nf:return s*t*2/i.components*i.byteLength;case xh:return s*t*2/i.components*i.byteLength;case ef:return s*t*3/i.components*i.byteLength;case xi:return s*t*4/i.components*i.byteLength;case vh:return s*t*4/i.components*i.byteLength;case Wa:case Xa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Ya:case qa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Uc:case Fc:return Math.max(s,16)*Math.max(t,8)/4;case Lc:case Nc:return Math.max(s,8)*Math.max(t,8)/2;case Oc:case Bc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case zc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case kc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Vc:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Hc:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Gc:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Wc:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Xc:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Yc:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case qc:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case jc:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Kc:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Zc:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case $c:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Jc:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Qc:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case ja:case th:case eh:return Math.ceil(s/4)*Math.ceil(t/4)*16;case sf:case nh:return Math.ceil(s/4)*Math.ceil(t/4)*8;case ih:case sh:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function L0(s){switch(s){case qi:case $u:return{byteLength:1,components:1};case Io:case Ju:case xs:return{byteLength:2,components:1};case ph:case mh:return{byteLength:2,components:4};case lr:case fh:case Pi:return{byteLength:4,components:1};case Qu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:dh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=dh);function Ef(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function U0(s){const t=new WeakMap;function e(a,h){const c=a.array,p=a.usage,m=c.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,c,p),a.onUploadCallback();let d;if(c instanceof Float32Array)d=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=s.HALF_FLOAT:d=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=s.SHORT;else if(c instanceof Uint32Array)d=s.UNSIGNED_INT;else if(c instanceof Int32Array)d=s.INT;else if(c instanceof Int8Array)d=s.BYTE;else if(c instanceof Uint8Array)d=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:g,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:m}}function n(a,h,c){const p=h.array,m=h.updateRanges;if(s.bindBuffer(c,a),m.length===0)s.bufferSubData(c,0,p);else{m.sort((d,y)=>d.start-y.start);let g=0;for(let d=1;d<m.length;d++){const y=m[g],S=m[d];S.start<=y.start+y.count+1?y.count=Math.max(y.count,S.start+S.count-y.start):(++g,m[g]=S)}m.length=g+1;for(let d=0,y=m.length;d<y;d++){const S=m[d];s.bufferSubData(c,S.start*p.BYTES_PER_ELEMENT,p,S.start,S.count)}h.clearUpdateRanges()}h.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const h=t.get(a);h&&(s.deleteBuffer(h.buffer),t.delete(a))}function o(a,h){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const p=t.get(a);(!p||p.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,h));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,h),c.version=a.version}}return{get:i,remove:r,update:o}}var N0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,F0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,O0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,B0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,z0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,k0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,V0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,H0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,G0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,W0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,X0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Y0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,q0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,j0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,K0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Z0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,J0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Q0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,eg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ng=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ig=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,sg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,rg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,og=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ag=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dg="gl_FragColor = linearToOutputTexel( gl_FragColor );",ug=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,pg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,mg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,gg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_g=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,xg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Sg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Eg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ag=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Cg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Pg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ig=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Lg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ug=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ng=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Fg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Og=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Wg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$g=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Qg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,t_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,n_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,i_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,s_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,r_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,o_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,a_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,l_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,c_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,h_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,d_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,u_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,f_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,p_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,m_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,g_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,__=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,x_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,v_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,y_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,M_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,w_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,S_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,b_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,E_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,T_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,A_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,C_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,R_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,P_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,I_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,D_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,L_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const U_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,N_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,F_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,O_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,B_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,z_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,k_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,V_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,H_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,G_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,W_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,X_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Y_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,q_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,j_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,K_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Q_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ex=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,nx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ix=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,rx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ox=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ax=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,cx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ux=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Oe={alphahash_fragment:N0,alphahash_pars_fragment:F0,alphamap_fragment:O0,alphamap_pars_fragment:B0,alphatest_fragment:z0,alphatest_pars_fragment:k0,aomap_fragment:V0,aomap_pars_fragment:H0,batching_pars_vertex:G0,batching_vertex:W0,begin_vertex:X0,beginnormal_vertex:Y0,bsdfs:q0,iridescence_fragment:j0,bumpmap_pars_fragment:K0,clipping_planes_fragment:Z0,clipping_planes_pars_fragment:$0,clipping_planes_pars_vertex:J0,clipping_planes_vertex:Q0,color_fragment:tg,color_pars_fragment:eg,color_pars_vertex:ng,color_vertex:ig,common:sg,cube_uv_reflection_fragment:rg,defaultnormal_vertex:og,displacementmap_pars_vertex:ag,displacementmap_vertex:lg,emissivemap_fragment:cg,emissivemap_pars_fragment:hg,colorspace_fragment:dg,colorspace_pars_fragment:ug,envmap_fragment:fg,envmap_common_pars_fragment:pg,envmap_pars_fragment:mg,envmap_pars_vertex:gg,envmap_physical_pars_fragment:Ag,envmap_vertex:_g,fog_vertex:xg,fog_pars_vertex:vg,fog_fragment:yg,fog_pars_fragment:Mg,gradientmap_pars_fragment:wg,lightmap_pars_fragment:Sg,lights_lambert_fragment:bg,lights_lambert_pars_fragment:Eg,lights_pars_begin:Tg,lights_toon_fragment:Cg,lights_toon_pars_fragment:Rg,lights_phong_fragment:Pg,lights_phong_pars_fragment:Ig,lights_physical_fragment:Dg,lights_physical_pars_fragment:Lg,lights_fragment_begin:Ug,lights_fragment_maps:Ng,lights_fragment_end:Fg,logdepthbuf_fragment:Og,logdepthbuf_pars_fragment:Bg,logdepthbuf_pars_vertex:zg,logdepthbuf_vertex:kg,map_fragment:Vg,map_pars_fragment:Hg,map_particle_fragment:Gg,map_particle_pars_fragment:Wg,metalnessmap_fragment:Xg,metalnessmap_pars_fragment:Yg,morphinstance_vertex:qg,morphcolor_vertex:jg,morphnormal_vertex:Kg,morphtarget_pars_vertex:Zg,morphtarget_vertex:$g,normal_fragment_begin:Jg,normal_fragment_maps:Qg,normal_pars_fragment:t_,normal_pars_vertex:e_,normal_vertex:n_,normalmap_pars_fragment:i_,clearcoat_normal_fragment_begin:s_,clearcoat_normal_fragment_maps:r_,clearcoat_pars_fragment:o_,iridescence_pars_fragment:a_,opaque_fragment:l_,packing:c_,premultiplied_alpha_fragment:h_,project_vertex:d_,dithering_fragment:u_,dithering_pars_fragment:f_,roughnessmap_fragment:p_,roughnessmap_pars_fragment:m_,shadowmap_pars_fragment:g_,shadowmap_pars_vertex:__,shadowmap_vertex:x_,shadowmask_pars_fragment:v_,skinbase_vertex:y_,skinning_pars_vertex:M_,skinning_vertex:w_,skinnormal_vertex:S_,specularmap_fragment:b_,specularmap_pars_fragment:E_,tonemapping_fragment:T_,tonemapping_pars_fragment:A_,transmission_fragment:C_,transmission_pars_fragment:R_,uv_pars_fragment:P_,uv_pars_vertex:I_,uv_vertex:D_,worldpos_vertex:L_,background_vert:U_,background_frag:N_,backgroundCube_vert:F_,backgroundCube_frag:O_,cube_vert:B_,cube_frag:z_,depth_vert:k_,depth_frag:V_,distanceRGBA_vert:H_,distanceRGBA_frag:G_,equirect_vert:W_,equirect_frag:X_,linedashed_vert:Y_,linedashed_frag:q_,meshbasic_vert:j_,meshbasic_frag:K_,meshlambert_vert:Z_,meshlambert_frag:$_,meshmatcap_vert:J_,meshmatcap_frag:Q_,meshnormal_vert:tx,meshnormal_frag:ex,meshphong_vert:nx,meshphong_frag:ix,meshphysical_vert:sx,meshphysical_frag:rx,meshtoon_vert:ox,meshtoon_frag:ax,points_vert:lx,points_frag:cx,shadow_vert:hx,shadow_frag:dx,sprite_vert:ux,sprite_frag:fx},Gt={common:{diffuse:{value:new be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new be(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},Wi={basic:{uniforms:ni([Gt.common,Gt.specularmap,Gt.envmap,Gt.aomap,Gt.lightmap,Gt.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:ni([Gt.common,Gt.specularmap,Gt.envmap,Gt.aomap,Gt.lightmap,Gt.emissivemap,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,Gt.fog,Gt.lights,{emissive:{value:new be(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:ni([Gt.common,Gt.specularmap,Gt.envmap,Gt.aomap,Gt.lightmap,Gt.emissivemap,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,Gt.fog,Gt.lights,{emissive:{value:new be(0)},specular:{value:new be(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:ni([Gt.common,Gt.envmap,Gt.aomap,Gt.lightmap,Gt.emissivemap,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,Gt.roughnessmap,Gt.metalnessmap,Gt.fog,Gt.lights,{emissive:{value:new be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:ni([Gt.common,Gt.aomap,Gt.lightmap,Gt.emissivemap,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,Gt.gradientmap,Gt.fog,Gt.lights,{emissive:{value:new be(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:ni([Gt.common,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,Gt.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:ni([Gt.points,Gt.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:ni([Gt.common,Gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:ni([Gt.common,Gt.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:ni([Gt.common,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:ni([Gt.sprite,Gt.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:ni([Gt.common,Gt.displacementmap,{referencePosition:{value:new M},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:ni([Gt.lights,Gt.fog,{color:{value:new be(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};Wi.physical={uniforms:ni([Wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new be(0)},specularColor:{value:new be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const za={r:0,b:0,g:0},tr=new Li,px=new Ce;function mx(s,t,e,n,i,r,o){const a=new be(0);let h=r===!0?0:1,c,p,m=null,g=0,d=null;function y(P){let A=P.isScene===!0?P.background:null;return A&&A.isTexture&&(A=(P.backgroundBlurriness>0?e:t).get(A)),A}function S(P){let A=!1;const O=y(P);O===null?_(a,h):O&&O.isColor&&(_(O,1),A=!0);const B=s.xr.getEnvironmentBlendMode();B==="additive"?n.buffers.color.setClear(0,0,0,1,o):B==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||A)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function v(P,A){const O=y(A);O&&(O.isCubeTexture||O.mapping===cl)?(p===void 0&&(p=new b(new Nt(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:Kr(Wi.backgroundCube.uniforms),vertexShader:Wi.backgroundCube.vertexShader,fragmentShader:Wi.backgroundCube.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(B,k,V){this.matrixWorld.copyPosition(V.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(p)),tr.copy(A.backgroundRotation),tr.x*=-1,tr.y*=-1,tr.z*=-1,O.isCubeTexture&&O.isRenderTargetTexture===!1&&(tr.y*=-1,tr.z*=-1),p.material.uniforms.envMap.value=O,p.material.uniforms.flipEnvMap.value=O.isCubeTexture&&O.isRenderTargetTexture===!1?-1:1,p.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(px.makeRotationFromEuler(tr)),p.material.toneMapped=$e.getTransfer(O.colorSpace)!==rn,(m!==O||g!==O.version||d!==s.toneMapping)&&(p.material.needsUpdate=!0,m=O,g=O.version,d=s.toneMapping),p.layers.enableAll(),P.unshift(p,p.geometry,p.material,0,0,null)):O&&O.isTexture&&(c===void 0&&(c=new b(new ps(2,2),new $n({name:"BackgroundMaterial",uniforms:Kr(Wi.background.uniforms),vertexShader:Wi.background.vertexShader,fragmentShader:Wi.background.fragmentShader,side:Bs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=O,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=$e.getTransfer(O.colorSpace)!==rn,O.matrixAutoUpdate===!0&&O.updateMatrix(),c.material.uniforms.uvTransform.value.copy(O.matrix),(m!==O||g!==O.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,m=O,g=O.version,d=s.toneMapping),c.layers.enableAll(),P.unshift(c,c.geometry,c.material,0,0,null))}function _(P,A){P.getRGB(za,uf(s)),n.buffers.color.setClear(za.r,za.g,za.b,A,o)}function I(){p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(P,A=1){a.set(P),h=A,_(a,h)},getClearAlpha:function(){return h},setClearAlpha:function(P){h=P,_(a,h)},render:S,addToRenderList:v,dispose:I}}function gx(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=g(null);let r=i,o=!1;function a(E,z,Q,it,rt){let xt=!1;const lt=m(it,Q,z);r!==lt&&(r=lt,c(r.object)),xt=d(E,it,Q,rt),xt&&y(E,it,Q,rt),rt!==null&&t.update(rt,s.ELEMENT_ARRAY_BUFFER),(xt||o)&&(o=!1,A(E,z,Q,it),rt!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(rt).buffer))}function h(){return s.createVertexArray()}function c(E){return s.bindVertexArray(E)}function p(E){return s.deleteVertexArray(E)}function m(E,z,Q){const it=Q.wireframe===!0;let rt=n[E.id];rt===void 0&&(rt={},n[E.id]=rt);let xt=rt[z.id];xt===void 0&&(xt={},rt[z.id]=xt);let lt=xt[it];return lt===void 0&&(lt=g(h()),xt[it]=lt),lt}function g(E){const z=[],Q=[],it=[];for(let rt=0;rt<e;rt++)z[rt]=0,Q[rt]=0,it[rt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:Q,attributeDivisors:it,object:E,attributes:{},index:null}}function d(E,z,Q,it){const rt=r.attributes,xt=z.attributes;let lt=0;const vt=Q.getAttributes();for(const ot in vt)if(vt[ot].location>=0){const Xt=rt[ot];let Kt=xt[ot];if(Kt===void 0&&(ot==="instanceMatrix"&&E.instanceMatrix&&(Kt=E.instanceMatrix),ot==="instanceColor"&&E.instanceColor&&(Kt=E.instanceColor)),Xt===void 0||Xt.attribute!==Kt||Kt&&Xt.data!==Kt.data)return!0;lt++}return r.attributesNum!==lt||r.index!==it}function y(E,z,Q,it){const rt={},xt=z.attributes;let lt=0;const vt=Q.getAttributes();for(const ot in vt)if(vt[ot].location>=0){let Xt=xt[ot];Xt===void 0&&(ot==="instanceMatrix"&&E.instanceMatrix&&(Xt=E.instanceMatrix),ot==="instanceColor"&&E.instanceColor&&(Xt=E.instanceColor));const Kt={};Kt.attribute=Xt,Xt&&Xt.data&&(Kt.data=Xt.data),rt[ot]=Kt,lt++}r.attributes=rt,r.attributesNum=lt,r.index=it}function S(){const E=r.newAttributes;for(let z=0,Q=E.length;z<Q;z++)E[z]=0}function v(E){_(E,0)}function _(E,z){const Q=r.newAttributes,it=r.enabledAttributes,rt=r.attributeDivisors;Q[E]=1,it[E]===0&&(s.enableVertexAttribArray(E),it[E]=1),rt[E]!==z&&(s.vertexAttribDivisor(E,z),rt[E]=z)}function I(){const E=r.newAttributes,z=r.enabledAttributes;for(let Q=0,it=z.length;Q<it;Q++)z[Q]!==E[Q]&&(s.disableVertexAttribArray(Q),z[Q]=0)}function P(E,z,Q,it,rt,xt,lt){lt===!0?s.vertexAttribIPointer(E,z,Q,rt,xt):s.vertexAttribPointer(E,z,Q,it,rt,xt)}function A(E,z,Q,it){S();const rt=it.attributes,xt=Q.getAttributes(),lt=z.defaultAttributeValues;for(const vt in xt){const ot=xt[vt];if(ot.location>=0){let Ct=rt[vt];if(Ct===void 0&&(vt==="instanceMatrix"&&E.instanceMatrix&&(Ct=E.instanceMatrix),vt==="instanceColor"&&E.instanceColor&&(Ct=E.instanceColor)),Ct!==void 0){const Xt=Ct.normalized,Kt=Ct.itemSize,Pe=t.get(Ct);if(Pe===void 0)continue;const ln=Pe.buffer,en=Pe.type,ct=Pe.bytesPerElement,Vt=en===s.INT||en===s.UNSIGNED_INT||Ct.gpuType===fh;if(Ct.isInterleavedBufferAttribute){const Ft=Ct.data,xe=Ft.stride,_e=Ct.offset;if(Ft.isInstancedInterleavedBuffer){for(let Ee=0;Ee<ot.locationSize;Ee++)_(ot.location+Ee,Ft.meshPerAttribute);E.isInstancedMesh!==!0&&it._maxInstanceCount===void 0&&(it._maxInstanceCount=Ft.meshPerAttribute*Ft.count)}else for(let Ee=0;Ee<ot.locationSize;Ee++)v(ot.location+Ee);s.bindBuffer(s.ARRAY_BUFFER,ln);for(let Ee=0;Ee<ot.locationSize;Ee++)P(ot.location+Ee,Kt/ot.locationSize,en,Xt,xe*ct,(_e+Kt/ot.locationSize*Ee)*ct,Vt)}else{if(Ct.isInstancedBufferAttribute){for(let Ft=0;Ft<ot.locationSize;Ft++)_(ot.location+Ft,Ct.meshPerAttribute);E.isInstancedMesh!==!0&&it._maxInstanceCount===void 0&&(it._maxInstanceCount=Ct.meshPerAttribute*Ct.count)}else for(let Ft=0;Ft<ot.locationSize;Ft++)v(ot.location+Ft);s.bindBuffer(s.ARRAY_BUFFER,ln);for(let Ft=0;Ft<ot.locationSize;Ft++)P(ot.location+Ft,Kt/ot.locationSize,en,Xt,Kt*ct,Kt/ot.locationSize*Ft*ct,Vt)}}else if(lt!==void 0){const Xt=lt[vt];if(Xt!==void 0)switch(Xt.length){case 2:s.vertexAttrib2fv(ot.location,Xt);break;case 3:s.vertexAttrib3fv(ot.location,Xt);break;case 4:s.vertexAttrib4fv(ot.location,Xt);break;default:s.vertexAttrib1fv(ot.location,Xt)}}}}I()}function O(){V();for(const E in n){const z=n[E];for(const Q in z){const it=z[Q];for(const rt in it)p(it[rt].object),delete it[rt];delete z[Q]}delete n[E]}}function B(E){if(n[E.id]===void 0)return;const z=n[E.id];for(const Q in z){const it=z[Q];for(const rt in it)p(it[rt].object),delete it[rt];delete z[Q]}delete n[E.id]}function k(E){for(const z in n){const Q=n[z];if(Q[E.id]===void 0)continue;const it=Q[E.id];for(const rt in it)p(it[rt].object),delete it[rt];delete Q[E.id]}}function V(){C(),o=!0,r!==i&&(r=i,c(r.object))}function C(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:V,resetDefaultState:C,dispose:O,releaseStatesOfGeometry:B,releaseStatesOfProgram:k,initAttributes:S,enableAttribute:v,disableUnusedAttributes:I}}function _x(s,t,e){let n;function i(c){n=c}function r(c,p){s.drawArrays(n,c,p),e.update(p,n,1)}function o(c,p,m){m!==0&&(s.drawArraysInstanced(n,c,p,m),e.update(p,n,m))}function a(c,p,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,p,0,m);let d=0;for(let y=0;y<m;y++)d+=p[y];e.update(d,n,1)}function h(c,p,m,g){if(m===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let y=0;y<c.length;y++)o(c[y],p[y],g[y]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,p,0,g,0,m);let y=0;for(let S=0;S<m;S++)y+=p[S]*g[S];e.update(y,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=h}function xx(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const k=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(k.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(k){return!(k!==xi&&n.convert(k)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(k){const V=k===xs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(k!==qi&&n.convert(k)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&k!==Pi&&!V)}function h(k){if(k==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";k="mediump"}return k==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const p=h(c);p!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",p,"instead."),c=p);const m=e.logarithmicDepthBuffer===!0,g=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=s.getParameter(s.MAX_TEXTURE_SIZE),v=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),I=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),P=s.getParameter(s.MAX_VARYING_VECTORS),A=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),O=y>0,B=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:h,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:m,reversedDepthBuffer:g,maxTextures:d,maxVertexTextures:y,maxTextureSize:S,maxCubemapSize:v,maxAttributes:_,maxVertexUniforms:I,maxVaryings:P,maxFragmentUniforms:A,vertexTextures:O,maxSamples:B}}function vx(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new fs,a=new Ne,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(m,g){const d=m.length!==0||g||n!==0||i;return i=g,n=m.length,d},this.beginShadows=function(){r=!0,p(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,g){e=p(m,g,0)},this.setState=function(m,g,d){const y=m.clippingPlanes,S=m.clipIntersection,v=m.clipShadows,_=s.get(m);if(!i||y===null||y.length===0||r&&!v)r?p(null):c();else{const I=r?0:n,P=I*4;let A=_.clippingState||null;h.value=A,A=p(y,g,P,d);for(let O=0;O!==P;++O)A[O]=e[O];_.clippingState=A,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=I}};function c(){h.value!==e&&(h.value=e,h.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function p(m,g,d,y){const S=m!==null?m.length:0;let v=null;if(S!==0){if(v=h.value,y!==!0||v===null){const _=d+S*4,I=g.matrixWorldInverse;a.getNormalMatrix(I),(v===null||v.length<_)&&(v=new Float32Array(_));for(let P=0,A=d;P!==S;++P,A+=4)o.copy(m[P]).applyMatrix4(I,a),o.normal.toArray(v,A),v[A+3]=o.constant}h.value=v,h.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,v}}function yx(s){let t=new WeakMap;function e(o,a){return a===$a?o.mapping=Xr:a===Ic&&(o.mapping=Yr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===$a||a===Ic)if(t.has(o)){const h=t.get(o).texture;return e(h,o.mapping)}else{const h=o.image;if(h&&h.height>0){const c=new Tm(h.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const h=t.get(a);h!==void 0&&(t.delete(a),h.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const kr=4,gu=[.125,.215,.35,.446,.526,.582],rr=20,mc=new Ih,_u=new be;let gc=null,_c=0,xc=0,vc=!1;const ir=(1+Math.sqrt(5))/2,Fr=1/ir,xu=[new M(-ir,Fr,0),new M(ir,Fr,0),new M(-Fr,0,ir),new M(Fr,0,ir),new M(0,ir,-Fr),new M(0,ir,Fr),new M(-1,1,-1),new M(1,1,-1),new M(-1,1,1),new M(1,1,1)],Mx=new M;class ch{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,r={}){const{size:o=256,position:a=Mx}=r;gc=this._renderer.getRenderTarget(),_c=this._renderer.getActiveCubeFace(),xc=this._renderer.getActiveMipmapLevel(),vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(t,n,i,h,a),e>0&&this._blur(h,0,0,e),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(gc,_c,xc),this._renderer.xr.enabled=vc,t.scissorTest=!1,ka(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Xr||t.mapping===Yr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),gc=this._renderer.getRenderTarget(),_c=this._renderer.getActiveCubeFace(),xc=this._renderer.getActiveMipmapLevel(),vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Xi,minFilter:Xi,generateMipmaps:!1,type:xs,format:xi,colorSpace:qr,depthBuffer:!1},i=vu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vu(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wx(r)),this._blurMaterial=Sx(r,t,e)}return i}_compileMaterial(t){const e=new b(this._lodPlanes[0],t);this._renderer.compile(e,mc)}_sceneToCubeUV(t,e,n,i,r){const h=new li(90,1,e,n),c=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],m=this._renderer,g=m.autoClear,d=m.toneMapping;m.getClearColor(_u),m.toneMapping=Os,m.autoClear=!1,m.state.buffers.depth.getReversed()&&(m.setRenderTarget(i),m.clearDepth(),m.setRenderTarget(null));const S=new gn({name:"PMREM.Background",side:Jn,depthWrite:!1,depthTest:!1}),v=new b(new Nt,S);let _=!1;const I=t.background;I?I.isColor&&(S.color.copy(I),t.background=null,_=!0):(S.color.copy(_u),_=!0);for(let P=0;P<6;P++){const A=P%3;A===0?(h.up.set(0,c[P],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x+p[P],r.y,r.z)):A===1?(h.up.set(0,0,c[P]),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y+p[P],r.z)):(h.up.set(0,c[P],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y,r.z+p[P]));const O=this._cubeSize;ka(i,A*O,P>2?O:0,O,O),m.setRenderTarget(i),_&&m.render(v,h),m.render(t,h)}v.geometry.dispose(),v.material.dispose(),m.toneMapping=d,m.autoClear=g,t.background=I}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Xr||t.mapping===Yr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yu());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new b(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const h=this._cubeSize;ka(e,0,0,3*h,2*h),n.setRenderTarget(e),n.render(o,mc)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=xu[(i-r-1)%xu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const h=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const p=3,m=new b(this._lodPlanes[i],c),g=c.uniforms,d=this._sizeLods[n]-1,y=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*rr-1),S=r/y,v=isFinite(r)?1+Math.floor(p*S):rr;v>rr&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${rr}`);const _=[];let I=0;for(let k=0;k<rr;++k){const V=k/S,C=Math.exp(-V*V/2);_.push(C),k===0?I+=C:k<v&&(I+=2*C)}for(let k=0;k<_.length;k++)_[k]=_[k]/I;g.envMap.value=t.texture,g.samples.value=v,g.weights.value=_,g.latitudinal.value=o==="latitudinal",a&&(g.poleAxis.value=a);const{_lodMax:P}=this;g.dTheta.value=y,g.mipInt.value=P-n;const A=this._sizeLods[i],O=3*A*(i>P-kr?i-P+kr:0),B=4*(this._cubeSize-A);ka(e,O,B,3*A,2*A),h.setRenderTarget(e),h.render(m,mc)}}function wx(s){const t=[],e=[],n=[];let i=s;const r=s-kr+1+gu.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let h=1/a;o>s-kr?h=gu[o-s+kr-1]:o===0&&(h=0),n.push(h);const c=1/(a-2),p=-c,m=1+c,g=[p,p,m,p,m,m,p,p,m,m,p,m],d=6,y=6,S=3,v=2,_=1,I=new Float32Array(S*y*d),P=new Float32Array(v*y*d),A=new Float32Array(_*y*d);for(let B=0;B<d;B++){const k=B%3*2/3-1,V=B>2?0:-1,C=[k,V,0,k+2/3,V,0,k+2/3,V+1,0,k,V,0,k+2/3,V+1,0,k,V+1,0];I.set(C,S*y*B),P.set(g,v*y*B);const E=[B,B,B,B,B,B];A.set(E,_*y*B)}const O=new vn;O.setAttribute("position",new Hn(I,S)),O.setAttribute("uv",new Hn(P,v)),O.setAttribute("faceIndex",new Hn(A,_)),t.push(O),i>kr&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function vu(s,t,e){const n=new Di(s,t,e);return n.texture.mapping=cl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ka(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Sx(s,t,e){const n=new Float32Array(rr),i=new M(0,1,0);return new $n({name:"SphericalGaussianBlur",defines:{n:rr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Uh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:_s,depthTest:!1,depthWrite:!1})}function yu(){return new $n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Uh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:_s,depthTest:!1,depthWrite:!1})}function Mu(){return new $n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Uh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:_s,depthTest:!1,depthWrite:!1})}function Uh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function bx(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const h=a.mapping,c=h===$a||h===Ic,p=h===Xr||h===Yr;if(c||p){let m=t.get(a);const g=m!==void 0?m.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==g)return e===null&&(e=new ch(s)),m=c?e.fromEquirectangular(a,m):e.fromCubemap(a,m),m.texture.pmremVersion=a.pmremVersion,t.set(a,m),m.texture;if(m!==void 0)return m.texture;{const d=a.image;return c&&d&&d.height>0||p&&d&&i(d)?(e===null&&(e=new ch(s)),m=c?e.fromEquirectangular(a):e.fromCubemap(a),m.texture.pmremVersion=a.pmremVersion,t.set(a,m),a.addEventListener("dispose",r),m.texture):null}}}return a}function i(a){let h=0;const c=6;for(let p=0;p<c;p++)a[p]!==void 0&&h++;return h===c}function r(a){const h=a.target;h.removeEventListener("dispose",r);const c=t.get(h);c!==void 0&&(t.delete(h),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Ex(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Hr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Tx(s,t,e,n){const i={},r=new WeakMap;function o(m){const g=m.target;g.index!==null&&t.remove(g.index);for(const y in g.attributes)t.remove(g.attributes[y]);g.removeEventListener("dispose",o),delete i[g.id];const d=r.get(g);d&&(t.remove(d),r.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,e.memory.geometries--}function a(m,g){return i[g.id]===!0||(g.addEventListener("dispose",o),i[g.id]=!0,e.memory.geometries++),g}function h(m){const g=m.attributes;for(const d in g)t.update(g[d],s.ARRAY_BUFFER)}function c(m){const g=[],d=m.index,y=m.attributes.position;let S=0;if(d!==null){const I=d.array;S=d.version;for(let P=0,A=I.length;P<A;P+=3){const O=I[P+0],B=I[P+1],k=I[P+2];g.push(O,B,B,k,k,O)}}else if(y!==void 0){const I=y.array;S=y.version;for(let P=0,A=I.length/3-1;P<A;P+=3){const O=P+0,B=P+1,k=P+2;g.push(O,B,B,k,k,O)}}else return;const v=new(af(g)?df:hf)(g,1);v.version=S;const _=r.get(m);_&&t.remove(_),r.set(m,v)}function p(m){const g=r.get(m);if(g){const d=m.index;d!==null&&g.version<d.version&&c(m)}else c(m);return r.get(m)}return{get:a,update:h,getWireframeAttribute:p}}function Ax(s,t,e){let n;function i(g){n=g}let r,o;function a(g){r=g.type,o=g.bytesPerElement}function h(g,d){s.drawElements(n,d,r,g*o),e.update(d,n,1)}function c(g,d,y){y!==0&&(s.drawElementsInstanced(n,d,r,g*o,y),e.update(d,n,y))}function p(g,d,y){if(y===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,g,0,y);let v=0;for(let _=0;_<y;_++)v+=d[_];e.update(v,n,1)}function m(g,d,y,S){if(y===0)return;const v=t.get("WEBGL_multi_draw");if(v===null)for(let _=0;_<g.length;_++)c(g[_]/o,d[_],S[_]);else{v.multiDrawElementsInstancedWEBGL(n,d,0,r,g,0,S,0,y);let _=0;for(let I=0;I<y;I++)_+=d[I]*S[I];e.update(_,n,1)}}this.setMode=i,this.setIndex=a,this.render=h,this.renderInstances=c,this.renderMultiDraw=p,this.renderMultiDrawInstances=m}function Cx(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Rx(s,t,e){const n=new WeakMap,i=new tn;function r(o,a,h){const c=o.morphTargetInfluences,p=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,m=p!==void 0?p.length:0;let g=n.get(a);if(g===void 0||g.count!==m){let C=function(){k.dispose(),n.delete(a),a.removeEventListener("dispose",C)};g!==void 0&&g.texture.dispose();const d=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,S=a.morphAttributes.color!==void 0,v=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],I=a.morphAttributes.color||[];let P=0;d===!0&&(P=1),y===!0&&(P=2),S===!0&&(P=3);let A=a.attributes.position.count*P,O=1;A>t.maxTextureSize&&(O=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const B=new Float32Array(A*O*4*m),k=new lf(B,A,O,m);k.type=Pi,k.needsUpdate=!0;const V=P*4;for(let E=0;E<m;E++){const z=v[E],Q=_[E],it=I[E],rt=A*O*4*E;for(let xt=0;xt<z.count;xt++){const lt=xt*V;d===!0&&(i.fromBufferAttribute(z,xt),B[rt+lt+0]=i.x,B[rt+lt+1]=i.y,B[rt+lt+2]=i.z,B[rt+lt+3]=0),y===!0&&(i.fromBufferAttribute(Q,xt),B[rt+lt+4]=i.x,B[rt+lt+5]=i.y,B[rt+lt+6]=i.z,B[rt+lt+7]=0),S===!0&&(i.fromBufferAttribute(it,xt),B[rt+lt+8]=i.x,B[rt+lt+9]=i.y,B[rt+lt+10]=i.z,B[rt+lt+11]=it.itemSize===4?i.w:1)}}g={count:m,texture:k,size:new Dt(A,O)},n.set(a,g),a.addEventListener("dispose",C)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let d=0;for(let S=0;S<c.length;S++)d+=c[S];const y=a.morphTargetsRelative?1:1-d;h.getUniforms().setValue(s,"morphTargetBaseInfluence",y),h.getUniforms().setValue(s,"morphTargetInfluences",c)}h.getUniforms().setValue(s,"morphTargetsTexture",g.texture,e),h.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}return{update:r}}function Px(s,t,e,n){let i=new WeakMap;function r(h){const c=n.render.frame,p=h.geometry,m=t.get(h,p);if(i.get(m)!==c&&(t.update(m),i.set(m,c)),h.isInstancedMesh&&(h.hasEventListener("dispose",a)===!1&&h.addEventListener("dispose",a),i.get(h)!==c&&(e.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&e.update(h.instanceColor,s.ARRAY_BUFFER),i.set(h,c))),h.isSkinnedMesh){const g=h.skeleton;i.get(g)!==c&&(g.update(),i.set(g,c))}return m}function o(){i=new WeakMap}function a(h){const c=h.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Tf=new Yn,wu=new vf(1,1),Af=new lf,Cf=new hm,Rf=new pf,Su=[],bu=[],Eu=new Float32Array(16),Tu=new Float32Array(9),Au=new Float32Array(4);function to(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Su[i];if(r===void 0&&(r=new Float32Array(i),Su[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function zn(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function kn(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function ul(s,t){let e=bu[t];e===void 0&&(e=new Int32Array(t),bu[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Ix(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Dx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(zn(e,t))return;s.uniform2fv(this.addr,t),kn(e,t)}}function Lx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(zn(e,t))return;s.uniform3fv(this.addr,t),kn(e,t)}}function Ux(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(zn(e,t))return;s.uniform4fv(this.addr,t),kn(e,t)}}function Nx(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(zn(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),kn(e,t)}else{if(zn(e,n))return;Au.set(n),s.uniformMatrix2fv(this.addr,!1,Au),kn(e,n)}}function Fx(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(zn(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),kn(e,t)}else{if(zn(e,n))return;Tu.set(n),s.uniformMatrix3fv(this.addr,!1,Tu),kn(e,n)}}function Ox(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(zn(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),kn(e,t)}else{if(zn(e,n))return;Eu.set(n),s.uniformMatrix4fv(this.addr,!1,Eu),kn(e,n)}}function Bx(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function zx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(zn(e,t))return;s.uniform2iv(this.addr,t),kn(e,t)}}function kx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(zn(e,t))return;s.uniform3iv(this.addr,t),kn(e,t)}}function Vx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(zn(e,t))return;s.uniform4iv(this.addr,t),kn(e,t)}}function Hx(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Gx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(zn(e,t))return;s.uniform2uiv(this.addr,t),kn(e,t)}}function Wx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(zn(e,t))return;s.uniform3uiv(this.addr,t),kn(e,t)}}function Xx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(zn(e,t))return;s.uniform4uiv(this.addr,t),kn(e,t)}}function Yx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(wu.compareFunction=of,r=wu):r=Tf,e.setTexture2D(t||r,i)}function qx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Cf,i)}function jx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Rf,i)}function Kx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Af,i)}function Zx(s){switch(s){case 5126:return Ix;case 35664:return Dx;case 35665:return Lx;case 35666:return Ux;case 35674:return Nx;case 35675:return Fx;case 35676:return Ox;case 5124:case 35670:return Bx;case 35667:case 35671:return zx;case 35668:case 35672:return kx;case 35669:case 35673:return Vx;case 5125:return Hx;case 36294:return Gx;case 36295:return Wx;case 36296:return Xx;case 35678:case 36198:case 36298:case 36306:case 35682:return Yx;case 35679:case 36299:case 36307:return qx;case 35680:case 36300:case 36308:case 36293:return jx;case 36289:case 36303:case 36311:case 36292:return Kx}}function $x(s,t){s.uniform1fv(this.addr,t)}function Jx(s,t){const e=to(t,this.size,2);s.uniform2fv(this.addr,e)}function Qx(s,t){const e=to(t,this.size,3);s.uniform3fv(this.addr,e)}function tv(s,t){const e=to(t,this.size,4);s.uniform4fv(this.addr,e)}function ev(s,t){const e=to(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function nv(s,t){const e=to(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function iv(s,t){const e=to(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function sv(s,t){s.uniform1iv(this.addr,t)}function rv(s,t){s.uniform2iv(this.addr,t)}function ov(s,t){s.uniform3iv(this.addr,t)}function av(s,t){s.uniform4iv(this.addr,t)}function lv(s,t){s.uniform1uiv(this.addr,t)}function cv(s,t){s.uniform2uiv(this.addr,t)}function hv(s,t){s.uniform3uiv(this.addr,t)}function dv(s,t){s.uniform4uiv(this.addr,t)}function uv(s,t,e){const n=this.cache,i=t.length,r=ul(e,i);zn(n,r)||(s.uniform1iv(this.addr,r),kn(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Tf,r[o])}function fv(s,t,e){const n=this.cache,i=t.length,r=ul(e,i);zn(n,r)||(s.uniform1iv(this.addr,r),kn(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||Cf,r[o])}function pv(s,t,e){const n=this.cache,i=t.length,r=ul(e,i);zn(n,r)||(s.uniform1iv(this.addr,r),kn(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Rf,r[o])}function mv(s,t,e){const n=this.cache,i=t.length,r=ul(e,i);zn(n,r)||(s.uniform1iv(this.addr,r),kn(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Af,r[o])}function gv(s){switch(s){case 5126:return $x;case 35664:return Jx;case 35665:return Qx;case 35666:return tv;case 35674:return ev;case 35675:return nv;case 35676:return iv;case 5124:case 35670:return sv;case 35667:case 35671:return rv;case 35668:case 35672:return ov;case 35669:case 35673:return av;case 5125:return lv;case 36294:return cv;case 36295:return hv;case 36296:return dv;case 35678:case 36198:case 36298:case 36306:case 35682:return uv;case 35679:case 36299:case 36307:return fv;case 35680:case 36300:case 36308:case 36293:return pv;case 36289:case 36303:case 36311:case 36292:return mv}}class _v{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Zx(e.type)}}class xv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=gv(e.type)}}class vv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const yc=/(\w+)(\])?(\[|\.)?/g;function Cu(s,t){s.seq.push(t),s.map[t.id]=t}function yv(s,t,e){const n=s.name,i=n.length;for(yc.lastIndex=0;;){const r=yc.exec(n),o=yc.lastIndex;let a=r[1];const h=r[2]==="]",c=r[3];if(h&&(a=a|0),c===void 0||c==="["&&o+2===i){Cu(e,c===void 0?new _v(a,s,t):new xv(a,s,t));break}else{let m=e.map[a];m===void 0&&(m=new vv(a),Cu(e,m)),e=m}}}class Ka{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);yv(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],h=n[a.id];h.needsUpdate!==!1&&a.setValue(t,h.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Ru(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Mv=37297;let wv=0;function Sv(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Pu=new Ne;function bv(s){$e._getMatrix(Pu,$e.workingColorSpace,s);const t=`mat3( ${Pu.elements.map(e=>e.toFixed(4))} )`;switch($e.getTransfer(s)){case tl:return[t,"LinearTransferOETF"];case rn:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Iu(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Sv(s.getShaderSource(t),a)}else return r}function Ev(s,t){const e=bv(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Tv(s,t){let e;switch(t){case Wu:e="Linear";break;case Xu:e="Reinhard";break;case Yu:e="Cineon";break;case uh:e="ACESFilmic";break;case ju:e="AgX";break;case Ku:e="Neutral";break;case qu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Va=new M;function Av(){$e.getLuminanceCoefficients(Va);const s=Va.x.toFixed(4),t=Va.y.toFixed(4),e=Va.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Cv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(To).join(`
`)}function Rv(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Pv(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function To(s){return s!==""}function Du(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Lu(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Iv=/^[ \t]*#include +<([\w\d./]+)>/gm;function hh(s){return s.replace(Iv,Lv)}const Dv=new Map;function Lv(s,t){let e=Oe[t];if(e===void 0){const n=Dv.get(t);if(n!==void 0)e=Oe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return hh(e)}const Uv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Uu(s){return s.replace(Uv,Nv)}function Nv(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Nu(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Fv(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Hu?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===ip?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ds&&(t="SHADOWMAP_TYPE_VSM"),t}function Ov(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Xr:case Yr:t="ENVMAP_TYPE_CUBE";break;case cl:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Bv(s){let t="ENVMAP_MODE_REFLECTION";return s.envMap&&s.envMapMode===Yr&&(t="ENVMAP_MODE_REFRACTION"),t}function zv(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Gu:t="ENVMAP_BLENDING_MULTIPLY";break;case wp:t="ENVMAP_BLENDING_MIX";break;case Sp:t="ENVMAP_BLENDING_ADD";break}return t}function kv(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Vv(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const h=Fv(e),c=Ov(e),p=Bv(e),m=zv(e),g=kv(e),d=Cv(e),y=Rv(r),S=i.createProgram();let v,_,I=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(v=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y].filter(To).join(`
`),v.length>0&&(v+=`
`),_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y].filter(To).join(`
`),_.length>0&&(_+=`
`)):(v=[Nu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+p:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(To).join(`
`),_=[Nu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+p:"",e.envMap?"#define "+m:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Os?"#define TONE_MAPPING":"",e.toneMapping!==Os?Oe.tonemapping_pars_fragment:"",e.toneMapping!==Os?Tv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,Ev("linearToOutputTexel",e.outputColorSpace),Av(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(To).join(`
`)),o=hh(o),o=Du(o,e),o=Lu(o,e),a=hh(a),a=Du(a,e),a=Lu(a,e),o=Uu(o),a=Uu(a),e.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,v=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,_=["#define varying in",e.glslVersion===vd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===vd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const P=I+v+o,A=I+_+a,O=Ru(i,i.VERTEX_SHADER,P),B=Ru(i,i.FRAGMENT_SHADER,A);i.attachShader(S,O),i.attachShader(S,B),e.index0AttributeName!==void 0?i.bindAttribLocation(S,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(S,0,"position"),i.linkProgram(S);function k(z){if(s.debug.checkShaderErrors){const Q=i.getProgramInfoLog(S)||"",it=i.getShaderInfoLog(O)||"",rt=i.getShaderInfoLog(B)||"",xt=Q.trim(),lt=it.trim(),vt=rt.trim();let ot=!0,Ct=!0;if(i.getProgramParameter(S,i.LINK_STATUS)===!1)if(ot=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,S,O,B);else{const Xt=Iu(i,O,"vertex"),Kt=Iu(i,B,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(S,i.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+xt+`
`+Xt+`
`+Kt)}else xt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",xt):(lt===""||vt==="")&&(Ct=!1);Ct&&(z.diagnostics={runnable:ot,programLog:xt,vertexShader:{log:lt,prefix:v},fragmentShader:{log:vt,prefix:_}})}i.deleteShader(O),i.deleteShader(B),V=new Ka(i,S),C=Pv(i,S)}let V;this.getUniforms=function(){return V===void 0&&k(this),V};let C;this.getAttributes=function(){return C===void 0&&k(this),C};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(S,Mv)),E},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(S),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=wv++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=O,this.fragmentShader=B,this}let Hv=0;class Gv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Wv(t),e.set(t,n)),n}}class Wv{constructor(t){this.id=Hv++,this.code=t,this.usedTimes=0}}function Xv(s,t,e,n,i,r,o){const a=new Sh,h=new Gv,c=new Set,p=[],m=i.logarithmicDepthBuffer,g=i.vertexTextures;let d=i.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(C){return c.add(C),C===0?"uv":`uv${C}`}function v(C,E,z,Q,it){const rt=Q.fog,xt=it.geometry,lt=C.isMeshStandardMaterial?Q.environment:null,vt=(C.isMeshStandardMaterial?e:t).get(C.envMap||lt),ot=vt&&vt.mapping===cl?vt.image.height:null,Ct=y[C.type];C.precision!==null&&(d=i.getMaxPrecision(C.precision),d!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",d,"instead."));const Xt=xt.morphAttributes.position||xt.morphAttributes.normal||xt.morphAttributes.color,Kt=Xt!==void 0?Xt.length:0;let Pe=0;xt.morphAttributes.position!==void 0&&(Pe=1),xt.morphAttributes.normal!==void 0&&(Pe=2),xt.morphAttributes.color!==void 0&&(Pe=3);let ln,en,ct,Vt;if(Ct){const ze=Wi[Ct];ln=ze.vertexShader,en=ze.fragmentShader}else ln=C.vertexShader,en=C.fragmentShader,h.update(C),ct=h.getVertexShaderID(C),Vt=h.getFragmentShaderID(C);const Ft=s.getRenderTarget(),xe=s.state.buffers.depth.getReversed(),_e=it.isInstancedMesh===!0,Ee=it.isBatchedMesh===!0,yn=!!C.map,we=!!C.matcap,H=!!vt,nn=!!C.aoMap,ge=!!C.lightMap,je=!!C.bumpMap,pe=!!C.normalMap,hn=!!C.displacementMap,ee=!!C.emissiveMap,Ie=!!C.metalnessMap,Cn=!!C.roughnessMap,Mn=C.anisotropy>0,N=C.clearcoat>0,w=C.dispersion>0,K=C.iridescence>0,ht=C.sheen>0,Et=C.transmission>0,tt=Mn&&!!C.anisotropyMap,he=N&&!!C.clearcoatMap,It=N&&!!C.clearcoatNormalMap,re=N&&!!C.clearcoatRoughnessMap,se=K&&!!C.iridescenceMap,Rt=K&&!!C.iridescenceThicknessMap,dt=ht&&!!C.sheenColorMap,yt=ht&&!!C.sheenRoughnessMap,jt=!!C.specularMap,kt=!!C.specularColorMap,Jt=!!C.specularIntensityMap,X=Et&&!!C.transmissionMap,Tt=Et&&!!C.thicknessMap,Lt=!!C.gradientMap,Zt=!!C.alphaMap,ft=C.alphaTest>0,ut=!!C.alphaHash,Yt=!!C.extensions;let ve=Os;C.toneMapped&&(Ft===null||Ft.isXRRenderTarget===!0)&&(ve=s.toneMapping);const Wt={shaderID:Ct,shaderType:C.type,shaderName:C.name,vertexShader:ln,fragmentShader:en,defines:C.defines,customVertexShaderID:ct,customFragmentShaderID:Vt,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:d,batching:Ee,batchingColor:Ee&&it._colorsTexture!==null,instancing:_e,instancingColor:_e&&it.instanceColor!==null,instancingMorph:_e&&it.morphTexture!==null,supportsVertexTextures:g,outputColorSpace:Ft===null?s.outputColorSpace:Ft.isXRRenderTarget===!0?Ft.texture.colorSpace:qr,alphaToCoverage:!!C.alphaToCoverage,map:yn,matcap:we,envMap:H,envMapMode:H&&vt.mapping,envMapCubeUVHeight:ot,aoMap:nn,lightMap:ge,bumpMap:je,normalMap:pe,displacementMap:g&&hn,emissiveMap:ee,normalMapObjectSpace:pe&&C.normalMapType===Dp,normalMapTangentSpace:pe&&C.normalMapType===rf,metalnessMap:Ie,roughnessMap:Cn,anisotropy:Mn,anisotropyMap:tt,clearcoat:N,clearcoatMap:he,clearcoatNormalMap:It,clearcoatRoughnessMap:re,dispersion:w,iridescence:K,iridescenceMap:se,iridescenceThicknessMap:Rt,sheen:ht,sheenColorMap:dt,sheenRoughnessMap:yt,specularMap:jt,specularColorMap:kt,specularIntensityMap:Jt,transmission:Et,transmissionMap:X,thicknessMap:Tt,gradientMap:Lt,opaque:C.transparent===!1&&C.blending===Vr&&C.alphaToCoverage===!1,alphaMap:Zt,alphaTest:ft,alphaHash:ut,combine:C.combine,mapUv:yn&&S(C.map.channel),aoMapUv:nn&&S(C.aoMap.channel),lightMapUv:ge&&S(C.lightMap.channel),bumpMapUv:je&&S(C.bumpMap.channel),normalMapUv:pe&&S(C.normalMap.channel),displacementMapUv:hn&&S(C.displacementMap.channel),emissiveMapUv:ee&&S(C.emissiveMap.channel),metalnessMapUv:Ie&&S(C.metalnessMap.channel),roughnessMapUv:Cn&&S(C.roughnessMap.channel),anisotropyMapUv:tt&&S(C.anisotropyMap.channel),clearcoatMapUv:he&&S(C.clearcoatMap.channel),clearcoatNormalMapUv:It&&S(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&S(C.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&S(C.iridescenceMap.channel),iridescenceThicknessMapUv:Rt&&S(C.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&S(C.sheenColorMap.channel),sheenRoughnessMapUv:yt&&S(C.sheenRoughnessMap.channel),specularMapUv:jt&&S(C.specularMap.channel),specularColorMapUv:kt&&S(C.specularColorMap.channel),specularIntensityMapUv:Jt&&S(C.specularIntensityMap.channel),transmissionMapUv:X&&S(C.transmissionMap.channel),thicknessMapUv:Tt&&S(C.thicknessMap.channel),alphaMapUv:Zt&&S(C.alphaMap.channel),vertexTangents:!!xt.attributes.tangent&&(pe||Mn),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!xt.attributes.color&&xt.attributes.color.itemSize===4,pointsUvs:it.isPoints===!0&&!!xt.attributes.uv&&(yn||Zt),fog:!!rt,useFog:C.fog===!0,fogExp2:!!rt&&rt.isFogExp2,flatShading:C.flatShading===!0&&C.wireframe===!1,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:xe,skinning:it.isSkinnedMesh===!0,morphTargets:xt.morphAttributes.position!==void 0,morphNormals:xt.morphAttributes.normal!==void 0,morphColors:xt.morphAttributes.color!==void 0,morphTargetsCount:Kt,morphTextureStride:Pe,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:C.dithering,shadowMapEnabled:s.shadowMap.enabled&&z.length>0,shadowMapType:s.shadowMap.type,toneMapping:ve,decodeVideoTexture:yn&&C.map.isVideoTexture===!0&&$e.getTransfer(C.map.colorSpace)===rn,decodeVideoTextureEmissive:ee&&C.emissiveMap.isVideoTexture===!0&&$e.getTransfer(C.emissiveMap.colorSpace)===rn,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===Xn,flipSided:C.side===Jn,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionClipCullDistance:Yt&&C.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Yt&&C.extensions.multiDraw===!0||Ee)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()};return Wt.vertexUv1s=c.has(1),Wt.vertexUv2s=c.has(2),Wt.vertexUv3s=c.has(3),c.clear(),Wt}function _(C){const E=[];if(C.shaderID?E.push(C.shaderID):(E.push(C.customVertexShaderID),E.push(C.customFragmentShaderID)),C.defines!==void 0)for(const z in C.defines)E.push(z),E.push(C.defines[z]);return C.isRawShaderMaterial===!1&&(I(E,C),P(E,C),E.push(s.outputColorSpace)),E.push(C.customProgramCacheKey),E.join()}function I(C,E){C.push(E.precision),C.push(E.outputColorSpace),C.push(E.envMapMode),C.push(E.envMapCubeUVHeight),C.push(E.mapUv),C.push(E.alphaMapUv),C.push(E.lightMapUv),C.push(E.aoMapUv),C.push(E.bumpMapUv),C.push(E.normalMapUv),C.push(E.displacementMapUv),C.push(E.emissiveMapUv),C.push(E.metalnessMapUv),C.push(E.roughnessMapUv),C.push(E.anisotropyMapUv),C.push(E.clearcoatMapUv),C.push(E.clearcoatNormalMapUv),C.push(E.clearcoatRoughnessMapUv),C.push(E.iridescenceMapUv),C.push(E.iridescenceThicknessMapUv),C.push(E.sheenColorMapUv),C.push(E.sheenRoughnessMapUv),C.push(E.specularMapUv),C.push(E.specularColorMapUv),C.push(E.specularIntensityMapUv),C.push(E.transmissionMapUv),C.push(E.thicknessMapUv),C.push(E.combine),C.push(E.fogExp2),C.push(E.sizeAttenuation),C.push(E.morphTargetsCount),C.push(E.morphAttributeCount),C.push(E.numDirLights),C.push(E.numPointLights),C.push(E.numSpotLights),C.push(E.numSpotLightMaps),C.push(E.numHemiLights),C.push(E.numRectAreaLights),C.push(E.numDirLightShadows),C.push(E.numPointLightShadows),C.push(E.numSpotLightShadows),C.push(E.numSpotLightShadowsWithMaps),C.push(E.numLightProbes),C.push(E.shadowMapType),C.push(E.toneMapping),C.push(E.numClippingPlanes),C.push(E.numClipIntersection),C.push(E.depthPacking)}function P(C,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),E.gradientMap&&a.enable(22),C.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),C.push(a.mask)}function A(C){const E=y[C.type];let z;if(E){const Q=Wi[E];z=Fo.clone(Q.uniforms)}else z=C.uniforms;return z}function O(C,E){let z;for(let Q=0,it=p.length;Q<it;Q++){const rt=p[Q];if(rt.cacheKey===E){z=rt,++z.usedTimes;break}}return z===void 0&&(z=new Vv(s,E,C,r),p.push(z)),z}function B(C){if(--C.usedTimes===0){const E=p.indexOf(C);p[E]=p[p.length-1],p.pop(),C.destroy()}}function k(C){h.remove(C)}function V(){h.dispose()}return{getParameters:v,getProgramCacheKey:_,getUniforms:A,acquireProgram:O,releaseProgram:B,releaseShaderCache:k,programs:p,dispose:V}}function Yv(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,h){s.get(o)[a]=h}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function qv(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Fu(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Ou(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(m,g,d,y,S,v){let _=s[t];return _===void 0?(_={id:m.id,object:m,geometry:g,material:d,groupOrder:y,renderOrder:m.renderOrder,z:S,group:v},s[t]=_):(_.id=m.id,_.object=m,_.geometry=g,_.material=d,_.groupOrder=y,_.renderOrder=m.renderOrder,_.z=S,_.group=v),t++,_}function a(m,g,d,y,S,v){const _=o(m,g,d,y,S,v);d.transmission>0?n.push(_):d.transparent===!0?i.push(_):e.push(_)}function h(m,g,d,y,S,v){const _=o(m,g,d,y,S,v);d.transmission>0?n.unshift(_):d.transparent===!0?i.unshift(_):e.unshift(_)}function c(m,g){e.length>1&&e.sort(m||qv),n.length>1&&n.sort(g||Fu),i.length>1&&i.sort(g||Fu)}function p(){for(let m=t,g=s.length;m<g;m++){const d=s[m];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:h,finish:p,sort:c}}function jv(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new Ou,s.set(n,[o])):i>=r.length?(o=new Ou,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function Kv(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new M,color:new be};break;case"SpotLight":e={position:new M,direction:new M,color:new be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new M,color:new be,distance:0,decay:0};break;case"HemisphereLight":e={direction:new M,skyColor:new be,groundColor:new be};break;case"RectAreaLight":e={color:new be,position:new M,halfWidth:new M,halfHeight:new M};break}return s[t.id]=e,e}}}function Zv(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let $v=0;function Jv(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Qv(s){const t=new Kv,e=Zv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new M);const i=new M,r=new Ce,o=new Ce;function a(c){let p=0,m=0,g=0;for(let C=0;C<9;C++)n.probe[C].set(0,0,0);let d=0,y=0,S=0,v=0,_=0,I=0,P=0,A=0,O=0,B=0,k=0;c.sort(Jv);for(let C=0,E=c.length;C<E;C++){const z=c[C],Q=z.color,it=z.intensity,rt=z.distance,xt=z.shadow&&z.shadow.map?z.shadow.map.texture:null;if(z.isAmbientLight)p+=Q.r*it,m+=Q.g*it,g+=Q.b*it;else if(z.isLightProbe){for(let lt=0;lt<9;lt++)n.probe[lt].addScaledVector(z.sh.coefficients[lt],it);k++}else if(z.isDirectionalLight){const lt=t.get(z);if(lt.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){const vt=z.shadow,ot=e.get(z);ot.shadowIntensity=vt.intensity,ot.shadowBias=vt.bias,ot.shadowNormalBias=vt.normalBias,ot.shadowRadius=vt.radius,ot.shadowMapSize=vt.mapSize,n.directionalShadow[d]=ot,n.directionalShadowMap[d]=xt,n.directionalShadowMatrix[d]=z.shadow.matrix,I++}n.directional[d]=lt,d++}else if(z.isSpotLight){const lt=t.get(z);lt.position.setFromMatrixPosition(z.matrixWorld),lt.color.copy(Q).multiplyScalar(it),lt.distance=rt,lt.coneCos=Math.cos(z.angle),lt.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),lt.decay=z.decay,n.spot[S]=lt;const vt=z.shadow;if(z.map&&(n.spotLightMap[O]=z.map,O++,vt.updateMatrices(z),z.castShadow&&B++),n.spotLightMatrix[S]=vt.matrix,z.castShadow){const ot=e.get(z);ot.shadowIntensity=vt.intensity,ot.shadowBias=vt.bias,ot.shadowNormalBias=vt.normalBias,ot.shadowRadius=vt.radius,ot.shadowMapSize=vt.mapSize,n.spotShadow[S]=ot,n.spotShadowMap[S]=xt,A++}S++}else if(z.isRectAreaLight){const lt=t.get(z);lt.color.copy(Q).multiplyScalar(it),lt.halfWidth.set(z.width*.5,0,0),lt.halfHeight.set(0,z.height*.5,0),n.rectArea[v]=lt,v++}else if(z.isPointLight){const lt=t.get(z);if(lt.color.copy(z.color).multiplyScalar(z.intensity),lt.distance=z.distance,lt.decay=z.decay,z.castShadow){const vt=z.shadow,ot=e.get(z);ot.shadowIntensity=vt.intensity,ot.shadowBias=vt.bias,ot.shadowNormalBias=vt.normalBias,ot.shadowRadius=vt.radius,ot.shadowMapSize=vt.mapSize,ot.shadowCameraNear=vt.camera.near,ot.shadowCameraFar=vt.camera.far,n.pointShadow[y]=ot,n.pointShadowMap[y]=xt,n.pointShadowMatrix[y]=z.shadow.matrix,P++}n.point[y]=lt,y++}else if(z.isHemisphereLight){const lt=t.get(z);lt.skyColor.copy(z.color).multiplyScalar(it),lt.groundColor.copy(z.groundColor).multiplyScalar(it),n.hemi[_]=lt,_++}}v>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Gt.LTC_FLOAT_1,n.rectAreaLTC2=Gt.LTC_FLOAT_2):(n.rectAreaLTC1=Gt.LTC_HALF_1,n.rectAreaLTC2=Gt.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=m,n.ambient[2]=g;const V=n.hash;(V.directionalLength!==d||V.pointLength!==y||V.spotLength!==S||V.rectAreaLength!==v||V.hemiLength!==_||V.numDirectionalShadows!==I||V.numPointShadows!==P||V.numSpotShadows!==A||V.numSpotMaps!==O||V.numLightProbes!==k)&&(n.directional.length=d,n.spot.length=S,n.rectArea.length=v,n.point.length=y,n.hemi.length=_,n.directionalShadow.length=I,n.directionalShadowMap.length=I,n.pointShadow.length=P,n.pointShadowMap.length=P,n.spotShadow.length=A,n.spotShadowMap.length=A,n.directionalShadowMatrix.length=I,n.pointShadowMatrix.length=P,n.spotLightMatrix.length=A+O-B,n.spotLightMap.length=O,n.numSpotLightShadowsWithMaps=B,n.numLightProbes=k,V.directionalLength=d,V.pointLength=y,V.spotLength=S,V.rectAreaLength=v,V.hemiLength=_,V.numDirectionalShadows=I,V.numPointShadows=P,V.numSpotShadows=A,V.numSpotMaps=O,V.numLightProbes=k,n.version=$v++)}function h(c,p){let m=0,g=0,d=0,y=0,S=0;const v=p.matrixWorldInverse;for(let _=0,I=c.length;_<I;_++){const P=c[_];if(P.isDirectionalLight){const A=n.directional[m];A.direction.setFromMatrixPosition(P.matrixWorld),i.setFromMatrixPosition(P.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(v),m++}else if(P.isSpotLight){const A=n.spot[d];A.position.setFromMatrixPosition(P.matrixWorld),A.position.applyMatrix4(v),A.direction.setFromMatrixPosition(P.matrixWorld),i.setFromMatrixPosition(P.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(v),d++}else if(P.isRectAreaLight){const A=n.rectArea[y];A.position.setFromMatrixPosition(P.matrixWorld),A.position.applyMatrix4(v),o.identity(),r.copy(P.matrixWorld),r.premultiply(v),o.extractRotation(r),A.halfWidth.set(P.width*.5,0,0),A.halfHeight.set(0,P.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),y++}else if(P.isPointLight){const A=n.point[g];A.position.setFromMatrixPosition(P.matrixWorld),A.position.applyMatrix4(v),g++}else if(P.isHemisphereLight){const A=n.hemi[S];A.direction.setFromMatrixPosition(P.matrixWorld),A.direction.transformDirection(v),S++}}}return{setup:a,setupView:h,state:n}}function Bu(s){const t=new Qv(s),e=[],n=[];function i(p){c.camera=p,e.length=0,n.length=0}function r(p){e.push(p)}function o(p){n.push(p)}function a(){t.setup(e)}function h(p){t.setupView(e,p)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:h,pushLight:r,pushShadow:o}}function ty(s){let t=new WeakMap;function e(i,r=0){const o=t.get(i);let a;return o===void 0?(a=new Bu(s),t.set(i,[a])):r>=o.length?(a=new Bu(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const ey=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ny=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function iy(s,t,e){let n=new Th;const i=new Dt,r=new Dt,o=new tn,a=new t0({depthPacking:Ip}),h=new e0,c={},p=e.maxTextureSize,m={[Bs]:Jn,[Jn]:Bs,[Xn]:Xn},g=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:ey,fragmentShader:ny}),d=g.clone();d.defines.HORIZONTAL_PASS=1;const y=new vn;y.setAttribute("position",new Hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new b(y,g),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hu;let _=this.type;this.render=function(B,k,V){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||B.length===0)return;const C=s.getRenderTarget(),E=s.getActiveCubeFace(),z=s.getActiveMipmapLevel(),Q=s.state;Q.setBlending(_s),Q.buffers.depth.getReversed()?Q.buffers.color.setClear(0,0,0,0):Q.buffers.color.setClear(1,1,1,1),Q.buffers.depth.setTest(!0),Q.setScissorTest(!1);const it=_!==ds&&this.type===ds,rt=_===ds&&this.type!==ds;for(let xt=0,lt=B.length;xt<lt;xt++){const vt=B[xt],ot=vt.shadow;if(ot===void 0){console.warn("THREE.WebGLShadowMap:",vt,"has no shadow.");continue}if(ot.autoUpdate===!1&&ot.needsUpdate===!1)continue;i.copy(ot.mapSize);const Ct=ot.getFrameExtents();if(i.multiply(Ct),r.copy(ot.mapSize),(i.x>p||i.y>p)&&(i.x>p&&(r.x=Math.floor(p/Ct.x),i.x=r.x*Ct.x,ot.mapSize.x=r.x),i.y>p&&(r.y=Math.floor(p/Ct.y),i.y=r.y*Ct.y,ot.mapSize.y=r.y)),ot.map===null||it===!0||rt===!0){const Kt=this.type!==ds?{minFilter:pi,magFilter:pi}:{};ot.map!==null&&ot.map.dispose(),ot.map=new Di(i.x,i.y,Kt),ot.map.texture.name=vt.name+".shadowMap",ot.camera.updateProjectionMatrix()}s.setRenderTarget(ot.map),s.clear();const Xt=ot.getViewportCount();for(let Kt=0;Kt<Xt;Kt++){const Pe=ot.getViewport(Kt);o.set(r.x*Pe.x,r.y*Pe.y,r.x*Pe.z,r.y*Pe.w),Q.viewport(o),ot.updateMatrices(vt,Kt),n=ot.getFrustum(),A(k,V,ot.camera,vt,this.type)}ot.isPointLightShadow!==!0&&this.type===ds&&I(ot,V),ot.needsUpdate=!1}_=this.type,v.needsUpdate=!1,s.setRenderTarget(C,E,z)};function I(B,k){const V=t.update(S);g.defines.VSM_SAMPLES!==B.blurSamples&&(g.defines.VSM_SAMPLES=B.blurSamples,d.defines.VSM_SAMPLES=B.blurSamples,g.needsUpdate=!0,d.needsUpdate=!0),B.mapPass===null&&(B.mapPass=new Di(i.x,i.y)),g.uniforms.shadow_pass.value=B.map.texture,g.uniforms.resolution.value=B.mapSize,g.uniforms.radius.value=B.radius,s.setRenderTarget(B.mapPass),s.clear(),s.renderBufferDirect(k,null,V,g,S,null),d.uniforms.shadow_pass.value=B.mapPass.texture,d.uniforms.resolution.value=B.mapSize,d.uniforms.radius.value=B.radius,s.setRenderTarget(B.map),s.clear(),s.renderBufferDirect(k,null,V,d,S,null)}function P(B,k,V,C){let E=null;const z=V.isPointLight===!0?B.customDistanceMaterial:B.customDepthMaterial;if(z!==void 0)E=z;else if(E=V.isPointLight===!0?h:a,s.localClippingEnabled&&k.clipShadows===!0&&Array.isArray(k.clippingPlanes)&&k.clippingPlanes.length!==0||k.displacementMap&&k.displacementScale!==0||k.alphaMap&&k.alphaTest>0||k.map&&k.alphaTest>0||k.alphaToCoverage===!0){const Q=E.uuid,it=k.uuid;let rt=c[Q];rt===void 0&&(rt={},c[Q]=rt);let xt=rt[it];xt===void 0&&(xt=E.clone(),rt[it]=xt,k.addEventListener("dispose",O)),E=xt}if(E.visible=k.visible,E.wireframe=k.wireframe,C===ds?E.side=k.shadowSide!==null?k.shadowSide:k.side:E.side=k.shadowSide!==null?k.shadowSide:m[k.side],E.alphaMap=k.alphaMap,E.alphaTest=k.alphaToCoverage===!0?.5:k.alphaTest,E.map=k.map,E.clipShadows=k.clipShadows,E.clippingPlanes=k.clippingPlanes,E.clipIntersection=k.clipIntersection,E.displacementMap=k.displacementMap,E.displacementScale=k.displacementScale,E.displacementBias=k.displacementBias,E.wireframeLinewidth=k.wireframeLinewidth,E.linewidth=k.linewidth,V.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const Q=s.properties.get(E);Q.light=V}return E}function A(B,k,V,C,E){if(B.visible===!1)return;if(B.layers.test(k.layers)&&(B.isMesh||B.isLine||B.isPoints)&&(B.castShadow||B.receiveShadow&&E===ds)&&(!B.frustumCulled||n.intersectsObject(B))){B.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,B.matrixWorld);const it=t.update(B),rt=B.material;if(Array.isArray(rt)){const xt=it.groups;for(let lt=0,vt=xt.length;lt<vt;lt++){const ot=xt[lt],Ct=rt[ot.materialIndex];if(Ct&&Ct.visible){const Xt=P(B,Ct,C,E);B.onBeforeShadow(s,B,k,V,it,Xt,ot),s.renderBufferDirect(V,null,it,Xt,B,ot),B.onAfterShadow(s,B,k,V,it,Xt,ot)}}}else if(rt.visible){const xt=P(B,rt,C,E);B.onBeforeShadow(s,B,k,V,it,xt,null),s.renderBufferDirect(V,null,it,xt,B,null),B.onAfterShadow(s,B,k,V,it,xt,null)}}const Q=B.children;for(let it=0,rt=Q.length;it<rt;it++)A(Q[it],k,V,C,E)}function O(B){B.target.removeEventListener("dispose",O);for(const V in c){const C=c[V],E=B.target.uuid;E in C&&(C[E].dispose(),delete C[E])}}}const sy={[bc]:Ec,[Tc]:Rc,[Ac]:Pc,[Wr]:Cc,[Ec]:bc,[Rc]:Tc,[Pc]:Ac,[Cc]:Wr};function ry(s,t){function e(){let X=!1;const Tt=new tn;let Lt=null;const Zt=new tn(0,0,0,0);return{setMask:function(ft){Lt!==ft&&!X&&(s.colorMask(ft,ft,ft,ft),Lt=ft)},setLocked:function(ft){X=ft},setClear:function(ft,ut,Yt,ve,Wt){Wt===!0&&(ft*=ve,ut*=ve,Yt*=ve),Tt.set(ft,ut,Yt,ve),Zt.equals(Tt)===!1&&(s.clearColor(ft,ut,Yt,ve),Zt.copy(Tt))},reset:function(){X=!1,Lt=null,Zt.set(-1,0,0,0)}}}function n(){let X=!1,Tt=!1,Lt=null,Zt=null,ft=null;return{setReversed:function(ut){if(Tt!==ut){const Yt=t.get("EXT_clip_control");ut?Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.ZERO_TO_ONE_EXT):Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.NEGATIVE_ONE_TO_ONE_EXT),Tt=ut;const ve=ft;ft=null,this.setClear(ve)}},getReversed:function(){return Tt},setTest:function(ut){ut?Ft(s.DEPTH_TEST):xe(s.DEPTH_TEST)},setMask:function(ut){Lt!==ut&&!X&&(s.depthMask(ut),Lt=ut)},setFunc:function(ut){if(Tt&&(ut=sy[ut]),Zt!==ut){switch(ut){case bc:s.depthFunc(s.NEVER);break;case Ec:s.depthFunc(s.ALWAYS);break;case Tc:s.depthFunc(s.LESS);break;case Wr:s.depthFunc(s.LEQUAL);break;case Ac:s.depthFunc(s.EQUAL);break;case Cc:s.depthFunc(s.GEQUAL);break;case Rc:s.depthFunc(s.GREATER);break;case Pc:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Zt=ut}},setLocked:function(ut){X=ut},setClear:function(ut){ft!==ut&&(Tt&&(ut=1-ut),s.clearDepth(ut),ft=ut)},reset:function(){X=!1,Lt=null,Zt=null,ft=null,Tt=!1}}}function i(){let X=!1,Tt=null,Lt=null,Zt=null,ft=null,ut=null,Yt=null,ve=null,Wt=null;return{setTest:function(ze){X||(ze?Ft(s.STENCIL_TEST):xe(s.STENCIL_TEST))},setMask:function(ze){Tt!==ze&&!X&&(s.stencilMask(ze),Tt=ze)},setFunc:function(ze,Gn,ii){(Lt!==ze||Zt!==Gn||ft!==ii)&&(s.stencilFunc(ze,Gn,ii),Lt=ze,Zt=Gn,ft=ii)},setOp:function(ze,Gn,ii){(ut!==ze||Yt!==Gn||ve!==ii)&&(s.stencilOp(ze,Gn,ii),ut=ze,Yt=Gn,ve=ii)},setLocked:function(ze){X=ze},setClear:function(ze){Wt!==ze&&(s.clearStencil(ze),Wt=ze)},reset:function(){X=!1,Tt=null,Lt=null,Zt=null,ft=null,ut=null,Yt=null,ve=null,Wt=null}}}const r=new e,o=new n,a=new i,h=new WeakMap,c=new WeakMap;let p={},m={},g=new WeakMap,d=[],y=null,S=!1,v=null,_=null,I=null,P=null,A=null,O=null,B=null,k=new be(0,0,0),V=0,C=!1,E=null,z=null,Q=null,it=null,rt=null;const xt=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let lt=!1,vt=0;const ot=s.getParameter(s.VERSION);ot.indexOf("WebGL")!==-1?(vt=parseFloat(/^WebGL (\d)/.exec(ot)[1]),lt=vt>=1):ot.indexOf("OpenGL ES")!==-1&&(vt=parseFloat(/^OpenGL ES (\d)/.exec(ot)[1]),lt=vt>=2);let Ct=null,Xt={};const Kt=s.getParameter(s.SCISSOR_BOX),Pe=s.getParameter(s.VIEWPORT),ln=new tn().fromArray(Kt),en=new tn().fromArray(Pe);function ct(X,Tt,Lt,Zt){const ft=new Uint8Array(4),ut=s.createTexture();s.bindTexture(X,ut),s.texParameteri(X,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(X,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Yt=0;Yt<Lt;Yt++)X===s.TEXTURE_3D||X===s.TEXTURE_2D_ARRAY?s.texImage3D(Tt,0,s.RGBA,1,1,Zt,0,s.RGBA,s.UNSIGNED_BYTE,ft):s.texImage2D(Tt+Yt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ft);return ut}const Vt={};Vt[s.TEXTURE_2D]=ct(s.TEXTURE_2D,s.TEXTURE_2D,1),Vt[s.TEXTURE_CUBE_MAP]=ct(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Vt[s.TEXTURE_2D_ARRAY]=ct(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Vt[s.TEXTURE_3D]=ct(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Ft(s.DEPTH_TEST),o.setFunc(Wr),je(!1),pe(pd),Ft(s.CULL_FACE),nn(_s);function Ft(X){p[X]!==!0&&(s.enable(X),p[X]=!0)}function xe(X){p[X]!==!1&&(s.disable(X),p[X]=!1)}function _e(X,Tt){return m[X]!==Tt?(s.bindFramebuffer(X,Tt),m[X]=Tt,X===s.DRAW_FRAMEBUFFER&&(m[s.FRAMEBUFFER]=Tt),X===s.FRAMEBUFFER&&(m[s.DRAW_FRAMEBUFFER]=Tt),!0):!1}function Ee(X,Tt){let Lt=d,Zt=!1;if(X){Lt=g.get(Tt),Lt===void 0&&(Lt=[],g.set(Tt,Lt));const ft=X.textures;if(Lt.length!==ft.length||Lt[0]!==s.COLOR_ATTACHMENT0){for(let ut=0,Yt=ft.length;ut<Yt;ut++)Lt[ut]=s.COLOR_ATTACHMENT0+ut;Lt.length=ft.length,Zt=!0}}else Lt[0]!==s.BACK&&(Lt[0]=s.BACK,Zt=!0);Zt&&s.drawBuffers(Lt)}function yn(X){return y!==X?(s.useProgram(X),y=X,!0):!1}const we={[sr]:s.FUNC_ADD,[rp]:s.FUNC_SUBTRACT,[op]:s.FUNC_REVERSE_SUBTRACT};we[ap]=s.MIN,we[lp]=s.MAX;const H={[cp]:s.ZERO,[hp]:s.ONE,[dp]:s.SRC_COLOR,[wc]:s.SRC_ALPHA,[_p]:s.SRC_ALPHA_SATURATE,[mp]:s.DST_COLOR,[fp]:s.DST_ALPHA,[up]:s.ONE_MINUS_SRC_COLOR,[Sc]:s.ONE_MINUS_SRC_ALPHA,[gp]:s.ONE_MINUS_DST_COLOR,[pp]:s.ONE_MINUS_DST_ALPHA,[xp]:s.CONSTANT_COLOR,[vp]:s.ONE_MINUS_CONSTANT_COLOR,[yp]:s.CONSTANT_ALPHA,[Mp]:s.ONE_MINUS_CONSTANT_ALPHA};function nn(X,Tt,Lt,Zt,ft,ut,Yt,ve,Wt,ze){if(X===_s){S===!0&&(xe(s.BLEND),S=!1);return}if(S===!1&&(Ft(s.BLEND),S=!0),X!==sp){if(X!==v||ze!==C){if((_!==sr||A!==sr)&&(s.blendEquation(s.FUNC_ADD),_=sr,A=sr),ze)switch(X){case Vr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case On:s.blendFunc(s.ONE,s.ONE);break;case md:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case gd:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case Vr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case On:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case md:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gd:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}I=null,P=null,O=null,B=null,k.set(0,0,0),V=0,v=X,C=ze}return}ft=ft||Tt,ut=ut||Lt,Yt=Yt||Zt,(Tt!==_||ft!==A)&&(s.blendEquationSeparate(we[Tt],we[ft]),_=Tt,A=ft),(Lt!==I||Zt!==P||ut!==O||Yt!==B)&&(s.blendFuncSeparate(H[Lt],H[Zt],H[ut],H[Yt]),I=Lt,P=Zt,O=ut,B=Yt),(ve.equals(k)===!1||Wt!==V)&&(s.blendColor(ve.r,ve.g,ve.b,Wt),k.copy(ve),V=Wt),v=X,C=!1}function ge(X,Tt){X.side===Xn?xe(s.CULL_FACE):Ft(s.CULL_FACE);let Lt=X.side===Jn;Tt&&(Lt=!Lt),je(Lt),X.blending===Vr&&X.transparent===!1?nn(_s):nn(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),o.setFunc(X.depthFunc),o.setTest(X.depthTest),o.setMask(X.depthWrite),r.setMask(X.colorWrite);const Zt=X.stencilWrite;a.setTest(Zt),Zt&&(a.setMask(X.stencilWriteMask),a.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),a.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),ee(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?Ft(s.SAMPLE_ALPHA_TO_COVERAGE):xe(s.SAMPLE_ALPHA_TO_COVERAGE)}function je(X){E!==X&&(X?s.frontFace(s.CW):s.frontFace(s.CCW),E=X)}function pe(X){X!==ep?(Ft(s.CULL_FACE),X!==z&&(X===pd?s.cullFace(s.BACK):X===np?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):xe(s.CULL_FACE),z=X}function hn(X){X!==Q&&(lt&&s.lineWidth(X),Q=X)}function ee(X,Tt,Lt){X?(Ft(s.POLYGON_OFFSET_FILL),(it!==Tt||rt!==Lt)&&(s.polygonOffset(Tt,Lt),it=Tt,rt=Lt)):xe(s.POLYGON_OFFSET_FILL)}function Ie(X){X?Ft(s.SCISSOR_TEST):xe(s.SCISSOR_TEST)}function Cn(X){X===void 0&&(X=s.TEXTURE0+xt-1),Ct!==X&&(s.activeTexture(X),Ct=X)}function Mn(X,Tt,Lt){Lt===void 0&&(Ct===null?Lt=s.TEXTURE0+xt-1:Lt=Ct);let Zt=Xt[Lt];Zt===void 0&&(Zt={type:void 0,texture:void 0},Xt[Lt]=Zt),(Zt.type!==X||Zt.texture!==Tt)&&(Ct!==Lt&&(s.activeTexture(Lt),Ct=Lt),s.bindTexture(X,Tt||Vt[X]),Zt.type=X,Zt.texture=Tt)}function N(){const X=Xt[Ct];X!==void 0&&X.type!==void 0&&(s.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function w(){try{s.compressedTexImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function K(){try{s.compressedTexImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ht(){try{s.texSubImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Et(){try{s.texSubImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function tt(){try{s.compressedTexSubImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function he(){try{s.compressedTexSubImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function It(){try{s.texStorage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function re(){try{s.texStorage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function se(){try{s.texImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Rt(){try{s.texImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function dt(X){ln.equals(X)===!1&&(s.scissor(X.x,X.y,X.z,X.w),ln.copy(X))}function yt(X){en.equals(X)===!1&&(s.viewport(X.x,X.y,X.z,X.w),en.copy(X))}function jt(X,Tt){let Lt=c.get(Tt);Lt===void 0&&(Lt=new WeakMap,c.set(Tt,Lt));let Zt=Lt.get(X);Zt===void 0&&(Zt=s.getUniformBlockIndex(Tt,X.name),Lt.set(X,Zt))}function kt(X,Tt){const Zt=c.get(Tt).get(X);h.get(Tt)!==Zt&&(s.uniformBlockBinding(Tt,Zt,X.__bindingPointIndex),h.set(Tt,Zt))}function Jt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),p={},Ct=null,Xt={},m={},g=new WeakMap,d=[],y=null,S=!1,v=null,_=null,I=null,P=null,A=null,O=null,B=null,k=new be(0,0,0),V=0,C=!1,E=null,z=null,Q=null,it=null,rt=null,ln.set(0,0,s.canvas.width,s.canvas.height),en.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Ft,disable:xe,bindFramebuffer:_e,drawBuffers:Ee,useProgram:yn,setBlending:nn,setMaterial:ge,setFlipSided:je,setCullFace:pe,setLineWidth:hn,setPolygonOffset:ee,setScissorTest:Ie,activeTexture:Cn,bindTexture:Mn,unbindTexture:N,compressedTexImage2D:w,compressedTexImage3D:K,texImage2D:se,texImage3D:Rt,updateUBOMapping:jt,uniformBlockBinding:kt,texStorage2D:It,texStorage3D:re,texSubImage2D:ht,texSubImage3D:Et,compressedTexSubImage2D:tt,compressedTexSubImage3D:he,scissor:dt,viewport:yt,reset:Jt}}function oy(s,t,e,n,i,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Dt,p=new WeakMap;let m;const g=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(N,w){return d?new OffscreenCanvas(N,w):No("canvas")}function S(N,w,K){let ht=1;const Et=Mn(N);if((Et.width>K||Et.height>K)&&(ht=K/Math.max(Et.width,Et.height)),ht<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const tt=Math.floor(ht*Et.width),he=Math.floor(ht*Et.height);m===void 0&&(m=y(tt,he));const It=w?y(tt,he):m;return It.width=tt,It.height=he,It.getContext("2d").drawImage(N,0,0,tt,he),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Et.width+"x"+Et.height+") to ("+tt+"x"+he+")."),It}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Et.width+"x"+Et.height+")."),N;return N}function v(N){return N.generateMipmaps}function _(N){s.generateMipmap(N)}function I(N){return N.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?s.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function P(N,w,K,ht,Et=!1){if(N!==null){if(s[N]!==void 0)return s[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let tt=w;if(w===s.RED&&(K===s.FLOAT&&(tt=s.R32F),K===s.HALF_FLOAT&&(tt=s.R16F),K===s.UNSIGNED_BYTE&&(tt=s.R8)),w===s.RED_INTEGER&&(K===s.UNSIGNED_BYTE&&(tt=s.R8UI),K===s.UNSIGNED_SHORT&&(tt=s.R16UI),K===s.UNSIGNED_INT&&(tt=s.R32UI),K===s.BYTE&&(tt=s.R8I),K===s.SHORT&&(tt=s.R16I),K===s.INT&&(tt=s.R32I)),w===s.RG&&(K===s.FLOAT&&(tt=s.RG32F),K===s.HALF_FLOAT&&(tt=s.RG16F),K===s.UNSIGNED_BYTE&&(tt=s.RG8)),w===s.RG_INTEGER&&(K===s.UNSIGNED_BYTE&&(tt=s.RG8UI),K===s.UNSIGNED_SHORT&&(tt=s.RG16UI),K===s.UNSIGNED_INT&&(tt=s.RG32UI),K===s.BYTE&&(tt=s.RG8I),K===s.SHORT&&(tt=s.RG16I),K===s.INT&&(tt=s.RG32I)),w===s.RGB_INTEGER&&(K===s.UNSIGNED_BYTE&&(tt=s.RGB8UI),K===s.UNSIGNED_SHORT&&(tt=s.RGB16UI),K===s.UNSIGNED_INT&&(tt=s.RGB32UI),K===s.BYTE&&(tt=s.RGB8I),K===s.SHORT&&(tt=s.RGB16I),K===s.INT&&(tt=s.RGB32I)),w===s.RGBA_INTEGER&&(K===s.UNSIGNED_BYTE&&(tt=s.RGBA8UI),K===s.UNSIGNED_SHORT&&(tt=s.RGBA16UI),K===s.UNSIGNED_INT&&(tt=s.RGBA32UI),K===s.BYTE&&(tt=s.RGBA8I),K===s.SHORT&&(tt=s.RGBA16I),K===s.INT&&(tt=s.RGBA32I)),w===s.RGB&&K===s.UNSIGNED_INT_5_9_9_9_REV&&(tt=s.RGB9_E5),w===s.RGBA){const he=Et?tl:$e.getTransfer(ht);K===s.FLOAT&&(tt=s.RGBA32F),K===s.HALF_FLOAT&&(tt=s.RGBA16F),K===s.UNSIGNED_BYTE&&(tt=he===rn?s.SRGB8_ALPHA8:s.RGBA8),K===s.UNSIGNED_SHORT_4_4_4_4&&(tt=s.RGBA4),K===s.UNSIGNED_SHORT_5_5_5_1&&(tt=s.RGB5_A1)}return(tt===s.R16F||tt===s.R32F||tt===s.RG16F||tt===s.RG32F||tt===s.RGBA16F||tt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function A(N,w){let K;return N?w===null||w===lr||w===Do?K=s.DEPTH24_STENCIL8:w===Pi?K=s.DEPTH32F_STENCIL8:w===Io&&(K=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===lr||w===Do?K=s.DEPTH_COMPONENT24:w===Pi?K=s.DEPTH_COMPONENT32F:w===Io&&(K=s.DEPTH_COMPONENT16),K}function O(N,w){return v(N)===!0||N.isFramebufferTexture&&N.minFilter!==pi&&N.minFilter!==Xi?Math.log2(Math.max(w.width,w.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?w.mipmaps.length:1}function B(N){const w=N.target;w.removeEventListener("dispose",B),V(w),w.isVideoTexture&&p.delete(w)}function k(N){const w=N.target;w.removeEventListener("dispose",k),E(w)}function V(N){const w=n.get(N);if(w.__webglInit===void 0)return;const K=N.source,ht=g.get(K);if(ht){const Et=ht[w.__cacheKey];Et.usedTimes--,Et.usedTimes===0&&C(N),Object.keys(ht).length===0&&g.delete(K)}n.remove(N)}function C(N){const w=n.get(N);s.deleteTexture(w.__webglTexture);const K=N.source,ht=g.get(K);delete ht[w.__cacheKey],o.memory.textures--}function E(N){const w=n.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),n.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let ht=0;ht<6;ht++){if(Array.isArray(w.__webglFramebuffer[ht]))for(let Et=0;Et<w.__webglFramebuffer[ht].length;Et++)s.deleteFramebuffer(w.__webglFramebuffer[ht][Et]);else s.deleteFramebuffer(w.__webglFramebuffer[ht]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[ht])}else{if(Array.isArray(w.__webglFramebuffer))for(let ht=0;ht<w.__webglFramebuffer.length;ht++)s.deleteFramebuffer(w.__webglFramebuffer[ht]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ht=0;ht<w.__webglColorRenderbuffer.length;ht++)w.__webglColorRenderbuffer[ht]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[ht]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const K=N.textures;for(let ht=0,Et=K.length;ht<Et;ht++){const tt=n.get(K[ht]);tt.__webglTexture&&(s.deleteTexture(tt.__webglTexture),o.memory.textures--),n.remove(K[ht])}n.remove(N)}let z=0;function Q(){z=0}function it(){const N=z;return N>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+i.maxTextures),z+=1,N}function rt(N){const w=[];return w.push(N.wrapS),w.push(N.wrapT),w.push(N.wrapR||0),w.push(N.magFilter),w.push(N.minFilter),w.push(N.anisotropy),w.push(N.internalFormat),w.push(N.format),w.push(N.type),w.push(N.generateMipmaps),w.push(N.premultiplyAlpha),w.push(N.flipY),w.push(N.unpackAlignment),w.push(N.colorSpace),w.join()}function xt(N,w){const K=n.get(N);if(N.isVideoTexture&&Ie(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&K.__version!==N.version){const ht=N.image;if(ht===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ht.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Vt(K,N,w);return}}else N.isExternalTexture&&(K.__webglTexture=N.sourceTexture?N.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,K.__webglTexture,s.TEXTURE0+w)}function lt(N,w){const K=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&K.__version!==N.version){Vt(K,N,w);return}e.bindTexture(s.TEXTURE_2D_ARRAY,K.__webglTexture,s.TEXTURE0+w)}function vt(N,w){const K=n.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&K.__version!==N.version){Vt(K,N,w);return}e.bindTexture(s.TEXTURE_3D,K.__webglTexture,s.TEXTURE0+w)}function ot(N,w){const K=n.get(N);if(N.version>0&&K.__version!==N.version){Ft(K,N,w);return}e.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture,s.TEXTURE0+w)}const Ct={[us]:s.REPEAT,[or]:s.CLAMP_TO_EDGE,[Dc]:s.MIRRORED_REPEAT},Xt={[pi]:s.NEAREST,[Ep]:s.NEAREST_MIPMAP_NEAREST,[ca]:s.NEAREST_MIPMAP_LINEAR,[Xi]:s.LINEAR,[Nl]:s.LINEAR_MIPMAP_NEAREST,[ar]:s.LINEAR_MIPMAP_LINEAR},Kt={[Lp]:s.NEVER,[zp]:s.ALWAYS,[Up]:s.LESS,[of]:s.LEQUAL,[Np]:s.EQUAL,[Bp]:s.GEQUAL,[Fp]:s.GREATER,[Op]:s.NOTEQUAL};function Pe(N,w){if(w.type===Pi&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Xi||w.magFilter===Nl||w.magFilter===ca||w.magFilter===ar||w.minFilter===Xi||w.minFilter===Nl||w.minFilter===ca||w.minFilter===ar)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(N,s.TEXTURE_WRAP_S,Ct[w.wrapS]),s.texParameteri(N,s.TEXTURE_WRAP_T,Ct[w.wrapT]),(N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY)&&s.texParameteri(N,s.TEXTURE_WRAP_R,Ct[w.wrapR]),s.texParameteri(N,s.TEXTURE_MAG_FILTER,Xt[w.magFilter]),s.texParameteri(N,s.TEXTURE_MIN_FILTER,Xt[w.minFilter]),w.compareFunction&&(s.texParameteri(N,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(N,s.TEXTURE_COMPARE_FUNC,Kt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===pi||w.minFilter!==ca&&w.minFilter!==ar||w.type===Pi&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const K=t.get("EXT_texture_filter_anisotropic");s.texParameterf(N,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function ln(N,w){let K=!1;N.__webglInit===void 0&&(N.__webglInit=!0,w.addEventListener("dispose",B));const ht=w.source;let Et=g.get(ht);Et===void 0&&(Et={},g.set(ht,Et));const tt=rt(w);if(tt!==N.__cacheKey){Et[tt]===void 0&&(Et[tt]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,K=!0),Et[tt].usedTimes++;const he=Et[N.__cacheKey];he!==void 0&&(Et[N.__cacheKey].usedTimes--,he.usedTimes===0&&C(w)),N.__cacheKey=tt,N.__webglTexture=Et[tt].texture}return K}function en(N,w,K){return Math.floor(Math.floor(N/K)/w)}function ct(N,w,K,ht){const tt=N.updateRanges;if(tt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,w.width,w.height,K,ht,w.data);else{tt.sort((Rt,dt)=>Rt.start-dt.start);let he=0;for(let Rt=1;Rt<tt.length;Rt++){const dt=tt[he],yt=tt[Rt],jt=dt.start+dt.count,kt=en(yt.start,w.width,4),Jt=en(dt.start,w.width,4);yt.start<=jt+1&&kt===Jt&&en(yt.start+yt.count-1,w.width,4)===kt?dt.count=Math.max(dt.count,yt.start+yt.count-dt.start):(++he,tt[he]=yt)}tt.length=he+1;const It=s.getParameter(s.UNPACK_ROW_LENGTH),re=s.getParameter(s.UNPACK_SKIP_PIXELS),se=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,w.width);for(let Rt=0,dt=tt.length;Rt<dt;Rt++){const yt=tt[Rt],jt=Math.floor(yt.start/4),kt=Math.ceil(yt.count/4),Jt=jt%w.width,X=Math.floor(jt/w.width),Tt=kt,Lt=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Jt),s.pixelStorei(s.UNPACK_SKIP_ROWS,X),e.texSubImage2D(s.TEXTURE_2D,0,Jt,X,Tt,Lt,K,ht,w.data)}N.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,It),s.pixelStorei(s.UNPACK_SKIP_PIXELS,re),s.pixelStorei(s.UNPACK_SKIP_ROWS,se)}}function Vt(N,w,K){let ht=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ht=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ht=s.TEXTURE_3D);const Et=ln(N,w),tt=w.source;e.bindTexture(ht,N.__webglTexture,s.TEXTURE0+K);const he=n.get(tt);if(tt.version!==he.__version||Et===!0){e.activeTexture(s.TEXTURE0+K);const It=$e.getPrimaries($e.workingColorSpace),re=w.colorSpace===Ns?null:$e.getPrimaries(w.colorSpace),se=w.colorSpace===Ns||It===re?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);let Rt=S(w.image,!1,i.maxTextureSize);Rt=Cn(w,Rt);const dt=r.convert(w.format,w.colorSpace),yt=r.convert(w.type);let jt=P(w.internalFormat,dt,yt,w.colorSpace,w.isVideoTexture);Pe(ht,w);let kt;const Jt=w.mipmaps,X=w.isVideoTexture!==!0,Tt=he.__version===void 0||Et===!0,Lt=tt.dataReady,Zt=O(w,Rt);if(w.isDepthTexture)jt=A(w.format===Uo,w.type),Tt&&(X?e.texStorage2D(s.TEXTURE_2D,1,jt,Rt.width,Rt.height):e.texImage2D(s.TEXTURE_2D,0,jt,Rt.width,Rt.height,0,dt,yt,null));else if(w.isDataTexture)if(Jt.length>0){X&&Tt&&e.texStorage2D(s.TEXTURE_2D,Zt,jt,Jt[0].width,Jt[0].height);for(let ft=0,ut=Jt.length;ft<ut;ft++)kt=Jt[ft],X?Lt&&e.texSubImage2D(s.TEXTURE_2D,ft,0,0,kt.width,kt.height,dt,yt,kt.data):e.texImage2D(s.TEXTURE_2D,ft,jt,kt.width,kt.height,0,dt,yt,kt.data);w.generateMipmaps=!1}else X?(Tt&&e.texStorage2D(s.TEXTURE_2D,Zt,jt,Rt.width,Rt.height),Lt&&ct(w,Rt,dt,yt)):e.texImage2D(s.TEXTURE_2D,0,jt,Rt.width,Rt.height,0,dt,yt,Rt.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){X&&Tt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Zt,jt,Jt[0].width,Jt[0].height,Rt.depth);for(let ft=0,ut=Jt.length;ft<ut;ft++)if(kt=Jt[ft],w.format!==xi)if(dt!==null)if(X){if(Lt)if(w.layerUpdates.size>0){const Yt=mu(kt.width,kt.height,w.format,w.type);for(const ve of w.layerUpdates){const Wt=kt.data.subarray(ve*Yt/kt.data.BYTES_PER_ELEMENT,(ve+1)*Yt/kt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ft,0,0,ve,kt.width,kt.height,1,dt,Wt)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ft,0,0,0,kt.width,kt.height,Rt.depth,dt,kt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ft,jt,kt.width,kt.height,Rt.depth,0,kt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else X?Lt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,ft,0,0,0,kt.width,kt.height,Rt.depth,dt,yt,kt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,ft,jt,kt.width,kt.height,Rt.depth,0,dt,yt,kt.data)}else{X&&Tt&&e.texStorage2D(s.TEXTURE_2D,Zt,jt,Jt[0].width,Jt[0].height);for(let ft=0,ut=Jt.length;ft<ut;ft++)kt=Jt[ft],w.format!==xi?dt!==null?X?Lt&&e.compressedTexSubImage2D(s.TEXTURE_2D,ft,0,0,kt.width,kt.height,dt,kt.data):e.compressedTexImage2D(s.TEXTURE_2D,ft,jt,kt.width,kt.height,0,kt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):X?Lt&&e.texSubImage2D(s.TEXTURE_2D,ft,0,0,kt.width,kt.height,dt,yt,kt.data):e.texImage2D(s.TEXTURE_2D,ft,jt,kt.width,kt.height,0,dt,yt,kt.data)}else if(w.isDataArrayTexture)if(X){if(Tt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Zt,jt,Rt.width,Rt.height,Rt.depth),Lt)if(w.layerUpdates.size>0){const ft=mu(Rt.width,Rt.height,w.format,w.type);for(const ut of w.layerUpdates){const Yt=Rt.data.subarray(ut*ft/Rt.data.BYTES_PER_ELEMENT,(ut+1)*ft/Rt.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ut,Rt.width,Rt.height,1,dt,yt,Yt)}w.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Rt.width,Rt.height,Rt.depth,dt,yt,Rt.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,jt,Rt.width,Rt.height,Rt.depth,0,dt,yt,Rt.data);else if(w.isData3DTexture)X?(Tt&&e.texStorage3D(s.TEXTURE_3D,Zt,jt,Rt.width,Rt.height,Rt.depth),Lt&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Rt.width,Rt.height,Rt.depth,dt,yt,Rt.data)):e.texImage3D(s.TEXTURE_3D,0,jt,Rt.width,Rt.height,Rt.depth,0,dt,yt,Rt.data);else if(w.isFramebufferTexture){if(Tt)if(X)e.texStorage2D(s.TEXTURE_2D,Zt,jt,Rt.width,Rt.height);else{let ft=Rt.width,ut=Rt.height;for(let Yt=0;Yt<Zt;Yt++)e.texImage2D(s.TEXTURE_2D,Yt,jt,ft,ut,0,dt,yt,null),ft>>=1,ut>>=1}}else if(Jt.length>0){if(X&&Tt){const ft=Mn(Jt[0]);e.texStorage2D(s.TEXTURE_2D,Zt,jt,ft.width,ft.height)}for(let ft=0,ut=Jt.length;ft<ut;ft++)kt=Jt[ft],X?Lt&&e.texSubImage2D(s.TEXTURE_2D,ft,0,0,dt,yt,kt):e.texImage2D(s.TEXTURE_2D,ft,jt,dt,yt,kt);w.generateMipmaps=!1}else if(X){if(Tt){const ft=Mn(Rt);e.texStorage2D(s.TEXTURE_2D,Zt,jt,ft.width,ft.height)}Lt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,dt,yt,Rt)}else e.texImage2D(s.TEXTURE_2D,0,jt,dt,yt,Rt);v(w)&&_(ht),he.__version=tt.version,w.onUpdate&&w.onUpdate(w)}N.__version=w.version}function Ft(N,w,K){if(w.image.length!==6)return;const ht=ln(N,w),Et=w.source;e.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+K);const tt=n.get(Et);if(Et.version!==tt.__version||ht===!0){e.activeTexture(s.TEXTURE0+K);const he=$e.getPrimaries($e.workingColorSpace),It=w.colorSpace===Ns?null:$e.getPrimaries(w.colorSpace),re=w.colorSpace===Ns||he===It?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);const se=w.isCompressedTexture||w.image[0].isCompressedTexture,Rt=w.image[0]&&w.image[0].isDataTexture,dt=[];for(let ut=0;ut<6;ut++)!se&&!Rt?dt[ut]=S(w.image[ut],!0,i.maxCubemapSize):dt[ut]=Rt?w.image[ut].image:w.image[ut],dt[ut]=Cn(w,dt[ut]);const yt=dt[0],jt=r.convert(w.format,w.colorSpace),kt=r.convert(w.type),Jt=P(w.internalFormat,jt,kt,w.colorSpace),X=w.isVideoTexture!==!0,Tt=tt.__version===void 0||ht===!0,Lt=Et.dataReady;let Zt=O(w,yt);Pe(s.TEXTURE_CUBE_MAP,w);let ft;if(se){X&&Tt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Zt,Jt,yt.width,yt.height);for(let ut=0;ut<6;ut++){ft=dt[ut].mipmaps;for(let Yt=0;Yt<ft.length;Yt++){const ve=ft[Yt];w.format!==xi?jt!==null?X?Lt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Yt,0,0,ve.width,ve.height,jt,ve.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Yt,Jt,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?Lt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Yt,0,0,ve.width,ve.height,jt,kt,ve.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Yt,Jt,ve.width,ve.height,0,jt,kt,ve.data)}}}else{if(ft=w.mipmaps,X&&Tt){ft.length>0&&Zt++;const ut=Mn(dt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,Zt,Jt,ut.width,ut.height)}for(let ut=0;ut<6;ut++)if(Rt){X?Lt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,dt[ut].width,dt[ut].height,jt,kt,dt[ut].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,Jt,dt[ut].width,dt[ut].height,0,jt,kt,dt[ut].data);for(let Yt=0;Yt<ft.length;Yt++){const Wt=ft[Yt].image[ut].image;X?Lt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Yt+1,0,0,Wt.width,Wt.height,jt,kt,Wt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Yt+1,Jt,Wt.width,Wt.height,0,jt,kt,Wt.data)}}else{X?Lt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,jt,kt,dt[ut]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,Jt,jt,kt,dt[ut]);for(let Yt=0;Yt<ft.length;Yt++){const ve=ft[Yt];X?Lt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Yt+1,0,0,jt,kt,ve.image[ut]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Yt+1,Jt,jt,kt,ve.image[ut])}}}v(w)&&_(s.TEXTURE_CUBE_MAP),tt.__version=Et.version,w.onUpdate&&w.onUpdate(w)}N.__version=w.version}function xe(N,w,K,ht,Et,tt){const he=r.convert(K.format,K.colorSpace),It=r.convert(K.type),re=P(K.internalFormat,he,It,K.colorSpace),se=n.get(w),Rt=n.get(K);if(Rt.__renderTarget=w,!se.__hasExternalTextures){const dt=Math.max(1,w.width>>tt),yt=Math.max(1,w.height>>tt);Et===s.TEXTURE_3D||Et===s.TEXTURE_2D_ARRAY?e.texImage3D(Et,tt,re,dt,yt,w.depth,0,he,It,null):e.texImage2D(Et,tt,re,dt,yt,0,he,It,null)}e.bindFramebuffer(s.FRAMEBUFFER,N),ee(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ht,Et,Rt.__webglTexture,0,hn(w)):(Et===s.TEXTURE_2D||Et>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Et<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ht,Et,Rt.__webglTexture,tt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function _e(N,w,K){if(s.bindRenderbuffer(s.RENDERBUFFER,N),w.depthBuffer){const ht=w.depthTexture,Et=ht&&ht.isDepthTexture?ht.type:null,tt=A(w.stencilBuffer,Et),he=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,It=hn(w);ee(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,It,tt,w.width,w.height):K?s.renderbufferStorageMultisample(s.RENDERBUFFER,It,tt,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,tt,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,he,s.RENDERBUFFER,N)}else{const ht=w.textures;for(let Et=0;Et<ht.length;Et++){const tt=ht[Et],he=r.convert(tt.format,tt.colorSpace),It=r.convert(tt.type),re=P(tt.internalFormat,he,It,tt.colorSpace),se=hn(w);K&&ee(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,se,re,w.width,w.height):ee(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,se,re,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,re,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ee(N,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,N),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ht=n.get(w.depthTexture);ht.__renderTarget=w,(!ht.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),xt(w.depthTexture,0);const Et=ht.__webglTexture,tt=hn(w);if(w.depthTexture.format===Lo)ee(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Et,0,tt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Et,0);else if(w.depthTexture.format===Uo)ee(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Et,0,tt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Et,0);else throw new Error("Unknown depthTexture format")}function yn(N){const w=n.get(N),K=N.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==N.depthTexture){const ht=N.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ht){const Et=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ht.removeEventListener("dispose",Et)};ht.addEventListener("dispose",Et),w.__depthDisposeCallback=Et}w.__boundDepthTexture=ht}if(N.depthTexture&&!w.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");const ht=N.texture.mipmaps;ht&&ht.length>0?Ee(w.__webglFramebuffer[0],N):Ee(w.__webglFramebuffer,N)}else if(K){w.__webglDepthbuffer=[];for(let ht=0;ht<6;ht++)if(e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[ht]),w.__webglDepthbuffer[ht]===void 0)w.__webglDepthbuffer[ht]=s.createRenderbuffer(),_e(w.__webglDepthbuffer[ht],N,!1);else{const Et=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,tt=w.__webglDepthbuffer[ht];s.bindRenderbuffer(s.RENDERBUFFER,tt),s.framebufferRenderbuffer(s.FRAMEBUFFER,Et,s.RENDERBUFFER,tt)}}else{const ht=N.texture.mipmaps;if(ht&&ht.length>0?e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),_e(w.__webglDepthbuffer,N,!1);else{const Et=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,tt=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,tt),s.framebufferRenderbuffer(s.FRAMEBUFFER,Et,s.RENDERBUFFER,tt)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function we(N,w,K){const ht=n.get(N);w!==void 0&&xe(ht.__webglFramebuffer,N,N.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),K!==void 0&&yn(N)}function H(N){const w=N.texture,K=n.get(N),ht=n.get(w);N.addEventListener("dispose",k);const Et=N.textures,tt=N.isWebGLCubeRenderTarget===!0,he=Et.length>1;if(he||(ht.__webglTexture===void 0&&(ht.__webglTexture=s.createTexture()),ht.__version=w.version,o.memory.textures++),tt){K.__webglFramebuffer=[];for(let It=0;It<6;It++)if(w.mipmaps&&w.mipmaps.length>0){K.__webglFramebuffer[It]=[];for(let re=0;re<w.mipmaps.length;re++)K.__webglFramebuffer[It][re]=s.createFramebuffer()}else K.__webglFramebuffer[It]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){K.__webglFramebuffer=[];for(let It=0;It<w.mipmaps.length;It++)K.__webglFramebuffer[It]=s.createFramebuffer()}else K.__webglFramebuffer=s.createFramebuffer();if(he)for(let It=0,re=Et.length;It<re;It++){const se=n.get(Et[It]);se.__webglTexture===void 0&&(se.__webglTexture=s.createTexture(),o.memory.textures++)}if(N.samples>0&&ee(N)===!1){K.__webglMultisampledFramebuffer=s.createFramebuffer(),K.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let It=0;It<Et.length;It++){const re=Et[It];K.__webglColorRenderbuffer[It]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,K.__webglColorRenderbuffer[It]);const se=r.convert(re.format,re.colorSpace),Rt=r.convert(re.type),dt=P(re.internalFormat,se,Rt,re.colorSpace,N.isXRRenderTarget===!0),yt=hn(N);s.renderbufferStorageMultisample(s.RENDERBUFFER,yt,dt,N.width,N.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+It,s.RENDERBUFFER,K.__webglColorRenderbuffer[It])}s.bindRenderbuffer(s.RENDERBUFFER,null),N.depthBuffer&&(K.__webglDepthRenderbuffer=s.createRenderbuffer(),_e(K.__webglDepthRenderbuffer,N,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(tt){e.bindTexture(s.TEXTURE_CUBE_MAP,ht.__webglTexture),Pe(s.TEXTURE_CUBE_MAP,w);for(let It=0;It<6;It++)if(w.mipmaps&&w.mipmaps.length>0)for(let re=0;re<w.mipmaps.length;re++)xe(K.__webglFramebuffer[It][re],N,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+It,re);else xe(K.__webglFramebuffer[It],N,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+It,0);v(w)&&_(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(he){for(let It=0,re=Et.length;It<re;It++){const se=Et[It],Rt=n.get(se);let dt=s.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(dt=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(dt,Rt.__webglTexture),Pe(dt,se),xe(K.__webglFramebuffer,N,se,s.COLOR_ATTACHMENT0+It,dt,0),v(se)&&_(dt)}e.unbindTexture()}else{let It=s.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(It=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(It,ht.__webglTexture),Pe(It,w),w.mipmaps&&w.mipmaps.length>0)for(let re=0;re<w.mipmaps.length;re++)xe(K.__webglFramebuffer[re],N,w,s.COLOR_ATTACHMENT0,It,re);else xe(K.__webglFramebuffer,N,w,s.COLOR_ATTACHMENT0,It,0);v(w)&&_(It),e.unbindTexture()}N.depthBuffer&&yn(N)}function nn(N){const w=N.textures;for(let K=0,ht=w.length;K<ht;K++){const Et=w[K];if(v(Et)){const tt=I(N),he=n.get(Et).__webglTexture;e.bindTexture(tt,he),_(tt),e.unbindTexture()}}}const ge=[],je=[];function pe(N){if(N.samples>0){if(ee(N)===!1){const w=N.textures,K=N.width,ht=N.height;let Et=s.COLOR_BUFFER_BIT;const tt=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,he=n.get(N),It=w.length>1;if(It)for(let se=0;se<w.length;se++)e.bindFramebuffer(s.FRAMEBUFFER,he.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+se,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,he.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+se,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer);const re=N.texture.mipmaps;re&&re.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,he.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let se=0;se<w.length;se++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(Et|=s.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(Et|=s.STENCIL_BUFFER_BIT)),It){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,he.__webglColorRenderbuffer[se]);const Rt=n.get(w[se]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Rt,0)}s.blitFramebuffer(0,0,K,ht,0,0,K,ht,Et,s.NEAREST),h===!0&&(ge.length=0,je.length=0,ge.push(s.COLOR_ATTACHMENT0+se),N.depthBuffer&&N.resolveDepthBuffer===!1&&(ge.push(tt),je.push(tt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,je)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ge))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),It)for(let se=0;se<w.length;se++){e.bindFramebuffer(s.FRAMEBUFFER,he.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+se,s.RENDERBUFFER,he.__webglColorRenderbuffer[se]);const Rt=n.get(w[se]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,he.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+se,s.TEXTURE_2D,Rt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&h){const w=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function hn(N){return Math.min(i.maxSamples,N.samples)}function ee(N){const w=n.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Ie(N){const w=o.render.frame;p.get(N)!==w&&(p.set(N,w),N.update())}function Cn(N,w){const K=N.colorSpace,ht=N.format,Et=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||K!==qr&&K!==Ns&&($e.getTransfer(K)===rn?(ht!==xi||Et!==qi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),w}function Mn(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(c.width=N.naturalWidth||N.width,c.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(c.width=N.displayWidth,c.height=N.displayHeight):(c.width=N.width,c.height=N.height),c}this.allocateTextureUnit=it,this.resetTextureUnits=Q,this.setTexture2D=xt,this.setTexture2DArray=lt,this.setTexture3D=vt,this.setTextureCube=ot,this.rebindTextures=we,this.setupRenderTarget=H,this.updateRenderTargetMipmap=nn,this.updateMultisampleRenderTarget=pe,this.setupDepthRenderbuffer=yn,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=ee}function ay(s,t){function e(n,i=Ns){let r;const o=$e.getTransfer(i);if(n===qi)return s.UNSIGNED_BYTE;if(n===ph)return s.UNSIGNED_SHORT_4_4_4_4;if(n===mh)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Qu)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===$u)return s.BYTE;if(n===Ju)return s.SHORT;if(n===Io)return s.UNSIGNED_SHORT;if(n===fh)return s.INT;if(n===lr)return s.UNSIGNED_INT;if(n===Pi)return s.FLOAT;if(n===xs)return s.HALF_FLOAT;if(n===tf)return s.ALPHA;if(n===ef)return s.RGB;if(n===xi)return s.RGBA;if(n===Lo)return s.DEPTH_COMPONENT;if(n===Uo)return s.DEPTH_STENCIL;if(n===gh)return s.RED;if(n===_h)return s.RED_INTEGER;if(n===nf)return s.RG;if(n===xh)return s.RG_INTEGER;if(n===vh)return s.RGBA_INTEGER;if(n===Wa||n===Xa||n===Ya||n===qa)if(o===rn)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Wa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===qa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Wa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ya)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===qa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Lc||n===Uc||n===Nc||n===Fc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Lc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Uc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Nc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Fc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Oc||n===Bc||n===zc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Oc||n===Bc)return o===rn?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===zc)return o===rn?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===kc||n===Vc||n===Hc||n===Gc||n===Wc||n===Xc||n===Yc||n===qc||n===jc||n===Kc||n===Zc||n===$c||n===Jc||n===Qc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===kc)return o===rn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Vc)return o===rn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Hc)return o===rn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Gc)return o===rn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Wc)return o===rn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Xc)return o===rn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Yc)return o===rn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===qc)return o===rn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===jc)return o===rn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Kc)return o===rn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Zc)return o===rn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===$c)return o===rn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Jc)return o===rn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Qc)return o===rn?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ja||n===th||n===eh)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ja)return o===rn?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===th)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===eh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===sf||n===nh||n===ih||n===sh)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ja)return r.COMPRESSED_RED_RGTC1_EXT;if(n===nh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ih)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===sh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Do?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Pf extends Yn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}}const ly=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class hy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Pf(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new $n({vertexShader:ly,fragmentShader:cy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new b(new ps(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class dy extends zs{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",h=1,c=null,p=null,m=null,g=null,d=null,y=null;const S=new hy,v={},_=e.getContextAttributes();let I=null,P=null;const A=[],O=[],B=new Dt;let k=null;const V=new li;V.viewport=new tn;const C=new li;C.viewport=new tn;const E=[V,C],z=new _0;let Q=null,it=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ct){let Vt=A[ct];return Vt===void 0&&(Vt=new ic,A[ct]=Vt),Vt.getTargetRaySpace()},this.getControllerGrip=function(ct){let Vt=A[ct];return Vt===void 0&&(Vt=new ic,A[ct]=Vt),Vt.getGripSpace()},this.getHand=function(ct){let Vt=A[ct];return Vt===void 0&&(Vt=new ic,A[ct]=Vt),Vt.getHandSpace()};function rt(ct){const Vt=O.indexOf(ct.inputSource);if(Vt===-1)return;const Ft=A[Vt];Ft!==void 0&&(Ft.update(ct.inputSource,ct.frame,c||o),Ft.dispatchEvent({type:ct.type,data:ct.inputSource}))}function xt(){i.removeEventListener("select",rt),i.removeEventListener("selectstart",rt),i.removeEventListener("selectend",rt),i.removeEventListener("squeeze",rt),i.removeEventListener("squeezestart",rt),i.removeEventListener("squeezeend",rt),i.removeEventListener("end",xt),i.removeEventListener("inputsourceschange",lt);for(let ct=0;ct<A.length;ct++){const Vt=O[ct];Vt!==null&&(O[ct]=null,A[ct].disconnect(Vt))}Q=null,it=null,S.reset();for(const ct in v)delete v[ct];t.setRenderTarget(I),d=null,g=null,m=null,i=null,P=null,en.stop(),n.isPresenting=!1,t.setPixelRatio(k),t.setSize(B.width,B.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ct){r=ct,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ct){a=ct,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ct){c=ct},this.getBaseLayer=function(){return g!==null?g:d},this.getBinding=function(){return m},this.getFrame=function(){return y},this.getSession=function(){return i},this.setSession=async function(ct){if(i=ct,i!==null){if(I=t.getRenderTarget(),i.addEventListener("select",rt),i.addEventListener("selectstart",rt),i.addEventListener("selectend",rt),i.addEventListener("squeeze",rt),i.addEventListener("squeezestart",rt),i.addEventListener("squeezeend",rt),i.addEventListener("end",xt),i.addEventListener("inputsourceschange",lt),_.xrCompatible!==!0&&await e.makeXRCompatible(),k=t.getPixelRatio(),t.getSize(B),typeof XRWebGLBinding<"u"&&(m=new XRWebGLBinding(i,e)),m!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ft=null,xe=null,_e=null;_.depth&&(_e=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Ft=_.stencil?Uo:Lo,xe=_.stencil?Do:lr);const Ee={colorFormat:e.RGBA8,depthFormat:_e,scaleFactor:r};g=m.createProjectionLayer(Ee),i.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),P=new Di(g.textureWidth,g.textureHeight,{format:xi,type:qi,depthTexture:new vf(g.textureWidth,g.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,Ft),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const Ft={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,e,Ft),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),P=new Di(d.framebufferWidth,d.framebufferHeight,{format:xi,type:qi,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}P.isXRRenderTarget=!0,this.setFoveation(h),c=null,o=await i.requestReferenceSpace(a),en.setContext(i),en.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function lt(ct){for(let Vt=0;Vt<ct.removed.length;Vt++){const Ft=ct.removed[Vt],xe=O.indexOf(Ft);xe>=0&&(O[xe]=null,A[xe].disconnect(Ft))}for(let Vt=0;Vt<ct.added.length;Vt++){const Ft=ct.added[Vt];let xe=O.indexOf(Ft);if(xe===-1){for(let Ee=0;Ee<A.length;Ee++)if(Ee>=O.length){O.push(Ft),xe=Ee;break}else if(O[Ee]===null){O[Ee]=Ft,xe=Ee;break}if(xe===-1)break}const _e=A[xe];_e&&_e.connect(Ft)}}const vt=new M,ot=new M;function Ct(ct,Vt,Ft){vt.setFromMatrixPosition(Vt.matrixWorld),ot.setFromMatrixPosition(Ft.matrixWorld);const xe=vt.distanceTo(ot),_e=Vt.projectionMatrix.elements,Ee=Ft.projectionMatrix.elements,yn=_e[14]/(_e[10]-1),we=_e[14]/(_e[10]+1),H=(_e[9]+1)/_e[5],nn=(_e[9]-1)/_e[5],ge=(_e[8]-1)/_e[0],je=(Ee[8]+1)/Ee[0],pe=yn*ge,hn=yn*je,ee=xe/(-ge+je),Ie=ee*-ge;if(Vt.matrixWorld.decompose(ct.position,ct.quaternion,ct.scale),ct.translateX(Ie),ct.translateZ(ee),ct.matrixWorld.compose(ct.position,ct.quaternion,ct.scale),ct.matrixWorldInverse.copy(ct.matrixWorld).invert(),_e[10]===-1)ct.projectionMatrix.copy(Vt.projectionMatrix),ct.projectionMatrixInverse.copy(Vt.projectionMatrixInverse);else{const Cn=yn+ee,Mn=we+ee,N=pe-Ie,w=hn+(xe-Ie),K=H*we/Mn*Cn,ht=nn*we/Mn*Cn;ct.projectionMatrix.makePerspective(N,w,K,ht,Cn,Mn),ct.projectionMatrixInverse.copy(ct.projectionMatrix).invert()}}function Xt(ct,Vt){Vt===null?ct.matrixWorld.copy(ct.matrix):ct.matrixWorld.multiplyMatrices(Vt.matrixWorld,ct.matrix),ct.matrixWorldInverse.copy(ct.matrixWorld).invert()}this.updateCamera=function(ct){if(i===null)return;let Vt=ct.near,Ft=ct.far;S.texture!==null&&(S.depthNear>0&&(Vt=S.depthNear),S.depthFar>0&&(Ft=S.depthFar)),z.near=C.near=V.near=Vt,z.far=C.far=V.far=Ft,(Q!==z.near||it!==z.far)&&(i.updateRenderState({depthNear:z.near,depthFar:z.far}),Q=z.near,it=z.far),z.layers.mask=ct.layers.mask|6,V.layers.mask=z.layers.mask&3,C.layers.mask=z.layers.mask&5;const xe=ct.parent,_e=z.cameras;Xt(z,xe);for(let Ee=0;Ee<_e.length;Ee++)Xt(_e[Ee],xe);_e.length===2?Ct(z,V,C):z.projectionMatrix.copy(V.projectionMatrix),Kt(ct,z,xe)};function Kt(ct,Vt,Ft){Ft===null?ct.matrix.copy(Vt.matrixWorld):(ct.matrix.copy(Ft.matrixWorld),ct.matrix.invert(),ct.matrix.multiply(Vt.matrixWorld)),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale),ct.updateMatrixWorld(!0),ct.projectionMatrix.copy(Vt.projectionMatrix),ct.projectionMatrixInverse.copy(Vt.projectionMatrixInverse),ct.isPerspectiveCamera&&(ct.fov=jr*2*Math.atan(1/ct.projectionMatrix.elements[5]),ct.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(g===null&&d===null))return h},this.setFoveation=function(ct){h=ct,g!==null&&(g.fixedFoveation=ct),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=ct)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(z)},this.getCameraTexture=function(ct){return v[ct]};let Pe=null;function ln(ct,Vt){if(p=Vt.getViewerPose(c||o),y=Vt,p!==null){const Ft=p.views;d!==null&&(t.setRenderTargetFramebuffer(P,d.framebuffer),t.setRenderTarget(P));let xe=!1;Ft.length!==z.cameras.length&&(z.cameras.length=0,xe=!0);for(let we=0;we<Ft.length;we++){const H=Ft[we];let nn=null;if(d!==null)nn=d.getViewport(H);else{const je=m.getViewSubImage(g,H);nn=je.viewport,we===0&&(t.setRenderTargetTextures(P,je.colorTexture,je.depthStencilTexture),t.setRenderTarget(P))}let ge=E[we];ge===void 0&&(ge=new li,ge.layers.enable(we),ge.viewport=new tn,E[we]=ge),ge.matrix.fromArray(H.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(H.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(nn.x,nn.y,nn.width,nn.height),we===0&&(z.matrix.copy(ge.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),xe===!0&&z.cameras.push(ge)}const _e=i.enabledFeatures;if(_e&&_e.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&m){const we=m.getDepthInformation(Ft[0]);we&&we.isValid&&we.texture&&S.init(we,i.renderState)}if(_e&&_e.includes("camera-access")&&(t.state.unbindTexture(),m))for(let we=0;we<Ft.length;we++){const H=Ft[we].camera;if(H){let nn=v[H];nn||(nn=new Pf,v[H]=nn);const ge=m.getCameraImage(H);nn.sourceTexture=ge}}}for(let Ft=0;Ft<A.length;Ft++){const xe=O[Ft],_e=A[Ft];xe!==null&&_e!==void 0&&_e.update(xe,Vt,c||o)}Pe&&Pe(ct,Vt),Vt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Vt}),y=null}const en=new Ef;en.setAnimationLoop(ln),this.setAnimationLoop=function(ct){Pe=ct},this.dispose=function(){}}}const er=new Li,uy=new Ce;function fy(s,t){function e(v,_){v.matrixAutoUpdate===!0&&v.updateMatrix(),_.value.copy(v.matrix)}function n(v,_){_.color.getRGB(v.fogColor.value,uf(s)),_.isFog?(v.fogNear.value=_.near,v.fogFar.value=_.far):_.isFogExp2&&(v.fogDensity.value=_.density)}function i(v,_,I,P,A){_.isMeshBasicMaterial||_.isMeshLambertMaterial?r(v,_):_.isMeshToonMaterial?(r(v,_),m(v,_)):_.isMeshPhongMaterial?(r(v,_),p(v,_)):_.isMeshStandardMaterial?(r(v,_),g(v,_),_.isMeshPhysicalMaterial&&d(v,_,A)):_.isMeshMatcapMaterial?(r(v,_),y(v,_)):_.isMeshDepthMaterial?r(v,_):_.isMeshDistanceMaterial?(r(v,_),S(v,_)):_.isMeshNormalMaterial?r(v,_):_.isLineBasicMaterial?(o(v,_),_.isLineDashedMaterial&&a(v,_)):_.isPointsMaterial?h(v,_,I,P):_.isSpriteMaterial?c(v,_):_.isShadowMaterial?(v.color.value.copy(_.color),v.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function r(v,_){v.opacity.value=_.opacity,_.color&&v.diffuse.value.copy(_.color),_.emissive&&v.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(v.map.value=_.map,e(_.map,v.mapTransform)),_.alphaMap&&(v.alphaMap.value=_.alphaMap,e(_.alphaMap,v.alphaMapTransform)),_.bumpMap&&(v.bumpMap.value=_.bumpMap,e(_.bumpMap,v.bumpMapTransform),v.bumpScale.value=_.bumpScale,_.side===Jn&&(v.bumpScale.value*=-1)),_.normalMap&&(v.normalMap.value=_.normalMap,e(_.normalMap,v.normalMapTransform),v.normalScale.value.copy(_.normalScale),_.side===Jn&&v.normalScale.value.negate()),_.displacementMap&&(v.displacementMap.value=_.displacementMap,e(_.displacementMap,v.displacementMapTransform),v.displacementScale.value=_.displacementScale,v.displacementBias.value=_.displacementBias),_.emissiveMap&&(v.emissiveMap.value=_.emissiveMap,e(_.emissiveMap,v.emissiveMapTransform)),_.specularMap&&(v.specularMap.value=_.specularMap,e(_.specularMap,v.specularMapTransform)),_.alphaTest>0&&(v.alphaTest.value=_.alphaTest);const I=t.get(_),P=I.envMap,A=I.envMapRotation;P&&(v.envMap.value=P,er.copy(A),er.x*=-1,er.y*=-1,er.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(er.y*=-1,er.z*=-1),v.envMapRotation.value.setFromMatrix4(uy.makeRotationFromEuler(er)),v.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,v.reflectivity.value=_.reflectivity,v.ior.value=_.ior,v.refractionRatio.value=_.refractionRatio),_.lightMap&&(v.lightMap.value=_.lightMap,v.lightMapIntensity.value=_.lightMapIntensity,e(_.lightMap,v.lightMapTransform)),_.aoMap&&(v.aoMap.value=_.aoMap,v.aoMapIntensity.value=_.aoMapIntensity,e(_.aoMap,v.aoMapTransform))}function o(v,_){v.diffuse.value.copy(_.color),v.opacity.value=_.opacity,_.map&&(v.map.value=_.map,e(_.map,v.mapTransform))}function a(v,_){v.dashSize.value=_.dashSize,v.totalSize.value=_.dashSize+_.gapSize,v.scale.value=_.scale}function h(v,_,I,P){v.diffuse.value.copy(_.color),v.opacity.value=_.opacity,v.size.value=_.size*I,v.scale.value=P*.5,_.map&&(v.map.value=_.map,e(_.map,v.uvTransform)),_.alphaMap&&(v.alphaMap.value=_.alphaMap,e(_.alphaMap,v.alphaMapTransform)),_.alphaTest>0&&(v.alphaTest.value=_.alphaTest)}function c(v,_){v.diffuse.value.copy(_.color),v.opacity.value=_.opacity,v.rotation.value=_.rotation,_.map&&(v.map.value=_.map,e(_.map,v.mapTransform)),_.alphaMap&&(v.alphaMap.value=_.alphaMap,e(_.alphaMap,v.alphaMapTransform)),_.alphaTest>0&&(v.alphaTest.value=_.alphaTest)}function p(v,_){v.specular.value.copy(_.specular),v.shininess.value=Math.max(_.shininess,1e-4)}function m(v,_){_.gradientMap&&(v.gradientMap.value=_.gradientMap)}function g(v,_){v.metalness.value=_.metalness,_.metalnessMap&&(v.metalnessMap.value=_.metalnessMap,e(_.metalnessMap,v.metalnessMapTransform)),v.roughness.value=_.roughness,_.roughnessMap&&(v.roughnessMap.value=_.roughnessMap,e(_.roughnessMap,v.roughnessMapTransform)),_.envMap&&(v.envMapIntensity.value=_.envMapIntensity)}function d(v,_,I){v.ior.value=_.ior,_.sheen>0&&(v.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),v.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(v.sheenColorMap.value=_.sheenColorMap,e(_.sheenColorMap,v.sheenColorMapTransform)),_.sheenRoughnessMap&&(v.sheenRoughnessMap.value=_.sheenRoughnessMap,e(_.sheenRoughnessMap,v.sheenRoughnessMapTransform))),_.clearcoat>0&&(v.clearcoat.value=_.clearcoat,v.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(v.clearcoatMap.value=_.clearcoatMap,e(_.clearcoatMap,v.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,e(_.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(v.clearcoatNormalMap.value=_.clearcoatNormalMap,e(_.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Jn&&v.clearcoatNormalScale.value.negate())),_.dispersion>0&&(v.dispersion.value=_.dispersion),_.iridescence>0&&(v.iridescence.value=_.iridescence,v.iridescenceIOR.value=_.iridescenceIOR,v.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(v.iridescenceMap.value=_.iridescenceMap,e(_.iridescenceMap,v.iridescenceMapTransform)),_.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=_.iridescenceThicknessMap,e(_.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),_.transmission>0&&(v.transmission.value=_.transmission,v.transmissionSamplerMap.value=I.texture,v.transmissionSamplerSize.value.set(I.width,I.height),_.transmissionMap&&(v.transmissionMap.value=_.transmissionMap,e(_.transmissionMap,v.transmissionMapTransform)),v.thickness.value=_.thickness,_.thicknessMap&&(v.thicknessMap.value=_.thicknessMap,e(_.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=_.attenuationDistance,v.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(v.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(v.anisotropyMap.value=_.anisotropyMap,e(_.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=_.specularIntensity,v.specularColor.value.copy(_.specularColor),_.specularColorMap&&(v.specularColorMap.value=_.specularColorMap,e(_.specularColorMap,v.specularColorMapTransform)),_.specularIntensityMap&&(v.specularIntensityMap.value=_.specularIntensityMap,e(_.specularIntensityMap,v.specularIntensityMapTransform))}function y(v,_){_.matcap&&(v.matcap.value=_.matcap)}function S(v,_){const I=t.get(_).light;v.referencePosition.value.setFromMatrixPosition(I.matrixWorld),v.nearDistance.value=I.shadow.camera.near,v.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function py(s,t,e,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(I,P){const A=P.program;n.uniformBlockBinding(I,A)}function c(I,P){let A=i[I.id];A===void 0&&(y(I),A=p(I),i[I.id]=A,I.addEventListener("dispose",v));const O=P.program;n.updateUBOMapping(I,O);const B=t.render.frame;r[I.id]!==B&&(g(I),r[I.id]=B)}function p(I){const P=m();I.__bindingPointIndex=P;const A=s.createBuffer(),O=I.__size,B=I.usage;return s.bindBuffer(s.UNIFORM_BUFFER,A),s.bufferData(s.UNIFORM_BUFFER,O,B),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,P,A),A}function m(){for(let I=0;I<a;I++)if(o.indexOf(I)===-1)return o.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(I){const P=i[I.id],A=I.uniforms,O=I.__cache;s.bindBuffer(s.UNIFORM_BUFFER,P);for(let B=0,k=A.length;B<k;B++){const V=Array.isArray(A[B])?A[B]:[A[B]];for(let C=0,E=V.length;C<E;C++){const z=V[C];if(d(z,B,C,O)===!0){const Q=z.__offset,it=Array.isArray(z.value)?z.value:[z.value];let rt=0;for(let xt=0;xt<it.length;xt++){const lt=it[xt],vt=S(lt);typeof lt=="number"||typeof lt=="boolean"?(z.__data[0]=lt,s.bufferSubData(s.UNIFORM_BUFFER,Q+rt,z.__data)):lt.isMatrix3?(z.__data[0]=lt.elements[0],z.__data[1]=lt.elements[1],z.__data[2]=lt.elements[2],z.__data[3]=0,z.__data[4]=lt.elements[3],z.__data[5]=lt.elements[4],z.__data[6]=lt.elements[5],z.__data[7]=0,z.__data[8]=lt.elements[6],z.__data[9]=lt.elements[7],z.__data[10]=lt.elements[8],z.__data[11]=0):(lt.toArray(z.__data,rt),rt+=vt.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,Q,z.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(I,P,A,O){const B=I.value,k=P+"_"+A;if(O[k]===void 0)return typeof B=="number"||typeof B=="boolean"?O[k]=B:O[k]=B.clone(),!0;{const V=O[k];if(typeof B=="number"||typeof B=="boolean"){if(V!==B)return O[k]=B,!0}else if(V.equals(B)===!1)return V.copy(B),!0}return!1}function y(I){const P=I.uniforms;let A=0;const O=16;for(let k=0,V=P.length;k<V;k++){const C=Array.isArray(P[k])?P[k]:[P[k]];for(let E=0,z=C.length;E<z;E++){const Q=C[E],it=Array.isArray(Q.value)?Q.value:[Q.value];for(let rt=0,xt=it.length;rt<xt;rt++){const lt=it[rt],vt=S(lt),ot=A%O,Ct=ot%vt.boundary,Xt=ot+Ct;A+=Ct,Xt!==0&&O-Xt<vt.storage&&(A+=O-Xt),Q.__data=new Float32Array(vt.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=A,A+=vt.storage}}}const B=A%O;return B>0&&(A+=O-B),I.__size=A,I.__cache={},this}function S(I){const P={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(P.boundary=4,P.storage=4):I.isVector2?(P.boundary=8,P.storage=8):I.isVector3||I.isColor?(P.boundary=16,P.storage=12):I.isVector4?(P.boundary=16,P.storage=16):I.isMatrix3?(P.boundary=48,P.storage=48):I.isMatrix4?(P.boundary=64,P.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),P}function v(I){const P=I.target;P.removeEventListener("dispose",v);const A=o.indexOf(P.__bindingPointIndex);o.splice(A,1),s.deleteBuffer(i[P.id]),delete i[P.id],delete r[P.id]}function _(){for(const I in i)s.deleteBuffer(i[I]);o=[],i={},r={}}return{bind:h,update:c,dispose:_}}class my{constructor(t={}){const{canvas:e=im(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:c=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:g=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const y=new Uint32Array(4),S=new Int32Array(4);let v=null,_=null;const I=[],P=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Os,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const A=this;let O=!1;this._outputColorSpace=Bn;let B=0,k=0,V=null,C=-1,E=null;const z=new tn,Q=new tn;let it=null;const rt=new be(0);let xt=0,lt=e.width,vt=e.height,ot=1,Ct=null,Xt=null;const Kt=new tn(0,0,lt,vt),Pe=new tn(0,0,lt,vt);let ln=!1;const en=new Th;let ct=!1,Vt=!1;const Ft=new Ce,xe=new M,_e=new tn,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let yn=!1;function we(){return V===null?ot:1}let H=n;function nn(R,q){return e.getContext(R,q)}try{const R={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:h,preserveDrawingBuffer:c,powerPreference:p,failIfMajorPerformanceCaveat:m};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${dh}`),e.addEventListener("webglcontextlost",Lt,!1),e.addEventListener("webglcontextrestored",Zt,!1),e.addEventListener("webglcontextcreationerror",ft,!1),H===null){const q="webgl2";if(H=nn(q,R),H===null)throw nn(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let ge,je,pe,hn,ee,Ie,Cn,Mn,N,w,K,ht,Et,tt,he,It,re,se,Rt,dt,yt,jt,kt,Jt;function X(){ge=new Ex(H),ge.init(),jt=new ay(H,ge),je=new xx(H,ge,t,jt),pe=new ry(H,ge),je.reversedDepthBuffer&&g&&pe.buffers.depth.setReversed(!0),hn=new Cx(H),ee=new Yv,Ie=new oy(H,ge,pe,ee,je,jt,hn),Cn=new yx(A),Mn=new bx(A),N=new U0(H),kt=new gx(H,N),w=new Tx(H,N,hn,kt),K=new Px(H,w,N,hn),Rt=new Rx(H,je,Ie),It=new vx(ee),ht=new Xv(A,Cn,Mn,ge,je,kt,It),Et=new fy(A,ee),tt=new jv,he=new ty(ge),se=new mx(A,Cn,Mn,pe,K,d,h),re=new iy(A,K,je),Jt=new py(H,hn,je,pe),dt=new _x(H,ge,hn),yt=new Ax(H,ge,hn),hn.programs=ht.programs,A.capabilities=je,A.extensions=ge,A.properties=ee,A.renderLists=tt,A.shadowMap=re,A.state=pe,A.info=hn}X();const Tt=new dy(A,H);this.xr=Tt,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const R=ge.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ge.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return ot},this.setPixelRatio=function(R){R!==void 0&&(ot=R,this.setSize(lt,vt,!1))},this.getSize=function(R){return R.set(lt,vt)},this.setSize=function(R,q,J=!0){if(Tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}lt=R,vt=q,e.width=Math.floor(R*ot),e.height=Math.floor(q*ot),J===!0&&(e.style.width=R+"px",e.style.height=q+"px"),this.setViewport(0,0,R,q)},this.getDrawingBufferSize=function(R){return R.set(lt*ot,vt*ot).floor()},this.setDrawingBufferSize=function(R,q,J){lt=R,vt=q,ot=J,e.width=Math.floor(R*J),e.height=Math.floor(q*J),this.setViewport(0,0,R,q)},this.getCurrentViewport=function(R){return R.copy(z)},this.getViewport=function(R){return R.copy(Kt)},this.setViewport=function(R,q,J,nt){R.isVector4?Kt.set(R.x,R.y,R.z,R.w):Kt.set(R,q,J,nt),pe.viewport(z.copy(Kt).multiplyScalar(ot).round())},this.getScissor=function(R){return R.copy(Pe)},this.setScissor=function(R,q,J,nt){R.isVector4?Pe.set(R.x,R.y,R.z,R.w):Pe.set(R,q,J,nt),pe.scissor(Q.copy(Pe).multiplyScalar(ot).round())},this.getScissorTest=function(){return ln},this.setScissorTest=function(R){pe.setScissorTest(ln=R)},this.setOpaqueSort=function(R){Ct=R},this.setTransparentSort=function(R){Xt=R},this.getClearColor=function(R){return R.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor(...arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha(...arguments)},this.clear=function(R=!0,q=!0,J=!0){let nt=0;if(R){let j=!1;if(V!==null){const At=V.texture.format;j=At===vh||At===xh||At===_h}if(j){const At=V.texture.type,Ht=At===qi||At===lr||At===Io||At===Do||At===ph||At===mh,oe=se.getClearColor(),Qt=se.getClearAlpha(),ye=oe.r,ue=oe.g,me=oe.b;Ht?(y[0]=ye,y[1]=ue,y[2]=me,y[3]=Qt,H.clearBufferuiv(H.COLOR,0,y)):(S[0]=ye,S[1]=ue,S[2]=me,S[3]=Qt,H.clearBufferiv(H.COLOR,0,S))}else nt|=H.COLOR_BUFFER_BIT}q&&(nt|=H.DEPTH_BUFFER_BIT),J&&(nt|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Lt,!1),e.removeEventListener("webglcontextrestored",Zt,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),se.dispose(),tt.dispose(),he.dispose(),ee.dispose(),Cn.dispose(),Mn.dispose(),K.dispose(),kt.dispose(),Jt.dispose(),ht.dispose(),Tt.dispose(),Tt.removeEventListener("sessionstart",ii),Tt.removeEventListener("sessionend",ws),si.stop()};function Lt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),O=!0}function Zt(){console.log("THREE.WebGLRenderer: Context Restored."),O=!1;const R=hn.autoReset,q=re.enabled,J=re.autoUpdate,nt=re.needsUpdate,j=re.type;X(),hn.autoReset=R,re.enabled=q,re.autoUpdate=J,re.needsUpdate=nt,re.type=j}function ft(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ut(R){const q=R.target;q.removeEventListener("dispose",ut),Yt(q)}function Yt(R){ve(R),ee.remove(R)}function ve(R){const q=ee.get(R).programs;q!==void 0&&(q.forEach(function(J){ht.releaseProgram(J)}),R.isShaderMaterial&&ht.releaseShaderCache(R))}this.renderBufferDirect=function(R,q,J,nt,j,At){q===null&&(q=Ee);const Ht=j.isMesh&&j.matrixWorld.determinant()<0,oe=Rn(R,q,J,nt,j);pe.setMaterial(nt,Ht);let Qt=J.index,ye=1;if(nt.wireframe===!0){if(Qt=w.getWireframeAttribute(J),Qt===void 0)return;ye=2}const ue=J.drawRange,me=J.attributes.position;let Be=ue.start*ye,qt=(ue.start+ue.count)*ye;At!==null&&(Be=Math.max(Be,At.start*ye),qt=Math.min(qt,(At.start+At.count)*ye)),Qt!==null?(Be=Math.max(Be,0),qt=Math.min(qt,Qt.count)):me!=null&&(Be=Math.max(Be,0),qt=Math.min(qt,me.count));const He=qt-Be;if(He<0||He===1/0)return;kt.setup(j,nt,oe,J,Qt);let Ke,ke=dt;if(Qt!==null&&(Ke=N.get(Qt),ke=yt,ke.setIndex(Ke)),j.isMesh)nt.wireframe===!0?(pe.setLineWidth(nt.wireframeLinewidth*we()),ke.setMode(H.LINES)):ke.setMode(H.TRIANGLES);else if(j.isLine){let te=nt.linewidth;te===void 0&&(te=1),pe.setLineWidth(te*we()),j.isLineSegments?ke.setMode(H.LINES):j.isLineLoop?ke.setMode(H.LINE_LOOP):ke.setMode(H.LINE_STRIP)}else j.isPoints?ke.setMode(H.POINTS):j.isSprite&&ke.setMode(H.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)Hr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ke.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(ge.get("WEBGL_multi_draw"))ke.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const te=j._multiDrawStarts,mn=j._multiDrawCounts,De=j._multiDrawCount,Qn=Qt?N.get(Qt).bytesPerElement:1,Fi=ee.get(nt).currentProgram.getUniforms();for(let Ln=0;Ln<De;Ln++)Fi.setValue(H,"_gl_DrawID",Ln),ke.render(te[Ln]/Qn,mn[Ln])}else if(j.isInstancedMesh)ke.renderInstances(Be,He,j.count);else if(J.isInstancedBufferGeometry){const te=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,mn=Math.min(J.instanceCount,te);ke.renderInstances(Be,He,mn)}else ke.render(Be,He)};function Wt(R,q,J){R.transparent===!0&&R.side===Xn&&R.forceSinglePass===!1?(R.side=Jn,R.needsUpdate=!0,_n(R,q,J),R.side=Bs,R.needsUpdate=!0,_n(R,q,J),R.side=Xn):_n(R,q,J)}this.compile=function(R,q,J=null){J===null&&(J=R),_=he.get(J),_.init(q),P.push(_),J.traverseVisible(function(j){j.isLight&&j.layers.test(q.layers)&&(_.pushLight(j),j.castShadow&&_.pushShadow(j))}),R!==J&&R.traverseVisible(function(j){j.isLight&&j.layers.test(q.layers)&&(_.pushLight(j),j.castShadow&&_.pushShadow(j))}),_.setupLights();const nt=new Set;return R.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const At=j.material;if(At)if(Array.isArray(At))for(let Ht=0;Ht<At.length;Ht++){const oe=At[Ht];Wt(oe,J,j),nt.add(oe)}else Wt(At,J,j),nt.add(At)}),_=P.pop(),nt},this.compileAsync=function(R,q,J=null){const nt=this.compile(R,q,J);return new Promise(j=>{function At(){if(nt.forEach(function(Ht){ee.get(Ht).currentProgram.isReady()&&nt.delete(Ht)}),nt.size===0){j(R);return}setTimeout(At,10)}ge.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let ze=null;function Gn(R){ze&&ze(R)}function ii(){si.stop()}function ws(){si.start()}const si=new Ef;si.setAnimationLoop(Gn),typeof self<"u"&&si.setContext(self),this.setAnimationLoop=function(R){ze=R,Tt.setAnimationLoop(R),R===null?si.stop():si.start()},Tt.addEventListener("sessionstart",ii),Tt.addEventListener("sessionend",ws),this.render=function(R,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),Tt.enabled===!0&&Tt.isPresenting===!0&&(Tt.cameraAutoUpdate===!0&&Tt.updateCamera(q),q=Tt.getCamera()),R.isScene===!0&&R.onBeforeRender(A,R,q,V),_=he.get(R,P.length),_.init(q),P.push(_),Ft.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),en.setFromProjectionMatrix(Ft,Yi,q.reversedDepth),Vt=this.localClippingEnabled,ct=It.init(this.clippingPlanes,Vt),v=tt.get(R,I.length),v.init(),I.push(v),Tt.enabled===!0&&Tt.isPresenting===!0){const At=A.xr.getDepthSensingMesh();At!==null&&cr(At,q,-1/0,A.sortObjects)}cr(R,q,0,A.sortObjects),v.finish(),A.sortObjects===!0&&v.sort(Ct,Xt),yn=Tt.enabled===!1||Tt.isPresenting===!1||Tt.hasDepthSensing()===!1,yn&&se.addToRenderList(v,R),this.info.render.frame++,ct===!0&&It.beginShadows();const J=_.state.shadowsArray;re.render(J,R,q),ct===!0&&It.endShadows(),this.info.autoReset===!0&&this.info.reset();const nt=v.opaque,j=v.transmissive;if(_.setupLights(),q.isArrayCamera){const At=q.cameras;if(j.length>0)for(let Ht=0,oe=At.length;Ht<oe;Ht++){const Qt=At[Ht];Ae(nt,j,R,Qt)}yn&&se.render(R);for(let Ht=0,oe=At.length;Ht<oe;Ht++){const Qt=At[Ht];vi(v,R,Qt,Qt.viewport)}}else j.length>0&&Ae(nt,j,R,q),yn&&se.render(R),vi(v,R,q);V!==null&&k===0&&(Ie.updateMultisampleRenderTarget(V),Ie.updateRenderTargetMipmap(V)),R.isScene===!0&&R.onAfterRender(A,R,q),kt.resetDefaultState(),C=-1,E=null,P.pop(),P.length>0?(_=P[P.length-1],ct===!0&&It.setGlobalState(A.clippingPlanes,_.state.camera)):_=null,I.pop(),I.length>0?v=I[I.length-1]:v=null};function cr(R,q,J,nt){if(R.visible===!1)return;if(R.layers.test(q.layers)){if(R.isGroup)J=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(q);else if(R.isLight)_.pushLight(R),R.castShadow&&_.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||en.intersectsSprite(R)){nt&&_e.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Ft);const Ht=K.update(R),oe=R.material;oe.visible&&v.push(R,Ht,oe,J,_e.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||en.intersectsObject(R))){const Ht=K.update(R),oe=R.material;if(nt&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),_e.copy(R.boundingSphere.center)):(Ht.boundingSphere===null&&Ht.computeBoundingSphere(),_e.copy(Ht.boundingSphere.center)),_e.applyMatrix4(R.matrixWorld).applyMatrix4(Ft)),Array.isArray(oe)){const Qt=Ht.groups;for(let ye=0,ue=Qt.length;ye<ue;ye++){const me=Qt[ye],Be=oe[me.materialIndex];Be&&Be.visible&&v.push(R,Ht,Be,J,_e.z,me)}}else oe.visible&&v.push(R,Ht,oe,J,_e.z,null)}}const At=R.children;for(let Ht=0,oe=At.length;Ht<oe;Ht++)cr(At[Ht],q,J,nt)}function vi(R,q,J,nt){const j=R.opaque,At=R.transmissive,Ht=R.transparent;_.setupLightsView(J),ct===!0&&It.setGlobalState(A.clippingPlanes,J),nt&&pe.viewport(z.copy(nt)),j.length>0&&Ki(j,q,J),At.length>0&&Ki(At,q,J),Ht.length>0&&Ki(Ht,q,J),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function Ae(R,q,J,nt){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[nt.id]===void 0&&(_.state.transmissionRenderTarget[nt.id]=new Di(1,1,{generateMipmaps:!0,type:ge.has("EXT_color_buffer_half_float")||ge.has("EXT_color_buffer_float")?xs:qi,minFilter:ar,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const At=_.state.transmissionRenderTarget[nt.id],Ht=nt.viewport||z;At.setSize(Ht.z*A.transmissionResolutionScale,Ht.w*A.transmissionResolutionScale);const oe=A.getRenderTarget(),Qt=A.getActiveCubeFace(),ye=A.getActiveMipmapLevel();A.setRenderTarget(At),A.getClearColor(rt),xt=A.getClearAlpha(),xt<1&&A.setClearColor(16777215,.5),A.clear(),yn&&se.render(J);const ue=A.toneMapping;A.toneMapping=Os;const me=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),_.setupLightsView(nt),ct===!0&&It.setGlobalState(A.clippingPlanes,nt),Ki(R,J,nt),Ie.updateMultisampleRenderTarget(At),Ie.updateRenderTargetMipmap(At),ge.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let qt=0,He=q.length;qt<He;qt++){const Ke=q[qt],ke=Ke.object,te=Ke.geometry,mn=Ke.material,De=Ke.group;if(mn.side===Xn&&ke.layers.test(nt.layers)){const Qn=mn.side;mn.side=Jn,mn.needsUpdate=!0,no(ke,J,nt,te,mn,De),mn.side=Qn,mn.needsUpdate=!0,Be=!0}}Be===!0&&(Ie.updateMultisampleRenderTarget(At),Ie.updateRenderTargetMipmap(At))}A.setRenderTarget(oe,Qt,ye),A.setClearColor(rt,xt),me!==void 0&&(nt.viewport=me),A.toneMapping=ue}function Ki(R,q,J){const nt=q.isScene===!0?q.overrideMaterial:null;for(let j=0,At=R.length;j<At;j++){const Ht=R[j],oe=Ht.object,Qt=Ht.geometry,ye=Ht.group;let ue=Ht.material;ue.allowOverride===!0&&nt!==null&&(ue=nt),oe.layers.test(J.layers)&&no(oe,q,J,Qt,ue,ye)}}function no(R,q,J,nt,j,At){R.onBeforeRender(A,q,J,nt,j,At),R.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),j.onBeforeRender(A,q,J,nt,R,At),j.transparent===!0&&j.side===Xn&&j.forceSinglePass===!1?(j.side=Jn,j.needsUpdate=!0,A.renderBufferDirect(J,q,nt,j,R,At),j.side=Bs,j.needsUpdate=!0,A.renderBufferDirect(J,q,nt,j,R,At),j.side=Xn):A.renderBufferDirect(J,q,nt,j,R,At),R.onAfterRender(A,q,J,nt,j,At)}function _n(R,q,J){q.isScene!==!0&&(q=Ee);const nt=ee.get(R),j=_.state.lights,At=_.state.shadowsArray,Ht=j.state.version,oe=ht.getParameters(R,j.state,At,q,J),Qt=ht.getProgramCacheKey(oe);let ye=nt.programs;nt.environment=R.isMeshStandardMaterial?q.environment:null,nt.fog=q.fog,nt.envMap=(R.isMeshStandardMaterial?Mn:Cn).get(R.envMap||nt.environment),nt.envMapRotation=nt.environment!==null&&R.envMap===null?q.environmentRotation:R.envMapRotation,ye===void 0&&(R.addEventListener("dispose",ut),ye=new Map,nt.programs=ye);let ue=ye.get(Qt);if(ue!==void 0){if(nt.currentProgram===ue&&nt.lightsStateVersion===Ht)return dn(R,oe),ue}else oe.uniforms=ht.getUniforms(R),R.onBeforeCompile(oe,A),ue=ht.acquireProgram(oe,Qt),ye.set(Qt,ue),nt.uniforms=oe.uniforms;const me=nt.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(me.clippingPlanes=It.uniform),dn(R,oe),nt.needsLights=ko(R),nt.lightsStateVersion=Ht,nt.needsLights&&(me.ambientLightColor.value=j.state.ambient,me.lightProbe.value=j.state.probe,me.directionalLights.value=j.state.directional,me.directionalLightShadows.value=j.state.directionalShadow,me.spotLights.value=j.state.spot,me.spotLightShadows.value=j.state.spotShadow,me.rectAreaLights.value=j.state.rectArea,me.ltc_1.value=j.state.rectAreaLTC1,me.ltc_2.value=j.state.rectAreaLTC2,me.pointLights.value=j.state.point,me.pointLightShadows.value=j.state.pointShadow,me.hemisphereLights.value=j.state.hemi,me.directionalShadowMap.value=j.state.directionalShadowMap,me.directionalShadowMatrix.value=j.state.directionalShadowMatrix,me.spotShadowMap.value=j.state.spotShadowMap,me.spotLightMatrix.value=j.state.spotLightMatrix,me.spotLightMap.value=j.state.spotLightMap,me.pointShadowMap.value=j.state.pointShadowMap,me.pointShadowMatrix.value=j.state.pointShadowMatrix),nt.currentProgram=ue,nt.uniformsList=null,ue}function Ni(R){if(R.uniformsList===null){const q=R.currentProgram.getUniforms();R.uniformsList=Ka.seqWithValue(q.seq,R.uniforms)}return R.uniformsList}function dn(R,q){const J=ee.get(R);J.outputColorSpace=q.outputColorSpace,J.batching=q.batching,J.batchingColor=q.batchingColor,J.instancing=q.instancing,J.instancingColor=q.instancingColor,J.instancingMorph=q.instancingMorph,J.skinning=q.skinning,J.morphTargets=q.morphTargets,J.morphNormals=q.morphNormals,J.morphColors=q.morphColors,J.morphTargetsCount=q.morphTargetsCount,J.numClippingPlanes=q.numClippingPlanes,J.numIntersection=q.numClipIntersection,J.vertexAlphas=q.vertexAlphas,J.vertexTangents=q.vertexTangents,J.toneMapping=q.toneMapping}function Rn(R,q,J,nt,j){q.isScene!==!0&&(q=Ee),Ie.resetTextureUnits();const At=q.fog,Ht=nt.isMeshStandardMaterial?q.environment:null,oe=V===null?A.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:qr,Qt=(nt.isMeshStandardMaterial?Mn:Cn).get(nt.envMap||Ht),ye=nt.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,ue=!!J.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),me=!!J.morphAttributes.position,Be=!!J.morphAttributes.normal,qt=!!J.morphAttributes.color;let He=Os;nt.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(He=A.toneMapping);const Ke=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,ke=Ke!==void 0?Ke.length:0,te=ee.get(nt),mn=_.state.lights;if(ct===!0&&(Vt===!0||R!==E)){const Un=R===E&&nt.id===C;It.setState(nt,R,Un)}let De=!1;nt.version===te.__version?(te.needsLights&&te.lightsStateVersion!==mn.state.version||te.outputColorSpace!==oe||j.isBatchedMesh&&te.batching===!1||!j.isBatchedMesh&&te.batching===!0||j.isBatchedMesh&&te.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&te.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&te.instancing===!1||!j.isInstancedMesh&&te.instancing===!0||j.isSkinnedMesh&&te.skinning===!1||!j.isSkinnedMesh&&te.skinning===!0||j.isInstancedMesh&&te.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&te.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&te.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&te.instancingMorph===!1&&j.morphTexture!==null||te.envMap!==Qt||nt.fog===!0&&te.fog!==At||te.numClippingPlanes!==void 0&&(te.numClippingPlanes!==It.numPlanes||te.numIntersection!==It.numIntersection)||te.vertexAlphas!==ye||te.vertexTangents!==ue||te.morphTargets!==me||te.morphNormals!==Be||te.morphColors!==qt||te.toneMapping!==He||te.morphTargetsCount!==ke)&&(De=!0):(De=!0,te.__version=nt.version);let Qn=te.currentProgram;De===!0&&(Qn=_n(nt,q,j));let Fi=!1,Ln=!1,Oi=!1;const fn=Qn.getUniforms(),In=te.uniforms;if(pe.useProgram(Qn.program)&&(Fi=!0,Ln=!0,Oi=!0),nt.id!==C&&(C=nt.id,Ln=!0),Fi||E!==R){pe.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),fn.setValue(H,"projectionMatrix",R.projectionMatrix),fn.setValue(H,"viewMatrix",R.matrixWorldInverse);const fe=fn.map.cameraPosition;fe!==void 0&&fe.setValue(H,xe.setFromMatrixPosition(R.matrixWorld)),je.logarithmicDepthBuffer&&fn.setValue(H,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&fn.setValue(H,"isOrthographic",R.isOrthographicCamera===!0),E!==R&&(E=R,Ln=!0,Oi=!0)}if(j.isSkinnedMesh){fn.setOptional(H,j,"bindMatrix"),fn.setOptional(H,j,"bindMatrixInverse");const Un=j.skeleton;Un&&(Un.boneTexture===null&&Un.computeBoneTexture(),fn.setValue(H,"boneTexture",Un.boneTexture,Ie))}j.isBatchedMesh&&(fn.setOptional(H,j,"batchingTexture"),fn.setValue(H,"batchingTexture",j._matricesTexture,Ie),fn.setOptional(H,j,"batchingIdTexture"),fn.setValue(H,"batchingIdTexture",j._indirectTexture,Ie),fn.setOptional(H,j,"batchingColorTexture"),j._colorsTexture!==null&&fn.setValue(H,"batchingColorTexture",j._colorsTexture,Ie));const qn=J.morphAttributes;if((qn.position!==void 0||qn.normal!==void 0||qn.color!==void 0)&&Rt.update(j,J,Qn),(Ln||te.receiveShadow!==j.receiveShadow)&&(te.receiveShadow=j.receiveShadow,fn.setValue(H,"receiveShadow",j.receiveShadow)),nt.isMeshGouraudMaterial&&nt.envMap!==null&&(In.envMap.value=Qt,In.flipEnvMap.value=Qt.isCubeTexture&&Qt.isRenderTargetTexture===!1?-1:1),nt.isMeshStandardMaterial&&nt.envMap===null&&q.environment!==null&&(In.envMapIntensity.value=q.environmentIntensity),Ln&&(fn.setValue(H,"toneMappingExposure",A.toneMappingExposure),te.needsLights&&Zi(In,Oi),At&&nt.fog===!0&&Et.refreshFogUniforms(In,At),Et.refreshMaterialUniforms(In,nt,ot,vt,_.state.transmissionRenderTarget[R.id]),Ka.upload(H,Ni(te),In,Ie)),nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(Ka.upload(H,Ni(te),In,Ie),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&fn.setValue(H,"center",j.center),fn.setValue(H,"modelViewMatrix",j.modelViewMatrix),fn.setValue(H,"normalMatrix",j.normalMatrix),fn.setValue(H,"modelMatrix",j.matrixWorld),nt.isShaderMaterial||nt.isRawShaderMaterial){const Un=nt.uniformsGroups;for(let fe=0,Nn=Un.length;fe<Nn;fe++){const yi=Un[fe];Jt.update(yi,Qn),Jt.bind(yi,Qn)}}return Qn}function Zi(R,q){R.ambientLightColor.needsUpdate=q,R.lightProbe.needsUpdate=q,R.directionalLights.needsUpdate=q,R.directionalLightShadows.needsUpdate=q,R.pointLights.needsUpdate=q,R.pointLightShadows.needsUpdate=q,R.spotLights.needsUpdate=q,R.spotLightShadows.needsUpdate=q,R.rectAreaLights.needsUpdate=q,R.hemisphereLights.needsUpdate=q}function ko(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(R,q,J){const nt=ee.get(R);nt.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,nt.__autoAllocateDepthBuffer===!1&&(nt.__useRenderToTexture=!1),ee.get(R.texture).__webglTexture=q,ee.get(R.depthTexture).__webglTexture=nt.__autoAllocateDepthBuffer?void 0:J,nt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,q){const J=ee.get(R);J.__webglFramebuffer=q,J.__useDefaultFramebuffer=q===void 0};const Vo=H.createFramebuffer();this.setRenderTarget=function(R,q=0,J=0){V=R,B=q,k=J;let nt=!0,j=null,At=!1,Ht=!1;if(R){const Qt=ee.get(R);if(Qt.__useDefaultFramebuffer!==void 0)pe.bindFramebuffer(H.FRAMEBUFFER,null),nt=!1;else if(Qt.__webglFramebuffer===void 0)Ie.setupRenderTarget(R);else if(Qt.__hasExternalTextures)Ie.rebindTextures(R,ee.get(R.texture).__webglTexture,ee.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const me=R.depthTexture;if(Qt.__boundDepthTexture!==me){if(me!==null&&ee.has(me)&&(R.width!==me.image.width||R.height!==me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ie.setupDepthRenderbuffer(R)}}const ye=R.texture;(ye.isData3DTexture||ye.isDataArrayTexture||ye.isCompressedArrayTexture)&&(Ht=!0);const ue=ee.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ue[q])?j=ue[q][J]:j=ue[q],At=!0):R.samples>0&&Ie.useMultisampledRTT(R)===!1?j=ee.get(R).__webglMultisampledFramebuffer:Array.isArray(ue)?j=ue[J]:j=ue,z.copy(R.viewport),Q.copy(R.scissor),it=R.scissorTest}else z.copy(Kt).multiplyScalar(ot).floor(),Q.copy(Pe).multiplyScalar(ot).floor(),it=ln;if(J!==0&&(j=Vo),pe.bindFramebuffer(H.FRAMEBUFFER,j)&&nt&&pe.drawBuffers(R,j),pe.viewport(z),pe.scissor(Q),pe.setScissorTest(it),At){const Qt=ee.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+q,Qt.__webglTexture,J)}else if(Ht){const Qt=q;for(let ye=0;ye<R.textures.length;ye++){const ue=ee.get(R.textures[ye]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+ye,ue.__webglTexture,J,Qt)}}else if(R!==null&&J!==0){const Qt=ee.get(R.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Qt.__webglTexture,J)}C=-1},this.readRenderTargetPixels=function(R,q,J,nt,j,At,Ht,oe=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Qt=ee.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ht!==void 0&&(Qt=Qt[Ht]),Qt){pe.bindFramebuffer(H.FRAMEBUFFER,Qt);try{const ye=R.textures[oe],ue=ye.format,me=ye.type;if(!je.textureFormatReadable(ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!je.textureTypeReadable(me)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=R.width-nt&&J>=0&&J<=R.height-j&&(R.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+oe),H.readPixels(q,J,nt,j,jt.convert(ue),jt.convert(me),At))}finally{const ye=V!==null?ee.get(V).__webglFramebuffer:null;pe.bindFramebuffer(H.FRAMEBUFFER,ye)}}},this.readRenderTargetPixelsAsync=async function(R,q,J,nt,j,At,Ht,oe=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Qt=ee.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ht!==void 0&&(Qt=Qt[Ht]),Qt)if(q>=0&&q<=R.width-nt&&J>=0&&J<=R.height-j){pe.bindFramebuffer(H.FRAMEBUFFER,Qt);const ye=R.textures[oe],ue=ye.format,me=ye.type;if(!je.textureFormatReadable(ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!je.textureTypeReadable(me))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Be=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,Be),H.bufferData(H.PIXEL_PACK_BUFFER,At.byteLength,H.STREAM_READ),R.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+oe),H.readPixels(q,J,nt,j,jt.convert(ue),jt.convert(me),0);const qt=V!==null?ee.get(V).__webglFramebuffer:null;pe.bindFramebuffer(H.FRAMEBUFFER,qt);const He=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await sm(H,He,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,Be),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,At),H.deleteBuffer(Be),H.deleteSync(He),At}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,q=null,J=0){const nt=Math.pow(2,-J),j=Math.floor(R.image.width*nt),At=Math.floor(R.image.height*nt),Ht=q!==null?q.x:0,oe=q!==null?q.y:0;Ie.setTexture2D(R,0),H.copyTexSubImage2D(H.TEXTURE_2D,J,0,0,Ht,oe,j,At),pe.unbindTexture()};const fl=H.createFramebuffer(),pl=H.createFramebuffer();this.copyTextureToTexture=function(R,q,J=null,nt=null,j=0,At=null){At===null&&(j!==0?(Hr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),At=j,j=0):At=0);let Ht,oe,Qt,ye,ue,me,Be,qt,He;const Ke=R.isCompressedTexture?R.mipmaps[At]:R.image;if(J!==null)Ht=J.max.x-J.min.x,oe=J.max.y-J.min.y,Qt=J.isBox3?J.max.z-J.min.z:1,ye=J.min.x,ue=J.min.y,me=J.isBox3?J.min.z:0;else{const qn=Math.pow(2,-j);Ht=Math.floor(Ke.width*qn),oe=Math.floor(Ke.height*qn),R.isDataArrayTexture?Qt=Ke.depth:R.isData3DTexture?Qt=Math.floor(Ke.depth*qn):Qt=1,ye=0,ue=0,me=0}nt!==null?(Be=nt.x,qt=nt.y,He=nt.z):(Be=0,qt=0,He=0);const ke=jt.convert(q.format),te=jt.convert(q.type);let mn;q.isData3DTexture?(Ie.setTexture3D(q,0),mn=H.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(Ie.setTexture2DArray(q,0),mn=H.TEXTURE_2D_ARRAY):(Ie.setTexture2D(q,0),mn=H.TEXTURE_2D),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,q.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,q.unpackAlignment);const De=H.getParameter(H.UNPACK_ROW_LENGTH),Qn=H.getParameter(H.UNPACK_IMAGE_HEIGHT),Fi=H.getParameter(H.UNPACK_SKIP_PIXELS),Ln=H.getParameter(H.UNPACK_SKIP_ROWS),Oi=H.getParameter(H.UNPACK_SKIP_IMAGES);H.pixelStorei(H.UNPACK_ROW_LENGTH,Ke.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Ke.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,ye),H.pixelStorei(H.UNPACK_SKIP_ROWS,ue),H.pixelStorei(H.UNPACK_SKIP_IMAGES,me);const fn=R.isDataArrayTexture||R.isData3DTexture,In=q.isDataArrayTexture||q.isData3DTexture;if(R.isDepthTexture){const qn=ee.get(R),Un=ee.get(q),fe=ee.get(qn.__renderTarget),Nn=ee.get(Un.__renderTarget);pe.bindFramebuffer(H.READ_FRAMEBUFFER,fe.__webglFramebuffer),pe.bindFramebuffer(H.DRAW_FRAMEBUFFER,Nn.__webglFramebuffer);for(let yi=0;yi<Qt;yi++)fn&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,ee.get(R).__webglTexture,j,me+yi),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,ee.get(q).__webglTexture,At,He+yi)),H.blitFramebuffer(ye,ue,Ht,oe,Be,qt,Ht,oe,H.DEPTH_BUFFER_BIT,H.NEAREST);pe.bindFramebuffer(H.READ_FRAMEBUFFER,null),pe.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(j!==0||R.isRenderTargetTexture||ee.has(R)){const qn=ee.get(R),Un=ee.get(q);pe.bindFramebuffer(H.READ_FRAMEBUFFER,fl),pe.bindFramebuffer(H.DRAW_FRAMEBUFFER,pl);for(let fe=0;fe<Qt;fe++)fn?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,qn.__webglTexture,j,me+fe):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,qn.__webglTexture,j),In?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Un.__webglTexture,At,He+fe):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Un.__webglTexture,At),j!==0?H.blitFramebuffer(ye,ue,Ht,oe,Be,qt,Ht,oe,H.COLOR_BUFFER_BIT,H.NEAREST):In?H.copyTexSubImage3D(mn,At,Be,qt,He+fe,ye,ue,Ht,oe):H.copyTexSubImage2D(mn,At,Be,qt,ye,ue,Ht,oe);pe.bindFramebuffer(H.READ_FRAMEBUFFER,null),pe.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else In?R.isDataTexture||R.isData3DTexture?H.texSubImage3D(mn,At,Be,qt,He,Ht,oe,Qt,ke,te,Ke.data):q.isCompressedArrayTexture?H.compressedTexSubImage3D(mn,At,Be,qt,He,Ht,oe,Qt,ke,Ke.data):H.texSubImage3D(mn,At,Be,qt,He,Ht,oe,Qt,ke,te,Ke):R.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,At,Be,qt,Ht,oe,ke,te,Ke.data):R.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,At,Be,qt,Ke.width,Ke.height,ke,Ke.data):H.texSubImage2D(H.TEXTURE_2D,At,Be,qt,Ht,oe,ke,te,Ke);H.pixelStorei(H.UNPACK_ROW_LENGTH,De),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Qn),H.pixelStorei(H.UNPACK_SKIP_PIXELS,Fi),H.pixelStorei(H.UNPACK_SKIP_ROWS,Ln),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Oi),At===0&&q.generateMipmaps&&H.generateMipmap(mn),pe.unbindTexture()},this.copyTextureToTexture3D=function(R,q,J=null,nt=null,j=0){return Hr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,q,J,nt,j)},this.initRenderTarget=function(R){ee.get(R).__webglFramebuffer===void 0&&Ie.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Ie.setTextureCube(R,0):R.isData3DTexture?Ie.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Ie.setTexture2DArray(R,0):Ie.setTexture2D(R,0),pe.unbindTexture()},this.resetState=function(){B=0,k=0,V=null,pe.reset(),kt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(t),e.unpackColorSpace=$e._getUnpackColorSpace()}}const zu={type:"change"},Nh={type:"start"},If={type:"end"},Ha=new $r,ku=new fs,gy=Math.cos(70*nm.DEG2RAD),Fn=new M,oi=2*Math.PI,cn={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Mc=1e-6;class _y extends D0{constructor(t,e=null){super(t,e),this.state=cn.NONE,this.target=new M,this.cursor=new M,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:gs.ROTATE,MIDDLE:gs.DOLLY,RIGHT:gs.PAN},this.touches={ONE:Fs.ROTATE,TWO:Fs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new M,this._lastQuaternion=new ci,this._lastTargetPosition=new M,this._quat=new ci().setFromUnitVectors(t.up,new M(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new pu,this._sphericalDelta=new pu,this._scale=1,this._panOffset=new M,this._rotateStart=new Dt,this._rotateEnd=new Dt,this._rotateDelta=new Dt,this._panStart=new Dt,this._panEnd=new Dt,this._panDelta=new Dt,this._dollyStart=new Dt,this._dollyEnd=new Dt,this._dollyDelta=new Dt,this._dollyDirection=new M,this._mouse=new Dt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=vy.bind(this),this._onPointerDown=xy.bind(this),this._onPointerUp=yy.bind(this),this._onContextMenu=Ay.bind(this),this._onMouseWheel=Sy.bind(this),this._onKeyDown=by.bind(this),this._onTouchStart=Ey.bind(this),this._onTouchMove=Ty.bind(this),this._onMouseDown=My.bind(this),this._onMouseMove=wy.bind(this),this._interceptControlDown=Cy.bind(this),this._interceptControlUp=Ry.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(zu),this.update(),this.state=cn.NONE}update(t=null){const e=this.object.position;Fn.copy(e).sub(this.target),Fn.applyQuaternion(this._quat),this._spherical.setFromVector3(Fn),this.autoRotate&&this.state===cn.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=oi:n>Math.PI&&(n-=oi),i<-Math.PI?i+=oi:i>Math.PI&&(i-=oi),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Fn.setFromSpherical(this._spherical),Fn.applyQuaternion(this._quatInverse),e.copy(this.target).add(Fn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Fn.length();o=this._clampDistance(a*this._scale);const h=a-o;this.object.position.addScaledVector(this._dollyDirection,h),this.object.updateMatrixWorld(),r=!!h}else if(this.object.isOrthographicCamera){const a=new M(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=h!==this.object.zoom;const c=new M(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Fn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ha.origin.copy(this.object.position),Ha.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ha.direction))<gy?this.object.lookAt(this.target):(ku.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ha.intersectPlane(ku,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Mc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Mc||this._lastTargetPosition.distanceToSquared(this.target)>Mc?(this.dispatchEvent(zu),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?oi/60*this.autoRotateSpeed*t:oi/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Fn.setFromMatrixColumn(e,0),Fn.multiplyScalar(-t),this._panOffset.add(Fn)}_panUp(t,e){this.screenSpacePanning===!0?Fn.setFromMatrixColumn(e,1):(Fn.setFromMatrixColumn(e,0),Fn.crossVectors(this.object.up,Fn)),Fn.multiplyScalar(t),this._panOffset.add(Fn)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;Fn.copy(i).sub(this.target);let r=Fn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=i/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(oi*this._rotateDelta.x/e.clientHeight),this._rotateUp(oi*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(oi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-oi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(oi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-oi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panStart.set(n,i)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),i=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(oi*this._rotateDelta.x/e.clientHeight),this._rotateUp(oi*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),i=.5*(t.pageY+e.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Dt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function xy(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function vy(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function yy(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(If),this.state=cn.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function My(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case gs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=cn.DOLLY;break;case gs.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=cn.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=cn.ROTATE}break;case gs.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=cn.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=cn.PAN}break;default:this.state=cn.NONE}this.state!==cn.NONE&&this.dispatchEvent(Nh)}function wy(s){switch(this.state){case cn.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case cn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case cn.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function Sy(s){this.enabled===!1||this.enableZoom===!1||this.state!==cn.NONE||(s.preventDefault(),this.dispatchEvent(Nh),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(If))}function by(s){this.enabled!==!1&&this._handleKeyDown(s)}function Ey(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Fs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=cn.TOUCH_ROTATE;break;case Fs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=cn.TOUCH_PAN;break;default:this.state=cn.NONE}break;case 2:switch(this.touches.TWO){case Fs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=cn.TOUCH_DOLLY_PAN;break;case Fs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=cn.TOUCH_DOLLY_ROTATE;break;default:this.state=cn.NONE}break;default:this.state=cn.NONE}this.state!==cn.NONE&&this.dispatchEvent(Nh)}function Ty(s){switch(this._trackPointer(s),this.state){case cn.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case cn.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case cn.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case cn.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=cn.NONE}}function Ay(s){this.enabled!==!1&&s.preventDefault()}function Cy(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ry(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Za={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class eo{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Py=new Ih(-1,1,1,-1,0,1);class Iy extends vn{constructor(){super(),this.setAttribute("position",new We([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new We([0,2,0,0,2,0],2))}}const Dy=new Iy;class Fh{constructor(t){this._mesh=new b(Dy,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Py)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Ly extends eo{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof $n?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Fo.clone(t.uniforms),this.material=new $n({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Fh(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Vu extends eo{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class Uy extends eo{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Ny{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new Dt);this._width=n.width,this._height=n.height,e=new Di(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:xs}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ly(Za),this.copyPass.material.blending=_s,this.clock=new bf}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),h.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Vu!==void 0&&(o instanceof Vu?n=!0:o instanceof Uy&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Dt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Fy extends eo{constructor(t,e,n=null,i=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new be}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=i}}const Oy={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new be(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Zr extends eo{constructor(t,e=1,n,i){super(),this.strength=e,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new Dt(t.x,t.y):new Dt(256,256),this.clearColor=new be(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Di(r,o,{type:xs}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let p=0;p<this.nMips;p++){const m=new Di(r,o,{type:xs});m.texture.name="UnrealBloomPass.h"+p,m.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(m);const g=new Di(r,o,{type:xs});g.texture.name="UnrealBloomPass.v"+p,g.texture.generateMipmaps=!1,this.renderTargetsVertical.push(g),r=Math.round(r/2),o=Math.round(o/2)}const a=Oy;this.highPassUniforms=Fo.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new $n({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const h=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let p=0;p<this.nMips;p++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(h[p])),this.separableBlurMaterials[p].uniforms.invSize.value=new Dt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new M(1,1,1),new M(1,1,1),new M(1,1,1),new M(1,1,1),new M(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Fo.clone(Za.uniforms),this.blendMaterial=new $n({uniforms:this.copyUniforms,vertexShader:Za.vertexShader,fragmentShader:Za.fragmentShader,blending:On,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new be,this._oldClearAlpha=1,this._basic=new gn,this._fsQuad=new Fh(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new Dt(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let h=0;h<this.nMips;h++)this._fsQuad.material=this.separableBlurMaterials[h],this.separableBlurMaterials[h].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[h].uniforms.direction.value=Zr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[h]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[h].uniforms.colorTexture.value=this.renderTargetsHorizontal[h].texture,this.separableBlurMaterials[h].uniforms.direction.value=Zr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[h]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[h];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new $n({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Dt(.5,.5)},direction:{value:new Dt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(t){return new $n({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Zr.BlurDirectionX=new Dt(1,0);Zr.BlurDirectionY=new Dt(0,1);const Ga={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class By extends eo{constructor(){super(),this.uniforms=Fo.clone(Ga.uniforms),this.material=new Qm({name:Ga.name,uniforms:this.uniforms,vertexShader:Ga.vertexShader,fragmentShader:Ga.fragmentShader}),this._fsQuad=new Fh(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},$e.getTransfer(this._outputColorSpace)===rn&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Wu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Xu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Yu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===uh?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ju?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ku?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===qu&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}try{let m=function(){const u=document.createElement("canvas");u.width=1024,u.height=512;const l=u.getContext("2d"),f=l.createLinearGradient(0,0,0,512);f.addColorStop(0,"#04060d"),f.addColorStop(.42,"#0d1420"),f.addColorStop(.55,"#332016"),f.addColorStop(.62,"#6e4126"),f.addColorStop(.72,"#3c2415"),f.addColorStop(1,"#1c100a"),l.fillStyle=f,l.fillRect(0,0,1024,512);const x=l.createRadialGradient(612,206,4,612,206,95);x.addColorStop(0,"rgba(255,236,214,1)"),x.addColorStop(.25,"rgba(255,214,170,.55)"),x.addColorStop(1,"rgba(255,200,150,0)"),l.fillStyle=x,l.beginPath(),l.arc(612,206,95,0,7),l.fill();const T=new ri(u);return T.mapping=$a,T.colorSpace=Bn,T},g=function(u){return function(){u|=0,u=u+1831565813|0;let l=Math.imul(u^u>>>15,1|u);return l=l+Math.imul(l^l>>>7,61|l)^l,((l^l>>>14)>>>0)/4294967296}},B=function(u,l,f){const x=(u+l+f)*A,T=Math.floor(u+x),L=Math.floor(l+x),U=Math.floor(f+x),W=(T+L+U)*O,D=u-(T-W),F=l-(L-W),G=f-(U-W);let Z,Y,st,gt,bt,Ut;D>=F?F>=G?(Z=1,Y=0,st=0,gt=1,bt=1,Ut=0):D>=G?(Z=1,Y=0,st=0,gt=1,bt=0,Ut=1):(Z=0,Y=0,st=1,gt=1,bt=0,Ut=1):F<G?(Z=0,Y=0,st=1,gt=0,bt=1,Ut=1):D<G?(Z=0,Y=1,st=0,gt=0,bt=1,Ut=1):(Z=0,Y=1,st=0,gt=1,bt=1,Ut=0);const ne=D-Z+O,Le=F-Y+O,Re=G-st+O,Me=D-gt+2*O,ae=F-bt+2*O,Pt=G-Ut+2*O,at=D-1+3*O,_t=F-1+3*O,et=G-1+3*O,$=T&255,mt=L&255,Ot=U&255;let ce=0,Se=.6-D*D-F*F-G*G;if(Se>0){const Ze=v[P[$+I[mt+I[Ot]]]];Se*=Se,ce+=Se*Se*(Ze[0]*D+Ze[1]*F+Ze[2]*G)}let Ye=.6-ne*ne-Le*Le-Re*Re;if(Ye>0){const Ze=v[P[$+Z+I[mt+Y+I[Ot+st]]]];Ye*=Ye,ce+=Ye*Ye*(Ze[0]*ne+Ze[1]*Le+Ze[2]*Re)}let xn=.6-Me*Me-ae*ae-Pt*Pt;if(xn>0){const Ze=v[P[$+gt+I[mt+bt+I[Ot+Ut]]]];xn*=xn,ce+=xn*xn*(Ze[0]*Me+Ze[1]*ae+Ze[2]*Pt)}let Je=.6-at*at-_t*_t-et*et;if(Je>0){const Ze=v[P[$+1+I[mt+1+I[Ot+1]]]];Je*=Je,ce+=Je*Je*(Ze[0]*at+Ze[1]*_t+Ze[2]*et)}return 32*ce},k=function(u,l,f,x){let T=0,L=.5,U=1;for(let W=0;W<x;W++)T+=L*B(u*U,l*U,f*U),L*=.5,U*=2.03;return T},C=function(u,l){const f=u*V,x=l*V;return new M(Math.cos(f)*Math.cos(x),Math.sin(f),Math.cos(f)*Math.sin(x))},vt=function(u){const l=Math.asin(y(u.y,-1,1))/V,f=Math.atan2(u.z,u.x)/V;let x=k(u.x*2.3,u.y*2.3,u.z*2.3,4)*1.7+k(u.x*6.5+13.7,u.y*6.5+13.7,u.z*6.5+13.7,3)*.55+k(u.x*14+47.3,u.y*14+47.3,u.z*14+47.3,2)*.28;const T=S(6,16,Math.abs(l))*(1-S(52,62,Math.abs(l)));x+=.07*Math.sin(u.dot(lt)*170+k(u.x*4+9,u.y*4+9,u.z*4+9,2)*7)*T;for(let F=0;F<z.length;F++){const G=z[F],Z=u.x*G.x+u.y*G.y+u.z*G.z;if(Z<G.cosR)continue;const Y=Math.acos(y(Z,-1,1))/G.rRad,st=(Y-1)*3.2;if(x+=Math.exp(-st*st)*G.rim,Y<1&&(x-=(1-Y*Y)*G.depth,x+=.06*Math.sin(Y*22)*Math.max(0,1-Y)*G.depth,G.peak)){const gt=Y*3.4;x+=Math.exp(-gt*gt)*G.peak}}if(f>-110&&f<-10){const F=(f+110)/100,G=-13+5*Math.sin(F*Math.PI*2.2),Z=(l-G)/5.5;if(Math.abs(Z)<1){const Y=S(0,.1,F)*S(1,.9,F),st=Math.pow(Math.cos(Z*Math.PI/2),2);x-=3.1*st*Y,x+=.4*k(u.x*24,u.y*24,u.z*24,2)*st*Y,x+=.12*Math.sin(Z*9)*st*Y}}const L=Math.acos(y(u.dot(it),-1,1))/V;L<14&&(x+=3.3*Math.exp(-Math.pow(L/6.8,2))),L<2.2&&(x-=1.1*(1-Math.pow(L/2.2,2)));const U=Math.acos(y(u.dot(rt),-1,1))/V;x+=1.3*Math.exp(-Math.pow(U/26,2));const W=Math.acos(y(u.dot(xt),-1,1))/V;x-=2.4*Math.exp(-Math.pow(W/16,2));const D=S(64,80,Math.abs(l));return x*=1-.85*D,x+=.7*D,x},ot=function(u,l,f){const x=k(u.x*3+31,u.y*3+31,u.z*3+31,3)*.5+.5,T=B(u.x*9+57,u.y*9+57,u.z*9+57)*.5+.5,L=B(u.x*16+91,u.y*16+91,u.z*16+91)*.5+.5,U=B(u.x*5+7,u.y*5+7,u.z*5+7)*.5+.5;let W=.62+(.72-.62)*x,D=.28+(.36-.28)*x,F=.19+(.24-.19)*x;if(T>.58){const Y=Math.min(1,(T-.58)*2.4);W+=(.36-W)*Y,D+=(.16-D)*Y,F+=(.12-F)*Y}if(L>.68){const Y=Math.min(1,(L-.68)*3.2);W+=(.29-W)*Y,D+=(.25-D)*Y,F+=(.22-F)*Y}if(U>.64){const Y=Math.min(1,(U-.64)*2.8);W+=(.85-W)*Y,D+=(.66-D)*Y,F+=(.49-F)*Y}const G=.72+.5*S(-2.2,3.2,l);W*=G,D*=G,F*=G,l<-.9&&(W*=.8,D*=.8,F*=.8);const Z=S(66,78,Math.abs(f));return W+=(.91-W)*Z*.5,D+=(.88-D)*Z*.5,F+=(.84-F)*Z*.5,[y(W,0,1),y(D,0,1),y(F,0,1)]},en=function(){const f=document.createElement("canvas");f.width=512,f.height=256;const x=f.getContext("2d"),T=x.createImageData(512,256);for(let L=0;L<256;L++)for(let U=0;U<512;U++){const W=(.5-L/256)*180,D=Math.sin(U*.09)*Math.sin(L*.13)+Math.sin(U*.023+L*.05)*1.6,F=S(73,80,Math.abs(W)+D*2.2)*255,G=(L*512+U)*4;T.data[G]=255,T.data[G+1]=255,T.data[G+2]=255,T.data[G+3]=F}return x.putImageData(T,0,0),new ri(f)},xe=function(){const f=document.createElement("canvas");f.width=1024,f.height=512;const x=f.getContext("2d");for(let T=0;T<70;T++){const L=d()*1024,U=512*.2+d()*512*.6,W=40+d()*160,D=3+d()*9,F=(d()-.5)*.6;x.save(),x.translate(L,U),x.rotate(F);const G=x.createLinearGradient(-W/2,0,W/2,0);G.addColorStop(0,"rgba(255,255,255,0)"),G.addColorStop(.5,`rgba(255,255,255,${.05+d()*.09})`),G.addColorStop(1,"rgba(255,255,255,0)"),x.fillStyle=G,x.beginPath(),x.ellipse(0,0,W/2,D,0,0,7),x.fill(),x.restore()}return new ri(f)},H=function(){const f=document.createElement("canvas");f.width=1024,f.height=512;const x=f.getContext("2d"),T=x.createLinearGradient(0,0,0,512);T.addColorStop(0,"#bfe6fa"),T.addColorStop(.5,"#6fb6e6"),T.addColorStop(1,"#8ccdf0"),x.fillStyle=T,x.fillRect(0,0,1024,512);for(let L=0;L<120;L++){const U=d()*1024,W=d()*512,D=10+d()*50,F=x.createRadialGradient(U,W,0,U,W,D),G=d()>.5;F.addColorStop(0,G?"rgba(40,100,155,.3)":"rgba(235,250,255,.35)"),F.addColorStop(1,"rgba(0,0,0,0)"),x.fillStyle=F,x.beginPath(),x.arc(U,W,D,0,7),x.fill()}for(let L=0;L<2;L++){x.strokeStyle=L===0?"rgba(14,58,96,.62)":"rgba(230,250,255,.4)";const U=L===0?110:46;for(let W=0;W<U;W++){let D=d()*1024,F=d()*512,G=d()*Math.PI*2;x.lineWidth=L===0?.6+d()*1.8:.4+d()*.8,x.beginPath(),x.moveTo(D,F);const Z=8+(d()*14|0);for(let Y=0;Y<Z;Y++)G+=(d()-.5)*1.1,D+=Math.cos(G)*(6+d()*14),F+=Math.sin(G)*(6+d()*14),x.lineTo(D,F),d()>.75&&x.moveTo(D,F);x.stroke()}}return new ri(f)},nn=function(u){const x=document.createElement("canvas");x.width=512,x.height=256;const T=x.getContext("2d");T.fillStyle="#000",T.fillRect(0,0,512,256);for(let L=0;L<260;L++){const U=d()*512,W=d()*256,D=6+d()*26,F=T.createRadialGradient(U,W,0,U,W,D);F.addColorStop(0,`rgba(255,255,255,${u})`),F.addColorStop(1,"rgba(255,255,255,0)"),T.fillStyle=F,T.beginPath(),T.arc(U,W,D,0,7),T.fill()}return new ri(x)},Mn=function(){const u=document.createElement("canvas");u.width=u.height=128;const l=u.getContext("2d"),f=l.createRadialGradient(64,64,0,64,64,64);return f.addColorStop(0,"rgba(255,255,255,1)"),f.addColorStop(.35,"rgba(255,255,255,.45)"),f.addColorStop(1,"rgba(255,255,255,0)"),l.fillStyle=f,l.fillRect(0,0,128,128),new ri(u)},w=function(u,l,f,x){const T=new Ca(new Eo({map:N,color:f,transparent:!0,blending:On,depthWrite:!1}));return T.position.copy(l),T.scale.set(x,x,1),T.userData.base=x,u.add(T),T},K=function(u,l=9){const f=document.createElement("canvas");f.width=512,f.height=112;const x=f.getContext("2d");x.fillStyle="rgba(6,16,26,.62)",x.beginPath(),x.roundRect(6,14,500,84,26),x.fill(),x.strokeStyle="rgba(110,231,255,.65)",x.lineWidth=3,x.stroke(),x.font='500 40px "PingFang SC","Microsoft YaHei",sans-serif',x.fillStyle="#d8f3ff",x.textAlign="center",x.textBaseline="middle",x.fillText(u,256,58);const T=new Ca(new Eo({map:new ri(f),transparent:!0,depthWrite:!1}));return T.scale.set(l,l*112/512,1),T},ht=function(u,l,f){const x=document.createElement("canvas");x.width=x.height=256;const T=x.getContext("2d");T.fillStyle=`rgb(${u},${u},${u})`,T.fillRect(0,0,256,256);const L=f?700:5200;for(let W=0;W<L;W++){const D=Math.max(0,Math.min(255,u+(Math.random()*2-1)*l))|0;T.fillStyle=`rgba(${D},${D},${D},${f?.3:.16})`,f?T.fillRect(0,Math.random()*256,256,Math.random()*1.4+.3):T.fillRect(Math.random()*256,Math.random()*256,Math.random()*2.2+.4,Math.random()*2.2+.4)}const U=new ri(x);return U.wrapS=U.wrapT=us,U},he=function(u,l,f,x,T){const W=document.createElement("canvas");W.width=256,W.height=512;const D=W.getContext("2d");D.fillStyle=u,D.fillRect(0,0,256,512);const F=document.createElement("canvas");F.width=256,F.height=512;const G=F.getContext("2d");G.fillStyle="#000",G.fillRect(0,0,256,512);const Z=256/f,Y=512/x;for(let bt=0;bt<f;bt++)for(let Ut=0;Ut<x;Ut++){const ne=Math.random()<T,Le=Math.random()<.62;if(D.fillStyle=ne?Le?"#ffc98a":"#9fe4ff":l,D.fillRect(bt*Z+1.5,Ut*Y+1.5,Z-3,Y-3),ne){const Re=.45+Math.random()*.55;G.fillStyle=Le?`rgba(255,201,138,${Re})`:`rgba(159,228,255,${Re})`,G.fillRect(bt*Z+1.5,Ut*Y+1.5,Z-3,Y-3)}}const st=new ri(W);st.wrapS=st.wrapT=us,st.colorSpace=Bn;const gt=new ri(F);return gt.wrapS=gt.wrapT=us,gt.colorSpace=Bn,{map:st,em:gt}},ut=function(u){return new So({color:12577023,transparent:!0,opacity:u,roughness:.08,metalness:.1,side:Xn,emissive:2775672,emissiveIntensity:.22,envMapIntensity:1.3})},Yt=function(u,l=.2){const f=new St;f.add(new b(new ie(u,40,20,0,Math.PI*2,0,Math.PI/2),ut(l)));const x=new b(new ie(u*1.005,20,10,0,Math.PI*2,0,Math.PI/2),new gn({wireframe:!0,color:10476799,transparent:!0,opacity:.12}));f.add(x);const T=new b(new Ve(u,u*.025,8,64),dt);return T.rotation.x=Math.PI/2,f.add(T),f},Wt=function(u,l){return u.userData.btype=l,u},ze=function(u=2.4,l=.32){const f=new St,x=new b(new pt(l*.5,l,u,6),se);x.position.y=u/2,f.add(x);const T=new b(new Ve(l*.68,.025,6,24).rotateX(Math.PI/2),Jt);T.position.y=u*.68,f.add(T);const L=new b(new ie(l*.22,10,10),Jt);return L.position.y=u+l*.2,f.add(L),Wt(f,"spire")},Gn=function(u=2.2,l=.5){const f=new St,x=new ol(new M(-l*.6,0,0),new M(l*1.4,u*.55,0),new M(0,u,0)),T=new b(new Ci(x,16,l*.28,8),jt);f.add(T);for(let L=1;L<=3;L++){const U=L/4,W=x.getPoint(U),D=new b(new pt(l*(.9-U*.4),l*(.9-U*.4),.06,12),Tt);D.position.copy(W),D.position.y+=.05,f.add(D)}return Wt(f,"bio")},ii=function(u=1.1){const l=new St,f=new b(new Ve(u,u*.16,10,40),se);f.position.y=u*1.25,l.add(f);const x=new b(new Ve(u,u*.05,6,40),Jt);x.position.y=u*1.25,l.add(x);for(const T of[-1,1]){const L=new b(new pt(u*.09,u*.13,u*1.3,8),dt);L.position.set(T*u*.86,u*.62,0),l.add(L)}return Wt(l,"ring")},ws=function(u=1.6){const l=new St,f=new b(new pt(.05,.1,u,6),yt);f.position.y=u/2,l.add(f);for(let T=0;T<6;T++){const L=T/6*Math.PI*2,U=new b(new ie(.34,10,6),X);U.scale.set(1,.16,.55),U.position.set(Math.cos(L)*.32,u+.05,Math.sin(L)*.32),U.rotation.y=-L,U.rotation.z=.28,l.add(U)}const x=new b(new ie(.07,8,8),Jt);return x.position.y=u+.12,l.add(x),Wt(l,"etree")},si=function(u=.5,l=1.6){const f=new St;let x=0;for(let T=0;T<3;T++){const L=l*(.4-T*.06),U=u*(1-T*.18),W=new b(new Nt(U,L,U),Rt);W.position.set((d()-.5)*.16,x+L/2,(d()-.5)*.16),W.rotation.y=(d()-.5)*.5,x+=L,f.add(W)}return Wt(f,"stack")},cr=function(u=.7,l=2.2){const f=new St,x=new b(new pt(u,u*1.12,.14,20),jt);x.position.y=l,f.add(x);const T=new b(new pt(u*.8,u*.8,.1,20),Tt);T.position.y=l+.12,f.add(T);const L=new b(new pt(.1,.32,l,10,1,!0),new gn({color:9431807,transparent:!0,opacity:.14,blending:On,side:Xn,depthWrite:!1}));return L.position.y=l/2,f.add(L),w(f,new M(0,l-.2,0),8382463,1.6),Wt(f,"float")},Ni=function(u,l,f){const x=new St;return x.position.copy(no(u)),x.quaternion.setFromUnitVectors(new M(0,1,0),u.dir),x.userData.radius=l,x.userData.buildings=[],f(x),Ct.add(x),_n[u.id]=x,x},dn=function(u,l,f,x,T=0){return l.position.set(f,0,x),l.rotation.y=T,u.add(l),u.userData.buildings.push(l),l},Rn=function(u,l,f){const x=new Lm(u,l,f.length),T=new Ce,L=new ci,U=new Li;return f.forEach((W,D)=>{U.set(0,W.ry||0,0),L.setFromEuler(U),T.compose(W.p,L,W.s),x.setMatrixAt(D,T)}),x},Zi=function(u,l,f,x,T=10479871){const L=new St,U=new b(new Nt(.16,.04,.08),jt);L.add(U),w(L,new M(-.1,0,0),T,.5),u.add(L),Ae.drones.push({mesh:L,r:l,y:f,speed:x,phase:d()*Math.PI*2})},Vo=function(u,l,f,x){const T=l.clone().add(f).multiplyScalar(.5);T.y+=x;const L=new ol(l,T,f);u.add(new b(new Ci(L,40,.085,10),ko)),u.add(new b(new Ci(L,40,.018,6),Jt));for(const U of[.28,.72]){const W=L.getPoint(U),D=new b(new pt(.03,.05,W.y,6),dt);D.position.set(W.x,W.y/2,W.z),u.add(D)}for(let U=0;U<2;U++){const W=new b(new Ge(.045,.2,4,8),new gn({color:14677247}));u.add(W),Ae.liners.push({mesh:W,curve:L,speed:(.05+d()*.03)*(U?-1:1),t:d()})}},fl=function(){const u=new St,l=new wt({color:14252874,roughness:.6,metalness:.1}),f=new wt({color:14203040,roughness:.5}),x=new b(new Ge(.028,.05,4,10),l);x.position.y=.078,u.add(x);const T=new b(new ie(.024,12,10),f);T.position.y=.138,u.add(T);const L=new b(new ie(.02,10,8,-.6,1.2,1,.8),new wt({color:2759186,roughness:.2,metalness:.6}));L.position.set(0,.138,.006),u.add(L);for(const U of[-1,1]){const W=new b(new Ge(.01,.035,4,6),l);W.position.set(U*.014,.022,0),u.add(W)}return w(u,new M(0,.16,0),16757370,.45),u},pl=function(){const u=new St,l=new wt({color:9417944,roughness:.6,metalness:.1}),f=new wt({color:14203040,roughness:.5}),x=new b(new Ge(.028,.05,4,10),l);x.position.y=.078,u.add(x);const T=new b(new ie(.024,12,10),f);T.position.y=.138,u.add(T);const L=new b(new ie(.02,10,8,-.6,1.2,1,.8),new wt({color:2759186,roughness:.2,metalness:.6}));L.position.set(0,.138,.006),u.add(L);for(const U of[-1,1]){const W=new b(new Ge(.01,.035,4,6),l);W.position.set(U*.014,.022,0),u.add(W)}return w(u,new M(0,.16,0),10474751,.45),u},R=function(u,l,f,x,T,L,U,W){const D=l==="resident"?fl():pl();return D.position.set(f,0,x),D.rotation.y=T,u.add(D),Ki.push({mesh:D,name:L,role:U,lines:W,worldPos:new M}),D},j=function(){const u=new St;u.add(new b(new pt(.22,.28,1.8,10).rotateZ(Math.PI/2),dt));const l=new b(new Ai(.22,.55,10).rotateZ(-Math.PI/2),yt);l.position.x=1.15,u.add(l);const f=new b(new Nt(.5,.02,.7),yt);return f.position.x=-.7,u.add(f),w(u,new M(-1.05,0,0),8374527,1.6),u},At=function(u,l,f){const x=g(f),T=new Ch(u,3),L=T.attributes.position,U=new M,W=[];for(let D=0;D<9;D++)W.push({d:new M(x()*2-1,x()*2-1,x()*2-1).normalize(),r:.25+x()*.4,depth:.12+x()*.14});for(let D=0;D<L.count;D++){U.fromBufferAttribute(L,D);const F=U.clone().normalize();let G=1+k(F.x*2+f,F.y*2+f,F.z*2+f,3)*.22;for(const Z of W){const Y=F.angleTo(Z.d);Y<Z.r&&(G-=Z.depth*(1-Y/Z.r))}U.copy(F).multiplyScalar(u*G),L.setXYZ(D,U.x,U.y,U.z)}return T.computeVertexNormals(),new b(T,new wt({color:l,roughness:.95,metalness:.02}))},Ht=function(u,l,f,x,T,L){const U=new Float32Array(u*3),W=new Float32Array(u*3),D=new Ce().makeRotationX(.9).multiply(new Ce().makeRotationZ(.5)),F=new M;for(let Z=0;Z<u;Z++){if(L){const bt=d()*Math.PI*2,Ut=1350+(d()+d()-1)*130;F.set(Math.cos(bt)*Ut,(d()+d()-1)*70,Math.sin(bt)*Ut).applyMatrix4(D)}else F.set(d()*2-1,d()*2-1,d()*2-1).normalize().multiplyScalar(l+d()*(f-l));U.set([F.x,F.y,F.z],Z*3);const Y=d(),st=Y<.7?[1,1,1]:Y<.85?[.75,.85,1]:[1,.85,.7],gt=.5+d()*.5;W.set([st[0]*gt,st[1]*gt,st[2]*gt],Z*3)}const G=new vn;return G.setAttribute("position",new Hn(U,3)),G.setAttribute("color",new Hn(W,3)),new Ur(G,new nr({size:x,vertexColors:!0,transparent:!0,opacity:T,blending:On,depthWrite:!1,sizeAttenuation:L,fog:!1}))},oe=function(u,l=70,f=58){const x=document.createElement("canvas");x.width=x.height=256;const T=x.getContext("2d");for(let L=0;L<16;L++){const U=40+d()*176,W=40+d()*176,D=18+d()*72,F=T.createRadialGradient(U,W,0,U,W,D);F.addColorStop(0,`hsla(${u+d()*44-22},${l}%,${f}%,.18)`),F.addColorStop(1,"hsla(0,0%,0%,0)"),T.fillStyle=F,T.beginPath(),T.arc(U,W,D,0,7),T.fill()}return new ri(x)},Qt=function(){const u=document.createElement("canvas");u.width=u.height=256;const l=u.getContext("2d"),f=128,x=128,T=l.createRadialGradient(f,x,0,f,x,26);T.addColorStop(0,"rgba(255,246,225,.95)"),T.addColorStop(1,"rgba(255,246,225,0)"),l.fillStyle=T,l.beginPath(),l.arc(f,x,26,0,7),l.fill();for(let L=0;L<2;L++)for(let U=0;U<380;U++){const W=U/380,D=L*Math.PI+W*4.6,F=12+W*105,G=f+Math.cos(D)*F+(d()-.5)*8,Z=x+Math.sin(D)*F*.55+(d()-.5)*8;l.fillStyle=`hsla(${215+d()*40},70%,${70+d()*20}%,${(1-W)*.5})`,l.fillRect(G,Z,1.4,1.4)}return new ri(u)},me=function(u){const l=ye[u];l&&(ue.innerHTML=`<h3>${l.title}</h3><p>${l.body}</p>
    <div class="npc"><b>${l.npc[0]}</b><br>${l.npc[1]}</div>`)},Be=function(u,l){const f=ve[u];f&&(ue.innerHTML=`<span class="tag">BUILDING ${String(l).padStart(2,"0")}</span>
    <h3>${f.name}</h3><p>${f.desc}</p>`)},De=function(u,l,f=2.2,x){te={t:0,dur:f,fromP:i.position.clone(),toP:u.clone(),fromT:r.target.clone(),toT:l.clone(),cb:x},r.enabled=!1,r.autoRotate=!1},Qn=function(u){const l=u.userData.radius,f=u.localToWorld(new M(l*1.55,l*.95,l*1.55)),x=u.localToWorld(new M(0,l*.28,0));return{pos:f,tg:x}},Fi=function(u,l){l&&me(l);const f=Qn(u);qt="city",He=u,De(f.pos,f.tg,2.6,()=>{r.minDistance=1.2,r.maxDistance=u.userData.radius*7,Ke.style.display="block",ke.textContent="拖动环视城市 · 滚轮缩放 · 点击建筑查看"})},Ln=function(){qt="planet",He=null,Ke.style.display="none",ke.textContent="拖动旋转 · 滚轮缩放 · 点击城市进入",r.minDistance=64,r.maxDistance=700,De(ln.clone().add(new M(0,20,15)),new M(0,0,0),2.4,()=>{r.autoRotate=!0})},Uf=function(u,l){for(const f in jh){const x=jh[f];if(!(!x.types.includes(u)||Kh.has(f))){Kh.add(f),l.getWorldPosition(qo),Pn.target.copy(qo),Pn.timer=3.5,zi("point"),An(x.line);return}}},zi=function(u){un.name=u,un.t=0,un.dur={wave:2.2,happy:2.6,confused:2.8,think:3.2,point:2.4}[u]||2.5},Jh=function(){const u=document.createElement("canvas");u.width=u.height=128;const l=u.getContext("2d"),f=l.createRadialGradient(64,72,10,64,64,64);f.addColorStop(0,"#1c3f66"),f.addColorStop(.55,"#0e2140"),f.addColorStop(1,"#050c1c"),l.fillStyle=f,l.fillRect(0,0,128,128);for(let T=0;T<26;T++)l.fillStyle=["#ffffff","#ffe27a","#8fd8ff"][T%3],l.beginPath(),l.arc(Math.random()*128,Math.random()*128,Math.random()*1.5+.6,0,7),l.fill();l.fillStyle="rgba(255,255,255,.95)",l.beginPath(),l.arc(46,42,13,0,7),l.fill(),l.fillStyle="rgba(255,255,255,.65)",l.beginPath(),l.arc(82,68,6,0,7),l.fill();const x=new ri(u);return x.colorSpace=Bn,x.wrapS=x.wrapT=us,x},Nf=function(){const u=new St,l=new wt({color:4113076,roughness:.95,metalness:0}),f=new wt({color:3319963,roughness:.95}),x=new wt({color:16183783,roughness:.9}),T=new gn({color:16230584,transparent:!0,opacity:.75}),L=new gn({map:Jh()}),U=new gn({color:9059138}),W=new gn({color:15005578}),D=new wt({color:12174540,roughness:.3,metalness:.85}),F=new gn({color:16769658}),G=new b(new Ge(.026,.03,4,12),l);G.position.y=.045,u.add(G);const Z=new b(new ie(.02,12,10),x);Z.position.set(0,.042,.013),Z.scale.set(1,1.15,.62),u.add(Z);for(const zt of[-1,1]){const Bt=new b(new Ge(.009,.012,4,8),f);Bt.position.set(zt*.012,.01,.004),u.add(Bt)}const Y=new St;Y.position.set(-.024,.056,0),u.add(Y);const st=new b(new Ge(.008,.02,4,8),f);st.position.y=-.014,Y.add(st),Y.rotation.z=.3;const gt=new St;gt.position.set(.024,.056,0),u.add(gt);const bt=st.clone();bt.position.y=-.014,gt.add(bt),gt.rotation.z=-.3;const Ut=new St;Ut.position.set(0,.034,-.024),u.add(Ut);const ne=new b(new Ge(.006,.02,4,8),f);ne.position.set(0,.012,-.012),ne.rotation.x=.8,Ut.add(ne);const Le=new b(new ie(.011,10,8),x);Le.position.set(0,.026,-.026),Ut.add(Le);const Re=new St;Re.position.y=.09,u.add(Re);const Me=new b(new ie(.036,18,14),l);Me.scale.set(1.05,.95,.95),Re.add(Me);const ae=new b(new ie(.03,16,12),x);ae.position.set(0,-.004,.013),ae.scale.set(.95,.8,.55),Re.add(ae);const Pt=new ie(.011,14,10),at=new St;at.position.set(-.016,.004,.024),Re.add(at);const _t=new b(Pt,L);_t.scale.set(1,1.25,.45),at.add(_t);const et=new St;et.position.set(.016,.004,.024),Re.add(et);const $=new b(Pt,L);$.scale.set(1,1.25,.45),et.add($);for(const zt of[-1,1]){const Bt=new b(new ie(.005,8,6),T);Bt.position.set(zt*.023,-.007,.02),Bt.scale.set(1,.7,.4),Re.add(Bt)}const mt={},Ot=new b(new Ve(.007,.0016,6,12,Math.PI),U);Ot.rotation.z=Math.PI,mt.smile=Ot;const ce=new b(new ie(.005,8,6),U);ce.scale.set(1,1.3,.5),mt.open=ce,mt.flat=new b(new Nt(.009,.0018,.0018),U),mt.o=new b(new Ve(.0035,.0014,6,10),U),Object.values(mt).forEach(zt=>{zt.position.set(0,-.013,.028),zt.visible=!1,Re.add(zt)}),mt.smile.visible=!0;function Se(zt){const Bt=new St;Bt.position.set(zt*.014,.03,0);const $t=new b(new pt(.0025,.003,.032,6),f);$t.position.y=.016,Bt.add($t);const qe=new b(new ie(.0075,10,8),W);qe.position.y=.036,Bt.add(qe);const sn=new b(new Ve(.011,.0012,6,16).rotateX(Math.PI/2.4),F);return sn.position.y=.036,Bt.add(sn),Bt.rotation.z=zt*-.28,Re.add(Bt),Bt}const Ye=Se(-1),xn=Se(1),Je=new b(new Ve(.024,.004,8,20).rotateX(Math.PI/2),D);Je.position.y=.066,u.add(Je);const Ze=new b(new ie(.006,10,8),F);return Ze.position.set(0,.064,.023),u.add(Ze),w(u,new M(0,.064,.026),16769658,.35),u.visible=!1,n.add(u),{g:u,body:G,head:Re,eyeL:at,eyeR:et,mouths:mt,antL:Ye,antR:xn,armL:Y,armR:gt,tail:Ut}},An=function(u){(Array.isArray(u)?u:[u]).forEach(l=>Te.queue.push(typeof l=="string"?{t:l}:l))},Zo=function(){Te.queue.length=0,Te.typed=0,Te.lineTimer=0,_l.classList.remove("on")},id=function(){let u=null,l=1e9;for(const f of E){if($o.has(f.id))continue;const x=fe.dir.angleTo(f.dir);x<l&&(l=x,u=f)}bs=u,Hh.textContent=u?`目标 · 前往 ${Ho[u.id]}`:"目标 · 自由探索——这颗星球已经是你的了",Gh.textContent=`已发现区域 ${$o.size} / ${E.length}`,u?(ki.position.copy(_n[u.id].position).addScaledVector(u.dir,7.5),ki.visible=qt==="explore"):(ki.visible=!1,!Zh&&$o.size===E.length&&(Zh=!0,zi("happy"),An("六个区域都走过了。旅行者——你现在比 90% 的新移民，更懂这颗星球。")))},zf=function(u){Wh.textContent="已发现 · "+Ho[u],fr.classList.remove("pop"),fr.offsetWidth,fr.classList.add("pop"),Pn.target.copy(_n[u].position),Pn.timer=3,zi("happy"),An(Ff[u]),id()},Qo=function(u){Ss.set(0,1,0).addScaledVector(u,-u.y).normalize(),io.crossVectors(Ss,u)},kf=function(u){hi(),te=null;const l=u?u.position.clone().normalize():i.position.clone().normalize();Qo(l),fe.dir.copy(l).addScaledVector(io,.16).addScaledVector(Ss,-.13).normalize(),dr.copy(l).addScaledVector(fe.dir,-l.dot(fe.dir)).normalize(),Qo(fe.dir),fe.yaw=Math.atan2(dr.dot(io),dr.dot(Ss)),fe.pitch=.06,fe.clickDir=null,qt="explore",He=null,r.enabled=!1,r.autoRotate=!1,Ke.style.display="none",document.getElementById("nav").style.display="none",document.getElementById("actions").style.display="none",document.getElementById("stats").style.display="none",document.getElementById("titleBox").style.display="none",ue.style.display="none",ke.style.display="none",Oi.classList.add("on"),Es(),n.fog=Of,Ji.visible=!0,Mi=bl.mount(n,.21),Ki.forEach(f=>{f.mesh.visible=!0}),Xo.intensity=1.8,di("已着陆 · 地表探索模式"),Zo(),Te.char&&(Te.char.visible=!1,Te.char.position.copy(fe.dir).multiplyScalar(50+vt(fe.dir)+.34),Pn.target.copy(i.position),Pn.timer=3),An([{t:"着陆确认。欢迎来到火星，旅行者。",act:()=>zi("wave")},{t:"这里是 2126 年的火星——人类的第二家园。"},{t:"那边就是首都 Aurelia。跟我来，我们走过去。",act:()=>{bs&&(qo.copy(_n[bs.id].position),zi("point"))}}]),id()},xl=function(){qt==="explore"&&(qt="planet",Oi.classList.remove("on"),In.classList.remove("on"),so.classList.remove("on"),ur=null,yl.classList.remove("on"),n.fog=null,Ji.visible=!1,Bi=0,Hs=0,i.fov=48,i.updateProjectionMatrix(),Mi&&Mi.detach(),Xo.intensity=0,Zo(),Te.char&&(Te.char.visible=!1,un.name=null),ki.visible=!1,i.up.set(0,1,0),document.getElementById("nav").style.display="",document.getElementById("actions").style.display="",document.getElementById("stats").style.display="",document.getElementById("titleBox").style.display="",ue.style.display="",ke.style.display="",ke.textContent="拖动旋转 · 滚轮缩放 · 点击城市进入",r.minDistance=64,r.maxDistance=700,r.target.set(0,0,0),De(fe.dir.clone().multiplyScalar(180),new M(0,0,0),2.2,()=>{r.autoRotate=!0}))},ta=function(u){if(ao||!u)return;ao=!0,hi(),di("进入大气层 · 减速着陆中…");const l=u.position.clone().normalize();Qo(l);const f=l.clone().addScaledVector(io,.16).addScaledVector(Ss,-.13).normalize(),x=f.clone().multiplyScalar(50+vt(f)+5.5).addScaledVector(Ss,3.5),T=l.clone().multiplyScalar(50+vt(l)+1.5);De(x,T,3,()=>{ao=!1,kf(u)})},Vf=function(u,l){const f=fe.dir;Xo.position.copy(f).multiplyScalar(50+vt(f)+.3),Qo(f),wi.copy(Ss).applyAxisAngle(f,-fe.yaw),hr.copy(wi).applyAxisAngle(f,-Math.PI/2),pn.set(0,0,0),Nn.w&&pn.add(wi),Nn.s&&pn.sub(wi),Nn.d&&pn.add(hr),Nn.a&&pn.sub(hr);let x=!1;if(pn.lengthSq()>0){x=!0,fe.clickDir=null,pn.normalize();const D=(Nn.shift?3.2:1.15)*u/(50+vt(f));f.multiplyScalar(Math.cos(D)).addScaledVector(pn,Math.sin(D)).normalize(),Go+=u*(Nn.shift?14:9)}if(!x&&fe.clickDir){const D=f.angleTo(fe.clickDir),F=Math.max(.004,.2/(50+vt(f)));if(D<F)fe.clickDir=null;else{pn.copy(fe.clickDir).addScaledVector(f,-f.dot(fe.clickDir)).normalize(),fe.yaw=Math.atan2(pn.dot(io),pn.dot(Ss));const G=Math.min(D,1.15*u/(50+vt(f)));f.multiplyScalar(Math.cos(G)).addScaledVector(pn,Math.sin(G)).normalize(),Go+=u*9,x=!0}}(Hs!==0||Bi>0)&&(Bi+=Hs*u,Hs-=1.35*u,Bi<=0&&(Bi=0,Hs=0));const T=50+vt(f);if(dr.copy(wi).multiplyScalar(Math.cos(fe.pitch)).addScaledVector(f,Math.sin(fe.pitch)),i.up.copy(f),fe.third){Mi&&(Mi.setVisible(!0),Vs.copy(f).multiplyScalar(T+Bi),Mi.setPosition(Vs),pn.crossVectors(f,wi),Oh.makeBasis(pn,f,wi),Gs.setFromRotationMatrix(Oh),Mi.setQuaternion(Gs),Mi.setState(Bi>0?"jump":x?Nn.shift?"run":"walk":"idle"),Mi.update(u)),i.position.copy(Vs).addScaledVector(wi,-fe.dist).addScaledVector(f,fe.dist*.5),pn.copy(i.position).normalize();const D=50+vt(pn)+.1;i.position.length()<D&&i.position.copy(pn.multiplyScalar(D)),pn.copy(Vs).addScaledVector(f,.15).addScaledVector(wi,.8),i.lookAt(pn)}else{Mi&&Mi.setVisible(!1);const D=x?Math.abs(Math.sin(Go))*.012:0;i.position.copy(f).multiplyScalar(T+.16+Bi+D),pn.copy(i.position).add(dr),i.lookAt(pn),x&&i.rotateZ(Math.sin(Go)*.008)}const L=Nn.shift&&x?55:48;if(Math.abs(i.fov-L)>.05&&(i.fov+=(L-i.fov)*Math.min(1,u*6),i.updateProjectionMatrix()),Te.char&&Te.char.visible){Vs.copy(f).multiplyScalar(T+Bi),pn.copy(Vs).addScaledVector(wi,.5).addScaledVector(hr,-.3).addScaledVector(f,.34+Math.sin(l*2.2)*.02),un.name==="happy"&&pn.addScaledVector(f,Math.abs(Math.sin(un.t*7))*.05);const D=Te.char.position.distanceTo(pn);D>.45&&pn.addScaledVector(f,Math.abs(Math.sin(l*11))*.05),Te.char.position.lerp(pn,Math.min(1,u*(D>.45?6:3.5))),Wn.copy(Vs).addScaledVector(f,.16),Yo.lookAt(Wn,Te.char.position,f),Gs.setFromRotationMatrix(Yo),Te.char.quaternion.slerp(Gs,Math.min(1,u*2.2)),Te.char.rotation.y+=Math.sin(l*.5)*.1,Te.char.rotation.z=un.name==="confused"?.14:Math.sin(l*.8)*.03,Tn.body.scale.y=1+Math.sin(l*2.4)*.045,$i.timer-=u,$i.timer<=0&&($i.phase=.18,$i.timer=2+Math.random()*3.5);let F=1;$i.phase>0&&($i.phase-=u,F=1-.92*Math.max(0,1-Math.abs($i.phase-.09)/.09));const G=un.name==="happy"||un.name==="wave"?1.12:un.name==="think"?.82:1;Tn.eyeL.scale.set(G,F*G,1),Tn.eyeR.scale.set(G,F*G,1),Tn.head.updateWorldMatrix(!0,!1),Wn.copy(Pn.target),Tn.head.worldToLocal(Wn);const Z=y(Wn.x*.12,-.05,.05),Y=y(Wn.y*.12,-.04,.04);Ko.map.offset.x+=(Z-Ko.map.offset.x)*Math.min(1,u*5),Ko.map.offset.y+=(Y-Ko.map.offset.y)*Math.min(1,u*5),Tn.antL.rotation.x=Math.sin(l*1.7)*.12,Tn.antR.rotation.x=Math.sin(l*1.7+1.3)*.12;const st=un.name==="happy"?2.2:1;if(Tn.tail.rotation.y=Math.sin(l*3.2*st)*.35*st,Pn.timer-=u,Pn.timer<=0){Pn.timer=3.5+Math.random()*3.5;const bt=Math.random();bt<.5?Pn.target.copy(i.position):bt<.68&&bs?Pn.target.copy(_n[bs.id].position):bt<.8&&q?Pn.target.copy(q):Pn.target.copy(Te.char.position).addScaledVector(wi,1.2).addScaledVector(f,-.25),bt>=.8&&Math.random()<.4&&!un.name&&zi("confused")}un.name==="think"&&Pn.target.copy(Te.char.position).addScaledVector(f,1.5).addScaledVector(hr,.6),Tn.head.getWorldPosition(Wn),Yo.lookAt(Pn.target,Wn,f),Gs.setFromRotationMatrix(Yo),Tn.head.parent.getWorldQuaternion(Xh).invert(),Gs.premultiply(Xh),Tn.head.quaternion.slerp(Gs,Math.min(1,u*4)),un.name?(un.t+=u,un.name==="wave"&&(Tn.armR.rotation.z=-2.2+Math.sin(l*9)*.3),un.name==="think"&&(Tn.armL.rotation.z=1.1,Tn.antR.rotation.z=-.6),un.name==="point"&&(Tn.armR.rotation.z=-1.5,Pn.target.copy(qo)),un.t>=un.dur&&(un.name=null,Tn.armR.rotation.z=-.3,Tn.armL.rotation.z=.3,Tn.antR.rotation.z=-.28)):Math.random()<u/10&&zi(["wave","happy","think"][Math.floor(Math.random()*3)]);const gt=un.name==="happy"||un.name==="wave"?"open":un.name==="confused"?"flat":un.name==="think"?"o":"smile";for(const bt in Tn.mouths)Tn.mouths[bt].visible=bt===gt;if(jo-=u,jo<=0&&!un.name){Wn.copy(Te.char.position).sub(i.position);const bt=Wn.length();bt<3.2&&dr.dot(Wn.normalize())>.94?(jo=14,Pn.target.copy(i.position),Pn.timer=2.5,$i.phase=.18,zi(Math.random()<.5?"wave":"happy"),Math.random()<.4&&An($h[Math.floor(Math.random()*$h.length)])):bt<3.2&&(jo=.5)}oo+=u,oo>16&&!un.name&&(oo=0,zi(["think","confused","wave"][Math.floor(Math.random()*3)]),Math.random()<.5&&An(qh[Math.floor(Math.random()*qh.length)]))}if(od(u),ki.visible&&(ki.material.opacity=.11+Math.sin(l*2.4)*.05,ki.rotation.y+=u*.4),Ji.visible&&(Ji.position.copy(f).multiplyScalar(T),Ji.quaternion.setFromUnitVectors(Bf,f),Ji.rotateY(l*.05),Ji.position.addScaledVector(hr,Math.sin(l*.23)*.4)),ml-=u,ml<=0){ml=.18,mi.setFromCamera(Df,i);const D=mi.intersectObjects(yi,!0);let F=null;for(const G of D){if(G.distance>14)break;let Z=G.object;for(;Z&&!Z.userData.btype;)Z=Z.parent;if(Z){F=Z.userData.btype;break}}if(F&&ve[F])qn.textContent=ve[F].name,Un.textContent=ve[F].desc,In.classList.add("on");else{Wn.copy(f).multiplyScalar(T);let G=null,Z=3.4;for(const st of Bh){const gt=st.p.distanceTo(Wn);gt<Z&&(Z=gt,G=st.o)}const Y=G&&G.userData.btype;Y&&Uf(Y,G),Y&&ve[Y]?(qn.textContent=ve[Y].name,Un.textContent=ve[Y].desc,In.classList.add("on")):In.classList.remove("on")}}Wn.copy(f).multiplyScalar(T);let U=null,W=2.4;for(const D of Ki){const F=D.worldPos.distanceTo(Wn);F<W&&(W=F,U=D)}if(U?ur!==U?(ur=U,Wo=0,kh.textContent=U.name,Vh.textContent=U.role,zh.classList.toggle("ai",U.mesh===void 0?!1:U.role.includes("AI")),ro.textContent=U.lines[0],so.classList.add("on")):(U._timer||(U._timer=0),U._timer+=u,U._timer>4&&(U._timer=0,Wo=(Wo+1)%U.lines.length,ro.textContent=U.lines[Wo])):ur&&(ur._timer=0,ur=null,so.classList.remove("on")),gl-=u,gl<=0){gl=.5;let D=null,F=1e9;for(const Z of E){const Y=f.angleTo(Z.dir);Y<F&&(F=Y,D=Z)}fn.textContent=`${Ho[D.id]} · 相距约 ${(F*50).toFixed(1)} km`;const G=_n[D.id].userData.radius;!$o.has(D.id)&&F*50<G*.95&&zf(D.id),!Qh&&f.angleTo(J.dir)*50<J.radius&&(Qh=!0,An("这里是 Aurelia 城郊带——起降场、储能站、装配车间都在这片。别看它不如首都气派，整座城市的吃穿用度，都是从这里流转出去的。")),!td&&q&&(Wn.copy(f).multiplyScalar(T),Wn.distanceTo(q)<3.4&&(td=!0,An("抬起头——那就是马斯克雕像，开拓者广场的心脏。他在连穹顶都没有的年代，就相信会有今天。基座上那句话，现在刻在每个火星孩子的心里。")))}},vl=function(u){return u=u.toLowerCase(),{arrowup:"w",arrowdown:"s",arrowleft:"a",arrowright:"d"}[u]||u},Es=function(){yl.classList.toggle("on",qt==="explore"&&!fe.third||qt==="surface"&&Mt.player&&!Mt.player.third)},hi=function(){Ws=!1,sa.classList.remove("on"),ia&&(clearTimeout(ia),ia=null)},Ml=function(){if(!Ws)return;if(co++,co>=sd.length){hi(),Ln();return}const u=sd[co];Fi(_n[u],u),ia=setTimeout(Ml,6500)},di=function(u){wl.textContent=u,wl.style.opacity=1,Sl&&clearTimeout(Sl),Sl=setTimeout(()=>wl.style.opacity=0,2200)},Tl=function(u,l,f,x,T=16771280){const L=new Bd;L.background=new be(u),L.fog=new Eh(l,f,x),L.environment=n.environment;const U=new hu(T,2.2);return U.position.set(60,90,40),L.add(U),L.add(new du(9082792,.5)),L.add(new ou(12571880,4860956,.5)),L},Al=function(u,l,f){const x=new b(new ai(l,64).rotateX(-Math.PI/2),new wt({color:f,roughness:.95,metalness:.03,bumpMap:tt,bumpScale:.02}));return x.position.y=0,u.add(x),x},Vi=function(u,l,f,x,T,L,U,W,D=0,F={}){const G=new b(new Nt(f,x,T),L);return G.position.set(U,(F.y||0)+x/2,W),G.rotation.y=D,u.add(G),F.collide!==!1&&l.push({x:U,z:W,r:Math.hypot(f,T)/2,h:(F.y||0)+x}),G},oa=function(u,l,f,x,T,L,U,W={}){const D=new b(new pt(W.rTop!==void 0?W.rTop:f,f,x,W.seg||14),T);return D.position.set(L,(W.y||0)+x/2,U),u.add(D),W.collide!==!1&&l.push({x:L,z:U,r:f+.1,h:(W.y||0)+x}),D},uo=function(u,l,f,x,T,L=0,U=1317410,W=4839423){const D=new b(new Nt(x,.06,T),new wt({color:U,roughness:.9,emissive:W,emissiveIntensity:.12}));return D.position.set(l,.03,f),D.rotation.y=L,u.add(D),D},Ts=function(u,l,f,x,T,L,U,W=.9){const D=new b(new Nt(x,.03,T),new wt({color:1120288,emissive:U,emissiveIntensity:W}));return D.position.set(l,.05,f),D.rotation.y=L,u.add(D),D},Xs=function(u,l,f,x=!0){const T=new St,L=new b(new pt(.05,.07,3.4,6),yt);L.position.y=1.7,T.add(L);const U=new b(new ie(.12,8,8),new wt({color:3353114,emissive:x?16763274:10478847,emissiveIntensity:2.2}));return U.position.y=3.45,T.add(U),w(T,new M(0,3.45,0),x?16763274:10478847,1.1),T.position.set(l,0,f),u.add(T),T},aa=function(u,l,f,x=1){const T=new St,L=new b(new pt(.06*x,.09*x,.7*x,6),yt);L.position.y=.35*x,T.add(L);const U=new b(new Ai(.42*x,1.1*x,8),Lt);return U.position.y=1.1*x,T.add(U),T.position.set(l,0,f),u.add(T),T},wn=function(u,l,f,x,T,L=4){const U=K(l,L);return U.position.set(f,x,T),u.add(U),U},rd=function(u=14252874,l=16757370){const f=new St,x=new wt({color:u,roughness:.65,metalness:.08}),T=new wt({color:14203040,roughness:.5}),L=new b(new Ge(.17,.32,4,10),x);L.position.y=.48,f.add(L);const U=new b(new ie(.14,12,10),T);U.position.y=.86,f.add(U);const W=new b(new ie(.115,10,8,-.6,1.2,1,.8),new wt({color:2759186,roughness:.2,metalness:.6}));W.position.set(0,.86,.035),f.add(W);const D=[];for(const F of[-1,1]){const G=new b(new Ge(.06,.2,4,6),x);G.position.set(F*.085,.14,0),f.add(G);const Z=new b(new Ge(.05,.22,4,6),x);Z.position.set(F*.23,.5,0),f.add(Z),D.push(Z)}return f.userData.arms=D,w(f,new M(0,1,0),l,.8),f},ts=function(u,l,f,x,T,L,U,W,D,F,G={}){const Z=rd(l,F);return Z.position.set(f,0,x),Z.rotation.y=T,u.scene.add(Z),u.npcs.push({id:L,mesh:Z,x:f,z:x,hx:f,hz:x,name:L,role:U,greet:W,options:D,xdIntro:G.xdIntro||null,wander:G.wander||0,wanderSpeed:.5+Math.random()*.3,workPhase:Math.random()*6.28,movePhase:Math.random()*6.28,introSeen:!1}),Z},mr=function(u,l,f,x,T,L,U=0){const W=rd(l);return u.scene.add(W),u.walkers.push({mesh:W,cx:f,cz:x,r:T,speed:L,phase:U}),W},Ys=function(u,l,f,x,T,L,U,W,D=null){u.interact.push({id:l,x:f,z:x,r:T,title:L,prompt:U,run:W,enabledFn:D,done:!1})},Yf=function(u){const l=new b(new pt(.5,.85,22,12,1,!0),new gn({color:8254153,transparent:!0,opacity:.1,blending:On,side:Xn,depthWrite:!1}));return l.renderOrder=4,u.scene.add(l),u.beacon=l,l},qf=function(u){return{id:u,scene:null,colliders:[],npcs:[],walkers:[],interact:[],ticks:[],tasks:[],spawn:{x:0,z:-90,yaw:0},bounds:115,coreDone:!1,beacon:null,groundMesh:null,guide:[],idleHint:null}},es=function(u,l,f,x,T){u.tasks.push({id:l,label:f,tx:x,tz:T,done:!1})},ns=function(u,l){const f=u.tasks.find(x=>x.id===l);!f||f.done||(f.done=!0,Cl(),u.tasks.every(x=>x.done)&&!u.coreDone&&(u.coreDone=!0,Wh.textContent=ho[u.id].core,fr.classList.remove("pop"),fr.offsetWidth,fr.classList.add("pop")))},Cl=function(){const u=Mt.city;if(!u)return;const l=u.tasks.filter(x=>x.done).length;Hh.textContent=`${ho[u.id].short} · 城市接入 ${l}/${u.tasks.length}`,Gh.textContent=u.tasks.map(x=>(x.done?"✓ ":"○ ")+x.label).join("　");const f=u.tasks.find(x=>!x.done);u.beacon&&(f?(u.beacon.visible=!0,u.beacon.position.set(f.tx,11,f.tz)):u.beacon.visible=!1)},od=function(u){if(Te.lineTimer>0&&(Te.lineTimer-=u),Te.queue.length&&Te.lineTimer<=0){const l=Te.queue[0];Te.typed===0&&l.act&&l.act(),Te.typed<l.t.length?(Te.typed+=u*24,Lf.textContent=l.t.slice(0,Math.floor(Te.typed)),_l.classList.add("on")):(Te.lineTimer=Te.hold,Te.queue.shift(),Te.typed=0)}else!Te.queue.length&&Te.lineTimer<=0&&_l.classList.remove("on")},Pl=function(u){Mt.snpc=u,Mt.snpcMode="bubble",kh.textContent=u.name,Vh.textContent=u.role,zh.classList.toggle("ai",/AI|系统/.test(u.role)),ro.textContent=u.greet,is.classList.remove("on"),is.innerHTML="",Rl.textContent="按 E 交谈",so.classList.add("on")},ad=function(u){Mt.snpcMode="opts",ro.textContent="想聊点什么？",is.innerHTML="",u.options.forEach((l,f)=>{const x=document.createElement("button");x.innerHTML=`<b>${f+1}</b>${l.q}`,x.onclick=()=>ld(u,f),is.appendChild(x)}),is.classList.add("on"),Rl.textContent="按 1/2/3 或点击选择 · E 结束"},ld=function(u,l){Mt.snpcMode="answer",Mt.talked.add(u.id),ro.textContent=u.options[l].a,is.classList.remove("on"),is.innerHTML="",Rl.textContent="E 继续交谈 · 离开结束";const f=Mt.city;if(f&&f.id==="capital"){const x=f.tasks.find(T=>T.id==="talk");x&&!x.done&&Mt.talked.size>=2?ns(f,"talk"):Cl()}},la=function(){Mt.snpc=null,Mt.snpcMode="none",so.classList.remove("on"),is.classList.remove("on"),is.innerHTML=""},jf=function(u){const l=u.scene=Tl(2890256,7226668,70,340);u.bounds=112,u.spawn={x:0,z:-92,yaw:0},u.intro=["到了——Aurelia，火星的首都。","沿着主街往前走，尽头就是中央广场。","先去登记亭接入城市网络吧，跟着光柱走。"],u.guide=[{x:0,z:14,r:13,text:"拓荒纪念碑——连穹顶都没有的年代，就有人相信会有今天。"},{x:-26,z:46,r:11,text:"医疗中心。在低重力和辐射里，它是这座城最不能停的地方。"},{x:-16,z:-68,r:13,text:"城市能源节点。这些日冕树，养着 Aurelia 的每一盏灯。"}],u.idleHint="主街尽头是中央广场，西侧还有医疗中心和行政塔——想去哪儿，跟着我。";const f=u.colliders;u.groundMesh=Al(l,130,7029296);const x=new b(new ai(106,64).rotateX(-Math.PI/2),new wt({color:2830392,roughness:.85,bumpMap:tt,bumpScale:.015}));x.position.y=.02,l.add(x),l.add(Yt(108,.06)),uo(l,0,0,12,200),Ts(l,0,0,.5,200,0,4839423,.8);for(const et of[-1,1])Ts(l,et*6.6,0,1.6,200,0,16763274,.35);uo(l,0,-32,170,8),uo(l,0,36,170,8),Ts(l,0,-32,170,.4,0,4839423,.5),Ts(l,0,36,170,.4,0,4839423,.5);const T=new b(new pt(16,16.5,.24,48),new wt({color:3817286,roughness:.7,bumpMap:tt,bumpScale:.01}));T.position.set(0,.12,14),l.add(T);for(let et=0;et<3;et++){const $=new b(new Ve(13-et*3.2,.14,6,64).rotateX(Math.PI/2),new wt({color:1120288,emissive:16763274,emissiveIntensity:.9}));$.position.set(0,.26,14),l.add($)}const L=new St,U=new b(new pt(3.2,3.8,1,24),dt);U.position.y=.5,L.add(U);const W=new b(new pt(.5,1.6,13,8),dt);W.position.y=7.5,L.add(W);const D=new b(new pt(.56,.56,13,8),new gn({color:8382463,transparent:!0,opacity:.18,blending:On}));D.position.y=7.5,L.add(D);for(let et=0;et<2;et++){const $=new b(new Ve(2.2+et*.9,.12,8,48),dt);$.position.y=5+et*3.4,$.rotation.x=Math.PI/2+(et?-.2:.2),L.add($),u.ticks.push(mt=>{$.rotation.z+=mt*.3})}const F=new b(new ie(.9,16,16),Jt);F.position.y=14.4,L.add(F),w(L,new M(0,14.4,0),8382463,7),L.position.set(0,.24,14),l.add(L),f.push({x:0,z:14,r:4.2,h:15}),wn(l,"中央广场 · 拓荒纪念碑",0,17.5,14,7);for(let et=0;et<6;et++){const $=et/6*Math.PI*2+.3,mt=new b(new Nt(1.6,.14,.5),yt);mt.position.set(Math.cos($)*10.5,.45,14+Math.sin($)*10.5),mt.rotation.y=-$,l.add(mt),Xs(l,Math.cos($)*13.5,14+Math.sin($)*13.5,et%2===0)}for(const et of[-1,1])aa(l,et*8,24,1.3),aa(l,et*11,4,1.1);const G=new St,Z=new b(new Nt(2.2,2.6,2),jt);Z.position.y=1.3,G.add(Z);const Y=new b(new Nt(2.8,.16,2.6),yt);Y.position.y=2.72,G.add(Y);const st=new b(new ps(1.3,.8),new wt({color:663592,emissive:4839423,emissiveIntensity:1.2}));st.position.set(0,1.5,1.02),G.add(st),G.position.set(10,0,-4),G.rotation.y=-.5,l.add(G),f.push({x:10,z:-4,r:1.9,h:2.8}),wn(l,"城市登记亭",10,3.8,-4,3.2),w(l,new M(10,2.2,-4),4839423,2),Ys(u,"register",10,-4,4,"城市身份登记","按 E · 接入 Aurelia 城市网络",()=>{st.material.emissive.setHex(6222520),An(["身份采集中……好了，很简单。","从现在起，你是 Aurelia 城市网络的访问者——门禁、磁悬浮、公共终端，都会认得你。"]),di("身份登记完成 · 欢迎接入 Aurelia"),ns(u,"register")}),[[34,-10],[42,28],[30,62]].forEach(([et,$],mt)=>{for(let ce=0;ce<4;ce++){const Se=ce/4*Math.PI*2+mt*.5,Ye=8+(mt*7+ce*5)%13;Vi(l,f,5,Ye,5,Rt,et+Math.cos(Se)*9,$+Math.sin(Se)*9,Se)}const Ot=new b(new pt(5.5,5.5,.12,24),new wt({color:3620911,roughness:.9}));Ot.position.set(et,.06,$),l.add(Ot),aa(l,et-1.5,$,1.2),aa(l,et+1.8,$+1,1),Xs(l,et,$-3.5,!0),Ts(l,et/2,$/2+($>0?7:-7),Math.abs(et),1.2,Math.atan2($,et),16763274,.3)}),wn(l,"居住组团 · 东三区",36,14,28,4.5),Vi(l,f,7,26,7,se,-26,-12,.3),Vi(l,f,6,20,6,se,-34,6,.9),Vi(l,f,5,15,5,se,-22,18,.1);const bt=new b(new Nt(10,1.4,2.2),ut(.35));bt.position.set(-29,12,-3),bt.rotation.y=.75,l.add(bt),wn(l,"中央商业区",-27,22,-4,4.5);const Ut=Vi(l,f,10,9,8,jt,-26,46,.2),ne=new b(new Nt(.9,3.2,.2),new wt({color:862232,emissive:6222520,emissiveIntensity:1.6}));ne.position.set(-26,6,42.05),l.add(ne);const Le=new b(new Nt(3.2,.9,.2),ne.material);Le.position.set(-26,6,42),l.add(Le),wn(l,"Aurelia 医疗中心",-26,11.5,46,4);const Re=oa(l,f,4.2,32,se,-32,-46,{rTop:3.2}),Me=new b(new Ve(4.6,.3,8,32).rotateX(Math.PI/2),Jt);Me.position.set(-32,24,-46),l.add(Me),wn(l,"市政行政塔",-32,35,-46,4.5);for(let et=0;et<3;et++){const $=new St,mt=new b(new pt(.14,.24,5,6),yt);mt.position.y=2.5,$.add(mt);for(let Ot=0;Ot<6;Ot++){const ce=Ot/6*Math.PI*2,Se=new b(new ie(.9,8,6),X);Se.scale.set(1,.16,.55),Se.position.set(Math.cos(ce)*.9,5.1,Math.sin(ce)*.9),Se.rotation.y=-ce,$.add(Se)}$.position.set(-20+et*4.5,0,-68),l.add($),f.push({x:-20+et*4.5,z:-68,r:1.2,h:5.4})}Vi(l,f,6,2.4,2.5,dt,-8,-70,.1),wn(l,"城市能源节点",-16,7.5,-68,4);const ae=[];for(let et=0;et<8;et++){const $=et/8*Math.PI*2;ae.push(new M(Math.cos($)*46,6.5,10+Math.sin($)*56))}const Pt=new Or(ae,!0);l.add(new b(new Ci(Pt,96,.32,8),ko)),l.add(new b(new Ci(Pt,96,.07,6),Jt));for(let et=0;et<8;et++){const $=ae[et],mt=new b(new pt(.18,.26,6.5,8),dt);mt.position.set($.x,3.25,$.z),l.add(mt)}for(let et=0;et<3;et++){const $=new b(new Ge(.5,2.6,4,10),new wt({color:15265266,roughness:.3,metalness:.5,emissive:6740479,emissiveIntensity:.5}));$.rotation.z=Math.PI/2,l.add($);const mt={t:et/3};u.ticks.push(Ot=>{mt.t=(mt.t+Ot*.018+1)%1;const ce=Pt.getPoint(mt.t),Se=Pt.getTangent(mt.t);$.position.copy(ce),$.quaternion.setFromUnitVectors(new M(0,1,0),Se.normalize())})}[[0,-32],[0,36]].forEach(([et,$])=>{const mt=new b(new Nt(8,.4,3),dt);mt.position.set(et,6.3,$),l.add(mt);const Ot=new b(new Nt(9,.2,4),yt);Ot.position.set(et,8.6,$),l.add(Ot);for(const Se of[-1,1]){const Ye=new b(new pt(.12,.12,8.6,6),dt);Ye.position.set(et+Se*4,4.3,$),l.add(Ye)}const ce=new b(new Nt(7,.08,.2),Jt);ce.position.set(et,8.4,$),l.add(ce)}),wn(l,"环城磁悬浮 · 主街站",0,10.2,36,4);for(let et=-80;et<=90;et+=22)Xs(l,-8.5,et,et%44===0),Xs(l,8.5,et+11,et%44!==0);for(let et=0;et<10;et++){const $=et/10*Math.PI*2;oa(l,f,1.2,3.5,yt,Math.cos($)*100,Math.sin($)*100,{seg:8})}const at=new b(new Ve(5,.7,10,32),dt);at.position.set(0,5,-100),l.add(at);const _t=new b(new Ve(5,.2,6,32),Jt);_t.position.set(0,5,-100),l.add(_t),wn(l,"Aurelia 南门 · 着陆区",0,11,-100,4.5),mr(u,13154472,0,14,9,.35),mr(u,9413808,0,14,11,-.28,2),mr(u,12097672,34,-10,3.4,.5,1),mr(u,10137768,-27,0,5,.4,3),ts(u,14252874,12.5,-1.5,-2.2,"安","城市登记官","欢迎来到 Aurelia。第一次来？先去登记亭按个印，城市才会认得你。",[{q:"登记有什么用？",a:"接入城市网络之后，门禁、磁悬浮、公共终端都会对你开放。一句话：从游客，变成客人。"},{q:"这座城市住了多少人？",a:"登记人口四十二万，火星最多。三代人在这里出生——对他们来说，地球才是远方。"},{q:"你在这里多久了？",a:"十一年。看着主街从一条临时通道，长成现在这个样子。"}],void 0,{xdIntro:"这位是安，Aurelia 的城市登记官。每个新移民的第一站，都从她这里开始。"}),ts(u,13154472,34,-4,2.6,"陈栖","火星居民 · Aurelia 第三代","新面孔？坐早班电梯下来的吧。",[{q:"你出生在火星？",a:"嗯，第三号穹顶。小时候洗澡要计时，现在循环系统好了，能痛快淋浴。"},{q:"这里生活方便吗？",a:"吃穿住行都在穹顶里解决。下班去广场喝杯合成咖啡，看纪念碑的灯——这就是日常。"}],void 0,{wander:1.4,xdIntro:"陈栖，在火星出生的第三代。对他来说，地球只是课本上的地方。"}),ts(u,9417944,-28,-42,.8,"岚","城市服务 · 行政塔","行政塔今天人不多，运气不错。",[{q:"你在管理什么？",a:"水、电、气的调度，还有磁悬浮的班次。城市不是机器，是一百万个待办事项。"},{q:"城市谁在做决定？",a:"居民议会加 AI 辅助。地球那一套搬过来改一改——火星有自己的规矩。"}],void 0,{xdIntro:"岚负责行政塔的调度。整座城的水、电、气，都过她的手。"}),es(u,"walk","沿主街走到中央广场",0,14),es(u,"register","完成城市身份登记",10,-4),es(u,"talk","与两位市民交谈",34,-4),u.ticks.push(()=>{!u.tasks[0].done&&Mt.player&&Math.hypot(Mt.player.pos.x,Mt.player.pos.z-14)<11&&ns(u,"walk")})},Kf=function(u){const l=u.scene=Tl(1318938,4021318,60,300,15267032);u.bounds=98,u.spawn={x:0,z:-84,yaw:0},u.intro=["Verde——红色荒漠里长出来的一整块森林。","水、光、温度，是这座城的三根命脉。","帮我个忙：把三处调节点都跑一遍，你就知道这座城是怎么呼吸的。"],u.guide=[{x:0,z:8,r:16,text:"中央湖——整座城的水，从这里开始循环。"},{x:26,z:30,r:13,text:"垂直栽培塔。火星的蔬菜和氧气，大多来自这里。"},{x:-34,z:42,r:12,text:"温控环。夜里它给整个穹顶保温，作物才熬得过火星的寒夜。"}],u.idleHint="中央湖、栽培塔、温控环——这座城的呼吸都在这几处，去转转吧。";const f=u.colliders;u.groundMesh=Al(l,120,5916210);const x=new b(new ai(96,64).rotateX(-Math.PI/2),new wt({color:3757114,roughness:.95,bumpMap:tt,bumpScale:.02}));x.position.y=.02,l.add(x);const T=Yt(100,.1);l.add(T);const L=new wt({color:3121128,roughness:.12,metalness:.2,emissive:1732544,emissiveIntensity:.5}),U=new b(new ai(13,40).rotateX(-Math.PI/2),L);U.position.set(0,.06,8),l.add(U);const W=new wt({color:3121128,roughness:.15,emissive:1732544,emissiveIntensity:.35}),D=new b(new Ve(30,1.5,8,72).rotateX(Math.PI/2),W);D.position.set(0,.08,8),l.add(D),u.ticks.push((Pt,at)=>{U.position.y=.06+Math.sin(at*.8)*.015,D.position.y=.08+Math.sin(at*.8+1)*.012});for(const[Pt,at]of[[16,16],[-16,16]]){const _t=new St,et=new b(new pt(1.4,1.9,9,12),jt);et.position.y=4.5,_t.add(et);for(let $=0;$<3;$++){const mt=new b(new Ve(1.7,.16,6,24).rotateX(Math.PI/2),W);mt.position.y=2.4+$*2.6,_t.add(mt)}_t.position.set(Pt,0,at),l.add(_t),f.push({x:Pt,z:at,r:2.2,h:9})}wn(l,"水循环塔",16,11,16,3.5);const F=Vi(l,f,3.4,2.6,2.8,dt,12,-4,.4),G=new b(new pt(.3,.3,7,8),dt);G.position.set(8,.4,1),G.rotation.z=Math.PI/2,G.rotation.y=.7,l.add(G),wn(l,"循环泵站",12,3.6,-4,3);const Z=[],Y=[];[[26,30],[-26,30],[26,-16],[-26,-16]].forEach(([Pt,at],_t)=>{const et=new St,$=new b(new pt(.5,.6,10,8),dt);$.position.y=5,et.add($);for(let mt=0;mt<7;mt++){const Ot=new wt({color:4173423,emissive:3120735,emissiveIntensity:.7,roughness:.7});Z.push(Ot);const ce=new b(new pt(3.4-mt*.28,3.4-mt*.28,.35,16),Ot);ce.position.y=1+mt*1.3,et.add(ce);const Se=new b(new Ve(3.1-mt*.28,.07,6,24).rotateX(Math.PI/2),new wt({color:2759210,emissive:12614399,emissiveIntensity:.8}));Se.position.y=1.32+mt*1.3,et.add(Se),Y.push(Se.material)}et.position.set(Pt,0,at),l.add(et),f.push({x:Pt,z:at,r:3.8,h:10.5})}),wn(l,"垂直栽培塔群",26,12,30,4.5);const gt=Vi(l,f,1.6,1.3,.8,yt,22,26,-.6),bt=new b(new ps(1.1,.7),new wt({color:1706528,emissive:12614399,emissiveIntensity:1.1}));bt.position.set(22,1.1,25.55),bt.rotation.y=-.6+Math.PI,l.add(bt);const Ut=[];for(let Pt=0;Pt<6;Pt++)for(let at=0;at<10;at++)Ut.push({p:new M(20+at*2.6,.35,44+Pt*3.2),s:new M(.5,.7+(Pt+at)%3*.2,.5)});const ne=Rn(new Ai(1,1,7),Lt,Ut);l.add(ne);for(let Pt=0;Pt<6;Pt++)Ts(l,31.7,44+Pt*3.2+1.6,26,.5,0,4839423,.25);wn(l,"培育田 · 三号区",32,4,54,4),[[-36,-32],[-48,-16],[-32,-48]].forEach(([Pt,at])=>{const _t=Yt(6,.18);_t.position.set(Pt,0,at),l.add(_t);const et=new b(new ie(4.6,14,8,0,Math.PI*2,0,Math.PI/2),Tt);et.scale.y=.4,et.position.set(Pt,.05,at),l.add(et),f.push({x:Pt,z:at,r:6.2,h:5});const $=new b(new pt(.8,.8,Math.hypot(Pt,at-8)-6,8),ut(.22));$.position.set(Pt/2,1,(at-8)/2+4),$.rotation.z=Math.PI/2,$.rotation.y=-Math.atan2(at-8,Pt),l.add($)}),wn(l,"链式温室",-38,7.5,-30,4);const Le=new St,Re=new b(new pt(1.6,2.2,14,12),jt);Re.position.y=7,Le.add(Re);const Me=[];for(let Pt=0;Pt<4;Pt++){const at=new b(new Ve(2.1,.18,8,28).rotateX(Math.PI/2),new wt({color:1714720,emissive:8247551,emissiveIntensity:1.2}));at.position.y=3+Pt*3,Le.add(at),Me.push(at.material)}Le.position.set(-34,0,42),l.add(Le),f.push({x:-34,z:42,r:2.6,h:14}),w(l,new M(-34,15,42),8247551,3),wn(l,"气候控制塔",-34,16.5,42,4);for(let Pt=0;Pt<6;Pt++){const at=-16+Pt*6.4,_t=-56-Pt%2*6,et=new b(new Ge(1.7,3.4,4,12).rotateZ(Math.PI/2),jt);et.position.set(at,1.7,_t),l.add(et),f.push({x:at,z:_t,r:3.2,h:3.4});const $=new b(new Nt(.8,.5,.1),new wt({color:2761752,emissive:16763256,emissiveIntensity:1.4}));$.position.set(at,1.9,_t+1.75),l.add($)}wn(l,"湖岸居住荚",0,5.5,-58,4);const ae=[];for(let Pt=0;Pt<160;Pt++){const at=d()*Math.PI*2,_t=36+Math.sqrt(d())*56;ae.push({p:new M(Math.cos(at)*_t,.8,8+Math.sin(at)*_t*.9),s:new M(.6,1.6+d()*1.2,.6)})}l.add(Rn(new Ai(1,1,7),Tt,ae));for(let Pt=0;Pt<10;Pt++){const at=Pt/10*Math.PI*2;Xs(l,Math.cos(at)*24,8+Math.sin(at)*24,!1)}mr(u,9417944,0,8,19,.3),mr(u,10137768,0,8,21,-.24,2),ts(u,5752709,24,26,-2.4,"苔","植物学家","轻一点——这边的秧苗昨天刚醒。",[{q:"这些植物吃什么光？",a:"定制光谱，一种作物一档。红光管生长，蓝光管叶片——比地球上的太阳还讲究。"},{q:"火星土壤能种东西吗？",a:"能，但要先洗盐、调菌。你脚下这片田，五年前还是消毒过的风化层。"}],9437118,{xdIntro:"苔是植物学家。穹顶下这片绿意，大半是她的作品。"}),ts(u,9417944,14,12,2.8,"沐","生态工程师","听到水泵的声音了吗？那是这座城的呼吸。",[{q:"水从哪里来？",a:"极地冰层，净化后进循环塔。城里每一滴水，一年要循环三百多次。"},{q:"系统会出故障吗？",a:"会，所以我们轮班守着。生态不是装好的机器，是每天都要照顾的活物。"}],void 0,{xdIntro:"沐，生态工程师。这座城的水、光和温度，都是他在维持。"}),ts(u,13154472,-7,-8,1.2,"阿禾","居民","我每天下班，都来湖边坐一会儿。",[{q:"住在穹顶里什么感觉？",a:"像住在一个巨大的温室里。抬头是玻璃，低头是泥土——但空气是甜的。"},{q:"想地球吗？",a:"我女儿出生在这里。对她来说，有树有湖的地方就是家，不用想。"}],void 0,{wander:1.4,xdIntro:"阿禾住在湖岸居住荚。Verde 最普通的一天，就是这样的。"}),Ys(u,"water",12,-4,4,"水循环阀","按 E · 增大循环流量",()=>{W.emissiveIntensity=1.2,L.emissiveIntensity=1,An(["阀门开了——听，水声变大了。","这两万年前冻住的冰，现在是这座城的河。"]),di("水循环流量 +40% · 运河水位上升"),ns(u,"water")}),Ys(u,"light",22,26,4,"光谱灯阵","按 E · 校准作物流光光谱",()=>{Z.forEach(Pt=>Pt.emissiveIntensity=1.6),Y.forEach(Pt=>Pt.emissiveIntensity=2.4),bt.material.emissive.setHex(6222520),An(["光谱校准完成。这批生菜的收成，会比上周好一成。","在火星，阳光也是可以调出来的。"]),di("光谱校准完成 · 栽培塔全功率运行"),ns(u,"light")}),Ys(u,"temp",-34,42,4.4,"温控环","按 E · 上调穹顶夜间温度",()=>{Me.forEach(Pt=>{Pt.emissive.setHex(16757351),Pt.emissiveIntensity=1.8}),l.fog.color.setHex(6050368),l.background.setHex(2104338),An(["温度上调两度。今晚，田里的作物可以睡个好觉。","你刚刚做的，就是 Verde 居民每天在做的事——亲手维持一个世界。"]),di("穹顶温度 +2°C · 气候系统平衡"),ns(u,"temp")}),es(u,"water","调节水循环阀",12,-4),es(u,"light","校准光谱灯阵",22,26),es(u,"temp","调整温控环",-34,42)},Zf=function(u){const l=u.scene=Tl(1576970,5518366,70,360,16767152);u.bounds=112,u.spawn={x:0,z:-88,yaw:0},u.intro=["Hephaestus——火星的锻造炉。","看见那条产线了吗？红土进去，钢和燃料出来。","来，亲手启动一次：原料 → 处理 → 输出。跟着光柱。"],u.guide=[{x:0,z:12,r:14,text:"聚变能源塔——这座城的心脏，也是半个火星的电源。"},{x:48,z:20,r:14,text:"星舰总装厂房。下一艘回地球的船，就在这里造。"},{x:34,z:52,r:13,text:"液氢储罐区。火星的工业血液，全存在这里。"}],u.idleHint="能源塔在东边，总装厂房在更东边。跟着光柱走，小心脚下的传送带。";const f=u.colliders;u.groundMesh=Al(l,128,4863012);const x=new b(new ai(104,56).rotateX(-Math.PI/2),new wt({color:3025962,roughness:.8,metalness:.2,bumpMap:tt,bumpScale:.02}));x.position.y=.02,l.add(x),uo(l,0,-40,10,100),uo(l,0,10,130,8),Ts(l,0,-40,.5,100,0,16747578,.6),Ts(l,0,10,130,.4,0,16747578,.5);const T=new St,L=new b(new pt(3,4.6,30,12),dt);L.position.y=15,T.add(L);const U=new b(new pt(1.5,1.5,31,10),Jt);U.position.y=15.5,T.add(U);const W=new b(new Ve(3.8,.6,8,28).rotateX(Math.PI/2),ft);W.position.y=30.5,T.add(W);const D=w(T,new M(0,31,0),8382463,10);T.position.set(0,0,12),l.add(T),f.push({x:0,z:12,r:5.2,h:32}),wn(l,"聚变能源塔",0,35,12,6),u.ticks.push((zt,Bt)=>{const $t=9+Math.sin(Bt*(u.coreDone?5:2.2))*1.6;D.scale.set($t,$t,1)});const F=new b(new pt(1.2,3.2,5,4),ft);F.position.set(-46,6.5,-20),F.rotation.y=Math.PI/4,l.add(F);const G=new b(new Nt(4.4,4,4.4),yt);G.position.set(-46,2,-20),l.add(G),f.push({x:-46,z:-20,r:3.4,h:9});const Z=[];for(let zt=0;zt<14;zt++){const Bt=d()*Math.PI*2,$t=3.5+d()*3;Z.push({p:new M(-46+Math.cos(Bt)*$t,.3+d()*.4,-26+Math.sin(Bt)*$t),s:new M(.6+d()*.8,.5+d()*.6,.6+d()*.8),ry:d()*3})}l.add(Rn(new rl(1,0),new wt({color:9062960,roughness:1}),Z));const Y=new b(new Nt(.5,.3,.5),new wt({color:1707272,emissive:16747578,emissiveIntensity:.6}));Y.position.set(-46,9.4,-20),l.add(Y),wn(l,"原料输入站",-46,11.5,-20,4);const st=new Or([new M(-43,1.1,-18),new M(-24,1.1,-12),new M(-6,1.1,-6)]);l.add(new b(new Ci(st,24,.7,8),yt));const gt=[];for(let zt=0;zt<6;zt++){const Bt=new b(new Nt(.8,.6,.8),new wt({color:10115640,roughness:.9}));l.add(Bt),gt.push({mesh:Bt,t:zt/6})}let bt=!1;u.ticks.push(zt=>{if(bt)for(const Bt of gt)Bt.t=(Bt.t+zt*.06)%1,Bt.mesh.position.copy(st.getPoint(Bt.t)),Bt.mesh.position.y+=.75});const Ut=Vi(l,f,12,10,9,ft,2,-6,.1),ne=new wt({color:2757640,emissive:16738848,emissiveIntensity:.7}),Le=new b(new ps(5,3),ne);Le.position.set(2,2.2,-10.56),Le.rotation.y=Math.PI,l.add(Le);const Re=oa(l,f,1.2,16,yt,7,-3,{rTop:.8}),Me=w(l,new M(7,16.5,-3),16740416,2.5);u.ticks.push((zt,Bt)=>{const $t=2.2+Math.sin(Bt*7)*.5;Me.scale.set($t,$t,1)});for(let zt=0;zt<4;zt++){const Bt=new b(new pt(.35,.35,10,8),dt);Bt.position.set(-4+zt*3.4,5.5,-.5),Bt.rotation.x=Math.PI/2,l.add(Bt)}wn(l,"资源处理中心",2,12.5,-6,4.5);const ae=Vi(l,f,2,1.4,1,yt,8,-12,.3),Pt=new b(new ps(1.4,.8),new wt({color:2101256,emissive:16747578,emissiveIntensity:1}));Pt.position.set(8,1.35,-12.6),Pt.rotation.y=Math.PI+.3,l.add(Pt);const at=new b(new pt(4,4.4,.5,20),dt);at.position.set(30,.25,2),l.add(at),wn(l,"能源输出平台",30,4.5,2,4);const _t=new b(new pt(7,7,16,20,1,!1,0,Math.PI).rotateZ(Math.PI/2).rotateY(Math.PI/2),yt);_t.position.set(48,0,20),l.add(_t),f.push({x:48,z:20,r:8.5,h:7});const et=new St,$=new b(new pt(1.6,1.6,12,14),new wt({color:15922422,roughness:.35,metalness:.4}));$.position.y=6,et.add($);const mt=new b(new Ai(1.6,3.5,14),yt);mt.position.y=13.8,et.add(mt);for(let zt=0;zt<4;zt++){const Bt=zt/4*Math.PI*2+Math.PI/4,$t=new b(new pt(.2,.28,3.4,6),yt);$t.position.set(Math.cos(Bt)*2.4,1.7,Math.sin(Bt)*2.4),$t.rotation.z=Math.cos(Bt)*.3,$t.rotation.x=-Math.sin(Bt)*.3,et.add($t)}const Ot=w(et,new M(0,-.5,0),8374527,.01);et.position.set(48,0,8),l.add(et),f.push({x:48,z:8,r:3,h:15}),wn(l,"星舰总装厂房",48,12,20,5);for(let zt=0;zt<6;zt++){const Bt=.4+zt/6*Math.PI*1.2,$t=34+Math.cos(Bt)*16,qe=52+Math.sin(Bt)*12,sn=new St,Sn=new b(new ie(3.4,16,12),dt);Sn.position.y=4.6,sn.add(Sn);for(let ti=0;ti<3;ti++){const js=ti/3*Math.PI*2,Hi=new b(new pt(.24,.24,2.6,6),yt);Hi.position.set(Math.cos(js)*2.2,1.3,Math.sin(js)*2.2),sn.add(Hi)}sn.position.set($t,0,qe),l.add(sn),f.push({x:$t,z:qe,r:3.8,h:8})}wn(l,"液氢储罐区",34,10,52,4.5);const ce=new b(new pt(.5,.5,36,8),dt);ce.position.set(20,1.2,30),ce.rotation.x=Math.PI/2.6,l.add(ce);const Se=[new M(-62,7,66),new M(0,7.6,70),new M(62,7,66)],Ye=new Or(Se);l.add(new b(new Ci(Ye,32,.3,8),dt));for(let zt=0;zt<5;zt++){const Bt=new b(new pt(.22,.3,7,6),yt),$t=Ye.getPoint(zt/4);Bt.position.set($t.x,3.5,$t.z),l.add(Bt)}const xn=new b(new Nt(3.2,1.6,1.8),ft);l.add(xn);const Je={t:0};u.ticks.push(zt=>{Je.t=(Je.t+zt*.05)%1;const Bt=Je.t<.5?Je.t*2:2-Je.t*2;xn.position.copy(Ye.getPoint(Bt)),xn.position.y+=.9}),wn(l,"真空货运线 · 4 号",0,10.5,70,4);for(const[zt,Bt,$t]of[[-24,26,.6],[18,34,2.4]]){const qe=new St,sn=new b(new pt(.4,.55,14,8),dt);sn.position.y=7,qe.add(sn);const Sn=new b(new Nt(11,.5,.5),ft);Sn.position.set(4,14,0),qe.add(Sn);const ti=new b(new pt(.08,.08,4,4),yt);ti.position.set(8,11.8,0),qe.add(ti),qe.position.set(zt,0,Bt),qe.rotation.y=$t,l.add(qe),f.push({x:zt,z:Bt,r:1.2,h:14})}const Ze=[];for(let zt=0;zt<26;zt++)Ze.push({p:new M(-30+zt%7*2.6,.75+Math.floor(zt/14)*1.55,44+Math.floor(zt/7)%2*2.4),s:new M(2.2,1.4,1.2),ry:(d()-.5)*.15});l.add(Rn(new Nt(1,1,1),ft,Ze)),f.push({x:-22,z:45,r:10,h:3});for(let zt=0;zt<3;zt++){const Bt=oa(l,f,.8,13,yt,-58+zt*5,18+zt*3,{rTop:.5}),$t=w(l,new M(-58+zt*5,14,18+zt*3),16748608,2.4);u.ticks.push((qe,sn)=>{const Sn=2+Math.sin(sn*5+zt*2.1)*.7;$t.scale.set(Sn,Sn,1)})}for(let zt=0;zt<3;zt++){const Bt=new St,$t=new b(new Nt(1.2,.6,.9),ft);$t.position.y=.55,Bt.add($t);const qe=new b(new Nt(.25,.18,.18),Jt);qe.position.set(.62,.6,0),Bt.add(qe);for(const sn of[-1,1])for(const Sn of[-1,1]){const ti=new b(new pt(.07,.07,.5,5),yt);ti.position.set(sn*.45,.22,Sn*.32),Bt.add(ti)}l.add(Bt),u.walkers.push({mesh:Bt,cx:-10+zt*14,cz:22,r:6,speed:.4+zt*.12,phase:d()*6})}for(let zt=-70;zt<=60;zt+=26)Xs(l,-7,zt,!1),Xs(l,7,zt+13,!1);ts(u,14252874,5,-11,2.4,"卡尔","冶炼工程师","小心脚下的管线。今天炉子状态不错。",[{q:"这里在造什么？",a:"飞船构件、穹顶材料、机器人零件。八成原料来自火星本地——红土就是我们的矿。"},{q:"原料从哪来？",a:"西边矿带的风化层，还有 Glacies 的冰。进来是石头和冰，出去是钢和燃料。"}],void 0,{xdIntro:"卡尔是冶炼工程师。红土变成钢，就是他每天的活。"}),ts(u,9417944,10,-13.5,-.6,"薇","产线技术员","控制台别乱碰——哦，你有权限？那行。",[{q:"这条产线多久出一批？",a:"七十二小时一批构件，全流程无人化。我只负责盯着数据，别打瞌睡。"},{q:"机器人比人多吗？",a:"多得多。这座城常住人口不到两万，机器人二十万。我们是来当脑子的。"}],void 0,{xdIntro:"薇盯着这条产线。从原料到成品，一步都不能出错。"}),ts(u,13154472,27,7,-1.8,"诺","物流调度员","下一班货运舱，四十分钟后发车。",[{q:"货都运去哪？",a:"首都、Verde、轨道港。燃料北上，构件上电梯——火星的物流，一天都没停过。"},{q:"火箭多久发一次？",a:"每周三班往返 Areos Gate。你要是想上轨道，得提前三个月排队。"}],void 0,{wander:1.2,xdIntro:"诺负责物流调度。整座城的物资流转，都在他脑子里。"}),Ys(u,"input",-46,-20,4.6,"原料输入站","按 E · 投入风化层原料",()=>{bt=!0,Y.material.emissive.setHex(6222520),Y.material.emissiveIntensity=1.8,An(["原料入线。听——传送带动起来了。","这些红色的石头，两个小时以后就是钢。"]),di("原料已入线 · 传送系统启动"),ns(u,"input")}),Ys(u,"process",8,-12,4,"处理控制台","按 E · 启动冶炼流程",()=>{ne.emissiveIntensity=2.6,Pt.material.emissive.setHex(6222520),Ut.material=ft.clone(),Ut.material.emissiveIntensity=1.2,An(["冶炼炉点火。1600 度——风化层正在分解、提纯、成型。","火星不伸手向地球要东西。它自己造。"]),di("冶炼流程运行中 · 产出构件毛坯"),ns(u,"process")},()=>u.tasks.find(zt=>zt.id==="input").done),u.interact.at(-1).lockedText="需要先在原料输入站投料（西边，跟着光柱）。",Ys(u,"output",30,2,4.4,"能源输出平台","按 E · 并网输出",()=>{Ot.userData.base=6,u.ticks.push((zt,Bt)=>{const $t=5+Math.sin(Bt*9)*1.2;Ot.scale.set($t,$t,1)}),An(["并网成功——这批能源，今晚会点亮 Aurelia 的主街。","石头、冰、阳光。这颗星球用自己的东西，养活了自己。"]),di("能源并网输出 · 流程贯通"),ns(u,"output")},()=>u.tasks.find(zt=>zt.id==="process").done),u.interact.at(-1).lockedText="需要先启动处理中心的冶炼流程。",es(u,"input","启动原料输入",-46,-20),es(u,"process","启动资源处理",8,-12),es(u,"output","完成能源输出",30,2)},cd=function(u){if(qt==="surface"||!Il[u])return;if(hi(),te=null,ao=!1,!El[u]){const f=qf(u);Il[u](f),Yf(f),El[u]=f}const l=El[u];Mt.id=u,Mt.city=l,Mt.talked.clear(),la(),l.guide.forEach(f=>f.seen=!1),l.npcs.forEach(f=>{f.introSeen=!1}),Mt.guideCD=0,Mt.idleT=0,Mt.avatar=bl.mount(l.scene,1),Mt.player||(Mt.player=new Xf(Mt.avatar)),Mt.avatar.setVisible(!0),Mt.player.teleport(l.spawn.x,l.spawn.z,l.spawn.yaw),Mt.player.third=!0,Mt.player.dist=5.4,Mt.player.pitch=-.22,qt="surface",He=null,r.enabled=!1,r.autoRotate=!1,a.scene=l.scene,i.up.set(0,1,0),i.fov=50,i.updateProjectionMatrix(),Ke.style.display="none",document.getElementById("nav").style.display="none",document.getElementById("actions").style.display="none",document.getElementById("stats").style.display="none",document.getElementById("titleBox").style.display="none",ue.style.display="none",Mt.tabOpen=!1,ke.style.display="none",Oi.classList.add("on"),fn.textContent=ho[u].name+" · 地表",document.getElementById("exploreHint").textContent="W A S D / 点击地面 移动 · 鼠标移动 环视 · Shift 加速 · 空格 跳跃 · E 交互/交谈 · V 视角 · Tab 城市档案",Es(),Zo(),Te.char&&(Te.char.visible=!1),Cl(),di("已着陆 · "+ho[u].name),An(l.intro)},As=function(){if(qt!=="surface")return;qt="planet";const u=Mt.city;Mt.avatar.detach(),la(),Zo(),Oi.classList.remove("on"),In.classList.remove("on"),yl.classList.remove("on"),i.fov=48,i.updateProjectionMatrix(),a.scene=n,Mt.id=null,Mt.city=null,document.getElementById("nav").style.display="",document.getElementById("actions").style.display="",document.getElementById("stats").style.display="",document.getElementById("titleBox").style.display="",ue.style.display="",ke.style.display="",ke.textContent="拖动旋转 · 滚轮缩放 · 点击城市进入",r.minDistance=64,r.maxDistance=700,r.target.set(0,0,0);const l=E.find(f=>f.id===(u?u.id:"capital"))||E[0];De(l.dir.clone().multiplyScalar(170).add(new M(0,40,0)),new M(0,0,0),2.2,()=>{r.autoRotate=!0})},$f=function(u,l){const f=Mt.city,x=Mt.player;if(!f||!x)return;x.update(u,f.colliders,f.bounds),x.updateCamera(i,u,f.colliders);for(const D of f.ticks)D(u,l);for(const D of f.walkers)D.phase+=u*D.speed,D.mesh.position.set(D.cx+Math.cos(D.phase)*D.r,Math.abs(Math.sin(D.phase*6))*.03,D.cz+Math.sin(D.phase)*D.r),D.mesh.rotation.y=-D.phase;f.beacon&&f.beacon.visible&&(f.beacon.material.opacity=.08+Math.sin(l*2.4)*.04,f.beacon.rotation.y+=u*.4);let T=null,L=4.2;for(const D of f.interact){const F=Math.hypot(x.pos.x-D.x,x.pos.z-D.z);F<(D.r||L)&&F<L&&(L=F,T=D)}if(Mt.nearInteract=T,Mt.guideCD=Math.max(0,(Mt.guideCD||0)-u),Mt.guideCD<=0&&!Te.queue.length&&Mt.snpcMode==="none"){for(const D of f.guide)if(!D.seen&&Math.hypot(x.pos.x-D.x,x.pos.z-D.z)<D.r){D.seen=!0,An(D.text),Mt.guideCD=7;break}}x.vel.lengthSq()>.3||Mt.snpcMode!=="none"||Te.queue.length?Mt.idleT=0:Mt.idleT=(Mt.idleT||0)+u,Mt.idleT>28&&!Te.queue.length&&(Mt.idleT=0,An(f.idleHint||"附近还有地方值得看看。跟着我，或者随便逛逛。"));let U=null,W=3.6;for(const D of f.npcs){D.workPhase+=u;const F=D.mesh.userData.arms;F&&(F[0].rotation.x=Math.sin(D.workPhase*1.6)*.35,F[1].rotation.x=Math.sin(D.workPhase*1.6+1.2)*.35),D.mesh.position.y=Math.abs(Math.sin(D.workPhase*2))*.02;const G=Math.hypot(x.pos.x-D.x,x.pos.z-D.z);if(D.wander>0&&G>6&&(D.movePhase+=u*D.wanderSpeed,D.x=D.hx+Math.cos(D.movePhase)*D.wander,D.z=D.hz+Math.sin(D.movePhase)*D.wander,D.mesh.position.x=D.x,D.mesh.position.z=D.z,G>=8)){let Y=Math.atan2(-Math.sin(D.movePhase),Math.cos(D.movePhase))-D.mesh.rotation.y;for(;Y>Math.PI;)Y-=Math.PI*2;for(;Y<-Math.PI;)Y+=Math.PI*2;D.mesh.rotation.y+=Y*Math.min(1,u*3)}if(G<8){Dl.set(x.pos.x-D.x,0,x.pos.z-D.z);let Y=Math.atan2(Dl.x,Dl.z)-D.mesh.rotation.y;for(;Y>Math.PI;)Y-=Math.PI*2;for(;Y<-Math.PI;)Y+=Math.PI*2;D.mesh.rotation.y+=Y*Math.min(1,u*5)}G<W&&(W=G,U=D),D.xdIntro&&!D.introSeen&&G<6&&Mt.guideCD<=0&&!Te.queue.length&&Mt.snpcMode==="none"&&(D.introSeen=!0,An(D.xdIntro),Mt.guideCD=6)}if(T||U&&(Mt.snpc!==U&&Mt.snpcMode==="none"||Mt.snpc!==U&&Mt.snpc)&&Pl(U),Mt.snpc&&Math.hypot(x.pos.x-Mt.snpc.x,x.pos.z-Mt.snpc.z)>4.6&&la(),T&&Mt.snpcMode==="none"){const D=!T.enabledFn||T.enabledFn();qn.textContent=T.title,Un.textContent=D?T.prompt:T.lockedText||"需要先完成前置步骤。",In.classList.add("on")}else Mt.snpcMode==="none"&&In.classList.remove("on");od(u)},dd=function(){requestAnimationFrame(dd);const u=Math.min(hd.getDelta(),.05),l=hd.elapsedTime;if(te){te.t+=u/te.dur;const f=mn(Math.min(te.t,1));if(i.position.lerpVectors(te.fromP,te.toP,f),r.target.lerpVectors(te.fromT,te.toT,f),te.t>=1){const x=te.cb;te=null,r.enabled=!0,x&&x()}}if(r.update(),Si+=(Qi-Si)*Math.min(1,u*3.5),Math.abs(Qi-Si)<.002&&(Si=Qi),we.visible=Si>.02,Kt.opacity=1-.8*Si,Vt.opacity=1-.85*Si,_e.opacity=.55*(1-Si),hn.opacity=.62*Si,Ie.opacity=.5*Si,Si===0&&Kt.transparent&&(Kt.transparent=!1,Kt.opacity=1,Kt.needsUpdate=!0),we.rotation.y+=u*.015,Cn.forEach((f,x)=>{f.userData.arm.rotation.z=-.7+Math.sin(l*1.4+x)*.25}),Ee.rotation.y+=u*.004,yn.rotation.y+=u*.006,Ae.rings.forEach((f,x)=>{f.rotation.z+=u*(.25+x*.12)}),Ae.glows.forEach((f,x)=>{const T=f.userData.base*(1+Math.sin(l*2+x*1.7)*.07);f.scale.set(T,T,1)}),Ae.drones.forEach(f=>{f.phase+=u*f.speed,f.mesh.position.set(Math.cos(f.phase)*f.r,f.y+Math.sin(l*.8+f.phase)*.15,Math.sin(f.phase)*f.r),f.mesh.rotation.y=-f.phase}),Ae.pods.forEach(f=>{if(f.t=(f.t+u*f.speed*.15)%1,f.kind==="circle"){const x=f.t*Math.PI*2;f.mesh.position.set(Math.cos(x)*f.r,f.y,Math.sin(x)*f.r),f.mesh.rotation.y=-x}else{const x=f.t<.5?f.t*2:2-f.t*2;f.mesh.position.x=f.x0+(f.x1-f.x0)*x}}),Ae.liners.forEach(f=>{f.t=(f.t+u*f.speed+1)%1;const x=f.curve.getTangent(f.t);f.mesh.position.copy(f.curve.getPoint(f.t)),f.mesh.quaternion.setFromUnitVectors(new M(0,1,0),x.normalize())}),Ae.walkers.forEach(f=>{f.phase+=u*f.speed,f.mesh.position.set(f.cx+Math.cos(f.phase)*f.r,.3+Math.abs(Math.sin(f.phase*6))*.03,f.cz+Math.sin(f.phase)*f.r),f.mesh.rotation.y=-f.phase}),Ae.climber){const f=(Math.sin(l*.25)+1)/2;Ae.climber.mesh.position.lerpVectors(Ae.climber.a,Ae.climber.b,f)}Ae.ships.forEach(f=>{f.phase+=u*f.speed;const x=Math.cos(f.phase)*f.r,T=Math.sin(f.phase)*f.r;f.mesh.position.set(x,Math.sin(f.phase*2)*f.r*Math.sin(f.tilt)*.2+8,T),f.mesh.rotation.y=-f.phase}),Ae.moons.forEach(f=>{f.pivot.rotation.y+=u*f.speed,f.mesh.rotation.y+=u*f.spin}),qt==="explore"?Vf(u,l):qt==="surface"&&$f(u,l),o.render()};const t=document.getElementById("scene"),e=new my({canvas:t,antialias:!0});e.setPixelRatio(Math.min(devicePixelRatio,2)),e.setSize(innerWidth,innerHeight),e.toneMapping=uh,e.toneMappingExposure=1.1;const n=new Bd;n.background=new be(132106);const i=new li(48,innerWidth/innerHeight,.05,8e3);i.position.set(-40,90,340);const r=new _y(i,e.domElement);r.enableDamping=!0,r.dampingFactor=.06,r.minDistance=64,r.maxDistance=700,r.autoRotate=!0,r.autoRotateSpeed=.45,r.mouseButtons={LEFT:gs.ROTATE,MIDDLE:gs.DOLLY,RIGHT:gs.PAN},r.touches={ONE:Fs.ROTATE,TWO:Fs.DOLLY_PAN};const o=new Ny(e),a=new Fy(n,i);o.addPass(a);const h=new Zr(new Dt(innerWidth,innerHeight),.5,.45,.82);o.addPass(h),o.addPass(new By);const c=new M(.78,.32,.54).normalize(),p=new hu(16773341,2.4);p.position.copy(c).multiplyScalar(400),n.add(p),n.add(new du(4608874,.32)),n.add(new ou(9417944,3810328,.35));{const u=new ch(e);n.environment=u.fromEquirectangular(m()).texture,u.dispose()}const d=g(2126),y=(u,l,f)=>Math.max(l,Math.min(f,u)),S=(u,l,f)=>{const x=y((f-u)/(l-u),0,1);return x*x*(3-2*x)},v=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],_=new Uint8Array(256);for(let u=0;u<256;u++)_[u]=u;for(let u=255;u>0;u--){const l=d()*(u+1)|0,f=_[u];_[u]=_[l],_[l]=f}const I=new Uint8Array(512),P=new Uint8Array(512);for(let u=0;u<512;u++)I[u]=_[u&255],P[u]=I[u]%12;const A=1/3,O=1/6,V=Math.PI/180,E=[{id:"capital",lat:14,lon:-38},{id:"industrial",lat:-6,lon:32},{id:"eco",lat:26,lon:102},{id:"mining",lat:52,lon:-96},{id:"frontier",lat:-28,lon:158},{id:"research",lat:8,lon:-122}];E.forEach(u=>u.dir=C(u.lat,u.lon));const z=[];let Q=0;for(;z.length<110&&Q++<4e3;){const u=(d()*2-1)*58,l=d()*360-180,f=d()>.93?6.5+d()*4:.8+Math.pow(d(),2.4)*6,x=C(u,l);let T=!0;for(const U of E)if(x.angleTo(U.dir)/V<f+9){T=!1;break}if(!T)continue;const L=.22+f*.15;z.push({x:x.x,y:x.y,z:x.z,rRad:f*V,cosR:Math.cos(f*V),depth:L,rim:L*.5,peak:f>4?L*.35:0})}for(Q=0;z.length<410&&Q++<6e3;){const u=(d()*2-1)*60,l=d()*360-180,f=.25+d()*1.3,x=C(u,l);let T=!0;for(const U of E)if(x.angleTo(U.dir)/V<f+8){T=!1;break}if(!T)continue;const L=.1+f*.14;z.push({x:x.x,y:x.y,z:x.z,rRad:f*V,cosR:Math.cos(f*V),depth:L,rim:L*.55,peak:0})}const it=C(18.4,-133.8),rt=C(-2,-108),xt=C(-43,69),lt=new M(.72,.25,.64).normalize(),Ct=new St;n.add(Ct);const Xt=new ie(50,256,256);{const u=Xt.attributes.position,l=new Float32Array(u.count*3),f=new M;for(let x=0;x<u.count;x++){f.fromBufferAttribute(u,x);const T=f.clone().normalize(),L=vt(T);f.copy(T).multiplyScalar(50+L),u.setXYZ(x,f.x,f.y,f.z);const U=Math.asin(y(T.y,-1,1))/V,W=ot(T,L,U);l[x*3]=W[0],l[x*3+1]=W[1],l[x*3+2]=W[2]}Xt.setAttribute("color",new Hn(l,3)),Xt.computeVertexNormals()}const Kt=new wt({vertexColors:!0,roughness:.96,metalness:.02,envMapIntensity:.22}),Pe=new b(Xt,Kt);Ct.add(Pe);const ln=E[0].dir.clone().multiplyScalar(150).add(new M(0,26,0));i.position.copy(E[0].dir.clone().multiplyScalar(330).add(new M(0,85,0)));{const u=new ru,l=e.capabilities.getMaxAnisotropy();u.load("textures/mars_color.jpg",f=>{f.colorSpace=Bn,f.wrapS=us,f.offset.x=.5,f.anisotropy=l,Kt.map=f,Kt.vertexColors=!1,Kt.needsUpdate=!0}),u.load("textures/mars_bump.jpg",f=>{f.wrapS=us,f.offset.x=.5,f.anisotropy=l,Kt.bumpMap=f,Kt.bumpScale=1.1,Kt.needsUpdate=!0})}const ct=new ie(50,128,128);{const u=ct.attributes.position,l=new M;for(let f=0;f<u.count;f++){l.fromBufferAttribute(u,f);const x=l.clone().normalize();l.copy(x).multiplyScalar(50+vt(x)+.14),u.setXYZ(f,l.x,l.y,l.z)}ct.computeVertexNormals()}const Vt=new wt({color:15660022,roughness:.28,metalness:.05,transparent:!0,alphaMap:en()});Ct.add(new b(ct,Vt));const Ft=new $n({uniforms:{glowColor:{value:new be(16751216)}},vertexShader:`varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal);
    gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,fragmentShader:`varying vec3 vN; uniform vec3 glowColor;
    void main(){ float i = pow(0.6 - dot(vN, vec3(0.,0.,1.)), 3.0);
    gl_FragColor = vec4(glowColor,1.0)*i*0.9; }`,side:Jn,blending:On,transparent:!0,depthWrite:!1});Ct.add(new b(new ie(50*1.16,64,64),Ft));const _e=new wt({color:15255992,transparent:!0,opacity:.55,alphaMap:xe(),depthWrite:!1,roughness:1}),Ee=new b(new ie(50*1.025,96,96),_e);Ct.add(Ee);const yn=(()=>{const l=new Float32Array(1800);for(let T=0;T<600;T++){const L=new M(d()*2-1,d()*2-1,d()*2-1).normalize().multiplyScalar(50*(1.04+d()*.22));l.set([L.x,L.y,L.z],T*3)}const f=new vn;f.setAttribute("position",new Hn(l,3));const x=new Ur(f,new nr({color:14198147,size:.55,transparent:!0,opacity:.28,blending:On,depthWrite:!1}));return Ct.add(x),x})(),we=new St;we.visible=!1,Ct.add(we);const ge=new b(new ie(46.6,96,96),new wt({color:3350543,roughness:1}));we.add(ge);for(let u=0;u<7;u++){const l=u<3?E[3].dir.clone().add(new M((d()-.5)*.5,(d()-.5)*.5,(d()-.5)*.5)).normalize():C((d()*2-1)*45,d()*360-180),f=new b(new ie(1+d()*.8,16,16),new wt({color:6736127,emissive:2263295,emissiveIntensity:1.8,transparent:!0,opacity:.9}));f.position.copy(l.multiplyScalar(46.1+d()*.6)),we.add(f)}const je=new b(new ie(47.3,96,96),new wt({color:4861984,roughness:1,transparent:!0,alphaMap:nn(.9)}));we.add(je);const pe=H(),hn=new So({map:pe,bumpMap:pe,bumpScale:.5,transparent:!0,opacity:.62,roughness:.12,metalness:0,emissive:1329518,emissiveIntensity:.55}),ee=new ie(47.9,128,128);{const u=ee.attributes.position,l=new M;for(let f=0;f<u.count;f++){l.fromBufferAttribute(u,f);const x=l.clone().normalize();l.copy(x).multiplyScalar(47.9+k(x.x*5+3,x.y*5+3,x.z*5+3,3)*.5),u.setXYZ(f,l.x,l.y,l.z)}ee.computeVertexNormals()}we.add(new b(ee,hn));const Ie=new So({color:14217983,transparent:!0,opacity:.5,alphaMap:nn(.75),roughness:.08,emissive:2783920,emissiveIntensity:.5});we.add(new b(new ie(48.6,96,96),Ie)),we.add(new b(new ie(47,64,64),new gn({color:1195878,transparent:!0,opacity:.4,blending:On,side:Jn})));for(let u=0;u<6;u++){const l=E[3].dir.clone().add(new M((d()-.5)*.5,(d()-.5)*.5,(d()-.5)*.5)).normalize(),f=new b(new Nt(.9+d()*.8,.5+d()*.6,.12),new So({color:13626104,roughness:.12,transparent:!0,opacity:.85,emissive:2783920,emissiveIntensity:.4}));f.position.copy(l.clone().multiplyScalar(48)),f.quaternion.setFromUnitVectors(new M(0,0,1),l),f.rotateZ(d()*3),we.add(f)}const Cn=[];{const u=E[3].dir;for(let l=0;l<5;l++){const f=new St,x=new b(new Nt(.34,.16,.22),new wt({color:13161176,roughness:.4,metalness:.7,emissive:3783167,emissiveIntensity:.5}));f.add(x);for(let U=-1;U<=1;U+=2)for(let W=-1;W<=1;W+=2){const D=new b(new pt(.06,.06,.05,8).rotateX(Math.PI/2),new wt({color:2238510,roughness:.8}));D.position.set(U*.14,-.1,W*.09),f.add(D)}const T=new b(new pt(.02,.03,.3,6),new wt({color:10465981,metalness:.8,roughness:.3}));T.position.set(.14,.14,0),T.rotation.z=-.7,f.add(T),f.userData.arm=T;const L=u.clone().add(new M((d()-.5)*.35,(d()-.5)*.35,(d()-.5)*.35)).normalize();f.position.copy(L.multiplyScalar(48.35)),f.quaternion.setFromUnitVectors(new M(0,1,0),L.clone().normalize()),f.rotateY(d()*Math.PI*2),we.add(f),Cn.push(f)}for(let l=0;l<3;l++){const f=u.clone().add(new M((d()-.5)*.2,(d()-.5)*.2,(d()-.5)*.2)).normalize(),x=new b(new Nt(.7,.4,.5),new wt({color:9082012,roughness:.5,metalness:.6,emissive:16763274,emissiveIntensity:.7}));x.position.copy(f.multiplyScalar(47)),x.quaternion.setFromUnitVectors(new M(0,1,0),f.clone().normalize()),we.add(x)}}const N=Mn(),Et=ht(150,42,!0),tt=ht(132,36,!1),It=he("#202b36","#141c26",12,24,.42);It.map.repeat.set(2,4),It.em.repeat.set(2,4);const re=he("#3a3630","#2b2823",8,14,.5);re.map.repeat.set(1.5,2.5),re.em.repeat.set(1.5,2.5);const se=new wt({map:It.map,emissiveMap:It.em,emissive:16777215,emissiveIntensity:.85,color:13621474,metalness:.65,roughness:.24,envMapIntensity:1.3}),Rt=new wt({map:re.map,emissiveMap:re.em,emissive:16777215,emissiveIntensity:.8,color:14208962,metalness:.15,roughness:.7,envMapIntensity:.6,bumpMap:tt,bumpScale:.015}),dt=new wt({color:12174540,roughness:1,metalness:.9,roughnessMap:Et,bumpMap:tt,bumpScale:.015,envMapIntensity:1.15}),yt=new wt({color:3752524,roughness:1,metalness:.55,roughnessMap:tt,bumpMap:tt,bumpScale:.02,envMapIntensity:.7}),jt=new wt({color:15133938,roughness:1,metalness:.35,roughnessMap:tt,bumpMap:tt,bumpScale:.012,emissive:2902622,emissiveIntensity:.22,envMapIntensity:.85}),kt=new wt({color:14472388,roughness:1,metalness:.3,roughnessMap:tt,bumpMap:tt,bumpScale:.012,emissive:16757351,emissiveIntensity:.5,envMapIntensity:.75}),Jt=new wt({color:12579839,emissive:6284287,emissiveIntensity:2.2,roughness:.2}),X=new wt({color:1915487,roughness:.3,metalness:.7,emissive:1455196,emissiveIntensity:.7,envMapIntensity:1.25}),Tt=new wt({color:3120735,roughness:.9,emissive:1924152,emissiveIntensity:.35,envMapIntensity:.35}),Lt=new wt({color:5752709,roughness:.9,emissive:2783820,emissiveIntensity:.3,envMapIntensity:.35}),Zt=new wt({color:3121128,roughness:.12,metalness:.2,emissive:1732544,emissiveIntensity:.7,envMapIntensity:1.35}),ft=new wt({color:4870232,roughness:1,metalness:.5,roughnessMap:tt,bumpMap:tt,bumpScale:.02,emissive:16747578,emissiveIntensity:.45,envMapIntensity:.9}),ve={spire:{name:"苍穹塔",desc:"居住与办公综合体。智能玻璃幕墙按日照自动调节透光率，外墙藻类涂层参与城市氧气循环。"},bio:{name:"生长塔",desc:"原位 3D 打印的仿生曲面建筑——结构像植物一样生长成型，同强度下减重 40%，露台层叠绿化。"},ring:{name:"光环枢纽",desc:"巨型环形建筑：磁悬浮环线换乘中心，环体内部是空中花园与步行长廊。"},etree:{name:"日冕收集树",desc:"顶部花瓣阵列收集太阳能与轨道微波输电，单株日发电量可供 300 户家庭。"},stack:{name:"层叠居所",desc:"模块化住宅单元，可整体吊装替换；每户配备独立生态阳台与水循环单元。"},float:{name:"悬浮平台",desc:"磁悬浮公共观景平台，低速巡航于城市上空，是 2126 年最受欢迎的日落观景点。"},etower:{name:"赫菲斯托斯之芯",desc:"聚变-裂变混合能源塔，为整座工业城与火箭发射场供能，核心温度 1.2 亿度。"},htank:{name:"液氢储罐",desc:"水冰裂解产物储存设施，-253°C 低温系统全天候运行，供星舰燃料加注。"},iceplant:{name:"水冰加工厂",desc:"地下冰浆在此过滤、电解、分流——饮用水进城，氢氧进罐，氧气入穹顶。"},hangar:{name:"星舰总装厂房",desc:"每 72 小时总装一艘货运飞船，从龙骨到加注全流程无人化。"},robotline:{name:"机器人产线",desc:"建造与维护火星城市的机器人，在这里被它们自己制造。"},rail:{name:"货运轨道",desc:"真空管道磁悬浮货运线，连接工业城与首都，时速 1200 km。"},crocket:{name:"「天舟」货运火箭",desc:"可回收地表-轨道货运火箭，每周三班往返 Areos Gate 空间港。货舱里是刚总装的设备，和来自地球的邮件。"},cship:{name:"地表运输飞船",desc:"短程弹跳式运输器，负责城际大件转运。此刻它正在检修支架上，等待下一个点火窗口。"},mgantry:{name:"维修平台",desc:"火箭勤务塔架：加注、检测、更换发动机都在这里完成，平台机械臂 24 小时待命。"},battery:{name:"储能阵列",desc:"白昼储存光伏与聚变余电。沙暴季来临，它能维持城郊带满负荷运转 21 天。"},fabhall:{name:"装配车间",desc:"火星原位制造：风化层提取金属粉末，3D 打印城市构件——你身边的建筑，八成原料来自脚下的红土。"},habmod:{name:"居住舱区",desc:"城郊工程师的轮值宿舍。双层气密壳体，窗里的暖光，是 2126 年最普通的日常。"},plaza:{name:"中央广场",desc:"城郊带的公共客厅。下班后的工程师在这里喝一杯合成咖啡，看首都方向的天际线。"},maglev:{name:"磁悬浮接驳线",desc:"城郊与首都穹顶之间的通勤干线，每 4 分钟一班，全程 90 秒。"},statue:{name:"马斯克纪念雕像",desc:"青铜铸造，高 42 米，纪念第一位把人类送上火星的开拓者。基座铭文：「让人类成为多行星物种。」——他说了一辈子，说到它成真。"},stele:{name:"拓荒纪年碑",desc:"记载 2024—2089 火星开拓大事记：首次着陆、熔岩管基地、穹顶封顶、人口破百万。碑石取自水手号峡谷岩层。"},holo:{name:"全息档案影像",desc:"2024 年，他在地球上谈论火星。2126 年，你站在火星上看着他——这颗星球，成了他身后最辽阔的背景。"},pstation:{name:"广场磁悬浮站",desc:"首都内环 4 号站。本地居民管它叫「雕像站」——每个初到 Aurelia 的人，第一站都是这里。"},farm:{name:"垂直农场",desc:"40 层无土栽培架，LED 光谱按作物定制，单位面积产量是地球农田的 350 倍。"},watertower:{name:"水循环塔",desc:"穹顶内每一滴水在此净化循环，年损耗率低于 0.3%。"},canal:{name:"生态运河",desc:"人工河流调节穹顶湿度与温度，也是居民的划船道。"},greenhouse:{name:"穹顶外壳",desc:"40 cm 复合智能玻璃：挡辐射、锁温度、透阳光——内外是两个世界。"},drill:{name:"冰层钻塔",desc:"深入地下冰层 2.4 km，采冰机器人全天候作业，火星文明的水龙头。"},plaza:{name:"中央广场",desc:"首都的心脏。第一代移民在这里降落，第一百万个火星婴儿在这里取名。"},solarfarm:{name:"赤道光伏田",desc:"数十万平方米薄膜光伏阵列，日间峰值功率 2.4 GW，与轨道微波输电共同构成火星电网的主干。"},walker:{name:"巡检机器人",desc:"自主巡检单元，沿产线与储罐区全天候巡逻，实时回传设备健康数据，故障响应时间小于 90 秒。"},cropring:{name:"环形农田",desc:"穹顶外的加压种植环，种植耐低氧转基因作物，直接利用火星日照，由灌溉管网供水。"},agri:{name:"温室农场",desc:"链式温室穹顶，水培作物在人工气候下全年生长，是生态城的粮仓。"},monument:{name:"马斯克拓荒纪念碑",desc:"高 312 m，火星文明最高地标。纪念一个世纪前把「让人类成为多行星物种」从口号变成工程图纸的拓荒者们。"},observatory:{name:"巡天观测穹顶",desc:"火星干燥稀薄的空气让这里的星空比地球清晰十倍。穹顶内的深空望远镜同时承担地火通信的光学校准。"},antenna:{name:"射电天线阵",desc:"碟形天线组成的干涉阵列，监听深空探测器回传信号，也是科研站与轨道空间港之间的通信主干。"},lab:{name:"综合实验舱",desc:"加压实验舱：地质分析、生物培养、材料测试三大分区。样本经气闸进出，全程无污染。"},sample:{name:"样本冷藏库",desc:"低温保存钻探岩芯与冰芯样本，等待下一班返回地球的货运飞船。"},weather:{name:"气象监测塔",desc:"全天候记录气压、温度、尘暴与辐射数据，为五座穹顶城市提供气候预警。"},landpad:{name:"着陆坪",desc:"科研补给着陆坪。每月一班货运舱在此降落，送来设备，带走数据与样本。"}},vi=[],Ae={rings:[],ships:[],moons:[],glows:[],drones:[],pods:[],liners:[],walkers:[],climber:null},Ki=[],no=u=>u.dir.clone().multiplyScalar(50+vt(u.dir)),_n={},ko=new So({color:12577023,transparent:!0,opacity:.2,roughness:.08,metalness:.1,envMapIntensity:1.4,side:Xn,depthWrite:!1});{const u=Ni(E[0],8.2,F=>{const G=new b(new ai(7.6,56).rotateX(-Math.PI/2),yt);G.position.y=.02,F.add(G);for(let at=0;at<3;at++){const _t=new b(new Ve(2.7-at*.45,.045,6,56).rotateX(Math.PI/2),new wt({color:1120288,emissive:16763274,emissiveIntensity:.8}));_t.position.y=.05,F.add(Wt(_t,"plaza")),F.userData.buildings.push(_t)}[4.2,6.1].forEach(at=>{const _t=new b(new Ve(at,.05,6,72).rotateX(Math.PI/2),new wt({color:1120288,emissive:4839423,emissiveIntensity:.9}));_t.position.y=.05,F.add(_t)});const Z=new wt({color:1120288,emissive:4839423,emissiveIntensity:.5});for(let at=0;at<6;at++){const _t=at/6*Math.PI*2,et=new b(new Nt(4.6,.04,.09),Z);et.position.set(Math.cos(_t)*4.6,.045,Math.sin(_t)*4.6),et.rotation.y=-_t,F.add(et)}const Y=new b(new Ge(.07,.24,4,8).rotateZ(Math.PI/2),Jt);F.add(Y),Ae.pods.push({mesh:Y,kind:"circle",r:4.2,y:.12,speed:.5,t:0});const st=new b(new Ge(.06,.2,4,8).rotateZ(Math.PI/2),Jt);F.add(st),Ae.pods.push({mesh:st,kind:"circle",r:4.2,y:.12,speed:-.42,t:.5});for(let at=0;at<4;at++){const _t=new b(new Ge(.05,.18,4,6).rotateZ(Math.PI/2),kt);F.add(_t),Ae.pods.push({mesh:_t,kind:"circle",r:6.1,y:.1,speed:(.3+d()*.3)*(at%2?1:-1),t:d()})}const gt=[];for(let at=0;at<9;at++){const _t=at/9*Math.PI*2+.2;gt.push([ze(2.2+d()*2),Math.cos(_t)*3.3,Math.sin(_t)*3.3])}for(let at=0;at<8;at++){const _t=at/8*Math.PI*2+.55,et=4.6+d()*.8;gt.push([d()>.5?si(.5+d()*.2,1.4+d()*.8):Gn(1.6+d()*1.2),Math.cos(_t)*et,Math.sin(_t)*et])}for(let at=0;at<7;at++){const _t=at/7*Math.PI*2+.1,et=6.3+d()*.7;gt.push([ze(1.4+d()*1.6,.26),Math.cos(_t)*et,Math.sin(_t)*et])}gt.push([ii(1.05),5.2,-3.4]),gt.push([cr(.65,2.6),-4.4,3.6]),gt.forEach(([at,_t,et])=>dn(F,at,_t,et,d()*Math.PI*2));for(let at=0;at<10;at++){const _t=at/10*Math.PI*2+.32;dn(F,si(.42+d()*.2,1.1+d()*.7),Math.cos(_t)*2.5,Math.sin(_t)*2.5,d()*3)}for(let at=0;at<10;at++){const _t=d()*Math.PI*2,et=3.7+d()*2.8;dn(F,d()>.5?ze(1.3+d()*1.4,.26):Gn(1.4+d()*1.1,.42),Math.cos(_t)*et,Math.sin(_t)*et,d()*3)}for(let at=0;at<5;at++){const _t=at/5*Math.PI*2+.4;dn(F,ws(1.4+d()*.5),Math.cos(_t)*7.1,Math.sin(_t)*7.1)}const bt=[];for(let at=0;at<90;at++){const _t=d()*Math.PI*2,et=2.2+Math.sqrt(d())*4.8,$=.12+d()*.2;bt.push({p:new M(Math.cos(_t)*et,$/2+.04,Math.sin(_t)*et),s:new M(.05+d()*.04,$,.05+d()*.04)})}F.add(Rn(new Ai(1,1,7),Tt,bt));const Ut=new b(new Ve(7.25,.045,6,80).rotateX(Math.PI/2),new wt({color:1120288,emissive:4839423,emissiveIntensity:.7}));Ut.position.y=.05,F.add(Ut);for(let at=0;at<5;at++){const _t=new b(new Ge(.045,.16,4,6).rotateZ(Math.PI/2),kt);F.add(_t),Ae.pods.push({mesh:_t,kind:"circle",r:7.25,y:.1,speed:(.25+d()*.3)*(at%2?1:-1),t:d()})}const ne=[];for(let at=0;at<44;at++){const _t=d()*Math.PI*2,et=6.6+d()*.85,$=.5+d()*.9;ne.push({p:new M(Math.cos(_t)*et,$/2+.03,Math.sin(_t)*et),s:new M(.22+d()*.14,$,.22+d()*.14),ry:d()*3})}const Le=Rn(new Nt(1,1,1),Rt,ne);F.add(Wt(Le,"stack")),F.userData.buildings.push(Le);const Re=[],Me=[];for(let at=0;at<520;at++){const _t=d()*Math.PI*2,et=Math.sqrt(d())*7.3,$=.15+Math.pow(d(),1.6)*2.6;Re.push(Math.cos(_t)*et,$,Math.sin(_t)*et);const mt=d()>.4?[1,.79,.54]:[.56,.91,1],Ot=.3+d()*.7;Me.push(mt[0]*Ot,mt[1]*Ot,mt[2]*Ot)}const ae=new vn;ae.setAttribute("position",new We(Re,3)),ae.setAttribute("color",new We(Me,3)),F.add(new Ur(ae,new nr({size:.07,vertexColors:!0,transparent:!0,opacity:.95,blending:On,depthWrite:!1}))),Vo(F,new M(-4.6,1.6,-3.2),new M(4.8,2.2,3),1.6),Vo(F,new M(-5.4,2,2.6),new M(5.4,1.7,-3.6),1.3);const Pt=ii(1.5);Pt.rotation.z=.1,dn(F,Pt,-5.8,-4.2,.7);for(let at=0;at<22;at++)Zi(F,2.4+d()*4.4,2+d()*3.5,(.2+d()*.35)*(d()>.5?1:-1));F.add(Yt(8,.15))}),l=new St;l.userData.btype="monument";const f=new b(new pt(2,2.4,.35,24),dt);f.position.y=.18,l.add(f);const x=new b(new pt(.3,1.05,8.2,6),dt);x.position.y=4.4,l.add(x);const T=new b(new pt(.34,.34,8.2,6),new gn({color:8382463,transparent:!0,opacity:.2,blending:On}));T.position.y=4.4,l.add(T);for(let F=0;F<3;F++){const G=new b(new Ve(1.3+F*.6,.08,8,48),dt);G.position.y=2.8+F*2,G.rotation.x=Math.PI/2+(F-1)*.26,l.add(G),Ae.rings.push(G)}const L=new b(new ie(.55,20,20),Jt);L.position.y=8.7,l.add(L);const U=new b(new pt(.1,.45,16,8,1,!0),new gn({color:9431807,transparent:!0,opacity:.18,blending:On,side:Xn,depthWrite:!1}));U.position.y=15.5,l.add(U);for(let F=0;F<6;F++){const G=F/6*Math.PI*2,Z=new b(new pt(.04,.04,1.1,6),Jt);Z.position.set(Math.cos(G)*2.1,.55,Math.sin(G)*2.1),l.add(Z)}w(l,new M(0,8.7,0),8382463,9);const W=K("马斯克拓荒纪念碑",10);W.position.y=10.6,l.add(W),l.scale.setScalar(1.35),u.add(l),u.userData.buildings.push(l),u.userData.monument=l;const D=K("火星首都 · Aurelia",11);D.position.set(0,9.6,-6.4),u.add(D),Ae.glows.push(w(u,new M(0,4.6,0),8841471,13)),u.userData.infoKey="capital",vi.push(u),R(u,"resident",1.8,1.2,-2.4,"陈栖","火星居民 · Aurelia 第三代",["我出生在 Aurelia 的第三号穹顶，小时候抬头只能看见一层玻璃和红色的天。","那时候水比金子贵，洗澡要计时。现在好了，循环系统让我们能用上真正的淋浴。","这座城市是从熔岩管里长出来的。第一批定居者住在地下，用了三十年才把穹顶盖到地表。","别被外面的荒凉骗了——穹顶里有河流、有公园，还有全火星最好的咖啡。"])}let q=null;{const u=_n.capital,l=new wt({color:8020552,roughness:1,metalness:.92,roughnessMap:Et,bumpMap:tt,bumpScale:.012,emissive:2760466,emissiveIntensity:.25,envMapIntensity:1.2}),f=new wt({color:5522223,roughness:1,metalness:.9,roughnessMap:tt,envMapIntensity:1}),x=new wt({color:10129798,roughness:1,metalness:.05,roughnessMap:tt,bumpMap:tt,bumpScale:.03,envMapIntensity:.5}),T=new wt({color:5656649,roughness:1,roughnessMap:tt,bumpMap:tt,bumpScale:.03,envMapIntensity:.4}),L=new wt({color:3353114,emissive:16763274,emissiveIntensity:1.6}),U=Math.PI/4,W=Math.cos(U)*4.2,D=Math.sin(U)*4.2,F=new St;F.position.set(W,0,D),F.rotation.y=Math.PI/2-U;const G=new b(new pt(2,2.15,.12,32),x);G.position.y=.06,F.add(G);const Z=new b(new Ve(1.85,.045,6,64).rotateX(Math.PI/2),new wt({color:1120288,emissive:16763274,emissiveIntensity:.9}));Z.position.y=.13,F.add(Z);const Y=new St,st=new b(new pt(1.45,1.6,.16,12),x);st.position.y=.2,Y.add(st);const gt=new b(new pt(1.1,1.25,.16,12),x);gt.position.y=.36,Y.add(gt);const bt=new b(new pt(.6,.76,1.1,12),T);bt.position.y=.99,Y.add(bt);const Ut=new b(new pt(.68,.6,.12,12),x);Ut.position.y=1.6,Y.add(Ut);const ne=new St,Le=new b(new pt(.34,.34,.05,32).rotateX(Math.PI/2),f);ne.add(Le);const Re=new b(new Ve(.34,.025,8,40),l);ne.add(Re);const Me=new b(new ai(.31,32),new wt({color:16777215,metalness:.85,roughness:.45,envMapIntensity:1.1}));Me.position.z=.028,ne.add(Me),ne.position.set(0,1.02,.72),ne.rotation.x=-.1,Y.add(ne);const ae=new St;for(const Ue of[-1,1]){const Xe=new b(new Ge(.14,.75,4,8),f);Xe.position.set(Ue*.17,.55,0),ae.add(Xe)}const Pt=new b(new pt(.3,.46,1.15,12),l);Pt.position.y=1.55,ae.add(Pt);const at=new b(new ie(.3,12,8),l);at.position.y=2.08,at.scale.set(1.15,.7,.85),ae.add(at);const _t=new b(new Ge(.09,.7,4,8),l);_t.position.set(-.42,1.6,.02),_t.rotation.z=.18,ae.add(_t);const et=new b(new Ge(.09,.42,4,8),l);et.position.set(.5,1.88,.06),et.rotation.z=-1.1,ae.add(et);const $=new b(new Ge(.075,.4,4,8),l);$.position.set(.86,2.06,.1),$.rotation.z=-.15,ae.add($);const mt=new b(new ie(.1,8,8),l);mt.position.set(.92,2.34,.12),mt.scale.set(.8,1.15,.35),ae.add(mt);const Ot=new St;Ot.position.y=2.52;const ce=new b(new ie(.21,20,16),l);ce.scale.set(.94,1.06,.98),Ot.add(ce);const Se=new b(new pt(.13,.155,.14,12),l);Se.position.set(0,-.14,.03),Se.scale.z=.9,Ot.add(Se);const Ye=new b(new ie(.045,8,8),l);Ye.position.set(0,-.19,.15),Ye.scale.set(1,.7,.8),Ot.add(Ye);const xn=new b(new Nt(.2,.035,.06),f);xn.position.set(0,.045,.185),Ot.add(xn);for(const Ue of[-1,1]){const Xe=new b(new ie(.032,10,8),f);Xe.position.set(Ue*.075,.005,.175),Xe.scale.set(1,.7,.5),Ot.add(Xe);const bn=new b(new ie(.04,8,8),l);bn.position.set(Ue*.2,-.02,0),bn.scale.set(.45,.9,.7),Ot.add(bn)}const Je=new b(new Nt(.045,.11,.05),l);Je.position.set(0,-.03,.2),Je.rotation.x=.12,Ot.add(Je);const Ze=new b(new ie(.032,8,8),l);Ze.position.set(0,-.095,.21),Ot.add(Ze);const zt=new b(new Nt(.09,.02,.03),f);zt.position.set(0,-.145,.185),Ot.add(zt);const Bt=new b(new pt(.09,.11,.14,10),f);Bt.position.y=-.24,Ot.add(Bt);const $t=new b(new ie(.215,18,12,0,Math.PI*2,0,1.05),f);$t.position.set(0,.05,-.02),$t.scale.set(.98,1,1.06),$t.rotation.x=-.2,Ot.add($t);const qe=new b(new ie(.2,14,10,0,Math.PI*2,0,1.9),f);qe.position.set(0,.01,-.045),qe.scale.set(.94,1.02,1),Ot.add(qe),ae.add(Ot),ae.position.y=1.66,Y.add(ae),F.add(Wt(Y,"statue")),u.userData.buildings.push(Y);for(let Ue=0;Ue<6;Ue++){const Xe=Ue/6*Math.PI*2+.26,bn=new b(new pt(.03,.045,.5,6),T);bn.position.set(Math.cos(Xe)*1.62,.37,Math.sin(Xe)*1.62),F.add(bn);const ss=new b(new Nt(.07,.05,.07),L);ss.position.set(Math.cos(Xe)*1.62,.64,Math.sin(Xe)*1.62),ss.lookAt(F.position.clone().setY(3)),F.add(ss)}const sn=new St;for(let Ue=0;Ue<3;Ue++){const Xe=new b(new Nt(.3,.75,.08),T);Xe.position.set((Ue-1)*.85,.5,-1.35+Math.abs(Ue-1)*.18),Xe.rotation.y=-(Ue-1)*.35,sn.add(Xe);const bn=new b(new Nt(.24,.05,.02),L);bn.position.set((Ue-1)*.85,.82,-1.3+Math.abs(Ue-1)*.18),bn.rotation.y=-(Ue-1)*.35,sn.add(bn)}F.add(Wt(sn,"stele")),u.userData.buildings.push(sn);const Sn=new St,ti=new b(new pt(.3,.38,.1,16),T);ti.position.y=-.85,Sn.add(ti);const js=new b(new Nt(.98,1.24,.02),new gn({color:663592,transparent:!0,opacity:.5}));Sn.add(js);const Hi=new b(new ps(.88,1.14),new gn({color:12575999,transparent:!0,opacity:.92,side:Xn}));Hi.position.z=.015,Sn.add(Hi),new ru().load("textures/musk.jpg",Ue=>{Ue.colorSpace=Bn,Hi.material.map=Ue,Hi.material.needsUpdate=!0;const Xe=document.createElement("canvas");Xe.width=Xe.height=256;const bn=Xe.getContext("2d");bn.drawImage(Ue.image,0,0,256,256);const ss=bn.getImageData(0,0,256,256),Ks=ss.data;for(let Cs=0;Cs<Ks.length;Cs+=4){const Ul=Ks[Cs]*.3+Ks[Cs+1]*.55+Ks[Cs+2]*.15;Ks[Cs]=40+Ul*.62,Ks[Cs+1]=28+Ul*.44,Ks[Cs+2]=18+Ul*.3}bn.putImageData(ss,0,0);const ud=new ri(Xe);ud.colorSpace=Bn,Me.material.map=ud,Me.material.needsUpdate=!0}),Sn.position.set(0,1.95,-1.5),F.add(Wt(Sn,"holo")),u.userData.buildings.push(Sn),Ae.glows.push(w(F,new M(0,1.95,-1.5),10474751,1.1));const Gi=new St,le=new b(new Nt(1.1,.08,.5),x);le.position.y=.1,Gi.add(le);for(const Ue of[-1,1]){const Xe=new b(new pt(.03,.03,.6,6),dt);Xe.position.set(Ue*.45,.4,0),Gi.add(Xe)}const de=new b(new Nt(1.2,.04,.6),yt);de.position.y=.72,Gi.add(de);const Qe=new b(new Nt(1,.02,.06),L);Qe.position.y=.69,Gi.add(Qe),Gi.position.set(0,0,1.75),F.add(Wt(Gi,"pstation")),u.userData.buildings.push(Gi);for(let Ue=0;Ue<4;Ue++){const Xe=new St,bn=new b(new Ge(.03,.07,3,6),new wt({color:[13154472,9413808,12097672,10137768][Ue],roughness:.7}));bn.position.y=-.22,Xe.add(bn),F.add(Xe),Ae.walkers.push({mesh:Xe,cx:0,cz:.4,r:1.15+Ue*.18,phase:d()*6.28,speed:(.18+d()*.15)*(Ue%2?1:-1)})}for(const Ue of[1.65,1.45]){const Xe=new St,bn=new b(new pt(.05,.06,.05,8),yt);bn.position.y=-.27,Xe.add(bn);const ss=new b(new ie(.015,6,6),Jt);ss.position.set(.04,-.25,0),Xe.add(ss),F.add(Xe),Ae.walkers.push({mesh:Xe,cx:0,cz:.2,r:Ue,phase:d()*6.28,speed:.5+d()*.2})}Zi(u,4,1.8,.3,16763274),Zi(u,4.5,2.4,-.26,16763274),u.add(F);const jn=K("开拓者广场 · Pioneer Plaza",5);jn.position.set(W,5.6,D),u.add(jn),Ae.glows.push(w(u,new M(W,3.4,D),16763274,4.5)),q=new M,Y.getWorldPosition(q)}{const u=Ni(E[2],6.2,f=>{const x=new b(new ai(4.4,40).rotateX(-Math.PI/2),Tt);x.position.y=.02,f.add(x);const T=[];for(let Y=0;Y<220;Y++){const st=d()*Math.PI*2,gt=.6+Math.sqrt(d())*3.6,bt=.14+d()*.26;T.push({p:new M(Math.cos(st)*gt,bt/2+.04,Math.sin(st)*gt),s:new M(.06+d()*.04,bt,.06+d()*.04)})}f.add(Rn(new Ai(1,1,7),Lt,T));const L=[];for(let Y=0;Y<80;Y++){const st=d()*Math.PI*2,gt=Math.sqrt(d())*3.8;L.push({p:new M(Math.cos(st)*gt,.05,Math.sin(st)*gt),s:new M(.1,.02,.1)})}f.add(Rn(new pt(1,1,1,8),new wt({color:15240112,emissive:11552111,emissiveIntensity:.6,roughness:.8}),L));const U=new b(new Ve(2.4,.16,8,56).rotateX(Math.PI/2),Zt);U.position.y=.06,f.add(Wt(U,"canal")),f.userData.buildings.push(U);const W=new b(new ai(.9,24).rotateX(-Math.PI/2),Zt);W.position.set(1.6,.07,1.2),f.add(W),dn(f,Gn(2.6,.55),-1.2,-1.4),dn(f,Gn(2.1,.5),1.8,-1.8,1.2),dn(f,Gn(2.2,.5),-2.6,-2.2,2.1),dn(f,ze(2.4,.3),.4,-2.6),dn(f,ze(1.9,.26),2.6,-.6),dn(f,si(.55,1.5),-2.4,1.6),dn(f,ii(.75),-3.2,.6),dn(f,cr(.5,2),1.2,2.2);const D=new St;for(let Y=0;Y<6;Y++){const st=new b(new pt(.55-Y*.05,.55-Y*.05,.1,14),new wt({color:4173423,emissive:3120735,emissiveIntensity:.9,roughness:.7}));st.position.y=.25+Y*.32,D.add(st)}D.position.set(-.6,0,2.8),f.add(Wt(D,"farm")),f.userData.buildings.push(D);const F=new St,G=new b(new pt(.3,.42,1.9,10),jt);G.position.y=.95,F.add(G);for(let Y=0;Y<3;Y++){const st=new b(new Ve(.36,.035,6,20).rotateX(Math.PI/2),Zt);st.position.y=.5+Y*.55,F.add(st)}F.position.set(2.9,0,2.4),f.add(Wt(F,"watertower")),f.userData.buildings.push(F);const Z=Yt(4.6,.16);f.add(Z),[[5.6,1.4,2.2],[-4.6,3.4,1.8]].forEach(([Y,st,gt])=>{const bt=Yt(gt,.2);bt.position.set(Y,0,st),f.add(bt);const Ut=new b(new ie(gt*.8,16,10,0,Math.PI*2,0,Math.PI/2),Tt);Ut.scale.y=.42,Ut.position.set(Y,.03,st),f.add(Ut);const ne=new b(new pt(.2,.2,Math.hypot(Y,st),10),ut(.28));ne.position.set(Y/2,.32,st/2),ne.rotation.z=Math.PI/2,ne.rotation.y=-Math.atan2(st,Y),f.add(ne)}),[[3.4,-4.8],[5.2,-4],[7,-2.8]].forEach(([Y,st])=>{const gt=Yt(1.5,.2);gt.position.set(Y,0,st),f.add(gt);const bt=new b(new ie(1.15,14,8,0,Math.PI*2,0,Math.PI/2),Lt);bt.scale.y=.4,bt.position.set(Y,.03,st),f.add(Wt(bt,"agri")),f.userData.buildings.push(bt);const Ut=new b(new pt(.16,.16,Math.hypot(Y,st),8),ut(.28));Ut.position.set(Y/2,.3,st/2),Ut.rotation.z=Math.PI/2,Ut.rotation.y=-Math.atan2(st,Y),f.add(Ut)}),[[8.2,1.5],[6.8,6.2],[-7.6,4.4]].forEach(([Y,st])=>{const gt=new b(new pt(1.3,1.3,.08,24),new wt({color:4173423,emissive:3120735,emissiveIntensity:.8,roughness:.8}));gt.position.set(Y,.06,st),f.add(Wt(gt,"cropring")),f.userData.buildings.push(gt);const bt=new b(new Ve(.8,.05,6,28).rotateX(Math.PI/2),Zt);bt.position.set(Y,.14,st),f.add(bt);const Ut=Math.hypot(Y,st),ne=new b(new pt(.06,.06,Ut,6),new wt({color:3828362,emissive:1732544,emissiveIntensity:.8,roughness:.4,metalness:.5}));ne.position.set(Y/2,.1,st/2),ne.rotation.z=Math.PI/2,ne.rotation.y=-Math.atan2(st,Y),f.add(Wt(ne,"watertower")),f.userData.buildings.push(ne)}),[[2.2,3.4],[-3,2.6]].forEach(([Y,st])=>{const gt=D.clone();gt.position.set(Y,0,st),f.add(Wt(gt,"farm")),f.userData.buildings.push(gt)}),[[-3.6,-3.4],[4.2,3.2]].forEach(([Y,st])=>{const gt=F.clone();gt.position.set(Y,0,st),f.add(Wt(gt,"watertower")),f.userData.buildings.push(gt)});for(let Y=0;Y<14;Y++)Zi(f,1.5+d()*4,1.2+d()*2.4,(.25+d()*.3)*(d()>.5?1:-1),9437118)}),l=K("翡绿生态城 · Verde",10);l.position.set(0,6.4,0),u.add(l),Ae.glows.push(w(u,new M(0,3,0),8257456,10)),u.userData.infoKey="eco",vi.push(u)}{const u=Ni(E[1],6.8,f=>{const x=new b(new pt(5.6,5.9,.3,48),yt);x.position.y=.15,f.add(x),[[-1.6,.6],[1.8,-1.2]].forEach(([$,mt])=>{const Ot=new St,ce=new b(new pt(.5,.75,3.4,10),dt);ce.position.y=1.7,Ot.add(ce);const Se=new b(new pt(.24,.24,3.6,8),Jt);Se.position.y=1.8,Ot.add(Se);const Ye=new b(new Ve(.62,.09,8,24).rotateX(Math.PI/2),ft);Ye.position.y=3.5,Ot.add(Ye),w(Ot,new M(0,3.6,0),8382463,2.2),Ot.position.set($,.3,mt),f.add(Wt(Ot,"etower")),f.userData.buildings.push(Ot)});for(let $=0;$<4;$++){const mt=.5+$/4*Math.PI*2,Ot=new St,ce=new b(new ie(.55,16,12),dt);ce.position.y=.85,Ot.add(ce);for(let Se=0;Se<3;Se++){const Ye=Se/3*Math.PI*2,xn=new b(new pt(.04,.04,.7,6),yt);xn.position.set(Math.cos(Ye)*.35,.35,Math.sin(Ye)*.35),Ot.add(xn)}Ot.position.set(Math.cos(mt)*3.6,.3,Math.sin(mt)*3.6),f.add(Wt(Ot,"htank")),f.userData.buildings.push(Ot)}const T=new St,L=new b(new Nt(2.6,.9,1.1),ft);L.position.y=.45,T.add(L);for(let $=0;$<5;$++){const mt=new b(new pt(.06,.06,1.3,6).rotateX(Math.PI/2),dt);mt.position.set(-1.05+$*.52,1,0),T.add(mt)}T.position.set(0,.3,3.4),f.add(Wt(T,"iceplant")),f.userData.buildings.push(T);const U=new St,W=new b(new pt(1,1,2.6,16,1,!1,0,Math.PI).rotateZ(Math.PI/2).rotateY(Math.PI/2),yt);W.position.y=.2,U.add(W);const D=new St,F=new b(new pt(.22,.22,1.7,12),new wt({color:15922422,roughness:.35,metalness:.4}));F.position.y=.85,D.add(F);const G=new b(new Ai(.22,.55,12),new wt({color:2106924,roughness:.4,metalness:.5}));G.position.y=1.95,D.add(G),D.position.set(0,.1,-2),U.add(D),U.position.set(-3.2,.3,2.6),U.rotation.y=.6,f.add(Wt(U,"hangar")),f.userData.buildings.push(U);const Z=new St;for(let $=0;$<6;$++){const mt=new b(new pt(.05,.07,.5,6),dt);mt.position.set($*.4-1,.25,0),Z.add(mt);const Ot=new b(new Nt(.3,.06,.06),ft);Ot.position.set($*.4-1+.12,.55,0),Z.add(Ot)}const Y=new b(new Nt(2.8,.06,.4),yt);Y.position.y=.1,Z.add(Y),Z.position.set(.4,.3,-3.6),f.add(Wt(Z,"robotline")),f.userData.buildings.push(Z);const st=new St;for(const $ of[-1,1]){const mt=new b(new Nt(9,.07,.08),dt);mt.position.set(0,.75,$*.16),st.add(mt)}for(let $=0;$<6;$++){const mt=new b(new pt(.04,.05,.75,6),yt);mt.position.set(-4+$*1.6,.37,0),st.add(mt)}const gt=new b(new Ge(.09,.4,4,8).rotateZ(Math.PI/2),ft);gt.position.y=.85,st.add(gt),Ae.pods.push({mesh:gt,kind:"line",x0:-4.2,x1:4.2,y:.85,speed:.35,t:d()}),st.position.set(0,.3,-5.6),f.add(Wt(st,"rail")),f.userData.buildings.push(st);for(let $=0;$<3;$++){const mt=$/3*Math.PI*2+.3,Ot=new b(new pt(.07,.11,2.4,8),yt);Ot.position.set(Math.cos(mt)*4.9,1.5,Math.sin(mt)*4.9),f.add(Ot),Ae.glows.push(w(f,Ot.position.clone().add(new M(0,1.4,0)),16748608,2.4))}const bt=[];for(let $=0;$<24;$++)bt.push({p:new M(2+$%6*.44,.42+Math.floor($/12)*.27,-2.4+Math.floor($/6)%2*.52),s:new M(.38,.24,.2),ry:(d()-.5)*.12});f.add(Rn(new Nt(1,1,1),ft,bt));const Ut=new St,ne=new b(new pt(.06,.08,2.2,6),dt);ne.position.y=1.1,Ut.add(ne);const Le=new b(new Nt(1.8,.07,.07),ft);Le.position.set(.7,2.2,0),Ut.add(Le);const Re=new b(new pt(.015,.015,.6,4),yt);Re.position.set(1.4,1.9,0),Ut.add(Re),Ut.position.set(-2.2,.3,1.2),f.add(Ut);const Me=[];for(let $=0;$<6;$++){const mt=1.1+$/6*Math.PI*.9;Me.push({p:new M(Math.cos(mt)*4.7,.75,Math.sin(mt)*4.7),s:new M(.32,.9,.32)})}f.add(Rn(new pt(1,1,1,10),dt,Me));const ae=[],Pt=[];for(let $=0;$<5;$++)for(let mt=0;mt<10;mt++){const Ot=-6.3+mt*.85,ce=6.6+$*.7;ae.push({p:new M(Ot,.58,ce),s:new M(.7,.05,.5)}),Pt.push({p:new M(Ot,.27,ce),s:new M(.05,.54,.05)})}const at=Rn(new Nt(1,1,1),X,ae);f.add(Wt(at,"solarfarm")),f.userData.buildings.push(at),f.add(Rn(new pt(1,1,1,6),yt,Pt));const _t=[];for(let $=0;$<8;$++)_t.push({p:new M(-4.6+$%4*.85,.75,-6.5-Math.floor($/4)*.9),s:new M(.34,.9,.34)});const et=Rn(new pt(1,1,1,10),dt,_t);f.add(Wt(et,"htank")),f.userData.buildings.push(et);for(let $=0;$<2;$++){const mt=new b(new pt(.12,.2,2.8,8),yt);mt.position.set(4.6-$*1.1,1.7,3.8+$*.9),f.add(Wt(mt,"iceplant")),f.userData.buildings.push(mt),Ae.glows.push(w(f,mt.position.clone().add(new M(0,1.6,0)),16732224,1.2))}for(let $=0;$<4;$++){const mt=new St,Ot=new b(new Nt(.26,.14,.18),ft);Ot.position.y=.18,mt.add(Ot);const ce=new b(new Nt(.06,.04,.04),Jt);ce.position.set(.14,.2,0),mt.add(ce);for(const xn of[-1,1])for(const Je of[-1,1]){const Ze=new b(new pt(.018,.018,.2,5),yt);Ze.position.set(xn*.1,.07,Je*.07),mt.add(Ze)}const Se=1.5+(d()-.5)*3,Ye=-1.5+(d()-.5)*3;mt.position.set(Se,.3,Ye),f.add(Wt(mt,"walker")),f.userData.buildings.push(mt),Ae.walkers.push({mesh:mt,cx:Se,cz:Ye,r:.8+d()*1.2,speed:.4+d()*.3,phase:d()*6})}for(let $=0;$<12;$++)Zi(f,2+d()*3.4,1.5+d()*2.5,(.3+d()*.3)*(d()>.5?1:-1),16756832)}),l=K("赫菲斯托斯工业城",10);l.position.set(0,6.2,0),u.add(l),Ae.glows.push(w(u,new M(0,3.4,0),16752720,11)),u.userData.infoKey="industrial",vi.push(u)}{const u=Ni(E[3],5,l=>{for(let L=0;L<2;L++){const U=new St,W=L*2.6-1.3;for(let G=0;G<3;G++){const Z=G/3*Math.PI*2,Y=new b(new pt(.05,.05,1.9,6),dt);Y.position.set(W+Math.cos(Z)*.46,.9,Math.sin(Z)*.46),Y.rotation.z=Math.cos(Z)*.32,Y.rotation.x=-Math.sin(Z)*.32,U.add(Y)}const D=new b(new Nt(.44,.44,.44),ft);D.position.set(W,1.9,0),U.add(D);const F=new b(new pt(.13,.13,6.2,8),dt);F.position.set(W,-1.2,0),U.add(F),w(U,new M(W,-3.9,0),6279423,2.4),l.add(Wt(U,"drill")),l.userData.buildings.push(U)}const f=[];for(let L=0;L<6;L++){const U=d()*Math.PI*2,W=1.8+d()*1.6;f.push({p:new M(Math.cos(U)*W,.32,Math.sin(U)*W),s:new M(.75,.6,.55),ry:d()*3})}l.add(Rn(new Nt(1,1,1),kt,f));for(let L=0;L<3;L++){const U=new St,W=new b(new Nt(.3,.14,.2),jt);U.add(W);for(let F=-1;F<=1;F+=2)for(let G=-1;G<=1;G+=2){const Z=new b(new pt(.05,.05,.04,8).rotateX(Math.PI/2),yt);Z.position.set(F*.12,-.09,G*.08),U.add(Z)}const D=d()*Math.PI*2;U.position.set(Math.cos(D)*3.2,.12,Math.sin(D)*3.2),l.add(U)}const x=Yt(1.7,.2);x.position.set(3,0,2),l.add(x),dn(l,ws(1.3),-2.8,2.4);const T=K("冰川矿城 · Glacies",9);T.position.set(0,4.4,0),l.add(T),Ae.glows.push(w(l,new M(0,2.4,0),7325951,8))});u.userData.infoKey="mining",vi.push(u)}{const u=Ni(E[4],4.4,l=>{l.add(Yt(3.2,.16)),dn(l,ze(1.7),-.8,.5),dn(l,Gn(1.5,.4),.9,-.7,.8),dn(l,si(.45,1.2),1.3,1.1),dn(l,si(.4,1),-1.4,-1),dn(l,ze(1.3,.24),.2,-1.6),dn(l,Gn(1.2,.36),-1.8,1.2,2.2),dn(l,ws(1.3),2.4,.4),dn(l,ws(1.1),-2.4,-.4);const f=new b(new ai(.8,18).rotateX(-Math.PI/2),Tt);f.position.set(.2,.04,1.6),l.add(f);for(let T=0;T<5;T++)Zi(l,1+d()*1.8,1+d()*1.6,.3+d()*.3);const x=K("前哨城 · Frontier",9);x.position.set(0,4.6,0),l.add(x),Ae.glows.push(w(l,new M(0,2.6,0),10477823,8))});u.userData.infoKey="frontier",vi.push(u)}{const u=Ni(E[5],4.6,l=>{const f=new b(new ai(4.2,40).rotateX(-Math.PI/2),new wt({color:3817800,roughness:.7,metalness:.4}));f.position.y=.02,l.add(f);const x=new St,T=Yt(1.9,.22);x.add(T);const L=new b(new pt(.16,.22,.9,10),dt);L.position.y=.45,x.add(L);const U=new St,W=new b(new pt(.16,.2,1.6,12),new wt({color:14673644,roughness:.3,metalness:.6}));W.rotation.x=Math.PI/2-.6,W.position.y=.4,U.add(W);const D=new b(new ai(.17,16),Jt);D.position.set(0,.88,.62),D.rotation.x=-.6,U.add(D),U.position.y=.9,x.add(U),x.position.set(-1.2,0,-.8),l.add(Wt(x,"observatory")),l.userData.buildings.push(x),[[2.2,-1.6,.5],[3.1,-.2,.9],[2.4,1.4,1.3]].forEach(([ae,Pt,at])=>{const _t=new St,et=new b(new pt(.05,.08,.9,8),dt);et.position.y=.45,_t.add(et);const $=new b(new ie(.62,20,8,0,Math.PI*2,0,.62),new wt({color:15133938,roughness:.35,metalness:.5,side:Xn}));$.position.y=1.1,$.rotation.x=Math.PI+.7,_t.add($);const mt=new b(new pt(.012,.012,.5,6),yt);mt.position.set(0,1.25,.28),mt.rotation.x=.7,_t.add(mt),w(_t,new M(0,1.28,.32),10479871,.5),_t.position.set(ae,0,Pt),_t.rotation.y=at,l.add(Wt(_t,"antenna")),l.userData.buildings.push(_t)});const F=[[-2.6,1.2,.3],[-1.4,2.2,-.2],[-.1,2.6,.4]];F.forEach(([ae,Pt,at],_t)=>{const et=new b(new Ge(.42,1.1,4,12).rotateZ(Math.PI/2),jt);if(et.position.set(ae,.42,Pt),et.rotation.y=at,l.add(Wt(et,"lab")),l.userData.buildings.push(et),_t<F.length-1){const[$,mt]=F[_t+1],Ot=Math.hypot($-ae,mt-Pt),ce=new b(new pt(.16,.16,Ot,8),ut(.3));ce.position.set((ae+$)/2,.34,(Pt+mt)/2),ce.rotation.z=Math.PI/2,ce.rotation.y=-Math.atan2(mt-Pt,$-ae),l.add(ce)}});const G=new St;for(let ae=0;ae<5;ae++){const Pt=ae/5*Math.PI*2,at=new b(new pt(.14,.14,.55,10),new wt({color:13624560,roughness:.25,metalness:.7,emissive:2783920,emissiveIntensity:.5}));at.position.set(Math.cos(Pt)*.3,.28,Math.sin(Pt)*.3),G.add(at)}const Z=new b(new pt(.55,.6,.14,16),dt);Z.position.y=.07,G.add(Z),w(G,new M(0,.62,0),7325951,.9),G.position.set(.9,0,-2.2),l.add(Wt(G,"sample")),l.userData.buildings.push(G);const Y=new St,st=new b(new pt(.03,.05,2.6,8),dt);st.position.y=1.3,Y.add(st);const gt=new b(new Nt(.7,.03,.03),yt);gt.position.y=2.3,Y.add(gt);const bt=new b(new ie(.09,10,8),Jt);bt.position.y=2.66,Y.add(bt),w(Y,new M(0,2.66,0),10479871,.8),Y.position.set(-3.2,0,-2),l.add(Wt(Y,"weather")),l.userData.buildings.push(Y);const Ut=new St,ne=new b(new pt(.95,1,.1,24),yt);ne.position.y=.05,Ut.add(ne);const Le=new b(new Ve(.8,.03,6,40).rotateX(Math.PI/2),Jt);Le.position.y=.11,Ut.add(Le),Ut.position.set(1.6,0,2.6),l.add(Wt(Ut,"landpad")),l.userData.buildings.push(Ut);const Re=Yt(1.1,.2);Re.position.set(-3,0,.4),l.add(Re),dn(l,ws(1.2),3.4,2.2),dn(l,si(.4,.9),-2.2,-2.8);for(let ae=0;ae<6;ae++)Zi(l,1.2+d()*2.2,1+d()*1.6,.25+d()*.3,11065599);const Me=K("奥林帕斯科研站",9);Me.position.set(0,4.2,0),l.add(Me),Ae.glows.push(w(l,new M(0,2.2,0),10474751,7))});u.userData.infoKey="research",vi.push(u),R(u,"researcher",-.8,-1.4,1.2,"林澈","奥林帕斯科研站 · 站长",["生态系统：站内气压 101.3 kPa，氧气由 Verde 生态城与本地水培舱共同维持。","能源：白昼依赖太阳能薄膜，极夜与沙暴期间切换至微型裂变堆，储能可用 47 天。","城市运行：六座主要定居点通过磁悬浮干线互联，物流由自动货运舱完成，人员通勤每日 42 班次。","当前状态：所有穹顶气密性正常，水循环效率 99.2%，下一班地球补给船预计 3 个月后抵达。"])}const J={id:"yard",radius:3.6,dir:null};{const u=E[0].dir,l=new M(0,1,0).addScaledVector(u,-u.y).normalize(),f=new M().crossVectors(l,u);J.dir=u.clone().addScaledVector(f,.19).addScaledVector(l,-.155).normalize(),Ni(J,J.radius,x=>{const T=new wt({color:9274748,roughness:.9,metalness:.05}),L=new wt({color:2830392,roughness:.95}),U=new wt({color:14275270,roughness:.6,metalness:.1,emissive:3813670,emissiveIntensity:.4}),W=new wt({color:2761752,emissive:16763256,emissiveIntensity:1.6,roughness:.4}),D=new b(new Nt(6.2,.05,.5),L);D.position.set(.1,.028,.9),x.add(D);const F=new b(new Nt(.5,.05,1.6),L);F.position.set(-1.6,.028,1.5),x.add(F);const G=[];for(let le=0;le<9;le++)G.push({p:new M(-2.9+le*.75,.09,1.22),s:new M(.03,.09,.03)});x.add(Rn(new Nt(1,1,1),new wt({color:3353114,emissive:16756816,emissiveIntensity:1.8}),G));const Z=new St,Y=new b(new pt(1.15,1.25,.12,28),T);Y.position.y=.06,Z.add(Y);const st=new b(new Ve(.95,.035,6,48).rotateX(Math.PI/2),Jt);st.position.y=.13,Z.add(st);for(let le=0;le<6;le++){const de=le/6*Math.PI*2,Qe=new b(new Nt(.05,.05,.05),W);Qe.position.set(Math.cos(de)*1.05,.15,Math.sin(de)*1.05),Z.add(Qe)}Z.position.set(-1.6,0,2.3),x.add(Wt(Z,"landpad")),x.userData.buildings.push(Z);const gt=new St,bt=new b(new pt(.24,.26,1.6,14),new wt({color:15262938,roughness:.45,metalness:.3}));bt.position.y=.95,gt.add(bt);const Ut=new b(new Ai(.24,.5,14),yt);Ut.position.y=2,gt.add(Ut);for(let le=0;le<4;le++){const de=le/4*Math.PI*2+Math.PI/4,Qe=new b(new pt(.03,.04,.5,6),yt);Qe.position.set(Math.cos(de)*.36,.25,Math.sin(de)*.36),Qe.rotation.z=Math.cos(de)*.28,Qe.rotation.x=-Math.sin(de)*.28,gt.add(Qe)}gt.position.set(-1.6,.12,2.3),x.add(Wt(gt,"crocket")),x.userData.buildings.push(gt);const ne=new St;for(const le of[-1,1]){const de=new b(new Nt(.09,1.5,.09),dt);de.position.set(le*.5,.75,0),ne.add(de)}const Le=new b(new Nt(1.15,.09,.09),ft);Le.position.y=1.5,ne.add(Le);const Re=new b(new Nt(.5,.05,.4),yt);Re.position.set(0,1.05,.2),ne.add(Re);const Me=new b(new Nt(.5,.05,.05),ft);Me.position.set(-.35,1.32,0),ne.add(Me),ne.position.set(-.55,0,2.6),ne.rotation.y=.4,x.add(Wt(ne,"mgantry")),x.userData.buildings.push(ne);const ae=new St,Pt=new b(new Ge(.2,.7,4,10).rotateZ(Math.PI/2),dt);Pt.position.y=.32,ae.add(Pt);const at=new b(new Nt(.5,.03,.55),yt);at.position.y=.3,ae.add(at);for(const le of[-1,1]){const de=new b(new Nt(.08,.2,.3),yt);de.position.set(le*.3,.1,0),ae.add(de)}ae.position.set(-2.6,0,-.7),ae.rotation.y=-.5,x.add(Wt(ae,"cship")),x.userData.buildings.push(ae);const _t=[],et=[];for(let le=0;le<3;le++)for(let de=0;de<6;de++)_t.push({p:new M(1.4+de*.5,.32,-2.4-le*.45),s:new M(.42,.04,.32)}),et.push({p:new M(1.4+de*.5,.15,-2.4-le*.45),s:new M(.04,.3,.04)});const $=Rn(new Nt(1,1,1),X,_t);x.add(Wt($,"solarfarm")),x.userData.buildings.push($),x.add(Rn(new pt(1,1,1,6),yt,et));const mt=new St;for(let le=0;le<5;le++){const de=new b(new pt(.16,.16,.6,10),dt);de.position.set(le*.42-.84,.3,0),mt.add(de);const Qe=new b(new Nt(.08,.05,.02),W);Qe.position.set(le*.42-.84,.42,.17),mt.add(Qe)}mt.position.set(2.3,0,.3),x.add(Wt(mt,"battery")),x.userData.buildings.push(mt);const Ot=new b(new pt(.05,.05,3.05,6),dt);Ot.position.set(1.15,.12,-.7),Ot.rotation.z=Math.PI/2,Ot.rotation.y=-Math.atan2(-2,-2.3),x.add(Ot);const ce=new St,Se=new b(new Nt(1.9,.8,1.1),ft);Se.position.y=.4,ce.add(Se);const Ye=new b(new Nt(2,.08,1.2),yt);Ye.position.y=.84,ce.add(Ye);for(let le=0;le<3;le++){const de=new b(new Nt(.4,.5,.03),yt);de.position.set(-.6+le*.6,.25,.57),ce.add(de)}ce.position.set(0,0,-1.8),x.add(Wt(ce,"fabhall")),x.userData.buildings.push(ce);for(const le of[-.5,.5]){const de=new St,Qe=new b(new pt(.09,.12,.25,8),yt);Qe.position.y=.12,de.add(Qe);const jn=new b(new Nt(.07,.55,.07),dt);jn.position.set(0,.5,0),jn.rotation.z=.35,de.add(jn);const Ue=new b(new Nt(.05,.4,.05),ft);Ue.position.set(.16,.78,0),Ue.rotation.z=-.5,de.add(Ue),de.position.set(le,0,-1.1),x.add(de)}const xn=[];for(let le=0;le<10;le++)xn.push({p:new M(-1.5+le%5*.4,.16+Math.floor(le/5)*.26,-2.6),s:new M(.34,.22,.2),ry:(d()-.5)*.1});x.add(Rn(new Nt(1,1,1),ft,xn));for(let le=0;le<4;le++){const de=new St,Qe=new b(new Ge(.24,.5,4,10).rotateZ(Math.PI/2),U);Qe.position.y=.24,de.add(Qe);for(let jn=0;jn<3;jn++){const Ue=new b(new Nt(.06,.06,.02),W);Ue.position.set(-.2+jn*.2,.3,.24),de.add(Ue)}de.position.set(1.5+le*.7,0,1.9),de.rotation.y=-.35,x.add(Wt(de,"habmod")),x.userData.buildings.push(de)}const Je=new St,Ze=new b(new pt(.85,.9,.07,24),T);Ze.position.y=.035,Je.add(Ze);const zt=new b(new pt(.05,.07,.9,8),dt);zt.position.y=.45,Je.add(zt);const Bt=new b(new ie(.09,10,8),Jt);Bt.position.y=.95,Je.add(Bt);for(let le=0;le<4;le++){const de=le/4*Math.PI*2+.4,Qe=new b(new Nt(.3,.06,.12),yt);Qe.position.set(Math.cos(de)*.55,.1,Math.sin(de)*.55),Qe.rotation.y=-de,Je.add(Qe)}Je.position.set(.5,0,1.6),x.add(Wt(Je,"plaza")),x.userData.buildings.push(Je),w(x,new M(.5,.95,1.6),10479871,.9);for(let le=0;le<3;le++){const de=new St,Qe=new b(new Ge(.03,.07,3,6),U);Qe.position.y=-.22,de.add(Qe),x.add(de),Ae.walkers.push({mesh:de,cx:.5,cz:1.6,r:.28+le*.14,phase:d()*6.28,speed:.22+d()*.18})}const $t=new St;for(const le of[-1,1]){const de=new b(new Nt(6.4,.06,.07),dt);de.position.set(0,.6,le*.13),$t.add(de)}for(let le=0;le<5;le++){const de=new b(new pt(.035,.045,.6,6),yt);de.position.set(-3+le*1.5,.3,0),$t.add(de)}const qe=new b(new Ge(.08,.42,4,8).rotateZ(Math.PI/2),new wt({color:15265266,roughness:.3,metalness:.5,emissive:6740479,emissiveIntensity:.4}));qe.position.y=.72,$t.add(qe),Ae.pods.push({mesh:qe,kind:"line",x0:-3,x1:3,y:.72,speed:.5,t:d()}),$t.position.set(.1,0,-.6),x.add(Wt($t,"maglev")),x.userData.buildings.push($t);for(const[le,de,Qe]of[[-1.2,1.2,.6],[.9,-.2,.8]]){const jn=new St,Ue=new b(new Nt(.16,.08,.12),yt);Ue.position.y=-.26,jn.add(Ue);const Xe=new b(new Nt(.1,.04,.09),ft);Xe.position.y=-.2,jn.add(Xe);const bn=new b(new ie(.02,6,6),Jt);bn.position.set(.08,-.24,0),jn.add(bn),x.add(jn),Ae.walkers.push({mesh:jn,cx:le,cz:de,r:Qe,phase:d()*6.28,speed:.4+d()*.2})}const sn=[];for(let le=0;le<22;le++){const de=d()*Math.PI*2,Qe=2.2+d()*2.2;sn.push({p:new M(Math.cos(de)*Qe,.05+d()*.06,Math.sin(de)*Qe),s:new M(.1+d()*.3,.08+d()*.2,.1+d()*.3),ry:d()*3})}x.add(Rn(new rl(1,0),new wt({color:8143408,roughness:1}),sn));const Sn=K("A-3 着陆场",2.2);Sn.position.set(-1.6,1.2,3.4),x.add(Sn);const ti=K("装配车间",2.2);ti.position.set(0,1.4,-1.8),x.add(ti);const js=K("中央广场",2.2);js.position.set(.5,1.6,1.6),x.add(js);const Hi=K("储能阵列",2.2);Hi.position.set(2.3,1.1,.3),x.add(Hi);const Gi=K("Aurelia 城郊带 · Meridian Yard",6);Gi.position.set(0,3.6,0),x.add(Gi)})}{const u=E[3].dir,l=E[1].dir,f=[];for(let x=0;x<=32;x++){const T=x/32,L=u.clone().lerp(l,T).normalize();f.push(L.clone().multiplyScalar(50+vt(L)+.35))}Ct.add(new b(new Ci(new Or(f),64,.12,6),new wt({color:8366268,roughness:.4,metalness:.7,emissive:1855080,emissiveIntensity:.5})))}{const u=[],l=[],f=[1,.79,.54],x=[.56,.91,1],T=(F,G,Z)=>{u.push(F.x,F.y,F.z),l.push(G[0]*Z,G[1]*Z,G[2]*Z)};E.forEach((F,G)=>{const Z=G===0?1e3:G===5?140:480,Y=G===0?.17:G===5?.05:.1;for(let st=0;st<Z;st++){const gt=F.dir.clone().add(new M((d()-.5)*Y,(d()-.5)*Y,(d()-.5)*Y)).normalize();T(gt.multiplyScalar(50+vt(gt)+.12),d()>.45?f:x,.25+d()*.5)}});const L=[];let U=0;for(;L.length<14&&U++<400;){const F=C((d()*2-1)*52,d()*360-180);let G=!0;for(const Z of E)if(F.angleTo(Z.dir)<.4){G=!1;break}if(G){for(const Z of L)if(F.angleTo(Z)<.3){G=!1;break}}G&&L.push(F)}L.forEach(F=>{for(let Z=0;Z<70;Z++){const Y=F.clone().add(new M((d()-.5)*.05,(d()-.5)*.05,(d()-.5)*.05)).normalize();T(Y.multiplyScalar(50+vt(Y)+.1),d()>.5?f:x,.25+d()*.5)}const G=new St;G.position.copy(F.clone().multiplyScalar(50+vt(F))),G.quaternion.setFromUnitVectors(new M(0,1,0),F),G.add(new b(new ie(.55,16,8,0,Math.PI*2,0,Math.PI/2),ut(.3)));for(let Z=0;Z<3;Z++){const Y=new b(new Nt(.4+d()*.2,.22,.3),kt),st=d()*Math.PI*2;Y.position.set(Math.cos(st)*(.8+d()*.5),.11,Math.sin(st)*(.8+d()*.5)),Y.rotation.y=d()*3,G.add(Y)}w(G,new M(0,.7,0),16767392,1.5),Ct.add(G)}),[[0,1],[0,2],[0,3],[1,4],[2,4],[3,5]].forEach(([F,G])=>{const Z=E[F].dir,Y=E[G].dir,st=[];for(let bt=0;bt<=48;bt++){const Ut=Z.clone().lerp(Y,bt/48).normalize();st.push(Ut.multiplyScalar(50+vt(Ut)+.28))}const gt=new Or(st);Ct.add(new b(new Ci(gt,72,.06,6),new wt({color:2767430,roughness:.5,metalness:.6,emissive:4839423,emissiveIntensity:.7})));for(let bt=0;bt<80;bt++)T(gt.getPoint(d()),x,.2+d()*.35);for(let bt=0;bt<2;bt++){const Ut=new b(new Ge(.07,.55,4,8),new gn({color:12579839}));Ct.add(Ut),Ae.liners.push({mesh:Ut,curve:gt,speed:(.014+d()*.012)*(bt?-1:1),t:d()})}});const D=new vn;D.setAttribute("position",new We(u,3)),D.setAttribute("color",new We(l,3)),Ct.add(new Ur(D,new nr({size:.34,vertexColors:!0,transparent:!0,opacity:.72,blending:On,depthWrite:!1})))}const nt=(()=>{const u=E[0],l=no(u),f=u.dir.clone().multiplyScalar(96),x=f.distanceTo(l),T=new b(new pt(.055,.055,x,6),new wt({color:10467012,roughness:.4,metalness:.8,emissive:2902622,emissiveIntensity:.7}));T.position.copy(l).lerp(f,.5),T.quaternion.setFromUnitVectors(new M(0,1,0),u.dir),Ct.add(T);const L=new b(new Nt(.4,.6,.4),new wt({color:14674158,emissive:7268351,emissiveIntensity:1.4}));Ct.add(L),Ae.climber={mesh:L,a:l.clone(),b:f.clone()};const U=new St;U.position.copy(f),U.quaternion.setFromUnitVectors(new M(0,1,0),u.dir),U.add(new b(new Ve(2.4,.42,10,40).rotateX(Math.PI/2),dt)),U.add(new b(new ie(.8,16,16),yt));for(let W=0;W<4;W++){const D=new b(new Nt(2.6,.06,.9),X),F=W*Math.PI/2;D.position.set(Math.cos(F)*3.4,0,Math.sin(F)*3.4),D.rotation.y=-F,U.add(D)}return w(U,new M(0,0,0),9431295,6),U.userData.infoKey="spaceport",Ct.add(U),vi.push(U),U})();{const u=new b(new Ve(72,.22,8,128),new wt({color:9082788,roughness:.5,metalness:.7,emissive:3362922,emissiveIntensity:.6}));u.rotation.x=Math.PI/2-.4,u.rotation.z=.25,Ct.add(u)}for(let u=0;u<6;u++){const l=j();Ct.add(l),Ae.ships.push({mesh:l,r:78+u*8,speed:.05+d()*.05,phase:d()*Math.PI*2,tilt:.3+u*.22})}{const u=At(2.6,7037274,101),l=new St;l.add(u),u.position.set(132,8,0),l.rotation.z=.06,n.add(l),Ae.moons.push({pivot:l,mesh:u,speed:.055,spin:.15});const f=At(1.6,5722186,202),x=new St;x.add(f),f.position.set(-185,-14,0),x.rotation.z=-.12,n.add(x),Ae.moons.push({pivot:x,mesh:f,speed:.028,spin:.08})}n.add(Ht(6e3,1250,1700,1.7,.95,!1)),n.add(Ht(5200,0,0,3.6,.55,!0));for(let u=0;u<3;u++){const l=new M(d()*2-1,d()*2-1,d()*2-1).normalize().multiplyScalar(1350+d()*250),f=260,x=new Float32Array(f*3);for(let L=0;L<f;L++)x.set([l.x+(d()-.5)*70,l.y+(d()-.5)*70,l.z+(d()-.5)*70],L*3);const T=new vn;T.setAttribute("position",new Hn(x,3)),n.add(new Ur(T,new nr({color:13624063,size:2.2,transparent:!0,opacity:.8,blending:On,depthWrite:!1,fog:!1})))}[[250,1500,900,.7],[215,1380,620,.55],[190,1620,1100,.6],[25,1460,760,.5],[280,1550,980,.65],[200,1320,540,.45],[320,1700,1150,.5],[35,1580,820,.4],[265,1420,700,.5],[45,1660,1e3,.45]].forEach(([u,l,f,x])=>{const T=new Ca(new Eo({map:oe(u),transparent:!0,opacity:x,blending:On,depthWrite:!1,fog:!1})),L=new M(d()*2-1,(d()*2-1)*.55,d()*2-1).normalize();T.position.copy(L.multiplyScalar(l));const U=f*(.8+d()*.5);T.scale.set(U,U,1),n.add(T)}),[[1480,.8,.3],[-1650,-.4,-.5]].forEach(([u,l,f],x)=>{const T=new Ca(new Eo({map:Qt(),transparent:!0,opacity:.7-x*.2,blending:On,depthWrite:!1,fog:!1})),L=new M(x?-.5:.6,l,x?.6:-.5).normalize();T.position.copy(L.multiplyScalar(u)),T.material.rotation=f*2;const U=300-x*80;T.scale.set(U,U,1),n.add(T)}),w(n,c.clone().multiplyScalar(1900),16773853,420).material.fog=!1;const ye={capital:{title:"火星首都 · Aurelia",body:"人口 42 万，火星最大城市。直径 8 km 的巨型穹顶之下：摩天塔群、中央广场、光环磁悬浮、空中交通层与整片生态绿地——火星版未来纽约。",npc:["城市规划师 · 岚",'"地球上城市消耗自然，这里的城市本身就是自然——氧气、水、温度，全部由我们亲手维持。这不是殖民地，是家。"']},eco:{title:"翡绿生态城 · Verde",body:"火星版新加坡。主穹顶内是人工森林、生态运河与垂直农场，副穹顶是温室农田。红色荒漠与绿色生命只隔一层 40 cm 的复合玻璃。",npc:["生态工程师 · 苔",'"每一片叶子的光照、每一滴水的循环都由 AI 气候系统照料。我们把地下两万年的冰，变成了流动的河。"']},industrial:{title:"赫菲斯托斯工业城",body:"火星赤道工业带核心：聚变能源塔、液氢储罐、水冰加工厂、星舰总装厂房、机器人产线与真空货运轨道。每 72 小时，一艘货运飞船在这里总装完成。",npc:["火箭工程师 · 卡尔",'"月球是跳板，火星是船坞。从这里出发的飞船，用的是火星的冰、火星的燃料、火星造的引擎。"']},mining:{title:"冰川矿城 · Glacies",body:"建立在北纬 52° 富冰带之上。钻塔深入地下冰层 2.4 km，采冰机器人全天候作业，冰浆经管道输往赤道——火星文明的水龙头。",npc:["采矿监督 AI · W-7",'"今日产冰 12,400 吨。提醒：这颗星球 60% 的饮用水，经过我的钻头。"']},frontier:{title:"前哨城 · Frontier",body:"南半球最新落成的居住穹顶，容纳 6 万新移民。打印机器人 + 预制穹顶 + 成熟生态模板，让「造一座城」只需要 14 个月。",npc:["新移民 · 阿梨",'"我出生在地球，但我女儿出生在这里。对她来说，火星不是远方，是故乡。"']},spaceport:{title:"轨道空间港 · Areos Gate",body:"太空电梯顶端枢纽，客运舱 6 小时直达轨道。货运飞船在此补给燃料，前往地球、月球与正在施工的外太阳系航路。",npc:["塔台管制员",'"欢迎回家。下一次地火转移窗口在 14 个月后——船票已经排到明年了。"']},research:{title:"奥林帕斯科研站",body:"坐落于奥林帕斯山麓的综合科研基地：巡天观测穹顶、射电天线阵、综合实验舱与样本冷藏库。火星的地质、气候与生命科学数据，都在这里被逐条破译。",npc:["科研站站长 · 林澈",'"今日风速 34 m/s，气压 612 Pa，观测条件：极佳。晨线之后能看到奥林帕斯山——值得一看。"']}},ue=document.getElementById("info");let qt="planet",He=null;const Ke=document.getElementById("backBtn"),ke=document.getElementById("hint");let te=null;const mn=u=>u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;Ke.onclick=Ln;const Oi=document.getElementById("exploreHud"),fn=document.getElementById("exploreLoc"),In=document.getElementById("exploreAim"),qn=document.getElementById("aimT"),Un=document.getElementById("aimD"),fe={dir:new M(0,0,1),yaw:0,pitch:0,third:!0,dist:.9,clickDir:null},Nn={},yi=[];Object.keys(_n).forEach(u=>yi.push(..._n[u].userData.buildings||[]));const Ho={capital:"火星首都 · Aurelia",industrial:"赫菲斯托斯工业城",eco:"翡绿生态城 · Verde",mining:"冰川矿城 · Glacies",frontier:"前哨城 · Frontier",research:"奥林帕斯科研站"};let Mi=null;const Ss=new M,io=new M,wi=new M,hr=new M,pn=new M,dr=new M,Vs=new M,Wn=new M,Df=new Dt(0,0),Oh=new Ce;let ml=0,gl=0,Go=0,Bi=0,Hs=0;const Bh=yi.map(u=>({o:u,p:new M}));Bh.forEach(u=>u.o.getWorldPosition(u.p)),Ki.forEach(u=>u.mesh.getWorldPosition(u.worldPos));const so=document.getElementById("npcDialog"),zh=document.getElementById("npcAvatar"),kh=document.getElementById("npcName"),Vh=document.getElementById("npcRole"),ro=document.getElementById("npcLine");let ur=null,Wo=0;const Xo=new m0(13625599,0,5,1.8);n.add(Xo);const _l=document.getElementById("xdDialog"),Lf=document.getElementById("xdLine"),Hh=document.getElementById("objT"),Gh=document.getElementById("objC"),fr=document.getElementById("discBanner"),Wh=document.getElementById("discName"),Te={char:null,queue:[],typed:0,lineTimer:0,hold:4.4},Pn={target:new M,timer:0},$i={timer:2.5,phase:0},un={name:null,t:0,dur:0},Yo=new Ce,Gs=new ci,Xh=new ci,Yh=["嗯？你叫我吗？","嘿嘿，我在呢。","戳我干嘛啦……要问路的话，按 F 就好。","哇！吓我一跳。","喜欢我触角上的小星球吗？"],qh=["（张望）今天的风很温柔，适合去纪念碑那边走走。","你听——远处的磁悬浮，是这座城市的脉搏。","不急。火星的一天有 24 小时 39 分钟，我们慢慢来。"],jh={aero:{types:["crocket","cship","mgantry"],line:"看那些火箭——每 72 小时，就有一艘从这里点火升空。将来你去轨道港，坐的就是它。"},energy:{types:["battery","solarfarm","etree"],line:"这片是城市的充电宝。火星的白天很长，沙暴季更长——没有它们，穹顶里的灯撑不过三天。"},life:{types:["habmod","plaza"],line:"有人住的地方就有光。工程师下班会去广场喝一杯——火星咖啡，喝一口，少一口地球味。"},maker:{types:["fabhall"],line:"这座车间里的东西，八成是用火星土造的。我们不从地球搬房子——我们在这里「种」房子。"},ice:{types:["iceplant","watertower","drill"],line:"你呼吸的氧、喝的水，都来自脚下 2.4 公里的冰层。生命维持系统，是这颗星球的心跳——别只把它当工厂看。"}},qo=new M,Kh=new Set;let Zh=!1,oo=0,jo=0;const $h=["（对上视线）嗯？我脸上有东西吗？","（注意到你）在看什么？带我一个。","（歪头）你一直盯着我看的时候，触角会紧张的。"],Tn=Nf();Te.char=Tn.g;const Ko=Tn.eyeL.children[0].material,Ff={capital:"这就是 Aurelia——火星的心脏。看到那根最高的尖塔了吗？那是 Musk 纪念碑，全火星最高的建筑。走近它，你会读到一段铭文。",eco:"Verde 到了。红色荒漠里的一整块森林——穹顶里面，连空气都是甜的。",industrial:"Hephaestus 工业城。听见了吗？每 72 小时，这里就有一艘新船点火升空。",mining:"Glacies，火星的水龙头。你脚下 2.4 公里深处，冰层正在变成整颗星球的饮用水。",frontier:"Frontier——最新的一座城。14 个月前这里还只有风。现在，6 万人管这里叫家。",research:"奥林帕斯科研站。天气好的话抬头看看——太阳系最高的山，就在你旁边。"},$o=new Set;let Qh=!1,td=!1,bs=null;const ki=new b(new pt(.32,.55,15,12,1,!0),new gn({color:8254153,transparent:!0,opacity:.13,blending:On,side:Xn,depthWrite:!1}));ki.visible=!1,ki.renderOrder=4,n.add(ki);const Of=new bh(10117688,.05),ed=260,Jo=new Float32Array(ed*3);for(let u=0;u<ed;u++)Jo[u*3]=(Math.random()-.5)*6,Jo[u*3+1]=Math.random()*1.1+.05,Jo[u*3+2]=(Math.random()-.5)*6;const nd=new vn;nd.setAttribute("position",new Hn(Jo,3));const Ji=new Ur(nd,new nr({color:14262378,size:.02,transparent:!0,opacity:.38,depthWrite:!1}));Ji.visible=!1,n.add(Ji);const Bf=new M(0,1,0);document.getElementById("btnSurface").onclick=()=>{qt==="surface"?As():xl()};let ao=!1;document.getElementById("btnLand").onclick=()=>{if(qt==="explore"||ao)return;if(qt==="city"&&He){ta(He);return}const u=i.position.clone().normalize();let l=null,f=1e9;for(const x in _n){const T=_n[x].position.clone().normalize().angleTo(u);T<f&&(f=T,l=_n[x])}ta(l)};const yl=document.getElementById("visor");window.addEventListener("keydown",u=>{oo=0;const l=vl(u.key);if(Nn[l]=!0,qt==="explore"&&l==="v"&&!u.repeat&&(fe.third=!fe.third,Es()),qt==="explore"&&l===" "&&Bi===0&&Hs===0&&!u.repeat&&(Hs=.55,u.preventDefault()),qt==="explore"&&l==="f"&&!u.repeat)if(bs){const f=(fe.dir.angleTo(bs.dir)*50).toFixed(1);An(`${Ho[bs.id]}在光柱的方向，大约 ${f} 公里。跟着光走，别迷路——火星上没有路标，只有我。`)}else An("所有区域都已发现。想聊聊的话，去找陈栖或林澈——他们比我更懂这颗星球。")}),window.addEventListener("keyup",u=>{Nn[vl(u.key)]=!1});let pr=null;e.domElement.addEventListener("pointerdown",u=>{qt==="explore"&&(pr=[u.clientX,u.clientY])}),window.addEventListener("pointermove",u=>{qt!=="explore"||!pr||(fe.yaw+=(u.clientX-pr[0])*.004,fe.pitch=y(fe.pitch-(u.clientY-pr[1])*.004,-1.15,1.15),pr=[u.clientX,u.clientY])}),window.addEventListener("pointerup",()=>{pr=null}),window.addEventListener("wheel",u=>{if(qt!=="explore")return;const l=Math.sign(u.deltaY);if(l>0&&!fe.third){fe.third=!0,Es();return}fe.dist=y(fe.dist+l*.14,.45,2.4),l<0&&fe.third&&fe.dist<=.5&&(fe.third=!1,fe.dist=.9,Es())},{passive:!0});const mi=new I0,ea=new Dt,Hf=new fs(new M(0,1,0),0),na=new M;let lo=null;e.domElement.addEventListener("pointerdown",u=>{lo=[u.clientX,u.clientY],oo=0}),e.domElement.addEventListener("pointerup",u=>{if(!lo)return;const l=Math.hypot(u.clientX-lo[0],u.clientY-lo[1]);if(lo=null,l>6||te)return;if(ea.set(u.clientX/innerWidth*2-1,-(u.clientY/innerHeight)*2+1),mi.setFromCamera(ea,i),qt==="city"&&He){const x=mi.intersectObjects(He.userData.buildings,!0);if(x.length){let T=x[0].object;for(;T&&!T.userData.btype;)T=T.parent;T&&Be(T.userData.btype,He.userData.buildings.indexOf(T)+1)}return}if(qt==="explore"){if(Te.char&&Te.char.visible){mi.setFromCamera(ea,i);const T=mi.intersectObject(Te.char,!0);T.length&&T[0].distance<3&&(Pn.target.copy(i.position),Pn.timer=3,$i.phase=.18,zi(["wave","happy","confused"][Math.floor(Math.random()*3)]),An(Yh[Math.floor(Math.random()*Yh.length)]))}mi.setFromCamera(ea,i);const x=mi.intersectObject(Pe,!1);x.length&&(fe.clickDir=x[0].point.clone().normalize());return}if(qt==="surface"){if(Mt.player&&Mt.city){let x=!1;if(Mt.city.groundMesh){const T=mi.intersectObject(Mt.city.groundMesh,!1);T.length&&(na.copy(T[0].point),x=!0)}else mi.ray.intersectPlane(Hf,na)&&(x=!0);x&&Mt.player.setClickTarget(na.x,na.z,Mt.city.colliders,Mt.city.bounds)}return}const f=mi.intersectObjects(vi,!0);if(f.length){let x=f[0].object;for(;x&&!x.userData.infoKey&&!x.userData.btype;)x=x.parent;if(!x)return;if(x.userData.btype==="monument"){Be("monument",1);const T=new M;x.getWorldPosition(T),hi(),qt="city",He=_n.capital,De(T.clone().multiplyScalar(1.24).add(new M(0,7,0)),T,2.4,()=>{r.minDistance=1.2,r.maxDistance=60,Ke.style.display="block",ke.textContent="拖动环视城市 · 滚轮缩放 · 点击建筑查看"});return}if(x.userData.infoKey==="spaceport"){me("spaceport");const T=new M;x.getWorldPosition(T),hi(),De(T.clone().multiplyScalar(1.32).add(new M(0,10,0)),T,2.4,()=>{r.autoRotate=!0});return}if(x.userData.infoKey){if(hi(),Il[x.userData.infoKey]){cd(x.userData.infoKey);return}Fi(x,x.userData.infoKey)}}});let co=-1,ia=null,Ws=!1;const sa=document.getElementById("btnTour"),sd=["capital","eco","industrial","mining","frontier","research"];sa.onclick=()=>{Ws?(hi(),Ln()):(Ws=!0,sa.classList.add("on"),co=-1,Ml())},r.addEventListener("start",()=>{Ws&&hi()});let Qi=0,Si=0;const ra=document.getElementById("btnIce");ra.onclick=()=>{Qi=Qi?0:1,ra.classList.toggle("on",!!Qi),Qi&&(Kt.transparent=!0,Kt.needsUpdate=!0,di("地下水冰透视：基岩 / 冰川层 / 储水区"),ue.innerHTML=`<h3>地下水冰系统</h3><p>透视显示火星地下结构：深褐基岩层、带冰裂纹的连续冰川层、浅层浮冰与深层液态储水区。Glacies 矿城正下方可见采冰机器人与地下采矿基地——2126 年火星文明的生命线。</p>
      <div class="npc"><b>地质学家 · 岩</b><br>"选火星不是因为它是红色的——是因为红色下面，藏着足够多的水。"</div>`)},document.getElementById("btnReset").onclick=()=>{hi(),Qi=0,ra.classList.remove("on"),qt="planet",He=null,Ke.style.display="none",r.minDistance=64,r.maxDistance=700,ke.textContent="拖动旋转 · 滚轮缩放 · 点击城市进入",De(ln.clone(),new M(0,0,0),2,()=>{r.autoRotate=!0})};const wl=document.getElementById("toast");let Sl=null;document.querySelectorAll("#nav button[data-nav]").forEach(u=>{u.dataset.nav!=="mars"&&(u.onclick=()=>MarsModule.goto(u.dataset.nav))}),document.getElementById("enterBtn").onclick=()=>{document.getElementById("intro").classList.add("hide"),De(ln.clone(),new M(0,0,0),3.2,()=>{r.autoRotate=!0})};{const u=new URLSearchParams(location.search);(u.has("auto-enter")||u.has("auto-land"))&&(document.getElementById("enterBtn").click(),u.has("auto-land")&&setTimeout(()=>window.__mars?.enterSurface("capital"),3600),history.replaceState(null,"",location.pathname))}class Gf{setPosition(){}setYaw(){}setQuaternion(){}setVisible(){}setState(){}update(){}attachTo(){}detach(){}dispose(){}get object3d(){return null}get height(){return 1}}class Wf extends Gf{constructor(l={}){super(),this.heightTarget=l.height||.95,this.state="idle",this.glbReady=!1,this.mixer=null,this.actions={},this._curAction=null,this.group=new St,this.group.userData.isAvatar=!0,this.inner=new St,this.group.add(this.inner),this._t=0,this._blink=2.5,this._blinkPhase=0,this._modelYaw=0,this._stepPhase=0,this._buildProxy(),this._tryLoadGLB()}get object3d(){return this.group}get height(){return this.heightTarget}_buildProxy(){const l=this.heightTarget/.95,f=new St,x=new wt({color:4640959,roughness:.92,metalness:.02}),T=new wt({color:3452320,roughness:.92}),L=new wt({color:16774870,roughness:.85}),U=new gn({map:Jh()}),W=new gn({color:9059138}),D=new gn({color:15005578}),F=new gn({color:16769658}),G=new wt({color:12174540,roughness:.3,metalness:.85}),Z=new b(new Ge(.155*l,.17*l,6,14),x);Z.position.y=.335*l,f.add(Z);const Y=new b(new ie(.115*l,14,12),L);Y.position.set(0,.31*l,.075*l),Y.scale.set(1,1.2,.6),f.add(Y);const st=new St;st.position.set(-.075*l,.055*l,.01*l),f.add(st);const gt=new St;gt.position.set(.075*l,.055*l,.01*l),f.add(gt);for(const Bt of[st,gt]){const $t=new b(new Ge(.05*l,.06*l,4,10),T);$t.position.z=.02*l,Bt.add($t)}const bt=new St;bt.position.set(-.155*l,.42*l,0),f.add(bt);const Ut=new St;Ut.position.set(.155*l,.42*l,0),f.add(Ut);for(const[Bt,$t]of[[bt,1],[Ut,-1]]){const qe=new b(new Ge(.042*l,.11*l,4,10),T);qe.position.y=-.08*l,Bt.add(qe),Bt.rotation.z=$t*.25}const ne=new St;ne.position.set(0,.24*l,-.14*l),f.add(ne);const Le=new b(new Ge(.032*l,.12*l,4,8),T);Le.position.set(0,.05*l,-.06*l),Le.rotation.x=.85,ne.add(Le);const Re=new b(new ie(.06*l,10,8),L);Re.position.set(0,.11*l,-.13*l),ne.add(Re);const Me=new St;Me.position.y=.62*l,f.add(Me);const ae=new b(new ie(.21*l,20,16),x);ae.scale.set(1.06,.94,.96),Me.add(ae);const Pt=new b(new ie(.17*l,16,12),L);Pt.position.set(0,-.03*l,.075*l),Pt.scale.set(.95,.78,.55),Me.add(Pt);const at=new ie(.06*l,14,10),_t=new St;_t.position.set(-.085*l,.02*l,.145*l),Me.add(_t);const et=new St;et.position.set(.085*l,.02*l,.145*l),Me.add(et);for(const Bt of[_t,et]){const $t=new b(at,U);$t.scale.set(1,1.3,.45),Bt.add($t)}for(const Bt of[-1,1]){const $t=new b(new ie(.028*l,8,6),new gn({color:16230584,transparent:!0,opacity:.7}));$t.position.set(Bt*.125*l,-.045*l,.12*l),$t.scale.set(1,.7,.4),Me.add($t)}const $=new b(new Ve(.038*l,.009*l,6,14,Math.PI),W);$.position.set(0,-.075*l,.16*l),$.rotation.z=Math.PI,Me.add($);const mt=new ie(.11*l,12,10),Ot=new St;Ot.position.set(-.2*l,.06*l,-.01*l),Me.add(Ot);const ce=new St;ce.position.set(.2*l,.06*l,-.01*l),Me.add(ce);for(const[Bt,$t]of[[Ot,1],[ce,-1]]){const qe=new b(mt,T);qe.scale.set(.55,1.25,.4),qe.position.set($t*-.04*l,-.11*l,0),Bt.add(qe),Bt.rotation.z=$t*.5;const sn=new b(new ie(.07*l,10,8),L);sn.scale.set(.5,1.1,.3),sn.position.set($t*-.03*l,-.1*l,.03*l),Bt.add(sn)}const Se=Bt=>{const $t=new St;$t.position.set(Bt*.075*l,.17*l,0);const qe=new b(new pt(.013*l,.016*l,.17*l,6),T);qe.position.y=.085*l,$t.add(qe);const sn=new b(new ie(.042*l,12,10),D);sn.position.y=.19*l,$t.add(sn);const Sn=new b(new Ve(.06*l,.007*l,6,18).rotateX(Math.PI/2.4),F);return Sn.position.y=.19*l,$t.add(Sn),$t.rotation.z=Bt*-.3,Me.add($t),$t},Ye=Se(-1),xn=Se(1);w(Me,new M(-.1*l,.22*l,0),15005578,.5*l),w(Me,new M(.1*l,.22*l,0),15005578,.5*l);const Je=new b(new Ve(.135*l,.02*l,8,22).rotateX(Math.PI/2),G);Je.position.y=.49*l,f.add(Je);const Ze=new b(new Rh(.032*l),F);Ze.position.set(0,.47*l,.135*l),f.add(Ze),w(f,new M(0,.47*l,.15*l),16769658,.4*l),this.proxy=f;const zt=new ji().setFromObject(f);isFinite(zt.min.y)&&(this.inner.position.y=-zt.min.y),this.inner.add(f),this.parts={body:Z,head:Me,eyeL:_t,eyeR:et,armL:bt,armR:Ut,footL:st,footR:gt,tail:ne,antL:Ye,antR:xn,earL:Ot,earR:ce,mouth:$}}async _tryLoadGLB(){try{const{GLTFLoader:l}=await tp(async()=>{const{GLTFLoader:f}=await import("./GLTFLoader-9sbdC8Q0.js");return{GLTFLoader:f}},[],import.meta.url);new l().load("assets/characters/xingda.glb",f=>{const x=f.scene,T=new ji().setFromObject(x),L=T.max.y-T.min.y||1,U=this.heightTarget/L;x.scale.setScalar(U),x.position.y=-T.min.y*U,x.rotation.x=0,x.rotation.z=0,this.proxy.visible=!1,this.inner.position.y=0,this.inner.add(x),this.glb=x,this.glbReady=!0,f.animations&&f.animations.length&&(this.mixer=new P0(x),f.animations.forEach(W=>{const D=W.name.toLowerCase();/idle|stand|待机/.test(D)?this.actions.idle=this.mixer.clipAction(W):/walk|行走/.test(D)?this.actions.walk=this.mixer.clipAction(W):/run|奔跑|跑/.test(D)?this.actions.run=this.mixer.clipAction(W):/jump|跳/.test(D)&&(this.actions.jump=this.mixer.clipAction(W))}),this.actions.idle||(this.actions.idle=this.mixer.clipAction(f.animations[0])),this._curAction=this.actions.idle,this._curAction.play())},void 0,()=>{})}catch{}}setPosition(l){this.group.position.copy(l)}setYaw(l){this._modelYaw=l,this.group.rotation.set(0,l,0)}setQuaternion(l){this.group.quaternion.copy(l)}setVisible(l){this.group.visible=l}attachTo(l){l.add(this.group)}detach(){this.group.parent&&this.group.parent.remove(this.group)}setState(l){if(this.state!==l&&(this.state=l,this.glbReady&&this.mixer)){const f=this.actions[l]||this.actions.idle;f&&f!==this._curAction&&(f.reset().fadeIn(.18).play(),this._curAction&&this._curAction.fadeOut(.18),this._curAction=f)}}update(l,f=0){if(this._t+=l,this.mixer&&this.mixer.update(l),this.glbReady||!this.proxy)return;const x=this.parts,T=this._t,L=this.heightTarget/.95,U=this.state==="walk"||this.state==="run";this._stepPhase+=(f>0?f*2.4:this.state==="run"?18:10)*l;const W=this._stepPhase,D=this.state==="run"?.6:.38,F=U?Math.sin(W):0;x.body.scale.y=1+Math.sin(T*2.4)*.03,this.proxy.position.y=U?Math.abs(Math.cos(W))*.05*L:0,x.armL.rotation.x=F*D,x.armR.rotation.x=-F*D,x.footL.position.y=(.055+Math.max(0,F)*.06)*L,x.footR.position.y=(.055+Math.max(0,-F)*.06)*L,this.state==="jump"?(x.armL.rotation.z=.9,x.armR.rotation.z=-.9,x.footL.position.y=x.footR.position.y=.12*L):(x.armL.rotation.z=.25+Math.sin(T*1.8)*.05,x.armR.rotation.z=-.25-Math.sin(T*1.8)*.05),x.tail.rotation.y=Math.sin(T*(U?8:3.2))*.4,x.antL.rotation.x=Math.sin(T*1.7)*.12,x.antR.rotation.x=Math.sin(T*1.7+1.3)*.12,x.earL.rotation.x=Math.sin(T*2.1)*.08,x.earR.rotation.x=Math.sin(T*2.1+.9)*.08,this._blink-=l,this._blink<=0&&(this._blinkPhase=.16,this._blink=2+Math.random()*3.5);let G=1;if(this._blinkPhase>0&&(this._blinkPhase-=l,G=1-.9*Math.max(0,1-Math.abs(this._blinkPhase-.08)/.08)),x.eyeL.scale.y=G,x.eyeR.scale.y=G,U)x.head.rotation.y=Math.sin(T*.6)*.05,x.head.rotation.x=Math.sin(T*.9)*.03,this.proxy.rotation.y=0,this.proxy.rotation.z=Math.sin(W)*.03;else{const Z=T*.32;x.head.rotation.y=(Math.sin(Z)+Math.sin(Z*.43+1.3)*.7)*.4,x.head.rotation.x=.04+Math.sin(T*.5)*.05,this.proxy.rotation.y=Math.sin(Z*.6)*.08,this.proxy.rotation.z=Math.sin(T*.8)*.02}}dispose(){this.detach(),this.group.traverse(l=>{l.geometry&&l.geometry.dispose(),l.material&&(Array.isArray(l.material)?l.material:[l.material]).forEach(f=>{f.map&&f.map.dispose(),f.dispose()})})}}const bl={avatar:null,ensure(){return this.avatar||(this.avatar=new Wf({height:.95})),this.avatar},mount(u,l=1){const f=this.ensure();return f.group.scale.setScalar(l),f.group.quaternion.identity(),f.attachTo(u),f},unmount(){this.avatar&&this.avatar.detach()}};class Xf{constructor(l){this.avatar=l,this.pos=new M,this.vel=new M,this.yaw=0,this.pitch=.16,this.vy=0,this.jumpY=0,this.third=!0,this.dist=5.4,this.eyeH=l.height*.88,this._f=new M,this._r=new M,this._m=new M,this._head=new M,this._look=new M,this._dir=new M,this._camD=null,this._modelYaw=0,this._camYaw=0,this._camPitch=.16,this.clickTarget=new M,this.hasClickTarget=!1,this._waypoint=new M,this._hasWaypoint=!1,this._idleT=0,this._faceCam=!1,this._camPos=new M,this._hasCamPos=!1}teleport(l,f,x=0){this.pos.set(l,0,f),this.vel.set(0,0,0),this.yaw=x,this.vy=0,this.jumpY=0,this._camD=null,this._modelYaw=x,this._camYaw=x,this.hasClickTarget=!1,this._hasWaypoint=!1,this._idleT=0,this._faceCam=!1}setClickTarget(l,f,x=null,T=0){if(this.clickTarget.set(l,0,f),x&&this._pushOutOfColliders(this.clickTarget,x,.82),T>0){const L=Math.max(1,T-.6),U=Math.hypot(this.clickTarget.x,this.clickTarget.z);U>L&&(this.clickTarget.x*=L/U,this.clickTarget.z*=L/U)}this.hasClickTarget=!0,this._hasWaypoint=!1}clearClickTarget(){this.hasClickTarget=!1,this._hasWaypoint=!1}_pushOutOfColliders(l,f,x){for(const T of f){const L=T.r+x,U=l.x-T.x,W=l.z-T.z,D=U*U+W*W;if(D>=L*L)continue;const F=Math.sqrt(D);F>1e-4?(l.x=T.x+U/F*L,l.z=T.z+W/F*L):(l.x=T.x+L,l.z=T.z)}}_segmentBlocker(l,f,x,T,L){const U=x-l,W=T-f,D=U*U+W*W;if(D<1e-6)return null;let F=null,G=1/0;for(const Z of L){const Y=Z.r+.58;let st=((Z.x-l)*U+(Z.z-f)*W)/D;st=Math.max(0,Math.min(1,st));const gt=l+U*st,bt=f+W*st,Ut=Z.x-gt,ne=Z.z-bt;Ut*Ut+ne*ne<Y*Y&&st>.01&&st<.99&&st<G&&(F=Z,G=st)}return F}_planWaypoint(l){const f=this._segmentBlocker(this.pos.x,this.pos.z,this.clickTarget.x,this.clickTarget.z,l);if(!f){this._hasWaypoint=!1;return}const x=f.r+.76,T=this.pos.x-f.x,L=this.pos.z-f.z,U=Math.hypot(T,L);if(U<x+.05){const W=U>1e-4?Math.atan2(L,T):0;this._waypoint.set(f.x+Math.cos(W)*(x+.4),0,f.z+Math.sin(W)*(x+.4))}else{const W=Math.atan2(L,T),D=Math.acos(Math.min(1,x/U)),F=W+D,G=W-D,Z=f.x+Math.cos(F)*x,Y=f.z+Math.sin(F)*x,st=f.x+Math.cos(G)*x,gt=f.z+Math.sin(G)*x,bt=Math.hypot(Z-this.pos.x,Y-this.pos.z)+Math.hypot(this.clickTarget.x-Z,this.clickTarget.z-Y),Ut=Math.hypot(st-this.pos.x,gt-this.pos.z)+Math.hypot(this.clickTarget.x-st,this.clickTarget.z-gt);this._waypoint.set(bt<=Ut?Z:st,0,bt<=Ut?Y:gt)}this._pushOutOfColliders(this._waypoint,l,.72),this._hasWaypoint=!0}jump(){this.jumpY===0&&this.vy===0&&(this.vy=4.4)}update(l,f,x){this._f.set(Math.sin(this.yaw),0,Math.cos(this.yaw)),this._r.set(-this._f.z,0,this._f.x),this._m.set(0,0,0),Nn.w&&this._m.add(this._f),Nn.s&&this._m.sub(this._f),Nn.d&&this._m.add(this._r),Nn.a&&this._m.sub(this._r);const T=!!Nn.shift;let L=this._m.lengthSq()>0,U=1;if(!L&&this.hasClickTarget){let F=this.clickTarget.x-this.pos.x,G=this.clickTarget.z-this.pos.z,Z=Math.hypot(F,G);Z<.22?this.clearClickTarget():(this._hasWaypoint&&(Math.hypot(this._waypoint.x-this.pos.x,this._waypoint.z-this.pos.z)<.42||!this._segmentBlocker(this.pos.x,this.pos.z,this.clickTarget.x,this.clickTarget.z,f))&&(this._hasWaypoint=!1),!this._hasWaypoint&&this._segmentBlocker(this.pos.x,this.pos.z,this.clickTarget.x,this.clickTarget.z,f)&&this._planWaypoint(f),this._hasWaypoint&&(F=this._waypoint.x-this.pos.x,G=this._waypoint.z-this.pos.z,Z=Math.hypot(F,G),Z<.32&&(this._hasWaypoint=!1)),(this._hasWaypoint||Z>=.22)&&(this._m.set(F,0,G),L=!0,U=this._hasWaypoint?1:Math.min(1,Math.max(.28,Z/.9))))}else L&&this.clearClickTarget();const W=L?this._m.normalize().multiplyScalar((T?7.6:4.2)*U):this._m.set(0,0,0);this.vel.lerp(W,Math.min(1,l*(L?10:12))),this.pos.addScaledVector(this.vel,l),(this.vy!==0||this.jumpY>0)&&(this.jumpY+=this.vy*l,this.vy-=6.8*l,this.jumpY<=0&&(this.jumpY=0,this.vy=0));for(const F of f){if(this.jumpY>F.h)continue;const G=this.pos.x-F.x,Z=this.pos.z-F.z,Y=F.r+.42,st=G*G+Z*Z;if(st<Y*Y&&st>1e-6){const gt=Math.sqrt(st),bt=(Y-gt)/gt;this.pos.x+=G*bt,this.pos.z+=Z*bt}}const D=Math.hypot(this.pos.x,this.pos.z);if(D>x&&(this.pos.x*=x/D,this.pos.z*=x/D),L){let G=Math.atan2(this.vel.x,this.vel.z)-this._modelYaw;for(;G>Math.PI;)G-=Math.PI*2;for(;G<-Math.PI;)G+=Math.PI*2;this._modelYaw+=G*Math.min(1,l*10),this._idleT=0,this._faceCam=!1}else if(this._hasCamPos){this._idleT+=l;const F=this._camPos.x-this.pos.x,G=this._camPos.z-this.pos.z,Z=Math.hypot(F,G);if(Z>.6){let st=Math.atan2(F,G)-this._modelYaw;for(;st>Math.PI;)st-=Math.PI*2;for(;st<-Math.PI;)st+=Math.PI*2;if(this._faceCam)this._modelYaw+=st*Math.min(1,l*2.4),Math.abs(st)<.1&&(this._faceCam=!1,this._idleT=0);else{const gt=Z<3.4;this._idleT>(gt?.45:1.1)&&Math.abs(st)>(gt?.55:1.05)&&(this._faceCam=!0)}}}this._m.copy(this.pos),this._m.y+=this.jumpY,this.avatar.setPosition(this._m),this.avatar.setYaw(this.third?this._modelYaw:this.yaw),this.avatar.setState(this.jumpY>0?"jump":L?T?"run":"walk":"idle"),this.avatar.update(l,this.vel.length())}updateCamera(l,f,x){const T=this.third?Math.min(1,f*10):1;let L=this.yaw-this._camYaw;for(;L>Math.PI;)L-=Math.PI*2;for(;L<-Math.PI;)L+=Math.PI*2;this._camYaw+=L*T,this._camPitch+=(this.pitch-this._camPitch)*T,this._head.copy(this.pos),this._head.y+=(this.third?1.15:this.eyeH)+this.jumpY;const U=Math.cos(this._camPitch),W=Math.sin(this._camPitch);if(this._dir.set(Math.sin(this._camYaw)*U,W,Math.cos(this._camYaw)*U),!this.third){l.position.copy(this._head),this._look.copy(this._head).addScaledVector(this._dir,4),l.lookAt(this._look),this._camPos.copy(l.position),this._hasCamPos=!0;return}let D=this.dist;const F=this._head.x,G=this._head.y,Z=this._head.z,Y=F-this._dir.x*D,st=G-this._dir.y*D,gt=Z-this._dir.z*D,bt=Math.hypot(Y-F,st-G,gt-Z)||1;for(const Ut of x){const ne=(Y-F)/bt,Le=(gt-Z)/bt,Re=F-Ut.x,Me=Z-Ut.z,ae=Re*ne+Me*Le,Pt=Re*Re+Me*Me-(Ut.r+.3)*(Ut.r+.3),at=ae*ae-Pt;if(at<=0)continue;const _t=-ae-Math.sqrt(at);if(_t<0||_t>bt)continue;G+(st-G)*(_t/bt)<Ut.h+.25&&(D=Math.min(D,Math.max(.9,_t-.5)))}this._camD===null&&(this._camD=D),this._camD+=(D-this._camD)*Math.min(1,f*(D<this._camD?14:3.5)),l.position.set(F-this._dir.x*this._camD,Math.max(.4,G-this._dir.y*this._camD+.25),Z-this._dir.z*this._camD),this._look.copy(this._head).addScaledVector(this._dir,2.4),l.lookAt(this._look),this._camPos.copy(l.position),this._hasCamPos=!0}}const ho={capital:{name:"火星首都 · Aurelia",short:"首都 Aurelia",core:"你已成为 Aurelia 城市网络的访问者",tab:"Aurelia，人口 42 万，火星的首都。这里不是科研前哨——主街、中央广场、居住组团、医疗与行政塔、环城磁悬浮，都在说明同一件事：火星已经开始形成自己的社会。"},eco:{name:"翡绿生态城 · Verde",short:"生态城 Verde",core:"生态平衡达成 · Verde 的脉搏在你手中",tab:"Verde，火星的绿肺。巨型穹顶之下是人工水循环、垂直农场与整片培育林。红色荒漠与绿色生命只隔一层复合玻璃——而维持这层平衡的，是人。"},industrial:{name:"赫菲斯托斯工业城",short:"工业城 Hephaestus",core:"产线贯通 · 火星资源正在变成文明",tab:"Hephaestus，赤道工业带的心脏。聚变能源塔、原料处理线、燃料储罐与星舰总装厂房昼夜不息——这座城证明：火星文明能用本地的资源独立运转。"}},El={},Mt={id:null,city:null,player:null,avatar:null,snpc:null,snpcMode:"none",talked:new Set,nearInteract:null,tabOpen:!1},is=document.getElementById("npcOpts"),Rl=document.getElementById("npcNext"),Il={capital:jf,eco:Kf,industrial:Zf},Dl=new M;window.addEventListener("keydown",u=>{if(qt!=="surface"||u.repeat)return;const l=vl(u.key);if(window.__klog&&__klog.push(l+"@"+Mt.snpcMode),l==="v"&&(Mt.player.third=!Mt.player.third,Mt.avatar.setVisible(Mt.player.third),Es()),l===" "&&(Mt.player.jump(),u.preventDefault()),l==="tab")if(u.preventDefault(),Mt.tabOpen=!Mt.tabOpen,Mt.tabOpen){const f=ho[Mt.id];ue.innerHTML=`<h3>${f.name}</h3><p>${f.tab}</p>`,ue.style.display="block"}else ue.style.display="none";if(l==="e"){if(Mt.snpc){Mt.snpcMode==="bubble"||Mt.snpcMode==="answer"?ad(Mt.snpc):la();return}const f=Mt.nearInteract;f&&(!f.enabledFn||f.enabledFn()?f.run():f.lockedText&&di(f.lockedText))}if(Mt.snpcMode==="opts"&&["1","2","3"].includes(l)){const f=parseInt(l)-1;Mt.snpc&&Mt.snpc.options[f]&&ld(Mt.snpc,f)}});let qs=null;e.domElement.addEventListener("pointermove",u=>{if(qt!=="surface"||!Mt.player){qs=null;return}const l=u.movementX??(qs?u.clientX-qs[0]:0),f=u.movementY??(qs?u.clientY-qs[1]:0);qs=[u.clientX,u.clientY],Mt.player.yaw+=l*.0042,Mt.player.pitch=y(Mt.player.pitch-f*.0038,-.5,1.2)}),e.domElement.addEventListener("pointerleave",()=>{qs=null}),window.addEventListener("wheel",u=>{if(qt!=="surface")return;const l=Math.sign(u.deltaY);if(l>0&&!Mt.player.third){Mt.player.third=!0,Mt.avatar.setVisible(!0),Es();return}Mt.player.dist=y(Mt.player.dist+l*.6,2.4,10),l<0&&Mt.player.third&&Mt.player.dist<=2.5&&(Mt.player.third=!1,Mt.avatar.setVisible(!1),Mt.player.dist=5.4,Es())},{passive:!0});const hd=new bf;dd(),window.__mars={enterSurface:cd,exitSurface:As,surface:Mt,snpcBubble:Pl,camera:i,raycaster:mi,get mode(){return qt},get explore(){return fe},get xingda(){return bl.avatar}},window.__errs=[],window.addEventListener("error",u=>__errs.push(String(u.message))),addEventListener("resize",()=>{i.aspect=innerWidth/innerHeight,i.updateProjectionMatrix(),e.setSize(innerWidth,innerHeight),o.setSize(innerWidth,innerHeight)});const Ll=window.MARS_INTEGRATION_ENV||{};window.MarsModule={id:"mars-civilization-2126",version:"1.0.0",ready:!0,enterCity(u){const l=_n[u];l&&(qt==="surface"&&As(),hi(),Fi(l,u))},exitCity(){if(qt==="explore"){xl();return}if(qt==="surface"){As();return}Ln()},tour(u){u?(qt==="surface"&&As(),Ws||(Ws=!0,sa.classList.add("on"),co=-1,Ml())):(hi(),qt==="city"&&Ln())},xray(u){!!Qi!=!!u&&ra.click()},explore(u){if(u){if(qt==="surface"&&As(),qt!=="explore"){const l=qt==="city"&&He?He:(()=>{const f=i.position.clone().normalize();let x=null,T=1e9;for(const L in _n){const U=_n[L].position.clone().normalize().angleTo(f);U<T&&(T=U,x=_n[L])}return x})();ta(l)}}else qt==="surface"&&As(),xl()},land(u){const l=_n[u];l&&(qt==="surface"&&As(),hi(),ta(l))},setViewMode(u){fe.third=u==="third"},goto(u){const l=u==="earth"?Ll.earthUrl||"":u==="moon"?Ll.moonUrl||"":Ll.hubUrl||"";if(l){window.location.href=l;return}else di(u==="earth"?"地球章节未配置 earthUrl":u==="moon"?"月球章节未配置 moonUrl":"返回太阳系枢纽")}},window.addEventListener("message",u=>{const l=u.data;if(!l||typeof l.type!="string"||!l.type.startsWith("mars:"))return;const f=window.MarsModule;switch(l.type.slice(5)){case"goto":f.goto(l.page);break;case"enterCity":f.enterCity(l.city);break;case"exitCity":f.exitCity();break;case"tour":f.tour(!!l.on);break;case"xray":f.xray(!!l.on);break;case"explore":f.explore(!!l.on);break;case"land":f.land(l.city);break;case"setViewMode":f.setViewMode(l.mode);break;default:break}}),window.parent&&window.parent!==window&&window.parent.postMessage({type:"mars:ready",id:"mars-civilization-2126",version:"1.0.0"},"*")}catch(s){const t=document.getElementById("err");t.style.display="flex",t.textContent="场景初始化失败："+s.message,console.error(s)}export{Pm as $,Hy as A,Hn as B,be as C,hu as D,b as E,Xy as F,Gy as G,xf as H,Lm as I,Wy as J,Ur as K,Bo as L,So as M,ca as N,En as O,m0 as P,ci as Q,us as R,Bn as S,zy as T,St as U,Dt as V,li as W,nm as X,Ih as Y,_f as Z,su as _,Vy as a,Ja as a0,rh as a1,nl as a2,Yn as a3,ll as a4,al as a5,dl as a6,$e as a7,Bs as a8,hl as a9,ji as aa,ys as ab,ky as b,qy as c,qr as d,Yy as e,Ce as f,M as g,qd as h,ru as i,jy as j,Cm as k,ar as l,Nl as m,Ep as n,Xi as o,pi as p,Dc as q,or as r,nr as s,ks as t,Om as u,wt as v,Xn as w,gn as x,an as y,vn as z};
