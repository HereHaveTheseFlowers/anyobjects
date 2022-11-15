export function validateInput(input: any, inputName: string): boolean {
    if(!input) return false;
    return true;
}

export function validateForm(formData: FormData): boolean {
    if(!formData) return false;
    for(const field of formData) {
        if(!validateInput(field[1], field[0])) {
            return false;
        }
    }
    return true;
}
