/**
 * 针对多个函数共享onload事件的解决方案
 */
function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != "function"){
		window.onload = func;
	}
	else{
		window.onload = function(){
			oldonload();
			func();
		};
	}
}

/**
 * 利用insertBefore()定义的insertAfter()方法
 */
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	}
	else{
		parent.insertBefore(newElement,targetElement.nextSibling); // nextSibling 下一个兄弟元素
	}
}

/**
 * 追加类名
 */
function addClass(element,value){
	if (element.className) {
		element.className += " ";
		element.className += value;
	}
	else {
		element.className = value;
	}
}

/**
 * 突出显示当前页面导航链接
 */
function highlightPage(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;

	var header = document.getElementsByTagName("header"); // 可以直接get nav再get a，单位了兼容性检测，写全点
	if (header.length < 1) return false;
	var nav = document.getElementsByTagName("nav");
	if (nav.length < 1) return false;
	var links = nav[0].getElementsByTagName("a");

	for (var i = 0; i < links.length; i++) {;
		var linkurl = links[i].getAttribute("href");
		if (window.location.href.indexOf(linkurl) != -1) {  // window.location.href获取当前url，indexOf字符串比较
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}
	}
}
addLoadEvent(highlightPage);

/**
 * 移动元素
 */
function moveMessage(elementID,final_x,final_y,interval){
	if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
		elem.style.left = "0px";  // 这项检测可解决css中设置了样式，但style方法无法获取，导致程序运行结果错误的问题
	}	
	if (!elem.style.top) {
		elem.style.top = "0px";
	}
	var xpos = parseInt(elem.style.left); // parseInt可提取字符串数字 
	var ypos = parseInt(elem.style.top);
	var dist = 0; // 相对终点距离设置步进
	if (xpos == final_x && ypos == final_y) {
		return true;
	}
	else if (xpos > final_x) {
		dist = Math.ceil((xpos - final_x)/10); 
		xpos -= dist;
	}
	else if (xpos < final_x) {
		dist = Math.ceil((final_x - xpos)/10);
		xpos += dist;
	}
	else if (ypos > final_y) {
		dist = Math.ceil((ypos - final_y)/10);
		ypos -= dist;
	}
	else if (ypos < final_y) {
		dist = Math.ceil((final_y - ypos)/10);
		ypos += dist;
	}
	elem.style.left = xpos + "px"; // 把改变后的值写回，px不能省略，style.left返回的值必须带px
	elem.style.top = ypos + "px";
	var repeat = "moveMessage('" + elementID + "'," + final_x + "," +final_y + "," + interval + ")";
	elem.movement = setTimeout(repeat,interval);
}

function prepareSlideShow(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("intro")) return false;

	var intro = document.getElementById("intro");

    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");

	var preview = document.createElement("img");
	preview.setAttribute("id","preview");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");

	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);

	var links = document.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onmouseover = function(){
			var url = this.getAttribute("href"); // 注意使用this
			if (url.indexOf("index.html") != -1) {
				moveMessage("preview",0,0,5);
			}
			if (url.indexOf("about.html") != -1) {
				moveMessage("preview",-150,0,5);
			}
			if (url.indexOf("photos.html") != -1) {
				moveMessage("preview",-300,0,5);
			}
			if (url.indexOf("live.html") != -1) {
				moveMessage("preview",-450,0,5);
			}
			if (url.indexOf("contact.html") != -1) {
				moveMessage("preview",-600,0,5);
			}
		}		
	}
}
addLoadEvent(prepareSlideShow);

