$(document).ready(function(){
	
	//获取JS传递的语言参数
	var utils = new Utils();
	var args = utils.getScriptArgs();	
	
	//加载国际化语言包资源
	utils.loadProperties(args.lang);
	
	//输入框激活焦点、移除焦点
	jQuery.focusblur = function(focusid) {
		var focusblurid = $(focusid);
		var defval = focusblurid.val();
		focusblurid.focus(function(){
			var thisval = $(this).val();
			if(thisval==defval){
				$(this).val("");
			}
		});
		focusblurid.blur(function(){
			var thisval = $(this).val();
			if(thisval==""){
				$(this).val(defval);
			}
		});
	 
	};
	/*下面是调用方法*/
	$.focusblur("#email");

	//获取表单验证对象[填写验证规则]
	var validate = $("#signinForm").validate({
		rules: {
			password: {
				required: true,
				minlength: 4,
				maxlength: 16
			},
			yhm: {
				required: true
			},
		},
		messages: {
			password: {
				required: $.i18n.prop("请输入密码"),
				minlength: jQuery.format($.i18n.prop("密码长度不够4位")),
				maxlength: jQuery.format($.i18n.prop("密码长度超过16位"))
			},
			yhm: {
				required: $.i18n.prop("请输入用户名")
			},
		}
	});

	
	//输入框激活焦点、溢出焦点的渐变特效
	if($("#password").val()){
		$("#password").prev().fadeOut();
	};
	$("#password").focus(function(){
		$(this).prev().fadeOut();
	});
	$("#password").blur(function(){
		if(!$("#password").val()){
			$(this).prev().fadeIn();
		};		
	});
	if($("#yhm").val()){
		$("#yhm").prev().fadeOut();
	};
	$("#yhm").focus(function(){
		$(this).prev().fadeOut();
	});
	$("#yhm").blur(function(){
		if(!$("#yhm").val()){
			$(this).prev().fadeIn();
		};		
	});


	//ajax提交注册信息
	$("#submit").bind("click", function(){
        regist(validate);
  
	});
	
	$("body").each(function(){
		$(this).keydown(function(){
			if(event.keyCode == 13){
				regist(validate);
				
			}
		});
	});
	
});

function regist(validate){	
    //校验Email, password，校验如果失败的话不提交
    
	if(validate.form()){
        var user = document.getElementById("yhm").value;
        var pw =document.getElementById("password").value;
        if(user=="admin"&&pw=="123456"){
            alert("登录成功");
            window.location.href="xiaozu.html";
        }else{
            alert("密码错误");
        }
            
    }
}

var Utils = function(){};

Utils.prototype.loadProperties = function(lang){
	jQuery.i18n.properties({// 加载资浏览器语言对应的资源文件
		name:'ApplicationResources',
		language: lang,
		path:'resources/i18n/',
		mode:'map',
		callback: function() {// 加载成功后设置显示内容
		} 
	});	
};

Utils.prototype.getScriptArgs = function(){//获取多个参数
    var scripts=document.getElementsByTagName("script"),
    //因为当前dom加载时后面的script标签还未加载，所以最后一个就是当前的script
    script=scripts[scripts.length-1],
    src=script.src,
    reg=/(?:\?|&)(.*?)=(.*?)(?=&|$)/g,
    temp,res={};
    while((temp=reg.exec(src))!=null) res[temp[1]]=decodeURIComponent(temp[2]);
    return res;
};
