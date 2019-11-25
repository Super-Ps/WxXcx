// 服务器域名
const baseUrl = 'https://tms.xuanyutech.net';  // http://192.168.1.103:8090   https://tms.xuanyutech.net'

//获取openId
const getOpenId = baseUrl + '/tms-web/gateway/wechat/getOpenId.do'; // /gateway/wechat/getOpenId.do  /tms-web/gateway/wechat/getOpenId.do
//绑定接口
const bind = baseUrl + '/tms-web/gateway/wechat/bind.do'; // /tms-web/gateway/wechat/bind.do    /gateway/wechat/bind.do
//充值(押金)接口
const deposit = baseUrl + '/tms-web/gateway/wechat/deposit.do';  // /tms-web/gateway/wechat/deposit.do   /gateway/wechat/deposit.do
//下单接口
const order = baseUrl + '/tms-web/gateway/wechat/order.do'; // /tms-web/gateway/wechat/order.do   /gateway/wechat/order.do
//订单查询接口
const orderList = baseUrl + '/tms-web/gateway/wechat/orderList.do ';  // /tms-web/gateway/wechat/orderList.do  /gateway/wechat/orderList.do
// 通过 查询日期，站点，获取查询列表
const selectOlder = baseUrl + '/tms-web/gateway/wechat/seat/query.do?fromStation ' // /tms-web/gateway/wechat/seat/query.do?fromStation   /gateway/wechat/seat/query.do?fromStation





module.exports = {
	getOpenId: 		getOpenId,
	bind: 		bind,
	deposit: 		deposit,
	order: 			order,
	orderList: 	orderList,
	selectOlder : selectOlder
	
};


