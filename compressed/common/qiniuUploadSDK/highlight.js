"use strict";var hljs=new function(){function f(e){return e.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function e(e){for(var t=e.firstChild;t;t=t.nextSibling){if("CODE"==t.nodeName)return t;if(3!=t.nodeType||!t.nodeValue.match(/\s+/))break}}function l(e){var c=[];return function e(t,r){for(var n=t.firstChild;n;n=n.nextSibling)3==n.nodeType?r+=n.nodeValue.length:"BR"==n.nodeName?r+=1:1==n.nodeType&&(c.push({event:"start",offset:r,node:n}),r=e(n,r),c.push({event:"stop",offset:r,node:n}));return r}(e,0),c}function g(e,t){function i(){return void 0!==l.sL?function(){if(l.sL&&!N[l.sL])return f(u);var e=l.sL?g(l.sL,u):h(u);return 0<l.r&&(b+=e.keyword_count,n+=e.r),'<span class="'+e.language+'">'+e.value+"</span>"}():function(){var e=f(u);if(!l.k)return e;var t="",r=0;l.lR.lastIndex=0;for(var n,c,s,i=l.lR.exec(e);i;){t+=e.substr(r,i.index-r);var a=(n=l,c=i,s=o.cI?c[0].toLowerCase():c[0],n.k.hasOwnProperty(s)&&n.k[s]);a?(b+=a[1],t+='<span class="'+a[0]+'">'+i[0]+"</span>"):t+=i[0],r=l.lR.lastIndex,i=l.lR.exec(e)}return t+e.substr(r)}()}function a(e,t){var r=e.cN?'<span class="'+e.cN+'">':"";e.rB?(d+=r,u=""):e.eB?(d+=f(t)+r,u=""):(d+=r,u=t),l=Object.create(e,{parent:{value:l}}),n+=e.r}function r(e,t){if(u+=e,void 0===t)return d+=i(),0;var r=function(e,t){for(var r=0;r<t.c.length;r++){var n=t.c[r].bR.exec(e);if(n&&0==n.index)return t.c[r]}}(t,l);if(r)return d+=i(),a(r,t),r.rB?0:t.length;var n,c,s=function e(t,r){return t.e&&t.eR.test(r)?t:t.eW?e(t.parent,r):void 0}(l,t);if(s){for(s.rE||s.eE||(u+=t),d+=i();l.cN&&(d+="</span>"),(l=l.parent)!=s.parent;);return s.eE&&(d+=f(t)),u="",s.starts&&a(s.starts,""),s.rE?0:t.length}if(n=t,(c=l).i&&c.iR.test(n))throw"Illegal";return u+=t,t.length||1}var o=N[e];!function(r){function l(e,t){return RegExp(e,"m"+(r.cI?"i":"")+(t?"g":""))}!function e(t,r){if(!t.compiled){t.compiled=!0;var n=[];if(t.k){var c=function(r,e){e.split(" ").forEach(function(e){var t=e.split("|");s[t[0]]=[r,t[1]?Number(t[1]):1],n.push(t[0])})},s={};if(t.lR=l(t.l||hljs.IR,!0),"string"==typeof t.k)c("keyword",t.k);else for(var i in t.k)t.k.hasOwnProperty(i)&&c(i,t.k[i]);t.k=s}r&&(t.bWK&&(t.b="\\b("+n.join("|")+")\\s"),t.bR=l(t.b?t.b:"\\B|\\b"),t.e||t.eW||(t.e="\\B|\\b"),t.e&&(t.eR=l(t.e)),t.tE=t.e||"",t.eW&&r.tE&&(t.tE+=(t.e?"|":"")+r.tE)),t.i&&(t.iR=l(t.i)),void 0===t.r&&(t.r=1),t.c||(t.c=[]);for(var a=0;a<t.c.length;a++)"self"==t.c[a]&&(t.c[a]=t),e(t.c[a],t);t.starts&&e(t.starts,r);var o=[];for(a=0;a<t.c.length;a++)o.push(t.c[a].b);t.tE&&o.push(t.tE),t.i&&o.push(t.i),t.t=o.length?l(o.join("|"),!0):{exec:function(e){return null}}}}(r)}(o);var l=o,u="",n=0,b=0,d="";try{for(var c,s,p=0;l.t.lastIndex=p,c=l.t.exec(t);)s=r(t.substr(p,c.index-p),c[0]),p=c.index+s;return r(t.substr(p)),{r:n,keyword_count:b,value:d,language:e}}catch(e){if("Illegal"==e)return{r:0,keyword_count:0,value:f(t)};throw e}}function h(e){var t={keyword_count:0,r:0,value:f(e)},r=t;for(var n in N)if(N.hasOwnProperty(n)){var c=g(n,e);c.language=n,c.keyword_count+c.r>r.keyword_count+r.r&&(r=c),c.keyword_count+c.r>t.keyword_count+t.r&&(r=t,t=c)}return r.language&&(t.second_best=r),t}function u(e,c,t){return c&&(e=e.replace(/^((<[^>]+>|\t)+)/gm,function(e,t,r,n){return t.replace(/\t/g,c)})),t&&(e=e.replace(/\n/g,"<br>")),e}function t(e,t,r){var n=function t(e,r){return Array.prototype.map.call(e.childNodes,function(e){return 3==e.nodeType?r?e.nodeValue.replace(/\n/g,""):e.nodeValue:"BR"==e.nodeName?"\n":t(e,r)}).join("")}(e,r),c=function(e){var t=(e.className+" "+e.parentNode.className).split(/\s+/);t=t.map(function(e){return e.replace(/^language-/,"")});for(var r=0;r<t.length;r++)if(N[t[r]]||"no-highlight"==t[r])return t[r]}(e);if("no-highlight"!=c){var s=c?g(c,n):h(n);c=s.language;var i=l(e);if(i.length){var a=document.createElement("pre");a.innerHTML=s.value,s.value=function(e,t,r){var n=0,c="",s=[];function i(e){return"<"+e.nodeName+Array.prototype.map.call(e.attributes,function(e){return" "+e.nodeName+'="'+f(e.value)+'"'}).join("")+">"}for(;e.length||t.length;){var a=(e.length&&t.length?e[0].offset!=t[0].offset?e[0].offset<t[0].offset?e:t:"start"==t[0].event?e:t:e.length?e:t).splice(0,1)[0];if(c+=f(r.substr(n,a.offset-n)),n=a.offset,"start"==a.event)c+=i(a.node),s.push(a.node);else if("stop"==a.event){for(var o,l=s.length;c+="</"+(o=s[--l]).nodeName.toLowerCase()+">",o!=a.node;);for(s.splice(l,1);l<s.length;)c+=i(s[l]),l++}}return c+f(r.substr(n))}(i,l(a),n)}s.value=u(s.value,t,r);var o=e.className;o.match("(\\s|^)(language-)?"+c+"(\\s|$)")||(o=o?o+" "+c:c),e.innerHTML=s.value,e.className=o,e.result={language:c,kw:s.keyword_count,re:s.r},s.second_best&&(e.second_best={language:s.second_best.language,kw:s.second_best.keyword_count,re:s.second_best.r})}}function r(){r.called||(r.called=!0,Array.prototype.map.call(document.getElementsByTagName("pre"),e).filter(Boolean).forEach(function(e){t(e,hljs.tabReplace)}))}var N={};this.LANGUAGES=N,this.highlight=g,this.highlightAuto=h,this.fixMarkup=u,this.highlightBlock=t,this.initHighlighting=r,this.initHighlightingOnLoad=function(){window.addEventListener("DOMContentLoaded",r,!1),window.addEventListener("load",r,!1)},this.IR="[a-zA-Z][a-zA-Z0-9_]*",this.UIR="[a-zA-Z_][a-zA-Z0-9_]*",this.NR="\\b\\d+(\\.\\d+)?",this.CNR="(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",this.BNR="\\b(0b[01]+)",this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",this.BE={b:"\\\\[\\s\\S]",r:0},this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[this.BE],r:0},this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[this.BE],r:0},this.CLCM={cN:"comment",b:"//",e:"$"},this.CBLCLM={cN:"comment",b:"/\\*",e:"\\*/"},this.HCM={cN:"comment",b:"#",e:"$"},this.NM={cN:"number",b:this.NR,r:0},this.CNM={cN:"number",b:this.CNR,r:0},this.BNM={cN:"number",b:this.BNR,r:0},this.inherit=function(e,t){var r={};for(var n in e)r[n]=e[n];if(t)for(var n in t)r[n]=t[n];return r}};hljs.LANGUAGES.cs=function(e){return{k:"abstract as base bool break byte case catch char checked class const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long namespace new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while ascending descending from get group into join let orderby partial select set value var where yield",c:[{cN:"comment",b:"///",e:"$",rB:!0,c:[{cN:"xmlDocTag",b:"///|\x3c!--|--\x3e"},{cN:"xmlDocTag",b:"</?",e:">"}]},e.CLCM,e.CBLCLM,{cN:"preprocessor",b:"#",e:"$",k:"if else elif endif define undef warning error line region endregion pragma checksum"},{cN:"string",b:'@"',e:'"',c:[{b:'""'}]},e.ASM,e.QSM,e.CNM]}}(hljs),hljs.LANGUAGES.ruby=function(e){var t="[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?",r="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",n={keyword:"and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include"},c={cN:"yardoctag",b:"@[A-Za-z]+"},s=[{cN:"comment",b:"#",e:"$",c:[c]},{cN:"comment",b:"^\\=begin",e:"^\\=end",c:[c],r:10},{cN:"comment",b:"^__END__",e:"\\n$"}],i={cN:"subst",b:"#\\{",e:"}",l:t,k:n},a=[e.BE,i],o=[{cN:"string",b:"'",e:"'",c:a,r:0},{cN:"string",b:'"',e:'"',c:a,r:0},{cN:"string",b:"%[qw]?\\(",e:"\\)",c:a},{cN:"string",b:"%[qw]?\\[",e:"\\]",c:a},{cN:"string",b:"%[qw]?{",e:"}",c:a},{cN:"string",b:"%[qw]?<",e:">",c:a,r:10},{cN:"string",b:"%[qw]?/",e:"/",c:a,r:10},{cN:"string",b:"%[qw]?%",e:"%",c:a,r:10},{cN:"string",b:"%[qw]?-",e:"-",c:a,r:10},{cN:"string",b:"%[qw]?\\|",e:"\\|",c:a,r:10}],l={cN:"function",bWK:!0,e:" |$|;",k:"def",c:[{cN:"title",b:r,l:t,k:n},{cN:"params",b:"\\(",e:"\\)",l:t,k:n}].concat(s)},u=s.concat(o.concat([{cN:"class",bWK:!0,e:"$|;",k:"class module",c:[{cN:"title",b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?",r:0},{cN:"inheritance",b:"<\\s*",c:[{cN:"parent",b:"("+e.IR+"::)?"+e.IR}]}].concat(s)},l,{cN:"constant",b:"(::)?(\\b[A-Z]\\w*(::)?)+",r:0},{cN:"symbol",b:":",c:o.concat([{b:r}]),r:0},{cN:"symbol",b:t+":",r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{cN:"number",b:"\\?\\w"},{cN:"variable",b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{b:"("+e.RSR+")\\s*",c:s.concat([{cN:"regexp",b:"/",e:"/[a-z]*",i:"\\n",c:[e.BE,i]}]),r:0}]));return i.c=u,{l:t,k:n,c:l.c[1].c=u}}(hljs),hljs.LANGUAGES.javascript=function(e){return{k:{keyword:"in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const",literal:"true false null undefined NaN Infinity"},c:[e.ASM,e.QSM,e.CLCM,e.CBLCLM,e.CNM,{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBLCLM,{cN:"regexp",b:"/",e:"/[gim]*",i:"\\n",c:[{b:"\\\\/"}]},{b:"<",e:">;",sL:"xml"}],r:0},{cN:"function",bWK:!0,e:"{",k:"function",c:[{cN:"title",b:"[A-Za-z$_][0-9A-Za-z$_]*"},{cN:"params",b:"\\(",e:"\\)",c:[e.CLCM,e.CBLCLM],i:"[\"'\\(]"}],i:"\\[|%"}]}}(hljs),hljs.LANGUAGES.xml=function(e){var t={eW:!0,c:[{cN:"attribute",b:"[A-Za-z0-9\\._:-]+",r:0},{b:'="',rB:!0,e:'"',c:[{cN:"value",b:'"',eW:!0}]},{b:"='",rB:!0,e:"'",c:[{cN:"value",b:"'",eW:!0}]},{b:"=",c:[{cN:"value",b:"[^\\s/>]+"}]}]};return{cI:!0,c:[{cN:"pi",b:"<\\?",e:"\\?>",r:10},{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},{cN:"comment",b:"\x3c!--",e:"--\x3e",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[t],starts:{e:"</style>",rE:!0,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[t],starts:{e:"<\/script>",rE:!0,sL:"javascript"}},{b:"<%",e:"%>",sL:"vbscript"},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:"[^ />]+"},t]}]}}(),hljs.LANGUAGES.http={i:"\\S",c:[{cN:"status",b:"^HTTP/[0-9\\.]+",e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{cN:"request",b:"^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",rB:!0,e:"$",c:[{cN:"string",b:" ",e:" ",eB:!0,eE:!0}]},{cN:"attribute",b:"^\\w",e:": ",eE:!0,i:"\\n|\\s|=",starts:{cN:"string",e:"$"}},{b:"\\n\\n",starts:{sL:"",eW:!0}}]},hljs.LANGUAGES.java=function(e){return{k:"false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws",c:[{cN:"javadoc",b:"/\\*\\*",e:"\\*/",c:[{cN:"javadoctag",b:"@[A-Za-z]+"}],r:10},e.CLCM,e.CBLCLM,e.ASM,e.QSM,{cN:"class",bWK:!0,e:"{",k:"class interface",i:":",c:[{bWK:!0,k:"extends implements",r:10},{cN:"title",b:e.UIR}]},e.CNM,{cN:"annotation",b:"@[A-Za-z]+"}]}}(hljs),hljs.LANGUAGES.php=function(e){var t={cN:"variable",b:"\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"},r=[e.inherit(e.ASM,{i:null}),e.inherit(e.QSM,{i:null}),{cN:"string",b:'b"',e:'"',c:[e.BE]},{cN:"string",b:"b'",e:"'",c:[e.BE]}],n=[e.BNM,e.CNM],c={cN:"title",b:e.UIR};return{cI:!0,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return implements parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception php_user_filter default die require __FUNCTION__ enddeclare final try this switch continue endfor endif declare unset true false namespace trait goto instanceof insteadof __DIR__ __NAMESPACE__ __halt_compiler",c:[e.CLCM,e.HCM,{cN:"comment",b:"/\\*",e:"\\*/",c:[{cN:"phpdoc",b:"\\s@[A-Za-z]+"}]},{cN:"comment",eB:!0,b:"__halt_compiler.+?;",eW:!0},{cN:"string",b:"<<<['\"]?\\w+['\"]?$",e:"^\\w+;",c:[e.BE]},{cN:"preprocessor",b:"<\\?php",r:10},{cN:"preprocessor",b:"\\?>"},t,{cN:"function",bWK:!0,e:"{",k:"function",i:"\\$|\\[|%",c:[c,{cN:"params",b:"\\(",e:"\\)",c:["self",t,e.CBLCLM].concat(r).concat(n)}]},{cN:"class",bWK:!0,e:"{",k:"class",i:"[:\\(\\$]",c:[{bWK:!0,eW:!0,k:"extends",c:[c]},c]},{b:"=>"}].concat(r).concat(n)}}(hljs),hljs.LANGUAGES.python=function(e){var t={cN:"prompt",b:"^(>>>|\\.\\.\\.) "},r=[{cN:"string",b:"(u|b)?r?'''",e:"'''",c:[t],r:10},{cN:"string",b:'(u|b)?r?"""',e:'"""',c:[t],r:10},{cN:"string",b:"(u|r|ur)'",e:"'",c:[e.BE],r:10},{cN:"string",b:'(u|r|ur)"',e:'"',c:[e.BE],r:10},{cN:"string",b:"(b|br)'",e:"'",c:[e.BE]},{cN:"string",b:'(b|br)"',e:'"',c:[e.BE]}].concat([e.ASM,e.QSM]),n={bWK:!0,e:":",i:"[${=;\\n]",c:[{cN:"title",b:e.UIR},{cN:"params",b:"\\(",e:"\\)",c:["self",e.CNM,t].concat(r)}],r:10};return{k:{keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10",built_in:"None True False Ellipsis NotImplemented"},i:"(</|->|\\?)",c:r.concat([t,e.HCM,e.inherit(n,{cN:"function",k:"def"}),e.inherit(n,{cN:"class",k:"class"}),e.CNM,{cN:"decorator",b:"@",e:"$"},{b:"\\b(print|exec)\\("}])}}(hljs),hljs.LANGUAGES.perl=function(e){var t="getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",r={cN:"subst",b:"[$@]\\{",e:"\\}",k:t,r:10},n={cN:"variable",b:"\\$\\d"},c={cN:"variable",b:"[\\$\\%\\@\\*](\\^\\w\\b|#\\w+(\\:\\:\\w+)*|[^\\s\\w{]|{\\w+}|\\w+(\\:\\:\\w*)*)"},s=[e.BE,r,n,c],i={b:"->",c:[{b:e.IR},{b:"{",e:"}"}]},a={cN:"comment",b:"^(__END__|__DATA__)",e:"\\n$",r:5},o=[n,c,e.HCM,a,{cN:"comment",b:"^\\=\\w",e:"\\=cut",eW:!0},i,{cN:"string",b:"q[qwxr]?\\s*\\(",e:"\\)",c:s,r:5},{cN:"string",b:"q[qwxr]?\\s*\\[",e:"\\]",c:s,r:5},{cN:"string",b:"q[qwxr]?\\s*\\{",e:"\\}",c:s,r:5},{cN:"string",b:"q[qwxr]?\\s*\\|",e:"\\|",c:s,r:5},{cN:"string",b:"q[qwxr]?\\s*\\<",e:"\\>",c:s,r:5},{cN:"string",b:"qw\\s+q",e:"q",c:s,r:5},{cN:"string",b:"'",e:"'",c:[e.BE],r:0},{cN:"string",b:'"',e:'"',c:s,r:0},{cN:"string",b:"`",e:"`",c:[e.BE]},{cN:"string",b:"{\\w+}",r:0},{cN:"string",b:"-?\\w+\\s*\\=\\>",r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"("+e.RSR+"|\\b(split|return|print|reverse|grep)\\b)\\s*",k:"split return print reverse grep",r:0,c:[e.HCM,a,{cN:"regexp",b:"(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",r:10},{cN:"regexp",b:"(m|qr)?/",e:"/[a-z]*",c:[e.BE],r:0}]},{cN:"sub",bWK:!0,e:"(\\s*\\(.*?\\))?[;{]",k:"sub",r:5},{cN:"operator",b:"-\\w\\b",r:0}];return r.c=o,{k:t,c:i.c[1].c=o}}(hljs),hljs.LANGUAGES.json=function(e){var t={literal:"true false null"},r=[e.QSM,e.CNM],n={cN:"value",e:",",eW:!0,eE:!0,c:r,k:t},c={b:"{",e:"}",c:[{cN:"attribute",b:'\\s*"',e:'"\\s*:\\s*',eB:!0,eE:!0,c:[e.BE],i:"\\n",starts:n}],i:"\\S"},s={b:"\\[",e:"\\]",c:[e.inherit(n,{cN:null})],i:"\\S"};return r.splice(r.length,0,c,s),{c:r,k:t,i:"\\S"}}(hljs),hljs.LANGUAGES.cpp=function(e){var t={keyword:"false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex",built_in:"std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr"};return{k:t,i:"</",c:[e.CLCM,e.CBLCLM,e.QSM,{cN:"string",b:"'\\\\?.",e:"'",i:"."},{cN:"number",b:"\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"},e.CNM,{cN:"preprocessor",b:"#",e:"$"},{cN:"stl_container",b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:t,r:10,c:["self"]}]}}(hljs),hljs.LANGUAGES.go=function(e){return{k:{keyword:"break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer",constant:"true false iota nil",typename:"bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",built_in:"append cap close complex copy imag len make new panic print println real recover delete"},i:"</",c:[e.CLCM,e.CBLCLM,e.QSM,{cN:"string",b:"'",e:"[^\\\\]'",r:0},{cN:"string",b:"`",e:"`"},{cN:"number",b:"[^a-zA-Z_0-9](\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?",r:0},e.CNM]}}(hljs);