import"./assets/modulepreload-polyfill-3cfb730f.js";import{i}from"./assets/vendor-77e16229.js";const o=document.querySelector("form");o.addEventListener("submit",t=>{t.preventDefault();const s=t.target.delay.value,r=t.target.state.value;new Promise((e,a)=>{r==="fulfilled"?e(s):a(s)},s).then(e=>{i.success({title:"",message:` Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{i.error({title:"",message:` Rejected promise in ${e}ms`,position:"topRight"})}),o.reset()});
//# sourceMappingURL=commonHelpers2.js.map
