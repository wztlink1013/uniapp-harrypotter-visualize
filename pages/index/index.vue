<template>
	<view>
		<view class="grace-header-cate">
			<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title">
				<view v-for="(cate, index) in categories" :key="index" :data-cateid="cate.cateId" :data-index="index" :class="[cateCurrentIndex == index ? 'grace-tab-current' : '']"
				 @tap="tabChange">{{cate.name}}</view>
			</scroll-view>
		</view>
		<view style="height:50px;"></view>
		<!-- 文章内容区 -->
		<view class="grace-news-list">
			<block v-for="(item, index) in artList" :key="index">
				<!-- 0张图 -->
				<navigator class="showItem" v-if="item.content.length ==0" open-type="navigate" :url="'../info/info?artid='+item._id">
					<view class="grace-news-list-img-news">
						<view class="grace-news-list-title-main">{{item.title}}</view>
					</view>
				</navigator>
				<!-- 一张图 -->
				<navigator class="showItem" v-if="item.content.length>0&&item.content.length < 3 " open-type="navigate" :url="'../info/info?artid='+item._id">
					<view class="grace-news-list-img-news">
						<view class="grace-news-list-title-main">{{item.title}}</view>
						<view class="grace-news-list-img-big">
							<image :src="item.content[0]" mode="widthFix"></image>
						</view>
					</view>
				</navigator>
				<!-- 三张图 -->
				<navigator class="showItem" v-if="item.content.length >= 3" :url="'../info/info?artid='+item._id">
					<view class="grace-news-list-img-news">
						<view class="grace-news-list-title-main">{{item.title}}</view>
						<view class="grace-news-list-imgs">
							<view class="imgs">
								<image :src="item.content[0]" mode="widthFix"></image>
							</view>
							<view class="imgs">
								<image :src="item.content[1]" mode="widthFix"></image>
							</view>
							<view class="imgs">
								<image :src="item.content[2]" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</navigator>
			</block>
		</view>

	</view>
</template>

<script>
	const db = uniCloud.database();
	var _self, cate = 0,
		page = 1;
	let loginRes;
	export default {
		data() {
			return {
				categories: [{
					cateId: 0,
					name: "全部"
				}],
				cateCurrentIndex: 0,
				artList: []
			}
		},
		onLoad() {
			//uni.clearStorageSync();
			loginRes = this.checkLogin('../write/write', '2');
			//console.log(loginRes);
			if (!loginRes) {
				return false;
			}
			_self = this;
			// 加载文章分类
			db.collection("catagories").get() //获取全部
				.then(res => {
					//console.log(res.result.data);
					//结果要转换成一个数组
					if (res.result.data.length > 0) {
						// 把数据格式整理为 picker 支持的格式 ['分类名', ...]
						//console.log(res.result.data[1]);
						let categories = res.result.data;
						//console.log(categories);
						for (let k in categories) {
							_self.categories.push({
								cateId: categories[k].cate_id,
								name: categories[k].cate_name
							});
						}
						// 记录分类信息
						_self.catiesFromApi = categories;
					}
				})

			// 加载全部文章
			this.getNewsList();
		},
		//下拉刷新
		onPullDownRefresh: function() {
			page = 1;
			this.artList = [];
			this.getNewsList();
		},
		// 加载更多
		onReachBottom: function() {
			this.getNewsList();
		},
		methods: {
			tabChange: function(e) {
				console.log(e);
				var cateid = e.currentTarget.dataset.cateid;
				var index = e.currentTarget.dataset.index;
				page = 1;
				this.cateCurrentIndex = index;
				cate = cateid;
				this.artList = [];
				this.getNewsList();
			},
			getNewsList: function() {
				console.log(cate);
				uni.showLoading({
					'title': "加载中..."
				});
				//还是先不写分页，直接全部查询，因此也就没有了下拉刷新
				if (cate == 0) {
					db.collection("article").get({
							getCount: true
						}).then(res => {
//							console.log(res);
							if (res.result.count > 0) {
								if (res.result.count <= _self.artList.length) {
									uni.showToast({
										title: "已经加载全部新闻",
										icon: "none"
									});
									return;
								}
								//写完分页后上面的这一句去掉
								let newsList = res.result.data;
								for (var i = 0; i < newsList.length; i++) {
									// 把图片分离出来
									var imgs = [];
									var content = newsList[i].content;
									//console.log(content);
									content = JSON.parse(content);
									//console.log(content);
									for (var ii = 0; ii < content.length; ii++) {
										if (content[ii].type == 'image') {
											imgs.push(content[ii].content);
										}
									}
									newsList[i].content = imgs;
									//console.log(newsList);
								}
								//填充数据
								_self.artList = _self.artList.concat(newsList);
								uni.hideLoading();
							} else {
								uni.hideLoading();
								uni.showToast({
									title: "已经加载全部新闻",
									icon: "none"
								});
								return;
							}
						})
						.catch(err => {
							console.error(err)
						})
				} else {
					db.collection("article").where({
							cate: cate
						})
						.get({
								getCount: true
							})
						.then(res => {
							//console.log(res);
							if (res.result.count > 0) {
								if (res.result.count <= _self.artList.length) {
									uni.showToast({
										title: "已经加载全部新闻",
										icon: "none"
									});
									return;
								}
								//写完分页后上面的这一句去掉
								let newsList = res.result.data;
								for (var i = 0; i < newsList.length; i++) {
									// 把图片分离出来
									var imgs = [];
									var content = newsList[i].content;
									console.log(content);
									content = JSON.parse(content);
									console.log(content);
									for (var ii = 0; ii < content.length; ii++) {
										if (content[ii].type == 'image') {
											imgs.push(content[ii].content);
										}
									}
									newsList[i].content = imgs;
									console.log(newsList);
								}
								//填充数据
								_self.artList = _self.artList.concat(newsList);
								uni.hideLoading();
							} else {
								uni.hideLoading();
								uni.showToast({
									title: "已经加载全部新闻",
									icon: "none"
								});
								return;
							}
						})
						.catch(err => {
							console.error(err)
						})
				}
				uni.stopPullDownRefresh();
			},
			 
		}
	}
</script>

<style>
	page {
	    font-family: Georgia, serif;
	    color: #ffffff;
	    background: #afafaf; // #f5f5d5
	}
	.grace-tab-title{
		/* color: #000000; */
		background-color: #000000;
	}
	.showItem{
		/* border:  1rpx solid ; */
		border-radius: 0%;
		box-shadow: 0 0 10rpx #ffffff;
	}
	
</style>
