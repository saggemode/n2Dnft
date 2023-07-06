import {

  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
const TextInput = ({
  fieldName,
  label,
  register,
  type,
  errors,
  placeHolder,
  isRequired,
  maximLength,
  minimLength,
  isPattern,
  onChange,
  helper,
  isInvalid,
}) => {
  return (
    <FormControl marginTop="8" isRequired={isRequired} isInvalid={isInvalid}>
      {label && <FormLabel htmlFor="input-field">{label}</FormLabel>}
      <Input
        placeholder={placeHolder}
        onChange={onChange}
        type={type}
        {...register(fieldName, {
          required: {
            value: isRequired,
            message: "This is required",
          },
          maxLength: {
            value: maximLength,
            message: `Value must be maximum ${maximLength}`,
          },
          minLength: {
            value: minimLength,
            message: `Value must be minimum ${minimLength}`,
          },
          pattern: {
            value: isPattern,
            message: "Please enter valid email",
          },
        })}
      />

      {/* <p>{errors[fieldName] && errors[fieldName].message} </p> */}
      {helper && <FormHelperText htmlFor="text">{FormHelperText}</FormHelperText>}
      {errors && (
        <FormErrorMessage  htmlFor="errors">{FormErrorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default TextInput;
