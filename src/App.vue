<template>
    <router-view />
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
* {
    padding: 0;
    margin: 0;
    border: 0;
}

*,
*:before,
*:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

:focus,
:active {
    outline: none;
}

a:focus,
a:active {
    outline: none;
}

nav,
footer,
header,
aside,
section {
    display: block;
}

html,
body {
    height: 100%;
    width: 100%;
}

body {
    line-height: 1;
    font-size: 14px;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
}

input,
button,
textarea {
    font-family: inherit;
}

input::-ms-clear {
    display: none;
}

button {
    cursor: pointer;
}

button::-moz-focus-inner {
    padding: 0;
    border: 0;
}

a,
a:visited {
    text-decoration: none;
}

a:hover {
    text-decoration: none;
}

ul li {
    list-style: none;
}

img {
    vertical-align: top;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: inherit;
    font-weight: inherit;
}

button {
    border: 1px black solid;
    width: 250px;
    height: 25px;
    font-size: 16px;
}

input {
    border: 1px black solid;
    width: 250px;
    height: 25px;
    font-size: 16px;
}

h2 {
    font-size: 24px;
}

h3 {
    font-size: 20px;
}

textarea {
    border: 1px black solid;
    font-size: 16px;
    width: 300px;
}
</style>
