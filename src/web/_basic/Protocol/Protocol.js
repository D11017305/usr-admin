export class Protocol {
    static API_URL = 'https://usr.takming.edu.tw:8443/api';

    static get config() {
        return {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
    }
}

export default Protocol;