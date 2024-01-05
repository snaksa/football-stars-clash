module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "standard-with-typescript",
    "overrides": [],
    "ignorePatterns": ["*.d.ts"],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        tsconfigRootDir: './',
        project: ['./tsconfig.json']
    },
    "rules": {
        "semi": ["error", "always"],
        "@typescript-eslint/semi": ["off"],
        "quotes": ["error", "single"],
    }
}
