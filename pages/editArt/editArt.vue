<template>
    <view class="wrap">
        <view class="write_title">
            <input type="text" v-model="title" placeholder="请输入标题" />
        </view>
        <!-- 内容展示区 -->
        <view class="artList">
            <block v-for="(item, index) in artList" :key="index">
                <view class="item" v-if="item.type == 'image'"><image :src="item.content" :data-index="index" mode="widthFix" @tap="removeImg" /></view>
                <view class="item" v-if="item.type == 'text'">
                    <textarea  placeholder="" v-model="artList[index].content" />
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
                    <button type="primary" form-type="submit">添加</button>
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
        <view class="submitNow" v-if="artList.length > 0" @tap="submitNow">编辑文章</view>
    </view>
</template>
<script>
import SOtime from 'js_sdk/fl-SOtime/SOtime.js';
var artId, loginRes, _self;
const db = uniCloud.database();
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
    onLoad :function(options){
        artId = options.artId;
        _self = this;
        loginRes = this.checkLogin('../my/my', '2');
        if(!loginRes){return false;}
        // 加载文章默认值
		db.collection('article').where({
			_id:artId
		}).get()
		.then(res=>{
			let art = res.result.data[0];
			//console.log(art);
			// 文章内容转换并展示
			var artContent = art.content;
			artContent = JSON.parse(artContent);
			_self.artList = artContent;
			//console.log(_self.artList);
			// 默认值赋值
			this.title = art.title;
			// 加载文章分类并设置默认值
			db.collection("catagories").get()  //获取全部
			.then(res=>{
				//结果要转换成一个数组
				if(res.result.data.length >0){
				    // 把数据格式整理为 picker 支持的格式 ['分类名', ...]
				   //console.log(res.result.data);
					let categories = res.result.data;
				    for(let k in categories){
				        _self.caties.push(categories[k].cate_name);
				    }
					//console.log(_self.caties);
				    // 记录分类信息
				    _self.catiesFromApi = categories;
					//console.log(_self.catiesFromApi);
					// 获取当前分类的默认值
					_self.sedCateIndex = art.cate;
					//console.log(_self.sedCateIndex);
					// 对应的查找picker的默认值
					//var cateName = categories[art.cate];
					let cateName;
					//console.log(categories);
					for(let i=0;i<categories.length;i++){
						if(categories[i].cate_id==_self.sedCateIndex) 
						{
							cateName = categories[i].cate_name;
							break;
						}
						
					}
					//console.log(cateName);
					for(var i = 0; i < _self.caties.length; i++){
					    if(cateName == _self.caties[i]){
					        _self.currentCateIndex = i;
					        break;
					    }
					}
				}
			})
		})
		.catch(err=>{
			console.log(err);
		})
    },
    methods:{
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
            for(var i = 0; i < this.artList.length; i++){
                if(this.artList[i].type == 'image'){
                    if(this.artList[i].content.indexOf('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-androidyf') == -1){
                        this.needUploadImg.push({"tmpurl" : this.artList[i].content , "indexID" : i});
                    }
                }
            }
//			console.log(this.needUploadImg);
            this.uploadImg();
        },
        uploadImg : function(){
            // 如果没有图片 或者已经上传完成 则执行提交
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
        cateChange : function(e){
            var sedIndex          = e.detail.value;
            this.currentCateIndex = sedIndex;
            // 获取选择的分类名称
            if(sedIndex < 1){return ;}
            var cateName = this.caties[sedIndex];
            for(var i = 0; i < this.catiesFromApi.length; i++){
                if(cateName == this.catiesFromApi[i].cate_name){
                    this.sedCateIndex = this.catiesFromApi[i].cate_id;
                    break;
                }
            }
            this.currentCateIndex = sedIndex;
            console.log(this.sedCateIndex);
        },
        removeImg : function(e){
            console.log(e);
            var index = e.currentTarget.dataset.index;
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
            var index = e.currentTarget.dataset.index;
            uni.showModal({
                content:"确定要删除吗",
                title:'提示',
                success(e) {
                    if (e.confirm) {
                        _self.artList.splice(index, 1);
                    }
                }
            });
        },
        submit : function(res){
            var content = res.detail.value.artText;
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
            });
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
						.where({
							_id:artId
						})
						.update({
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
			}
    }
}
</script>

<style>
.item{
		border:  1rpx solid;
		border-radius: 0%;
		box-shadow: 0 0 15rpx #10141B;
	}
</style>