<template>
	<web-view :src="url" @message="handleMessage"></web-view>
</template>
 
<script>
export default {
	data() {
		return {
			url: 'https://harrypotter.fandom.com/wiki/Main_Page' //要打开的外部链接
		};
	},
	onLoad:function (options) { //option为object类型，会序列化上个页面传递的参数
			// console.log(options.names); //打印出上个页面传递的参数。
			this.url = options.website+options.names;
			// console.log('hello'); //打印出上个页面传递的参数。
			// console.log(this.url); //打印出上个页面传递的参数。
	    },
	methods: {
		//通过 @message 事件接收外部链接传过来的内容
		handleMessage(event) {
			if (event.detail.data[0].isClose) {
				uni.reLaunch({
					url: '/main/main'
					// url: 'mulu'
				});
			}
		}
	}
};
</script>