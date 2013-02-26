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
			@-webkit-keyframes bounceUp { \
				20% {-webkit-transform: translateY(-40%);} \
				30% {-webkit-transform: translateY(5%);} \
				80% {-webkit-transform: translateY(-5%);} \
				90% {-webkit-transform: translateY(1%);} \
			} \
			#remix{overflow-y:auto;overflow-x:hidden;background:#000;} \
			#remix li{*display:inline;*zoom:1;} \
			.copycat{position:absolute;opacity:1;-webkit-transition:top 1s ease-out, opacity 1s;} \
			.remixWrap,.remixWrap body{overflow:hidden;} \
			.remixWrap .remix{bottom:0;opacity:1;-webkit-animation: bounceUp 0.3s linear 0.1s 1 alternate;} \
			.remix{position:fixed;z-index:65536;bottom:-100%;left:0;width:100%;height:100%;opacity:0;overflow:hidden;text-align:center;background:rgba(0,0,0,0.8);-webkit-transition:all 0.1s ease-in;} \
			.remix .rlist{padding:10px 0;} \
			.remix .ritem{display:inline-block;vertical-align:top;width:200px;height:200px;padding:10px;position:relative;overflow:hidden;} \
			.remix .ritem a{color:#fff;text-align:left;} \
			.remix .ritem span{position:absolute;background:rgba(0,0,0,0.7);padding:4px 6px;filter:alpha(opacity=0);opacity:0;-webkit-transition:opacity 0.1s;} \
			.remix .rphoto{width:200px;height:200px;background:#fff;box-shadow:0 0 0 2px #fff;-webkit-transition:box-shadow 0.3s;} \
			.remix .rprice{top:10px;left:10px;color:#fc0;} \
			.remix .rtitle{width:188px;left:10px;bottom:10px;} \
			.remix .roffered{top:20px;right:10px;white-space:nowrap;} \
			.remix .ritem a:hover span{filter:alpha(opacity=100);opacity:1;} \
			.remix .ritem a:hover .rphoto{box-shadow:0 0 0 10px rgba(256, 128, 0, .8);} \
			.remix .rclose{position:fixed;top:10px;z-index:3;right:5px;width:50px;height:50px;border-radius:50%;border:4px solid #fff;background:#000;cursor:pointer;display:none;} \
			.remix .rclose:after{content:'';position:absolute;top:8px;left:22px;width:6px;height:36px;background:#fff;-webkit-transform: rotate(45deg);} \
			.remix .rclose:before{content:'';position:absolute;top:8px;left:22px;width:6px;height:36px;background:#fff;-webkit-transform: rotate(-45deg);} \
			.remix .rclose:hover{-webkit-transform: rotate(-180deg);border-color:rgba(256, 128, 0, .8);} \
			.remix .ritem_focus{overflow:visible;z-index:2;position:absolute;top:0;left:0;} \
			.remix:hover .rclose{display:block;}";

		if (remixCss.styleSheet){
			remixCss.styleSheet.cssText = styles;
		}else{
			remixCss.appendChild(document.createTextNode(styles));
		}
	   
	  document.getElementsByTagName("head")[0].appendChild(remixCss);
	}
	
	clearNode("remix");
	clearNode("tempImgs");

	var imgs = document.getElementsByTagName("img"),
		data = [],
		htmlStr = '<ul class="rlist">',
		tis = document.createElement("div"),
		ch = document.documentElement.clientHeight,
		cw = document.documentElement.clientWidth,
		posx = cw/2 - 100,
		posy = ch + document.body.scrollTop;	
		tis.id = "tempImgs";

	for(var i=0, len=imgs.length; i<len; i++){
		var _ourl = imgs[i].getAttribute("src") || imgs[i].getAttribute("init_src") || imgs[i].getAttribute("back_src"),
			_item={};

		if(!_ourl || _ourl.length < 1) return;

		var _idPatt = /-([0-9a-zA-Z]{32})\.0/,
			_id = _idPatt.exec(_ourl);		

		if(_id){
			_item.id = _id[1];
			_item.photo = _ourl.replace(/(^\s+)|(\s+$)/g,"").replace(/\.0\.(\S*\.)?jpg\S*$/,".0.200x200.jpg");

			_item.org = imgs[i];
			_item.copycat = imgs[i].cloneNode(true);
			_item.copycat.className = "copycat";
			_item.copycat.style.top = getXY(imgs[i]).top + "px";
			_item.copycat.style.left = getXY(imgs[i]).left + "px";
			_item.link = "http://auction1.paipai.com/"+_item.id; //getImgLink(imgs[i]) ? getImgLink(imgs[i])

			tis.appendChild(_item.copycat);

			data.push(_item);
		}
	}
	
	if(data.length<1) return;
	
	document.body.appendChild(tis);

	for(var i=0, len=data.length; i<len; i++){
		htmlStr += '<li class="ritem" id="id-'+data[i].id+'"><a href="' + data[i].link + '" target="_blank"><img src="' + data[i].photo + '" class="rphoto" style="-webkit-animation:bounceUp 0.6s '+Math.random()+'s;" /></a></li>';
		data[i].copycat.style.cssText = "opacity:0;top:" + posy + "px;left:" + getXY(data[i].org).left + "px;-webkit-transition:top " + parseInt(Math.random()*5) + "s ease-out, opacity 1s;";
		data[i].org.style.cssText = "opacity:0;";
	}

	htmlStr += '</ul><i class="rclose" id="rclose"></i><ul id="rtemp"><ul>';
	
	
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

	var _rlist = document.querySelectorAll(".remix .ritem")
	for (var j=0,jlen=_rlist.length; j<jlen; j++){
		_rlist[j].iid = _rlist[j].getAttribute("id").substring(3);
		_rlist[j].onmouseover = function(){
			var _ijson = "http://auction1.paipai.com/" + this.iid + ".1";
			if(!this.isLoad) appendjs(_ijson);
			this.isLoad = 1;
		}
	}

	function removeMix(){
		document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className.replace(" remixWrap","");
		clearNode("remix");
		cleaImg()
	}	
	function cleaImg(){
		for(var i=0, len=data.length; i<len; i++){
			data[i].org.style.cssText = "opacity:1;";
		}
		clearNode("tempImgs");
	}
}

function clearNode(id){		
	if(document.getElementById(id)) document.body.removeChild(document.getElementById(id));
}

function getXY(elem){
    var top = 0, left = 0;
    do{   
        top += elem.offsetTop || 0;
        left += elem.offsetLeft || 0;
        elem = elem.offsetParent;
	} while (elem);
  return {left:left, top:top};
}

function commodityJsonInfoCallBack(){
	var _iname = document.createElement("span");
		_iname.className = "rtitle";
		_iname.innerHTML = commodityInfo.name;
	var _iprice = document.createElement("span");
		_iprice.className = "rprice";
		_iprice.innerHTML = commodityInfo.price;


	if(document.getElementById("id-" + commodityInfo.sItemid)){
		var _iiid = document.getElementById("id-" + commodityInfo.sItemid);
	}else{
		var _iiid = document.getElementById("id-" + commodityInfo.snapId);
	}
	var _imitem = _iiid.getElementsByTagName("a")[0];

	_imitem.appendChild(_iname);
	_imitem.appendChild(_iprice);
}

function appendjs(url){
	var script= document.createElement('script');
		script.type= 'text/javascript';
		script.src= url;
	document.getElementsByTagName('head')[0].appendChild(script);
}