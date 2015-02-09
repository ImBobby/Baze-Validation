# Baze Validation


> Baze Validation is a library to run basic form validation


## Features
* Validate empty fields (including black space)
* Validate email format ([RFC822 specification](http://www.w3.org/Protocols/rfc822/#z8))
* Validate numeric value with optional minimum and maximum value
* Accessibility enhancement

## Install

You can get a fresh copy of Baze Validation via [bower](http://bower.io/).
```
bower install baze-validation --save
```
or you can [download the zip file](https://github.com/ImBobby/Baze-Validation/archive/master.zip).

### Dependencies

Baze Validation depends on 2 libraries:
- jQuery
- [sprintf.js](https://github.com/alexei/sprintf.js) by [Alexei](https://github.com/alexei)

So make sure to include those 2 libraries before Baze Validation

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

For quick initialization using default options

```Javascript
$('form').bazeValidate();
```

Or you can pass options to suit your needs

```Javascript
$('form').bazeValidate({
    classInvalid    : 'input-invalid',
    classValid      : 'input-valid',
    classMsg        : 'msg-error',
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
* Default: **input-invalid**
* Description: Class to be added to invalid input

-

#### classValid
* Type: **String**
* Default: **input-valid**
* Description: Class to be added to valid input

-

#### classMsg
* Type: **String**
* Default: **msg-error**
* Description: Class to be added to form error message

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
3. If a field does not pass, Baze Validation will add `input-invalid` class (customizable) and an error message with class `msg-error` (customizable) will be added after the element.
4. If pass, Baze Validation will add `input-valid` to the input.


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