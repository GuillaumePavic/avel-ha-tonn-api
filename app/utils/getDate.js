var dayjs = require('dayjs');

module.exports = () => {
    const now = dayjs();

    let date = dayjs(now).format('YYYY-MM-DDTHH:mm');
    
    date = date.split('').map(elt => {
        if(elt === ':') return '%3A';
        return elt;
    }).join('');

    return date;
}