function showSection(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;

	var article = document.getElementsByTagName("article");
	if (article.length < 1) return false;

	var nav = article[0].getElementsByTagName("nav");
	if (nav.length < 1) return false;

	var links = nav[0].getElementsByTagName("a");
	var def = new Array();
	for (var i = 0; i < links.length; i++) {
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if (!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId; // 存到自定义属性里管用，存到数组里报错
		links[i].onclick = function(){
			var section = document.getElementsByTagName("section");
			for (var j = 0; j < section.length; j++) {
				if (section[j].getAttribute("id") == this.destination) {
					section[j].style.display = "block";
				}
				else{
					section[j].style.display = "none";
				}
			}
			return false;
		}
	}
}
addLoadEvent(showSection);

/**
 * 创建一个img元素和一个p元素
 */
function preparePlaceholder(){
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;
	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;

	var placeholder = document.createElement("img");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("alt","my image gallery");

	var description =document.createElement("p");
	description.setAttribute("id","description");

	var desctext = document.createTextNode("Choose an image");

	description.appendChild(desctext);

	var gallery = document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}
addLoadEvent(preparePlaceholder);

/**
 * 当所有图片被点击都会触发show()函数，同样也实现了不在HTML中出现onclick
 */
function prepareGallary(){
	if (!document.getElementById) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById("imagegallery")) return false;
	// 不要把把多行测试写在同一行上

	var getId = document.getElementById("imagegallery");
	var getTag = getId.getElementsByTagName("a");

	for (var i = 0; i < getTag.length; i++) {
		getTag[i].onclick = function(){
			return !show(this);
		};
		// getTag[i].onkeypress = getTag[i].onclick; // 在现在浏览器，用tab 回车 也触发onclick
	}
}

function show(whichpic){
	if (!document.getElementById("placeholder")) return false;
	if (placeholder.nodeName != "IMG") return false;

	var location = whichpic.getAttribute("href");
	var showPic = document.getElementById("placeholder");

	showPic.setAttribute("src",location);

	if (document.getElementById("description")) {
		var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : ""; // 其实不加这个判断也没问题，text = null，但是为了严谨起见，还是加上的好
		var showText = document.getElementById("description");
		if (showText.firstChild.nodeType == 3) {
			showText.firstChild.nodeValue = text;
		}
	}
	return true; // 返回正确的处理结果
}
addLoadEvent(prepareGallary);

/**
 * 隔行显示不同样式
 */
function stripeTables(){
	if (!document.getElementsByTagName) return false;
	var table = document.getElementsByTagName("table");
	for (var i = 0; i < table.length; i++) {
		var odd = true;
		var tr = table[i].getElementsByTagName("tr");
		for (var m = 0; m < tr.length; m++) {
			if (tr[m+1]) {
				if(tr[m].parentNode.nodeName == tr[m+1].parentNode.nodeName){
					if (odd == true) {
						odd = false;
						// tr[m].style.backgroundColor = "#ffc";
						addClass(tr[m],"odd");
					}
					else {
						odd = true;
					}
				}
				else{
					// tr[m].style.backgroundColor = "#ffc";
					addClass(tr[m],"odd");
				}
			}
			else{
				if (odd == true) {
					// tr[m].style.backgroundColor = "#ffc";
					addClass(tr[m],"odd");
				}
				else{
					break;
				}
			}
		}
	}
}
addLoadEvent(stripeTables);

/**
 * 高亮特定行
 */
function highlightRows(){
	if (!document.getElementsByTagName) return false;
	var tr = document.getElementsByTagName("tr");
	for (var i = 0; i < tr.length; i++) {
		tr[i].oldClassName = tr[i].className;
		tr[i].onmouseover = function(){
			addClass(this,"highlight"); // onmouseon和onmouseover一定得小写
		}
		tr[i].onmouseout = function(){
			this.className = this.oldClassName;
		}
	}
}
addLoadEvent(highlightRows);

/**
 * 添加缩略语备注
 */
