---
outline: [2,3]
---

# Introduction

a react wrapper for [foliate-js](https://github.com/johnfactotum/foliate-js) - library for rendering e-books in the browser

## Installation

::: code-group

```sh [npm]
npm install react-book-reader --save
```

```sh [pnpm]
pnpm add react-book-reader --save
```

:::

## Basic Usage

And in your react-component...

<demo react="../demos/demo.tsx" />

## Different Builds

|       **Module**        |       **Filename**        |
| ----------------------- | ------------------------- |
|    UMD(for browsers)    | react-book-reader.umd.js  |
|        CommonJS         | react--book-reader.cjs.js |
| ES Module(for bundlers) | react--book-reader.es.js  |

<style>

## ReactReader Attributes

| **Name** | **Description**                   | **Type**               | **Default** |
| -------- | --------------------------------- | ---------------------- | ----------- |
| url      | book url or File                  | `string`/`File`        | —           |
| location | set / update location of the book | `string`/`number`      | —           |
| title    | the title of the book             | `string`               | —           |
| showToc  | whether to show the toc           | `boolean`              | true        |


## ReactReader props passed to inner BookView

| **Name**    | **Description**                           | **Type**                          | **Default**      |
| ----------- | ----------------------------------------- | --------------------------------- | ---------------- |
| url         | book url or File                          | `string`/`File`                   |                  |
| tocChanged  | when the reader has parsed the book you will receive an array of the chapters | `function(toc)`  |
| nextPage    | display  next page                                                            | `function`       |
| prevPage    | display  previous page                                                        | `function`       |
| setLocation | Set the page                                                                  | `function(href)` |
| LoadingView | if you want to customize the LoadingView                                      | `element`        |
| ErrorView   | if you want to customize the ErrorView                                        | `element`        |

html:focus-within {
  scroll-behavior: smooth;
}
</style>
