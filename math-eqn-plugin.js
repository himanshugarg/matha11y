function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      let base64 = reader.result.replace(/text\/xml/, 'image/jpg'); 
      console.log(base64);
      callback(base64);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

toDataURL('file:///c:/users/admin/desktop/math-eqn/math-eqn.png', function(dataUrl) {
  xhr = new XMLHttpRequest();
  xhr.onload = function() {
    console.log(xhr.response);
  }
  xhr.open("POST", "https://api.mathpix.com/v3/latex");
  xhr.setRequestHeader('app_id', 'himanshugarg_zoho_com');
  xhr.setRequestHeader('app_key', '<app_key>');
  xhr.setRequestHeader('Content-type', 'application/json');
  console.log(dataUrl);
  xhr.send("{src: 'himanshu'}");
});
