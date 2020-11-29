<template>
	<view class="content">
<!-- 		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view> -->
		<!-- ===================测试================================ -->
		<view class="text-area">
			<text class="hello">欢迎你，{{name}}</text>
		</view>
		<view class="text-area">
			<text class="hello">今天的魔法课程，你完成了吗？</text>
		</view>
<!-- 		<navigator url="../page-test/index/index" open-type="navigate" hover-class="other-navigator-hover">
			<text class="title">测试uniapp的navigator{{title}}</text>
		</navigator> -->
<!-- 		<navigator url="../page-test/index/index" open-type="navigate" hover-class="other-navigator-hover">
			<view class="text-area">
				<text class="title" v-for="(book, index) in books" :key="item.title">{{book.title}},</text>
			</view>
		</navigator> -->
<!-- 		<view class="text-area">
			<text class="title" :style="{backgroundColor: colors[0]}">测试vue数据域{{title}}</text>
		</view> -->
		<!-- ===================书架================================ -->
 		<view class="wrapper">
			<view class="bookshelf">
				<view class="bookcase">
					<view class="ul">
						<view class="li" v-for="(book, index) in books" :key="book.title">
							<navigator class="a" url="../page-test/index/index" open-type="navigate" hover-class="other-navigator-hover">
								<view class="front" :style="{backgroundColor: colors[index]}">{{book.title}}</view>
								<view class="left" :style="{backgroundColor: colors[index]}"></view>
								<view class="right" :style="{backgroundColor: colors[index]}"></view>
								<view class="top"></view>
							</navigator>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- ===================轮播================================ -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '吴祖涛',
				title: 'Hello',
				books: [
					{ title: '哈利波特·神秘的魔法石' },
					{ title: '哈利波特·消失的密室' },
					{ title: '哈利波特·阿兹卡班的逃犯' },
					{ title: '哈利波特·火杯的考验' },
					{ title: '哈利波特·凤凰会的密令' },
					{ title: '哈利波特·混血王子的背叛' },
					{ title: '哈利波特·死神的圣物' },
					{ title: '哈利波特·被诅咒的孩子' },
				],
				colors: [
					'#ff924a',     // 橘色
					'#222222',     // 黑色
					'#a4c19e',
					'#cfa6ef',
					'#888888',     // 粉色
					'#80B3FF',     // 蓝色
					'#FD6E8A',     // 红色
					'#A2122F',     // 大红
					'#439877',
					'#5E445D',
					'#A8936D',
					'#a4c19e',
				]
			}
		},
		onLoad() {

		},
		methods: {

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
	    background: #f5f5d5;
	}
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

/* 	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	} */

	.text-area {
		display: flex;
		justify-content: center;
	}

	.hello {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.wrapper {
	    overflow: hidden;
	    perspective: 1800px;
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
/* 	    min-width: 780px;
	    max-width: 1260px; */
	    margin: 50px auto;
	    display: flex;
	    flex-wrap: wrap;
	    padding: 1px;
	}
	.bookcase {
	    position: flex;
	    z-index: 10;
	    height: 240px;
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
		/* 书的宽度 */
	    width: 38px;
	    height: 100%;
	    display: inline-block;
	    margin-right: -3px;
	    perspective: 5000px;
	}
	.bookcase .li .a {
	    padding: 0px;
	    float: left;
	    height: 100%;
	    width: 100%;
	    position: relative;
	    transition: transform 0.5s;
	    transform-style: preserve-3d;
	}
	.bookcase .a:hover {
	    transform: translateZ(100px) rotate3d(1, 1, 0, -10deg);
	}
	.bookcase .a:hover .front {
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
</style>
