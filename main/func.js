import query from './database';
import dayjs from 'dayjs';
import { POINT_NAME, SIGN_POINT, REPEATED_SIGN, RES_STR, SEND_MSG_BODY } from '../config';
import { GetRandom } from './utils';
import { BotSendMsg } from './api';

export const UserSignIn = function (data, res) {
    let user = data.receivedName;
    let cbMsg = SEND_MSG_BODY;
    try {
        query('SELECT lastSignTime FROM wc_info WHERE uname = ' + user, (err, vals) => {
            if (err) {
                console.log('Select user lastSignTime err: ' + JSON.stringify(err));
            } else {
                let point = GetRandom(SIGN_POINT.MIN, SIGN_POINT.MAX);
                let lastTime = vals[0].lastSignTime;
                let nowTime = new Date();
                if (vals) {
                    if (dayjs(lastTime).isBefore(nowTime, 'day')) {
                        // 有记录，且在上次签到时间之后，签到并更新用户数据
                        let signMonthTimes = vals[0].signMonthTimes + 1;
                        if (dayjs(lastTime).isBefore(nowTime), 'month') {
                            signMonthTimes = 1;
                        }
                        // 保存签到记录，更新总签到次数，本月签到次数，总积分
                        let sql = `UPDATE wc_info SET signTimes=signTimes+1,signMonthTimes=${signMonthTimes},lastSignTime=now(),point=point+${point},update_datetime=now() WHERE uname='${user}' AND delete_flag = 0`;
                        query(sql, (error, value) => {
                            if (error) {
                                console.log('Update user sign err:' + JSON.stringify(error))
                            } else {
                                console.log(`Update user sign success!,user:${user},point:${point},time:${dayjs(nowTime).format('YYYY/MM/DD')}`);
                                cbMsg.list.receivedContent = `签到成功!\n获得: ${point} ${POINT_NAME}\n余额: ${vals[0].point} ${POINT_NAME}\n本月签到: ${vals[0].signMonthTimes}\n总签到: ${vals[0].signTimes}`;
                                cbMsg.list.atList.push(user);
                                BotSendMsg(cbMsg);
                            }
                        })
                    } else {
                        // 今天已签到
                        point = GetRandom(REPEATED_SIGN.MIN, REPEATED_SIGN.MAX);
                        let sql = `UPDATE wc_info SET point=point-${point},update_datetime=now() WHERE uname=${user} AND delete_flag = 0`;
                        query(sql, (error, value) => {
                            if (error) {
                                console.log('Update user sign err:' + JSON.stringify(error))
                            } else {
                                console.log(`Update user sign fail! user repeated sign,user:${user},point:-${point},time:${dayjs(nowTime).format('YYYY/MM/DD')}`);
                                cbMsg.list.receivedContent = `请勿重复签到!\n扣除: ${point} ${POINT_NAME}\n余额: ${vals[0].point} ${POINT_NAME}`;
                                cbMsg.list.atList.push(user);
                                BotSendMsg(cbMsg);
                            }
                        })
                    }
                } else {
                    // 没有记录，签到并保存用户信息
                    let sql = `INSERT INTO wc_info(uname,signTimes,ignMonthTimes,lastSignTime,point,update_datetime) VALUES(${user},1,1,now(),${point},now()})`;
                    query(sql, (error, value) => {
                        if (error) {
                            console.log('Save user sign err:' + JSON.stringify(error))
                        } else {
                            console.log(`Save user sign success!,user:${user},point:${point},time:${dayjs(nowTime).format('YYYY/MM/DD')}`);
                            cbMsg.list.receivedContent = `签到成功!\n获得: ${point} ${POINT_NAME}\n余额: ${point} ${POINT_NAME}\n本月签到: 1\n总签到: 1`;
                            cbMsg.list.atList.push(user);
                            BotSendMsg(cbMsg);
                        }
                    })
                }
            }
            res.send(RES_STR);
        })
    } catch (error) {
        let errorId = Math.ceil(new Date().getTime() / 1000);
        console.log('ERR[' + errorId + ']:Save User Sign Fail:' + JSON.stringify(error))
        cbMsg.list.receivedContent = '签到错误,请检查日志。ErrorId:' + errorId;
        cbMsg.list.atList.push(user);
        BotSendMsg(cbMsg);
        res.send(RES_STR);
    }
}


export const GetGroupRanking = function (data, res) {
    let user = data.receivedName;
    let cbMsg = SEND_MSG_BODY;
    try {
        query('SELECT uname,point FROM wc_info ORDER BY point LIMIT 0,10', (err, vals) => {
            if (error) {
                console.log('Get group ranking err:' + JSON.stringify(error))
            } else {
                console.log(`Get group ranking success! time:${dayjs(nowTime).format('YYYY/MM/DD')}`);
                let msg = `当前${POINT_NAME}前10榜:\n`;
                for (let i = 0; i < vals.length; i++) {
                    msg += `${i + 1}: ${vals[i].uname},拥有${POINT_NAME}:[${vals[i].point}]`
                }
                cbMsg.list.receivedContent = msg;
                cbMsg.list.atList.push(user);
                BotSendMsg(cbMsg);
            }
            res.send(RES_STR);
        })
    } catch (error) {
        let errorId = Math.ceil(new Date().getTime() / 1000);
        console.log('ERR[' + errorId + ']:Get Group Ranking Fail:' + JSON.stringify(error))
        cbMsg.list.receivedContent = '查询错误,请检查日志。ErrorId:' + errorId;
        cbMsg.list.atList.push(user);
        BotSendMsg(cbMsg);
        res.send(RES_STR);
    }
}