// Shim for @graphql-typed-document-node/core (types-only package)
// This package is types-only with no runtime code, so we provide both type and value exports
export type TypedDocumentNode<Result = any, Variables = any> = any;
export const TypedDocumentNode = undefined;
