var dayjs = require('dayjs');

exports.getDate = () => {
    const now = dayjs();
    let start = dayjs(now).format('YYYY-MM-DDTHH:mm');
    start = toSGFormat(start);
    
    const plus6Hours = dayjs().add(6, 'hour');
    let end = dayjs(plus6Hours).format('YYYY-MM-DDTHH:mm');
    end = toSGFormat(end);
    
    return {start, end};
}

function toSGFormat(date) {
    return date.split('').map(elt => {
        if(elt === ':') return '%3A';
        return elt;
    }).join('');
}


exports.formatTime = (time) => {
    //return dayjs(time).format('HH:mm');
    return time.split('').splice(11, 5).join('');
}