(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(39)},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),u=(t(7),t(5)),i=t(2),l=t(3),s=t.n(l),m="/api/persons",f=function(){return s.a.get(m).then(function(e){return e.data})},d=function(e){return s.a.post(m,e).then(function(e){return e.data})},h=function(e,n){return s.a.put("".concat(m,"/").concat(e),n).then(function(e){return e.data})},v=function(e){return s.a.delete("".concat(m,"/").concat(e)).then(function(e){return e.data})},b=function(e){var n=e.errorMessage,t=e.successMessage;return null===n&&null===t?null:n?r.a.createElement("div",{className:"error"},n):r.a.createElement("div",{className:"success"},t)},p=function(e){var n=e.persons,t=e.removePerson;return n.map(function(e){return r.a.createElement("li",{key:e.id},r.a.createElement("p",null,e.name," : ",e.number,r.a.createElement("button",{className:"poista",onClick:function(){return t(e)}},"poista")))})},E=function(e){var n=e.handleNameChange,t=e.handleNumberChange,a=e.addPerson,o=e.name,c=e.number;return r.a.createElement("form",{onSubmit:a},r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{value:o,onChange:n})),r.a.createElement("div",{className:"lisaa"},"numero: ",r.a.createElement("input",{value:c,onChange:t})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},g=function(){var e=Object(a.useState)(null),n=Object(i.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(null),l=Object(i.a)(c,2),s=l[0],m=l[1],g=Object(a.useState)([]),j=Object(i.a)(g,2),w=j[0],O=j[1],k=Object(a.useState)(""),C=Object(i.a)(k,2),N=C[0],S=C[1],y=Object(a.useState)(""),P=Object(i.a)(y,2),L=P[0],M=P[1],T=Object(a.useState)(""),B=Object(i.a)(T,2),J=B[0],W=B[1];Object(a.useEffect)(function(){f().then(function(e){O(e)})},[]);var x=0===J.length?w:w.filter(function(e){return e.name.toLowerCase().includes(J.toLowerCase())});return r.a.createElement("div",null,r.a.createElement("h1",null,"Puhelinluettelo"),r.a.createElement(b,{errorMessage:t,successMessage:s}),r.a.createElement("h3",null,"Rajaa n\xe4ytett\xe4vi\xe4"),r.a.createElement("input",{value:J,onChange:function(e){return W(e.target.value)}}),r.a.createElement("h3",null,"Lis\xe4\xe4 uusi"),r.a.createElement(E,{handleNameChange:function(e){return S(e.target.value)},handleNumberChange:function(e){return M(e.target.value)},addPerson:function(e){e.preventDefault();var n=x.find(function(e){return e.name===N});if(n){var t=n.id;window.confirm(N+" on jo luettelossa, korvataanko vanha numero uudella?")&&h(t,{id:t,name:N,number:L}).then(function(e){m("".concat(N," n p\xe4ivitys onnistui!"));var n=Object(u.a)(w);n.splice(t-1,1,e),O([]),O(n),S(""),M("")}).catch(function(e){o("".concat(N," ...virhe? ").concat(e)),setTimeout(function(){o(null)},5e3)})}else{var a={name:N,number:L};d(a).then(function(e){a.id=e,m("Lis\xe4ttiin ".concat(N));var n=Object(u.a)(w.concat(a));O(n),S(""),M("")}).catch(function(e){console.log(e.response.data.error),o("".concat(e.response.data.error)),setTimeout(function(){o(null)},5e3)})}},name:N,number:L}),r.a.createElement("h3",null,"Numerot"),r.a.createElement(p,{persons:x,removePerson:function(e){window.confirm("Poistetaanko "+e.name+" jonka id on "+e.id+" ?")&&v(e.id).then(function(n){m("".concat(e.name," poistettiin onnistuneesti.")),O(w.filter(function(n){return n.id!==e.id}))}).catch(function(e){o("".concat(N," ...virhe? ").concat(e)),setTimeout(function(){o(null)},5e3)})}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},7:function(e,n,t){}},[[14,1,2]]]);
//# sourceMappingURL=main.81b1cce3.chunk.js.map