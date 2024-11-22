import React from "react";
import { Link } from "@inertiajs/react";

const EditProfilePage = () => {
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
                        <form className="space-y-4">
                            <label className="font-bold text-lg leading-10">
                                Name
                            </label>
                            <input
                                type="name"
                                id="name"
                                name="name"
                                placeholder="name"
                                className="w-full p-3 rounded-lg bg-white border border-gray-300 text-black"
                                // value={data.email}
                                // onChange={(e) =>
                                //     setData("email", e.target.value)
                                // }
                                required
                            />
                            {/* {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>} */}

                            <label className="font-bold text-lg leading-10">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                className="w-full p-3 rounded-lg bg-white border border-gray-300 text-black"
                                // value={data.email}
                                // onChange={(e) =>
                                //     setData("email", e.target.value)
                                // }
                                disabled={true}
                                required
                                autoComplete="email"
                            />
                            {/* {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>} */}
                            <label className="font-bold text-lg leading-10">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="*********"
                                className="w-full p-3 rounded-lg bg-white border border-gray-300 text-black"
                                disabled={true}
                                // value={data.password}
                                // onChange={(e) =>
                                //     setData("password", e.target.value)
                                // }
                                required
                            />
                            {/* {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>} */}
                            <a className="flex px-5 h-[48px] bg-white border border-slate-300 mb-8 mt-[-1.5rem] rounded-lg  items-center hover:bg-slate-50 hover:border-slate-500 hover:cursor-pointer">
                                <p>Change password</p>
                            </a>
                            <label className="font-bold text-lg leading-10">
                                Phone Number
                            </label>
                            <input
                                type="number"
                                id="phone-number"
                                name="number"
                                placeholder="your phone number"
                                className="w-full p-3 rounded-lg bg-white border border-gray-300 text-black"
                                // value={data.email}
                                // onChange={(e) =>
                                //     setData("email", e.target.value)
                                // }
                                required
                            />
                            <div className="flex flex-col items-center">
                                <label className="font-bold text-lg leading-10 w-full text-start">
                                    Gender
                                </label>
                                <select className="w-full border border-slate-300 rounded-md">
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-primary2 py-2 rounded-lg w-full"
                            >
                                Save Edit Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
