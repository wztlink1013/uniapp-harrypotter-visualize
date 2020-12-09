<template>
	<view class="t-td" :style="{ 'border-width': thBorder + 'rpx','flex-grow':flexgrow,'border-color':borderColor ,'font-size':fontSize+'rpx' ,'color':color,'justify-content':tdAlignCpd}">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			align: String,
			flexgrow:Number

		},
		data() {
			return {
				thBorder: '1',
				borderColor: '#d0dee5',
				fontSize: '40',
				tdAlign: 'center'
				//flexgrow: 1
			
			};
		},
		inject: ['table', 'tr'],

		created() {
			this.thBorder = this.table.border;
			this.borderColor = this.table.borderColor;
			this.fontSize = this.tr.fontSize;
			this.color = this.tr.color;
			if (this.align) {
				this.tdAlign = this.align;
			} else {
				this.tdAlign = this.tr.align
			}
		},
		computed: {
			tdAlignCpd() {
				let nameAlign = '';
				switch (this.tdAlign) {
					case 'left':
						nameAlign = 'flex-start'
						break;
					case 'center':
						nameAlign = 'center'
						break;
					case 'right':
						nameAlign = 'flex-end'
						break;
					default:
						nameAlign = 'center'
						break;
				}
				return nameAlign
			}
		}
	};
</script>

<style>
	.t-td {
		flex: 1;
		display: flex;
		align-items: center;
		padding: 14rpx;
		border-top: 1rpx #d0dee5 solid;
		border-left: 1rpx #d0dee5 solid;
		text-align: center;
		color: ;
		font-size: 40rpx;
		flex-grow:1;

	}
</style>
