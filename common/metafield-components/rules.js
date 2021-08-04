class Rules {
    rules = {
        namespace: {
            required: true,
        },
        key: {
            required: true,
        },
        type: {
            required: true,
        },
        valueType: {
            required: true,
        },
        value: {
            required: true,
        },
    }
    get() {
        return this.rules;
    }
    update(name,type) {
        this.rules[name] = { required: true }
        switch(type) {
            case 'email': 
                Object.assign(this.rules[name],{
                    email: true,
                })
                break;
            case 'number': 
                Object.assign(this.rules[name],{
                    numeric: true,
                    min: 2,
                    max: 10
                })
                break;
            case 'url': 
                Object.assign(this.rules[name],{
                    url: true,
                })
                break;
            case 'file': 
                Object.assign(this.rules[name],{
                    mimes: 'txt,doc,xlsx,xls,json',
                })
                break;
            case 'image': 
            case 'multiple_image': 
                Object.assign(this.rules[name],{
                    image: true,
                })
                break;
        }
        return this
    }
}
export default new Rules;
