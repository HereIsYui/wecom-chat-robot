import { createPool } from 'mysql';

var pool = createPool({
    host: '',
    user: '',
    password: '',
    database: '',
    port: 3306
});
var query = function (sql, callback = () => { }) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function (qerr, vals, fields) {
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr, vals, fields);
            });
        }
    });
};
export default query;