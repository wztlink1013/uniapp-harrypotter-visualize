<template>
    <view>
        <!-- 标题 -->
        <view :class="['grace-article-title', graceSkeleton == 'ing' ? 'grace-skeleton' : '']">{{article.title}}</view>
        <!-- 作者信息 -->
        <view class="grace-article-author-line">
            <view :class="['grace-article-author', graceSkeleton == 'ing' ? 'grace-skeleton' : '']">
                <image :src="u_face" mode="widthFix"></image>
                <view class="author-name">{{u_name}}</view>
            </view>
            <view>{{article.create_time}}</view>
        </view>
        <!-- 文章内容 -->
        <view class="grace-article-contents">
            <block v-for="(item, index) in artContents" :key="index">
            <view :class="['img-item', graceSkeleton == 'ing' ? 'grace-skeleton' : '']" v-if="item.type == 'image'">
                <image :src="item.content" mode="widthFix" data-url="item.content" @tap="showImgs"></image>
            </view>
            <view :class="['text-item', graceSkeleton == 'ing' ? 'grace-skeleton' : '']" v-if="item.type == 'text'">{{item.content}}</view>
            </block>
        </view>
    </view>
</template>
<script>
var _self ;
const db = uniCloud.database()
export default {
    data() {
        return {
            article : [], //文章基础信息
            artContents : [], // 文章项目
            graceSkeleton : 'ing',
			u_face:'',
			u_name:''
        };
    },
    onLoad:function(options){
        _self = this;
        var artid = options.artid;
        // 加载文章详情  这个需要文章信息和用户信息联表查询
		//但是jql的直接联表查询需要指向_id，和自己之前的设计不符，所以就进行两次查询吧
        uni.showLoading({title:""});
		  db.collection('article')
		  .where({
			  _id:artid
		  })
		  .get()
		  .then(res=>{
			  console.log(res);
			  var art = res.result.data[0];
			  // // 将文章内容转换成数组
			  var artContentItems = JSON.parse(art.content);
			  console.log(artContentItems);
			  // // 首先规划骨架
			  this.artContents = []; 
			  for(var i = 0; i < artContentItems.length; i++){
			       this.artContents.push({'type': artContentItems[i].type});
			  }
			  db.collection('user')
			  .where({
				  u_openid:res.result.data[0].u_openid
			  })
			  .get()
			  .then(res=>{
				  console.log(res);
				   _self.u_face=res.result.data[0].u_face;
				   _self.u_name=res.result.data[0].u_name;
			  }).catch(err => {
				console.error(err)
					})
			  // 延迟添加数据
			  setTimeout(function(){
			      _self.article       = art;
			      _self.artContents   = artContentItems;
			      _self.graceSkeleton = 'end';
			      uni.hideLoading();
				  console.log(_self.artContents)
			  }, 500);
		  })
		  .catch(err => {
		    console.error(err)
		  })
    },
	methods:{
		showImgs : function(e){
			var currentUrl = e.currentTarget.dataset.url;
			// 找出图片
			var imgsNeedShow = [];
			for(var i = 0; i < this.artContents.length; i++){
				if(this.artContents[i].type == 'image'){
					imgsNeedShow.push(this.artContents[i].content);
				}
			}
			uni.previewImage({
				urls    :imgsNeedShow,
				current :currentUrl
			});
		}
	}
}
</script>
<style></style>