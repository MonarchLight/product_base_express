const env = {
    NODE_ENV: 'development',
}

module.exports = {
    apps: [
        {
            env,
            name: 'product_base',
            script: './server.js',
            watch: false,
            instances: 1,
            exec_mode: 'fork',
            time: false
        }
    ]
}