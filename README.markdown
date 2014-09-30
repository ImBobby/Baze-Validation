# Baze Validation


> Validate your form with ease using Baze Validation

Baze Validation will validate:
* Blank space value
* Empty fields
* Email format
* More to come

## Install

You can get the script via bower.
```
bower install baze-validation --save
```
or download from the [project release](https://github.com/ImBobby/Baze-Validation/releases).

It depends on jQuery so make sure include it after jQuery.

```HTML
<script src="jquery.js"></script>
<script src="baze.validation.js"></script>
```

## How to use

Add attribute `data-baze-validate` to the `<form>` element and `required` attribute to each input field that need to be validated.

```HTML
<form data-baze-validate>
    <label for="username">Username</label>
    <input id="username" type="text" required>

    <label for="email">Email</label>
    <input id="email" type="email" required>
</form>
```

BazeValidate will be exposed to global. Then init the plugin by calling `run` function.

```Javascript
BazeValidate.run();
```

Any input fields with `required` attribute, will be automatically validated for blank space and empty value. Field with input type `email` will be automatically validated for email format.

## How it works

Baze Validation will listen on form submit event. When a form is submitted:

1. Iterate for each input fields.
2. If field is invalid, class **form-input--error** will be added. A message will be placed after the field with class **form-msg-error**.
3. If field is valid, class **form-input--success** will be added. No message will be added.

Baze validation has no default styling so it is up to you how you want to style it.

## API

Baze Validation expose these APIs

| API   | Description  |
|---|---|
| `run()`  | Trigger Baze Validation  |
| `setErrorClass( string )`  | set class name for invalid fields. default: **form-input--error**   |
| `setSuccessClass( string )`  | set class name for valid fields. default: **form-input--success**   |
| `setMsgClass( string )`  | set class name for form message. default: **form-msg-error**   |


## TODO

- [ ] Add number validation
- [ ] Set custom message
