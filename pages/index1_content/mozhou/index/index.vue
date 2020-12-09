<template>
	<view class="content" >
		<view :style="Sheight2">
			<view id="title" :style="Sheight3" >Charms</view>
			<view id="des" style="font-size: 18px;">
				<text>
					魔咒是给某一物体或生物增加特定属性的符咒。魔咒会更改或增加物体的属性，注重于让物体“做什么”。
				</text>
			</view>
		</view>
		<view id="list" :style="Sheight1">
			<view class="item" style="padding-top: 10px;font-size: 18px;">
				<navigator url="../Common/Common">Common(常用咒语)</navigator>
			</view>
			<view class="item" style="font-size: 18px;" >
				<navigator url="../Attack/Attack">Attack(攻击系)</navigator>
			</view>
			<view class="item" style="font-size: 18px;">
				<navigator url="../Defence/Defence">Defence(防御系)</navigator>
			</view>
			<view class="item" style="font-size: 18px;">
				<navigator url="../Unforgivable/Unforgivable">Unforgivable(不可饶恕咒)</navigator>
			</view>
			<view class="item" style="font-size: 18px;">
				<navigator url="../Other/Other">Other(其他咒语)</navigator>
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
				Sheight1:"",
				Sheight2:"",
				Sheight3:"",
			}
		},
		mounted() {
			var that = this;
			uni.getSystemInfo({
			    success: function (res) {
					console.log("获取屏幕宽度和高度------")
					that.width = res.windowWidth;
					that.height =res.windowHeight;
					that.Sheight = "height:"+res.windowHeight+"px";
					that.Swidth = "weight:"+res.windowWidth+"px";
					that.Sheight1 = "height: "+res.windowHeight/18 * 6+"px";
					that.Sheight2 = "height: "+res.windowHeight/18 * 12+"px";
					that.Sheight3 = "padding-top:"+res.windowHeight/18 * 5+"px";
					console.log(that.height);
					console.log(that.width);
					console.log(that.Sheight);
			    }
			});
		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style>
	.content{
		background-image: url(https://images.ctfassets.net/usf1vwtuqyxm/5yFQqmi5iTeUVfNsmP6Uzn/5ed1d83ef4a8fd8e0056ed82d77c82c9/News-Hub-Copy-compressor.png?w=480&h=621&fm=webp&fit=fill);
		font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
		font-weight: 700;
	}
	#title{
		font-size: 2.5em;
		line-height: normal;
		color: #faf6f0;
		text-align: center;
		letter-spacing: .05556em;
	}
	#des{
		padding: 20px;
		font-size: 1em;
		line-height: 1.33;
		color: #dfdbd9;
		text-align: center;
	}
	#list{
		font-size: 18px;
		line-height: 1.4;
		color: #10141b;;
		text-align: center;
		background-color: #faf6f0;
	}
	.item{
		padding: 3px;
	}
</style>
