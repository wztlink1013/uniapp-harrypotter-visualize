<template>

	<scroll-view class="content" scroll-y="true">
		<view class="text"><text style="font-size: 48rpx; font-weight: 580;">魔杖</text>是一种近乎具有感知力的魔法用品,<text class="key">巫师</text>可以凭借它引导自己的魔法力量,从而集中效果以实现更为复杂的目的。
			大多数的符咒都需要借助魔杖实施，<image class="img0" src="../../../static/mozhang/harry.gif" style="width: 300rpx;height: 170rpx; float: left;"></image>但符咒同样可以在没有魔杖的情况下施放。但无杖魔法具有很大难度,需要很强的注意力和惊人技艺。
			法力高强的巫师和家养小精灵等<text class="key">魔法生物</text>可以使用这类魔法。</test></br>
		</view>
		
		<view class="maker">
			<view class="maker_text">
				<image class="img1" src="../../../static/mozhang/GarrickOllivander.png" mode="widthFix"></image><text style="font-size: 48rpx; font-weight: 580;">奥利凡德</text>是英国最有名,最有经验的魔杖制造者。
				魔杖制造机构从公元前382年就开始制作魔杖,位于伦敦的对角巷。
				奥利凡德在1996年夏天失踪（在<text class="key">伏地魔</text>的命令下被食死徒绑架的）,他是被<text class="key">哈利</text>发现,
				并于1998年被家养小精灵<text>>多比</text>解救。此后,奥利凡德告诉哈利老魔杖以及魔杖如何传递所有权。
			</view>
		</view>
		<view class="box">
			<text style="font-size: 48rpx; font-weight: 580; color: #FFB90F;">魔杖木材</text>
			<t-table border="2" border-color="#383838" :is-check="false" @change="change">
				<t-tr font-size="40 " align="left">
					<t-th align="center" v-bind:flexgrow="1" style="flex-grow: 1;" >木材</t-th>
					<t-th align="center" v-bind:flexgrow="3" style="flex-grow: 3;" >奥利凡德的笔记</t-th>
	
				</t-tr>
				<t-tr font-size="30"  align="right" v-for="item in tableList" :key="item.id">
					
					<t-td align="center" v-bind:flexgrow="1" style="flex-grow: 1;" >{{item.wood}}</t-td>
                    <t-td align="left" v-bind:flexgrow="3" style="flex-grow: 3;">{{ item.notes}}</t-td>
				</t-tr>
			</t-table>
		</view>
		<view class="box1">
			</br>
			<text style="font-size: 48rpx; font-weight: 580;color: #FFB90F;">知名魔杖</text>
			<t-table border="2" border-color="#383838" :is-check="false" @change="change">
				<t-tr font-size="40 " align="left">
					<t-th align="center" v-bind:flexgrow="1"  style="flex-grow: 1 ;" >杖芯</t-th>
					<t-th align="center" v-bind:flexgrow="3" style="flex-grow: 3;" >说明</t-th>
			
				</t-tr>
				<t-tr font-size="30"  align="right" v-for="item in corelist" :key="item.id">
					
					<t-td align="center" v-bind:flexgrow="1"  style="flex-grow: 1; ">{{item.wood}}</t-td>
		            <t-td align="left" v-bind:flexgrow="3"  style="flex-grow: 3;">{{ item.notes}}</t-td>
				</t-tr>
			</t-table>
		</view>
		<view class="box2">
			</br>
			<text style="font-size: 48rpx; font-weight: 580;color: #FFB90F;">杖芯</text>
			<t-table border="2" border-color="#383838" :is-check="false" @change="change">
				<t-tr font-size="40 " align="left">
					<t-th align="center" v-bind:flexgrow="2"  style="flex-grow: 2;" >魔杖</t-th>
					<t-th align="center" v-bind:flexgrow="1"  style="flex-grow: 1;" >拥有者</t-th>
					<t-th align="center" v-bind:flexgrow="1" style="flex-grow: 1;" >木材</t-th>
			        <t-th align="center" v-bind:flexgrow="1" style="flex-grow: 1;" >杖芯</t-th>
				</t-tr>
				<t-tr font-size="30"  align="right" v-for="item in wand" :key="item.id">
					<t-td align="center" v-bind:flexgrow="2"  style="flex-grow: 2;"><image  :src="item.image" style="width: 220rpx;height: 220rpx;"></image></t-td>
					<t-td align="center" v-bind:flexgrow="1"  style="flex-grow: 1; ">{{item.owner}}</t-td>
		            <t-td align="center" v-bind:flexgrow="1"  style="flex-grow: 1;">{{ item.wood}}</t-td>
					<t-td align="center" v-bind:flexgrow="1"  style="flex-grow: 1;">{{ item.core}}</t-td>
				</t-tr>
			</t-table>
		</view>
		
	</scroll-view>

