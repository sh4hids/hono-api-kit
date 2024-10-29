/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    importOrder: ['<THIRD_PARTY_MODULES>', '^@lib/(.*)$', '^[./]'],
    plugins: ['@trivago/prettier-plugin-sort-imports'],
};

export default config;
