remix();
function remix(){

	if(!document.getElementById("remixStyle")){
		var remixCss = document.createElement('style');
			remixCss.type = 'text/css';
			remixCss.id = 'remixStyle';

		var styles = "body,html{height:100%;} \
			.remix::-webkit-scrollbar{width:12px;height:12px} \
			.remix::-webkit-scrollbar-button:vertical{display:none} \
			.remix::-webkit-scrollbar-track:vertical{background-color:black} \
			.remix::-webkit-scrollbar-track-piece{background:#FFF} \
			.remix::-webkit-scrollbar-thumb:vertical{background-color:#8E8E8E;border-radius:5px} \
			.remix::-webkit-scrollbar-thumb:vertical:hover{background-color:#3B3B3B} \
			.remix::-webkit-scrollbar-corner:vertical{background-color:#535353} \
			.remix::-webkit-scrollbar-resizer:vertical{background-color:#FF6E00} \
			@-webkit-keyframes tumbleIn { \
				from {-webkit-transform-origin: 0% 100%;-webkit-transform: rotateX(180deg);} \
				to{-webkit-transform-origin: 0% 100%;} \
			} \
			#remix{overflow-y:auto;overflow-x:hidden;background:#000;} \
			#remix li{*display:inline;*zoom:1;} \
			.copycat{position:absolute;opacity:1;-webkit-transition:top 1s ease-out, opacity 1s;} \
			.remixWrap body{overflow:hidden;} \
			.remixWrap .remix{bottom:0;opacity:1;-webkit-animation: tumbleIn 1s linear 0s 1 forwards;} \
			.remix{position:fixed;z-index:65536;bottom:-100%;left:0;width:100%;height:100%;opacity:0;overflow:hidden;text-align:center;background:rgba(0,0,0,0.8);-webkit-transition:all 0.1s ease-in;} \
			.remix .rlist{padding:10px 0;} \
			.remix .ritem{display:inline-block;vertical-align:top;width:200px;height:200px;padding:10px;position:relative;} \
			.remix .ritem img{position:absolute;top:10px;left:10px;} \
			@-webkit-keyframes fly{ \
			20%{top:-4px;} \
			40%{top:0px;} \
			60%{top:-8px;} \
			80%{top:2px;} \
			} \
			.remix .ritem a{color:#fff;text-align:left;} \
			.remix .ritem span{position:absolute;background:rgba(0,0,0,0.7);padding:4px 6px;filter:alpha(opacity=0);opacity:0;-webkit-transition:opacity 0.1s;} \
			.remix .rphoto{display:block;width:200px;height:200px;box-shadow:0 0 0 2px #fff;} \
			.remix .rtitle{width:188px;left:10px;bottom:20px;} \
			.remix .rprice{top:20px;left:10px;color:#fc0;} \
			.remix .roffered{top:20px;right:10px;white-space:nowrap;} \
			.remix .ritem a:hover span{filter:alpha(opacity=100);opacity:1;} \
			.remix .ritem a:hover .rphoto{box-shadow:0 0 0 2px #f60;} \
			.remix .rclose{position:fixed;top:10px;right:5px;width:50px;height:50px;border-radius:50%;border:4px solid #fff;background:#000;cursor:pointer;display:none;} \
			.remix .rclose:after{content:'';position:absolute;top:8px;left:22px;width:6px;height:36px;background:#fff;-webkit-transform: rotate(45deg);} \
			.remix .rclose:before{content:'';position:absolute;top:8px;left:22px;width:6px;height:36px;background:#fff;-webkit-transform: rotate(-45deg);} \
			.remix:hover .rclose{display:block;}";

		if (remixCss.styleSheet){
			remixCss.styleSheet.cssText = styles;
		}else{
			remixCss.appendChild(document.createTextNode(styles));
		}
	   
	  document.getElementsByTagName("head")[0].appendChild(remixCss);
	}


	var imgs = document.getElementsByTagName("img"),
		data = [],
		htmlStr = '<ul class="rlist">',
		ch = document.documentElement.clientHeight,
		cw = document.documentElement.clientWidth,
		posx = cw/2 - 100,
		posy = ch + document.body.scrollTop;

	for(var i=0, len=imgs.length; i<len; i++){
		var _ourl = imgs[i].getAttribute("src") || imgs[i].getAttribute("init_src") || imgs[i].getAttribute("back_src"),
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
			_item.copycat.style.top = getOffsetPosition(imgs[i]).top + "px";
			_item.copycat.style.left = getOffsetPosition(imgs[i]).left + "px";

			document.body.appendChild(_item.copycat);

			data.push(_item);
		}
	}
	
	if(data.length<1) return;

	for(var i=0, len=data.length; i<len; i++){
		htmlStr += '<li class="ritem"><a href="http://auction1.paipai.com/' + data[i].id + '" target="_blank"><img src="' + data[i].photo + '" class="rphoto" style="-webkit-animation:fly 1.5s '+Math.random()+'s;" /></a></li>';
		data[i].copycat.style.cssText = "opacity:0;top:" + posy + "px;left:" + getOffsetPosition(data[i].org).left + "px;-webkit-transition:top " + parseInt(Math.random()*5) + "s ease-out, opacity 1s;";
		data[i].org.style.cssText = "opacity:0;";
	}

	htmlStr += '</ul><i class="rclose" id="rclose"></i>';
	
	
	if(document.getElementById("remix")){
		document.getElementById("remix").innerHTML = htmlStr;
	}else{
		var _node = document.createElement("div");
		_node.className = "remix";
		_node.id = "remix";
		_node.innerHTML = htmlStr;
		document.body.appendChild(_node);
	}
	setTimeout(function(){document.getElementsByTagName('html')[0].className += " remixWrap";},1000);

	var _close = document.getElementById("rclose");

	_close.onclick = removeMix;
	
	function removeMix(){
		document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className.replace(" remixWrap","");
		document.body.removeChild(_node);
		cleaImg()
	}	
	function cleaImg(){
		for(var i=0, len=data.length; i<len; i++){
			data[i].org.style.cssText = "opacity:1;";
			document.body.removeChild(data[i].copycat);
		}
	}
	
}

function getOffsetPosition(elem){     
    var top = 0, left = 0;
    do{   
        top += elem.offsetTop || 0;
        left += elem.offsetLeft || 0;
        elem = elem.offsetParent;
	} while (elem);
  return {left:left, top:top};
}