function displayAbbreviations() {
	// 兼容性检测
	if (!document.getElementById) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;

	// 取得所有缩略词
	var abbreviations = document.getElementsByTagName("abbr");
	if (abbreviations.length < 1) return false;
	var defs = new Array();

	// 将缩略词存入数组，key是短的，title是长的
	for (var i = 0; i < abbreviations.length; i++) {
		var definition = abbreviations[i].getAttribute("title");
		if (abbreviations[i].childNodes.length < 1) continue; // 兼容ie6不识别abbr的问题 
		var key = abbreviations[i].lastChild.nodeValue;
		defs[key] = definition;
	}

	// 创建列表节点
	var dlist = document.createElement("dl");

	// 用for in 遍历数组，提取值创建dl、dd
	for(key in defs) {
		var definition = defs[key];
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(key);
		dtitle.appendChild(dtitle_text);

		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);

		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if (dlist.childNodes.length < 1) return false; // 兼容ie6不识别abbr的问题

	// 为整个列表创建一个解释性标题
	var header = document.createElement("h2");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);

    // 将标题、列表插入DOM
	var article = document.getElementsByTagName("article");
	if (article.length < 1) return false;
	article[0].appendChild(header);
	article[0].appendChild(dlist);
}
addLoadEvent(displayAbbreviations);

function focusLabels(){
	var label = document.getElementsByTagName("label");
	for (var i = 0; i < label.length; i++) {
		if(!label[i].getAttribute("for")) continue;
		label[i].onclick = function(){
			var text = this.getAttribute("for");
			if (!document.getElementById(text)) return false; // 千万别用成了continue
			var element = document.getElementById(text);
			element.focus();
		}
	}
}
addLoadEvent(focusLabels);

function resetFields(whichform){
	if (!Modernizr.input.placeholder) {
		for (var i = 0; i < whichform.elements.length; i++) {
			var element = whichform.elements[i];
			if(element.type == "submit") continue;
			if(!element.placeholder) continue; // 没有placeholder 就pass
			element.onblur = function(){
				if (this.value == '') {
					this.className = "placeholder";
					this.value = this.placeholder;
				}
			}
			element.onblur();
			element.onfocus = function(){
				if (this.value == this.placeholder) {
					this.className = '';
					this.value = '';
				}
			}
		}
	}
}

function isFilled(elem){
	if (elem.value.replace(' ','').length == 0) return false;
	return (elem.value != elem.placeholder);
}
function isEmail(elem){
	return (elem.value.indexOf("@") != -1 && elem.value.indexOf(".") != -1);
}

function validateForm(whichform){
	for (var i = 0; i < whichform.elements.length; i++) {
		var element = whichform.elements[i];
		if (element.getAttribute("required")) {
			if (!isFilled(element)) {
				alert("Please fill in the " + element.name + " field");
				return false;
			}
		}
		if (element.type == "email") {
			if (!isEmail(element)) {
				alert("The " + element.name + "field must be a valid email address.");
				return false;
			}
		}
	}
	return true;
}

function displayAjaxLoading(element){
	while(element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content = document.createElement("img");
	content.setAttribute("src","images/loading.gif");
	content.setAttribute("alt","Loading...");
	element.appendChild(content);
}

function submitFormWithAjax(whichform,thetarget){
	var request = new XMLHttpRequest();
	if (!request) return false;
	displayAjaxLoading(thetarget);

	var dataParts = [];
	for (var i = 1; i < whichform.elements.length - 1; i++) {
		var element = whichform.elements[i];
		dataParts[i] = element.name + " = " + encodeURIComponent(element.value);
	}
	var data = dataParts.join("&");
	request.open("POST",whichform.getAttribute("action"),true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.onreadystatechange = function(){
		if (request.readyState == 4) {
			if (request.status == 200 || request.status == 0) {
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length > 0) {
					thetarget.innerHTML = matches[1];
				}
				else{
					thetarget.innerHTML = "<p>Oops, there was an error. Sorry.</p>";
				}
			}
			else{
				thetarget.innerHTML = "<p>" + request.statusText + "</p>";
			}
		}
	}
	request.send(data);
	return true;
}

function prepareForms(){
	for (var i = 0; i < document.forms.length; i++) {
		var thisform = document.forms[i];
		resetFields(thisform);
		for (var j = 0; j < thisform.elements.length; j++) {
			var element = thisform.elements[j];
			if (element.type == "submit") {
				element.onclick = function(){
					if (!validateForm(thisform)) return false;
					var article = document.getElementsByTagName("article");
					if (submitFormWithAjax(thisform,article[0])) return false;
					return true;
				}
			}
		}
	}
}
addLoadEvent(prepareForms);

