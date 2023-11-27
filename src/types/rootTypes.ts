export type rootModalsType = "searchModal" | "loginModal" | "signupModal" | "openMenu" | "openCategories" | "authNav" | "root.authNav"

export type stateType = {
    country: {
        code: string,
        lang: string,
        city: string,
        currency: string
    },
    searchModal: {
        visible: boolean;
        value: string;
        history: never[];
    };
    authNav: {
        value: number;
    };    
    openMenu: {
        visible: boolean;
    };
    openCategories: {
        visible: boolean
    }
    toggleMenu: boolean;
}
