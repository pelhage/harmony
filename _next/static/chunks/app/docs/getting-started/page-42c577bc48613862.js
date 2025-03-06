(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[775],{3582:(e,t,n)=>{Promise.resolve().then(n.t.bind(n,6874,23)),Promise.resolve().then(n.bind(n,6082)),Promise.resolve().then(n.bind(n,8235))},6082:(e,t,n)=>{"use strict";n.d(t,{SiteHeader:()=>f});var r=n(5155),o=n(6874),i=n.n(o);n(2115);var a=n(9708),s=n(2085),l=n(9434);let u=(0,s.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",{variants:{variant:{default:"bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",destructive:"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",outline:"border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2 has-[>svg]:px-3",sm:"h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",lg:"h-10 rounded-md px-6 has-[>svg]:px-4",icon:"size-9"}},defaultVariants:{variant:"default",size:"default"}});function c(e){let{className:t,variant:n,size:o,asChild:i=!1,...s}=e,c=i?a.DX:"button";return(0,r.jsx)(c,{"data-slot":"button",className:(0,l.cn)(u({variant:n,size:o,className:t})),...s})}function d(e){let{children:t,className:n,...o}=e;return(0,r.jsx)("div",{className:(0,l.cn)("container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl",n),...o,children:t})}function f(){return(0,r.jsx)("header",{className:"sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60",children:(0,r.jsx)(d,{children:(0,r.jsxs)("div",{className:"flex h-16 items-center",children:[(0,r.jsxs)(i(),{href:"/",className:"mr-6 flex items-center space-x-2",children:[(0,r.jsx)("div",{className:"h-6 w-6 rounded-full bg-indigo-500"}),(0,r.jsx)("span",{className:"font-bold text-xl",children:"Harmony"}),(0,r.jsx)("span",{className:"text-xs text-indigo-500 hidden sm:inline-block",children:"CLI"})]}),(0,r.jsxs)("div",{className:"hidden md:flex space-x-4",children:[(0,r.jsx)(i(),{href:"/#features",className:"text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",children:"Features"}),(0,r.jsx)(i(),{href:"/#demo",className:"text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",children:"Demo"}),(0,r.jsx)(i(),{href:"/#installation",className:"text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",children:"Installation"})]}),(0,r.jsx)("div",{className:"ml-auto flex items-center space-x-4",children:(0,r.jsx)(c,{variant:"outline",className:"border-indigo-500/50 text-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-500",asChild:!0,children:(0,r.jsx)(i(),{href:"https://github.com/pelhage/harmony",target:"_blank",children:"GitHub"})})})]})})})}},8235:(e,t,n)=>{"use strict";n.d(t,{Tabs:()=>Z,TabsContent:()=>en,TabsList:()=>ee,TabsTrigger:()=>et});var r=n(5155),o=n(2115),i=n.t(o,2);function a(e,t,{checkForDefaultPrevented:n=!0}={}){return function(r){if(e?.(r),!1===n||!r.defaultPrevented)return t?.(r)}}function s(e,t=[]){let n=[],i=()=>{let t=n.map(e=>o.createContext(e));return function(n){let r=n?.[e]||t;return o.useMemo(()=>({[`__scope${e}`]:{...n,[e]:r}}),[n,r])}};return i.scopeName=e,[function(t,i){let a=o.createContext(i),s=n.length;n=[...n,i];let l=t=>{let{scope:n,children:i,...l}=t,u=n?.[e]?.[s]||a,c=o.useMemo(()=>l,Object.values(l));return(0,r.jsx)(u.Provider,{value:c,children:i})};return l.displayName=t+"Provider",[l,function(n,r){let l=r?.[e]?.[s]||a,u=o.useContext(l);if(u)return u;if(void 0!==i)return i;throw Error(`\`${n}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let n=()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let r=n.reduce((t,{useScope:n,scopeName:r})=>{let o=n(e)[`__scope${r}`];return{...t,...o}},{});return o.useMemo(()=>({[`__scope${t.scopeName}`]:r}),[r])}};return n.scopeName=t.scopeName,n}(i,...t)]}var l=n(6101),u=n(9708),c=globalThis?.document?o.useLayoutEffect:()=>{},d=i["useId".toString()]||(()=>void 0),f=0;function m(e){let[t,n]=o.useState(d());return c(()=>{e||n(e=>e??String(f++))},[e]),e||(t?`radix-${t}`:"")}n(7650);var v=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let n=o.forwardRef((e,n)=>{let{asChild:o,...i}=e,a=o?u.DX:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,r.jsx)(a,{...i,ref:n})});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function p(e){let t=o.useRef(e);return o.useEffect(()=>{t.current=e}),o.useMemo(()=>(...e)=>t.current?.(...e),[])}function g({prop:e,defaultProp:t,onChange:n=()=>{}}){let[r,i]=function({defaultProp:e,onChange:t}){let n=o.useState(e),[r]=n,i=o.useRef(r),a=p(t);return o.useEffect(()=>{i.current!==r&&(a(r),i.current=r)},[r,i,a]),n}({defaultProp:t,onChange:n}),a=void 0!==e,s=a?e:r,l=p(n);return[s,o.useCallback(t=>{if(a){let n="function"==typeof t?t(e):t;n!==e&&l(n)}else i(t)},[a,e,i,l])]}var b=o.createContext(void 0);function x(e){let t=o.useContext(b);return e||t||"ltr"}var h="rovingFocusGroup.onEntryFocus",w={bubbles:!1,cancelable:!0},y="RovingFocusGroup",[N,j,R]=function(e){let t=e+"CollectionProvider",[n,i]=s(t),[a,c]=n(t,{collectionRef:{current:null},itemMap:new Map}),d=e=>{let{scope:t,children:n}=e,i=o.useRef(null),s=o.useRef(new Map).current;return(0,r.jsx)(a,{scope:t,itemMap:s,collectionRef:i,children:n})};d.displayName=t;let f=e+"CollectionSlot",m=o.forwardRef((e,t)=>{let{scope:n,children:o}=e,i=c(f,n),a=(0,l.s)(t,i.collectionRef);return(0,r.jsx)(u.DX,{ref:a,children:o})});m.displayName=f;let v=e+"CollectionItemSlot",p="data-radix-collection-item",g=o.forwardRef((e,t)=>{let{scope:n,children:i,...a}=e,s=o.useRef(null),d=(0,l.s)(t,s),f=c(v,n);return o.useEffect(()=>(f.itemMap.set(s,{ref:s,...a}),()=>void f.itemMap.delete(s))),(0,r.jsx)(u.DX,{[p]:"",ref:d,children:i})});return g.displayName=v,[{Provider:d,Slot:m,ItemSlot:g},function(t){let n=c(e+"CollectionConsumer",t);return o.useCallback(()=>{let e=n.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll("[".concat(p,"]")));return Array.from(n.itemMap.values()).sort((e,n)=>t.indexOf(e.ref.current)-t.indexOf(n.ref.current))},[n.collectionRef,n.itemMap])},i]}(y),[T,C]=s(y,[R]),[I,M]=T(y),E=o.forwardRef((e,t)=>(0,r.jsx)(N.Provider,{scope:e.__scopeRovingFocusGroup,children:(0,r.jsx)(N.Slot,{scope:e.__scopeRovingFocusGroup,children:(0,r.jsx)(k,{...e,ref:t})})}));E.displayName=y;var k=o.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:n,orientation:i,loop:s=!1,dir:u,currentTabStopId:c,defaultCurrentTabStopId:d,onCurrentTabStopIdChange:f,onEntryFocus:m,preventScrollOnEntryFocus:b=!1,...y}=e,N=o.useRef(null),R=(0,l.s)(t,N),T=x(u),[C=null,M]=g({prop:c,defaultProp:d,onChange:f}),[E,k]=o.useState(!1),A=p(m),D=j(n),_=o.useRef(!1),[S,O]=o.useState(0);return o.useEffect(()=>{let e=N.current;if(e)return e.addEventListener(h,A),()=>e.removeEventListener(h,A)},[A]),(0,r.jsx)(I,{scope:n,orientation:i,dir:T,loop:s,currentTabStopId:C,onItemFocus:o.useCallback(e=>M(e),[M]),onItemShiftTab:o.useCallback(()=>k(!0),[]),onFocusableItemAdd:o.useCallback(()=>O(e=>e+1),[]),onFocusableItemRemove:o.useCallback(()=>O(e=>e-1),[]),children:(0,r.jsx)(v.div,{tabIndex:E||0===S?-1:0,"data-orientation":i,...y,ref:R,style:{outline:"none",...e.style},onMouseDown:a(e.onMouseDown,()=>{_.current=!0}),onFocus:a(e.onFocus,e=>{let t=!_.current;if(e.target===e.currentTarget&&t&&!E){let t=new CustomEvent(h,w);if(e.currentTarget.dispatchEvent(t),!t.defaultPrevented){let e=D().filter(e=>e.focusable);F([e.find(e=>e.active),e.find(e=>e.id===C),...e].filter(Boolean).map(e=>e.ref.current),b)}}_.current=!1}),onBlur:a(e.onBlur,()=>k(!1))})})}),A="RovingFocusGroupItem",D=o.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:n,focusable:i=!0,active:s=!1,tabStopId:l,...u}=e,c=m(),d=l||c,f=M(A,n),p=f.currentTabStopId===d,g=j(n),{onFocusableItemAdd:b,onFocusableItemRemove:x}=f;return o.useEffect(()=>{if(i)return b(),()=>x()},[i,b,x]),(0,r.jsx)(N.ItemSlot,{scope:n,id:d,focusable:i,active:s,children:(0,r.jsx)(v.span,{tabIndex:p?0:-1,"data-orientation":f.orientation,...u,ref:t,onMouseDown:a(e.onMouseDown,e=>{i?f.onItemFocus(d):e.preventDefault()}),onFocus:a(e.onFocus,()=>f.onItemFocus(d)),onKeyDown:a(e.onKeyDown,e=>{if("Tab"===e.key&&e.shiftKey){f.onItemShiftTab();return}if(e.target!==e.currentTarget)return;let t=function(e,t,n){var r;let o=(r=e.key,"rtl"!==n?r:"ArrowLeft"===r?"ArrowRight":"ArrowRight"===r?"ArrowLeft":r);if(!("vertical"===t&&["ArrowLeft","ArrowRight"].includes(o))&&!("horizontal"===t&&["ArrowUp","ArrowDown"].includes(o)))return _[o]}(e,f.orientation,f.dir);if(void 0!==t){if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;e.preventDefault();let n=g().filter(e=>e.focusable).map(e=>e.ref.current);if("last"===t)n.reverse();else if("prev"===t||"next"===t){"prev"===t&&n.reverse();let r=n.indexOf(e.currentTarget);n=f.loop?function(e,t){return e.map((n,r)=>e[(t+r)%e.length])}(n,r+1):n.slice(r+1)}setTimeout(()=>F(n))}})})})});D.displayName=A;var _={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function F(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=document.activeElement;for(let r of e)if(r===n||(r.focus({preventScroll:t}),document.activeElement!==n))return}var S=e=>{let{present:t,children:n}=e,r=function(e){var t,n;let[r,i]=o.useState(),a=o.useRef({}),s=o.useRef(e),l=o.useRef("none"),[u,d]=(t=e?"mounted":"unmounted",n={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}},o.useReducer((e,t)=>{let r=n[e][t];return null!=r?r:e},t));return o.useEffect(()=>{let e=O(a.current);l.current="mounted"===u?e:"none"},[u]),c(()=>{let t=a.current,n=s.current;if(n!==e){let r=l.current,o=O(t);e?d("MOUNT"):"none"===o||(null==t?void 0:t.display)==="none"?d("UNMOUNT"):n&&r!==o?d("ANIMATION_OUT"):d("UNMOUNT"),s.current=e}},[e,d]),c(()=>{if(r){var e;let t;let n=null!==(e=r.ownerDocument.defaultView)&&void 0!==e?e:window,o=e=>{let o=O(a.current).includes(e.animationName);if(e.target===r&&o&&(d("ANIMATION_END"),!s.current)){let e=r.style.animationFillMode;r.style.animationFillMode="forwards",t=n.setTimeout(()=>{"forwards"===r.style.animationFillMode&&(r.style.animationFillMode=e)})}},i=e=>{e.target===r&&(l.current=O(a.current))};return r.addEventListener("animationstart",i),r.addEventListener("animationcancel",o),r.addEventListener("animationend",o),()=>{n.clearTimeout(t),r.removeEventListener("animationstart",i),r.removeEventListener("animationcancel",o),r.removeEventListener("animationend",o)}}d("ANIMATION_END")},[r,d]),{isPresent:["mounted","unmountSuspended"].includes(u),ref:o.useCallback(e=>{e&&(a.current=getComputedStyle(e)),i(e)},[])}}(t),i="function"==typeof n?n({present:r.isPresent}):o.Children.only(n),a=(0,l.s)(r.ref,function(e){var t,n;let r=null===(t=Object.getOwnPropertyDescriptor(e.props,"ref"))||void 0===t?void 0:t.get,o=r&&"isReactWarning"in r&&r.isReactWarning;return o?e.ref:(o=(r=null===(n=Object.getOwnPropertyDescriptor(e,"ref"))||void 0===n?void 0:n.get)&&"isReactWarning"in r&&r.isReactWarning)?e.props.ref:e.props.ref||e.ref}(i));return"function"==typeof n||r.isPresent?o.cloneElement(i,{ref:a}):null};function O(e){return(null==e?void 0:e.animationName)||"none"}S.displayName="Presence";var P="Tabs",[L,U]=s(P,[C]),z=C(),[K,$]=L(P),G=o.forwardRef((e,t)=>{let{__scopeTabs:n,value:o,onValueChange:i,defaultValue:a,orientation:s="horizontal",dir:l,activationMode:u="automatic",...c}=e,d=x(l),[f,p]=g({prop:o,onChange:i,defaultProp:a});return(0,r.jsx)(K,{scope:n,baseId:m(),value:f,onValueChange:p,orientation:s,dir:d,activationMode:u,children:(0,r.jsx)(v.div,{dir:d,"data-orientation":s,...c,ref:t})})});G.displayName=P;var V="TabsList",H=o.forwardRef((e,t)=>{let{__scopeTabs:n,loop:o=!0,...i}=e,a=$(V,n),s=z(n);return(0,r.jsx)(E,{asChild:!0,...s,orientation:a.orientation,dir:a.dir,loop:o,children:(0,r.jsx)(v.div,{role:"tablist","aria-orientation":a.orientation,...i,ref:t})})});H.displayName=V;var W="TabsTrigger",X=o.forwardRef((e,t)=>{let{__scopeTabs:n,value:o,disabled:i=!1,...s}=e,l=$(W,n),u=z(n),c=Q(l.baseId,o),d=J(l.baseId,o),f=o===l.value;return(0,r.jsx)(D,{asChild:!0,...u,focusable:!i,active:f,children:(0,r.jsx)(v.button,{type:"button",role:"tab","aria-selected":f,"aria-controls":d,"data-state":f?"active":"inactive","data-disabled":i?"":void 0,disabled:i,id:c,...s,ref:t,onMouseDown:a(e.onMouseDown,e=>{i||0!==e.button||!1!==e.ctrlKey?e.preventDefault():l.onValueChange(o)}),onKeyDown:a(e.onKeyDown,e=>{[" ","Enter"].includes(e.key)&&l.onValueChange(o)}),onFocus:a(e.onFocus,()=>{let e="manual"!==l.activationMode;f||i||!e||l.onValueChange(o)})})})});X.displayName=W;var B="TabsContent",q=o.forwardRef((e,t)=>{let{__scopeTabs:n,value:i,forceMount:a,children:s,...l}=e,u=$(B,n),c=Q(u.baseId,i),d=J(u.baseId,i),f=i===u.value,m=o.useRef(f);return o.useEffect(()=>{let e=requestAnimationFrame(()=>m.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,r.jsx)(S,{present:a||f,children:n=>{let{present:o}=n;return(0,r.jsx)(v.div,{"data-state":f?"active":"inactive","data-orientation":u.orientation,role:"tabpanel","aria-labelledby":c,hidden:!o,id:d,tabIndex:0,...l,ref:t,style:{...e.style,animationDuration:m.current?"0s":void 0},children:o&&s})}})});function Q(e,t){return"".concat(e,"-trigger-").concat(t)}function J(e,t){return"".concat(e,"-content-").concat(t)}q.displayName=B;var Y=n(9434);function Z(e){let{className:t,...n}=e;return(0,r.jsx)(G,{"data-slot":"tabs",className:(0,Y.cn)("flex flex-col gap-2",t),...n})}function ee(e){let{className:t,...n}=e;return(0,r.jsx)(H,{"data-slot":"tabs-list",className:(0,Y.cn)("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-1",t),...n})}function et(e){let{className:t,...n}=e;return(0,r.jsx)(X,{"data-slot":"tabs-trigger",className:(0,Y.cn)("data-[state=active]:bg-background data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",t),...n})}function en(e){let{className:t,...n}=e;return(0,r.jsx)(q,{"data-slot":"tabs-content",className:(0,Y.cn)("flex-1 outline-none",t),...n})}},9434:(e,t,n)=>{"use strict";n.d(t,{cn:()=>i});var r=n(2596),o=n(9688);function i(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return(0,o.QP)((0,r.$)(t))}}},e=>{var t=t=>e(e.s=t);e.O(0,[503,441,684,358],()=>t(3582)),_N_E=e.O()}]);