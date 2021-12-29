<template>
    <div class="login-wrapper">
        <h2 class="login__header">Sign in</h2>
        <input type="text" name="login" placeholder="Login" v-model="login" />
        <input
            type="password"
            name="password"
            placeholder="Password"
            v-model="password"
        />
        <input
            type="submit"
            value="Sign in"
            @click="loginFunc(login, password)"
        />
        <p class="login__text">
            Don't have an account?
            <router-link class="link" to="/registration">Sign up</router-link>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            login: "",
            password: "",
        };
    },
    methods: {
        loginFunc(login, password) {
            const axios = require("axios");

            let data = JSON.stringify({
                login: login,
                password: password,
            });

            let config = {
                method: "post",
                url: "http://localhost:80/login",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    let token = response.data["value"];
                    document.cookie = "Auth-Token=" + token;
                    document.cookie = "path=" + login + "/";
                    alert("Successful login");
                    this.$router.push("/file");
                })
                .catch(function (error) {
                    console.log(error);
                    alert("Login or password is incorrect");
                });
        },
    },
};
</script>

<style  scoped>
.login-wrapper {
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login__header {
    margin-bottom: 30px;
}

.login__text {
    font-size: 16px;
}

.link {
    text-decoration: underline;
}

input {
    margin-bottom: 20px;
}
</style>