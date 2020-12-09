<template>
	<view>
		<view class="wrap" :style="wrapTop">
			<button class="login_btn" @click="acquireInfo">微信登录</button>
			<button class="login_btn" @click="tourist">游客访问</button>
		</view>
	</view>
</template>
<script>
//这一版没加条件编译，全是应用在app上的
	import ifRigister from "../../common/ifRigister.js"
	export default {
		data() {
			return {
				options:{},
				wrapTop:"",
				screenHeight:150
			}
		},
		//app 端微信登录
		onLoad: function(options) {
			let that=this;
			uni.getSystemInfo({
			    success: function (res) {
			        console.log(res.screenHeight);
					that.screenHeight=res.screenHeight;
					that.wrapTop="margin-top:"+that.screenHeight/3.5+"rpx;width:"+res.screenWidth+"px;";
			        console.log(res.windowBottom);
			    }
			});
			this.options=options;
		},

		methods: {
			tourist:function(){
				uni.removeStorage({
				    key: 'state',
				    success: function (res) {
						console.log(res);
				       uni.switchTab({
				       	url: "../index1/index1"
				       	});
				    },
					fail:function(res){
						console.log(res);
						uni.switchTab({
							url: "../index1/index1"
							});
					}
				});
			},
			acquireInfo:function(){
				let options=this.options; //任务结束后要跳转道德页面
				let that = this;
				//that.Login(options);
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						//console.log(res.provider);
						if (~res.provider.indexOf('weixin')) {
							/*uni.showModal({
								title: '微信授权登录',
								content: '是否同意获取您的微信信息？',
								success: function(res) {
									if (res.confirm) {
										that.Login(options);
									} else {
										uni.switchTab({
											url: '../write/write'
										})
									}
								}
							})*/
							that.Login(options);
						}
					}
				})
			},
			 Login:function(options) {
				 uni.showLoading({
				 	title:'正在登录中'
				 })
				uni.login({ //获取unionid和openid
					provider: 'weixin',
					success: (res) => {
						/*uni.showLoading({
							title:'登录中'
						})*/
						//console.log(res);
						uni.getUserInfo({ //获取用户名、头像、性别、年龄等等
							provider: 'weixin', //感觉不加这个也是微信端  这个是指的只在uniapp上调用微信第三方接口，而非发布在微信端
							success: (info) => {
								//console.log(info);
								ifRigister.ifrig(info.userInfo,options); //更改框架，直接在调用函数里搞动作，不用再返回值
							},
							fail: () => {
								uni.showToast({
									title: "微信登录授权失败"
								});
							}
						})
					},
					fail: () => {
						uni.showToast({
							title: "微信登录授权失败"
						});
					}
				})
			}

		}
	}
</script>

<style>
	page{
		background-color: rgba(200,200,200,0.8);
	}
	.wrap{
		padding: 50rpx;
	}
.login_btn:first-child{
	border:1px solid rgb(5,100,255);
	/*box-shadow: 0 0 10rpx #10141B;*/
	background-color: rgba(255,255,255,0);
	color: rgba(5,100,255,0.5);
	font-size: 50upx;
	font-family: 'Courier New', Courier, monospace;
	height: 130rpx;
	margin-top: 70rpx;
	border-radius: 100upx;  /*不知道这个单位什么意思*/
	padding: 10rpx;
}
.login_btn:last-child{
	border:1px solid rgb(250,250,15);
	color: rgba(250,250,15,0.5);
	font-size: 50upx;
	background-color: rgba(255,255,255,0);
	font-family: 'Courier New', Courier, monospace;
	height: 130rpx;
	margin-top: 70rpx;
	border-radius: 100upx;  /*不知道这个单位什么意思*/
	padding: 10rpx;
}
</style>
