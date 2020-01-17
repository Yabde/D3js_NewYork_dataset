import csv
  
data = []

title = True
for line in csv.reader(open("mooc-countries.csv")):
    if title:
        title = False
        continue
    data.append([line[0], int(line[1]), float(line[2]), line[3]])

open("mooc-countries.js", "w").write('raw_data = ' + str(data))