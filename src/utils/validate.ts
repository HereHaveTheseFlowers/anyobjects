export function validateInput(input: any, inputName: string): boolean {
    if(!input) return false;

    let pattern = /(.?)+/


    switch(inputName) {
        case "objectmainimage":
            return true;
        case "objectpreviewimage":
            return true;
        case "objectname":
            pattern = /^.{1,50}$/
            break;
        case "objectbrand":
            pattern = /^.{1,50}$/
            break;
        case "objecturl":
            pattern = /^.{1,500}$/
            break;
        case "objectadditionalinfo":
            pattern = /^.{1,1000}$/
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
            console.log("cant validate " + field[1] + ' ' + field[0])
            return false;
        }
    }
    return true;
}
