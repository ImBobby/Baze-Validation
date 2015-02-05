# Baze Validation


> Baze Validation is a library to run basic validation to form's input element


## Features
* Validate blank space
* Validate empty fields
* Validate email format ([RFC822 specification](http://www.w3.org/Protocols/rfc822/#z8))
* Validate numeric value
* Validate minimum and maximum input type number's value
* Accessibility enhancement

## Install

You can get the script via bower.
```
bower install baze-validation --save
```
or download from the [project release](https://github.com/ImBobby/Baze-Validation/releases).

### Dependencies

Baze Validation depends on 2 library:
- jQuery
- [sprintf.js](https://github.com/alexei/sprintf.js) by [Alexei](https://github.com/alexei)

So make sure to include those 2 libraries before hand.

```HTML
<script src="jquery.js"></script>
<script src="sprintf.js"></script>
<script src="baze.validation.js"></script>
```

## How to use

Given the markup

```HTML
<form>
    <label for="input1">Username</label>
    <input id="input1" type="text" required>
    
    <label for="input2">Password</label>
    <input id="input2" type="password" required>
    
    <label for="input3">Age</label>
    <input id="input3" type="number" min="18" max="28" required>
</form>
```

Initialize by doing

```Javascript
$('form').bazeValidate();
```


### Options

| Option  | Type  | Default  | Description  |
|---|---|---|---|
| classInvalid  | String  | 'form-input--error'  | Class to be added if input invalid  |
| classValid  | String  | 'form-input--success'  | Class to be added if input valid  |
| classMsg  | String  | 'form-msg-error'  | Class to be added to form message  |
| msgEmpty  | String  | 'This field is required.'  | Text to display if input is empty  |
| msgEmail  | String  | 'Invalid email address.'  | Text to display for invalid email address  |
| msgNumber  | String  | 'Input must be number.'  | Text to display if input value is not numeric  |
| msgExceedMin  | String  | 'Minimum number is %s.'  | Text to display if input type `number`'s value is less than minimum value specified by `min` attribute. `%s` is a placeholder to display the minimum value, so you can place it anywhere or even remove it.  |
| msgExceedMax  | String  | 'Maximum number is %s.'  | Text to display if input type `number`'s value is greater than maximum value specified by `max` attribute. `%s` is a placeholder to display the maximum value, so you can place it anywhere or even remove it.  |


### Destroy

To destroy Baze Validation instance

```Javascript
$('form').trigger('bazevalidate.destroy');
```

## How it works

1. **Attribute `novalidate` will be added to `<form>`** to prevent browser's form validation.
2. Baze Validation will validate all elements inside `<form>` that has `required` attribute. **Elements without `required` attribute (optional field) will be ignored**.
3. If a field does not pass, Baze Validation will add `form-input--error` class (customizable) and an error message with class `form-msg-error` (customizable) will be added after the element.
4. If pass, Baze Validation will add `form-input--success` to the input.


### Styling

Baze Validation doesn't offer any default styling if a field is valid or invalid, so the presentation is fully in your control.


## Browser support

IE8+ and modern browsers.
