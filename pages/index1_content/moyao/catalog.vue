<template>
	<view class="container">	
		<view class="title">{{title}} </view>
		<rich-text :nodes="data"></rich-text>
		<view class="art-content">
			<rich-text class="richText" :nodes="strings"></rich-text>
		</view>
		<!-- <p>使用双花括号语法：{{ strings }}</p> -->
		 <p>{{ strings }}</p>
		<!-- <p>使用 v-html 指令：<span v-html="strings"></span></p> -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				data: '',
				title: '',
				strings: ''
			}
		},
		methods:{
			getData(){
				uni.request({
					// url: 'http://www.baidu.com',
					url: 'https://harrypotter.fandom.com/zh/wiki/'+this.title,
					// url: 'https://unidemo.dcloud.net.cn/api/news/36kr/'+ '5310903',
					success:res=>{
						// console.log("res:"+res);
						// console.log("res.data:"+res.data);
						
						// this.data = res.data;
						// this.strings = res.data.slice(0,21);
						this.strings = res.data;
						let r = this.strings.match(/^title$/)
						console.log(r)
						// let s = {
						// 	data: '1'
						// }
						// console.log(s.data)
						// let k = JSON.stringify(s)
						// console.log(JSON.parse(k).data)
						// var k = document.getElementsByClassName(".wds_icon")[0]
						// console.log(k)
						
						// console.log(this.strings);
						// let s = "<p>" + this.strings  + "</p>"
						// console.log(s)
						// this.strings = s
						
					}
				})
			}
		},
		onLoad(options) {
			console.log(options.title)
			this.title = options.title
			this.getData()
		}
	}
</script>

<style>
	
</style>
