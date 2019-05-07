/**
 *
 * @param {Promise} p
 */
export function wrapAjaxToPromise (p) {
    return p.then((response) => {
        if (response.data.code == 200) {
            return {
                success: true,
                data: response.data.data
            };
        }
        return {
            success: false,
            data: response.data.message,
            // message: response.data.message
            message: 'response.data.message'
        };
    }, (response) => {
        console.log(response);
        return {
            success: false,
            data: response
        };
    });
}

/**
 *
 * @param {Object} obj
 * @param {Array<Object>} rules
 */
export function verifyEmptyHelper (obj, rules) {
    let msg = '';
    let valid = true;
    for (let rule of rules) {
        let val = obj[rule.field];
        if (!val) {
            msg = `${rule.label}不能为空`;
            valid = false;
        }
    }
    return {
        valid,
        msg
    };
}
