<template>
    <header-component> </header-component>
    <router-view />
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";

export default {
    name: "App",
    components: {
        HeaderComponent,
    },
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

h1 {
    font-size: 28px;
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

.modal-shadow {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.39);
}

.modal {
    background: #fff;
    padding: 15px;
    min-width: 420px;
    max-width: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
}

.modal-close {
    position: absolute;
    top: 17px;
    right: 17px;
    padding: 3px;
}

.modal-close:hover {
    background: #d4d1d1;
}

.modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.modal-content__header {
    margin-bottom: 30px;
}
</style>
