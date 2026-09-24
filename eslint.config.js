import jsdoc from 'eslint-plugin-jsdoc';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';

const commonSettings = {
    mode: "typescript",
    ignorePrivate: true,
    ignoreInternal: true,
    ignoreParsingErrors: true
};

export default [
    {
        files: ["**/*.js", "**/*.ts", "**/*.vue"],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                sourceType: "module",
                ecmaVersion: 2022,
                extraFileExtensions: [".vue"]
            }
        },
        plugins: {
            jsdoc,
            tsdoc: tsdocPlugin
        },
        rules: {
            "tsdoc/syntax": "error",
            "jsdoc/require-asterisk-prefix": "error",

            // 1. Validaciones estrictas de parámetros
            "jsdoc/require-param": ["error", {
                contexts: [
                    "FunctionDeclaration",
                    "MethodDefinition",
                    "ArrowFunctionExpression",
                    "FunctionExpression"
                ]
            }],
            "jsdoc/check-param-names": ["error", {
                checkDestructured: false
            }],
            "jsdoc/require-param-description": "error",

            "jsdoc/require-jsdoc": ["error", {
                require: {
                    FunctionDeclaration: true,
                    MethodDefinition: true,
                    ClassDeclaration: true,
                    ArrowFunctionExpression: true,
                    FunctionExpression: true
                },
                contexts: [
                    "TSInterfaceDeclaration",
                    "TSTypeAliasDeclaration",
                    "VariableDeclaration:has(CallExpression[callee.name='defineProps'])",
                    "VariableDeclaration:has(CallExpression[callee.name='defineEmits'])",
                    "VariableDeclaration:has(CallExpression[callee.name='computed'])"
                ]
            }],

            // 2. Descripción obligatoria sin exenciones
            "jsdoc/require-description": ["error", {
                exemptedBy: [],
                contexts: [
                    "TSInterfaceDeclaration",
                    "TSTypeAliasDeclaration",
                    "VariableDeclaration:has(CallExpression[callee.name='defineProps'])",
                    "VariableDeclaration:has(CallExpression[callee.name='defineEmits'])",
                    "VariableDeclaration:has(CallExpression[callee.name='computed'])",
                    "FunctionDeclaration",
                    "MethodDefinition",
                    "ClassDeclaration",
                    "ArrowFunctionExpression",
                    "FunctionExpression"
                ]
            }],

            "jsdoc/match-description": ["error", {
                matchDescription: "^[A-Z][a-zA-Z0-9,.'\"\\- \\(\\)\\n\\r]*$"
            }]
        },
        settings: {
            jsdoc: commonSettings
        }
    }
];