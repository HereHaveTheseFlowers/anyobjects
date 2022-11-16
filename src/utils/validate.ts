export function validateInput(input: any, inputName: string): boolean {
    if(!input) return false;

    let pattern = /(.?)+/
    switch(inputName) {
        case "objectname":
            pattern = /^.{1,20}$/
            break;
        case "objectbrand":
            pattern = /^.{1,20}$/
            break;
        case "objecturl":
            pattern = /^.{1,60}$/
            break;
    }

    if(pattern.test(input)) {
        return true;
    } else {
        return false;
    }
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
