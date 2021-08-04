import urlencode from 'urlencode'

const ENCODE_KEY = process.env.ENCODE_KEY || 'gbk'

const Encode = (string) => {
    return urlencode(string);
}

const Decode = (string) => {
    return urlencode.decode(string, ENCODE_KEY);
}

export {
    Encode, 
    Decode
}
