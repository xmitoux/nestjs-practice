module.exports = {
    env: {
        es2021: true,
        jest: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'import', 'sort-keys-fix', 'typescript-sort-keys', 'unused-imports'],
    root: true,
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        'array-callback-return': ['error', { checkForEach: true }],
        'import/no-duplicates': 'error',
        'import/order': [
            'warn',
            {
                alphabetize: {
                    order: 'asc',
                },
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
                'newlines-between': 'always',
            },
        ],
        'sort-keys-fix/sort-keys-fix': 'warn',
        'typescript-sort-keys/interface': 'warn',
        'unused-imports/no-unused-imports': 'warn',
    },
};
