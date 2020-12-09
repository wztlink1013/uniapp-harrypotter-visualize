<template>
	<view class="wrap">
		<view class="write_title">
			<input type="text" v-model="title" placeholder="请输入标题" />
		</view>
		<!-- 内容展示区 -->
		<view class="artList">
			<block v-for="(item, index) in artList" :key="index">
				<view class="item" v-if="item.type == 'image'">
					<image :src="item.content" :data-index="index" mode="widthFix" @tap="removeImg" />
				</view>
				<view class="item" v-if="item.type == 'text'">
					<!-- <textarea :value="item.content" placeholder="" v-model="artList[index].content" /> -->
					<textarea v-model="artList[index].content" placeholder="" />
					<!-- 上面这个用:value也行 -->
                    <view :data-index="index" class="deleteText" @tap="deleteText">删除</view>
                </view>
            </block>
        </view>
        <!-- 输入区 -->
        <form @submit="submit">
            <view class="inputArea">
                <view class="addImg" @tap="addImg">+图片</view>
                <view class="addText">
                    <textarea name="artText" maxlength="-1" v-model="inputContent" placeholder="请输入文本" />
                    <button class="add_ctn" form-type="submit">添加</button>
                </view>
            </view>
        </form>
        <!-- 选择分类 -->
        <view class="art-cate">
            <view>文章分类</view>
            <view class="">
                <picker mode="selector" :range="caties" @change="cateChange">
                    <view>{{caties[currentCateIndex]}}</view>
                </picker>
            </view>
        </view>
        <!-- 提交按钮 -->
        <view class="submitNow" v-if="artList.length > 0" @tap="submitNow">发布文章</view>
    </view>
