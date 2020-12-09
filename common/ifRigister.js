const db = uniCloud.database();

//感觉这里查询数据库时也有异步问题  
let ifrig = function(userInfo,options) {
	console.log(userInfo);
	db.collection('user').where({
		//其实也可以使用unionid
			u_openid: userInfo.openId
		}).get({
			getCount: true
		})
		.then(res => {
			//console.log(res);
			//如果没注册过，注册进去
			if (res.result.count == 0) {
				db.collection('user').add({
					u_id:'',
					u_openid:userInfo.openId,
					u_name:userInfo.nickName,
					u_face:userInfo.avatarUrl,
					u_random:'',
					u_integral:0,
					u_remainder:0,
					u_regtime:Math.round(new Date() / 1000) //使用的时间戳*/
					
				})
				.then((res)=>{
					//先缓存到内存里  checklogin里面不一定需要4个，可以只用一两个必要的
					//else //跳转页面，并获取图像网址  返回这些  或直接用(vuexx)，填到其中的变量里等
					uni.setStorageSync('state',"huiyuan");
					uni.setStorageSync('SUID', userInfo.openId + '');
					uni.setStorageSync('INTEGRAL',0+'');
					uni.setStorageSync('SNAME', userInfo.nickName + '');
					uni.setStorageSync('SFACE', userInfo.avatarUrl + '');
					uni.hideLoading(); //关闭login页面里的登录中
					uni.showToast({
						title: "登录成功"
					});
					
					if (options.backtype == 1) {
						uni.redirectTo({
						url: options.backpage
							});
					} else {
						uni.switchTab({
							url: options.backpage
						});
					}
				
				})
				.catch((err) => {
					uni.hideLoading();
					uni.showToast({
						title: "登录失败"
					});
					return false;
				})
			}
			else{
				uni.hideLoading();
				uni.showToast({
					title: "登录成功"
				});
				uni.setStorageSync('state',"huiyuan");
				uni.setStorageSync('SUID', userInfo.openId + '');
				uni.setStorageSync('INTEGRAL',res.result.data[0].u_integral+'');
				uni.setStorageSync('SNAME', userInfo.nickName + '');
				uni.setStorageSync('SFACE', userInfo.avatarUrl + '');
				if (options.backtype == 1) {
					uni.redirectTo({
					url: options.backpage
						});
				} else {
					uni.switchTab({
						url: options.backpage
					});
				}
			}


			
		})
}

const list = {
	db,
	ifrig
}

export default list
