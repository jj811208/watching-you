var gt=Object.defineProperty;var mt=(n,t,r)=>t in n?gt(n,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[t]=r;var R=(n,t,r)=>(mt(n,typeof t!="symbol"?t+"":t,r),r),st=(n,t,r)=>{if(!t.has(n))throw TypeError("Cannot "+r)};var e=(n,t,r)=>(st(n,t,"read from private field"),r?r.call(n):t.get(n)),a=(n,t,r)=>{if(t.has(n))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(n):t.set(n,r)},s=(n,t,r,o)=>(st(n,t,"write to private field"),o?o.call(n,r):t.set(n,r),r),A=(n,t,r,o)=>({set _(i){s(n,t,i,r)},get _(){return e(n,t,o)}});import{R as nt,r as x,j as T,a as rt}from"./jsx-runtime.b054b841.js";import"./iframe.10f6206f.js";const dt=/px\) rotate\(|translate\(|deg\)|px,/;function pt(n){const t=getComputedStyle(n).transform;if(t==="none")return{x:0,y:0};if(t.includes("translate")){const o=t.split(dt);return{x:Number(o[1]),y:Number(o[2])}}const r=t.slice(0,-1).split(", ").slice(-2).map(Number);return{x:r[0],y:r[1]}}function at(n,t){if(t==="error")throw Error(n)}function f(n){return Math.round(n*10)/10}function ft(n){return!n||n.targetType==="mouse"||!n.targetType&&!n.target}function yt(n){return n?n.targetType==="dom"||!n.targetType&&!!n.target:!1}function bt(n){return n?n.targetType==="input":!1}function H(n){return n instanceof HTMLElement}const it=50,Tt="mouse",ct={translate:{x:0,y:0},rotate:0};var C,w,$,N,b,h,v,X,L,j,B,V,g,D,I,M,W,m,k,P,O,U,J,G,z,K,F,Q,Z;const y=class{constructor(t,r={}){a(this,m);a(this,N,null);a(this,b,null);a(this,h,null);a(this,v,null);a(this,X,null);a(this,L,null);a(this,j,null);a(this,B,!0);a(this,V,!0);a(this,g,Tt);a(this,D,it);a(this,I,it);a(this,M,null);a(this,W,null);a(this,O,()=>{if(e(this,b)===null)return;const t=e(this,b).getBoundingClientRect(),r=pt(e(this,b)),o=f(t.left-r.x+t.width/2),i=f(t.top-r.y+t.height/2);s(this,v,{x:o,y:i})});a(this,U,()=>{if(!e(this,h))return;const t=e(this,h).getBoundingClientRect(),r=f(t.left+t.width/2),o=f(t.top+t.height/2);s(this,m,{x:r,y:o},P)});a(this,J,()=>{if(!e(this,h))return;e(this,M)||e(this,G).call(this);const t=e(this,M),r=e(this,h);if(t.innerText!==r.value&&(t.innerText=r.value),r.value===""){s(this,m,null,P);return}const{font:o,letterSpacing:i,width:d,lineHeight:u,paddingLeft:p}=getComputedStyle(e(this,h)),l=Number(p.slice(0,-2)),Y=e(this,h).tagName,c=Y==="INPUT",ot=Y==="TEXTAREA",E=e(this,h).getBoundingClientRect(),_=t.getBoundingClientRect();if(c){t.setAttribute("style",`
          position: absolute;
          opacity: 0;
          top: 0;
          left: -100%;
          pointer-events: none;
          display: inline-block;
          line-height: ${u};
          font: ${o};
          max-width: ${d};
          letter-spacing: ${i};
          `);const tt=f(E.left+_.width+l),et=f(E.top+_.height/2);s(this,m,{x:tt,y:et},P)}if(ot){t.setAttribute("style",`
          position: absolute;
          opacity: 0;
          top: 0;
          left: -100%;
          pointer-events: none;
          display: inline-block;
          word-break: keep-all;
          line-height: ${u};
          font: ${o};
          letter-spacing: ${i};
        `);const tt=Number(d.slice(0,-2)),et=_.width%tt,ut=f(E.left+et+l),ht=f(E.top+E.height/2);s(this,m,{x:ut,y:ht},P)}});a(this,G,()=>{var t;!e(this,h)||(s(this,M,document.createElement("div")),(t=document.querySelector("body"))==null||t.append(e(this,M)))});a(this,z,()=>{if(!e(this,b))return!1;const t=e(this,b).getBoundingClientRect(),r=e(this,I)*2,o=e(this,D)*2;return!(t.top-r>(window.innerHeight||document.documentElement.clientHeight)||t.bottom+r<0||t.left-o>(window.innerWidth||document.documentElement.clientWidth)||t.right+o<0)});a(this,K,()=>{const t={translate:{x:0,y:0},rotate:0};if(!e(this,v)||!e(this,m,k)||!e(this,V)&&!e(this,B))return t;const r=e(this,m,k).x-e(this,v).x,o=e(this,m,k).y-e(this,v).y,i=r>=0?1:-1,d=o>=0?1:-1;if(e(this,V)){const u=Math.abs(r),p=Math.abs(o),l=Math.atan2(p,u),Y=Math.min(u,Math.cos(l)*e(this,D))*i,c=Math.min(p,Math.sin(l)*e(this,I))*d;t.translate.x=f(Y),t.translate.y=f(c)}if(e(this,B)){const u=Math.atan2(o,r)*180/Math.PI;t.rotate=f(u+90)}return t});a(this,F,t=>{!e(this,b)||(e(this,b).style.transform=`translate(${t.translate.x}px,${t.translate.y}px) rotate(${t.rotate}deg)`)});a(this,Q,()=>{var t,r,o,i,d,u,p,l;return((t=e(this,L))==null?void 0:t.x)!==((r=e(this,v))==null?void 0:r.x)||((o=e(this,L))==null?void 0:o.y)!==((i=e(this,v))==null?void 0:i.y)||((d=e(this,j))==null?void 0:d.x)!==((u=e(this,m,k))==null?void 0:u.x)||((p=e(this,j))==null?void 0:p.y)!==((l=e(this,m,k))==null?void 0:l.y)});a(this,Z,()=>{const t=e(this,K).call(this);e(this,N)?e(this,N).call(this,t):e(this,F).call(this,t),s(this,L,e(this,v)),s(this,j,e(this,m,k))});R(this,"setWatcher",t=>{t!==void 0&&(H(t)?s(this,b,t):typeof t=="string"?s(this,b,document.querySelector(t)):at(`Unexpected watcher: ${JSON.stringify(t)}`,"warn"))});R(this,"setRotatable",(t=!0)=>{s(this,B,!!t)});R(this,"setMovable",(t=!0)=>{s(this,V,!!t)});R(this,"setTarget",t=>{if(e(this,g)==="mouse"&&e(this,W)!==null&&A(y,w)._--,ft(t))s(this,g,"mouse"),s(this,h,null);else if(yt(t)){const{target:r}=t;s(this,g,"dom"),s(this,h,H(r)?r:document.querySelector(r))}else if(bt(t)){const{target:r}=t;s(this,g,"input"),s(this,h,H(r)?r:document.querySelector(r))}else at(`Unexpected target: ${JSON.stringify(t)}`,"warn");e(this,g)==="mouse"&&e(this,W)!==null&&A(y,w)._++});R(this,"setCustomRender",t=>{t!==void 0&&s(this,N,t)});R(this,"setPower",t=>{if(t!==void 0){if(typeof t=="number"){s(this,D,t),s(this,I,t);return}(t==null?void 0:t.x)!==void 0&&s(this,D,t.x),(t==null?void 0:t.y)!==void 0&&s(this,I,t.y)}});R(this,"start",()=>{if(e(this,W)!==null)return;e(this,g)==="mouse"&&(e(y,w)===0&&window.addEventListener("mousemove",e(y,$)),A(y,w)._++);const t=()=>{e(this,z).call(this)&&(e(this,O).call(this),e(this,g)==="dom"&&e(this,U).call(this),e(this,g)==="input"&&e(this,J).call(this),e(this,Q).call(this)&&e(this,Z).call(this)),s(this,W,requestAnimationFrame(t))};t()});R(this,"stop",()=>{e(this,W)!==null&&(e(this,g)==="mouse"&&A(y,w)._--,e(y,w)===0&&window.removeEventListener("mousemove",e(y,$)),cancelAnimationFrame(e(this,W)||0),s(this,W,null),e(this,b)&&(e(this,N)?e(this,N).call(this,ct):e(this,F).call(this,ct)),e(this,M)&&(e(this,M).remove(),s(this,M,null)))});const o=typeof t=="object"&&!H(t),i=o?t:r,d=o?void 0:t,{power:u,rotatable:p,movable:l,render:Y,...c}=i;this.setCustomRender(Y),this.setWatcher(d),this.setTarget(c),this.setPower(u),this.setRotatable(p),this.setMovable(l)}};let S=y;C=new WeakMap,w=new WeakMap,$=new WeakMap,N=new WeakMap,b=new WeakMap,h=new WeakMap,v=new WeakMap,X=new WeakMap,L=new WeakMap,j=new WeakMap,B=new WeakMap,V=new WeakMap,g=new WeakMap,D=new WeakMap,I=new WeakMap,M=new WeakMap,W=new WeakMap,m=new WeakSet,k=function(){return e(this,g)==="mouse"?e(y,C):e(this,X)},P=function(t){e(this,g)==="mouse"&&s(y,C,t),s(this,X,t)},O=new WeakMap,U=new WeakMap,J=new WeakMap,G=new WeakMap,z=new WeakMap,K=new WeakMap,F=new WeakMap,Q=new WeakMap,Z=new WeakMap,a(S,C,null),a(S,w,0),a(S,$,t=>{s(y,C,{x:f(t.clientX),y:f(t.clientY)})});function lt(...n){return Object.assign({},...n)}const xt=(n={})=>{const{target:t,targetType:r,power:o,rotatable:i,movable:d,active:u=!0}=n,p=x.exports.useRef(null),[l,Y]=x.exports.useState({translate:{x:0,y:0},rotate:0}),c=x.exports.useRef(new S({...n,render:E=>{Y(E)}}));return x.exports.useEffect(()=>{c.current.setTarget({target:t,targetType:r})},[t,r]),x.exports.useEffect(()=>{c.current.setPower(o)},[o]),x.exports.useEffect(()=>{c.current.setRotatable(i)},[i]),x.exports.useEffect(()=>{c.current.setMovable(d)},[d]),x.exports.useEffect(()=>{c.current.setWatcher(p.current||void 0)},[c]),x.exports.useEffect(()=>{if(u)return c.current.start(),c.current.stop;c.current.stop()},[u]),x.exports.useEffect(()=>(c.current.start(),c.current.stop),[]),[x.exports.useMemo(()=>({ref:p,style:{transform:`translate(${l.translate.x}px,${l.translate.y}px) rotate(${l.rotate}deg)`}}),[l.translate.x,l.translate.y,l.rotate]),c.current]},vt=n=>{var i;const{children:t,...r}=n,[o]=xt(r);return nt.isValidElement(t)?nt.cloneElement(t,lt(t.props,{ref:o.ref,style:lt((i=t==null?void 0:t.props)==null?void 0:i.style,o.style)})):null},q=nt.memo(vt);const Ct={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from '@storybook/react';
import WatchingYou from '../index';
import './stories.css';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// https://storybook.js.org/docs/react/essentials/controls
// https://storybook.js.org/docs/react/writing-docs/doc-block-argstable
export default {
  title: 'Watching-You',
  component: WatchingYou,
  argTypes: {
    power: {
      control: {
        type: 'range',
        min: 20,
        max: 300,
        step: 10,
        default: 123,
      },
      description: 'Maximum distance to move from the origin (px).',
      defaultValue: {
        summary: 50,
      },
    },
    movable: {
      control: {
        type: 'boolean',
      },
      description: 'Ability to move',
      defaultValue: {
        summary: true,
      },
    },
    rotatable: {
      control: {
        type: 'boolean',
      },
      description: 'Ability to rotate',
      defaultValue: {
        summary: true,
      },
    },
    active: {
      control: {
        type: 'boolean',
      },
      description: 'active',
      defaultValue: {
        summary: true,
      },
    },
  },
} as ComponentMeta<typeof WatchingYou>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const MouseTargetTemplate: ComponentStory<typeof WatchingYou> = (
  args,
) => (
  <div className="container">
    <WatchingYou {...args}>
      <span>1</span>
    </WatchingYou>
  </div>
);
export const MouseTarget = MouseTargetTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
MouseTarget.args = {
  power: 50,
  movable: true,
  rotatable: true,
  active: true,
};

const DomTargetTemplate: ComponentStory<typeof WatchingYou> = (
  args,
) => (
  <div className="container">
    <div className="running-target">target</div>
    <WatchingYou {...args} targetType="dom" target=".running-target">
      <span>1</span>
    </WatchingYou>
  </div>
);
export const DomTarget = DomTargetTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DomTarget.args = {
  power: 50,
  movable: true,
  rotatable: true,
  active: true,
};

const InputTargetTemplate: ComponentStory<typeof WatchingYou> = (
  args,
) => (
  <div className="container">
    <WatchingYou {...args} targetType="input" target=".target">
      <span>1</span>
    </WatchingYou>
    <input className="target" />
  </div>
);
export const InputTarget = InputTargetTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
InputTarget.args = {
  power: 50,
  movable: true,
  rotatable: true,
  active: true,
};

const TextareaTargetTemplate: ComponentStory<typeof WatchingYou> = (
  args,
) => (
  <div className="container">
    <WatchingYou {...args} targetType="input" target=".target2">
      <span>1</span>
    </WatchingYou>
    <textarea className="target2"></textarea>
  </div>
);
export const TextareaTarget = TextareaTargetTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TextareaTarget.args = {
  power: 50,
  movable: true,
  rotatable: true,
  active: true,
};
`,locationsMap:{"mouse-target":{startLoc:{col:64,line:56},endLoc:{col:1,line:64},startBody:{col:64,line:56},endBody:{col:1,line:64}},"dom-target":{startLoc:{col:62,line:74},endLoc:{col:1,line:83},startBody:{col:62,line:74},endBody:{col:1,line:83}},"input-target":{startLoc:{col:64,line:93},endLoc:{col:1,line:102},startBody:{col:64,line:93},endBody:{col:1,line:102}},"textarea-target":{startLoc:{col:67,line:112},endLoc:{col:1,line:121},startBody:{col:67,line:112},endBody:{col:1,line:121}}}}},title:"Watching-You",component:q,argTypes:{power:{control:{type:"range",min:20,max:300,step:10,default:123},description:"Maximum distance to move from the origin (px).",defaultValue:{summary:50}},movable:{control:{type:"boolean"},description:"Ability to move",defaultValue:{summary:!0}},rotatable:{control:{type:"boolean"},description:"Ability to rotate",defaultValue:{summary:!0}},active:{control:{type:"boolean"},description:"active",defaultValue:{summary:!0}}}},Mt=n=>T("div",{className:"container",children:T(q,{...n,children:T("span",{children:"1"})})}),Wt=Mt.bind({});Wt.args={power:50,movable:!0,rotatable:!0,active:!0};const Rt=n=>rt("div",{className:"container",children:[T("div",{className:"running-target",children:"target"}),T(q,{...n,targetType:"dom",target:".running-target",children:T("span",{children:"1"})})]}),wt=Rt.bind({});wt.args={power:50,movable:!0,rotatable:!0,active:!0};const Yt=n=>rt("div",{className:"container",children:[T(q,{...n,targetType:"input",target:".target",children:T("span",{children:"1"})}),T("input",{className:"target"})]}),Nt=Yt.bind({});Nt.args={power:50,movable:!0,rotatable:!0,active:!0};const Et=n=>rt("div",{className:"container",children:[T(q,{...n,targetType:"input",target:".target2",children:T("span",{children:"1"})}),T("textarea",{className:"target2"})]}),kt=Et.bind({});kt.args={power:50,movable:!0,rotatable:!0,active:!0};const Lt=["MouseTarget","DomTarget","InputTarget","TextareaTarget"];export{wt as DomTarget,Nt as InputTarget,Wt as MouseTarget,kt as TextareaTarget,Lt as __namedExportsOrder,Ct as default};
//# sourceMappingURL=WatchingYou.stories.24e289b2.js.map
