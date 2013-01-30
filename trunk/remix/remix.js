remix();
function remix(){

	var cssLink = document.createElement('link');
		cssLink.rel  = 'stylesheet';
		cssLink.type = 'text/css';
		cssLink.href = 'http://appapi.googlecode.com/svn/trunk/remix/remix.css?t='+(+new Date);
	document.getElementsByTagName('head')[0].appendChild(cssLink);

	var imgs = document.getElementsByTagName("img"),
		data = [],
		htmlStr = '<ul class="rlist">',
		ch = document.documentElement.clientHeight,
		cw = document.documentElement.clientWidth,
		posx = cw/2 - 100,
		posy = ch;
      
  console.log(new Date())

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
      console.log(new Date() + "---" + _item.id)
		}
	}

	for(var i=0, len=data.length; i<len; i++){
		htmlStr += '<li class="ritem"><a href="http://auction1.paipai.com/' + data[i].id + '" target="_blank"><img src="' + data[i].photo + '" class="rphoto" /></a></li>';
		data[i].copycat.style.cssText = "opacity:0;top:" + posy + "px;left:" + data[i].org.offsetLeft + "px;-webkit-transition:top " + parseInt(Math.random()*10) + "s ease-out, opacity 1s;";
		data[i].org.style.cssText = "opacity:0;";
    console.log(new Date() + "---" + data[i].id)
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