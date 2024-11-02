import * as esJscore from 'https://esm.run/@es-js/core';
import * as esJseshtml from 'https://esm.run/@es-js/eshtml';
window.addEventListener("load", function(){
  let etiquetas = document.getElementsByTagName('script');
  for(var i = 0; i < etiquetas.length; i++){
    if(etiquetas[i].hasAttribute("type") && (etiquetas[i].getAttribute("type") == "text/esjs" || etiquetas[i].getAttribute("type") == "codigo/esjs")){
      try{
        let codigoCom = esJscore.compile(etiquetas[i].innerHTML);
        let elemento = document.createElement("script");
        elemento.innerHTML = codigoCom;
        if(etiquetas[i].hasAttribute("mode") && etiquetas[i].getAttribute("mode") == "modulo"){
          elemento.setAttribute("type", "module");
        }
        document.body.appendChild(elemento);
      }catch(error){
        console.error(error);
      }
      if(etiquetas[i].hasAttribute("src")){
        try{
          fetch(etiquetas[i].getAttribute("src")).then(res => res.text()).then(data => {
            let codigoCo2m = esJscore.compile(data);
            let element2o = document.createElement("script");
            element2o.innerHTML = codigoCo2m;
            if(etiquetas[i].hasAttribute("mode") && etiquetas[i].getAttribute("mode") == "modulo"){
              element2o.setAttribute("type", "module");
            }
            document.body.appendChild(element2o);
          }).catch(function(error){
            console.error(error);
          });
        }catch(error){
          console.error(error);
        }
      }
    }
  }
  let etiquetasH = document.getElementsByTagName("div");
  for(var u = 0; u < etiquetasH.length; u++){
    if(etiquetasH[u].hasAttribute("type") && (etiquetasH[u].getAttribute("type") == "text/eshtml" || etiquetasH[u].getAttribute("type") == "codigo/eshtml")){
      try{
        etiquetasH[u].innerHTML = esJseshtml.compile(etiquetasH[u].innerHTML);
      }catch(error){
        console.error(error);
      }
    }
  }
});