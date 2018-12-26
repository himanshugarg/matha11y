function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      let base64 = reader.result.replace(/text\/xml/, 'image/jpg'); 
      callback(base64);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}
function main() {  
  let images = document.body.getElementsByTagName("img");
  for (let i = images.length-1; i >= 0; i--) {  
    let image = images[i];
    toDataURL(image.src, function(base64) {
      xhr = new XMLHttpRequest();
      xhr.onload = function() {
        let json = JSON.parse(xhr.response);        
        if (json.latex_confidence_rate > 0.90) {                    
          let text = document.createTextNode('\\(' + json.latex + '\\)');
          image.parentNode.replaceChild(text, image);          
        } else {
          alert(xhr.response);
        }
      };
      xhr.open("POST", "https://api.mathpix.com/v3/latex");
      xhr.setRequestHeader('app_id', 'himanshugarg_zoho_com');
      xhr.setRequestHeader('app_key', '<api_key_here>');
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(`{"src": "${base64}"}`);      
    });
  }
  loadMathJax();  
}

const loadMathJax = () => {
  var script = document.createElement("script");
    script.type = "text/javascript";
    script.src  = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/latest.js?config=TeX-MML-AM_CHTML";
    document.getElementsByTagName("head")[0].appendChild(script);
    alert("MathJax loaded");
  };

main();