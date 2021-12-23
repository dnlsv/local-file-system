<template>
    <div class="registration-wrapper">
        <h2 class="registration__header">Sign up</h2>
        <input
            type="text"
            name="firstName"
            placeholder="First name"
            v-model="firstName"
        />
        <input
            type="text"
            name="lastName"
            placeholder="Last name"
            v-model="lastName"
        />
        <input type="text" name="login" placeholder="Login" v-model="login" />
        <input
            type="password"
            name="password"
            placeholder="Password"
            v-model="password"
        />
        <input
            type="submit"
            value="Sign up"
            @click="registration(firstName, lastName, login, password)"
        />
        <p class="registration__text">
            Have an account?
            <router-link class="link" to="/">Sign in</router-link>
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            login: "",
            password: "",
        };
    },
    methods: {
        registration(firstName, lastName, login, password) {
            const axios = require("axios");

            let data = JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                login: login,
                password: password,
            });

            let config = {
                method: "post",
                url: "http://localhost:80/registration",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };

            axios(config)
                .then((response) => {
                    let login = response.data["login"];
                    console.log(login);
                    alert("Registration completed successfully");
                    this.$router.push("/");
                })
                .catch(function (error) {
                    console.log(error);
                    alert("Login already exists");
                });
        },
    },
};
</script>

<style  scoped>
.registration-wrapper {
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.registration__header {
    font-size: 24px;
    margin-bottom: 30px;
}

input {
    border: 1px black solid;
    width: 250px;
    height: 25px;
    margin-bottom: 20px;
    font-size: 16px;
}

.registration__text {
    font-size: 16px;
}

.link {
    text-decoration: underline;
}
</style>