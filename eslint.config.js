import jsdoc from 'eslint-plugin-jsdoc';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';

const commonSettings = {
    mode: "typescript",
    ignorePrivate: true,
    ignoreInternal: true,
};

const customVuePlugin = {
    rules: {
        "strict-vue-docs": {
            meta: { type: "problem" },
            create(context) {
                return {
                    // 1. Regla global: Exigir @description en todos los bloques JSDoc
                    Program() {
                        const sourceCode = context.sourceCode || context.getSourceCode();
                        const comments = sourceCode.getAllComments();

                        comments.forEach(comment => {
                            if (comment.type === "Block" && comment.value.startsWith("*")) {
                                if (!comment.value.includes("@description")) {
                                    context.report({
                                        loc: comment.loc,
                                        message: "El bloque de documentación debe contener la etiqueta @description."
                                    });
                                }
                            }
                        });
                    },
                    // 2. Regla para validar parámetros en tuplas de defineEmits
                    "CallExpression[callee.name='defineEmits'] TSPropertySignature"(node) {
                        if (node.typeAnnotation?.typeAnnotation?.type === "TSTupleType") {
                            const sourceCode = context.sourceCode || context.getSourceCode();
                            const comments = sourceCode.getCommentsBefore(node);
                            const jsdoc = comments.find(c => c.type === "Block" && c.value.startsWith("*"));

                            if (jsdoc) {
                                const elements = node.typeAnnotation.typeAnnotation.elementTypes;
                                const hasAnyParam = jsdoc.value.includes("@param");

                                if (elements.length > 0 && !hasAnyParam) {
                                    context.report({
                                        node,
                                        message: "Falta la etiqueta @param en la documentación del emit."
                                    });
                                    return;
                                }

                                elements.forEach(el => {
                                    if (el.type === "TSNamedTupleMember" && el.label) {
                                        const expectedName = el.label.name;
                                        const paramRegex = new RegExp(`@param\\s+${expectedName}\\b`);
                                        if (!paramRegex.test(jsdoc.value)) {
                                            context.report({
                                                node,
                                                message: `El parámetro '${expectedName}' de la tupla no coincide o falta en el @param.`
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    }
                };
            }
        }
    }
};

export default [
    {
        ignores: ["eslint.config.js"]
    },
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
            tsdoc: tsdocPlugin,
            "custom-vue": customVuePlugin
        },
        rules: {
            "jsdoc/require-asterisk-prefix": "error",

            // Activación de la regla estricta consolidada
            "custom-vue/strict-vue-docs": "error",

            "jsdoc/require-param": ["error", {
                contexts: [
                    "FunctionDeclaration",
                    "MethodDefinition",
                    "ArrowFunctionExpression",
                    "FunctionExpression",
                    "TSMethodSignature"
                ]
            }],
            "jsdoc/check-param-names": ["error", {
                checkDestructured: false,
                enableFixer: false
            }],
            "jsdoc/require-param-description": ["error", {
                contexts: [
                    "FunctionDeclaration",
                    "MethodDefinition",
                    "ArrowFunctionExpression",
                    "FunctionExpression",
                    "TSMethodSignature"
                ]
            }],

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
                    "CallExpression[callee.name='defineEmits'] TSPropertySignature",
                    "VariableDeclaration:has(CallExpression[callee.name='computed'])"
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