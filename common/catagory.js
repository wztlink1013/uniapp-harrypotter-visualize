//加载文章分类

const db = uniCloud.database();

let loadClass=function(pid=0){
	//let res1;
	if(!pid){ //没传过来了pid（使用默认0）
		//查询所有
		db.collection("catagories").get()  //获取全部
		.then(res=>{
			console.log(res);
			//结果要转换成一个数组

			return res;
		})
		}
	else{
		db.collection("catagories")
		.where({
			pid:pid	 //获取指定类的
		})
		.get()
		.then(res=>{
			console.log(res);
			//结果要转换成一个数组
			return res;
		})
	}

}
//应该是res.result.data  里面{"0":{},"1":{}}

const list = {  //理解为公有（对外不封装，不export得就是封装）
		loadClass
	}

export default list