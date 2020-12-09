<template>
	<view class="content">
		<image class="books" :style='{ height: logoHeigth + "px", width: logoWidth + "px" }'  src="../../../static/moyao/book5.jpg" @click="toCatelog()"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '魔药百科全书',
				logoWidth: 0,
				logoHeigth: 0
			}
		},
		onLoad() {
			let that=this;
			uni.getSystemInfo({
			    success: function (res) {
					that.logoHeigth=res.screenHeight
					that.logoWidth = res.screenHeight 
			    }
			});

		},
		methods: {
			toCatelog(){
				uni.navigateTo({
					url: 'mulu'
				})
		}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
 	.books {
		height: 1200rpx;
		width: 760rpx;
	}
</style>