</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	export default {
		components: {
				tTable,
				tTh,
				tTr,
				tTd
			},
		data() {
			return {
				tableList: [{
						id: 0,
						wood:'金合欢木',
						notes:'一种与众不同的魔杖木材，我发现它制作的魔杖非常狡猾，通常会拒绝为除主人之外的人施展魔法，并且只对最有天赋的人展现自己的实力。'
					},
					{
						id: 1,
						wood:'桤木',
						notes:'桤木是种不易弯曲的木材，不过我发现它理想的主人既不顽固也不倔强，反而是那些乐于助人、体贴并且讨人喜爱的巫师。'
					},
					{
						id: 2,
						wood:'苹果木',
						notes:'由苹果木制成的魔杖并不多。它们力量强大，尤其适合那些有崇高理想和追求的人，这是因为苹果木不适合施黑魔法。'
					},
					{
						id: 3,
						wood:'白蜡木',
						notes:'白蜡木魔杖会永远坚守自己真正的主人，不适合留给或者送给其他的人，因为这会让它失去力量和技能。如果魔杖的杖芯是独角兽毛的话，这种趋势则尤为明显。'
					},
					{
						id: 4,
						wood:'山杨木',
						notes:'用于制作魔杖的山杨木是白色且有细密纹理的木材。由于它具有如象牙般时尚的外表，且能表现出优秀的魔咒能力，因此被所有的魔杖制作人视为珍宝。'
					},
					{
						id: 5,
						wood:'白蜡木',
						notes:'白蜡木魔杖会永远坚守自己真正的主人，不适合留给或者送给其他的人，因为这会让它失去力量和技能。如果魔杖的杖芯是独角兽毛的话，这种趋势则尤为明显。'
					},
					{
						id: 6,
						wood:'黑刺李木',
						notes:'黑刺李木是一种非常不寻常的魔杖木材，它在我看来有着适合于一个战士的好名声。'
					},
					{
						id:7,
						wood:'雪松木',
						notes:'每当我遇见持有雪松木魔杖的人，我都会发觉他有着坚强的个性和不同寻常的忠诚。我父亲加维斯·奥利凡德过去常说，“你永远骗不过一个拿着雪松木魔杖的人。”我同意这一点：雪松木魔杖总是在睿智并拥有敏锐洞察力的主人处安家。'
					},
					{
						id:8,
						wood:'接骨木',
						notes:'这是最罕见的魔杖木材，拥有招来巨大不幸的恶名。使用接骨木魔杖比使用其他魔杖要更加棘手。它们拥有强大的魔力，却不屑于陪伴那些不比其他人出众的主人。持有接骨木魔杖的巫师大多举世瞩目，不论他持有了多长时间。'
					},
					{
						id:9,
						wood:'鹅耳枥木',
						notes:'鹅耳枥木魔杖选择那些拥有天赋，并且对事物有着着单一而纯粹热情，或者一些人所称的“痴迷”（尽管我更喜欢用“憧憬”），并且通常都会实现。'
					},
					{
						id:10,
						wood:'紫杉木',
						notes:'紫杉木魔杖是更加罕见的品种，而它们理想的主人同样不同寻常，偶尔甚至会臭名昭著。紫杉木魔杖会赋予持有者掌控生死的力量。'
					}
				],
				corelist:[
					{
						id:1,
						wood:'独角兽尾毛',
						notes:'独角兽尾毛通常能产生最为稳定的魔法，很少受到波动或者阻塞。以独角兽尾毛制成的魔杖难以使用黑魔法，而且能够制成最为忠诚的魔杖：不论它的第一任主人是否是个杰出的巫师，它都会与这个人保持强烈的联系。独角兽尾毛的小缺点是无法制成最强大的魔杖（尽管魔杖木材可能补偿这一点不足），同时在处理不当的情况下，独角兽尾毛还很容易变得忧郁。这意味着这根尾毛已经“死去”，需要进行替换。'
					},
					{
						id:2,
						wood:'火龙的心脏神经',
						notes:'一般说来，火龙的心脏神经能制作出最为强大的魔杖，并且能施展出最华丽的魔法。这种魔杖通常学习得比其他种类的魔杖要快。 如果从原来的主人手中赢得它们，它们就会改变效忠对象，并且总是与现任主人联系最为紧密。火龙的心脏神经制成的魔杖往往最容易转变为黑魔法魔杖，尽管它并不会自己向这个方向倾斜。它也是三种杖芯中最容易发生事故的，显得喜怒无常。'
					},
					{
						id:3,
						wood:'凤凰羽毛',
						notes:'这是最稀有的杖芯种类。凤凰羽毛魔杖能够施展最多的魔法种类，尽管它可能会花上比独角兽毛和火龙的心脏神经魔杖更长的时间才能表现出这一点。它们显得最为主动，有时候会以自己的意愿行事，而这也是许多巫师所不喜欢的。凤凰羽毛魔杖在挑选主人时总是最挑剔的，因为凤凰本身就是世界上最独立、最超然的生物之一。这些魔杖最难最难驯服并私人化，并且很难获得来自它们的忠诚。'
					},
					
				],
				wand:[
					{
						id:1,
						image:'../../../static/mozhang/wand1.jpg',
						owner:'阿布思.邓布利多',
						wood:'老木',
						core:'头发跟部'
					},
					{
						id:2,
						image:'../../../static/mozhang/wand2.jpg',
						owner:'哈利.波特',
						wood:'冬青木',
						core:'凤凰羽毛'
					},
					{
						id:3,
						image:'../../../static/mozhang/wand3.jpg',
						owner:'赫敏.格兰杰',
						wood:'藤曼',
						core:'龙芯弦'
					},
					{
						id:4,
						image:'../../../static/mozhang/wand4.jpg',
						owner:'罗恩.韦斯莱',
						wood:'灰烬',
						core:'独角兽头发'
					},
					{
						id:5,
						image:'../../../static/mozhang/wand5.jpg',
						owner:'卢修斯.马尔福',
						wood:'榆木',
						core:'龙芯弦'
					},
					{
						id:6,
						image:'../../../static/mozhang/wand6.jpg',
						owner:'贝拉特里克斯·莱斯特兰奇',
						wood:'胡桃木',
						core:'龙芯弦'
					}
				]

			}

		},
		onLoad() {
			

		},
		methods: {
			change(){
				
			}
		}
	}
