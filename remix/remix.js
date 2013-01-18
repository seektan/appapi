remix();
window.onresize = remix;
function remix(){

	var cssLink = document.createElement('link');
		cssLink.rel  = 'stylesheet';
		cssLink.type = 'text/css';
		cssLink.href = 'http://appapi.googlecode.com/svn/trunk/remix/remix.css?t='+(+new Date);
	document.getElementsByTagName('head')[0].appendChild(cssLink);

	var matches = document.querySelectorAll(".item-show"),
		data = [],
		htmlStr = '<ul class="rlist">';

	for(var i=0, len=matches.length; i<len; i++){
		var _item={};
		
		_item.link = matches[i].querySelectorAll("h3 a")[2] || matches[i].querySelectorAll("h3 a")[0];		
		_item.title = _item.link.innerHTML;
		_item.url = _item.link.getAttribute("href");
		_item.photo = matches[i].querySelector(".photo img").getAttribute("src") || matches[i].querySelector(".photo img").getAttribute("init_src");
		_item.price = matches[i].querySelector(".pp_price").innerHTML;
		_item.offered = matches[i].querySelector(".attribute .total").innerHTML;

		data.push(_item);
	}

	for(var i=0, len=data.length; i<len; i++){
		htmlStr += '<li class="ritem"><a href="' + data[i].url + '" target="_blank"><img src="' + data[i].photo + '" alt="' + data[i].title + '" class="rphoto" /><span class="rtitle">' + data[i].title + '</span><span class="rprice">' + data[i].price + '</span><span class="roffered">' + data[i].offered + '</span></a></li>';
	}

	htmlStr += '</ul><i class="rprev"></i><i class="rnext"></i>';
	
	if(document.querySelector(".remix")){
		document.querySelector(".remix").innerHTML = htmlStr;
	}else{
		var _node = document.createElement("div");
		_node.className = "remix";
		_node.innerHTML = htmlStr;
		document.body.appendChild(_node);
	}


	var _rlist = document.querySelector(".remix .rlist"),
		_height = _rlist.offsetHeight,
		_viewH = document.documentElement.clientHeight,
		_step = parseInt(_height/_viewH) - 1,
		_cur = 0,
		_prev = _node.querySelector(".rprev"),
		_next = _node.querySelector(".rnext");



	function _page(f){
		if(f){
			_cur += 1;
			if(_cur > _step){
				_cur = 0;
			}
		}else{
			_cur -= 1;	
			if(_cur < 0){
				_cur = _step;
			}
		}
		_rlist.style.top = "-" + (_viewH * _cur) + "px";
	}


	if(_step > 0){
		_prev.onclick = function(){ _page(0);}
		_next.onclick = function(){ _page(1);}
	}
}