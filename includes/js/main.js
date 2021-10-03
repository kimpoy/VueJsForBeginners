let app = Vue.createApp({
  data() {
    return {
      /* you can use any variable/s here */
      greeting: "Hello Vue 3!",
      isVisible: false,
      /* isVisible2: false, */
    };
  },

  methods: {
    toggleBox() {
      this.isVisible = !this.isVisible;
    },
    greet(greeting) {
      console.log(greeting);
    },
  },
});

//! CUSTOM-FORM COMPONENT
/* we're using v-model here to get the custom data */
app.component("custom-form", {
  template: `
        <form @submit.prevent="handleSubmit">
            <h1>{{ title }}</h1>
            <custom-input type="email" v-model="email"  :label="emailLabel"/>
            <custom-input type="password" v-model="password" v-bind:label="passwordLabel"/>
            <button> Log in </button>
        </form>
      `,
  /* components array so that the custom-form will know about the custom-input */
  components: ["custom-input"],
  data() {
    return {
      title: "Login Form",
      email: "",
      password: "",
      emailLabel: "Email",
      passwordLabel: "Password",
    };
  },

  methods: {
    handleSubmit() {
      console.log(this.email, this.password);
    },
  },
});

//! CUSTOM-INPUT COMPONENT
/*  the label must all the same in custom form(parent) and custom-input(child).
    we're using v-model here with the value of inputValue to get the data from v-model of custom-form by using getter and setter
    (we're using this because the label(props) in this custom-input(child) is inmmutable in custom-form(parent))
*/
app.component("custom-input", {
  template: `
        <label>
            {{ label }}
            <input type="text" v-model="inputValue">
        </label>
      `,
  /*  array of string, list of information pass down from custom-form component,
      props inshort for properties,
      in custom-form(parent) the v-model is a short hand and has a property of modelValue so when we use v-model we have access to modelValue
  */
  props: ["label", "modelValue"],

  computed: {
    inputValue: {
      get() {
        /* getting the value from custom-form */
        return this.modelValue;
      },
      set(value) {
        /* console.log(value); */
        /* method, emit events that other components can listen to, pass data around */
        this.$emit("update:modelValue", value);
      },
    },
  },

  /*   data() {
      return {
        inputValue: "",
      };
    }, */
});

app.mount("#app");
