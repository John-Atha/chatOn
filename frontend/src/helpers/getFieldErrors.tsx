import { FormHelperText } from "@mui/material";

interface GetFieldErrorsProps {
    name: string,
    errors: any,
    touched: any,
}

export const getFieldErrors = ({ name, errors, touched }: GetFieldErrorsProps) => {
    if (Object.keys(errors).length) {
        const error = touched[name] && errors[name]?.length>0;
        const helperText = error ? errors[name] : " ";
        return { error, helperText }    
    }
    return { error: false, helperText: " " }
}

export const renderSelectHelperText = ({ name, errors, touched }: GetFieldErrorsProps) => {
    const { error, helperText } = getFieldErrors({ name, errors, touched });
    if (error) {
        return (
            <FormHelperText id={`${name}-helper-text`} error>
                {helperText}
            </FormHelperText>
        )
    }
    return null;
}