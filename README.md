# Animate scroll JavaScript module

This module allows you to scroll the web page automatically to the specified element at a given speed.

## Installation

Include script:
``` html
    <script src="js/animateScroll.min.js"></script>
```
## Usage

On the element in html document, set the attribute `data-scroll`:
``` html    
    data-scroll=”id [interval [period]]”
```    
Required `id`, the other parameters are optional. The parameters are separated by a space.  
 + `id` Item ID, which must be installed at the top of your browser window.
 + `interval` A single page shift. Interval default 50 px.
 + `period` Period in milliseconds. Period default 20 ms.
 
The target element must be specified ID.
### Examples:
``` html
<p data-scroll="a1 50 20">Down at the id = "a1", interval = 50px, period = 20ms</p>
<p data-scroll="c3 200">Up at the id = "c3", interval = 200px, period = periodDef</p>
<div data-scroll="f6">Down at the id = "f6", interval = intervalDer, period = periodDef</div>
```
Target elements may be any.
``` html
<div id="c3"><span>id = "c3"</span></div>
<h1 id="a1">id = "a1"</h1>
```
### Get / Set default value
```js
/*Get value*/
var intervalDef = animateScroll.option.interval;
var periodDef = animateScroll.option.period;
/*Set value*/
animateScroll.option = {interval: 100, period: 40};
```
### Animate scroll events
The module installs on the document a `click` event handler:
```js 
document.addEventListener('click', animateScroll);
``` 
