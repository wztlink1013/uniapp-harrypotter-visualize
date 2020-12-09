<template>
	<view class="content">
		<view class="title">
			<text class="ttext">
				Common 
			</text>
		</view>
		<view class="list">
			<view class="item"  :style="pos1">
				<view class="item_img">
					<image src="../../../../static/image/c1.png" :style="size"></image>
				</view>
				<view class="item_shade":style="pos3"></view>
				<view class="item_text" :style="pos2">
					<text>
						Alohomora 阿拉霍洞开
						开锁咒
					</text>
				</view>
			</view>
			<view class="item" :style="pos1">
				<view class="item_img">
					<image src="../../../../static/image/c9.jpg" :style="size"></image>
				</view>
				<view class="item_shade":style="pos3"></view>
				<view class="item_text" :style="pos2">
					<text>
						Disapparation 幻影移形
						移形咒
					</text>
				</view>
			</view>
			<view class="item" :style="pos1">
				<view class="item_img">
					<image src="../../../../static/image/c12.jpg" :style="size"></image>
				</view>
				<view class="item_shade":style="pos3"></view>
				<view class="item_text" :style="pos2">
					<text>
						Flagrate 标记显现
						标记咒
					</text>
				</view>
			</view>
			<view class="item" :style="pos1">
				<view class="item_img">
					<image src="../../../../static/image/c13.jpg" :style="size"></image>
				</view>
				<view class="item_shade":style="pos3"></view>
				<view class="item_text" :style="pos2">
					<text>
						Imperuious 防水防湿
						防水咒
					</text>
				</view>
			</view>
			<view class="item" :style="pos1">
				<view class="item_img">
					<image src="../../../../static/image/c8.jpg" :style="size"></image>
				</view>
				<view class="item_shade":style="pos3"></view>
				<view class="item_text" :style="pos2">
					<text>
						Incendio 火焰熊熊
						火焰咒
					</text>
				</view>
			</view>
			
			<view class="item" :style="pos1">
				<view class="item_img" >
					<image src="../../../../static/image/c2.jpg" :style="size"></image>
				</view>
				<view class="item_shade":style="pos3"></view>
				<view class="item_text" :style="pos2">
					<text>
						Lumos 荧光闪烁
						照明咒
					</text>
				</view>
			</view>
			<view class="item" :style="pos1">
				<view class="item_img">
					<image src="../../../../static/image/c10.jpg" :style="size"></image>
				</view>
				<view class="item_shade":style="pos3"></view>
				<view class="item_text" :style="pos2">
					<text>
						Mobiliarbus 飞来飞去
						飞来咒
					</text>
				</view>
			</view>
			<view class="item" :style="pos1">
				<view class="item_img">
					<image src="../../../../static/image/c11.jpg" :style="size"></image>
				</view>
				<view class="item_shade":style="pos3"></view>
				<view class="item_text" :style="pos2">
					<text>
						Muggle-Repelling 驱逐麻瓜
						驱逐咒
					</text>
				</view>
			</view>
			<view class="item" :style="pos1">
				<view class="item_img">
					<image src="../../../../static/image/c4.jpg" :style="size"></image>
				</view>
				<view class="item_shade":style="pos3"></view>
				<view class="item_text" :style="pos2">
					<text>
						Puierus 悄声细语
						小声咒
					</text>
				</view>
			</view>
			<view class="item" :style="pos1">
				<view class="item_img">
					<image src="../../../../static/image/c5.jpg" :style="size"></image>
				</view>
				<view class="item_shade":style="pos3"></view>
				<view class="item_text" :style="pos2">
					<text>
						Quietus 无声无息
						无声咒
					</text>
				</view>
			</view>
			<view class="item" :style="pos1">
				<view class="item_img">
					<image src="../../../../static/image/c6.jpg" :style="size"></image>
				</view>
				<view class="item_shade":style="pos3"></view>
				<view class="item_text" :style="pos2">
					<text>
						Reparo 恢复如初
						修复咒
					</text>
				</view>
			</view>
			<view class="item" :style="pos1">
				<view class="item_img">
					<image src="../../../../static/image/c7.jpg" :style="size"></image>
				</view>
				<view class="item_shade":style="pos3"></view>
				<view class="item_text" :style="pos2">
					<text>
						Scourgify 清理一新
						清理咒
					</text>
				</view>
			</view>
			<view class="item" :style="pos1">
				<view class="item_img">
					<image src="../../../../static/image/c3.jpg" :style="size"></image>
				</view>
				<view class="item_shade":style="pos3"></view>
				<view class="item_text" :style="pos2">
					<text>
						Sonorus 声音洪亮
						大声咒
					</text>
				</view>
			</view>		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:"",
				width:"",
				Sheight:"",
				Swidth:"",
				size:"",
				pos1:"",
				pos2:"",
				pos3:"",
			}
		},
		mounted() {
			var that = this;
			uni.getSystemInfo({
			    success: function (res) {
					console.log("获取屏幕宽度和高度------");
					that.width = res.windowWidth;
					that.height =res.windowHeight;
					that.Sheight = "height:"+res.windowHeight+"px";
					that.Swidth = "width:"+res.windowWidth+"px";
					that.size = "width:"+res.windowWidth * 0.9 +"px";
					//pos1修改，添加了margin-bottom
					that.pos1 = "width:"+res.windowWidth * 0.9 +"px;padding:"+res.windowWidth / 20 + "px;height:"+res.windowWidth * 0.75 +"px;margin-bottom:30px;";
					//pos2修改，添加了width
					that.pos2 = "width:"+(res.windowWidth * 0.9 - res.windowWidth / 15 ) +"px;margin:" + res.windowWidth / 30 + "px;padding-top:"+(res.windowWidth / 22 * 9 ) + "px;padding-bottom:"+(res.windowWidth / 22 * 3 ) + "px";
					that.pos3 = "width:"+res.windowWidth * 0.9 +"px;margin-top:"+(res.windowWidth * 0.45 ) + "px;height:"+(res.windowWidth * 0.30 ) +"px";
					//pos4修改，添加了margin-bottom
					that.pos4 = "width:"+res.windowWidth * 0.9 +"px;padding:"+res.windowWidth / 20 +"px;margin-bottom:5px;";
			    }
			});
		},
		methods: {
			
		},
	}
</script>

<style>
.content{
	/* background-image: url(https://images.ctfassets.net/usf1vwtuqyxm/4iypneVbBHp2frqWAEi4G4/fbd9aaf03591dd6dcd16d54efe227df7/NHM-condensed.jpg?w=380&h=285&fit=fill&f=top); */
	font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
	font-weight: 700;
	background-color: #10141B;
	color: #faf6f0;
}
.title{
	/* background-image: url(https://images.ctfassets.net/usf1vwtuqyxm/5yFQqmi5iTeUVfNsmP6Uzn/5ed1d83ef4a8fd8e0056ed82d77c82c9/News-Hub-Copy-compressor.png?w=480&h=621&fm=webp&fit=fill); */
	font-size: 2.5em;
	line-height: normal;
	text-align: left;
	padding-top: 30px;
	padding-bottom: 10px;
	padding-left: 20px;
}
.list{
	padding-bottom: 20px;
	height: auto;
}
.item_img image{
	z-index: 1;
	position: absolute;
}
.item_text{
	border: #5e606c 1px solid;
	z-index: 2;
	position: relative;
	font-size: 20px;
	line-height: 1.4;
	text-align: center;
}
.item_shade{
	background-color:#10141B;
	z-index: 2;
	position: absolute;
	height: 200px;
	transform:skewY(-9deg);
}

</style>
