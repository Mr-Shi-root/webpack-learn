module.exports = {
    plugins: [
        require('autoprefixer')({
            overrideBrowserslist: [
                "Android >= 4",
                "iOS >= 5",
                "ie > 8"
            ]
        })
        // postcss-import 需配登在该插件前
    ]
}