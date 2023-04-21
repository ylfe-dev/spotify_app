export const  randomString = length => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


export const wwwFormURL = (object)=>{
  let encoded = "";
  const keys = Object.keys(object);
  encoded += encodeURI(keys[0]) + "=" + encodeURI(object[keys[0]]);
  for (let i=1; i < keys.length; i++) {
    encoded += "&" + encodeURI(keys[i]) + "=" + encodeURI(object[keys[i]]);
  }
  return encoded;
}
