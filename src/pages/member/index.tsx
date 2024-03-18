import Layout from '@/components/Layout'
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { FormEvent, use, useState } from 'react';
import jwt from 'jsonwebtoken';
import { signIn } from 'next-auth/react';

export default function Login() {
    const [activeTab, setActiveTab] = useState('login');
    const [error, setError] = useState("");
    const router = useRouter();

    const handleTabChange = (tab : any) => {
      setActiveTab(tab);
    };

    const [user, setUser] = useState<{[key: string] : any}>({
        user_email1: "",
        password1: "",
        user_email2: "",
        password2: "",
        confirm_pass: "",
        first_name: "",
        last_name: "",
        birth: ""
    });

    const [account, setAccount] = useState<{[key: string] : any}>({
        user_email2: "",
        password2: "",
        confirm_pass: "",
        first_name: "",
        last_name: "",
        birth: ""
    });

    const [isPolicy, SetIsPolicy] = useState(false);

    const handlePolicyChange = (event : any) => {
        SetIsPolicy(event.target.checked);
    };

    const [isSign, SetIsSign] = useState(false);

    const handleSignChange = (event : any) => {
        SetIsSign(event.target.checked);
    };

    function handleChangeUser(e: any) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function handleChangeAccount(e: any) {
        setAccount({ ...account, [e.target.name]: e.target.value });
    }

    async function loginForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("hello");
        
        let formData = new FormData();

        for (let [key, value] of Object.entries(user)) {
            formData.append(key, value);  
        }
        
        const email = user.user_email1;
        const password = user.password1;
        
        try{
            const res =  await signIn("credentials", {
                email, 
                password,
                redirect:false,
            });

            if(res?.error){
                setError("Invalid Credentials");
                return;
            }

            router.push("/");
        }catch(error){
            console.log(error);
        }
        
    }

    async function regisForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let formData = new FormData();

        for (let [key, value] of Object.entries(account)) {
            formData.append(key, value);  
        }

        if(account.user_email2 == ""){
            setError("Invalid Email");
            return false;
        }

        if(account.password2 != account.confirm_pass || account.password2 == "" || account.confirm_pass == ""){
            setError("Password Is Not Correct");
        }

        if(account.first_name == ""){
            setError("Invalid First Name");
        }

        if(account.last_name == ""){
            setError("Invalid Last Name");
        }

        if(!isPolicy || !isSign){
            setError("Have not agreed to terms and services");
            return false;
        }

        const user_exits = await axios.post("/api/register/userExist", formData)

        if(user_exits.data.data.length >= 1){
            setError("User Exist");
            return false;
        }
        const response = await axios.post("/api/register/write", formData);

        if (response.status === 201) {
            setActiveTab("login");
            setError("");
        }

    }
  return (
    <>
    <Layout>
        <div className="inner-530 mt-[95px] mb-[375px]">
            <div className="flex mb-[35px]">
                 <button
                    type='button'
                    className={`w-full h-[54px] border border-[#dbdbdb] ${activeTab === 'login' ? 'btn_on' : ''} flex items-center justify-center text-[18px] text-[#999] border-b-[#252525] font-bold`}
                    onClick={() => handleTabChange('login')}
                >
                    Login
                </button>
                <button
                    type='button'
                    className={`w-full h-[54px] border border-[#dbdbdb] ${activeTab === 'register' ? 'btn_on' : ''} flex items-center justify-center text-[18px] text-[#999] border-b-[#252525] font-bold`}
                    onClick={() => handleTabChange('register')}
                >
                    Register
                </button>
            </div>
            {activeTab === 'login' && (
                <form id="form_login" onSubmit={loginForm}>
                        <div className='mt-10'>
                            <label htmlFor="user_email1" className="block text-[18px] font-bold leading-6 text-[#252525]">Email*</label>
                            <div className="mt-2">
                                <input type="text" 
                                name="user_email1" 
                                id="user_email1" 
                                value={user.user_email1}
                                onChange={handleChangeUser}
                                className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                placeholder="Please enter your ID" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password1" className="block text-[18px] font-bold leading-6 text-[#252525]">Password*</label>
                            <div className="mt-2">
                                <input type="password" 
                                name="password1" 
                                id="password1" 
                                value={user.password1}
                                onChange={handleChangeUser}
                                className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                placeholder="Please enter a password." />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-[30px]">
                            <div className='flex gap-2 items-center'>
                                <input className="w-[22px] h-[22px] rounded appearance-none border checked:bg-[url('/checkbox_customer.png')] checked:border-0 cursor-pointer" type="checkbox" id="save" />
                                <label htmlFor="save" className='text-[16px] font-medium text-[#252525]'> Save ID</label>
                            </div>
                            <Link href={"/find_id"}>
                                <p className='text-[16px] font-medium text-[#454545]'>Forgot Your Password?</p>
                            </Link>
                        </div>
                        { error && (
                            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                Error message
                            </div>
                        )}

                        <button type='submit' className='mt-7 w-full h-[62px] flex items-center justify-center rounded bg-[#f04b76] text-[18px] text-white font-medium'>
                            Login
                        </button>
                
                </form>
            )}
             {activeTab === 'register' && (
                <form id="form_register" onSubmit={regisForm}>
                        <div className='mt-10'>
                            <label htmlFor="user_email2" className="block text-[18px] font-bold leading-6 text-[#252525]">Email*</label>
                            <div className="mt-2">
                                <input type="text" 
                                name="user_email2" 
                                id="user_email2"
                                value={account.user_email2}
                                onChange={handleChangeAccount} 
                                className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                placeholder="Please enter your ID" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password2" className="block text-[18px] font-bold leading-6 text-[#252525]">Password*</label>
                            <div className="mt-2">
                                <input type="password" 
                                name="password2" 
                                id="password2" 
                                value={account.password2}
                                onChange={handleChangeAccount} 
                                className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                placeholder="Please enter a password." />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="confirm_pass" className="block text-[18px] font-bold leading-6 text-[#252525]">Confirm Password*</label>
                            <div className="mt-2">
                                <input type="password" 
                                name="confirm_pass" 
                                id="confirm_pass" 
                                value={account.confirm_pass}
                                onChange={handleChangeAccount} 
                                className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                placeholder="Confirm Password" />
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <div>
                                <label htmlFor="first_name" className="block text-[18px] font-bold leading-6 text-[#252525]">First Name*</label>
                                <div className="mt-2">
                                    <input type="text" 
                                    name="first_name" 
                                    id="first_name"
                                    value={account.first_name}
                                    onChange={handleChangeAccount} 
                                    className="block w-[258px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                    placeholder="First Name" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="first_name" className="block text-[18px] font-bold leading-6 text-[#252525]">Last Name*</label>
                                <div className="mt-2">
                                    <input type="text" 
                                    name="last_name" 
                                    id="last_name"
                                    value={account.last_name}
                                    onChange={handleChangeAccount} 
                                    className="block w-[258px] rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76" 
                                    placeholder="Last Name" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="birth" className="block text-[18px] font-bold leading-6 text-[#252525]">Date Of Birth</label>
                            <div className="mt-2">
                                <input type="text" 
                                name="birth" 
                                id="birth" 
                                value={account.birth}
                                onChange={handleChangeAccount}
                                className="block w-full rounded-md border outline-none border-gray-200 bg-transparent py-3 pl-2 text-[16px] placeholder:text-[#999] transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-f04b76 date" />
                            </div>
                        </div>
                        <div className="mt-[30px]">
                            <div className='flex gap-2'>
                                <input className="w-[22px] h-[22px] rounded appearance-none border checked:bg-[url('/checkbox_customer.png')] checked:border-0 cursor-pointer" 
                                    type="checkbox" checked={isPolicy} onChange={handlePolicyChange} id="policy" />
                                <label htmlFor="policy" className='text-[16px] font-medium text-[#252525]'> By creating an account, you confirm that you agree to beauty.coms <br />
                                    Terms and Conditions and Privacy Policy.</label>
                            </div>
                            <div className='flex gap-2 items-center mt-2'>
                                <input className="w-[22px] h-[22px] rounded appearance-none border checked:bg-[url('/checkbox_customer.png')] checked:border-0 cursor-pointer" 
                                type="checkbox" checked={isSign} onChange={handleSignChange} id="sign" />
                                <label htmlFor="sign" className='text-[16px] font-medium text-[#252525]'> Sign Up for Newsletter</label>
                            </div>
                        </div>
                        { error && (
                            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                { error }
                            </div>
                        )}
                       
                        <button type="submit" className='mt-7 w-full h-[62px] flex items-center justify-center rounded bg-[#f04b76] text-[18px] text-white font-medium'>
                            Register
                        </button>
                       
                </form>
             )}
        </div>
    </Layout>
    </>
  )
}