</template>
<script>
import catagory from '../../common/catagory.js';
import SOtime from 'js_sdk/fl-SOtime/SOtime.js';
//import upLoadFile from '../../common/upLoadFile.js';
let _self, loginRes;
const db = uniCloud.database();
const dbCmd = db.command;
//let signModel = require('../../commons/sign.js');
export default {
    data() {
        return {
            title : '',
            artList : [],
            inputContent : "",
            needUploadImg : [],
            uploadIndex : 0,
            //分类
            caties : ['点击选择'],
            currentCateIndex : 0,
            catiesFromApi : [],
            // 记录真实选择的api接口数据的分类id
            sedCateIndex  : 0
        };
    },
    onLoad : function() {
		//uni.clearStorageSync();
		loginRes = this.checkLogin('../write/write', '2');
		//console.log(loginRes);
		if (!loginRes) {
			return false;
		}
        _self = this;
		db.collection("catagories").get()  //获取全部
		.then(res=>{
			//console.log(res.result.data.length);
			//结果要转换成一个数组
			if(res.result.data.length >0){
			    // 把数据格式整理为 picker 支持的格式 ['分类名', ...]
			   //console.log(res.result.data[1]);
				let categories = res.result.data;
			    for(let k in categories){
			        _self.caties.push(categories[k].cate_name);
			    }
			    // 记录分类信息
			    _self.catiesFromApi = categories;
			}
		})
    },
	
    methods:{
        cateChange : function(e){
            let sedIndex= e.detail.value;
            this.currentCateIndex = sedIndex;
            // 获取选择的分类名称
            if(sedIndex < 1){return ;}  //但这个的弊端就是无法从类别再回到“选择类别”
            let cateName = this.caties[sedIndex];
            for(let k in this.catiesFromApi){ //在实际数组里的分类号，这样可以不按顺序插数据库，添多级分类
                if(cateName == this.catiesFromApi[k].cate_name){
                    this.sedCateIndex = this.catiesFromApi[k].cate_id;  //把这里的i改成了分类号
                    break;
                }
            }
        },
        removeImg : function(e){
            let index = e.currentTarget.dataset.index;
            uni.showModal({
                content:"确定要删除此图片吗",
                title:'提示',
                success(e) {
                    if (e.confirm) {
                        _self.artList.splice(index, 1);
                    }
                }
            });
        },
        deleteText : function(e){
            let index = e.currentTarget.dataset.index;
            uni.showModal({
                content:"确定要删除吗",
                title:'提示',
                success(e) {
                    if (e.confirm) {
                        _self.artList.splice(index, 1);  //在index位置删除一个元素
                    }
                }
            });
        },
        submitNow : function(){
            // 数据验证
            if(this.title.length < 2){uni.showToast({title:'请输入标题', icon:"none"}); return ;}
            if(this.artList.length < 1){uni.showToast({title:'请填写文章内容', icon:"none"}); return ;}
            if(this.sedCateIndex < 1){uni.showToast({title:'请选择分类', icon:"none"}); return ;}
            // 上传图片 一次一个多次上传 [ 递归函数 ]
            // 上传完成后整体提交数据
            // 首先整理一下需要上传的图片
            // this.needUploadImg = [{tmpurl : 临时地址, index : 数据索引}]
            this.needUploadImg = [];
            for(let i = 0; i < this.artList.length; i++){
                if(this.artList[i].type == 'image'){
                    this.needUploadImg.push({"tmpurl" : this.artList[i].content , "indexID" : i});
                }
            }
            this.uploadImg();
        },
        uploadImg : function(){ //可能是用户id加上第几篇文章,可能是上传的文件的_id，看具体情况
            // 如果没有图片 或者已经上传完成 则执行提交
           if(this.needUploadImg.length < 1 || this.uploadIndex >=  this.needUploadImg.length){
			   uni.hideLoading();
			   console.log("图片上传完成");
				_self.upLoadFile();
            }
            // 上传图片  这里改成unicloud.uploadFile  后端的功能就是把图片存到文件夹下并保留
			else{
            uni.showLoading({title:"上传图片"});
			uni.getImageInfo({
				src: _self.needUploadImg[_self.uploadIndex].tmpurl,
				success(info) {
					let options=options = {
						filePath: _self.needUploadImg[_self.uploadIndex].tmpurl,
						//cloudPath: label+_self.uploadIndex+Date.now() + '.' + info.type.toLowerCase()
						cloudPath: uni.getStorageSync('SUID')+Date.now() + '.' + info.type.toLowerCase()
					}
					// callback方式，与promise方式二选一即可
					uniCloud.uploadFile({
					        ...options,
					                success(res) {
										// 将已经上传的文件地址赋值给文章数据
										//console.log(res.fileID);
										let index = _self.needUploadImg[_self.uploadIndex].indexID;
										_self.artList[index].content =res.fileID;
										_self.uploadIndex ++;
										// 递归上传
										setTimeout(function(){_self.uploadImg();}, 1000);
									},
					                fail() {
										uni.showToast({title:"上传图片失败,请重试!", icon:"none"});
									}
					            });
				},
				fail(err) {
					//reject(new Error(err.errMsg || '未能获取图片类型'))
					console.log(err);
				}
			})
			}
        },
	   submit : function(res){
            let content = res.detail.value.artText;
            if(content.length < 1){uni.showToast({title:"请输入内容",icon:'none'}); return ;}
            this.artList.push({"type":"text", "content" : content});
            this.inputContent = '';
        },
        addImg : function(){
            uni.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                success: function(res) {
                    _self.artList.push({"type":"image", "content" : res.tempFilePaths[0]})
                }
            })
        },
		upLoadFile:function(){
						uni.showLoading({title:"正在提交"});
						/*三种方式：最终都是string
						1、
						console.log(Object.prototype.toString.call(_self.artList));
						console.log(JSON.stringify(_self.artList));
						2、
						let con={};
						con.data=_self.artList;
						console.log(Object.prototype.toString.call(con));
						console.log(Object.prototype.toString.call(JSON.stringify(con)));
						3、
						let str=_self.arrToStr(_self.artList);
						console.log(str);
						console.log(Object.prototype.toString.call(str));
						*/
						//...困扰一天的问题，不是object和string类型,而是类别是string而非int
						db.collection('article')
						.add({
							title   : _self.title,
							content:JSON.stringify(_self.artList),
							u_openid: uni.getStorageSync('SUID'),
							cate    : parseInt(_self.sedCateIndex),
							create_time:SOtime.time3(Date.now())
						})
						.catch((err) => {
							console.log(err)
							uni.showToast({
								title: "上传失败"
							});
						})
						.then((res)=>{
							let integral=parseInt(uni.getStorageSync('INTEGRAL'))+10;
							uni.setStorageSync('INTEGRAL', integral+'');
							db.collection('user')
							.where({
								u_openid:uni.getStorageSync('SUID')
								//u_openid:'oRrdQt-jgZT-72IprQHsbglYWvhU'
							}).update({
									u_integral:integral
							})
							.then(res=>{
								console.log("上传文件成功");
								uni.hideLoading();
								uni.showToast({
									title: "上传成功"
								});
								// 防止数据缓存
								_self.artList = [];
								_self.currentCateIndex = 0;
								_self.sedCateIndex     = 0;
								_self.needUploadImg    = [];
								_self.title            = '';
								setTimeout(function(){
								    uni.switchTab({
								        url:'../my/my'
								    })
								}, 1000);
								
							})
							.catch(err=>{
								console.log(err)
								uni.hideLoading();
								uni.showToast({
									title: "上传失败"
								});
							})
						})
			},
			arrToStr:function(arr){  //可以不用这个
				let str='';
				for(let i=0;i<arr.length;i++){
					str=str+'{'+arr[i].type+','+arr[i].content+'}';
					if(i!=arr.length-1) str=str+',';
				}
				return str;
			}
		}
}
</script>
<style>
	page {
	    font-family: Georgia, serif;
	    background: #afafaf; // #f5f5d5
	}
	.item,.addImg,.addText,.add_ctn {
		border:  1rpx solid;
		border-radius: 0%;
		box-shadow: 0 0 15rpx #10141B;
	}
</style>
