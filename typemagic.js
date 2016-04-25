HTMLElement.prototype.type = function(op){
	op = Object.extend({
		delay:85,
		dest:this,
		twinkle:'|'
	},op);
	var chain = makeChain(this),f=false,html='';
	console.log(chain);
	var dest = op.dest;
	dest.innerHTML='';
	var time = setInterval(function(){
		var str = chain.shift();
		while(str.length>1){
			html+=str;
			dest.innerHTML=html;
			str = chain.shift();
			if(!chain.length){ 
				clearInterval(time);
				return;
			}
		}
		html+=str;
		if(!chain.length){ 
			dest.innerHTML=html
			clearInterval(time);
			return;
		}
		dest.innerHTML=html+(f?op.twinkle:' ');
		f=!f;
	},op.delay);
	function makeChain(node){
		var nodes = node.childNodes;
		var chain = [];
		for(var i=0;i < nodes.length;i++){
			var ne = nodes[i];
			if(ne.nodeType==1){
				if(ne.tagName=='SCRIPT'){
					chain.push(ne.outerHTML);
					continue;
				}
				var str = ne.cloneNode().outerHTML;
				var last = str.lastIndexOf('<');
				chain.push(str.substring(0,last));
				chain = chain.concat(arguments.callee(ne));
				chain.push(str.substring(last));
			}else if(ne.nodeType==3){
				var arr = ne.textContent.match(/(\s+|[^\s.])/g);
				if(arr)	chain = chain.concat(arr);
			}
		}
		return chain;
	}
}

Object.extend = function(){
	if(!arguments || !arguments.length) return {};
	var rlt = arguments[0];
	for(var i=0;i<arguments.length;i++){
		var argu = arguments[i];
		for(var k in argu)
			rlt[k] = argu[k];
	}
	return rlt;
}