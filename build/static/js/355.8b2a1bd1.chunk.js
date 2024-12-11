"use strict";(self.webpackChunktempate=self.webpackChunktempate||[]).push([[355],{8925:(e,t,n)=>{n.d(t,{o:()=>b});var r=n(7462),o=n(7313),l=n(8334),a=n(5422);const i=e=>{const t=o.useRef({});return o.useEffect((()=>{t.current=e})),t.current};var u=n(6182),c=n(6471);function s(e){return"undefined"!==typeof e.normalize?e.normalize("NFD").replace(/[\u0300-\u036f]/g,""):e}function p(e,t){for(let n=0;n<e.length;n+=1)if(t(e[n]))return n;return-1}const d=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{ignoreAccents:t=!0,ignoreCase:n=!0,limit:r,matchFrom:o="any",stringify:l,trim:a=!1}=e;return(e,i)=>{let{inputValue:u,getOptionLabel:c}=i,p=a?u.trim():u;n&&(p=p.toLowerCase()),t&&(p=s(p));const d=p?e.filter((e=>{let r=(l||c)(e);return n&&(r=r.toLowerCase()),t&&(r=s(r)),"start"===o?0===r.indexOf(p):r.indexOf(p)>-1})):e;return"number"===typeof r?d.slice(0,r):d}}(),f=5,g=e=>{var t;return null!==e.current&&(null==(t=e.current.parentElement)?void 0:t.contains(document.activeElement))};function b(e){const{unstable_isActiveElementInListbox:t=g,unstable_classNamePrefix:n="Mui",autoComplete:s=!1,autoHighlight:b=!1,autoSelect:h=!1,blurOnSelect:v=!1,clearOnBlur:x=!e.freeSolo,clearOnEscape:m=!1,componentName:y="useAutocomplete",defaultValue:O=(e.multiple?[]:null),disableClearable:k=!1,disableCloseOnSelect:S=!1,disabled:C,disabledItemsFocusable:A=!1,disableListWrap:D=!1,filterOptions:w=d,filterSelectedOptions:L=!1,freeSolo:I=!1,getOptionDisabled:E,getOptionKey:P,getOptionLabel:T=(e=>{var t;return null!=(t=e.label)?t:e}),groupBy:Z,handleHomeEndKeys:M=!e.freeSolo,id:R,includeInputInList:V=!1,inputValue:H,isOptionEqualToValue:F=((e,t)=>e===t),multiple:q=!1,onChange:z,onClose:K,onHighlightChange:N,onInputChange:B,onOpen:U,open:j,openOnFocus:W=!1,options:_,readOnly:G=!1,selectOnFocus:J=!e.freeSolo,value:Q}=e,X=(0,l.Z)(R);let Y=T;Y=e=>{const t=T(e);return"string"!==typeof t?String(t):t};const $=o.useRef(!1),ee=o.useRef(!0),te=o.useRef(null),ne=o.useRef(null),[re,oe]=o.useState(null),[le,ae]=o.useState(-1),ie=b?0:-1,ue=o.useRef(ie),[ce,se]=(0,a.Z)({controlled:Q,default:O,name:y}),[pe,de]=(0,a.Z)({controlled:H,default:"",name:y,state:"inputValue"}),[fe,ge]=o.useState(!1),be=o.useCallback(((e,t)=>{if(!(q?ce.length<t.length:null!==t)&&!x)return;let n;if(q)n="";else if(null==t)n="";else{const e=Y(t);n="string"===typeof e?e:""}pe!==n&&(de(n),B&&B(e,n,"reset"))}),[Y,pe,q,B,de,x,ce]),[he,ve]=(0,a.Z)({controlled:j,default:!1,name:y,state:"open"}),[xe,me]=o.useState(!0),ye=!q&&null!=ce&&pe===Y(ce),Oe=he&&!G,ke=Oe?w(_.filter((e=>!L||!(q?ce:[ce]).some((t=>null!==t&&F(e,t))))),{inputValue:ye&&xe?"":pe,getOptionLabel:Y}):[],Se=i({filteredOptions:ke,value:ce,inputValue:pe});o.useEffect((()=>{const e=ce!==Se.value;fe&&!e||I&&!e||be(null,ce)}),[ce,be,fe,Se.value,I]);const Ce=he&&ke.length>0&&!G;const Ae=(0,u.Z)((e=>{-1===e?te.current.focus():re.querySelector('[data-tag-index="'.concat(e,'"]')).focus()}));o.useEffect((()=>{q&&le>ce.length-1&&(ae(-1),Ae(-1))}),[ce,q,le,Ae]);const De=(0,u.Z)((e=>{let{event:t,index:r,reason:o="auto"}=e;if(ue.current=r,-1===r?te.current.removeAttribute("aria-activedescendant"):te.current.setAttribute("aria-activedescendant","".concat(X,"-option-").concat(r)),N&&N(t,-1===r?null:ke[r],o),!ne.current)return;const l=ne.current.querySelector('[role="option"].'.concat(n,"-focused"));l&&(l.classList.remove("".concat(n,"-focused")),l.classList.remove("".concat(n,"-focusVisible")));let a=ne.current;if("listbox"!==ne.current.getAttribute("role")&&(a=ne.current.parentElement.querySelector('[role="listbox"]')),!a)return;if(-1===r)return void(a.scrollTop=0);const i=ne.current.querySelector('[data-option-index="'.concat(r,'"]'));if(i&&(i.classList.add("".concat(n,"-focused")),"keyboard"===o&&i.classList.add("".concat(n,"-focusVisible")),a.scrollHeight>a.clientHeight&&"mouse"!==o&&"touch"!==o)){const e=i,t=a.clientHeight+a.scrollTop,n=e.offsetTop+e.offsetHeight;n>t?a.scrollTop=n-a.clientHeight:e.offsetTop-e.offsetHeight*(Z?1.3:0)<a.scrollTop&&(a.scrollTop=e.offsetTop-e.offsetHeight*(Z?1.3:0))}})),we=(0,u.Z)((e=>{let{event:t,diff:n,direction:r="next",reason:o="auto"}=e;if(!Oe)return;const l=function(e,t){if(!ne.current||e<0||e>=ke.length)return-1;let n=e;for(;;){const r=ne.current.querySelector('[data-option-index="'.concat(n,'"]')),o=!A&&(!r||r.disabled||"true"===r.getAttribute("aria-disabled"));if(r&&r.hasAttribute("tabindex")&&!o)return n;if(n="next"===t?(n+1)%ke.length:(n-1+ke.length)%ke.length,n===e)return-1}}((()=>{const e=ke.length-1;if("reset"===n)return ie;if("start"===n)return 0;if("end"===n)return e;const t=ue.current+n;return t<0?-1===t&&V?-1:D&&-1!==ue.current||Math.abs(n)>1?0:e:t>e?t===e+1&&V?-1:D||Math.abs(n)>1?e:0:t})(),r);if(De({index:l,reason:o,event:t}),s&&"reset"!==n)if(-1===l)te.current.value=pe;else{const e=Y(ke[l]);te.current.value=e;0===e.toLowerCase().indexOf(pe.toLowerCase())&&pe.length>0&&te.current.setSelectionRange(pe.length,e.length)}})),Le=o.useCallback((()=>{if(!Oe)return;if((()=>{if(-1!==ue.current&&Se.filteredOptions&&Se.filteredOptions.length!==ke.length&&Se.inputValue===pe&&(q?ce.length===Se.value.length&&Se.value.every(((e,t)=>Y(ce[t])===Y(e))):(e=Se.value,t=ce,(e?Y(e):"")===(t?Y(t):"")))){const e=Se.filteredOptions[ue.current];if(e&&ke.some((t=>Y(t)===Y(e))))return!0}var e,t;return!1})())return;const e=q?ce[0]:ce;if(0!==ke.length&&null!=e){if(ne.current)if(null==e)ue.current>=ke.length-1?De({index:ke.length-1}):De({index:ue.current});else{const t=ke[ue.current];if(q&&t&&-1!==p(ce,(e=>F(t,e))))return;const n=p(ke,(t=>F(t,e)));-1===n?we({diff:"reset"}):De({index:n})}}else we({diff:"reset"})}),[ke.length,!q&&ce,L,we,De,Oe,pe,q]),Ie=(0,u.Z)((e=>{(0,c.Z)(ne,e),e&&Le()}));o.useEffect((()=>{Le()}),[Le]);const Ee=e=>{he||(ve(!0),me(!0),U&&U(e))},Pe=(e,t)=>{he&&(ve(!1),K&&K(e,t))},Te=(e,t,n,r)=>{if(q){if(ce.length===t.length&&ce.every(((e,n)=>e===t[n])))return}else if(ce===t)return;z&&z(e,t,n,r),se(t)},Ze=o.useRef(!1),Me=function(e,t){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"options",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"selectOption",o=t;if(q){o=Array.isArray(ce)?ce.slice():[];const e=p(o,(e=>F(t,e)));-1===e?o.push(t):"freeSolo"!==n&&(o.splice(e,1),r="removeOption")}be(e,o),Te(e,o,r,{option:t}),S||e&&(e.ctrlKey||e.metaKey)||Pe(e,r),(!0===v||"touch"===v&&Ze.current||"mouse"===v&&!Ze.current)&&te.current.blur()};const Re=(e,t)=>{if(!q)return;""===pe&&Pe(e,"toggleInput");let n=le;-1===le?""===pe&&"previous"===t&&(n=ce.length-1):(n+="next"===t?1:-1,n<0&&(n=0),n===ce.length&&(n=-1)),n=function(e,t){if(-1===e)return-1;let n=e;for(;;){if("next"===t&&n===ce.length||"previous"===t&&-1===n)return-1;const e=re.querySelector('[data-tag-index="'.concat(n,'"]'));if(e&&e.hasAttribute("tabindex")&&!e.disabled&&"true"!==e.getAttribute("aria-disabled"))return n;n+="next"===t?1:-1}}(n,t),ae(n),Ae(n)},Ve=e=>{$.current=!0,de(""),B&&B(e,"","clear"),Te(e,q?[]:null,"clear")},He=e=>t=>{if(e.onKeyDown&&e.onKeyDown(t),!t.defaultMuiPrevented&&(-1!==le&&-1===["ArrowLeft","ArrowRight"].indexOf(t.key)&&(ae(-1),Ae(-1)),229!==t.which))switch(t.key){case"Home":Oe&&M&&(t.preventDefault(),we({diff:"start",direction:"next",reason:"keyboard",event:t}));break;case"End":Oe&&M&&(t.preventDefault(),we({diff:"end",direction:"previous",reason:"keyboard",event:t}));break;case"PageUp":t.preventDefault(),we({diff:-f,direction:"previous",reason:"keyboard",event:t}),Ee(t);break;case"PageDown":t.preventDefault(),we({diff:f,direction:"next",reason:"keyboard",event:t}),Ee(t);break;case"ArrowDown":t.preventDefault(),we({diff:1,direction:"next",reason:"keyboard",event:t}),Ee(t);break;case"ArrowUp":t.preventDefault(),we({diff:-1,direction:"previous",reason:"keyboard",event:t}),Ee(t);break;case"ArrowLeft":Re(t,"previous");break;case"ArrowRight":Re(t,"next");break;case"Enter":if(-1!==ue.current&&Oe){const e=ke[ue.current],n=!!E&&E(e);if(t.preventDefault(),n)return;Me(t,e,"selectOption"),s&&te.current.setSelectionRange(te.current.value.length,te.current.value.length)}else I&&""!==pe&&!1===ye&&(q&&t.preventDefault(),Me(t,pe,"createOption","freeSolo"));break;case"Escape":Oe?(t.preventDefault(),t.stopPropagation(),Pe(t,"escape")):m&&(""!==pe||q&&ce.length>0)&&(t.preventDefault(),t.stopPropagation(),Ve(t));break;case"Backspace":if(q&&!G&&""===pe&&ce.length>0){const e=-1===le?ce.length-1:le,n=ce.slice();n.splice(e,1),Te(t,n,"removeOption",{option:ce[e]})}break;case"Delete":if(q&&!G&&""===pe&&ce.length>0&&-1!==le){const e=le,n=ce.slice();n.splice(e,1),Te(t,n,"removeOption",{option:ce[e]})}}},Fe=e=>{ge(!0),W&&!$.current&&Ee(e)},qe=e=>{t(ne)?te.current.focus():(ge(!1),ee.current=!0,$.current=!1,h&&-1!==ue.current&&Oe?Me(e,ke[ue.current],"blur"):h&&I&&""!==pe?Me(e,pe,"blur","freeSolo"):x&&be(e,ce),Pe(e,"blur"))},ze=e=>{const t=e.target.value;pe!==t&&(de(t),me(!1),B&&B(e,t,"input")),""===t?k||q||Te(e,null,"clear"):Ee(e)},Ke=e=>{const t=Number(e.currentTarget.getAttribute("data-option-index"));ue.current!==t&&De({event:e,index:t,reason:"mouse"})},Ne=e=>{De({event:e,index:Number(e.currentTarget.getAttribute("data-option-index")),reason:"touch"}),Ze.current=!0},Be=e=>{const t=Number(e.currentTarget.getAttribute("data-option-index"));Me(e,ke[t],"selectOption"),Ze.current=!1},Ue=e=>t=>{const n=ce.slice();n.splice(e,1),Te(t,n,"removeOption",{option:ce[e]})},je=e=>{he?Pe(e,"toggleInput"):Ee(e)},We=e=>{e.currentTarget.contains(e.target)&&e.target.getAttribute("id")!==X&&e.preventDefault()},_e=e=>{e.currentTarget.contains(e.target)&&(te.current.focus(),J&&ee.current&&te.current.selectionEnd-te.current.selectionStart===0&&te.current.select(),ee.current=!1)},Ge=e=>{C||""!==pe&&he||je(e)};let Je=I&&pe.length>0;Je=Je||(q?ce.length>0:null!==ce);let Qe=ke;if(Z){new Map;Qe=ke.reduce(((e,t,n)=>{const r=Z(t);return e.length>0&&e[e.length-1].group===r?e[e.length-1].options.push(t):e.push({key:n,index:n,group:r,options:[t]}),e}),[])}return C&&fe&&qe(),{getRootProps:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.Z)({"aria-owns":Ce?"".concat(X,"-listbox"):null},e,{onKeyDown:He(e),onMouseDown:We,onClick:_e})},getInputLabelProps:()=>({id:"".concat(X,"-label"),htmlFor:X}),getInputProps:()=>({id:X,value:pe,onBlur:qe,onFocus:Fe,onChange:ze,onMouseDown:Ge,"aria-activedescendant":Oe?"":null,"aria-autocomplete":s?"both":"list","aria-controls":Ce?"".concat(X,"-listbox"):void 0,"aria-expanded":Ce,autoComplete:"off",ref:te,autoCapitalize:"none",spellCheck:"false",role:"combobox",disabled:C}),getClearProps:()=>({tabIndex:-1,type:"button",onClick:Ve}),getPopupIndicatorProps:()=>({tabIndex:-1,type:"button",onClick:je}),getTagProps:e=>{let{index:t}=e;return(0,r.Z)({key:t,"data-tag-index":t,tabIndex:-1},!G&&{onDelete:Ue(t)})},getListboxProps:()=>({role:"listbox",id:"".concat(X,"-listbox"),"aria-labelledby":"".concat(X,"-label"),ref:Ie,onMouseDown:e=>{e.preventDefault()}}),getOptionProps:e=>{let{index:t,option:n}=e;var r;const o=(q?ce:[ce]).some((e=>null!=e&&F(n,e))),l=!!E&&E(n);return{key:null!=(r=null==P?void 0:P(n))?r:Y(n),tabIndex:-1,role:"option",id:"".concat(X,"-option-").concat(t),onMouseMove:Ke,onClick:Be,onTouchStart:Ne,"data-option-index":t,"aria-disabled":l,"aria-selected":o}},id:X,inputValue:pe,value:ce,dirty:Je,expanded:Oe&&re,popupOpen:Oe,focused:fe||-1!==le,anchorEl:re,setAnchorEl:oe,focusedTag:le,groupedOptions:Qe}}},8728:(e,t,n)=>{var r=n(4836);t.Z=void 0;var o=r(n(5045)),l=n(6417);t.Z=(0,o.default)((0,l.jsx)("path",{d:"M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"}),"Check")},1198:(e,t,n)=>{var r=n(4836);t.Z=void 0;var o=r(n(5045)),l=n(6417);t.Z=(0,o.default)((0,l.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close")},9339:(e,t,n)=>{n.d(t,{Z:()=>r});const r=(0,n(7430).Z)("MuiAutocomplete",["root","expanded","fullWidth","focused","focusVisible","tag","tagSizeSmall","tagSizeMedium","hasPopupIcon","hasClearIcon","inputRoot","input","inputFocused","endAdornment","clearIndicator","popupIndicator","popupIndicatorOpen","popper","popperDisablePortal","paper","listbox","loading","noOptions","option","groupLabel","groupUl"])},4108:()=>{}}]);