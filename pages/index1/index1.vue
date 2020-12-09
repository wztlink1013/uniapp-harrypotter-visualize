<template>
	<view class="content">
		<!-- 欢迎内容 -->
		<view class="text-area">
			<text class="hello">欢迎回来！{{grade}}魔法师{{name}}</text>
		</view>
		
		<!-- 书架 -->
			<view class="bookshelf">
				<view class="bookcase">
					<view class="ul">
						<view class="li" v-for="(book, index) in books" :key="book.title" @tap="zhanshi(index)">
							<view class="pull">
								<view class="front" :style="{backgroundColor: colors[index]}">{{books[index]}}</view>
								<view class="left" :style="{backgroundColor: colors[index]}"></view>
								<view class="right" :style="{backgroundColor: colors[index]}"></view>
								<view class="top"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		<!-- 打字机文字展示 -->
		<!-- <text class="introduce_text">欢迎回来！{{grade}}魔法师{{name}}</text> -->
		<view class="introduce">
			<text class="introduce_text typing" v-if="textvalue === '0'">{{text[0]}}</text>
			<text class="introduce_text typing" v-else-if="textvalue === '1'">{{text[1]}}</text>
			<text class="introduce_text typing" v-else-if="textvalue === '2'">{{text[2]}}</text>
			<text class="introduce_text typing" v-else-if="textvalue === '3'">{{text[3]}}</text>
			<text class="introduce_text typing" v-else-if="textvalue === '4'">{{text[4]}}</text>
			<text class="introduce_text typing" v-else>{{wellcome}}</text>
		</view>
		<!-- 按钮 -->
		<view class="introduce">
			<navigator url="../index1_content/moyao/index" hover-class="navigator-hover" v-if="textvalue === '0'">
				<button type="primary" plain="true">{{input[0]}}</button>
			</navigator>
			<navigator url="../index1_content/mozhou/index/index" hover-class="navigator-hover" v-else-if="textvalue === '1'">
				<button type="primary" plain="true">{{input[1]}}</button>
			</navigator>
			<navigator url="../index1_content/mozhang/mozhang" hover-class="navigator-hover" v-else-if="textvalue === '2'">
				<button type="primary" plain="true">{{input[2]}}</button>
			</navigator>
			<navigator url="../page-test/index/index" hover-class="navigator-hover" v-else-if="textvalue === '3'">
				<button type="primary" plain="true">{{input[3]}}</button>
			</navigator>
			<navigator url="../page-test/index/index" hover-class="navigator-hover" v-else-if="textvalue === '4'">
				<button type="primary" plain="true">{{input[4]}}</button>
			</navigator>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				grade: '初级',
				wellcome: 'Welcome to the magical world!',
				name: '哈利',
				textvalue:"100", // 初始展示文字，如果不需要提前展示文字，删除text[5]那行即可 
				title: 'Hello',
				books: [
					'万能魔药',
					'神奇咒语',
					'魔杖信息',
					// '哈利波特·火杯的考验',
					// '哈利波特·凤凰会的密令',
				],
				text: [
					'无所不能的魔药，快来看看吧……',
					'神奇的咒语在这，快来尝试尝试……',
					'你了解你所使用的神奇魔杖吗……',
					'第四本书的介绍，好多文字啊。完',
					'第五本书的介绍，好多文字啊。完',
				], 
				input: [
					'进入万能魔药',
					'进入魔法咒语',
					'进入神奇咒语',
					'进入第4本书',
					'进入第5本书',
				],
				colors: [
					'#ff924a',    
					'#222222',    
					'#a4c19e',
					'#cfa6ef',
					'#888888',       
				]
			}
		},
		onLoad() {
		},
		onShow(){
			console.log(uni.getStorageSync('state'));
			if(uni.getStorageSync('state')==''){
				this.grade='游客';
				this.name='';
			}
			else{
				console.log(uni.getStorageSync('SNAME'));
				this.name=uni.getStorageSync('SNAME')+'';
				let grade=parseInt(uni.getStorageSync('INTEGRAL'));
				if(grade<100){
					this.grade="初级";
				}
				else if(grade<200){
					this.grade="中级";
				}
				else{
					this.grade="高级";
					}
			}
			//获取信息  姓名、积分。。
		},
		methods: {
			zhanshi(index){
				if (index === 0) { console.log("展示：第0本书");this.textvalue="0"}
				if (index === 1) { console.log("展示：第1本书");this.textvalue="1"}
				if (index === 2) { console.log("展示：第2本书");this.textvalue="2"}
				if (index === 3) { console.log("展示：第3本书");this.textvalue="3"}
				if (index === 4) { console.log("展示：第4本书");this.textvalue="4"}
				this.$forceUpdate();
			},
		}
	}
</script>

