
type UserType =  {
    userId?:string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: number;
    password: string;
    active: boolean;
    verificationCode: string;
    location?: string;
};



export default UserType
