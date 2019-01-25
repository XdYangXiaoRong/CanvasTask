//在Canvas中编辑文本
/**
	每个TextLine对象都含有如下信息：一个字符串，该字符串在canvas中的位置，
	以及用户当前项字符串中插入文本的位置。
*/
TextLine = function(x,y){
	this.text = '';
	this.left = x;
	this.bottom = y;
	this.caret = 0;//插入文本的位置
}

TextLine.prototype = {
	insert:function(text){//插入文本
		this.text = this.text.substr(0,this.caret) +text+this.text.substr(this.caret);
		this.caret+=text.length;
	},
	removeCharacterBeforeCaret:function(){
		if(this.caret===0){
			return;
		}
		this.text=this.text.substring(0,this.caret-1)+this.text.substring(this.caret);
		this.caret--;
	},
	getWidth:function(context){//获取当前文本的高度
		return context.measureText(this.text).width;
	},
	getHeight:function(context){
		var h=context.measureText('W').width;
		return h+h/6;
	},
	draw:function(context){//绘制字符串
		context.save();
		context.textAlign = 'start';
		context.textBaseline='bottom';

		context.strokeText(this.text,this.left,this.bottom);
		context.fillText(this.text,this.left,this.bottom);

		context.restore();
	},
	erase:function(context,imageData){//擦除文本
		context.putImageData(imageData,0,0);
	}
};