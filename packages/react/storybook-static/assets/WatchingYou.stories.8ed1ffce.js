var gt=Object.defineProperty;var pt=(n,t,r)=>t in n?gt(n,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[t]=r;var w=(n,t,r)=>(pt(n,typeof t!="symbol"?t+"":t,r),r),ot=(n,t,r)=>{if(!t.has(n))throw TypeError("Cannot "+r)};var e=(n,t,r)=>(ot(n,t,"read from private field"),r?r.call(n):t.get(n)),a=(n,t,r)=>{if(t.has(n))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(n):t.set(n,r)},o=(n,t,r,s)=>(ot(n,t,"write to private field"),s?s.call(n,r):t.set(n,r),r),P=(n,t,r,s)=>({set _(i){o(n,t,i,r)},get _(){return e(n,t,s)}});import{R as nt,r as x,j as T,a as rt}from"./jsx-runtime.19d7a78b.js";import"./iframe.45ac1ea9.js";const dt=/px\) rotate\(|translate\(|deg\)|px,/;function mt(n){const t=getComputedStyle(n).transform;if(t==="none")return{x:0,y:0};if(t.includes("translate")){const s=t.split(dt);return{x:Number(s[1]),y:Number(s[2])}}const r=t.slice(0,-1).split(", ").slice(-2).map(Number);return{x:r[0],y:r[1]}}function at(n,t){if(t==="error")throw Error(n)}function f(n){return Math.round(n*10)/10}function ft(n){return!n||n.targetType==="mouse"||!n.targetType&&!n.target}function yt(n){return n?n.targetType==="dom"||!n.targetType&&!!n.target:!1}function bt(n){return n?n.targetType==="input":!1}function H(n){return n instanceof HTMLElement}const it=50,Tt="mouse",ct={translate:{x:0,y:0},rotate:0};var C,R,A,N,b,h,v,X,L,j,B,V,g,D,I,M,W,p,k,$,O,U,J,G,z,K,F,Q,Z;const y=class{constructor(t,r={}){a(this,p);a(this,N,null);a(this,b,null);a(this,h,null);a(this,v,null);a(this,X,null);a(this,L,null);a(this,j,null);a(this,B,!0);a(this,V,!0);a(this,g,Tt);a(this,D,it);a(this,I,it);a(this,M,null);a(this,W,null);a(this,O,()=>{if(e(this,b)===null)return;const t=e(this,b).getBoundingClientRect(),r=mt(e(this,b)),s=f(t.left-r.x+t.width/2),i=f(t.top-r.y+t.height/2);o(this,v,{x:s,y:i})});a(this,U,()=>{if(!e(this,h))return;const t=e(this,h).getBoundingClientRect(),r=f(t.left+t.width/2),s=f(t.top+t.height/2);o(this,p,{x:r,y:s},$)});a(this,J,()=>{if(!e(this,h))return;e(this,M)||e(this,G).call(this);const t=e(this,M),r=e(this,h);if(t.innerText!==r.value&&(t.innerText=r.value),r.value===""){o(this,p,null,$);return}const{font:s,letterSpacing:i,width:d,lineHeight:u,paddingLeft:m}=getComputedStyle(e(this,h)),l=Number(m.slice(0,-2)),Y=e(this,h).tagName,c=Y==="INPUT",st=Y==="TEXTAREA",E=e(this,h).getBoundingClientRect(),_=t.getBoundingClientRect();if(c){t.setAttribute("style",`
          position: absolute;
          opacity: 0;
          top: 0;
          left: -100%;
          pointer-events: none;
          display: inline-block;
          line-height: ${u};
          font: ${s};
          max-width: ${d};
          letter-spacing: ${i};
          `);const tt=f(E.left+_.width+l),et=f(E.top+_.height/2);o(this,p,{x:tt,y:et},$)}if(st){t.setAttribute("style",`
          position: absolute;
          opacity: 0;
          top: 0;
          left: -100%;
          pointer-events: none;
          display: inline-block;
          word-break: keep-all;
          line-height: ${u};
          font: ${s};
          letter-spacing: ${i};
        `);const tt=Number(d.slice(0,-2)),et=_.width%tt,ut=f(E.left+et+l),ht=f(E.top+E.height/2);o(this,p,{x:ut,y:ht},$)}});a(this,G,()=>{var t;!e(this,h)||(o(this,M,document.createElement("div")),(t=document.querySelector("body"))==null||t.append(e(this,M)))});a(this,z,()=>{if(!e(this,b))return!1;const t=e(this,b).getBoundingClientRect(),r=e(this,I)*2,s=e(this,D)*2;return!(t.top-r>(window.innerHeight||document.documentElement.clientHeight)||t.bottom+r<0||t.left-s>(window.innerWidth||document.documentElement.clientWidth)||t.right+s<0)});a(this,K,()=>{const t={translate:{x:0,y:0},rotate:0};if(!e(this,v)||!e(this,p,k)||!e(this,V)&&!e(this,B))return t;const r=e(this,p,k).x-e(this,v).x,s=e(this,p,k).y-e(this,v).y,i=r>=0?1:-1,d=s>=0?1:-1;if(e(this,V)){const u=Math.abs(r),m=Math.abs(s),l=Math.atan2(m,u),Y=Math.min(u,Math.cos(l)*e(this,D))*i,c=Math.min(m,Math.sin(l)*e(this,I))*d;t.translate.x=f(Y),t.translate.y=f(c)}if(e(this,B)){const u=Math.atan2(s,r)*180/Math.PI;t.rotate=f(u+90)}return t});a(this,F,t=>{!e(this,b)||(e(this,b).style.transform=`translate(${t.translate.x}px,${t.translate.y}px) rotate(${t.rotate}deg)`)});a(this,Q,()=>{var t,r,s,i,d,u,m,l;return((t=e(this,L))==null?void 0:t.x)!==((r=e(this,v))==null?void 0:r.x)||((s=e(this,L))==null?void 0:s.y)!==((i=e(this,v))==null?void 0:i.y)||((d=e(this,j))==null?void 0:d.x)!==((u=e(this,p,k))==null?void 0:u.x)||((m=e(this,j))==null?void 0:m.y)!==((l=e(this,p,k))==null?void 0:l.y)});a(this,Z,()=>{const t=e(this,K).call(this);e(this,N)?e(this,N).call(this,t):e(this,F).call(this,t),o(this,L,e(this,v)),o(this,j,e(this,p,k))});w(this,"setWatcher",t=>{t!==void 0&&(H(t)?o(this,b,t):typeof t=="string"?o(this,b,document.querySelector(t)):at(`Unexpected watcher: ${JSON.stringify(t)}`,"warn"))});w(this,"setRotatable",(t=!0)=>{o(this,B,!!t)});w(this,"setMovable",(t=!0)=>{o(this,V,!!t)});w(this,"setTarget",t=>{if(e(this,g)==="mouse"&&e(this,W)!==null&&P(y,R)._--,ft(t))o(this,g,"mouse"),o(this,h,null);else if(yt(t)){const{target:r}=t;o(this,g,"dom"),o(this,h,H(r)?r:document.querySelector(r))}else if(bt(t)){const{target:r}=t;o(this,g,"input"),o(this,h,H(r)?r:document.querySelector(r))}else at(`Unexpected target: ${JSON.stringify(t)}`,"warn");e(this,g)==="mouse"&&e(this,W)!==null&&P(y,R)._++});w(this,"setCustomRender",t=>{t!==void 0&&o(this,N,t)});w(this,"setPower",t=>{if(t!==void 0){if(typeof t=="number"){o(this,D,t),o(this,I,t);return}(t==null?void 0:t.x)!==void 0&&o(this,D,t.x),(t==null?void 0:t.y)!==void 0&&o(this,I,t.y)}});w(this,"start",()=>{if(e(this,W)!==null)return;e(this,g)==="mouse"&&(e(y,R)===0&&window.addEventListener("mousemove",e(y,A)),P(y,R)._++);const t=()=>{e(this,z).call(this)&&(e(this,O).call(this),e(this,g)==="dom"&&e(this,U).call(this),e(this,g)==="input"&&e(this,J).call(this),e(this,Q).call(this)&&e(this,Z).call(this)),o(this,W,requestAnimationFrame(t))};t()});w(this,"stop",()=>{e(this,W)!==null&&(e(this,g)==="mouse"&&P(y,R)._--,e(y,R)===0&&window.removeEventListener("mousemove",e(y,A)),cancelAnimationFrame(e(this,W)||0),o(this,W,null),e(this,b)&&(e(this,N)?e(this,N).call(this,ct):e(this,F).call(this,ct)),e(this,M)&&(e(this,M).remove(),o(this,M,null)))});const s=typeof t=="object"&&!H(t),i=s?t:r,d=s?void 0:t,{power:u,rotatable:m,movable:l,render:Y,...c}=i;this.setCustomRender(Y),this.setWatcher(d),this.setTarget(c),this.setPower(u),this.setRotatable(m),this.setMovable(l)}};let S=y;C=new WeakMap,R=new WeakMap,A=new WeakMap,N=new WeakMap,b=new WeakMap,h=new WeakMap,v=new WeakMap,X=new WeakMap,L=new WeakMap,j=new WeakMap,B=new WeakMap,V=new WeakMap,g=new WeakMap,D=new WeakMap,I=new WeakMap,M=new WeakMap,W=new WeakMap,p=new WeakSet,k=function(){return e(this,g)==="mouse"?e(y,C):e(this,X)},$=function(t){e(this,g)==="mouse"&&o(y,C,t),o(this,X,t)},O=new WeakMap,U=new WeakMap,J=new WeakMap,G=new WeakMap,z=new WeakMap,K=new WeakMap,F=new WeakMap,Q=new WeakMap,Z=new WeakMap,a(S,C,null),a(S,R,0),a(S,A,t=>{o(y,C,{x:f(t.clientX),y:f(t.clientY)})});function lt(...n){return Object.assign({},...n)}const xt=(n={})=>{const{target:t,targetType:r,power:s,rotatable:i,movable:d,active:u=!0}=n,m=x.exports.useRef(null),[l,Y]=x.exports.useState({translate:{x:0,y:0},rotate:0}),c=x.exports.useRef(new S({...n,render:E=>{Y(E)}}));return x.exports.useEffect(()=>{c.current.setTarget({target:t,targetType:r})},[t,r]),x.exports.useEffect(()=>{c.current.setPower(s)},[s]),x.exports.useEffect(()=>{c.current.setRotatable(i)},[i]),x.exports.useEffect(()=>{c.current.setMovable(d)},[d]),x.exports.useEffect(()=>{c.current.setWatcher(m.current||void 0)},[c]),x.exports.useEffect(()=>{if(u)return c.current.start(),c.current.stop;c.current.stop()},[u]),x.exports.useEffect(()=>(c.current.start(),c.current.stop),[]),[x.exports.useMemo(()=>({ref:m,style:{transform:`translate(${l.translate.x}px,${l.translate.y}px) rotate(${l.rotate}deg)`}}),[l.translate.x,l.translate.y,l.rotate]),c.current]},vt=n=>{var i;const{children:t,...r}=n,[s]=xt(r);return nt.isValidElement(t)?nt.cloneElement(t,lt(t.props,{ref:s.ref,style:lt((i=t==null?void 0:t.props)==null?void 0:i.style,s.style)})):null},q=nt.memo(vt);const Ct={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from '@storybook/react';
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
      description: 'power',
      defaultValue: {
        summary: 50,
      },
    },
    movable: {
      control: {
        type: 'boolean',
      },
      description: 'movable',
      defaultValue: {
        summary: true,
      },
    },
    rotatable: {
      control: {
        type: 'boolean',
      },
      description: 'rotatable',
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
`,locationsMap:{"mouse-target":{startLoc:{col:64,line:56},endLoc:{col:1,line:64},startBody:{col:64,line:56},endBody:{col:1,line:64}},"dom-target":{startLoc:{col:62,line:74},endLoc:{col:1,line:83},startBody:{col:62,line:74},endBody:{col:1,line:83}},"input-target":{startLoc:{col:64,line:93},endLoc:{col:1,line:102},startBody:{col:64,line:93},endBody:{col:1,line:102}},"textarea-target":{startLoc:{col:67,line:112},endLoc:{col:1,line:121},startBody:{col:67,line:112},endBody:{col:1,line:121}}}}},title:"Watching-You",component:q,argTypes:{power:{control:{type:"range",min:20,max:300,step:10,default:123},description:"power",defaultValue:{summary:50}},movable:{control:{type:"boolean"},description:"movable",defaultValue:{summary:!0}},rotatable:{control:{type:"boolean"},description:"rotatable",defaultValue:{summary:!0}},active:{control:{type:"boolean"},description:"active",defaultValue:{summary:!0}}}},Mt=n=>T("div",{className:"container",children:T(q,{...n,children:T("span",{children:"1"})})}),Wt=Mt.bind({});Wt.args={power:50,movable:!0,rotatable:!0,active:!0};const wt=n=>rt("div",{className:"container",children:[T("div",{className:"running-target",children:"target"}),T(q,{...n,targetType:"dom",target:".running-target",children:T("span",{children:"1"})})]}),Rt=wt.bind({});Rt.args={power:50,movable:!0,rotatable:!0,active:!0};const Yt=n=>rt("div",{className:"container",children:[T(q,{...n,targetType:"input",target:".target",children:T("span",{children:"1"})}),T("input",{className:"target"})]}),Nt=Yt.bind({});Nt.args={power:50,movable:!0,rotatable:!0,active:!0};const Et=n=>rt("div",{className:"container",children:[T(q,{...n,targetType:"input",target:".target2",children:T("span",{children:"1"})}),T("textarea",{className:"target2"})]}),kt=Et.bind({});kt.args={power:50,movable:!0,rotatable:!0,active:!0};const Lt=["MouseTarget","DomTarget","InputTarget","TextareaTarget"];export{Rt as DomTarget,Nt as InputTarget,Wt as MouseTarget,kt as TextareaTarget,Lt as __namedExportsOrder,Ct as default};
//# sourceMappingURL=WatchingYou.stories.8ed1ffce.js.map
