# Baze Validation


> Baze Validation is a library to run basic validation to form's input element


## Features
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
    
    <label for="input2">Email</label>
    <input id="input2" type="email" required>
    
    <label for="input3">Age</label>
    <input id="input3" type="number" required>
</form>
```

Initialize by doing

```Javascript
$('form').bazeValidate({
    classInvalid    : 'form-input--error',
    classValid      : 'form-input--success',
    classMsg        : 'form-msg-error',
    msgEmpty        : 'This field is required.',
    msgEmail        : 'Invalid email address.',
    msgNumber       : 'Input must be number.',
    msgExceedMin    : 'Minimum number is %s.',
    msgExceedMax    : 'Maximum number is %s.'
});
```


### Options

#### classInvalid
* Type: **String**
* Default: **form-input--error**
* Description: Class to be added if input invalid

-

#### classValid
* Type: **String**
* Default: **form-input--success**
* Description: Class to be added if input valid

-

#### classMsg
* Type: **String**
* Default: **form-msg-error**
* Description: Class to be added to form message

-

#### msgEmpty
* Type: **String**
* Default: **This field is required.**
* Description: Text to display if input is empty

-

#### msgEmail
* Type: **String**
* Default: **Invalid email address.**
* Description: Text to display for invalid email address

-

#### msgNumber
* Type: **String**
* Default: **Input must be number.**
* Description: Text to display if input value is not numeric

-

#### msgExceedMin
* Type: **String**
* Default: **Minimum number is %s.**
* Description: Text to display if input type number's value is less than minimum value specified by min attribute. %s is a placeholder to display the minimum value, so you can place it anywhere or even remove it.

-

#### msgExceedMax
* Type: **String**
* Default: **Maximum number is %s.**
* Description: Text to display if input type number's value is greater than maximum value specified by max attribute. %s is a placeholder to display the maximum value, so you can place it anywhere or even remove it.


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

* IE8+
* Chrome 14+
* Firefox 10+
* Safari 5+
* Opera 11.1
* iOS 5.1+
* Android 2.2+