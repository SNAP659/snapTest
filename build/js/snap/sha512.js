var hex_sha512=function(t){function t(t){return n.SHA512(r(t)).toString(n.enc.Hex)}function r(t){for(var r,n,e="",i=-1;++i<t.length;)r=t.charCodeAt(i),n=i+1<t.length?t.charCodeAt(i+1):0,r>=55296&&56319>=r&&n>=56320&&57343>=n&&(r=65536+((1023&r)<<10)+(1023&n),i++),127>=r?e+=String.fromCharCode(r):2047>=r?e+=String.fromCharCode(192|r>>>6&31,128|63&r):65535>=r?e+=String.fromCharCode(224|r>>>12&15,128|r>>>6&63,128|63&r):2097151>=r&&(e+=String.fromCharCode(240|r>>>18&7,128|r>>>12&63,128|r>>>6&63,128|63&r));return e}var n=n||function(t,r){var n={},e=n.lib={},i=e.Base=function(){function t(){}return{extend:function(r){t.prototype=this;var n=new t;return r&&n.mixIn(r),n.$super=this,n},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var r in t)t.hasOwnProperty(r)&&(this[r]=t[r]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.$super.extend(this)}}}(),o=e.WordArray=i.extend({init:function(t,n){t=this.words=t||[],this.sigBytes=n!=r?n:4*t.length},toString:function(t){return(t||h).stringify(this)},concat:function(t){var r=this.words,n=t.words,e=this.sigBytes,t=t.sigBytes;if(this.clamp(),e%4)for(var i=0;t>i;i++)r[e+i>>>2]|=(n[i>>>2]>>>24-8*(i%4)&255)<<24-8*((e+i)%4);else if(65535<n.length)for(i=0;t>i;i+=4)r[e+i>>>2]=n[i>>>2];else r.push.apply(r,n);return this.sigBytes+=t,this},clamp:function(){var r=this.words,n=this.sigBytes;r[n>>>2]&=4294967295<<32-8*(n%4),r.length=t.ceil(n/4)},clone:function(){var t=i.clone.call(this);return t.words=this.words.slice(0),t},random:function(r){for(var n=[],e=0;r>e;e+=4)n.push(4294967296*t.random()|0);return o.create(n,r)}}),s=n.enc={},h=s.Hex={stringify:function(t){for(var r=t.words,t=t.sigBytes,n=[],e=0;t>e;e++){var i=r[e>>>2]>>>24-8*(e%4)&255;n.push((i>>>4).toString(16)),n.push((15&i).toString(16))}return n.join("")},parse:function(t){for(var r=t.length,n=[],e=0;r>e;e+=2)n[e>>>3]|=parseInt(t.substr(e,2),16)<<24-4*(e%8);return o.create(n,r/2)}},a=s.Latin1={stringify:function(t){for(var r=t.words,t=t.sigBytes,n=[],e=0;t>e;e++)n.push(String.fromCharCode(r[e>>>2]>>>24-8*(e%4)&255));return n.join("")},parse:function(t){for(var r=t.length,n=[],e=0;r>e;e++)n[e>>>2]|=(255&t.charCodeAt(e))<<24-8*(e%4);return o.create(n,r)}},c=s.Utf8={stringify:function(t){try{return decodeURIComponent(escape(a.stringify(t)))}catch(r){throw Error("Malformed UTF-8 data")}},parse:function(t){return a.parse(unescape(encodeURIComponent(t)))}},u=e.BufferedBlockAlgorithm=i.extend({reset:function(){this._data=o.create(),this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=c.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(r){var n=this._data,e=n.words,i=n.sigBytes,s=this.blockSize,h=i/(4*s),h=r?t.ceil(h):t.max((0|h)-this._minBufferSize,0),r=h*s,i=t.min(4*r,i);if(r){for(var a=0;r>a;a+=s)this._doProcessBlock(e,a);a=e.splice(0,r),n.sigBytes-=i}return o.create(a,i)},clone:function(){var t=i.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0});e.Hasher=u.extend({init:function(){this.reset()},reset:function(){u.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize(),this._hash},clone:function(){var t=u.clone.call(this);return t._hash=this._hash.clone(),t},blockSize:16,_createHelper:function(t){return function(r,n){return t.create(n).finalize(r)}},_createHmacHelper:function(t){return function(r,n){return l.HMAC.create(t,n).finalize(r)}}});var l=n.algo={};return n}(Math);!function(t){var r=n,e=r.lib,i=e.Base,o=e.WordArray,r=r.x64={};r.Word=i.extend({init:function(t,r){this.high=t,this.low=r}}),r.WordArray=i.extend({init:function(r,n){r=this.words=r||[],this.sigBytes=n!=t?n:8*r.length},toX32:function(){for(var t=this.words,r=t.length,n=[],e=0;r>e;e++){var i=t[e];n.push(i.high),n.push(i.low)}return o.create(n,this.sigBytes)},clone:function(){for(var t=i.clone.call(this),r=t.words=this.words.slice(0),n=r.length,e=0;n>e;e++)r[e]=r[e].clone();return t}})}(),function(){function t(){return o.create.apply(o,arguments)}var r=n,e=r.lib.Hasher,i=r.x64,o=i.Word,s=i.WordArray,i=r.algo,h=[t(1116352408,3609767458),t(1899447441,602891725),t(3049323471,3964484399),t(3921009573,2173295548),t(961987163,4081628472),t(1508970993,3053834265),t(2453635748,2937671579),t(2870763221,3664609560),t(3624381080,2734883394),t(310598401,1164996542),t(607225278,1323610764),t(1426881987,3590304994),t(1925078388,4068182383),t(2162078206,991336113),t(2614888103,633803317),t(3248222580,3479774868),t(3835390401,2666613458),t(4022224774,944711139),t(264347078,2341262773),t(604807628,2007800933),t(770255983,1495990901),t(1249150122,1856431235),t(1555081692,3175218132),t(1996064986,2198950837),t(2554220882,3999719339),t(2821834349,766784016),t(2952996808,2566594879),t(3210313671,3203337956),t(3336571891,1034457026),t(3584528711,2466948901),t(113926993,3758326383),t(338241895,168717936),t(666307205,1188179964),t(773529912,1546045734),t(1294757372,1522805485),t(1396182291,2643833823),t(1695183700,2343527390),t(1986661051,1014477480),t(2177026350,1206759142),t(2456956037,344077627),t(2730485921,1290863460),t(2820302411,3158454273),t(3259730800,3505952657),t(3345764771,106217008),t(3516065817,3606008344),t(3600352804,1432725776),t(4094571909,1467031594),t(275423344,851169720),t(430227734,3100823752),t(506948616,1363258195),t(659060556,3750685593),t(883997877,3785050280),t(958139571,3318307427),t(1322822218,3812723403),t(1537002063,2003034995),t(1747873779,3602036899),t(1955562222,1575990012),t(2024104815,1125592928),t(2227730452,2716904306),t(2361852424,442776044),t(2428436474,593698344),t(2756734187,3733110249),t(3204031479,2999351573),t(3329325298,3815920427),t(3391569614,3928383900),t(3515267271,566280711),t(3940187606,3454069534),t(4118630271,4000239992),t(116418474,1914138554),t(174292421,2731055270),t(289380356,3203993006),t(460393269,320620315),t(685471733,587496836),t(852142971,1086792851),t(1017036298,365543100),t(1126000580,2618297676),t(1288033470,3409855158),t(1501505948,4234509866),t(1607167915,987167468),t(1816402316,1246189591)],a=[];!function(){for(var r=0;80>r;r++)a[r]=t()}(),i=i.SHA512=e.extend({_doReset:function(){this._hash=s.create([t(1779033703,4089235720),t(3144134277,2227873595),t(1013904242,4271175723),t(2773480762,1595750129),t(1359893119,2917565137),t(2600822924,725511199),t(528734635,4215389547),t(1541459225,327033209)])},_doProcessBlock:function(t,r){for(var n=this._hash.words,e=n[0],i=n[1],o=n[2],s=n[3],c=n[4],u=n[5],l=n[6],n=n[7],f=e.high,g=e.low,d=i.high,p=i.low,w=o.high,_=o.low,v=s.high,y=s.low,B=c.high,m=c.low,S=u.high,x=u.low,C=l.high,H=l.low,A=n.high,z=n.low,b=f,k=g,W=d,I=p,P=w,R=_,U=v,D=y,F=B,M=m,j=S,O=x,X=C,$=H,E=A,L=z,T=0;80>T;T++){var q=a[T];if(16>T)var G=q.high=0|t[r+2*T],J=q.low=0|t[r+2*T+1];else{var G=a[T-15],J=G.high,K=G.low,G=(K<<31|J>>>1)^(K<<24|J>>>8)^J>>>7,K=(J<<31|K>>>1)^(J<<24|K>>>8)^(J<<25|K>>>7),N=a[T-2],J=N.high,Q=N.low,N=(Q<<13|J>>>19)^(J<<3|Q>>>29)^J>>>6,Q=(J<<13|Q>>>19)^(Q<<3|J>>>29)^(J<<26|Q>>>6),J=a[T-7],V=J.high,Y=a[T-16],Z=Y.high,Y=Y.low,J=K+J.low,G=G+V+(K>>>0>J>>>0?1:0),J=J+Q,G=G+N+(Q>>>0>J>>>0?1:0),J=J+Y,G=G+Z+(Y>>>0>J>>>0?1:0);q.high=G,q.low=J}var V=F&j^~F&X,Y=M&O^~M&$,q=b&W^b&P^W&P,tt=k&I^k&R^I&R,K=(k<<4|b>>>28)^(b<<30|k>>>2)^(b<<25|k>>>7),N=(b<<4|k>>>28)^(k<<30|b>>>2)^(k<<25|b>>>7),Q=h[T],rt=Q.high,nt=Q.low,Q=L+((F<<18|M>>>14)^(F<<14|M>>>18)^(M<<23|F>>>9)),Z=E+((M<<18|F>>>14)^(M<<14|F>>>18)^(F<<23|M>>>9))+(L>>>0>Q>>>0?1:0),Q=Q+Y,Z=Z+V+(Y>>>0>Q>>>0?1:0),Q=Q+nt,Z=Z+rt+(nt>>>0>Q>>>0?1:0),Q=Q+J,Z=Z+G+(J>>>0>Q>>>0?1:0),J=N+tt,q=K+q+(N>>>0>J>>>0?1:0),E=X,L=$,X=j,$=O,j=F,O=M,M=D+Q|0,F=U+Z+(D>>>0>M>>>0?1:0)|0,U=P,D=R,P=W,R=I,W=b,I=k,k=Q+J|0,b=Z+q+(Q>>>0>k>>>0?1:0)|0}g=e.low=g+k|0,e.high=f+b+(k>>>0>g>>>0?1:0)|0,p=i.low=p+I|0,i.high=d+W+(I>>>0>p>>>0?1:0)|0,_=o.low=_+R|0,o.high=w+P+(R>>>0>_>>>0?1:0)|0,y=s.low=y+D|0,s.high=v+U+(D>>>0>y>>>0?1:0)|0,m=c.low=m+M|0,c.high=B+F+(M>>>0>m>>>0?1:0)|0,x=u.low=x+O|0,u.high=S+j+(O>>>0>x>>>0?1:0)|0,H=l.low=H+$|0,l.high=C+X+($>>>0>H>>>0?1:0)|0,z=n.low=z+L|0,n.high=A+E+(L>>>0>z>>>0?1:0)|0},_doFinalize:function(){var t=this._data,r=t.words,n=8*this._nDataBytes,e=8*t.sigBytes;r[e>>>5]|=128<<24-e%32,r[(e+128>>>10<<5)+31]=n,t.sigBytes=4*r.length,this._process(),this._hash=this._hash.toX32()},blockSize:32}),r.SHA512=e._createHelper(i),r.HmacSHA512=e._createHmacHelper(i)}();return t}({});