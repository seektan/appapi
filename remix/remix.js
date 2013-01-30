remix();
function remix(){

	/*if(!document.getElementById("remixCss")){
		var cssLink = document.createElement('link');
			cssLink.rel  = 'stylesheet';
			cssLink.type = 'text/css';
			cssLink.id = 'remixCss';
			cssLink.href = 'http://appapi.googlecode.com/svn/trunk/remix/remix.css?t='+(+new Date);
		document.getElementsByTagName('head')[0].appendChild(cssLink);
	}*/

if(!document.getElementById("remixCss")){
	var remixCss = document.createElement('style');
		remixCss.type = 'text/css';
		remixCss.id = 'remixStyle';

	var styles = "body,html{height:100%;} \
		#remix{overflow-y:auto;overflow-x:hidden;background:#000;} \
		#remix li{*display:inline;*zoom:1;} \
		.copycat{position:absolute;opacity:1;-webkit-transition:top 2s ease-out, opacity 1s;} \
		.remixWrap body{overflow:hidden;} \
		.remixWrap .remix{bottom:0;opacity:1;} \
		.remix{position:fixed;z-index:65536;bottom:-100%;left:0;width:100%;height:100%;opacity:0;overflow:hidden;text-align:center;background:rgba(0,0,0,0.8);-webkit-transition:all 2s ease-in;} \
		.remix .rlist{padding:10px 0;} \
		.remix .ritem{display:inline-block;vertical-align:top;width:200px;height:200px;padding:10px;position:relative;} \
		.remix .ritem a{color:#fff;text-align:left;} \
		.remix .ritem span{position:absolute;background:rgba(0,0,0,0.7);padding:4px 6px;filter:alpha(opacity=0);opacity:0;-webkit-transition:opacity 0.2s;} \
		.remix .rphoto{display:block;width:200px;height:200px;box-shadow:0 0 0 2px #fff;} \
		.remix .rtitle{width:188px;left:10px;bottom:20px;} \
		.remix .rprice{top:20px;left:10px;color:#fc0;} \
		.remix .roffered{top:20px;right:10px;white-space:nowrap;} \
		.remix .ritem a:hover span{filter:alpha(opacity=100);opacity:1;} \
		.remix .ritem a:hover .rphoto{box-shadow:0 0 0 2px #f60;}";

	if (remixCss.styleSheet){
		remixCss.styleSheet.cssText = styles;
	}else{
		remixCss.appendChild(document.createTextNode(styles));
	}
}

document.getElementsByTagName("head")[0].appendChild(css);


	var imgs = document.getElementsByTagName("img"),
		data = [],
		htmlStr = '<ul class="rlist">',
		ch = document.documentElement.clientHeight,
		cw = document.documentElement.clientWidth,
		posx = cw/2 - 100,
		posy = ch;

	for(var i=0, len=imgs.length; i<len; i++){
		var _ourl = imgs[i].getAttribute("src") || imgs[i].getAttribute("init_src"),
			_item={};

		if(!_ourl) return;

		var _idPatt = /-([0-9a-zA-Z]{32})\./,
			_id = _idPatt.exec(_ourl);		

		if(_id){
			_item.id = _id[1];
			_item.photo = _ourl;

			_item.org = imgs[i];
			_item.copycat = imgs[i].cloneNode(true);
			_item.copycat.className = "copycat";
			_item.copycat.style.top = imgs[i].offsetTop + "px";

			document.body.appendChild(_item.copycat);

			data.push(_item);
		}
	}

	for(var i=0, len=data.length; i<len; i++){
		htmlStr += '<li class="ritem"><a href="http://auction1.paipai.com/' + data[i].id + '" target="_blank"><img src="' + data[i].photo + '" class="rphoto" /></a></li>';
		data[i].copycat.style.cssText = "opacity:0;top:" + posy + "px;left:" + data[i].org.offsetLeft + "px;";
		data[i].org.style.cssText = "opacity:0;";
	}

	htmlStr += '</ul>';
	

	if(document.getElementById("remix")){
		document.getElementById("remix").innerHTML = htmlStr;
	}else{
		var _node = document.createElement("div");
		_node.className = "remix";
		_node.id = "remix";
		_node.innerHTML = htmlStr;
		document.body.appendChild(_node);
	}
	setTimeout(function(){document.getElementsByTagName('html')[0].className = "remixWrap";},1000);
	
}