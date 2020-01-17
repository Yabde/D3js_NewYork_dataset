import json
  
data = json.load(open("world-110m.json"))


open("world-110m.js", "w").write('raw_data = ' + str(data))