<style>
	page {
	    padding: 0;
	    margin: 0;
	    position: relative;
	    font-family: Georgia, serif;
	    color: #111111;
	    height: 100vh;
	    background: #000000; // #f5f5d5
		/* background-image: url(../../static/bg_xx.gif); */
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		background-size: cover;
	}
	.text-area {
		display: flex;
		margin-bottom: 5rpx;
	}
	.hello {
		margin-top: 50rpx;
		margin-bottom: 5rpx;
		color: #8f8f94;
	}
	.wrapper {
	    overflow: hidden;
	    perspective: 100%;
	    position: flex;
	    height: 100%;
	    z-index: 1;
	}
	.bookshelf {
	    overflow: hidden;
	    position: flex;
	    z-index: 5;  
		/* 下面需要大改！！！ */
	    width: 60%;
	    /* min-width: 780px; */
	    /* max-width: 1260px; */
	    margin: auto;
	    display: flex;
	    flex-wrap: wrap;
	    padding: 1px;
	}
	.bookcase {
	    position: flex;
	    z-index: 10;
	    height: 240px; // 240px
		width: 500px;
	    border-width: 5px;
	    border-style: solid;
	    border-image: url(../../static/wood.jpg) 30 30 round;
	    display: inline-block;
	    margin-right: 1px;
	    margin-bottom: 1px;
	}
	.bookcase .ul {
	    height: 100%;
		/* width: 1px; */
	    padding: 0 0 0 0;
	    box-sizing: border-box;
	    background-image: url(../../static/wood.jpg);
	    box-shadow: 0 -20px 50px rgba(0, 0, 0, 0.4) inset;
	    opacity: 1;
	}
	.bookcase .li {
	    box-sizing: border-box;
	    list-style: none;
	    width: 38px;
	    height: 100%;
	    display: inline-block;
	    margin-right: -3px;
	    perspective: 5000px;
	}
	.bookcase .li .pull {
	    padding: 0px;
	    float: left;
	    height: 100%;
	    width: 100%;
	    position: relative;
	    transition: transform 0.5s;
	    transform-style: preserve-3d;
	}
	.pull:hover {
	    transform: translateZ(100px) rotate3d(1, 1, 0, -10deg);
	}
	.pull:hover .front {
	    box-shadow: -1px 0 3px #ccc inset;
	    box-sizing: border-box;
	}
	.bookcase .li .front {
	    width: 30px;
	    height: 200px;
	    position: absolute;
	    transform: translateZ(65px);
	    left: 50%;
	    top: 50%;
	    margin-left: -15px;
	    margin-top: -100px;
	    line-height: 30px;
	    text-align: center;
	    writing-mode: vertical-lr;
	    overflow: hidden;
	    color: #fff;
	    font-size: 10px;
	    letter-spacing: 2px;
	    z-index: 3;
	    border-radius: 5px;
	}
	.bookcase .li .left {
	    width: 130px;
	    height: 200px;
	    transform: rotateY(-90deg) translateZ(15px);
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    margin-left: -65px;
	    margin-top: -100px;
	    z-index: 2;
	}
	.bookcase .li .right {
	    width: 130px;
	    height: 200px;
	    transform: rotateY(90deg) translateZ(15px);
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    margin-left: -65px;
	    margin-top: -100px;
	    z-index: 2;
	}
	.bookcase .li .top {
	    width: 30px;
	    height: 128px;
	    background-color: #ffffff;
	    transform: translateY(-98px) rotateX(90deg);
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    margin-left: -15px;
	    margin-top: -64px;
	    box-shadow: 3px 5px 3px #ccc inset, -3px 5px 3px #ccc inset;
	    z-index: 1;
	}
	/* 展示书本介绍 */
	.introduce {
		margin-top: auto;
		margin-right: auto;
		margin-left: auto;
		margin-bottom: auto;
		display: flex;
		justify-content: center;
	}
	.introduce_text {
		margin-top: auto;
		margin-right: 30rpx;
		margin-left: 30rpx;
		margin-bottom: auto;
		font-size: 36rpx;
		color: #8f8f94;
	}
	/* 打字机效果 */
	.typing {
		margin-top: auto;
		margin-right: 30rpx;
		margin-left: 30rpx;
		margin-bottom: auto;
		width: 15em;
		white-space: pre;
		word-break:break-all;
		border-right: 2px solid transparent;
		animation: typing 3.5s steps(15, end), blink-caret .75s step-end infinite;
		overflow: hidden;
	}

	@keyframes typing {
	  from { width: 0; }
	  to { width: 15em; }
	}

	@keyframes blink-caret {
	  from, to { box-shadow: 1px 0 0 0 transparent; }
	  50% { box-shadow: 1px 0 0 0; }
	}
	/* button style */
	.button_style {
		background-color: blue;
	}
</style>
