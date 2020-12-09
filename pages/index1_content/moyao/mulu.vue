<template>
	<view>
		<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item,index) in 4" :key="index">
				<image :src="'../../../static/moyao/logo'+index+ '.jpg'" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 375upx)">
				<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="TabSelect"
				 :data-id="index">
					索引-{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 375upx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
			 
			 <!-- 1 -->
				<view class="padding-top padding-lr" v-for="(item,index) in list" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-black">
						<view class="action">
							<text class="cuIcon-title text-green"></text> 索引-{{item.name}}</view>
					</view>
						<view class="cu-list menu-avatar">
							<view class="cu-item">
								<view class="cu-avatar round lg"><image class="cu-avatar round lg" :src="uurl+item.id+png" /></view>
								<view class="content">
									<navigator :url="'./web-view?website=https://harrypotter.fandom.com/zh/wiki/&names='+ item.data">
									<view class="text-white">
									{{item.data}}
									</view>
									</navigator>
								</view>
							</view>
						</view>
				</view>
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				uurl: '../../../static/moyao/',
				png: '.png',
				uuurl: 'https://harrypotter.fandom.com/zh/wiki/'
			};
		},
		onLoad() {
			
			let list = [{}];
			let array = ['*','不','伤','十','咳','增','复','才','护','振','提','死','毒','永','治','活','浓','清','生',
			'痴','竖','精','缩','老','肿','药','莫','返','迷','速','金','银','锁','镇','防','除','食','魔','鸟'];
			let moyao = ['魔药','不可检测毒药','伤口清洗剂','十秒消除脓疱特效灵','咳嗽药水','增智剂','复方汤剂','才华药剂','护发水','振奋药剂','提神剂','死亡药水','Category:毒药','永洁灵','治疗疖子的药水','活力滋补剂','浓浓的金色药液','Category:清洁产品','生骨灵',
			'痴心水','竖发剂','精神魔药','缩身药水','老鼠强身剂','肿胀药水','药剂师','莫特拉鼠汁','返青剂','迷情剂','速顺滑发剂','金色液体','银粉与白鲜的混合物','锁喉毒气','镇定剂','防恶咒清漆','除草药剂','食肉鼻涕虫驱除剂','魔药配料','鸟蛇蛋黄洗发露'];
			for (let i = 0; i < 39; i++) {
				list[i] = {};
				// list[i].name = String.fromCharCode(65 + i);
				list[i].name = array[i];
				list[i].id = i;
				list[i].data = moyao[i];
			}
			this.list = list;
			this.listCur = list[0];
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			tiaozhuan(title){
				uni.navigateTo({
					// url: './catalog?title=' + title
					// url: 'https://app.jd.com/mobile.html'
					url: 'https://www.baidu.com/'
				})
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			}
		},
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}
	
	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}
	
	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		/* background-color: #fff; */
		background-color: #000000;
		color: #FFFFFF;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}
	
	.VerticalNav.nav .cu-item.cur {
		/* background-color: #f1f1f1; */
		background-color:#2C405A;
		color: #FFFFFF;
	}
	
	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}
	
	.VerticalBox {
		display: flex;
	}
	
	.VerticalMain {
		/* background-color: #f1f1f1; */
		background-color: #3F536E;
		color: #FFFFFF;
		flex: 1;
	}
	{
		background-color: #2C405A;
		color: #FFFFFF;
	}
	.cu-list menu-avatar{
		background-color: #555555;
		color: #FFFFFF;
	}
	.cu-item{
		background-color: #555555;
		color: #FFFFFF;
	}
	.cu-avatar{
		background-color: #555555;
		color: #FFFFFF;
	}
	.content{
		background-color: #555555;
		color: #FFFFFF;
	}
	.text-gray{
		background-color: #555555;
		color: #FFFFFF;
	}
	.padding-top .padding-lr{
		background-color:#2C405A;
		color: #FFFFFF;
	}
	.cu-bar .solid-bottom .bg-white{
		background-color:#2C405A;
		color: #FFFFFF;
	}
</style>
