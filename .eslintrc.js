module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'plugin:vue/base'
    ],
    plugins: [
        'vue'
    ],
    rules: {
        // "indent": ["error", 4],
        "semi": [2, "always"], //语句强制分号结尾
        "semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
        "no-unused-vars": ['error', {"vars":"all","args":"none"}],
        "no-extra-parens": 2,
        "no-extra-semi": 2,
        "linebreak-style": [0, "unix"],
        "no-multiple-empty-lines": [1, {"max": 2}],
        "vue/script-indent": ['error', 4, {'baseIndent': 1}],
        "vue/html-indent": ['warn', 4],
        "vue/html-self-closing": "off",
        "vue/no-parsing-error": [2, {
            "x-invalid-end-tag": false
        }],

    },
    // overrides: [{
    //     'files': ['*.vue'],
    //     'rules': {'indent': 'off'}
    // }]
};
