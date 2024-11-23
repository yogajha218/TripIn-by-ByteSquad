import React from "react";
import { useForm } from "@inertiajs/react";

const EditProfilePage = ({email, username, phone_number, gender}) => {
    const {data, setData, post, processing, errors } = useForm({
        username: username,
        phone_number: phone_number,
        gender: gender,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
        
        post(route('profile.edit.send'), data, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
        });
    };

    const handleOtp = (e) => {
        e.preventDefault();
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

        post(route('profile.edit.otp.send'), {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            },
        });
    };
    
    return (
        <div className="flex justify-center">
            <div className="  h-fit w-full lg:max-w-[500px]">
                <div className="w-full h-[220px] bg-primary ">
                    <p className="text-white font-semibold text-3xl pt-16 text-center">
                        Edit Profile
                    </p>
                </div>
                <div className="w-full h-full bg-white max-h-[990px] mt-[-1.75rem] rounded-t-3xl px-6">
                    <div className="flex flex-col items-center">
                        <div className="w-[120px] h-[120px] rounded-full overflow-hidden mt-[-3.5rem]">
                            <img src="https://placehold.co/120x120" />
                        </div>
                    </div>
                    <div className="h-max-[230px] w-max-[392px] py-3 ">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <label className="font-bold text-lg leading-10">
                                Name
                            </label>
                            <input
                                type="name"
                                id="name"
                                name="username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                className="w-full p-3 rounded-lg bg-white border border-gray-300 text-black"
                                required
                            />
                            <label className="font-bold text-lg leading-10">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                className="w-full p-3 rounded-lg bg-white border border-gray-300 text-black"
                                value={email}                               
                                disabled={true}
                                required
                                autoComplete="email"
                            />
                            <label className="font-bold text-lg leading-10">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value="********"
                                className="w-full p-3 rounded-lg bg-white border border-gray-300 text-black"
                                disabled={true}                             
                                required
                            />
                            <a onClick={handleOtp} className="flex px-5 h-[48px] bg-white border border-slate-300 mb-8 mt-[-1.5rem] rounded-lg  items-center hover:bg-slate-50 hover:border-slate-500 hover:cursor-pointer">
                                <p>Change password</p>
                            </a>
                            <label className="font-bold text-lg leading-10">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                value={data.phone_number}
                                onChange={(e) => setData('phone_number', e.target.value)}
                                placeholder="Your phone number"
                                className="w-full p-3 rounded-lg bg-white border border-gray-300 text-black"
                                required
                            />
                            <div className="flex flex-col items-center">
                                <label className="font-bold text-lg leading-10 w-full text-start">
                                    Gender
                                </label>
                                <select 
                                    className="w-full border border-slate-300 rounded-md"
                                    onChange={(e) => setData('gender', e.target.value)}
                                    value={data.gender}
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="text-white bg-primary2 py-2 rounded-lg w-full"
                            >
                                {processing ? "Processing..." : "Update Profile"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
