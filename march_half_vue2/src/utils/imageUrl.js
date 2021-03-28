export function changeImageUrl (name) {
    if (name.indexOf('-') > -1) {
        return 'https://6d61-march-half-9g5lt2qy94c600b9-1305397103.tcb.qcloud.la/' + name;
    } else if (name.indexOf('http') > -1 || name.indexOf('https') > -1) {
        return name;
    } else {
        return '../../../../march_half_wx/pages/image/'+name;
    }
}

