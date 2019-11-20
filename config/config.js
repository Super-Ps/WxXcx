// 服务器域名
const baseUrl = 'https://tms.dp12306.com';

//获取openId
const getOpenId = baseUrl + '/tms-web/gateway/wechat/getOpenId.do';
//绑定接口
const bind = baseUrl + '/tms-web/gateway/wechat/bind.do';
//充值(押金)接口
const deposit = baseUrl + '/tms-web/gateway/wechat/deposit.do';
//下单接口
const order = baseUrl + '/tms-web/gateway/wechat/order.do';
//订单查询接口
const orderList = baseUrl + '/tms-web/gateway/wechat/orderList.do';




module.exports = {
	getOpenId: 		getOpenId,
	bind: 		bind,
	deposit: 		deposit,
	order: 			order,
	orderList: 	orderList,
};


