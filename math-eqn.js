// a simple TeX-input example
var mjAPI = require("mathjax-node");
mjAPI.start();

var yourMath = '\sqrt{x^2+y^2}';

mjAPI.typeset({
  math: yourMath,
  format: "TeX", // or "inline-TeX", "MathML"
  svg:true,      // or svg:true, or html:true
  svgNode:true
}, function (data) {
  if (!data.errors) {console.log(data.svg)}
});