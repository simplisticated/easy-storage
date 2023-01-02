<p align="center">
    <a href="https://nodejs.org">
        <img src="https://img.shields.io/badge/Created for-Node.js-teal.svg?style=flat">
    </a>
    <a href="https://www.typescriptlang.org">
        <img src="https://img.shields.io/badge/Written in-TypeScript-purple.svg?style=flat">
    </a>
    <a href="https://tldrlegal.com/license/mit-license">
        <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat">
    </a>
</p>

## At a Glance

**easyStorage** is a library that solves known issues of JavaScript's `localStorage` and `sessionStorage`.

When you use `localStorage`, you can read and write only string values. With this library, you can use any type of data including numbers, boolean values, JSON objects, etc. Sounds amazing, right? :)

## How to Get Started

Type in Terminal:

```
npm install --save @simplisticated/easy-storage
```

or, if you prefer **yarn** over **npm**, type:

```
yarn add @simplisticated/easy-storage
```

Then add import instruction to your code:

```typescript
import { S } from '@simplisticated/easy-storage'
```

## Requirements

Basic knowledge of TypeScript and NPM.

## Usage

**easyStorage** uses both `localStorage` and `sessionStorage` under the hood. The main idea is to keep everything simple yet functional.

### How to Read

From local storage:

```typescript
const firstName = S.local.get("first-name")
```

From session storage:

```typescript
const firstName = S.session.get("first-name")
```

### How to Write

To local storage:

```typescript
S.local.set("first-name", "John")
```

To session storage:

```typescript
S.session.set("first-name", "John")
```

Unlike the traditional `localStorage` and `sessionStorage` that accept only string values, you can set value of any type here:

```typescript
// JSON
S.local.set("profile", {
    firstName: "John",
    lastName: "Appleseed",
    social: {
        reddit: "http://reddit.com/..."
    }
})

// number
S.local.set("click-count", 20)

// boolean
S.local.set("is-verified", true)
```

### Timing

You can get the timestamp of the last change:

```typescript
const timestamp = S.local.updatedOn("profile")
```

Then you can easily convert this timestamp to `Date` object:

```typescript
const date = new Date(timestamp)
```

## License

**easyStorage** is available under the MIT license. See the [LICENSE](./LICENSE) file for more info.
