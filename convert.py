#!/usr/bin/env python
import sys
import base64
import requests
import json

file_path = sys.argv[2]
image_uri = "data:image/jpg;base64," + base64.b64encode(open(file_path, "rb").read())
r = requests.post("https://api.mathpix.com/v3/latex",
    data=json.dumps({'src': image_uri}),
    headers={"app_id": "himanshugarg_zoho_com", "app_key": sys.argv[1],
            "Content-type": "application/json"})

print '''
var mjAPI = require("mathjax-node");
mjAPI.start();

var yourMath = %s;

mjAPI.typeset({
  math: yourMath,
  format: "TeX", 
  svg:true,      
  svgNode:true
}, function (data) {
  if (!data.errors) {console.log(data.svg)}
});
''' % (json.dumps(json.loads(r.text)['latex'], indent=4, sort_keys=True),)