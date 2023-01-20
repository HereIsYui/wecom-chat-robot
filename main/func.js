import query from './database';
import dayjs from 'dayjs';
import { POINT_NAME, SIGN_POINT, REPEATED_SIGN, RES_STR, SEND_MSG_BODY } from '../config';
import { GetRandom } from './utils';

export const UserSignIn = function (data, res) {
    let user = data.receivedName;
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
                            console.log(`Update user sign success!,user:${user},point:${point},time:${dayjs(nowTime).format('YYYY/MM/DD')}`)
                        }
                    })
                    res.send(RES_STR);
                } else {
                    // 今天已签到
                    point = GetRandom(REPEATED_SIGN.MIN, REPEATED_SIGN.MAX);
                    let sql = `UPDATE wc_info SET point=point-${point},update_datetime=now() WHERE uname=${user} AND delete_flag = 0`;
                    query(sql, (error, value) => {
                        if (error) {
                            console.log('Update user sign err:' + JSON.stringify(error))
                        } else {
                            console.log(`Update user sign fail! user repeated sign,user:${user},point:-${point},time:${dayjs(nowTime).format('YYYY/MM/DD')}`)
                        }
                    })
                    res.send(RES_STR);
                }
            } else {
                // 没有记录，签到并保存用户信息

            }
        }
    })
}
