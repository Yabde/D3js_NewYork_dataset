// https://observablehq.com/@virtuacode/new-york-taxis-2014-2015@512
import define1 from "./7764a40fe6b83ca1@319.js";
import define2 from "./368459df18c17371@28.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# New York Taxis [2014/2015]`
)});
  main.variable(observer()).define(["vl","zones_topojson","hour","cube","cab_type","season","hourly_urls","schemes","width"], function(vl,zones_topojson,hour,cube,cab_type,season,hourly_urls,schemes,width)
{
  const topo_data = vl.topojson(zones_topojson).feature("nyc_taxi_zones");  
  const hour_field = "hour_" + hour;
  const index = (cube << 2) | (cab_type << 1) | season;
  const hourly_data = vl.data(vl.dsv(hourly_urls[index]).delimiter(";")).key("zone").fields(hour_field)
    
  const heatmap = vl.markGeoshape({fill: 'black', stroke: 'white', strokeWidth: 1})
  .data(topo_data)
  .transform(
    vl.lookup("properties.location_id").from(hourly_data),
  )
  .encode(
    vl.color().scale(schemes[cab_type]).fieldQ(hour_field).title("∅ " + (cube > 0 ? "Pickups" : "Dropoffs")),
    vl.tooltip([
       vl.tooltip().fieldN("properties.zone").title("Zone"),
       vl.tooltip().fieldQ(hour_field).title("Hourly Dropoff Avg")
    ])
  )
  .width(width)
  .height(700)
  
  
  return heatmap
  .title("Durchschnittliche Taxifahrten (" + (cab_type > 0 ? "Yellow Cabs" : "Green Cabs") + ", " + hour + " Uhr, " + (season > 0 ? "Winterzeit" : "Sommerzeit") + ")")
  .config({title: {fontSize: 20}})
  .autosize({type: 'fit-x', contains: 'padding'})
  .render();
}
);
  main.variable(observer("viewof hour")).define("viewof hour", ["slider"], function(slider){return(
slider("Stunde:", 0, 0, 23, 1)
)});
  main.variable(observer("hour")).define("hour", ["Generators", "viewof hour"], (G, _) => G.input(_));
  main.variable(observer("viewof cube")).define("viewof cube", ["menu"], function(menu){return(
menu("Dropoff / Pickup",[[0, "Dropoff"],[1, "Pickup"]])
)});
  main.variable(observer("cube")).define("cube", ["Generators", "viewof cube"], (G, _) => G.input(_));
  main.variable(observer("viewof season")).define("viewof season", ["menu"], function(menu){return(
menu("Jahreszeit:", [
  [0, "Sommerzeit"],
  [1,"Winterzeit"]
])
)});
  main.variable(observer("season")).define("season", ["Generators", "viewof season"], (G, _) => G.input(_));
  main.variable(observer("viewof cab_type")).define("viewof cab_type", ["menu"], function(menu){return(
menu("Taxifarbe:", [[0,"Grün"], [1,"Yellow"] ])
)});
  main.variable(observer("cab_type")).define("cab_type", ["Generators", "viewof cab_type"], (G, _) => G.input(_));
  main.variable(observer()).define(["html"], function(html){return(
html`<hr>`
)});
  main.variable(observer()).define(["vl","zones_topojson","cash_card_urls","cube_cards","width"], function(vl,zones_topojson,cash_card_urls,cube_cards,width)
{
  const topo_data = vl.topojson(zones_topojson).feature("nyc_taxi_zones"); 
  const cash_card_data = vl.data(vl.dsv(cash_card_urls[cube_cards]).delimiter(";")).key("zone").fields("value")
    
  const heatmap = vl.markGeoshape({fill: 'black', stroke: 'white', strokeWidth: 1})
  .data(topo_data)
  .transform(
    vl.lookup("properties.location_id").from(cash_card_data),
    vl.calculate("1 - +datum.value").as("cash_value")
  )
  .encode(
    vl.color().scale({domain: [0, 1], range: {scheme: "redblue"}, reverse: true}).fieldQ("value").title("Card Percentage"),
    vl.tooltip([
       vl.tooltip().fieldN("properties.zone").title("Zone"),
       vl.tooltip().fieldQ("value").title("Card %"),
       vl.tooltip().fieldQ("cash_value").title("Cash %")
    ])
  )
  .width(width)
  .height(700)
  
  
  return heatmap
  .title("Anteil der Kartenzahlung pro Zone (" + (cube_cards > 0 ? "Pickups" : "Dropoffs") + ")")
  .config({title: {fontSize: 20}})
  .autosize({type: 'fit-x', contains: 'padding'})
  .render();
}
);
  main.variable(observer("viewof cube_cards")).define("viewof cube_cards", ["menu"], function(menu){return(
menu("Dropoff / Pickup", [[0, "Dropoff"], [1, "Pickup"]])
)});
  main.variable(observer("cube_cards")).define("cube_cards", ["Generators", "viewof cube_cards"], (G, _) => G.input(_));
  main.variable(observer()).define(["html"], function(html){return(
html`<hr>`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<style>.my-divider {margin-top: 2rem;} <style>`
)});
  main.variable(observer("schemes")).define("schemes", function(){return(
[
  {range: ["#eaeaea", "#a0d89b", "#46ab5e", "#0e7735"], interpolation: "hcl-long"},
  {range: ["#eaeaea", "#ffeaa8", "#ffd038", "#aa8800"], interpolation: "hcl-long"}
]
)});
  const child1 = runtime.module(define1);
  main.import("vl", child1);
  main.variable(observer("topo_data")).define("topo_data", ["vl","zones_topojson"], function(vl,zones_topojson){return(
vl.topojson(zones_topojson).feature("nyc_taxi_zones")
)});
  main.variable(observer("hourly_urls")).define("hourly_urls", function(){return(
[
  "https://gist.githubusercontent.com/virtuaCode/eeec8342e4fbdb42cecb3692134c2acc/raw/8da1b4550e640e93837d0334eb069e03077dfe91/hourly_green_summer.csv",
  "https://gist.githubusercontent.com/virtuaCode/eeec8342e4fbdb42cecb3692134c2acc/raw/f9aebca593169200d25cca090cd0236bf0aea94d/hourly_green_winter.csv",
  "https://gist.githubusercontent.com/virtuaCode/eeec8342e4fbdb42cecb3692134c2acc/raw/f9aebca593169200d25cca090cd0236bf0aea94d/hourly_yellow_summer.csv",
  "https://gist.githubusercontent.com/virtuaCode/eeec8342e4fbdb42cecb3692134c2acc/raw/f9aebca593169200d25cca090cd0236bf0aea94d/hourly_yellow_winter.csv",
  "https://gist.githubusercontent.com/virtuaCode/21edad8267d20b45fa4cc2085ff43e32/raw/6284c8fd436e8395dcb4aa738eb035fbae50a057/hourly_pickup_green_summer.csv",
  "https://gist.githubusercontent.com/virtuaCode/21edad8267d20b45fa4cc2085ff43e32/raw/6284c8fd436e8395dcb4aa738eb035fbae50a057/hourly_pickup_green_winter.csv",
  "https://gist.githubusercontent.com/virtuaCode/21edad8267d20b45fa4cc2085ff43e32/raw/6284c8fd436e8395dcb4aa738eb035fbae50a057/hourly_pickup_yellow_summer.csv",
  "https://gist.githubusercontent.com/virtuaCode/21edad8267d20b45fa4cc2085ff43e32/raw/6284c8fd436e8395dcb4aa738eb035fbae50a057/hourly_pickup_yellow_winter.csv"
]
)});
  main.variable(observer("cash_card_urls")).define("cash_card_urls", function(){return(
[
  "https://gist.githubusercontent.com/virtuaCode/154c49d0cdcef9755e4a1d82c4679e7d/raw/fb2218f6736ce96930f360689b01162bad6c38a5/cash_card_dropoff_heatmap.csv",
  "https://gist.githubusercontent.com/virtuaCode/154c49d0cdcef9755e4a1d82c4679e7d/raw/fb2218f6736ce96930f360689b01162bad6c38a5/cash_card_pickup_heatmap.csv"
]
)});
  main.variable(observer("zones_topojson")).define("zones_topojson", function(){return(
"https://gist.githubusercontent.com/virtuaCode/0398f3d44c04188c184d87ec8cb885fb/raw/8b58e42a377f69d57321f554d87b7171f6e45859/nyc_taxi_zones.json"
)});
  const child2 = runtime.module(define2);
  main.import("slider", child2);
  main.import("menu", child2);
  main.import("checkbox", child2);
  return main;
}
