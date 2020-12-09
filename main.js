import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
//封装全局登录函数   navigate redirectTo  switchTab三种页面跳转
Vue.prototype.checkLogin = function(backpage, backtype){
	console.log("main.js页面1");
	var SUID  = uni.getStorageSync('SUID');
	var INTEGRAL = uni.getStorageSync('INTEGRAL');
	var SNAME = uni.getStorageSync('SNAME');
	var SFACE = uni.getStorageSync('SFACE');
	//if(SUID == '' || SRAND == '' || SFACE == ''){
	if(SUID == '' || SFACE == ''|| SFACE == ''||INTEGRAL==''){	
		//这里是为空跳转到login，然后传参，还没实现login页面的内容
		console.log("main.js页面2");
		uni.redirectTo({url:'../login/login?backpage='+backpage+'&backtype='+backtype});
		return false;
	}
	return [SUID, INTEGRAL, SNAME, SFACE];
}

const app = new Vue({
    ...App
})
app.$mount()


//mian.js的函数可以直接引用  不用import