export function validateInput(input: any, inputName: string): boolean {
    if(!input) return false;

    let pattern = /(.?)+/

    switch(inputName) {
        case "objectmainimage":
            if(input.name) {
                return true;
            } else {
                return false;
            }
        case "objectpreviewimage":
            if(input.name) {
                return true;
            } else {
                return false;
            }
        case "objectname":
            pattern = /^.{1,20}$/
            break;
        case "objectbrand":
            pattern = /^.{1,20}$/
            break;
        case "objecturl":
            pattern = /^.{1,60}$/
            break;
        case "objectadditionalinfo":
            return true;
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