</script>

<style>
	.content {
		width: 750rpx;
		height: 1600rpx;
		flex-direction: column;
		color: 	#EEE8AA;
		right: 10rpx;
		display: flex;
		background-image: url(../../../static/mozhang/stars.jpg);
	}

	.text {
		order: 1;
		font-size: 35rpx;
		height: 450rpx;
		letter-spacing: 5rpx;
		font-weight: 400rpx;
		font-family: sans-serif;
		width: 730rpx;
		text-indent: 1em;
		position: absolute;
		left: 10rpx;
		top:3%;
	}

	.maker {
		order: 2;
		height: 660rpx;
		font-size: 35rpx;
		letter-spacing: 5rpx;
		font-weight: 400rpx;
		font-family: sans-serif;
		width: 730rpx;
		text-indent: 1em;
		position: absolute;
		top: 36%; 
		left:10rpx;


	}

	.maker_text {
		font-size: 35rpx;
		width: auto;
		height: auto;
		position: absolute;
		left: 10rpx;
	}
	.img0{
		margin-top: 20rpx ;
		width: 300rpx;
	}
	.img1 {
		width: 300rpx;
		float: right; 
		margin-right: 30rpx;
	}

	.key {
		color: 	#FFFF00;
		font-size: 38rpx;
		font-weight: 550;
	}
	.box{
		margin-top: 50rpx;
		z-index: 1;
		width: 730rpx;
		 position: absolute;
		top:1300rpx; 
		left:10rpx;
		right: 10rpx ; 
		height: 100%rpx;
		order: 3;
	}
	.box1{
		margin-top: 400rpx;
		z-index: 1;
		width: 730rpx;
		position: absolute;
		order: 5;
		top:3500rpx;
		left:10rpx;
		right: 10rpx ; 
		height: 1600rpx;
	}
	.box2{
		margin-top: 500rpx;
		z-index: 1;
		width: 730rpx;
		position: absolute;
		order: 5;
		top:5000rpx;
		left:10rpx;
		right: 10rpx ; 
	}
	
</style>
