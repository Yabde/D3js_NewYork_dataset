// https://observablehq.com/@jheer/dom-utilities@28
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# DOM Utilities

Utilities for labeled, well-aligned interactive widgets.`
)});
  main.variable(observer("checkbox")).define("checkbox", ["label"], function(label){return(
function(title, checked) {
  const cb = document.createElement('input');
  cb.setAttribute('type', 'checkbox');
  cb.checked = !!checked;
  
  const span = label(title, cb);  
  
  const update = () => { span.update(cb.checked); }
  cb.addEventListener('input', update);
  update();
  
  return span;
}
)});
  main.variable(observer("menu")).define("menu", ["label"], function(label){return(
function(title, items) {
  const select = document.createElement('select');
  items.forEach(_ => {
    const opt = document.createElement('option');
    if (!Array.isArray(_)) _ = [_, _+''];
    opt.value = _[0];
    opt.innerText = _[1];
    if (_[2]) opt.setAttribute('selected', true);
    select.appendChild(opt);
  });
    
  const span = label(title, select);
  
  const update = () => span.update(select.value);
  select.addEventListener('input', update);
  update();
  
  return span;
}
)});
  main.variable(observer("slider")).define("slider", ["label"], function(label){return(
function(title, value, min, max, step) {
  const slider = document.createElement('input');
  slider.setAttribute('type', 'range');
  slider.setAttribute('min', min);
  slider.setAttribute('max', max);
  slider.setAttribute('step', step);
  slider.value = value;

  const valueLabel = document.createElement('label');
  valueLabel.style['margin-left'] = '0.5em';
  
  const span = label(title, slider, valueLabel);
  
  const update = () => { valueLabel.innerText = span.update(+slider.value); };
  slider.addEventListener('input', update);
  update();
  
  return span;
}
)});
  main.variable(observer("label")).define("label", function(){return(
function(title, ...nodes) {
  const label = document.createElement('label');
  label.style.display = 'inline-block';
  label.style.width = '150px';
  label.innerText = title;
  
  const span = document.createElement('span');
  span.appendChild(label);
  nodes.forEach(_ => span.appendChild(_));
  
  // support listeners for value changes
  const listeners = [];
  span.addValueListener = (l => listeners.push(l));
  span.update = (value => {
    span.value = value;
    listeners.forEach(l => l(value));
    return value;
  });
  
  return span;
}
)});
  return main;
}
