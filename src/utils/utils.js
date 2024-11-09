import moment from 'moment';

export function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    let match;

    match = cleaned.match(/^(0?800)(\d{3})(\d{4})$/);
    if (match) {
        if (match[1].length === 4) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        } else {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }
        
    } else if (cleaned.length === 11) {
        match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }

    } else if (cleaned.length === 10) {
        match = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
    }
    return phoneNumber;
}

export function formatDate(dateValue, format) {
    return moment.utc(dateValue).locale('pt-br').format(format);
}

export function returnDate(dateValue, format) {
    var dateMomentObject = moment(dateValue, format);
    return dateMomentObject.toDate();
}