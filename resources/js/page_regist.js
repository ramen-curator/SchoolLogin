
$(document).ready(function(){
	

	


	/*下面是调用方法*/


	jQuery.validator.addMethod("birthR", function(value, element) {   
		var tempArray = value.split(/[年月日]/);
		var mYear = tempArray[0];
		var mMonth = tempArray[1];  
		var mDate = tempArray[2]; 
		var now = new Date();
		var nYear = now.getFullYear();
		var nMonth = now.getMonth();
		var nDate = now.getDate();
		var c=false;
		//小于当前时间？
		
		if(mYear<nYear&&mYear>1800){c=true;}
		else if(mYear==nYear){
			if(mMonth<nMonth)c=true;
			else if(mMonth==nMonth){
				if(mDate<nDate)c=true;
			}
		}
		//日数正确？
		var MonthDays=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
		var RightDay = 0;  
     	if(mMonth == 2)   
      	RightDay = (((mYear%4 == 0) && (mYear%100 != 0) || (mYear%400 == 0))? 29: 28);  
     	else   
		RightDay = MonthDays[mMonth-1];     /*-- 判断日 --*/   
		
     	if(mDate <= 0 || mDate > RightDay)   
     	{   
      		c=false;  
		 }
		 //月数正确？
		 if(mMonth <= 0 || mMonth > 12)   
     	{   
     	 	c=false;   
		 }
		return this.optional(element) || c&&/^[0-9]{4}年[0-9]?[0-9]月[0-9]?[0-9]日$/.test(value);
	}, "xxxx年xx月xx日");
	

	jQuery.validator.addMethod("yzR",function(value,element){
		var c=/^[0-9]{6}$/;
		return this.optional(element) || c.test(value)
	});
	jQuery.validator.addMethod("sfzR",function(value,element){
		var c=/^[0-9]{18}$/;
		var d=/^[0-9]{17}X$/;
		return this.optional(element) || (c.test(value)||d.test(value))
	});
	//获取表单验证对象[填写验证规则]
	var validate = $("#signupForm").validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 4,
				maxlength: 16
			},
			passwordAgain: {
				required: true,
				minlength: 4,
				maxlength: 16,
				equalTo: "#password"
			},
			yhm: {
				required: true
			},
			sfz: {
				required: true,
				sfzR:true
			},
			yz: {
				required: true,
				yzR:true
			},
			birth:{
				required: true,
				birthR:true
			}
		},
		messages: {
			email: {
				required: $.i18n.prop("请输入邮箱地址"),
				email: $.i18n.prop("邮箱地址格式错误")
			},
			password: {
				required: $.i18n.prop("请输入密码"),
				minlength: jQuery.format($.i18n.prop("密码长度不够4位")),
				maxlength: jQuery.format($.i18n.prop("密码长度超过16位"))
			},
			passwordAgain: {
				required: $.i18n.prop("请输入确认密码"),
				minlength: jQuery.format($.i18n.prop("密码长度不够4位")),
				maxlength: jQuery.format($.i18n.prop("密码长度超过16位")),
				equalTo: jQuery.format($.i18n.prop("与上面的密码不同"))
			},
			yhm: {
				required: $.i18n.prop("请输入用户名")
			},
			sfz: {
				required: $.i18n.prop("请输入身份证号码"),
				sfzR: $.i18n.prop("身份证格式错误")
			},
			yz: {
				required: $.i18n.prop("请输入邮政编码"),
				yzR: $.i18n.prop("邮政编码格式错误")
			},
			birth:{
				required:$.i18n.prop("请输入出生日期"),
				//digits: $.i18n.prop("出生日期格式错误")
			}
		}
	});
	


	
	//ajax提交注册信息
	$("#submit").bind("click", function(){
		regist(validate);
	});

	
});

function regist(validate){	
	//校验Email, password，校验如果失败的话不提交
	if(validate.form()){

			alert("注册成功,进入小组介绍");
			window.location.href="index.html"

	}
}

