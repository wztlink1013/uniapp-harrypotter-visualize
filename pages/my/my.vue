<template>
    <view class="grace-padding">
        <view class="myface"><image class="imgShow" :src="user.u_face" mode="widthFix"></image></view>
        <view class="grace-box-banner" style="margin:30rpx 120rpx 0 150rpx;">
            <view class="garce-items">
                <view class="line1">{{myArtCount}}</text></view>
                <view class="line2">文章</view>
            </view>
            <view class="garce-items">
                <view class="line1">{{user.u_integral}}</text></view>
                <view class="line2">积分</view>
            </view>
            <view class="garce-items">
                <view class="line1">{{user.u_remainder}}</text></view>
                <view class="line2">余额</view>
            </view>
        </view>
        <view class="grace-title grace-nowrap grace-space-between">
            <view class="grace-h5 grace-blod">我的文章</view>
        </view>
        <view class="myart-list" v-for="(item, index) in arts" :key="index">
            <view class="title">{{item.title}}</view>
            <view class="btns">
                <view  :data-artid="item._id"  @tap="editArt">编辑</view>
                <view  :data-artid="item._id" :data-index="index" @tap="removeArt">删除</view>
            </view>
        </view>
        <view class="loadMore" @tap="getArtList">{{loadMore}}</view>
    </view>
</template>
<script>
var _self, loginRes, page = 1;
const db = uniCloud.database();
export default {
    data() {
        return {
           // myFace : '',
		   artsPages:[],
            arts : [],
            loadMore : "点击加载更多",
            user : {},
			myArtCount:0
        };
    },
    onLoad:function(){
        _self = this;
		//uni.clearStorageSync();
        loginRes = this.checkLogin('../my/my', '2');
        if(!loginRes){return false;}
        //this.myFace = loginRes[3];
    },
    onShow:function(){
        //加载我的文章
		_self=this;
        this.arts = [];
        page = 1;
        this.getArtList();
        // 加载会员信息  查询文章总数，查询积分，查询余额  效果还不太好
		db.collection('user') // 注意collection方法内需要传入所有用到的表名，用逗号分隔，主表需要放在第一位
		  .where({
			  //u_openid:"oRrdQt-jgZT-72IprQHsbglYWvhU"
			  u_openid:uni.getStorageSync('SUID')
		  })
		  .get()
		  .then(res => {
		    //console.log(res);
			/*_self.user["u_integral"]=res.result.data[0].u_integral;
			_self.user["u_remainder"]=res.result.data[0].u_remainder;*/
			_self.user=res.result.data[0];
			//console.log(_self.user)
			db.collection('article').where({
				//u_openid:"oRrdQt-jgZT-72IprQHsbglYWvhU"
				u_openid:uni.getStorageSync('SUID')
			}).get({
				getCount: true
			}).then(res => {
			//console.log(res);
			if(res.result.count == 0) {
				//_self.user["artCount"]=0;
				_self.myArtCount=0;
			}
			else{
				//_self.user["artCount"]=res.result.count;
				_self.myArtCount=res.result.count;  //没法往对象里面插入元素。。。？
			}
			}).catch(err => {
		    console.error(err)
		  })
		  }).catch(err => {
		    console.error(err)
		  })
    },
    methods:{
        editArt : function(e){
            var artId = e.currentTarget.dataset.artid;
            uni.navigateTo({
                url:"../editArt/editArt?artId="+artId
            });
        },
        removeArt : function(e){
            var artId = e.currentTarget.dataset.artid;
            var index = e.currentTarget.dataset.index;
            uni.showModal({
                title:"提示",
                content:"确定要删除吗?",
                success:function(e){
                    if(e.confirm == true){
						db.collection('article').where({
							_id:artId
						}).remove()
						.then(res => {
								console.log(res);
								if(res.success == true){
								    uni.showToast({title: "已删除", icon:"none"});
								    _self.arts.splice(index, 1);
								}else{
								    uni.showToast({title: "删除失败", icon:"none"});
								}
									})
						.catch(err => {
						  console.error(err)
						})
                    }
                }
            });
        },
        getArtList : function(){  //获取文章信息，并且mysql分页  后端每次访问数据库分页，前端每次请求其中的一页
            //再设计一个数组，二维  前端当它为空时，前端访问数据库  然后第二维作为列
			//不可能存在前端，负担太大，。。。其实还好   也可以使用组件
			//现在只是获取了，还没写分页算法
			if(this.loadMore != '点击加载更多'){return ;}
            this.loadMore = '加载中...';
			db.collection("article").where({
				//u_openid:"oRrdQt-jgZT-72IprQHsbglYWvhU"
				u_openid:uni.getStorageSync('SUID')
			}).get({
				getCount:true
			}).then(res => {
			//console.log(res);
			if(res.result.count >0){
				if(res.result.count==_self.arts.length) {_self.loadMore = '已经加载全部'; return;}
				//写完分页后上面的这一句去掉
			    this.arts = this.arts.concat(res.result.data);
			    //page++;
			    this.loadMore = '点击加载更多';
			}else if(res.result.count ==0){
			    this.loadMore = '已经加载全部';
			}
			}).catch(err => {
		    console.error(err)
		  })
			
        }
    }
}
</script>
<style>
	page {
	    font-family: Georgia, serif;
		/* color: #FFFFFF; */
	    background: #afafaf; // #f5f5d5
	}
.myface{width:88px; height:88px; border:0 solid #F1F2F3; 
box-shadow: 0 0 15rpx #10141B;border-radius:100%; margin:15px auto;}
.myface image{width:100%; border-radius:100%;}
.myart-list{width:100%; margin:8px 0; overflow:hidden; border-bottom:1px dashed #D7D8D9;}
.myart-list .title{line-height:2em; width:100%;}
.myart-list .btns{line-height:2em; width:100%;}
.myart-list .btns view{float:right; padding:0 6px; margin:0 5px; color:#000000;}
.myart-list .btns view:last-child{color:#000000;}
.loadMore{width:100%; padding:8px 0; text-align:center; color:#CCCCCC;}
.myart-list{
	border:  1rpx solid;
	border-radius: 0%;
	box-shadow: 0 0 15rpx #10141B;
}
.grace-box-banner{ 
	border:  1rpx solid; 
	border-radius: 0%;
	box-shadow: 0 0 15rpx #10141B;
}

</style>