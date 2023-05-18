const redis_auth = {
    username: 'default', 
    password: 'passwd', 
    socket: {
        host: 'redis',
        port: 6379,
        tls: false
        //key: readFileSync('./redis_user_private.key'),
        //cert: readFileSync('./redis_user.crt'),
        //ca: [readFileSync('./redis_ca.pem')]
    }
}

export default redis_auth;