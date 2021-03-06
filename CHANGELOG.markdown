# Changelog

# 1.2.0

* Add `onValidating` callback function #15
* Remove sprintf dependency #12

# 1.1.0

* Add `onValidated` callback function #13
* Ignore disabled input #14

## 1.0.2

* Fix addMessage function removing existing message [#11](https://github.com/ImBobby/Baze-Validation/pull/11)
* Code optimization

## 1.0.1

* Fix first invalid input not focused if no input type `number` [#9](https://github.com/ImBobby/Baze-Validation/issues/9)

## 1.0.0

* Complete rewrite
* Api changes
* Add destroy method

## 0.7.0

Improve accessibility by adding:
* `aria-required` to each required field
* `aria-invalid` to each invalid field and
* Set unique ID to each error message and reference it by `aria-describedBy` 

## 0.6.1

* Set return value to `true` for each return early validation.
* remove unused comment.

## 0.6.0

* Set custom message and class via options

## 0.5.0

* Add number validation

## 0.4.2

* Use $.trim() instead of Javascript String trim() to fix IE8 not supporting native trim().

## 0.4.1

* Validate for blank space value.

## 0.4.0

* Add email validation.
* Code refactoring.

## 0.3.0

* Set focus to the first invalid input.

## 0.2.0

* Add form message after invalid inputs.

## 0.1.1

* Fix remove class issue.

## 0.1.0

* Initial release.